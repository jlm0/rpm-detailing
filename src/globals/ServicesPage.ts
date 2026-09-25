import { link } from '@/fields/link'
import { text, textarea } from '@/fields/text'

import { editableGlobal, pageHero, section, seoTab } from './shared'

const page = 'services-page'

export const ServicesPage = editableGlobal({
  slug: page,
  description:
    'The Services page, top to bottom. The packages and prices themselves are edited in Service Packages.',
  fields: [
    {
      type: 'tabs',
      tabs: [
        section(page, 'hero', pageHero),
        section(page, 'labels', [
          {
            type: 'row',
            fields: [
              text({
                name: 'includes',
                max: 30,
                help: 'Heading above each package’s list.',
                width: '50%',
              }),
              text({
                name: 'price',
                max: 20,
                help: 'Shown above each price, for example Starting at.',
                width: '50%',
              }),
            ],
          },
          link({ name: 'bookButton', label: 'Package button' }),
        ]),
        section(page, 'cta', [
          text({ name: 'title', max: 60, help: 'Large heading on the red banner.' }),
          textarea({ name: 'text', max: 200, help: 'One or two sentences under the heading.' }),
          link({ name: 'button' }),
        ]),
        seoTab(page),
      ],
    },
  ],
})
