import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import type { Field, GlobalConfig, Tab } from 'payload'

import { anyone, authenticated } from '@/access'
import { image } from '@/fields/image'
import { text } from '@/fields/text'
import { revalidateGlobalAfterChange } from '@/hooks/revalidate'
import { previewPath } from '@/utilities/preview'

type EditableGlobal = Pick<GlobalConfig, 'slug' | 'label' | 'fields'> & {
  group: 'Pages' | 'Site'
  previewAt: string
  description?: string
}

export const editableGlobal = ({
  slug,
  label,
  group,
  previewAt,
  description,
  fields,
}: EditableGlobal): GlobalConfig => ({
  slug,
  label,
  admin: {
    group,
    description,
    livePreview: { url: () => previewPath(previewAt) },
    preview: () => previewPath(previewAt),
  },
  access: { read: anyone, readVersions: authenticated, update: authenticated },
  versions: { drafts: { autosave: { interval: 100 } }, max: 25 },
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  fields,
})

const metaImage = MetaImageField({ relationTo: 'media' })
metaImage.admin = {
  ...metaImage.admin,
  description: 'Best size: 1200 × 630 px. Leave empty to use the share image from Business & SEO.',
}

export const seoTab: Tab = {
  name: 'meta',
  label: 'SEO',
  description:
    'How this page appears in search results and when shared. Titles up to 60 characters, descriptions up to 160. Leave empty to use the defaults from Business & SEO.',
  fields: [
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    { ...MetaTitleField({ hasGenerateFn: true }), maxLength: 60 },
    { ...MetaDescriptionField({}), maxLength: 160 },
    metaImage,
    PreviewField({
      hasGenerateFn: true,
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
    }),
  ],
}

export const section = (name: string, label: string, fields: Field[]): Tab => ({
  name,
  label,
  fields,
})

export const pageHero: Field[] = [
  text({
    name: 'title',
    max: 50,
    help: 'The large page heading. Keep it under 50 characters so it fits on three lines on phones.',
  }),
  text({ name: 'subtitle', max: 120, help: 'One sentence under the heading.' }),
  image({
    name: 'image',
    size: 'landscape 16:9, at least 1920 × 1080 px',
    help: 'Shown darkened behind the heading.',
  }),
]
