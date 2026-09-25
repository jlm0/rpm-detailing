import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Access } from 'payload'
import sharp from 'sharp'

import type { User } from './payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isAdmin: Access<User> = ({ req: { user } }) => {
  return user?.role === 'admin'
}

const isAdminOrEditor: Access<User> = ({ req: { user } }) => {
  return Boolean(user && (user.role === 'admin' || user.role === 'editor'))
}

const isAdminOrSelf: Access<User> = ({ req: { user } }) => {
  if (user?.role === 'admin') {
    return true
  }
  if (user) {
    return {
      id: {
        equals: user.id,
      },
    }
  }
  return false
}

// Determine the server URL based on environment
const getServerURL = () => {
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

export default buildConfig({
  serverURL: getServerURL(),
  admin: {
    user: 'users',
    meta: {
      title: 'RPM Detailing CMS',
      titleSuffix: '- RPM Detailing',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  plugins: [
    // Only enable Vercel Blob storage if token is available
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
  csrf: [
    // Add all trusted origins for cookie authentication
    'https://www.rpmdetail.co',
    'https://rpmdetail.co',
    'https://rpm-detailing.vercel.app',
    getServerURL(),
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    'http://localhost:3000',
    // Add wildcard pattern for Vercel preview deployments
    ...(process.env.VERCEL_ENV === 'preview' ? [`https://*-rpm-detailing.vercel.app`] : []),
  ].filter(Boolean),
  globals: [
    {
      slug: 'site-settings',
      label: 'Site Settings',
      admin: {
        description:
          'Global settings for the entire website including company info, navigation, and branding',
      },
      access: {
        read: () => true,
        update: isAdminOrEditor,
      },
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Company Info',
              fields: [
                {
                  name: 'companyName',
                  type: 'text',
                  defaultValue: 'RPM Detailing',
                },
                {
                  name: 'phone',
                  type: 'text',
                  defaultValue: '(425) 345-3564',
                },
                {
                  name: 'email',
                  type: 'email',
                  defaultValue: 'support@rpm-detailing.com',
                },
                {
                  name: 'address',
                  type: 'text',
                  defaultValue: 'Boise, ID, USA',
                },
                {
                  name: 'yearsOfExperience',
                  type: 'number',
                  label: 'Years of Experience',
                  defaultValue: 20,
                },
                {
                  name: 'hours',
                  type: 'group',
                  fields: [
                    {
                      name: 'weekdays',
                      type: 'text',
                      defaultValue: 'Mon - Fri: 8.00 am - 6.00 pm',
                    },
                    {
                      name: 'saturday',
                      type: 'text',
                      defaultValue: 'Saturday: 9.00 am - 4.00 pm',
                    },
                    {
                      name: 'sunday',
                      type: 'text',
                      defaultValue: 'Sunday: Closed',
                    },
                  ],
                },
                {
                  name: 'contactInfo',
                  type: 'group',
                  label: 'Additional Contact Info',
                  fields: [
                    {
                      name: 'additionalPhones',
                      type: 'array',
                      label: 'Additional Phone Numbers',
                      fields: [
                        {
                          name: 'number',
                          type: 'text',
                        },
                        {
                          name: 'label',
                          type: 'text',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: 'Branding',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Light version of the logo for dark backgrounds',
                  },
                },
                {
                  name: 'darkLogo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Dark version of the logo for light backgrounds',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Footer Description',
                  defaultValue:
                    "Your trusted partner for premium car detailing services. We restore and protect your vehicle's beauty with meticulous care.",
                },
                {
                  name: 'copyright',
                  type: 'text',
                  defaultValue: '© {year} RPM Detailing. All Rights Reserved.',
                  admin: {
                    description: 'Use {year} to automatically insert the current year',
                  },
                },
                {
                  name: 'footerSectionTitles',
                  type: 'group',
                  label: 'Footer Section Titles',
                  fields: [
                    {
                      name: 'contactInfoTitle',
                      type: 'text',
                      defaultValue: 'Contact Info',
                    },
                    {
                      name: 'openingHoursTitle',
                      type: 'text',
                      defaultValue: 'Opening Hours',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Footer CTA',
              fields: [
                {
                  name: 'footerCTA',
                  type: 'group',
                  label: 'Footer Call-to-Action',
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                      defaultValue: 'Need Help?',
                    },
                    {
                      name: 'text',
                      type: 'text',
                      defaultValue:
                        'Ready for a showroom shine? Book your car detailing appointment today!',
                    },
                    {
                      name: 'buttonText',
                      type: 'text',
                      defaultValue: 'Book Now',
                    },
                    {
                      name: 'buttonLink',
                      type: 'text',
                      defaultValue: '/booking',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Navigation',
              fields: [
                {
                  name: 'navigation',
                  type: 'array',
                  label: 'Navigation Menu',
                  admin: {
                    description:
                      'Main navigation menu items. Items will be sorted by order number.',
                  },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                    },
                    {
                      name: 'link',
                      type: 'text',
                      admin: {
                        description:
                          'Use / for home, /services for services page, #section-name for sections',
                      },
                    },
                    {
                      name: 'order',
                      type: 'number',
                      defaultValue: 0,
                    },
                  ],
                },
                {
                  name: 'headerCTA',
                  type: 'group',
                  label: 'Header Call-to-Action',
                  fields: [
                    {
                      name: 'show',
                      type: 'checkbox',
                      label: 'Show CTA Button',
                      defaultValue: true,
                    },
                    {
                      name: 'text',
                      type: 'text',
                      defaultValue: 'Book Now',
                    },
                    {
                      name: 'link',
                      type: 'text',
                      defaultValue: '/booking',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Integrations',
              fields: [
                {
                  name: 'calcom',
                  type: 'group',
                  label: 'Cal.com Integration',
                  fields: [
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      label: 'Enable Cal.com Booking',
                      defaultValue: true,
                    },
                    {
                      name: 'link',
                      type: 'text',
                      label: 'Cal.com Booking Link',
                      admin: {
                        description:
                          'Your Cal.com username or team slug (e.g., "yourname" for cal.com/yourname)',
                      },
                    },
                    {
                      name: 'eventSlug',
                      type: 'text',
                      label: 'Event Type Slug',
                      admin: {
                        description:
                          'Optional: specific event type slug (e.g., "30min" for cal.com/yourname/30min)',
                      },
                    },
                    {
                      name: 'fallbackTitle',
                      type: 'text',
                      label: 'Fallback Title',
                      defaultValue: 'Book Your Detailing Service',
                      admin: {
                        description: 'Title to show when Cal.com is disabled',
                      },
                    },
                    {
                      name: 'fallbackMessage',
                      type: 'textarea',
                      label: 'Fallback Message',
                      defaultValue:
                        'Online booking is currently unavailable. Please contact us directly to schedule your appointment.',
                      admin: {
                        description: 'Message to show when Cal.com is disabled',
                      },
                    },
                  ],
                },
              ],
            },
            {
              label: 'SEO & Metadata',
              fields: [
                {
                  name: 'siteUrl',
                  type: 'text',
                  label: 'Site URL',
                  defaultValue: 'https://rpmdetail.co',
                  admin: {
                    description: 'The full URL of your website (without trailing slash)',
                  },
                },
                {
                  name: 'siteDescription',
                  type: 'textarea',
                  label: 'Site Description',
                  defaultValue:
                    "Transform your vehicle with RPM Detailing's premium auto detailing services in Boise. Ceramic coating, paint correction, and full interior/exterior detailing.",
                  admin: {
                    description: 'Default meta description for the site',
                  },
                },
                {
                  name: 'keywords',
                  type: 'text',
                  label: 'Keywords',
                  defaultValue:
                    'auto detailing, car detailing, ceramic coating, paint correction, Boise, Idaho, RPM Detailing',
                  admin: {
                    description: 'Comma-separated keywords for SEO',
                  },
                },
                {
                  name: 'location',
                  type: 'group',
                  label: 'Business Location',
                  fields: [
                    {
                      name: 'city',
                      type: 'text',
                      defaultValue: 'Boise',
                    },
                    {
                      name: 'state',
                      type: 'text',
                      defaultValue: 'ID',
                    },
                    {
                      name: 'country',
                      type: 'text',
                      defaultValue: 'USA',
                    },
                  ],
                },
                {
                  name: 'themeColor',
                  type: 'text',
                  label: 'Theme Color',
                  defaultValue: '#D9232D',
                  admin: {
                    description: 'Browser theme color (hex format)',
                  },
                },
                {
                  name: 'locale',
                  type: 'select',
                  label: 'Locale',
                  defaultValue: 'en_US',
                  options: [
                    { label: 'English (US)', value: 'en_US' },
                    { label: 'Spanish (US)', value: 'es_US' },
                  ],
                },
                {
                  name: 'openGraph',
                  type: 'group',
                  label: 'Open Graph Settings',
                  fields: [
                    {
                      name: 'defaultImage',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Default OG Image',
                      admin: {
                        description:
                          'Default image for social media sharing (recommended: 1200x630)',
                      },
                    },
                    {
                      name: 'imageWidth',
                      type: 'number',
                      defaultValue: 1200,
                      admin: {
                        description: 'Open Graph image width in pixels',
                      },
                    },
                    {
                      name: 'imageHeight',
                      type: 'number',
                      defaultValue: 630,
                      admin: {
                        description: 'Open Graph image height in pixels',
                      },
                    },
                  ],
                },
                {
                  name: 'twitter',
                  type: 'group',
                  label: 'Twitter/X Settings',
                  fields: [
                    {
                      name: 'handle',
                      type: 'text',
                      label: 'Twitter Handle',
                      admin: {
                        description: 'Twitter username without @ symbol',
                      },
                    },
                    {
                      name: 'cardType',
                      type: 'select',
                      label: 'Card Type',
                      defaultValue: 'summary_large_image',
                      options: [
                        { label: 'Summary', value: 'summary' },
                        { label: 'Summary Large Image', value: 'summary_large_image' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: 'landing-page',
      label: 'Landing Page',
      admin: {
        description: 'Manage all content sections for the home/landing page',
      },
      access: {
        read: () => true,
        update: isAdminOrEditor,
      },
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Hero Section',
              fields: [
                {
                  name: 'heroSlides',
                  type: 'array',
                  label: 'Hero Slides',
                  admin: {
                    description: 'Rotating slides for the hero banner (recommended: 3 slides)',
                    initCollapsed: false,
                  },
                  minRows: 1,
                  maxRows: 5,
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Slide Title',
                    },
                    {
                      name: 'subtitle',
                      type: 'text',
                      label: 'Slide Subtitle',
                    },
                  ],
                },
                {
                  name: 'hero',
                  type: 'group',
                  label: 'Hero Settings',
                  admin: {
                    description: 'Common settings for all hero slides',
                  },
                  fields: [
                    {
                      name: 'backgroundImage',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Background Image (applies to all slides)',
                    },
                    {
                      name: 'ctaText',
                      type: 'text',
                      defaultValue: 'Book Now',
                    },
                    {
                      name: 'ctaLink',
                      type: 'text',
                      defaultValue: '/booking',
                    },
                    {
                      name: 'showPhoneNumbers',
                      type: 'checkbox',
                      label: 'Show Phone Numbers',
                      defaultValue: true,
                    },
                    {
                      name: 'showAddress',
                      type: 'checkbox',
                      label: 'Show Address',
                      defaultValue: true,
                    },
                  ],
                },
              ],
            },
            {
              label: 'Services Overview',
              fields: [
                {
                  name: 'servicesBar',
                  type: 'array',
                  label: 'Services Bar Items',
                  admin: {
                    description: 'Quick overview of services shown below the hero section',
                  },
                  fields: [
                    {
                      name: 'order',
                      type: 'number',
                    },
                    {
                      name: 'icon',
                      type: 'select',
                      options: [
                        { label: 'Spray Can', value: 'SprayCan' },
                        { label: 'Car', value: 'Car' },
                        { label: 'Sparkles', value: 'Sparkles' },
                        { label: 'Wind', value: 'Wind' },
                        { label: 'Shield Check', value: 'ShieldCheck' },
                        { label: 'Palette', value: 'Palette' },
                      ],
                    },
                    {
                      name: 'title',
                      type: 'text',
                    },
                    {
                      name: 'description',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              label: 'About Section',
              fields: [
                {
                  name: 'aboutSection',
                  type: 'group',
                  label: 'About Us Section',
                  admin: {
                    description: 'Brief about section on the landing page',
                  },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                    },
                    {
                      name: 'subtitle',
                      type: 'text',
                    },
                    {
                      name: 'content',
                      type: 'richText',
                      editor: lexicalEditor({}),
                    },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                    },
                    {
                      name: 'imageAltText',
                      type: 'text',
                      defaultValue: 'Professional car polishing service',
                    },
                    {
                      name: 'experienceBadgeText',
                      type: 'text',
                      defaultValue: 'Years of Experience',
                    },
                    {
                      name: 'bookNowText',
                      type: 'text',
                      defaultValue: 'Book Now',
                    },
                    {
                      name: 'features',
                      type: 'array',
                      fields: [
                        {
                          name: 'feature',
                          type: 'text',
                        },
                      ],
                    },
                    {
                      name: 'stats',
                      type: 'array',
                      label: 'Statistics',
                      fields: [
                        {
                          name: 'value',
                          type: 'text',
                        },
                        {
                          name: 'label',
                          type: 'text',
                        },
                        {
                          name: 'icon',
                          type: 'select',
                          options: [
                            { label: 'Users', value: 'Users' },
                            { label: 'Car', value: 'Car' },
                            { label: 'Award', value: 'Award' },
                            { label: 'Settings 2', value: 'Settings2' },
                            { label: 'Trophy', value: 'Trophy' },
                            { label: 'Clock', value: 'Clock' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: 'Services Details',
              fields: [
                {
                  name: 'servicesSection',
                  type: 'group',
                  label: 'Services Section Settings',
                  fields: [
                    {
                      name: 'sectionSubtitle',
                      type: 'text',
                      defaultValue: 'OUR DETAILING PACKAGES',
                    },
                    {
                      name: 'sectionTitle',
                      type: 'text',
                      defaultValue: 'Transform Your Vehicle with Our Expert Detailing',
                    },
                    {
                      name: 'bookNowText',
                      type: 'text',
                      defaultValue: 'Book Now',
                    },
                    {
                      name: 'viewAllText',
                      type: 'text',
                      defaultValue: 'View All Services',
                    },
                  ],
                },
                {
                  name: 'detailedServices',
                  type: 'array',
                  label: 'Detailed Service Packages',
                  admin: {
                    description: 'Detailed service packages shown on the landing page',
                  },
                  fields: [
                    {
                      name: 'order',
                      type: 'number',
                    },
                    {
                      name: 'packageId',
                      type: 'text',
                    },
                    {
                      name: 'title',
                      type: 'text',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                    },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                    },
                    {
                      name: 'price',
                      type: 'text',
                      label: 'Starting Price',
                    },
                    {
                      name: 'duration',
                      type: 'text',
                      label: 'Service Duration',
                    },
                  ],
                },
              ],
            },
            {
              label: 'CTA Banner',
              fields: [
                {
                  name: 'ctaBanner',
                  type: 'group',
                  label: 'Call-to-Action Banner',
                  admin: {
                    description: 'Mid-page call-to-action section with process steps',
                  },
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                    },
                    {
                      name: 'buttonText',
                      type: 'text',
                      defaultValue: 'Book Now',
                    },
                    {
                      name: 'buttonLink',
                      type: 'text',
                      defaultValue: '/booking',
                    },
                    {
                      name: 'backgroundImage',
                      type: 'upload',
                      relationTo: 'media',
                    },
                    {
                      name: 'preHeading',
                      type: 'text',
                      label: 'Pre-heading Text',
                      defaultValue: 'Get Your Car Professionally Detailed',
                    },
                    {
                      name: 'ctaItems',
                      type: 'array',
                      label: '3-Step Process Items',
                      minRows: 3,
                      maxRows: 3,
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                        },
                        {
                          name: 'description',
                          type: 'text',
                        },
                        {
                          name: 'iconName',
                          type: 'select',
                          options: [
                            { label: 'Wrench', value: 'Wrench' },
                            { label: 'Calendar Days', value: 'CalendarDays' },
                            { label: 'Car', value: 'Car' },
                            { label: 'Sparkles', value: 'Sparkles' },
                            { label: 'Spray Can', value: 'SprayCan' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: 'Process Section',
              fields: [
                {
                  name: 'processSection',
                  type: 'group',
                  label: 'Working Process Section',
                  fields: [
                    {
                      name: 'preHeading',
                      type: 'text',
                      defaultValue: '// OUR DETAILING METHOD',
                      admin: {
                        description: 'Small text above the main title',
                      },
                    },
                    {
                      name: 'title',
                      type: 'text',
                      defaultValue: 'Our Working Process',
                    },
                    {
                      name: 'subtitle',
                      type: 'text',
                      defaultValue: 'How we deliver exceptional results',
                    },
                    {
                      name: 'imageAltText',
                      type: 'text',
                      defaultValue: 'Car detailing process in action',
                    },
                    {
                      name: 'steps',
                      type: 'array',
                      label: 'Process Steps',
                      fields: [
                        {
                          name: 'order',
                          type: 'number',
                        },
                        {
                          name: 'title',
                          type: 'text',
                        },
                        {
                          name: 'active',
                          type: 'checkbox',
                          defaultValue: false,
                        },
                        {
                          name: 'description',
                          type: 'textarea',
                          label: 'Step Description',
                        },
                        {
                          name: 'image',
                          type: 'upload',
                          relationTo: 'media',
                          label: 'Process Step Image',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: 'Testimonials',
              fields: [
                {
                  name: 'testimonialsSection',
                  type: 'group',
                  label: 'Testimonials Section',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      defaultValue: 'What Our Customers Say',
                    },
                    {
                      name: 'subtitle',
                      type: 'text',
                      defaultValue: 'Real reviews from satisfied customers',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Brands',
              fields: [
                {
                  name: 'brandsSection',
                  type: 'group',
                  label: 'Brands Section',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      defaultValue: 'Trusted by Leading Brands',
                    },
                    {
                      name: 'subtitle',
                      type: 'text',
                      defaultValue: 'We work with all major car manufacturers',
                    },
                    {
                      name: 'bookYourMakeText',
                      type: 'text',
                      defaultValue: 'Book Your Make',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: 'services-page',
      label: 'Services Page',
      admin: {
        description: 'Manage content for the dedicated services page',
      },
      access: {
        read: () => true,
        update: isAdminOrEditor,
      },
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          defaultValue: 'Our Premium Detailing Services',
        },
        {
          name: 'heroSubtitle',
          type: 'text',
          defaultValue: 'Professional auto detailing services tailored to your needs',
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'heroImageAlt',
          type: 'text',
          label: 'Hero Image Alt Text',
          defaultValue: 'Services hero background',
        },
        {
          name: 'serviceIncludesLabel',
          type: 'text',
          label: 'Service Includes Label',
          defaultValue: 'Service Includes:',
        },
        {
          name: 'startingAtLabel',
          type: 'text',
          label: 'Starting At Label',
          defaultValue: 'Starting at',
        },
        {
          name: 'bookServiceButtonText',
          type: 'text',
          label: 'Book Service Button Text',
          defaultValue: 'Book This Service',
        },
        {
          name: 'services',
          type: 'array',
          label: 'Detailed Services',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({}),
            },
            {
              name: 'features',
              type: 'array',
              label: 'Service Features',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                },
              ],
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'price',
              type: 'text',
              label: 'Starting Price',
            },
            {
              name: 'duration',
              type: 'text',
              label: 'Service Duration',
            },
          ],
        },
        {
          name: 'ctaTitle',
          type: 'text',
          defaultValue: 'Ready to Transform Your Vehicle?',
        },
        {
          name: 'ctaText',
          type: 'text',
          defaultValue: 'Schedule your detailing service today and experience the RPM difference.',
        },
        {
          name: 'ctaButtonText',
          type: 'text',
          defaultValue: 'Book Now',
        },
        {
          name: 'ctaButtonLink',
          type: 'text',
          defaultValue: '/booking',
        },
      ],
    },
    {
      slug: 'ui-labels',
      label: 'UI Labels',
      admin: {
        description: 'User interface text and labels used throughout the website',
        group: 'Settings',
      },
      access: {
        read: () => true,
        update: isAdminOrEditor,
      },
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Modal & Navigation',
              fields: [
                {
                  name: 'modalLabels',
                  type: 'group',
                  label: 'Modal Labels',
                  fields: [
                    {
                      name: 'getInTouch',
                      type: 'text',
                      defaultValue: 'Get In Touch',
                    },
                    {
                      name: 'contactInfo',
                      type: 'text',
                      defaultValue: 'Contact Info',
                    },
                    {
                      name: 'openingHours',
                      type: 'text',
                      defaultValue: 'Opening Hours',
                    },
                    {
                      name: 'needHelp',
                      type: 'text',
                      defaultValue: 'Need Help?',
                    },
                  ],
                },
                {
                  name: 'navigationLabels',
                  type: 'group',
                  label: 'Navigation Labels',
                  fields: [
                    {
                      name: 'menu',
                      type: 'text',
                      defaultValue: 'Menu',
                    },
                    {
                      name: 'close',
                      type: 'text',
                      defaultValue: 'Close',
                    },
                    {
                      name: 'closeMobileMenu',
                      type: 'text',
                      defaultValue: 'Close mobile menu',
                    },
                    {
                      name: 'toggleMobileMenu',
                      type: 'text',
                      defaultValue: 'Toggle mobile menu',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Buttons',
              fields: [
                {
                  name: 'buttons',
                  type: 'group',
                  label: 'Button Text',
                  fields: [
                    {
                      name: 'bookNow',
                      type: 'text',
                      defaultValue: 'Book Now',
                    },
                    {
                      name: 'viewAllServices',
                      type: 'text',
                      defaultValue: 'View All Services',
                    },
                    {
                      name: 'bookYourMake',
                      type: 'text',
                      defaultValue: 'Book Your Make',
                    },
                    {
                      name: 'getInTouch',
                      type: 'text',
                      defaultValue: 'Get in Touch',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Accessibility',
              fields: [
                {
                  name: 'accessibility',
                  type: 'group',
                  label: 'Accessibility Labels',
                  fields: [
                    {
                      name: 'closeModal',
                      type: 'text',
                      defaultValue: 'Close modal',
                    },
                    {
                      name: 'professionalCarPolishing',
                      type: 'text',
                      defaultValue: 'Professional car polishing service',
                    },
                    {
                      name: 'carDetailingProcess',
                      type: 'text',
                      defaultValue: 'Car detailing process',
                    },
                    {
                      name: 'carDetailingInAction',
                      type: 'text',
                      defaultValue: 'Car detailing process in action',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Section Headers',
              fields: [
                {
                  name: 'sectionHeaders',
                  type: 'group',
                  label: 'Section Headers',
                  fields: [
                    {
                      name: 'ourDetailingPackages',
                      type: 'text',
                      defaultValue: 'OUR DETAILING PACKAGES',
                    },
                    {
                      name: 'transformYourVehicle',
                      type: 'text',
                      defaultValue: 'Transform Your Vehicle with Our Expert Detailing',
                    },
                    {
                      name: 'clientLove',
                      type: 'text',
                      defaultValue: 'CLIENT LOVE',
                    },
                    {
                      name: 'whatOurClientsSay',
                      type: 'text',
                      defaultValue: 'What Our Clients Say About Our Detailing',
                    },
                    {
                      name: 'weDetailAllMakes',
                      type: 'text',
                      defaultValue: 'We Detail All Makes and Models',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Stats & Process',
              fields: [
                {
                  name: 'statsLabels',
                  type: 'group',
                  label: 'Statistics Labels',
                  fields: [
                    {
                      name: 'happyClients',
                      type: 'text',
                      defaultValue: 'Happy Clients',
                    },
                    {
                      name: 'vehiclesDetailed',
                      type: 'text',
                      defaultValue: 'Vehicles Detailed',
                    },
                    {
                      name: 'yearsOfDetailing',
                      type: 'text',
                      defaultValue: 'Years of Detailing',
                    },
                    {
                      name: 'detailingAwards',
                      type: 'text',
                      defaultValue: 'Detailing Awards',
                    },
                    {
                      name: 'yearsOfExperience',
                      type: 'text',
                      defaultValue: 'Years of Experience',
                    },
                  ],
                },
                {
                  name: 'processLabels',
                  type: 'group',
                  label: 'Process Labels',
                  fields: [
                    {
                      name: 'washDecon',
                      type: 'text',
                      defaultValue: 'Wash & Decon',
                    },
                    {
                      name: 'paintCorrection',
                      type: 'text',
                      defaultValue: 'Paint Correction',
                    },
                    {
                      name: 'protection',
                      type: 'text',
                      defaultValue: 'Protection',
                    },
                    {
                      name: 'interiorFinishing',
                      type: 'text',
                      defaultValue: 'Interior Finishing',
                    },
                  ],
                },
              ],
            },
            {
              label: 'CTA Items',
              fields: [
                {
                  name: 'ctaDefaults',
                  type: 'group',
                  label: 'CTA Default Content',
                  fields: [
                    {
                      name: 'chooseYourPackageTitle',
                      type: 'text',
                      defaultValue: 'Choose Your Package',
                    },
                    {
                      name: 'chooseYourPackageDesc',
                      type: 'text',
                      defaultValue:
                        'Select from our range of professional detailing services tailored to your needs.',
                    },
                    {
                      name: 'scheduleYourDetailTitle',
                      type: 'text',
                      defaultValue: 'Schedule Your Detail',
                    },
                    {
                      name: 'scheduleYourDetailDesc',
                      type: 'text',
                      defaultValue:
                        'Pick a convenient time and our experts will come to you or visit our facility.',
                    },
                    {
                      name: 'enjoyPristineCarTitle',
                      type: 'text',
                      defaultValue: 'Enjoy a Pristine Car',
                    },
                    {
                      name: 'enjoyPristineCarDesc',
                      type: 'text',
                      defaultValue:
                        'Drive away with confidence in your professionally detailed vehicle.',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Service Defaults',
              fields: [
                {
                  name: 'serviceDefaults',
                  type: 'group',
                  label: 'Default Service Names',
                  fields: [
                    {
                      name: 'exteriorWash',
                      type: 'text',
                      defaultValue: 'Exterior Wash',
                    },
                    {
                      name: 'interiorDetail',
                      type: 'text',
                      defaultValue: 'Interior Detail',
                    },
                    {
                      name: 'paintCorrection',
                      type: 'text',
                      defaultValue: 'Paint Correction',
                    },
                    {
                      name: 'ceramicCoating',
                      type: 'text',
                      defaultValue: 'Ceramic Coating',
                    },
                    {
                      name: 'wheelTireCare',
                      type: 'text',
                      defaultValue: 'Wheel & Tire Care',
                    },
                    {
                      name: 'odorRemoval',
                      type: 'text',
                      defaultValue: 'Odor Removal',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: 'about-page',
      label: 'About Page',
      admin: {
        description: 'Manage content for the about us page',
      },
      access: {
        read: () => true,
        update: isAdminOrEditor,
      },
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          defaultValue: 'About RPM Detailing',
        },
        {
          name: 'heroSubtitle',
          type: 'text',
          defaultValue: 'Your trusted partner in premium auto detailing',
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'storyTitle',
          type: 'text',
          defaultValue: 'Our Story',
        },
        {
          name: 'storyContent',
          type: 'richText',
          editor: lexicalEditor({}),
        },
        {
          name: 'storyImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'valuesSectionTitle',
          type: 'text',
          label: 'Values Section Title',
          defaultValue: 'Our Core Values',
        },
        {
          name: 'valuesSectionSubtitle',
          type: 'text',
          label: 'Values Section Subtitle',
          defaultValue:
            'These principles guide everything we do and define who we are as a company',
        },
        {
          name: 'values',
          type: 'array',
          label: 'Our Values',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'description',
              type: 'text',
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Icon Name',
              admin: {
                description: 'Lucide icon name (e.g., Shield, Star, Heart)',
              },
            },
          ],
        },
        {
          name: 'teamTitle',
          type: 'text',
          defaultValue: 'Meet Our Team',
        },
        {
          name: 'teamSubtitle',
          type: 'text',
          defaultValue: 'Dedicated professionals passionate about auto detailing',
        },
        {
          name: 'teamMembers',
          type: 'array',
          label: 'Team Members',
          fields: [
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'position',
              type: 'text',
            },
            {
              name: 'bio',
              type: 'textarea',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'ctaTitle',
          type: 'text',
          defaultValue: "Let's Work Together",
        },
        {
          name: 'ctaButtonText',
          type: 'text',
          defaultValue: 'Get in Touch',
        },
        {
          name: 'ctaButtonLink',
          type: 'text',
          defaultValue: '/booking',
        },
      ],
    },
  ],
  collections: [
    {
      slug: 'users',
      auth: {
        cookies: {
          secure: process.env.NODE_ENV === 'production', // Must be true for production HTTPS
          sameSite: 'None', // Required for cross-site requests (admin panel)
          domain: (() => {
            // Only set domain in production for custom domains
            if (process.env.NODE_ENV !== 'production') return undefined

            // Use custom domain if NEXT_PUBLIC_SERVER_URL is set
            if (process.env.NEXT_PUBLIC_SERVER_URL?.includes('rpmdetail.co')) {
              return '.rpmdetail.co' // Leading dot for subdomain sharing
            }

            // Use Vercel production domain if available
            if (process.env.VERCEL_PROJECT_PRODUCTION_URL?.includes('rpmdetail.co')) {
              return '.rpmdetail.co'
            }

            // Don't set domain for Vercel preview URLs
            return undefined
          })(),
        },
      },
      access: {
        create: isAdmin,
        read: isAdminOrSelf,
        update: isAdminOrSelf,
        delete: isAdmin,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'role',
          type: 'select',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
            { label: 'User', value: 'user' },
          ],
          defaultValue: 'user',
          admin: {
            position: 'sidebar',
          },
        },
      ],
    },
    {
      slug: 'media',
      upload: {
        mimeTypes: ['image/*'],
      },
      access: {
        read: () => true,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdmin,
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
    {
      slug: 'testimonials',
      labels: {
        singular: 'Testimonial',
        plural: 'Testimonials',
      },
      admin: {
        useAsTitle: 'name',
        description: 'Customer testimonials displayed on the landing page',
        group: 'Content',
      },
      access: {
        read: () => true,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdmin,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            description: "Customer's title or vehicle type (e.g., 'Tesla Model 3 Owner')",
          },
        },
        {
          name: 'review',
          type: 'textarea',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          defaultValue: 5,
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured Testimonial',
          defaultValue: false,
        },
      ],
    },
    {
      slug: 'brands',
      labels: {
        singular: 'Brand',
        plural: 'Brands',
      },
      admin: {
        useAsTitle: 'name',
        description: 'Car brands/manufacturers displayed on the landing page',
        group: 'Content',
      },
      access: {
        read: () => true,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdmin,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
  ],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
