import { image } from '@/fields/image'
import { text, textarea } from '@/fields/text'
import { outlineFor, trail } from '@/lib/site-map'

import { contentCollection } from './content'

export const Testimonials = contentCollection({
  slug: 'testimonials',
  labels: { singular: 'Review', plural: 'Reviews' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', '_status'],
    description:
      'Customer reviews for the carousel on the Home page. Drag to reorder. Home › Reviews sets how many are shown.',
  },
  where: {
    trail: trail('Home', 'Reviews'),
    where: 'One card in the review carousel, in the order of this list.',
    outline: outlineFor('home-page', 'testimonials'),
  },
  fields: [
    {
      type: 'row',
      fields: [
        text({ name: 'name', max: 40, help: 'The customer’s name.', width: '50%' }),
        text({
          name: 'title',
          max: 40,
          help: 'Optional, for example Regular Client.',
          required: false,
          width: '50%',
        }),
      ],
    },
    textarea({ name: 'review', min: 20, max: 300, help: 'The review in the customer’s words.' }),
    image({
      name: 'avatar',
      size: 'square, at least 200 × 200 px',
      required: false,
      help: 'Optional. Without a photo the customer’s initials are shown.',
    }),
  ],
})
