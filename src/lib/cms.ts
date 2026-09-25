import 'server-only'

import { unstable_cache } from 'next/cache'
import { draftMode, headers } from 'next/headers'
import { connection } from 'next/server'
import { getPayload } from 'payload'
import { cache } from 'react'

import config from '@payload-config'
import { CMS_CACHE_TAG } from '@/hooks/revalidate'
import type { Config, Media } from '@/payload-types'

type Globals = Config['globals']
type ContentSlug = 'services' | 'testimonials' | 'brands'

const isPublished = (doc: { _status?: 'draft' | 'published' | null }) => doc._status === 'published'

const fetchGlobal = async <S extends keyof Globals>(slug: S, draft: boolean) => {
  const payload = await getPayload({ config })
  return (await payload.findGlobal({ slug, depth: 2, draft })) as Globals[S]
}

const fetchContent = async <S extends ContentSlug>(collection: S, draft: boolean) => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection,
    depth: 1,
    draft,
    pagination: false,
    sort: '_order',
    where: draft ? undefined : { _status: { equals: 'published' } },
  })
  return docs as Config['collections'][S][]
}

const cacheKey = process.env.VERCEL_DEPLOYMENT_ID ?? 'local'
export const isPreview = cache(async () => {
  await connection()
  return (await draftMode()).isEnabled
})

export const isEditorPreview = cache(async () => {
  if (!(await isPreview())) return false
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  return Boolean(user)
})

const bypassCache = async () => process.env.NODE_ENV === 'development' || (await isPreview())

export const getGlobal = cache(async <S extends keyof Globals>(slug: S): Promise<Globals[S]> => {
  if (await bypassCache()) return fetchGlobal(slug, await isPreview())
  return unstable_cache(() => fetchGlobal(slug, false), [cacheKey, 'global', slug], {
    tags: [CMS_CACHE_TAG],
  })()
})

export const getContent = cache(
  async <S extends ContentSlug>(collection: S): Promise<Config['collections'][S][]> => {
    if (await bypassCache()) return fetchContent(collection, await isPreview())
    return unstable_cache(
      () => fetchContent(collection, false),
      [cacheKey, 'content', collection],
      {
        tags: [CMS_CACHE_TAG],
      },
    )()
  },
)

export const populated = async <T extends { _status?: 'draft' | 'published' | null }>(
  docs: (number | T)[],
): Promise<T[]> => {
  const draft = await isPreview()
  return docs.filter((doc): doc is T => typeof doc === 'object' && (draft || isPublished(doc)))
}

type ImageSize = keyof NonNullable<Media['sizes']>

export const image = (media: number | Media | null | undefined, size?: ImageSize) => {
  if (!media || typeof media === 'number') return null
  return {
    url: (size && media.sizes?.[size]?.url) || media.url || '',
    alt: media.alt,
    width: (size && media.sizes?.[size]?.width) || media.width || undefined,
    height: (size && media.sizes?.[size]?.height) || media.height || undefined,
    position: `${String(media.focalX ?? 50)}% ${String(media.focalY ?? 50)}%`,
  }
}
