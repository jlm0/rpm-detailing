import { link } from '@/fields/link'

import { editableGlobal, section, seoTab } from './shared'

export const ServicesPage = editableGlobal({
  slug: 'services-page',
  label: 'Services',
  group: 'Pages',
  previewAt: '/services',
  description: 'Packages and prices are edited in Service Packages',
  fields: [
    {
      type: 'tabs',
      tabs: [
        section('hero', 'Hero', [
          { name: 'title', type: 'text', required: true },
          { name: 'subtitle', type: 'text', required: true },
          { name: 'image', type: 'upload', relationTo: 'media', required: true },
        ]),
        section('labels', 'Package labels', [
          {
            name: 'includes',
            type: 'text',
            required: true,
            admin: { description: 'Heading above each package’s list' },
          },
          {
            name: 'price',
            type: 'text',
            required: true,
            admin: { description: 'Shown above each price, for example Starting at' },
          },
          link({ name: 'bookButton', label: 'Package button' }),
        ]),
        section('cta', 'Call to action', [
          { name: 'title', type: 'text', required: true },
          { name: 'text', type: 'textarea', required: true },
          link({ name: 'button' }),
        ]),
        seoTab,
      ],
    },
  ],
})
