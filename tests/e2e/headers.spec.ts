import { expect, test } from '@playwright/test'

test('site responses carry the security headers', async ({ request }) => {
  const response = await request.get('/')
  const headers = response.headers()
  const csp = headers['content-security-policy']

  expect(headers['x-frame-options']).toBe('SAMEORIGIN')
  expect(headers['x-content-type-options']).toBe('nosniff')
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
  expect(headers['permissions-policy']).toBe('camera=(), microphone=(), geolocation=()')
  expect(csp).toContain("default-src 'self'")
  expect(csp).toContain("frame-ancestors 'self'")
  expect(csp).toContain('https://app.cal.com')
  expect(csp).not.toContain('unsafe-eval')
})
