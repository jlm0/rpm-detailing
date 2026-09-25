import { editableGlobal, section } from './shared'

export const SiteSettings = editableGlobal({
  slug: 'site-settings',
  label: 'Business & SEO',
  group: 'Site',
  previewAt: '/',
  description: 'Business details, branding and search defaults used across every page',
  fields: [
    {
      type: 'tabs',
      tabs: [
        section('business', 'Business', [
          { name: 'name', label: 'Business name', type: 'text', required: true },
          {
            type: 'row',
            fields: [
              { name: 'phone', type: 'text', required: true, admin: { width: '50%' } },
              { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
            ],
          },
          { name: 'address', type: 'text', required: true },
          {
            name: 'hours',
            label: 'Opening hours',
            type: 'array',
            required: true,
            minRows: 1,
            labels: { singular: 'Day', plural: 'Days' },
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'days',
                    type: 'text',
                    required: true,
                    admin: { width: '50%', description: 'For example Mon - Fri' },
                  },
                  {
                    name: 'time',
                    type: 'text',
                    required: true,
                    admin: { width: '50%', description: 'For example 8:00 am - 6:00 pm or Closed' },
                  },
                ],
              },
            ],
          },
          {
            name: 'yearsOfExperience',
            type: 'number',
            required: true,
            min: 0,
            admin: { description: 'Shown as the badge on the Home page about section' },
          },
        ]),
        section('branding', 'Branding', [
          {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: { description: 'Shown in the header and footer on a dark background' },
          },
          {
            name: 'brandColor',
            type: 'text',
            required: true,
            defaultValue: '#D9232D',
            admin: { description: 'Hex colour used for the browser theme and booking calendar' },
          },
        ]),
        section('seo', 'SEO defaults', [
          {
            name: 'siteUrl',
            label: 'Site URL',
            type: 'text',
            required: true,
            admin: { description: 'The public address, for example https://rpmdetail.co' },
          },
          {
            name: 'titleSuffix',
            type: 'text',
            required: true,
            admin: { description: 'Added after each page title, for example | RPM Detailing' },
          },
          {
            name: 'description',
            type: 'textarea',
            required: true,
            admin: { description: 'Used when a page has no SEO description of its own' },
          },
          { name: 'keywords', type: 'text' },
          {
            name: 'image',
            label: 'Share image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: { description: 'Used when a page has no SEO image of its own' },
          },
          {
            name: 'twitterHandle',
            type: 'text',
            admin: { description: 'Without the @' },
          },
        ]),
        section('notFound', '404 page', [
          { name: 'title', type: 'text', required: true },
          { name: 'message', type: 'textarea', required: true },
          { name: 'buttonLabel', type: 'text', required: true },
        ]),
      ],
    },
  ],
})
