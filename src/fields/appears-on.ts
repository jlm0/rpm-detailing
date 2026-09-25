import type { UIField } from 'payload'

export interface AppearsOnProps {
  trail: string
  where: string
  outline?: { items: string[]; active: number }
}

export const appearsOn = (name: string, clientProps: AppearsOnProps): UIField => ({
  name: `${name}AppearsOn`,
  type: 'ui',
  admin: {
    disableListColumn: true,
    components: {
      Field: { path: '/components/admin/appears-on#AppearsOn', clientProps },
    },
  },
})
