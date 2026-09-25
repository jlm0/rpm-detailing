import { image } from '@/fields/image'
import { richText } from '@/fields/rich-text'
import { text, textarea } from '@/fields/text'
import { wholeNumber } from '@/fields/validate'
import { outlineFor, trail } from '@/lib/site-map'

import { contentCollection } from './content'

export const Services = contentCollection({
  slug: 'services',
  labels: { singular: 'Service Package', plural: 'Service Packages' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'duration', '_status'],
    description:
      'Your detailing packages and prices. Drag to reorder. Shown in this order on the Services page, and as cards on the Home page when featured there.',
  },
  where: {
    trail: trail('Services', 'Packages'),
    where:
      'Listed in full on the Services page, in this order. Also a card in Home › Packages when featured there.',
    outline: outlineFor('services-page', 'labels'),
  },
  fields: [
    text({
      name: 'title',
      max: 30,
      help: 'Package name, shown large on the Services page.',
    }),
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
          max: 99999,
          validate: wholeNumber,
          admin: {
            width: '33%',
            step: 1,
            description: 'Whole dollars, from 0 to 99,999. 299 is shown as $299.',
          },
        },
        text({
          name: 'priceSuffix',
          max: 10,
          help: 'Optional, shown after the price, for example /month.',
          required: false,
          width: '33%',
        }),
        text({
          name: 'duration',
          max: 24,
          help: 'Optional, for example 4-6 hours.',
          required: false,
          width: '34%',
        }),
      ],
    },
    textarea({
      name: 'summary',
      min: 20,
      max: 140,
      help: 'Short description for the Home page package cards, which show three lines.',
    }),
    richText({
      name: 'description',
      max: 1200,
      help: 'Full description for the Services page.',
    }),
    {
      name: 'features',
      label: 'What’s included',
      type: 'array',
      maxRows: 12,
      labels: { singular: 'Item', plural: 'Items' },
      admin: { description: 'Up to 12 ticked points on the Services page. Optional.' },
      fields: [text({ name: 'feature', max: 60, help: 'One short point.' })],
    },
    image({ name: 'image', size: 'landscape 4:3, at least 1600 × 1200 px' }),
  ],
})
