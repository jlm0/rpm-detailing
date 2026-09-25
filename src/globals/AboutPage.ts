import { icon } from '@/fields/icon'
import { link } from '@/fields/link'

import { editableGlobal, section, seoTab } from './shared'

export const AboutPage = editableGlobal({
  slug: 'about-page',
  label: 'About',
  group: 'Pages',
  previewAt: '/about',
  fields: [
    {
      type: 'tabs',
      tabs: [
        section('hero', 'Hero', [
          { name: 'title', type: 'text', required: true },
          { name: 'subtitle', type: 'text', required: true },
          { name: 'image', type: 'upload', relationTo: 'media', required: true },
        ]),
        section('story', 'Story', [
          { name: 'title', type: 'text', required: true },
          { name: 'content', type: 'richText', required: true },
          { name: 'image', type: 'upload', relationTo: 'media', required: true },
        ]),
        section('values', 'Values', [
          { name: 'title', type: 'text', required: true },
          { name: 'subtitle', type: 'text', required: true },
          {
            name: 'items',
            type: 'array',
            required: true,
            minRows: 1,
            fields: [
              { name: 'title', type: 'text', required: true },
              { name: 'description', type: 'textarea', required: true },
              icon(),
            ],
          },
        ]),
        section('team', 'Team', [
          { name: 'title', type: 'text', required: true },
          { name: 'subtitle', type: 'text', required: true },
          {
            name: 'members',
            type: 'array',
            admin: { description: 'Leave empty to hide the team section' },
            fields: [
              {
                type: 'row',
                fields: [
                  { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
                  { name: 'position', type: 'text', required: true, admin: { width: '50%' } },
                ],
              },
              { name: 'bio', type: 'textarea' },
              { name: 'photo', type: 'upload', relationTo: 'media' },
            ],
          },
        ]),
        section('cta', 'Call to action', [
          { name: 'title', type: 'text', required: true },
          link({ name: 'button' }),
        ]),
        seoTab,
      ],
    },
  ],
})
