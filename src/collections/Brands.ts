import { image } from '@/fields/image'
import { text } from '@/fields/text'
import { outlineFor, trail } from '@/lib/site-map'

import { contentCollection } from './content'

export const Brands = contentCollection({
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', '_status'],
    description: 'Car brand logos on the Home page, just above the footer. Drag to reorder.',
  },
  where: {
    trail: trail('Home', 'Brands'),
    where: 'One logo in the row of car brands, in the order of this list.',
    outline: outlineFor('home-page', 'brands'),
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
