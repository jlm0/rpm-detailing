import { Suspense } from 'react'

import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { getGlobalSettings } from '@/lib/payload'

import HeroSection from './hero-section'


interface LandingPageData {
  hero?: {
    title?: string
    subtitle?: string
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
    const siteSettings = await getGlobalSettings('site-settings') || {}
    
    const heroContent = landingPageData?.hero
    
    // Default content if CMS data not available
    const defaultContent = {
      title: 'Advanced Detailing Solutions for Your Prized Automobile',
      subtitle: '// PREMIUM CAR DETAILING',
      backgroundImage: '/placeholder.svg?width=1920&height=1080',
      ctaText: 'Book Now',
      ctaLink: '/booking',
      showPhoneNumbers: true,
      showAddress: true,
      phone: '(425) 345-3564',
      address: 'Boise, ID, USA',
    }
    
    const content = heroContent ? {
      title: heroContent.title || defaultContent.title,
      subtitle: heroContent.subtitle || defaultContent.subtitle,
      backgroundImage: heroContent.backgroundImage?.url || defaultContent.backgroundImage,
      ctaText: heroContent.ctaText || defaultContent.ctaText,
      ctaLink: heroContent.ctaLink || defaultContent.ctaLink,
      showPhoneNumbers: heroContent.showPhoneNumbers ?? true,
      showAddress: heroContent.showAddress ?? true,
      phone: siteSettings.phone || defaultContent.phone,
      address: siteSettings.address || defaultContent.address,
    } : defaultContent
    
    return <HeroSection {...content} />
  } catch (error) {
    console.error('Error loading hero section:', error)
    // Return with default content on error
    return (
      <HeroSection
        title="Advanced Detailing Solutions for Your Prized Automobile"
        subtitle="// PREMIUM CAR DETAILING"
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