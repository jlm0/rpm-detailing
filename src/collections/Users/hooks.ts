import { APIError, type CollectionBeforeDeleteHook, type FieldHook } from 'payload'

import type { User } from '@/payload-types'

export const ensureFirstUserIsAdmin: FieldHook<User, User['role'] | undefined> = async ({
  operation,
  req,
  value,
}) => {
  if (operation !== 'create') return value
  const { totalDocs } = await req.payload.count({ collection: 'users', req })
  return totalDocs === 0 ? 'admin' : value
}

const isOnlyAdmin = async (req: Parameters<FieldHook>[0]['req'], id: number | string) => {
  const { totalDocs } = await req.payload.count({
    collection: 'users',
    where: { role: { equals: 'admin' }, id: { not_equals: id } },
    req,
  })
  return totalDocs === 0
}

export const preventDemotingLastAdmin: FieldHook<User, User['role'] | undefined> = async ({
  operation,
  originalDoc,
  req,
  value,
}) => {
  if (operation !== 'update' || !originalDoc) return value
  if (
    originalDoc.role === 'admin' &&
    value !== 'admin' &&
    (await isOnlyAdmin(req, originalDoc.id))
  ) {
    throw new APIError('At least one admin is required.', 400, null, true)
  }
  return value
}

export const preventDeletingLastAdmin: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const user = await req.payload.findByID({ collection: 'users', id, req, depth: 0 })
  if (user.role === 'admin' && (await isOnlyAdmin(req, id))) {
    throw new APIError('At least one admin is required.', 400, null, true)
  }
}
