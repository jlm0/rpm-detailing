import 'server-only'

import type { Metadata } from 'next'

import { getGlobal, image } from './cms'

type PageSlug = 'home-page' | 'services-page' | 'about-page' | 'booking-page'

export async function pageMetadata(slug: PageSlug, path: string): Promise<Metadata> {
  const [page, settings] = await Promise.all([getGlobal(slug), getGlobal('site-settings')])
  const { seo } = settings
  const title = `${page.meta?.title || settings.business.name} ${seo.titleSuffix}`.trim()
  const description = page.meta?.description || seo.description
  const shareImage = image(page.meta?.image, 'og') ?? image(seo.image, 'og')
  const images = shareImage ? [{ url: shareImage.url, alt: shareImage.alt }] : undefined

  return {
    metadataBase: new URL(seo.siteUrl),
    title: { absolute: title },
    description,
    keywords: seo.keywords ?? undefined,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: settings.business.name,
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
      creator: seo.twitterHandle ? `@${seo.twitterHandle}` : undefined,
    },
  }
}
