import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { documentViews } from '@/admin/document'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const webp = { format: 'webp', options: { quality: 82 } } as const

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Photo', plural: 'Photos' },
  admin: {
    group: 'Content',
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    description:
      'Photos and logos used across the site. JPEG, PNG, WebP or AVIF. Set a focal point to choose what stays in view when a photo is cropped.',
    components: { views: documentViews },
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  trash: true,
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  upload: {
    staticDir: path.resolve(process.env.PAYLOAD_MEDIA_DIR ?? path.resolve(dirname, '../../media')),
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    focalPoint: true,
    crop: true,
    adminThumbnail: 'thumbnail',
    formatOptions: webp,
    resizeOptions: { width: 2560, withoutEnlargement: true },
    imageSizes: [
      { name: 'thumbnail', width: 300, formatOptions: webp },
      { name: 'card', width: 768, formatOptions: webp },
      { name: 'hero', width: 1920, formatOptions: webp },
      {
        name: 'og',
        width: 1200,
        height: 630,
        position: 'centre',
        formatOptions: { format: 'jpeg', options: { quality: 82 } },
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Description',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 150,
      admin: {
        description:
          'Describe the photo for screen readers and search engines, for example Black sedan after a ceramic coating. Up to 150 characters.',
      },
    },
  ],
}
