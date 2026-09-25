import { expect, test } from '@playwright/test'

const admin = { email: 'e2e-admin@rpmdetail.test', password: 'e2e-Password-123!' }

test.describe.configure({ mode: 'serial' })

test('first user can be created and reaches the dashboard @local', async ({ page }) => {
  await page.goto('/admin')
  await expect(page).toHaveURL(/\/admin\/create-first-user/)
  // eslint-disable-next-line playwright/no-networkidle -- Payload's form submits natively until hydrated
  await page.waitForLoadState('networkidle')

  await page.locator('#field-email').fill(admin.email)
  await page.locator('#field-password').fill(admin.password)
  await page.locator('#field-confirm-password').fill(admin.password)
  await page.getByRole('button', { name: /create/i }).click()

  await expect(page).toHaveURL(/\/admin$/)
  await expect(page.getByRole('link', { name: 'Site Settings' }).first()).toBeVisible()
})

test('admin can log in and open a global @local', async ({ page }) => {
  await page.goto('/admin/login')
  // eslint-disable-next-line playwright/no-networkidle -- Payload's form submits natively until hydrated
  await page.waitForLoadState('networkidle')

  await page.locator('#field-email').fill(admin.email)
  await page.locator('#field-password').fill(admin.password)
  await page.getByRole('button', { name: /login/i }).click()

  await expect(page).toHaveURL(/\/admin$/)
  await page.goto('/admin/globals/site-settings')
  await expect(page.getByRole('heading', { name: 'Site Settings' })).toBeVisible()
})

test('admin login page is reachable', async ({ page }) => {
  await page.goto('/admin/login')

  await expect(page.locator('#field-email')).toBeVisible()
  await expect(page.locator('#field-password')).toBeVisible()
})
