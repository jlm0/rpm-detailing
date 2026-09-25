import { icon } from '@/fields/icon'
import { image } from '@/fields/image'
import { link } from '@/fields/link'
import { eyebrow, screenReaderLabel, text, textarea } from '@/fields/text'
import { matches } from '@/fields/validate'

import { editableGlobal, section, seoTab } from './shared'

const heading = text({
  name: 'title',
  max: 60,
  help: 'Section heading. Keep it short so it fits on two or three lines on phones.',
})

export const HomePage = editableGlobal({
  slug: 'home-page',
  label: 'Home',
  group: 'Pages',
  previewAt: '/',
  fields: [
    {
      type: 'tabs',
      tabs: [
        section('hero', 'Hero', [
          {
            name: 'slides',
            type: 'array',
            required: true,
            minRows: 1,
            maxRows: 5,
            labels: { singular: 'Slide', plural: 'Slides' },
            admin: {
              description:
                'Rotating headlines, 1 to 5. Drag to reorder. With one slide the headline stays still.',
            },
            fields: [
              text({
                name: 'eyebrow',
                max: 40,
                help: 'Small capitals above the headline.',
              }),
              text({
                name: 'title',
                max: 60,
                min: 10,
                help: 'The big headline. Keep it under 60 characters so it fits on five lines on phones.',
              }),
            ],
          },
          image({
            name: 'backgroundImage',
            size: 'landscape 16:9, at least 1920 × 1080 px',
            help: 'Shown behind the headline. Phones show a wide crop across the middle, so set a focal point on the car.',
          }),
          link({ name: 'cta', label: 'Button', maxLabel: 24 }),
          {
            type: 'row',
            fields: [
              { name: 'showPhone', type: 'checkbox', defaultValue: true, admin: { width: '33%' } },
              text({
                name: 'phoneLabel',
                max: 20,
                help: 'Shown before the phone number, for example Call Us:',
                width: '33%',
              }),
              {
                name: 'showAddress',
                type: 'checkbox',
                defaultValue: true,
                admin: { width: '33%' },
              },
            ],
          },
        ]),
        section('servicesBar', 'Services bar', [
          {
            name: 'items',
            type: 'array',
            required: true,
            minRows: 3,
            maxRows: 6,
            labels: { singular: 'Service', plural: 'Services' },
            admin: {
              description: 'The strip of 3 to 6 services under the hero. Drag to reorder.',
            },
            fields: [
              {
                type: 'row',
                fields: [
                  text({
                    name: 'label',
                    max: 22,
                    help: 'Fits on two short lines on phones.',
                    width: '50%',
                  }),
                  { ...icon(), admin: { width: '50%' } },
                ],
              },
            ],
          },
        ]),
        section('about', 'About', [
          eyebrow,
          heading,
          textarea({
            name: 'body',
            max: 600,
            min: 40,
            help: 'Leave a blank line between paragraphs.',
          }),
          image({ name: 'image', size: 'landscape 4:3, at least 1600 × 1200 px' }),
          {
            type: 'row',
            fields: [
              {
                name: 'badgeSuffix',
                type: 'text',
                maxLength: 3,
                defaultValue: '+',
                admin: {
                  width: '33%',
                  description:
                    'Shown after the years of experience, for example + makes 5+. Up to 3 characters, or leave empty.',
                },
              },
              text({
                name: 'badgeLabel',
                max: 28,
                help: 'Shown under the years of experience set in Business & SEO.',
                width: '67%',
              }),
            ],
          },
          link({ name: 'cta', label: 'Button' }),
        ]),
        section('transformation', 'Transformation', [
          eyebrow,
          heading,
          textarea({
            name: 'body',
            max: 600,
            min: 40,
            help: 'Leave a blank line between paragraphs.',
          }),
          {
            name: 'features',
            type: 'array',
            maxRows: 6,
            labels: { singular: 'Feature', plural: 'Features' },
            admin: { description: 'Up to 6 ticked points under the text. Optional.' },
            fields: [text({ name: 'feature', max: 60, help: 'One short point.' })],
          },
          {
            name: 'gallery',
            type: 'upload',
            relationTo: 'media',
            hasMany: true,
            required: true,
            minRows: 3,
            maxRows: 3,
            admin: {
              description:
                'Exactly 3 photos. The first is shown tall (portrait 1:2, at least 800 × 1600 px), the other two square (at least 800 × 800 px).',
            },
          },
        ]),
        section('packages', 'Packages', [
          eyebrow,
          heading,
          {
            name: 'services',
            label: 'Featured packages',
            type: 'relationship',
            relationTo: 'services',
            hasMany: true,
            required: true,
            minRows: 1,
            maxRows: 6,
            admin: {
              description:
                'Up to 6 packages shown on the Home page. Edit prices in Service Packages.',
            },
          },
          link({ name: 'cardButton', label: 'Package button', maxLabel: 14 }),
          link({ name: 'viewAll', label: 'View all button' }),
        ]),
        section('ctaBanner', 'Booking steps', [
          eyebrow,
          text({
            name: 'heading',
            max: 60,
            help: 'Section heading. Keep it short so it fits on two or three lines on phones.',
          }),
          {
            name: 'steps',
            type: 'array',
            required: true,
            minRows: 3,
            maxRows: 3,
            labels: { singular: 'Step', plural: 'Steps' },
            admin: { description: 'Always three steps, shown side by side on large screens.' },
            fields: [
              text({ name: 'title', max: 30, help: 'Step name.' }),
              textarea({ name: 'description', max: 160, help: 'One or two sentences.' }),
              icon(),
            ],
          },
          link({ name: 'button' }),
        ]),
        section('process', 'Process', [
          eyebrow,
          heading,
          {
            name: 'steps',
            type: 'array',
            required: true,
            minRows: 2,
            maxRows: 6,
            labels: { singular: 'Step', plural: 'Steps' },
            admin: { description: '2 to 6 steps. Each step is a tab with its own photo.' },
            fields: [
              text({ name: 'title', max: 24, help: 'Tab name, also shown on the photo.' }),
              image({
                name: 'image',
                size: 'landscape 2:1, at least 2000 × 1000 px',
                help: 'Phones crop the sides to 4:3, so keep the subject near the centre.',
              }),
            ],
          },
          {
            type: 'row',
            fields: [
              screenReaderLabel('previousLabel', 'Previous button', 'Previous step'),
              screenReaderLabel('nextLabel', 'Next button', 'Next step'),
            ],
          },
          {
            name: 'stats',
            type: 'array',
            maxRows: 4,
            labels: { singular: 'Stat', plural: 'Stats' },
            admin: { description: 'Up to 4 numbers under the photos. Optional.' },
            fields: [
              {
                type: 'row',
                fields: [
                  text({
                    name: 'value',
                    max: 6,
                    help: 'Shown very large. Start with a number, for example 850, 1,000+, 24/7 or 100%.',
                    width: '33%',
                    validate: matches(
                      /^\$?\d[\d,./]*[kKmM]?[+%]?$/,
                      'Start with a number, for example 850, 1,000+, 24/7 or 100%',
                    ),
                  }),
                  text({ name: 'label', max: 24, help: 'Shown under the number.', width: '33%' }),
                  { ...icon(), admin: { width: '34%' } },
                ],
              },
            ],
          },
        ]),
        section('testimonials', 'Testimonials', [
          eyebrow,
          heading,
          {
            name: 'limit',
            label: 'Reviews shown',
            type: 'number',
            required: true,
            min: 1,
            max: 12,
            defaultValue: 9,
            admin: {
              step: 1,
              description:
                'How many published reviews to show, 1 to 12, in the order of the Testimonials list.',
            },
          },
          {
            type: 'row',
            fields: [
              screenReaderLabel('previousLabel', 'Previous button', 'Previous review'),
              screenReaderLabel('nextLabel', 'Next button', 'Next review'),
            ],
          },
        ]),
        section('brands', 'Brands', [
          text({
            name: 'title',
            max: 60,
            help: 'Heading above the car brand logos.',
          }),
          link({ name: 'button' }),
        ]),
        seoTab,
      ],
    },
  ],
})
