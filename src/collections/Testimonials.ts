import { contentCollection } from './content'

export const Testimonials = contentCollection({
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', '_status'],
    description: 'Customer reviews shown on the Home page. Drag to reorder.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        {
          name: 'title',
          type: 'text',
          admin: { width: '50%', description: 'For example Regular Client' },
        },
      ],
    },
    { name: 'review', type: 'textarea', required: true },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
  ],
})
