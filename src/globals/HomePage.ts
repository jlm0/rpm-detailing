import { icon } from '@/fields/icon'
import { link } from '@/fields/link'

import { editableGlobal, section, seoTab } from './shared'

const eyebrow = {
  name: 'eyebrow',
  type: 'text',
  required: true,
  admin: { description: 'Small text above the heading' },
} as const

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
            admin: { description: 'Rotating headlines. Drag to reorder.' },
            fields: [eyebrow, { name: 'title', type: 'text', required: true }],
          },
          { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
          link({ name: 'cta', label: 'Button' }),
          {
            type: 'row',
            fields: [
              { name: 'showPhone', type: 'checkbox', defaultValue: true, admin: { width: '33%' } },
              {
                name: 'phoneLabel',
                type: 'text',
                required: true,
                admin: { width: '33%', description: 'For example Call Us:' },
              },
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
            minRows: 1,
            admin: { description: 'The strip of services under the hero. Drag to reorder.' },
            fields: [
              {
                type: 'row',
                fields: [
                  { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
                  { ...icon(), admin: { width: '50%' } },
                ],
              },
            ],
          },
        ]),
        section('about', 'About', [
          eyebrow,
          { name: 'title', type: 'text', required: true },
          { name: 'body', type: 'textarea', required: true },
          { name: 'image', type: 'upload', relationTo: 'media', required: true },
          {
            name: 'badgeLabel',
            type: 'text',
            required: true,
            admin: { description: 'Shown under the years of experience from Business & SEO' },
          },
          link({ name: 'cta', label: 'Button' }),
        ]),
        section('transformation', 'Transformation', [
          eyebrow,
          { name: 'title', type: 'text', required: true },
          { name: 'body', type: 'textarea', required: true },
          {
            name: 'features',
            type: 'array',
            fields: [{ name: 'feature', type: 'text', required: true }],
          },
          {
            name: 'gallery',
            type: 'upload',
            relationTo: 'media',
            hasMany: true,
            required: true,
            minRows: 3,
            maxRows: 3,
          },
        ]),
        section('packages', 'Packages', [
          eyebrow,
          { name: 'title', type: 'text', required: true },
          {
            name: 'services',
            label: 'Featured packages',
            type: 'relationship',
            relationTo: 'services',
            hasMany: true,
            required: true,
            minRows: 1,
            admin: {
              description: 'Packages shown on the Home page. Edit prices in Service Packages.',
            },
          },
          link({ name: 'cardButton', label: 'Package button' }),
          link({ name: 'viewAll', label: 'View all button' }),
        ]),
        section('ctaBanner', 'Booking steps', [
          eyebrow,
          { name: 'heading', type: 'text', required: true },
          {
            name: 'steps',
            type: 'array',
            required: true,
            minRows: 3,
            maxRows: 3,
            fields: [
              { name: 'title', type: 'text', required: true },
              { name: 'description', type: 'textarea', required: true },
              icon(),
            ],
          },
          link({ name: 'button' }),
        ]),
        section('process', 'Process', [
          eyebrow,
          { name: 'title', type: 'text', required: true },
          {
            name: 'steps',
            type: 'array',
            required: true,
            minRows: 1,
            admin: { description: 'Each step is a tab with its own photo' },
            fields: [
              { name: 'title', type: 'text', required: true },
              { name: 'image', type: 'upload', relationTo: 'media', required: true },
            ],
          },
          {
            name: 'stats',
            type: 'array',
            maxRows: 4,
            fields: [
              {
                type: 'row',
                fields: [
                  { name: 'value', type: 'text', required: true, admin: { width: '33%' } },
                  { name: 'label', type: 'text', required: true, admin: { width: '33%' } },
                  { ...icon(), admin: { width: '34%' } },
                ],
              },
            ],
          },
        ]),
        section('testimonials', 'Testimonials', [
          eyebrow,
          { name: 'title', type: 'text', required: true },
        ]),
        section('brands', 'Brands', [
          { name: 'title', type: 'text', required: true },
          link({ name: 'button' }),
        ]),
        seoTab,
      ],
    },
  ],
})
