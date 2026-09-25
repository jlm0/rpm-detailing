import { link } from '@/fields/link'

import { editableGlobal } from './shared'

export const Header = editableGlobal({
  slug: 'header',
  label: 'Header & Menu',
  group: 'Site',
  previewAt: '/',
  fields: [
    {
      name: 'navItems',
      label: 'Menu items',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Menu item', plural: 'Menu items' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true, admin: { width: '34%' } },
            {
              name: 'type',
              type: 'select',
              required: true,
              defaultValue: 'link',
              options: [
                { label: 'Link', value: 'link' },
                { label: 'Open contact popup', value: 'contact' },
              ],
              admin: { width: '33%' },
            },
            {
              name: 'url',
              label: 'Link',
              type: 'text',
              admin: {
                width: '33%',
                condition: (_, siblingData) => siblingData.type === 'link',
                description: 'A page like /services or a home page section like #testimonials',
              },
              validate: (
                value: string | null | undefined,
                { siblingData }: { siblingData: { type?: string } },
              ) => siblingData.type !== 'link' || Boolean(value) || 'A link is required',
            },
          ],
        },
      ],
    },
    {
      name: 'showCta',
      label: 'Show header button',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      ...link({ name: 'cta', label: 'Header button' }),
      admin: { condition: (data) => Boolean(data.showCta) },
    },
    {
      name: 'mobileMenu',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'openLabel',
          type: 'text',
          required: true,
          admin: { description: 'Read aloud by screen readers' },
        },
        {
          name: 'closeLabel',
          type: 'text',
          required: true,
          admin: { description: 'Read aloud by screen readers' },
        },
      ],
    },
    {
      name: 'contactPopup',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'contactHeading', type: 'text', required: true },
        { name: 'hoursHeading', type: 'text', required: true },
        { name: 'ctaHeading', type: 'text', required: true },
        { name: 'ctaText', type: 'textarea', required: true },
        link({ name: 'ctaButton', label: 'Button' }),
        {
          name: 'closeLabel',
          type: 'text',
          required: true,
          admin: { description: 'Read aloud by screen readers' },
        },
      ],
    },
  ],
})
