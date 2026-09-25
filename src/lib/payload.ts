import 'server-only'

import { getPayload as getPayloadInstance } from 'payload'
import { unstable_noStore as noStore } from 'next/cache'

import type { PayloadCollectionResult } from '@/types/payload-helpers'
import config from '@payload-config'

import type {
  Config,
  SiteSetting,
  LandingPage,
  ServicesPage,
  UiLabel,
  AboutPage,
  Media,
} from '../payload-types'

/**
 * Get Payload instance for server-side data fetching
 * Updated to use the new Payload 3.x import pattern
 */
export const getPayload = async () => {
  return getPayloadInstance({ config })
}

/**
 * Fetch data from Payload collections
 */
export async function getPayloadData<T = unknown>(
  collection: keyof Config['collections'],
  options?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where?: Record<string, any>
    limit?: number
    sort?: string
    depth?: number
  },
): Promise<PayloadCollectionResult<T> | null> {
  // Disable caching to ensure fresh data
  noStore()

  const payload = await getPayload()

  try {
    const data = await payload.find({
      collection,
      where: options?.where ?? {},
      limit: options?.limit || 10,
      sort: options?.sort,
      depth: options?.depth || 1,
    })

    return data as PayloadCollectionResult<T>
  } catch (error) {
    console.error(`Error fetching ${collection}:`, error)
    return null
  }
}

/**
 * Type mapping for global slugs to their types
 */
interface GlobalTypeMap {
  'site-settings': SiteSetting
  'landing-page': LandingPage
  'services-page': ServicesPage
  'ui-labels': UiLabel
  'about-page': AboutPage
}

/**
 * Get global settings with proper type inference
 */
export async function getGlobalSettings<T extends keyof GlobalTypeMap>(
  slug: T,
): Promise<GlobalTypeMap[T] | null> {
  // Disable caching for global settings to ensure fresh data
  noStore()

  const payload = await getPayload()

  try {
    const data = await payload.findGlobal({
      slug,
    })

    return data
  } catch (error) {
    console.error(`Error fetching global ${slug}:`, error)
    return null
  }
}

/**
 * Helper to safely extract media URL from a Media field
 * Handles both populated Media objects and ID references
 */
export function getMediaUrl(media: number | Media | null | undefined): string | null {
  if (!media) return null
  if (typeof media === 'number') return null
  return media.url || null
}
