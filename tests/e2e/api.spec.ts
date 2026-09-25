import { expect, test } from '@playwright/test'

const globals = [
  'home-page',
  'services-page',
  'about-page',
  'booking-page',
  'site-settings',
  'header',
  'footer',
]

for (const slug of globals) {
  test(`global ${slug} is publicly readable`, async ({ request }) => {
    const response = await request.get(`/api/globals/${slug}`)

    expect(response.status()).toBe(200)
    expect(await response.json()).not.toHaveProperty('errors')
  })
}

for (const collection of ['services', 'testimonials', 'brands', 'media']) {
  test(`collection ${collection} is publicly readable`, async ({ request }) => {
    const response = await request.get(`/api/${collection}`)
    const body = (await response.json()) as { docs: unknown[] }

    expect(response.status()).toBe(200)
    expect(body.docs.length).toBeGreaterThan(0)
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

test('content cannot be changed anonymously', async ({ request }) => {
  const response = await request.post('/api/globals/home-page', {
    data: { testimonials: { title: 'Anonymous edit' } },
  })

  expect(response.status()).toBe(403)
})

test('the preview route requires a signed-in editor', async ({ request }) => {
  const response = await request.get('/next/preview?path=/', { maxRedirects: 0 })

  expect(response.status()).toBe(403)
})
