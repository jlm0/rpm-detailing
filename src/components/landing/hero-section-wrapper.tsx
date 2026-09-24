import { Suspense, type ComponentProps } from 'react'

import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { getGlobalSettings, getMediaUrl } from '@/lib/payload'

import HeroSection from './hero-section'

async function getHeroSectionProps(): Promise<ComponentProps<typeof HeroSection>> {
  try {
    // Fetch landing page content from global
    const landingPageData = await getGlobalSettings('landing-page')

    // Fetch site settings for contact info
    const siteSettings = await getGlobalSettings('site-settings')

    const heroSlides = landingPageData?.heroSlides || []
    const heroSettings = landingPageData?.hero || {}

    // Default slides if none in CMS
    const defaultSlides = [
      {
        title: 'Advanced Detailing Solutions for Your Prized Automobile',
        subtitle: '// PREMIUM CAR DETAILING',
      },
      {
        title: 'Protect Your Investment with Expert Care',
        subtitle: '// CERAMIC COATING & PPF',
      },
      {
        title: 'Restore Your Vehicle to Showroom Condition',
        subtitle: '// PAINT CORRECTION',
      },
    ]

    // Merge CMS slides with defaults to ensure we always have 3 slides
    const slides = defaultSlides.map((defaultSlide, index) => {
      const cmsSlide = heroSlides[index]
      if (cmsSlide && cmsSlide.title) {
        return {
          title: cmsSlide.title,
          subtitle: cmsSlide.subtitle || defaultSlide.subtitle,
        }
      }
      return defaultSlide
    })

    return {
      slides,
      backgroundImage:
        getMediaUrl(heroSettings.backgroundImage) || '/placeholder.svg?width=1920&height=1080',
      ctaText: heroSettings.ctaText || 'Book Now',
      ctaLink: heroSettings.ctaLink || '/booking',
      showPhoneNumbers: heroSettings.showPhoneNumbers ?? true,
      showAddress: heroSettings.showAddress ?? true,
      phone: siteSettings?.phone || '(425) 345-3564',
      address: siteSettings?.address || 'Boise, ID, USA',
    }
  } catch (error) {
    console.error('Error loading hero section:', error)
    // Return with default content on error
    return {
      slides: [
        {
          title: 'Advanced Detailing Solutions for Your Prized Automobile',
          subtitle: '// PREMIUM CAR DETAILING',
        },
      ],
      backgroundImage: '/placeholder.svg?width=1920&height=1080',
      ctaText: 'Book Now',
      ctaLink: '/booking',
      showPhoneNumbers: true,
      showAddress: true,
      phone: '(425) 345-3564',
      address: 'Boise, ID, USA',
    }
  }
}

async function HeroSectionData() {
  const props = await getHeroSectionProps()
  return <HeroSection {...props} />
}

function HeroSectionLoading() {
  return (
    <div className="relative flex h-screen items-center justify-center bg-brandLightGray">
      <LoadingSpinner size="lg" />
    </div>
  )
}

export default function HeroSectionWrapper() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<HeroSectionLoading />}>
        <HeroSectionData />
      </Suspense>
    </ErrorBoundary>
  )
}
