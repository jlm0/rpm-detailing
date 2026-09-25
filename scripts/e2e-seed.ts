import { getPayload } from 'payload'

import config from '@payload-config'

const payload = await getPayload({ config })

await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    calcom: {
      enabled: true,
      link: 'rpm-detailing-e2e',
    },
  },
})

await payload.destroy()
