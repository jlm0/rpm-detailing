import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import type { Field, GlobalConfig, Tab, UnnamedTab } from 'payload'

import { anyone, authenticated } from '@/access'
import { documentViews } from '@/admin/document'
import { appearsOn } from '@/fields/appears-on'
import { image } from '@/fields/image'
import { text } from '@/fields/text'
import { revalidateGlobalAfterChange } from '@/hooks/revalidate'
import { outlineFor, siteMap, siteSection, trail, type SiteSlug } from '@/lib/site-map'
import { previewPath } from '@/utilities/preview'

type EditableGlobal = Pick<GlobalConfig, 'fields'> & {
  slug: SiteSlug
  description: string
}

export const editableGlobal = ({ slug, description, fields }: EditableGlobal): GlobalConfig => {
  const { label, path } = siteMap[slug]
  return {
    slug,
    label,
    admin: {
      group: false,
      description,
      livePreview: { url: () => previewPath(path) },
      preview: () => previewPath(path),
      components: { views: documentViews },
    },
    access: { read: anyone, readVersions: authenticated, update: authenticated },
    versions: { drafts: { autosave: { interval: 100 } }, max: 25 },
    hooks: { afterChange: [revalidateGlobalAfterChange] },
    fields,
  }
}

const cue = (slug: SiteSlug, name: string) => {
  const { label, where } = siteSection(slug, name)
  return appearsOn(name, {
    trail: trail(slug === 'site-settings' ? 'Site-wide' : siteMap[slug].label, label),
    where,
    outline: outlineFor(slug, name),
  })
}

export const section = (slug: SiteSlug, name: string, fields: Field[]): Tab => ({
  name,
  label: siteSection(slug, name).label,
  fields: [cue(slug, name), ...fields],
})

export const panel = (slug: SiteSlug, name: string, fields: Field[]): UnnamedTab => ({
  label: siteSection(slug, name).label,
  fields: [cue(slug, name), ...fields],
})

export const collapsed = (label: string, fields: Field[]): Field => ({
  type: 'collapsible',
  label,
  admin: { initCollapsed: true },
  fields,
})

const metaImage = MetaImageField({ relationTo: 'media' })
metaImage.admin = {
  ...metaImage.admin,
  description: 'Best size: 1200 × 630 px. Leave empty to use the share image from Business & SEO.',
}

export const seoTab = (slug: SiteSlug): Tab => ({
  name: 'meta',
  label: 'SEO',
  description:
    'Titles up to 60 characters, descriptions up to 160. Leave empty to use the defaults from Business & SEO.',
  fields: [
    cue(slug, 'meta'),
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
