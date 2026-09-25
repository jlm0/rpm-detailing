import { expect, test, type Locator } from '@playwright/test'

const style = (locator: Locator, property: 'opacity' | 'translate') =>
  locator.evaluate((element, name) => getComputedStyle(element).getPropertyValue(name), property)

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('scroll reveals leave content visible', async ({ page }) => {
    await page.goto('/')
    const reveals = page.locator('[data-reveal="rise"], [data-reveal="fade"]')
    await expect(reveals.first()).toBeAttached()
    const hidden = await reveals.evaluateAll(
      (elements) => elements.filter((element) => getComputedStyle(element).opacity !== '1').length,
    )
    expect(hidden).toBe(0)
  })
})

test('below the fold content reveals as it scrolls into view', async ({ page }) => {
  await page.goto('/')
  const group = page.locator('footer [data-reveal="group"]')
  const item = group.locator('[data-reveal="rise"]').last()
  await expect(group).toHaveAttribute('data-reveal-pending', '')
  expect(await style(item, 'opacity')).toBe('0')
  expect(await style(item, 'translate')).toBe('0px 16px')

  await item.scrollIntoViewIfNeeded()
  await expect(group).not.toHaveAttribute('data-reveal-pending')
  await expect.poll(() => style(item, 'opacity')).toBe('1')
})

test('hero slides auto-rotate with a progress bar', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('[class*="slide-progress"]')).toHaveCSS(
    'animation-name',
    'slide-progress',
  )
})

test.describe('with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('reveals fade without moving', async ({ page }) => {
    await page.goto('/')
    const group = page.locator('footer [data-reveal="group"]')
    const item = group.locator('[data-reveal="rise"]').last()
    await expect(group).toHaveAttribute('data-reveal-pending', '')
    expect(await style(item, 'opacity')).toBe('0')
    expect(await style(item, 'translate')).toMatch(/^(none|0px)$/)
  })

  test('hero slides do not auto-rotate', async ({ page }) => {
    await page.goto('/')
    const progress = page.locator('[class*="slide-progress"]')
    await expect(progress).toHaveCount(1)
    await expect(progress).toHaveCSS('animation-name', 'none')
  })
})
