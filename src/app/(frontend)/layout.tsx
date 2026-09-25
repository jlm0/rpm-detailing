import type { Metadata } from 'next'
import '@/app/globals.css'
import { getGlobalSettings, getMediaUrl } from '@/lib/payload'

// Force dynamic rendering for all pages to ensure fresh CMS data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getGlobalSettings('site-settings')

  // Company info with fallbacks
  const companyName = siteSettings?.companyName || 'RPM Detail'

  // SEO fields with fallbacks
  const siteUrl = siteSettings?.siteUrl || 'https://rpmdetail.co'
  const description =
    siteSettings?.siteDescription ||
    siteSettings?.description ||
    "Transform your vehicle with RPM Detailing's premium auto detailing services in Boise. Ceramic coating, paint correction, and full interior/exterior detailing."
  const keywords =
    siteSettings?.keywords ||
    'auto detailing, car detailing, ceramic coating, paint correction, Boise, Idaho, RPM Detailing'

  // Location with fallbacks
  const location = siteSettings?.location
  const city = location?.city || 'Boise'
  const state = location?.state || 'ID'

  // Title construction
  const title = `${companyName} | Premium Auto Detailing in ${city}, ${state}`

  // Open Graph settings with fallbacks
  const openGraph = siteSettings?.openGraph
  const ogImage =
    getMediaUrl(openGraph?.defaultImage) || getMediaUrl(siteSettings?.logo) || '/placeholder.svg'
  const ogImageWidth = openGraph?.imageWidth || 1200
  const ogImageHeight = openGraph?.imageHeight || 630

  // Twitter settings with fallbacks
  const twitter = siteSettings?.twitter
  const twitterCardType = twitter?.cardType || 'summary_large_image'
  const twitterHandle = twitter?.handle

  // Other settings with fallbacks
  const locale = siteSettings?.locale || 'en_US'

  return {
    title,
    description,
    keywords,
    authors: [{ name: companyName }],
    creator: companyName,
    publisher: companyName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: companyName,
      locale,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: `${companyName} Logo`,
        },
      ],
    },
    twitter: {
      card: twitterCardType as 'summary' | 'summary_large_image',
      title,
      description,
      images: [ogImage],
      ...(twitterHandle && { creator: `@${twitterHandle}` }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteSettings = await getGlobalSettings('site-settings')
  const themeColor = siteSettings?.themeColor || '#D9232D'

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={themeColor} />
      </head>
      <body>
        <div className="overflow-x-clip">{children}</div>
      </body>
    </html>
  )
}
