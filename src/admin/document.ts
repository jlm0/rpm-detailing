import type { EditConfig } from 'payload'

import { isAdmin } from '@/access'

export const documentComponents = {
  beforeDocumentControls: ['/components/admin/document-status#DocumentStatus'],
  PublishButton: '/components/admin/publish-button#PublishButton',
}

export const documentViews: { edit: EditConfig } = {
  edit: {
    api: { tab: { condition: ({ req }) => isAdmin(req.user) } },
    versions: { tab: { label: 'History' } },
  },
}
