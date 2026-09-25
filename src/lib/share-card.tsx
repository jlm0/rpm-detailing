import 'server-only'

import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { getGlobal, image } from './cms'

export const SHARE_CARD_SIZE = { width: 1200, height: 630 }

const paths = {
  home: '/',
  services: '/services',
  about: '/about',
  booking: '/booking',
} as const

export type SharePage = keyof typeof paths

export const isSharePage = (page: string): page is SharePage => page in paths

export const sharePagePath = (page: SharePage) => paths[page]

async function pageContent(page: SharePage) {
  switch (page) {
    case 'home': {
      const home = await getGlobal('home-page')
      return { doc: home, heading: home.hero.slides[0]?.title, photo: home.hero.backgroundImage }
    }
    case 'services': {
      const services = await getGlobal('services-page')
      return { doc: services, heading: services.hero.title, photo: services.hero.image }
    }
    case 'about': {
      const about = await getGlobal('about-page')
      return { doc: about, heading: about.hero.title, photo: about.hero.image }
    }
    case 'booking': {
      const booking = await getGlobal('booking-page')
      return { doc: booking, heading: booking.content.title, photo: null }
    }
  }
}

export async function getShareCard(page: SharePage) {
  const [{ doc, heading, photo }, settings, header] = await Promise.all([
    pageContent(page),
    getGlobal('site-settings'),
    getGlobal('header'),
  ])
  const { business, seo } = settings
  const photoMedia = photo ?? seo.image
  const version = createHash('sha1')
    .update([doc.updatedAt, settings.updatedAt, header.updatedAt].join('|'))
    .digest('base64url')
    .slice(0, 10)

  return {
    page,
    headline: doc.meta?.title || heading || business.name,
    description: doc.meta?.description || seo.description,
    businessName: business.name,
    phone: business.phone,
    cta: header.showCta ? header.cta?.label : undefined,
    photo: image(photoMedia, 'og'),
    customImage: image(doc.meta?.image, 'og'),
    version,
  }
}

export type ShareCardContent = Awaited<ReturnType<typeof getShareCard>>

const fontFile = (name: string) => readFile(path.join(process.cwd(), 'src/assets/fonts', name))

export async function shareCardFonts() {
  const [display, medium, semibold] = await Promise.all([
    fontFile('archivo-semi-expanded-800.ttf'),
    fontFile('geist-500.ttf'),
    fontFile('geist-600.ttf'),
  ])
  return [
    { name: 'Archivo', data: display, weight: 800 as const, style: 'normal' as const },
    { name: 'Geist', data: medium, weight: 500 as const, style: 'normal' as const },
    { name: 'Geist', data: semibold, weight: 600 as const, style: 'normal' as const },
  ]
}

const grunge = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='640'><filter id='g' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.00625 .021875' numOctaves='5' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .8 0 0 0 -.36'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`,
)}")`

const headlineSize = (headline: string) => {
  if (headline.length <= 22) return 88
  if (headline.length <= 38) return 72
  return 58
}

export function ShareCard({ content, photo }: { content: ShareCardContent; photo: string | null }) {
  const { headline, businessName, phone, cta } = content

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#111111',
        fontFamily: 'Geist',
        color: '#ffffff',
      }}
    >
      {photo && (
        // eslint-disable-next-line @next/next/no-img-element -- rendered to an image by next/og
        <img
          src={photo}
          alt=""
          width={700}
          height={630}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 700,
            height: 630,
            objectFit: 'cover',
            objectPosition: content.photo?.position,
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(0deg, rgba(17,17,17,0.55) 0%, rgba(17,17,17,0) 40%), linear-gradient(90deg, rgba(17,17,17,0.35) 45%, rgba(17,17,17,0) 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 720,
          height: 630,
          backgroundColor: '#d9232d',
          backgroundImage: grunge,
          backgroundSize: '640px 640px',
          clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 600,
          height: 630,
          padding: '64px 0 60px 64px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          {businessName}
        </div>
        <div
          style={{
            marginTop: 36,
            fontFamily: 'Archivo',
            fontWeight: 800,
            fontSize: headlineSize(headline),
            lineHeight: 0.98,
            letterSpacing: '-0.03em',
            textWrap: 'balance',
          }}
        >
          {headline}
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 24 }}>
          {cta && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 26px',
                borderRadius: 999,
                backgroundColor: '#ffffff',
                color: '#b51c25',
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {cta}
              <span style={{ fontSize: 24 }}>→</span>
            </div>
          )}
          <div style={{ fontSize: 24, fontWeight: 600 }}>{phone}</div>
        </div>
      </div>
    </div>
  )
}
