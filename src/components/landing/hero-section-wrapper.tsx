import { Suspense } from 'react'

import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { getGlobalSettings } from '@/lib/payload'

import HeroSection from './hero-section'


interface LandingPageData {
  heroSlides?: Array<{
    title?: string
    subtitle?: string
  }>
  hero?: {
    backgroundImage?: {
      url?: string
      alt?: string
    }
    ctaText?: string
    ctaLink?: string
    showPhoneNumbers?: boolean
    showAddress?: boolean
  }
}

async function HeroSectionData() {
  try {
    // Fetch landing page content from global
    const landingPageData = await getGlobalSettings('landing-page') as LandingPageData | null
    
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
          subtitle: cmsSlide.subtitle || defaultSlide.subtitle
        }
      }
      return defaultSlide
    })
    
    const content = {
      slides,
      backgroundImage: heroSettings.backgroundImage?.url || '/placeholder.svg?width=1920&height=1080',
      ctaText: heroSettings.ctaText || 'Book Now',
      ctaLink: heroSettings.ctaLink || '/booking',
      showPhoneNumbers: heroSettings.showPhoneNumbers ?? true,
      showAddress: heroSettings.showAddress ?? true,
      phone: siteSettings?.phone || '(425) 345-3564',
      address: siteSettings?.address || 'Boise, ID, USA',
    }
    
    return <HeroSection {...content} />
  } catch (error) {
    console.error('Error loading hero section:', error)
    // Return with default content on error
    return (
      <HeroSection
        slides={[
          {
            title: 'Advanced Detailing Solutions for Your Prized Automobile',
            subtitle: '// PREMIUM CAR DETAILING',
          },
        ]}
        backgroundImage="/placeholder.svg?width=1920&height=1080"
        ctaText="Book Now"
        ctaLink="/booking"
        showPhoneNumbers={true}
        showAddress={true}
        phone="(425) 345-3564"
        address="Boise, ID, USA"
      />
    )
  }
}

function HeroSectionLoading() {
  return (
    <div className="relative h-screen flex items-center justify-center bg-brandLightGray">
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