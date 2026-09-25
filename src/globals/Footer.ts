import { link } from '@/fields/link'
import { text, textarea } from '@/fields/text'

import { editableGlobal, panel } from './shared'

const part = 'footer'

export const Footer = editableGlobal({
  slug: part,
  description:
    'The dark band at the bottom of every page, left to right. Contact details and opening hours come from Business & SEO.',
  fields: [
    {
      type: 'tabs',
      tabs: [
        panel(part, 'intro', [
          textarea({ name: 'description', max: 200, help: 'Shown under the logo.' }),
        ]),
        panel(part, 'contact', [
          {
            type: 'row',
            fields: [
              text({ name: 'contactHeading', max: 24, help: 'Small capitals.', width: '50%' }),
              text({ name: 'hoursHeading', max: 24, help: 'Small capitals.', width: '50%' }),
            ],
          },
        ]),
        panel(part, 'booking', [
          {
            name: 'cta',
            label: false,
            type: 'group',
            fields: [
              text({ name: 'heading', max: 30, help: 'Heading in the booking box.' }),
              textarea({
                name: 'text',
                max: 160,
                help: 'One or two sentences in the booking box.',
              }),
              link({ name: 'button' }),
            ],
          },
        ]),
        panel(part, 'copyright', [
          text({
            name: 'copyright',
            max: 80,
            help: 'The small line at the bottom. {year} is replaced with the current year.',
          }),
        ]),
      ],
    },
  ],
})
