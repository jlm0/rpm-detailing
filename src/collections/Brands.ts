import { image } from '@/fields/image'
import { text } from '@/fields/text'

import { contentCollection } from './content'

export const Brands = contentCollection({
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', '_status'],
    description: 'Car brand logos shown on the Home page. Drag to reorder.',
  },
  fields: [
    text({ name: 'name', max: 40, help: 'The car brand, for example Porsche.' }),
    image({
      name: 'logo',
      size: 'a white or light logo on a transparent background, PNG or WebP, at least 400 px wide',
      help: 'Shown small and greyed out on a dark background.',
    }),
  ],
})
