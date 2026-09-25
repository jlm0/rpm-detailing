import { expect, test } from '@playwright/test'

for (const slug of ['site-settings', 'landing-page', 'services-page', 'about-page', 'ui-labels']) {
  test(`global ${slug} is publicly readable`, async ({ request }) => {
    const response = await request.get(`/api/globals/${slug}`)

    expect(response.status()).toBe(200)
    expect(await response.json()).not.toHaveProperty('errors')
  })
}

test('users are not publicly listable', async ({ request }) => {
  const response = await request.get('/api/users')

  expect(response.status()).toBe(403)
})

test('media uploads require authentication', async ({ request }) => {
  const response = await request.post('/api/media', { multipart: { alt: 'unauthorised' } })

  expect(response.status()).toBe(403)
})
