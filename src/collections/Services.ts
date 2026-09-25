import { contentCollection } from './content'

export const Services = contentCollection({
  slug: 'services',
  labels: { singular: 'Service Package', plural: 'Service Packages' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'duration', '_status'],
    description:
      'Detailing packages and pricing. Drag to reorder. Shown on the Services page and wherever the Home page features them.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true, admin: { width: '50%' } },
        {
          name: 'price',
          type: 'text',
          required: true,
          admin: { width: '25%', description: 'For example $299 or $99/month' },
        },
        {
          name: 'duration',
          type: 'text',
          admin: { width: '25%', description: 'For example 4-6 hours' },
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'Short description for the Home page package cards' },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: { description: 'Full description for the Services page' },
    },
    {
      name: 'features',
      label: 'What’s included',
      type: 'array',
      labels: { singular: 'Item', plural: 'Items' },
      fields: [{ name: 'feature', type: 'text', required: true }],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
})
