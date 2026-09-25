import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import type { Field, GlobalConfig, Tab } from 'payload'

import { anyone, authenticated } from '@/access'
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

export const seoTab: Tab = {
  name: 'meta',
  label: 'SEO',
  description: 'How this page appears in search results and when shared',
  fields: [
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    MetaTitleField({ hasGenerateFn: true }),
    MetaDescriptionField({}),
    MetaImageField({ relationTo: 'media' }),
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
