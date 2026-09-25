import { Suspense, type ComponentProps } from 'react'

import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { getGlobalSettings, getPayloadData } from '@/lib/payload'
import type { Brand } from '@/payload-types'

import BrandsSection from './brands-section'

async function getBrandsSectionProps(): Promise<ComponentProps<typeof BrandsSection> | null> {
  try {
    const [brandsResult, _landingPageData] = await Promise.all([
      getPayloadData<Brand>('brands', {
        limit: 20,
        sort: 'order',
        depth: 1,
      }),
      getGlobalSettings('landing-page'),
    ])

    const brands = brandsResult?.docs ?? []

    if (brands.length === 0) {
      return null
    }

    // Transform Payload Brand type to match component's expected interface
    const transformedBrands = brands.flatMap((brand) =>
      brand.name && brand.logo && typeof brand.logo === 'object'
        ? [
            {
              name: brand.name,
              logo: {
                url: brand.logo.url || '',
                alt: brand.logo.alt || undefined,
              },
            },
          ]
        : [],
    )

    // Note: The BrandsSection component currently doesn't use title/subtitle props
    // but they're available in landingPageData?.brandsSection if needed
    return { brands: transformedBrands }
  } catch (error) {
    console.error('Error loading brands section:', error)
    return null // Don't render the section on error
  }
}

async function BrandsSectionData() {
  const props = await getBrandsSectionProps()

  if (!props) {
    return null
  }

  return <BrandsSection {...props} />
}

function BrandsSectionLoading() {
  return (
    <div className="flex items-center justify-center bg-brandDark py-20">
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
