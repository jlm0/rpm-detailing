import 'server-only'

import type { Metadata } from 'next'

import { getGlobal } from './cms'
import { getShareCard, SHARE_CARD_SIZE, sharePagePath, type SharePage } from './share-card'

export async function pageMetadata(page: SharePage): Promise<Metadata> {
  const [card, settings] = await Promise.all([getShareCard(page), getGlobal('site-settings')])
  const { business, seo } = settings
  const path = sharePagePath(page)
  const heading = card.headline
  const title = heading === business.name ? heading : `${heading} ${seo.titleSuffix}`.trim()
  const { description } = card
  const shareImage = card.customImage
    ? {
        url: card.customImage.url,
        alt: card.customImage.alt,
        width: card.customImage.width,
        height: card.customImage.height,
      }
    : {
        url: `/og/${page}?v=${card.version}`,
        alt: heading,
        type: 'image/png',
        ...SHARE_CARD_SIZE,
      }

  return {
    metadataBase: new URL(seo.siteUrl),
    title: { absolute: title },
    description,
    keywords: seo.keywords ?? undefined,
    alternates: { canonical: path },
    openGraph: {
      title: heading,
      description,
      url: path,
      siteName: business.name,
      locale: 'en_US',
      type: 'website',
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: heading,
      description,
      images: [shareImage],
      creator: seo.twitterHandle ? `@${seo.twitterHandle}` : undefined,
    },
  }
}
