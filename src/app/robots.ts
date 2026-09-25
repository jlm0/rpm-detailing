import type { MetadataRoute } from 'next'

import { getGlobal } from '@/lib/cms'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { seo } = await getGlobal('site-settings')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: new URL('/sitemap.xml', seo.siteUrl).toString(),
  }
}
