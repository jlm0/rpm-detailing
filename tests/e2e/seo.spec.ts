import { expect, test } from '@playwright/test'

test('robots.txt blocks admin and api and points to the sitemap', async ({ request }) => {
  const response = await request.get('/robots.txt')
  const body = await response.text()

  expect(response.status()).toBe(200)
  expect(body).toContain('Disallow: /admin')
  expect(body).toContain('Disallow: /api')
  expect(body).toMatch(/Sitemap: https?:\/\/\S+\/sitemap\.xml/)
})

test('sitemap.xml lists every public page', async ({ request }) => {
  const response = await request.get('/sitemap.xml')
  const body = await response.text()

  expect(response.status()).toBe(200)
  for (const path of ['/services', '/about', '/booking']) {
    expect(body).toMatch(new RegExp(`<loc>https?://[^<]+${path}</loc>`))
  }
})

const pages = [
  { path: '/', card: 'home' },
  { path: '/services', card: 'services' },
  { path: '/about', card: 'about' },
  { path: '/booking', card: 'booking' },
]

test('every page has its own title, description and share card', async ({ page, request }) => {
  const titles = new Set<string>()
  const descriptions = new Set<string>()

  for (const { path, card } of pages) {
    await page.goto(path)
    const meta = (selector: string) => page.locator(selector).getAttribute('content')

    titles.add(await page.title())
    descriptions.add((await meta('meta[name="description"]')) ?? '')
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /\S/)
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200')
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630')
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    )
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\S/)

    const imageUrl = (await meta('meta[property="og:image"]')) ?? ''
    expect(imageUrl).toMatch(new RegExp(`/og/${card}\\?v=\\w`))

    const image = await request.get(new URL(imageUrl).pathname + new URL(imageUrl).search)
    expect(image.status()).toBe(200)
    expect(image.headers()['content-type']).toBe('image/png')
    const png = await image.body()
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630])
  }

  expect(titles.size).toBe(pages.length)
  expect(descriptions.size).toBe(pages.length)
})

test('unknown share cards are not found', async ({ request }) => {
  expect((await request.get('/og/nope')).status()).toBe(404)
})

test('pages link the favicon and touch icon', async ({ page, request }) => {
  await page.goto('/')

  for (const selector of [
    'link[rel="icon"][type="image/svg+xml"]',
    'link[rel="apple-touch-icon"]',
  ]) {
    const href = await page.locator(selector).getAttribute('href')
    expect((await request.get(href ?? '')).status()).toBe(200)
  }
})
