import { expect, test, type APIRequestContext, type Page } from '@playwright/test'

import { localAccounts } from '../../src/seed/accounts'

test.describe.configure({ mode: 'serial' })

type Doc = Record<string, unknown>

const editor = localAccounts.editor

const signIn = async (page: Page) => {
  await page.goto('/admin/login')
  // eslint-disable-next-line playwright/no-networkidle -- Payload's form submits natively until hydrated
  await page.waitForLoadState('networkidle')
  await page.locator('#field-email').fill(editor.email)
  await page.locator('#field-password').fill(editor.password)
  await page.getByRole('button', { name: /login/i }).click()
  await expect(page).toHaveURL(/\/admin$/)
}

const openAdmin = async (page: Page, path: string) => {
  await page.goto(`/admin/${path}`)
  // eslint-disable-next-line playwright/no-networkidle -- edits made before the form hydrates are lost
  await page.waitForLoadState('networkidle')
}

const openLivePreview = async (page: Page) => {
  const toggler = page.locator('#live-preview-toggler')
  const isOpen = (await toggler.getAttribute('class'))?.includes('--active')
  if (!isOpen) await toggler.click()
  return page.locator('iframe.iframe-loader__iframe').contentFrame()
}

const findService = async (request: APIRequestContext, title: string) => {
  const response = await request.get(
    `/api/services?depth=0&where[title][equals]=${encodeURIComponent(title)}`,
  )
  const { docs } = (await response.json()) as { docs: { id: number }[] }
  const [service] = docs
  if (!service) throw new Error(`No service called ${title}`)
  return service
}

const publicHtml = async (request: APIRequestContext, path: string) =>
  (await request.get(path)).text()

const withoutMeta = ({ id: _id, createdAt: _c, updatedAt: _u, globalType: _g, ...doc }: Doc) => doc

let aboutPage: Doc

test.beforeAll(async ({ request }) => {
  aboutPage = withoutMeta(
    (await (await request.get('/api/globals/about-page?depth=0')).json()) as Doc,
  )
})

test.beforeEach(async ({ page }) => {
  await signIn(page)
})

test('the dashboard maps each page to its editor @local', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How publishing works' })).toBeVisible()

  const pages = [
    ['Home', 'home-page', '/'],
    ['Services', 'services-page', '/services'],
    ['About', 'about-page', '/about'],
    ['Booking', 'booking-page', '/booking'],
  ] as const
  for (const [label, slug, path] of pages) {
    await expect(page.getByRole('link', { name: `Edit the ${label} page` })).toHaveAttribute(
      'href',
      `/admin/globals/${slug}`,
    )
    await expect(page.getByRole('link', { name: `View the live ${label} page` })).toHaveAttribute(
      'href',
      path,
    )
  }

  await page.getByRole('link', { name: 'Edit the About page' }).click()
  await expect(page).toHaveURL(/\/admin\/globals\/about-page$/)
  await expect(page.getByText('About › Hero')).toBeVisible()
})

test('live preview shows a draft package change before it is published @local', async ({
  page,
  request,
}) => {
  const service = await findService(request, 'Protect')
  const draftTitle = `Protect ${String(Date.now())}`
  await openAdmin(page, `collections/services/${String(service.id)}`)
  const preview = await openLivePreview(page)
  await expect(preview.getByRole('heading', { name: 'Protect', exact: true })).toBeVisible({
    timeout: 15_000,
  })

  await page.locator('#field-title').fill(draftTitle)
  await expect(preview.getByRole('heading', { name: draftTitle })).toBeVisible()
  await expect(page.getByRole('status').filter({ hasText: 'Unpublished changes' })).toBeVisible()
  await expect.poll(() => publicHtml(request, '/services')).not.toContain(draftTitle)
  await page.locator('#live-preview-toggler').click()

  const restore = await page.request.patch(`/api/services/${String(service.id)}`, {
    headers: { Origin: new URL(page.url()).origin },
    data: { title: 'Protect', _status: 'published' },
  })
  expect(restore.ok()).toBe(true)
})

test('publishing confirms with a link to the live page @local', async ({ page, request }) => {
  const title = `Our story ${String(Date.now())}`
  await openAdmin(page, 'globals/about-page')
  await page.getByRole('button', { name: 'Story', exact: true }).click()
  await page.locator('#field-story__title').fill(title)
  await page.getByRole('button', { name: 'Publish changes' }).click()

  const toast = page.locator('.publish-toast')
  await expect(toast).toContainText('Published successfully')
  await expect(toast.getByRole('link', { name: 'View live' })).toHaveAttribute('href', '/about')
  await expect(page.getByRole('status').filter({ hasText: /^Live$/ })).toBeVisible()
  await expect.poll(() => publicHtml(request, '/about')).toContain(title)

  const restore = await page.request.post('/api/globals/about-page', {
    headers: { Origin: new URL(page.url()).origin },
    data: { ...aboutPage, _status: 'published' },
  })
  expect(restore.ok()).toBe(true)
})

test('only signed-in editors see section labels in preview @local', async ({
  page,
  browser,
  baseURL,
}) => {
  await page.goto('/next/preview?path=/')
  const process = page.locator('[data-cms="home-page/process"] [data-preview-label]')
  await expect(process).toContainText('Home › Process')
  await expect(process.getByRole('link', { name: 'Edit' })).toHaveAttribute(
    'href',
    '/admin/globals/home-page',
  )
  const reviews = page.locator('[data-cms="home-page/testimonials"] [data-preview-label]')
  await expect(reviews.getByRole('link', { name: 'Reviews' })).toHaveAttribute(
    'href',
    '/admin/collections/testimonials',
  )

  await page.goto('/services')
  const service = page.locator('[data-cms^="services/"] [data-preview-label]').first()
  await expect(service).toContainText('Service Packages › Restore')
  await expect(service.getByRole('link', { name: 'Edit' })).toHaveAttribute(
    'href',
    /^\/admin\/collections\/services\/\d+$/,
  )

  const visitor = await browser.newPage({ baseURL })
  await visitor.goto('/')
  await expect(visitor.locator('[data-cms="home-page/hero"]')).toBeVisible()
  await expect(visitor.locator('[data-preview-label]')).toHaveCount(0)
  await expect(visitor.getByRole('link', { name: /exit preview/i })).toHaveCount(0)
  await visitor.close()

  await page.context().clearCookies({ name: 'payload-token' })
  await page.goto('/')
  await expect(page.getByRole('link', { name: /exit preview/i })).toBeVisible()
  await expect(page.locator('[data-preview-label]')).toHaveCount(0)
})
