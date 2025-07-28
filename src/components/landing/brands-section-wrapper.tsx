import { Suspense } from 'react'

import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { getPayloadData, getGlobalSettings } from '@/lib/payload'

import BrandsSection from './brands-section'

interface Brand {
  id: string
  name: string
  logo: {
    url: string
    alt?: string
  }
  order: number
}

interface LandingPageData {
  brandsSection?: {
    title?: string
    subtitle?: string
  }
}

async function BrandsSectionData() {
  try {
    const [brandsResult, landingPageData] = await Promise.all([
      getPayloadData<Brand>('brands', {
        limit: 20,
        sort: 'order',
        depth: 1,
      }),
      getGlobalSettings('landing-page') as Promise<LandingPageData | null>
    ])

    const brands = brandsResult?.docs || []

    if (brands.length === 0) {
      return null
    }
    
    // Note: The BrandsSection component currently doesn't use title/subtitle props
    // but they're available in landingPageData?.brandsSection if needed
    return <BrandsSection brands={brands} />
  } catch (error) {
    console.error('Error loading brands section:', error)
    return null // Don't render the section on error
  }
}

function BrandsSectionLoading() {
  return (
    <div className="py-20 flex items-center justify-center bg-brandDark">
      <LoadingSpinner size="lg" />
    </div>
  )
}

export default function BrandsSectionWrapper() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<BrandsSectionLoading />}>
        <BrandsSectionData />
      </Suspense>
    </ErrorBoundary>
  )
}