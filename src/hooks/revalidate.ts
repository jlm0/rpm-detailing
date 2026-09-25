import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

export const CMS_CACHE_TAG = 'cms'

type Status = { _status?: 'draft' | 'published' | null } | null | undefined

const affectsPublishedContent = (doc: Status, previousDoc: Status) =>
  !doc?._status || doc._status === 'published' || previousDoc?._status === 'published'

const revalidate = (context: Record<string, unknown>) => {
  if (context.disableRevalidate) return
  revalidateTag(CMS_CACHE_TAG, { expire: 0 })
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, previousDoc, context }) => {
  if (affectsPublishedContent(doc as Status, previousDoc as Status)) revalidate(context)
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ context }) => {
  revalidate(context)
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({
  doc,
  previousDoc,
  context,
}) => {
  if (affectsPublishedContent(doc as Status, previousDoc as Status)) revalidate(context)
}
