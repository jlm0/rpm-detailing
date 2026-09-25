import { expect, test } from '@playwright/test'

const pages = ['/', '/services', '/about', '/booking']

for (const path of pages) {
  test(`${path} renders without runtime errors`, async ({ page }) => {
    const pageErrors: Error[] = []
    page.on('pageerror', (error) => pageErrors.push(error))

    const response = await page.goto(path)

    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(/\S/)
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.locator('header').first()).toBeVisible()
    expect(pageErrors).toEqual([])
  })
}

test('home links through to booking', async ({ page }) => {
  await page.goto('/')
  await page.locator('main a[href="/booking"]').first().click()
  await expect(page).toHaveURL(/\/booking$/)
  await expect(page.locator('h1').first()).toBeVisible()
})

test('booking page loads the Cal.com embed', async ({ page }) => {
  await page.goto('/booking')
  await expect(page.locator('iframe[src*="cal.com"]')).toBeAttached({ timeout: 20_000 })
})

test('unknown routes render the 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist')

  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: '404' })).toBeVisible()
  await page.getByRole('link', { name: /back to homepage/i }).click()
  await expect(page).toHaveURL(/\/$/)
})

test('mobile menu opens and closes @mobile', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /toggle mobile menu/i }).click()
  await expect(page.locator('header nav').last()).toBeVisible()
  await page.getByRole('button', { name: /close mobile menu/i }).click()
  await expect(page.locator('header nav').last()).toBeHidden()
})

test('keyboard users can skip past the header', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skipLink = page.getByRole('link', { name: /skip to content/i })
  await expect(skipLink).toBeFocused()
  await expect(skipLink).toBeVisible()
  await skipLink.press('Enter')
  await expect(page).toHaveURL(/#main-content$/)
})
