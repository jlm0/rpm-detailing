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

test('home page exposes SEO metadata', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/)
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /\S/)
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\S/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\S/)
})
