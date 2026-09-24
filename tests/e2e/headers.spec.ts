import { expect, test } from '@playwright/test'

test('site responses carry the security headers', async ({ request }) => {
  const response = await request.get('/')
  const headers = response.headers()

  expect(headers['x-frame-options']).toBe('DENY')
  expect(headers['x-content-type-options']).toBe('nosniff')
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
  expect(headers['permissions-policy']).toBe('camera=(), microphone=(), geolocation=()')
  expect(headers['content-security-policy']).toContain("default-src 'self'")
  expect(headers['content-security-policy']).toContain('frame-src')
  expect(headers['content-security-policy']).toContain('https://app.cal.com')
})

test('booking page allows same-origin framing for the Cal.com embed', async ({ request }) => {
  const response = await request.get('/booking')

  expect(response.headers()['x-frame-options']).toBe('SAMEORIGIN')
})
