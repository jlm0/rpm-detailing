import { image } from '@/fields/image'
import { text, textarea } from '@/fields/text'

import { contentCollection } from './content'

export const Testimonials = contentCollection({
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', '_status'],
    description:
      'Customer reviews shown on the Home page. Drag to reorder. The Home page sets how many are shown.',
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
