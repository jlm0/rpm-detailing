import type { Access, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

export const anyone: Access = () => true

export const authenticated: Access<User> = ({ req: { user } }) => Boolean(user)

export const isAdmin = (user: unknown) => (user as User | null | undefined)?.role === 'admin'

export const admins: Access<User> = ({ req: { user } }) => isAdmin(user)

export const adminsFieldLevel: FieldAccess<User> = ({ req: { user } }) => isAdmin(user)

export const adminsOrSelf: Access<User> = ({ req: { user } }) => {
  if (user?.role === 'admin') return true
  if (user) return { id: { equals: user.id } }
  return false
}

export const authenticatedOrPublished: Access<User> = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
