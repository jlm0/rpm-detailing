import { contentCollection } from './content'

export const Brands = contentCollection({
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', '_status'],
    description: 'Car brand logos shown on the Home page. Drag to reorder.',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
  ],
})
