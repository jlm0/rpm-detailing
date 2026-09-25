import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/access'
import { documentViews } from '@/admin/document'
import { appearsOn, type AppearsOnProps } from '@/fields/appears-on'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { livePath, liveTarget } from '@/lib/site-map'
import { previewPath } from '@/utilities/preview'

type ContentCollection = Pick<CollectionConfig, 'slug' | 'labels' | 'admin' | 'fields'> & {
  where: AppearsOnProps
}

export const contentCollection = ({
  where,
  fields,
  ...config
}: ContentCollection): CollectionConfig => {
  const previewFor = (id?: number | string) =>
    previewPath(livePath({ collectionSlug: config.slug, id }) ?? '/')
  const livePreviewFor = (id?: number | string) => {
    const { path, anchor } = liveTarget({ collectionSlug: config.slug, id }) ?? { path: '/' }
    return previewPath(anchor ? `${path}?section=${anchor}` : path)
  }

  return {
    ...config,
    admin: {
      group: 'Content',
      livePreview: { url: ({ data }) => livePreviewFor(data.id as number | undefined) },
      preview: (doc) => previewFor(doc.id as number | undefined),
      components: { views: documentViews },
      ...config.admin,
    },
    access: {
      read: authenticatedOrPublished,
      create: authenticated,
      update: authenticated,
      delete: authenticated,
    },
    orderable: true,
    trash: true,
    versions: { drafts: { autosave: { interval: 100 } }, maxPerDoc: 25 },
    hooks: {
      afterChange: [revalidateAfterChange],
      afterDelete: [revalidateAfterDelete],
    },
    fields: [appearsOn('document', where), ...fields],
  }
}
