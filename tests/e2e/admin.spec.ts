import { expect, test, type Page } from '@playwright/test'

import { localAccounts } from '../../src/seed/accounts'

const signIn = async (page: Page, account: { email: string; password: string }) => {
  await page.goto('/admin/login')
  // eslint-disable-next-line playwright/no-networkidle -- Payload's form submits natively until hydrated
  await page.waitForLoadState('networkidle')
  await page.locator('#field-email').fill(account.email)
  await page.locator('#field-password').fill(account.password)
  await page.getByRole('button', { name: /login/i }).click()
  await expect(page).toHaveURL(/\/admin$/)
}

test('admin login page is reachable', async ({ page }) => {
  await page.goto('/admin/login')

  await expect(page.locator('#field-email')).toBeVisible()
  await expect(page.locator('#field-password')).toBeVisible()
})

test('the admin can manage users @local', async ({ page }) => {
  await signIn(page, localAccounts.admin)

  await page.goto('/admin/collections/users')
  await expect(page.getByRole('link', { name: localAccounts.editor.name })).toBeVisible()
})
