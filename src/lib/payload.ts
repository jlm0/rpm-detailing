import "server-only";

import { getPayload as getPayloadInstance } from 'payload'

import type { PayloadCollectionResult, SiteSettings } from '@/types/payload-helpers'
import config from '@payload-config'

import type { Config } from '../payload-types'

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
  }
): Promise<PayloadCollectionResult<T> | null> {
  const payload = await getPayload()
  
  try {
    const data = await payload.find({
      collection,
      where: options?.where || {},
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
 * Get a single document by slug or ID
 */
export async function getPayloadDoc<T>(
  collection: keyof Config['collections'],
  idOrSlug: string,
  bySlug = false
) {
  const payload = await getPayload()
  
  try {
    if (bySlug) {
      const data = await payload.find({
        collection,
        where: {
          slug: {
            equals: idOrSlug,
          },
        },
        limit: 1,
      })
      
      return data.docs[0] as T
    } else {
      const data = await payload.findByID({
        collection,
        id: idOrSlug,
      })
      
      return data as T
    }
  } catch (error) {
    console.error(`Error fetching ${collection} ${idOrSlug}:`, error)
    return null
  }
}

/**
 * Get global settings
 */
export async function getGlobalSettings(slug: keyof Config['globals']): Promise<SiteSettings | null> {
  const payload = await getPayload()
  
  try {
    const data = await payload.findGlobal({
      slug,
    })
    
    return data as SiteSettings
  } catch (error) {
    console.error(`Error fetching global ${slug}:`, error)
    return null
  }
}