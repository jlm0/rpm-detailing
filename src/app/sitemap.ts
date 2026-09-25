import type { MetadataRoute } from 'next'

import { getGlobal } from '@/lib/cms'

const routes = ['/', '/services', '/about', '/booking']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { seo } = await getGlobal('site-settings')

  return routes.map((route) => ({
    url: new URL(route, seo.siteUrl).toString(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }))
}
