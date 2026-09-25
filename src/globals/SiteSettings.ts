import type { EmailFieldValidation, TextFieldSingleValidation } from 'payload'
import { email } from 'payload/shared'

import { adminsFieldLevel } from '@/access'
import { image } from '@/fields/image'
import { text, textarea } from '@/fields/text'
import { matches, wholeNumber } from '@/fields/validate'

import { collapsed, editableGlobal, section } from './shared'

const part = 'site-settings'

const phoneCharacters = matches(
  /^\+?[\d\s().-]+$/,
  'Use digits, spaces, brackets, dashes or a leading +',
)

const validatePhone: TextFieldSingleValidation = (value, options) => {
  const valid = phoneCharacters(value, options)
  if (valid !== true || !value) return valid
  const digits = value.replace(/\D/g, '').length
  return (digits >= 7 && digits <= 15) || 'A phone number has 7 to 15 digits'
}

const validateEmail: EmailFieldValidation = (value, options) => {
  const valid = email(value, options)
  if (valid !== true || !value) return valid
  return value.length <= 60 || 'Keep the email address under 60 characters'
}

export const SiteSettings = editableGlobal({
  slug: part,
  description:
    'Business details, logo and search defaults used across every page. Change them here once and every page updates.',
  fields: [
    {
      type: 'tabs',
      tabs: [
        section(part, 'business', [
          text({
            name: 'name',
            label: 'Business name',
            max: 40,
            help: 'Used in page titles, the error page and wherever the logo is missing.',
          }),
          {
            type: 'row',
            fields: [
              {
                name: 'phone',
                type: 'text',
                required: true,
                maxLength: 20,
                validate: validatePhone,
                admin: {
                  width: '50%',
                  description: 'Shown in the header popup, footer, hero and booking page.',
                },
              },
              {
                name: 'email',
                type: 'email',
                required: true,
                validate: validateEmail,
                admin: {
                  width: '50%',
                  description:
                    'Shown in the footer, contact popup and booking page. Up to 60 characters.',
                },
              },
            ],
          },
          text({
            name: 'address',
            max: 80,
            help: 'Shown in the hero, footer and contact popup, for example Boise, ID, USA.',
          }),
          {
            name: 'hours',
            label: 'Opening hours',
            type: 'array',
            required: true,
            minRows: 1,
            maxRows: 7,
            labels: { singular: 'Day', plural: 'Days' },
            admin: { description: 'One row per day or group of days, up to 7.' },
            fields: [
              {
                type: 'row',
                fields: [
                  text({
                    name: 'days',
                    max: 20,
                    help: 'For example Mon - Fri.',
                    width: '50%',
                  }),
                  text({
                    name: 'time',
                    max: 30,
                    help: 'For example 8:00 am - 6:00 pm or Closed.',
                    width: '50%',
                  }),
                ],
              },
            ],
          },
          {
            name: 'yearsOfExperience',
            type: 'number',
            required: true,
            min: 0,
            max: 99,
            validate: wholeNumber,
            admin: {
              step: 1,
              description:
                'A whole number from 0 to 99, shown as the badge on the Home page. Use 0 to hide the badge.',
            },
          },
        ]),
        section(part, 'branding', [
          image({
            name: 'logo',
            size: 'a white logo on a transparent background, PNG or WebP, at least 600 px wide and about 4 times wider than tall',
            help: 'Shown in the header and footer on a dark background.',
          }),
          {
            name: 'brandColor',
            type: 'text',
            required: true,
            defaultValue: '#D9232D',
            validate: matches(/^#[\da-f]{6}$/i, 'Use a 6 digit hex colour like #D9232D'),
            admin: {
              description:
                'Hex colour used for the browser theme and booking calendar, like #D9232D.',
            },
          },
        ]),
        section(part, 'notFound', [
          text({ name: 'title', max: 40, help: 'Shown under the large 404.' }),
          textarea({ name: 'message', max: 160, help: 'One or two sentences.' }),
          text({ name: 'buttonLabel', max: 24, help: 'Button back to the home page.' }),
        ]),
        section(part, 'errorPage', [
          text({
            name: 'title',
            max: 40,
            help: 'Shown if a page fails to load, under the business name.',
          }),
          textarea({ name: 'message', max: 200, help: 'One or two sentences.' }),
          text({ name: 'retryLabel', max: 24, help: 'Button that reloads the page.' }),
        ]),
        section(part, 'seo', [
          text({
            name: 'titleSuffix',
            max: 25,
            help: 'Added after each page title in search results, for example | RPM Detailing.',
          }),
          textarea({
            name: 'description',
            min: 50,
            max: 160,
            help: 'Used in search results when a page has no SEO description of its own. At least 50 characters.',
          }),
          image({
            name: 'image',
            label: 'Share card photo',
            size: '1200 × 630 px',
            help: 'Shown in the share card of pages without a photo of their own, such as Booking.',
          }),
          collapsed('Advanced', [
            {
              name: 'siteUrl',
              label: 'Site URL',
              type: 'text',
              required: true,
              maxLength: 100,
              validate: matches(
                /^https?:\/\/[^\s/]+$/,
                'Use the full address without a trailing slash, like https://rpmdetail.co',
              ),
              access: { update: adminsFieldLevel },
              admin: {
                description:
                  'The public address, for example https://rpmdetail.co. Only admins can change it.',
              },
            },
            text({
              name: 'keywords',
              max: 200,
              help: 'Optional, separated by commas.',
              required: false,
            }),
            {
              name: 'twitterHandle',
              type: 'text',
              maxLength: 15,
              validate: matches(
                /^\w{1,15}$/,
                'Letters, numbers and underscores only, without the @',
              ),
              admin: { description: 'Optional. Without the @.' },
            },
          ]),
        ]),
      ],
    },
  ],
})
