import { ImageResponse } from 'next/og'

import { isPreview } from '@/lib/cms'
import {
  getShareCard,
  isSharePage,
  SHARE_CARD_SIZE,
  ShareCard,
  shareCardFonts,
} from '@/lib/share-card'

async function photoDataUrl(url: string | undefined, base: string) {
  if (!url) return null
  try {
    const response = await fetch(new URL(url, base))
    if (!response.ok) return null
    const type = response.headers.get('content-type') ?? 'image/jpeg'
    const data = Buffer.from(await response.arrayBuffer()).toString('base64')
    return `data:${type};base64,${data}`
  } catch {
    return null
  }
}

export async function GET(request: Request, { params }: RouteContext<'/og/[page]'>) {
  const { page } = await params
  if (!isSharePage(page)) return new Response('Not found', { status: 404 })

  const [content, fonts, preview] = await Promise.all([
    getShareCard(page),
    shareCardFonts(),
    isPreview(),
  ])
  const photo = await photoDataUrl(content.photo?.url, request.url)

  return new ImageResponse(<ShareCard content={content} photo={photo} />, {
    ...SHARE_CARD_SIZE,
    fonts,
    headers: {
      'Cache-Control': preview ? 'no-store' : 'public, max-age=31536000, immutable',
    },
  })
}
