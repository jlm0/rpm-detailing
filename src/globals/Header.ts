import type { TextFieldSingleValidation } from 'payload'

import { link, validateUrl } from '@/fields/link'
import { screenReaderLabel, text, textarea } from '@/fields/text'

import { collapsed, editableGlobal, panel } from './shared'

const part = 'header'

const validateNavUrl: TextFieldSingleValidation = (value, options) =>
  (options.siblingData as { type?: string }).type !== 'link' || validateUrl(value, options)

export const Header = editableGlobal({
  slug: part,
  description: 'The bar at the top of every page, left to right, and the menus it opens.',
  fields: [
    {
      type: 'tabs',
      tabs: [
        panel(part, 'menu', [
          {
            name: 'navItems',
            label: 'Menu items',
            type: 'array',
            required: true,
            minRows: 1,
            maxRows: 6,
            labels: { singular: 'Menu item', plural: 'Menu items' },
            admin: {
              description:
                'Up to 6 items. Longer menus switch to the menu button on more screen sizes so they never overlap.',
            },
            fields: [
              {
                type: 'row',
                fields: [
                  text({ name: 'label', max: 14, help: 'One or two words.', width: '34%' }),
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
                    maxLength: 300,
                    admin: {
                      width: '33%',
                      condition: (_, siblingData) => siblingData.type === 'link',
                      description:
                        'A page like /services or a home page section like #testimonials',
                    },
                    validate: validateNavUrl,
                  },
                ],
              },
            ],
          },
          collapsed('Screen reader labels', [
            {
              name: 'skipLinkLabel',
              label: 'Skip link label',
              type: 'text',
              required: true,
              maxLength: 40,
              defaultValue: 'Skip to content',
              admin: {
                description:
                  'Appears when keyboard users press Tab, to jump past the menu. Up to 40 characters.',
              },
            },
          ]),
        ]),
        panel(part, 'button', [
          {
            name: 'showCta',
            label: 'Show header button',
            type: 'checkbox',
            defaultValue: true,
          },
          {
            ...link({ name: 'cta', label: 'Header button', maxLabel: 16 }),
            admin: { condition: (data) => Boolean(data.showCta) },
          },
        ]),
        panel(part, 'phoneMenu', [
          {
            name: 'mobileMenu',
            label: false,
            type: 'group',
            fields: [
              text({ name: 'title', max: 20, help: 'Small capitals at the top of the menu.' }),
              collapsed('Screen reader labels', [
                {
                  type: 'row',
                  fields: [
                    screenReaderLabel('openLabel', 'Open label', 'Open menu'),
                    screenReaderLabel('closeLabel', 'Close label', 'Close menu'),
                  ],
                },
              ]),
            ],
          },
        ]),
        panel(part, 'contactPopup', [
          {
            name: 'contactPopup',
            label: false,
            type: 'group',
            fields: [
              text({ name: 'title', max: 40, help: 'Heading at the top of the popup.' }),
              {
                type: 'row',
                fields: [
                  text({ name: 'contactHeading', max: 24, help: 'Small capitals.', width: '50%' }),
                  text({ name: 'hoursHeading', max: 24, help: 'Small capitals.', width: '50%' }),
                ],
              },
              text({ name: 'ctaHeading', max: 30, help: 'Heading in the booking box.' }),
              textarea({
                name: 'ctaText',
                max: 160,
                help: 'One or two sentences in the booking box.',
              }),
              link({ name: 'ctaButton', label: 'Button' }),
              collapsed('Screen reader labels', [
                screenReaderLabel('closeLabel', 'Close label', 'Close contact details'),
              ]),
            ],
          },
        ]),
      ],
    },
  ],
})
