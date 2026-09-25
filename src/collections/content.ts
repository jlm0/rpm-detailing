import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/access'
import { documentViews } from '@/admin/document'
import { appearsOn, type AppearsOnProps } from '@/fields/appears-on'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

type ContentCollection = Pick<CollectionConfig, 'slug' | 'labels' | 'admin' | 'fields'> & {
  where: AppearsOnProps
}

export const contentCollection = ({
  where,
  fields,
  ...config
}: ContentCollection): CollectionConfig => {
  return {
    ...config,
    admin: {
      group: 'Content',
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
