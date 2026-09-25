import { getPayload } from 'payload'

import config from '@payload-config'
import { seed } from '@/seed'

const { hostname } = new URL(process.env.DATABASE_URI)

if (!['localhost', '127.0.0.1'].includes(hostname)) {
  console.error(
    `Refusing to seed ${hostname}: seeding resets content and is for local databases only.`,
  )
  process.exit(1)
}

const payload = await getPayload({ config })
await seed(payload)
await payload.destroy()
