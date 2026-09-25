import type { UploadField } from 'payload'

interface ImageOptions {
  name: string
  size: string
  label?: string
  required?: boolean
  help?: string
}

export const image = ({ name, size, label, required = true, help }: ImageOptions): UploadField => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
  required,
  admin: { description: [help, `Best size: ${size}.`].filter(Boolean).join(' ') },
})
