import { icon } from '@/fields/icon'
import { image } from '@/fields/image'
import { link } from '@/fields/link'
import { richText } from '@/fields/rich-text'
import { text, textarea } from '@/fields/text'

import { editableGlobal, pageHero, section, seoTab } from './shared'

const heading = text({
  name: 'title',
  max: 60,
  help: 'Section heading. Keep it short so it fits on two or three lines on phones.',
})

export const AboutPage = editableGlobal({
  slug: 'about-page',
  label: 'About',
  group: 'Pages',
  previewAt: '/about',
  fields: [
    {
      type: 'tabs',
      tabs: [
        section('hero', 'Hero', pageHero),
        section('story', 'Story', [
          heading,
          richText({ name: 'content', max: 1500, help: 'The story beside the photo.' }),
          image({ name: 'image', size: 'landscape 4:3, at least 1600 × 1200 px' }),
        ]),
        section('values', 'Values', [
          heading,
          textarea({ name: 'subtitle', max: 160, help: 'One sentence under the heading.' }),
          {
            name: 'items',
            type: 'array',
            required: true,
            minRows: 1,
            maxRows: 6,
            labels: { singular: 'Value', plural: 'Values' },
            admin: { description: '1 to 6 values. Drag to reorder.' },
            fields: [
              text({ name: 'title', max: 30, help: 'Value name.' }),
              textarea({ name: 'description', max: 160, help: 'One or two sentences.' }),
              icon(),
            ],
          },
        ]),
        section('team', 'Team', [
          heading,
          textarea({ name: 'subtitle', max: 160, help: 'One sentence under the heading.' }),
          {
            name: 'members',
            type: 'array',
            maxRows: 6,
            labels: { singular: 'Member', plural: 'Members' },
            admin: { description: 'Up to 6 people. Leave empty to hide the team section.' },
            fields: [
              {
                type: 'row',
                fields: [
                  text({ name: 'name', max: 40, help: 'Full name.', width: '50%' }),
                  text({
                    name: 'position',
                    max: 40,
                    help: 'Job title, shown in small red capitals.',
                    width: '50%',
                  }),
                ],
              },
              textarea({
                name: 'bio',
                max: 240,
                help: 'A few sentences. Optional.',
                required: false,
              }),
              image({
                name: 'photo',
                size: 'portrait 4:5, at least 800 × 1000 px',
                required: false,
                help: 'Optional.',
              }),
            ],
          },
        ]),
        section('cta', 'Call to action', [
          text({ name: 'title', max: 60, help: 'Large heading on the red banner.' }),
          link({ name: 'button' }),
        ]),
        seoTab,
      ],
    },
  ],
})
