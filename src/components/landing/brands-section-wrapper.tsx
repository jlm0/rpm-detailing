import { Suspense } from 'react'

import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { getPayloadData, getGlobalSettings } from '@/lib/payload'
import type { Brand } from '@/payload-types'

import BrandsSection from './brands-section'

async function BrandsSectionData() {
  try {
    const [brandsResult, _landingPageData] = await Promise.all([
      getPayloadData<Brand>('brands', {
        limit: 20,
        sort: 'order',
        depth: 1,
      }),
      getGlobalSettings('landing-page')
    ])

    const brands = brandsResult?.docs || []

    if (brands.length === 0) {
      return null
    }
    
    // Transform Payload Brand type to match component's expected interface
    const transformedBrands = brands
      .filter(brand => brand.name && brand.logo && typeof brand.logo === 'object')
      .map(brand => ({
        name: brand.name!,
        logo: {
          url: typeof brand.logo === 'object' && brand.logo !== null ? (brand.logo.url || '') : '',
          alt: typeof brand.logo === 'object' && brand.logo !== null ? (brand.logo.alt || undefined) : undefined
        }
      }))
    
    // Note: The BrandsSection component currently doesn't use title/subtitle props
    // but they're available in landingPageData?.brandsSection if needed
    return <BrandsSection brands={transformedBrands} />
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