import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/access'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

export const contentCollection = (
  config: Pick<CollectionConfig, 'slug' | 'labels' | 'admin' | 'fields'>,
): CollectionConfig => ({
  ...config,
  admin: { group: 'Content', ...config.admin },
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
})
