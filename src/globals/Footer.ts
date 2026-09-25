import { link } from '@/fields/link'
import { text, textarea } from '@/fields/text'

import { editableGlobal } from './shared'

export const Footer = editableGlobal({
  slug: 'footer',
  label: 'Footer',
  group: 'Site',
  previewAt: '/',
  description: 'Contact details and opening hours come from Business & SEO',
  fields: [
    textarea({ name: 'description', max: 200, help: 'Shown under the logo.' }),
    {
      type: 'row',
      fields: [
        text({ name: 'contactHeading', max: 24, help: 'Small capitals.', width: '50%' }),
        text({ name: 'hoursHeading', max: 24, help: 'Small capitals.', width: '50%' }),
      ],
    },
    {
      name: 'cta',
      label: 'Call to action',
      type: 'group',
      fields: [
        text({ name: 'heading', max: 30, help: 'Heading in the booking box.' }),
        textarea({ name: 'text', max: 160, help: 'One or two sentences in the booking box.' }),
        link({ name: 'button' }),
      ],
    },
    text({
      name: 'copyright',
      max: 80,
      help: 'The small line at the bottom. {year} is replaced with the current year.',
    }),
  ],
})
