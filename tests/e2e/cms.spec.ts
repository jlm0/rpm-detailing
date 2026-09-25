import { expect, test, type APIRequestContext, type Page } from '@playwright/test'

import { localAccounts } from '../../src/seed/accounts'

test.describe.configure({ mode: 'serial' })

test.use({ extraHTTPHeaders: { Origin: 'http://localhost:3100' } })

const signIn = async (request: APIRequestContext, account: { email: string; password: string }) => {
  const response = await request.post('/api/users/login', {
    data: { email: account.email, password: account.password },
  })
  expect(response.ok()).toBe(true)
  const { user } = (await response.json()) as { user: { id: number } }
  return user
}

const signInToAdmin = async (page: Page, account: { email: string; password: string }) => {
  await page.goto('/admin/login')
  // eslint-disable-next-line playwright/no-networkidle -- Payload's form submits natively until hydrated
  await page.waitForLoadState('networkidle')
  await page.locator('#field-email').fill(account.email)
  await page.locator('#field-password').fill(account.password)
  await page.getByRole('button', { name: /login/i }).click()
  await expect(page).toHaveURL(/\/admin$/)
}

const homeTitle = async (request: APIRequestContext) => {
  const response = await request.get('/api/globals/home-page')
  const home = (await response.json()) as { testimonials: { title: string } }
  return home.testimonials.title
}

test('the client can draft, preview and publish a change @local', async ({ page, request }) => {
  const original = await homeTitle(request)
  const draftTitle = `Draft title ${String(Date.now())}`
  await signIn(page.request, localAccounts.editor)

  const draft = await page.request.post('/api/globals/home-page?draft=true', {
    data: { testimonials: { title: draftTitle } },
  })
  expect(draft.ok()).toBe(true)

  await expect((await request.get('/')).text()).resolves.not.toContain(draftTitle)

  await page.goto('/next/preview?path=/')
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { name: draftTitle })).toBeVisible()
  await expect(page.getByRole('link', { name: /exit preview/i })).toBeVisible()

  const publish = await page.request.post('/api/globals/home-page', {
    data: { testimonials: { title: draftTitle }, _status: 'published' },
  })
  expect(publish.ok()).toBe(true)
  await expect((await request.get('/')).text()).resolves.toContain(draftTitle)

  const restore = await page.request.post('/api/globals/home-page', {
    data: { testimonials: { title: original }, _status: 'published' },
  })
  expect(restore.ok()).toBe(true)
  await expect((await request.get('/')).text()).resolves.toContain(original)
})

test('the client can upload and remove a photo @local', async ({ page }) => {
  await signIn(page.request, localAccounts.editor)
  const pixel = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
  )

  const upload = await page.request.post('/api/media', {
    multipart: {
      file: { name: 'e2e-upload.png', mimeType: 'image/png', buffer: pixel },
      _payload: JSON.stringify({ alt: 'E2E upload' }),
    },
  })
  expect(upload.status()).toBe(201)
  const { doc } = (await upload.json()) as { doc: { id: number; url: string } }

  expect((await page.request.get(doc.url)).ok()).toBe(true)
  expect((await page.request.delete(`/api/media/${String(doc.id)}`)).ok()).toBe(true)
})

test('the client cannot create users or promote themselves @local', async ({ page }) => {
  const user = await signIn(page.request, localAccounts.editor)

  const create = await page.request.post('/api/users', {
    data: { name: 'Intruder', email: 'intruder@rpmdetail.test', password: 'local-Password-1!' },
  })
  expect(create.status()).toBe(403)

  const promote = await page.request.patch(`/api/users/${String(user.id)}`, {
    data: { role: 'admin' },
  })
  expect(promote.ok()).toBe(true)
  const { doc } = (await promote.json()) as { doc: { role: string } }
  expect(doc.role).toBe('editor')
})

test('the client can sign in and edit the home page @local', async ({ page }) => {
  await signInToAdmin(page, localAccounts.editor)

  await page.goto('/admin/globals/home-page')
  await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible()
  await expect(page.getByRole('button', { name: /publish changes/i })).toBeVisible()
})
