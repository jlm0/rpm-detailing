import { link } from '@/fields/link'

import { editableGlobal } from './shared'

export const Footer = editableGlobal({
  slug: 'footer',
  label: 'Footer',
  group: 'Site',
  previewAt: '/',
  fields: [
    { name: 'description', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'contactHeading', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'hoursHeading', type: 'text', required: true, admin: { width: '50%' } },
      ],
    },
    {
      name: 'cta',
      label: 'Call to action',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
        link({ name: 'button' }),
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      required: true,
      admin: { description: '{year} is replaced with the current year' },
    },
  ],
})
