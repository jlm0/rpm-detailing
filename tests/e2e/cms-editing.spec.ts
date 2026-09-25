import { readFile } from 'node:fs/promises'

import { expect, test, type APIRequestContext, type Page } from '@playwright/test'

import { localAccounts } from '../../src/seed/accounts'

test.describe.configure({ mode: 'serial' })

type Doc = Record<string, unknown>

const editor = localAccounts.editor
const touchedGlobals = ['home-page', 'services-page', 'site-settings'] as const
const originals = new Map<string, Doc>()

const signIn = async (page: Page) => {
  await page.goto('/admin/login')
  // eslint-disable-next-line playwright/no-networkidle -- Payload's form submits natively until hydrated
  await page.waitForLoadState('networkidle')
  await page.locator('#field-email').fill(editor.email)
  await page.locator('#field-password').fill(editor.password)
  await page.getByRole('button', { name: /login/i }).click()
  await expect(page).toHaveURL(/\/admin$/)
}

const withoutMeta = ({ id: _id, createdAt: _c, updatedAt: _u, globalType: _g, ...doc }: Doc) => doc

const readGlobal = async (request: APIRequestContext, slug: string) =>
  withoutMeta((await (await request.get(`/api/globals/${slug}?depth=0`)).json()) as Doc)

const findService = async (request: APIRequestContext, title: string) => {
  const response = await request.get(
    `/api/services?depth=0&where[title][equals]=${encodeURIComponent(title)}`,
  )
  const { docs } = (await response.json()) as { docs: { id: number; price: number }[] }
  const [service] = docs
  if (!service) throw new Error(`No service called ${title}`)
  return service
}

const originFor = (page: Page) => new URL(page.url()).origin

const restore = async (page: Page) => {
  const headers = { Origin: originFor(page) }
  for (const [slug, data] of originals) {
    const response = await page.request.post(`/api/globals/${slug}`, {
      headers,
      data: { ...data, _status: 'published' },
    })
    expect(response.ok()).toBe(true)
  }
}

const openAdmin = async (page: Page, path: string) => {
  await page.goto(`/admin/${path}`)
  // eslint-disable-next-line playwright/no-networkidle -- edits made before the form hydrates are lost
  await page.waitForLoadState('networkidle')
}

const openGlobal = async (page: Page, slug: string, tab: string) => {
  await openAdmin(page, `globals/${slug}`)
  await page.getByRole('button', { name: tab, exact: true }).click()
}

const publish = async (page: Page) => {
  await page.getByRole('button', { name: 'Publish changes' }).click()
  await expect(page.getByText(/updated successfully|published successfully/i).first()).toBeVisible()
}

const publicHtml = async (request: APIRequestContext, path: string) =>
  (await request.get(path)).text()

test.beforeAll(async ({ request }) => {
  for (const slug of touchedGlobals) originals.set(slug, await readGlobal(request, slug))
})

test.beforeEach(async ({ page }) => {
  await signIn(page)
})

test.afterEach(async ({ page }) => {
  await restore(page)
})

test('the client edits a headline, previews the draft and publishes it @local', async ({
  page,
  request,
}) => {
  const headline = `Loved by drivers ${String(Date.now())}`
  await openGlobal(page, 'home-page', 'Reviews')
  await page.locator('#field-testimonials__title').fill(headline)
  await expect(page.getByRole('button', { name: 'Revert to published' })).toBeVisible()
  await expect.poll(() => publicHtml(request, '/')).not.toContain(headline)

  const [preview] = await Promise.all([
    page.context().waitForEvent('page'),
    page.getByRole('link', { name: 'Preview' }).click(),
  ])
  await expect(preview.getByRole('heading', { name: headline })).toBeVisible()
  await expect(preview.getByRole('link', { name: /exit preview/i })).toBeVisible()
  await preview.close()

  await publish(page)
  await expect.poll(() => publicHtml(request, '/')).toContain(headline)
})

test('the client swaps a photo by uploading a new one @local', async ({ page, request }) => {
  await openGlobal(page, 'services-page', 'Hero')
  const field = page.locator('#field-hero__image')
  await field.locator('.upload-relationship-details__remove').click()
  await field.getByRole('button', { name: 'Create New' }).click()
  const drawer = page.locator('.drawer--is-open').last()
  await drawer.locator('input[type=file]').setInputFiles({
    name: 'e2e-swapped-hero.jpg',
    mimeType: 'image/jpeg',
    buffer: await readFile('src/seed/assets/about-hero.jpg'),
  })
  await drawer.locator('#field-alt').fill('A freshly swapped hero photo')
  await drawer.getByRole('button', { name: 'Save' }).click()
  await expect(field.getByText(/e2e-swapped-hero/)).toBeVisible()

  await publish(page)
  await expect.poll(() => publicHtml(request, '/services')).toContain('e2e-swapped-hero')
  await expect
    .poll(() => publicHtml(request, '/services'))
    .toContain('A freshly swapped hero photo')
})

test('the client changes a package price and sees it on home and services @local', async ({
  page,
  request,
}) => {
  const service = await findService(request, 'Restore')
  await openAdmin(page, `collections/services/${String(service.id)}`)
  await page.locator('#field-price').fill('349')
  await publish(page)

  for (const path of ['/', '/services']) {
    await expect.poll(() => publicHtml(request, path)).toContain('$349')
  }

  await page.locator('#field-price').fill(String(service.price))
  await publish(page)
  await expect.poll(() => publicHtml(request, '/services')).not.toContain('$349')
})

test('the client adds, reorders and removes a hero slide @local', async ({ page, request }) => {
  const title = `Fresh slide ${String(Date.now())}`
  await openGlobal(page, 'home-page', 'Hero')
  await page.getByRole('button', { name: 'Add Slide' }).click()
  await page.locator('#field-hero__slides__3__eyebrow').fill('// NEW')
  await page.locator('#field-hero__slides__3__title').fill(title)
  await publish(page)
  await page.goto('/')
  await expect(page.getByRole('button', { name: title })).toBeVisible()
  await expect(page.getByRole('button', { name: title })).toHaveText('04')

  await openGlobal(page, 'home-page', 'Hero')
  const moveUp = async (row: number) => {
    await page.locator(`#hero-slides-row-${String(row)} .array-actions__button`).click()
    await page.getByRole('button', { name: 'Move Up' }).click()
  }
  await moveUp(3)
  await moveUp(2)
  await moveUp(1)
  await expect(page.locator('#field-hero__slides__0__title')).toHaveValue(title)
  await publish(page)
  await page.goto('/')
  await expect(page.getByRole('button', { name: title })).toHaveText('01')

  await openGlobal(page, 'home-page', 'Hero')
  await page.locator('#hero-slides-row-0 .array-actions__button').click()
  await page.getByRole('button', { name: 'Remove' }).click()
  await expect(page.locator('#field-hero__slides__3__title')).toHaveCount(0)
  await publish(page)
  await expect.poll(() => publicHtml(request, '/')).not.toContain(title)
})

test('the client updates contact details shown on every page @local', async ({ page, request }) => {
  const phone = '(208) 555-0142'
  await openGlobal(page, 'site-settings', 'Business details')
  await page.locator('#field-business__phone').fill(phone)
  await publish(page)

  for (const path of ['/', '/services', '/about', '/booking']) {
    await expect.poll(() => publicHtml(request, path)).toContain(phone)
  }
})

test('the client cannot publish a too-long or missing value @local', async ({ page, request }) => {
  await openGlobal(page, 'home-page', 'Hero')
  const title = page.locator('#field-hero__slides__0__title')
  await title.fill('x'.repeat(61))
  await page.getByRole('button', { name: 'Publish changes' }).click()
  await expect(page.getByText(/field is invalid: Hero → Slides 1 → Title/i)).toBeVisible()
  await expect(
    page.locator('.field-type.text', { has: title }).getByText(/Up to 60 characters/),
  ).toBeVisible()
  await expect.poll(() => publicHtml(request, '/')).not.toContain('x'.repeat(61))

  await title.fill('Advanced Detailing Solutions for Your Prized Automobile')
  await page.getByRole('button', { name: 'Reviews', exact: true }).click()
  const heading = page.locator('#field-testimonials__title')
  await heading.fill('')
  await page.getByRole('button', { name: 'Publish changes' }).click()
  await expect(page.getByText(/field is invalid: Reviews → Title/i)).toBeVisible()
  await expect
    .poll(() => publicHtml(request, '/'))
    .toContain((originals.get('home-page')?.testimonials as { title: string }).title)
})
