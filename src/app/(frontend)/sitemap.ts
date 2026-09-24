import type { MetadataRoute } from 'next'

import { getGlobalSettings } from '@/lib/payload'

export const dynamic = 'force-dynamic'

const routes = ['/', '/services', '/about', '/booking']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteSettings = await getGlobalSettings('site-settings')
  const siteUrl = siteSettings?.siteUrl || 'https://rpmdetail.co'

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }))
}
