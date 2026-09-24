import { Suspense, type ComponentProps } from 'react'

import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { getGlobalSettings, getMediaUrl } from '@/lib/payload'

import AboutUsSection from './about-us-section'

async function getAboutUsSectionProps(): Promise<ComponentProps<typeof AboutUsSection>> {
  try {
    // Fetch landing page content from global
    const landingPageData = await getGlobalSettings('landing-page')

    // Fetch site settings for years of experience
    const siteSettings = await getGlobalSettings('site-settings')

    const aboutSection = landingPageData?.aboutSection

    // Build the data with defaults
    const whyChooseData = {
      subtitle: aboutSection?.subtitle || '// WHY CHOOSE RPM DETAILING',
      title: aboutSection?.title || 'Expert Car Detailing Since 2020',
      content: aboutSection?.content
        ? "Modern vehicle finishes and interiors require specialized care. Our detailing service excels by combining advanced techniques, premium products, and highly skilled technicians to restore and protect your vehicle's beauty. Trust RPM Detailing for meticulous attention to detail."
        : "Modern vehicle finishes and interiors require specialized care. Our detailing service excels by combining advanced techniques, premium products, and highly skilled technicians to restore and protect your vehicle's beauty. Trust RPM Detailing for meticulous attention to detail.",
      image: getMediaUrl(aboutSection?.image) || undefined,
    }

    const transformationData = {
      subtitle: '// COMPLETE TRANSFORMATION',
      title: 'We Offer Comprehensive Detailing for Your Car',
      content:
        "From a meticulous hand wash to full paint correction and ceramic coatings, we provide a complete suite of detailing services. We're the preferred choice for discerning car owners who value quality and lasting results.",
      features: aboutSection?.features
        ?.map((f) => f.feature)
        .filter((f): f is string => f != null) || [
        'Premium hand wash and decontamination',
        'Multi-stage paint correction and polishing',
        'Durable ceramic coatings and paint protection',
      ],
    }

    return {
      whyChooseSection: whyChooseData,
      transformationSection: transformationData,
      yearsOfExperience: siteSettings?.yearsOfExperience || 20,
    }
  } catch (error) {
    console.error('Error loading about section:', error)
    // Return with default content on error
    return {
      whyChooseSection: {
        subtitle: '// WHY CHOOSE RPM DETAILING',
        title: 'Expert Car Detailing Since 2020',
        content:
          "Modern vehicle finishes and interiors require specialized care. Our detailing service excels by combining advanced techniques, premium products, and highly skilled technicians to restore and protect your vehicle's beauty. Trust RPM Detailing for meticulous attention to detail.",
        image: undefined,
      },
      transformationSection: {
        subtitle: '// COMPLETE TRANSFORMATION',
        title: 'We Offer Comprehensive Detailing for Your Car',
        content:
          "From a meticulous hand wash to full paint correction and ceramic coatings, we provide a complete suite of detailing services. We're the preferred choice for discerning car owners who value quality and lasting results.",
        features: [
          'Premium hand wash and decontamination',
          'Multi-stage paint correction and polishing',
          'Durable ceramic coatings and paint protection',
        ],
      },
      yearsOfExperience: 20,
    }
  }
}

async function AboutUsSectionData() {
  const props = await getAboutUsSectionProps()
  return <AboutUsSection {...props} />
}

function AboutUsSectionLoading() {
  return (
    <div className="flex items-center justify-center bg-white py-20">
      <LoadingSpinner size="lg" />
    </div>
  )
}

export default function AboutUsSectionWrapper() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<AboutUsSectionLoading />}>
        <AboutUsSectionData />
      </Suspense>
    </ErrorBoundary>
  )
}
