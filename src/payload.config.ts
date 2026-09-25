import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Brands } from './collections/Brands'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { AboutPage } from './globals/AboutPage'
import { BookingPage } from './globals/BookingPage'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { HomePage } from './globals/HomePage'
import { ServicesPage } from './globals/ServicesPage'
import { SiteSettings } from './globals/SiteSettings'
import { getServerURL } from './utilities/serverURL'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const serverURL = getServerURL()

export default buildConfig({
  serverURL,
  secret: process.env.PAYLOAD_SECRET,
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: {
      titleSuffix: ' - RPM Detailing',
      robots: 'noindex, nofollow',
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 820, height: 1180 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Services, Testimonials, Brands, Media, Users],
  globals: [HomePage, ServicesPage, AboutPage, BookingPage, SiteSettings, Header, Footer],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: process.env.EMAIL_FROM_ADDRESS ?? 'no-reply@rpmdetail.co',
        defaultFromName: 'RPM Detailing',
      })
    : undefined,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: { disablePayloadAccessControl: true } },
      clientUploads: true,
      addRandomSuffix: true,
      alwaysInsertFields: true,
    }),
    seoPlugin({
      uploadsCollection: 'media',
      generateTitle: ({ globalConfig }) =>
        typeof globalConfig?.label === 'string' ? globalConfig.label : '',
    }),
  ],
  csrf: [serverURL, 'https://rpmdetail.co', 'https://www.rpmdetail.co'],
  graphQL: { disable: true },
  telemetry: false,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
