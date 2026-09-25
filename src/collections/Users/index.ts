import type { CollectionConfig } from 'payload'

import { admins, adminsFieldLevel, adminsOrSelf, isAdmin } from '@/access'
import { documentViews } from '@/admin/document'

import { ensureFirstUserIsAdmin, preventDeletingLastAdmin, preventDemotingLastAdmin } from './hooks'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Admin',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    description: 'People who can sign in to manage the site',
    hidden: ({ user }) => !isAdmin(user),
    components: { views: documentViews },
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 8 * 60 * 60,
  },
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: admins,
    delete: admins,
    unlock: admins,
    read: adminsOrSelf,
    update: adminsOrSelf,
  },
  hooks: {
    beforeDelete: [preventDeletingLastAdmin],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        create: adminsFieldLevel,
        update: adminsFieldLevel,
      },
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin, preventDemotingLastAdmin],
      },
      admin: {
        position: 'sidebar',
        description: 'Admins manage users and all content. Editors manage content only.',
      },
    },
  ],
}
