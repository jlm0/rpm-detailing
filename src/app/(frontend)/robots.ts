import type { MetadataRoute } from 'next'

import { getGlobalSettings } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteSettings = await getGlobalSettings('site-settings')
  const siteUrl = siteSettings?.siteUrl || 'https://rpmdetail.co'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  }
}
