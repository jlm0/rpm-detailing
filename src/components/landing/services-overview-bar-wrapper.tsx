import { Suspense, type ComponentProps } from 'react'

import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { getGlobalSettings } from '@/lib/payload'

import ServicesOverviewBar from './services-overview-bar'

async function getServicesOverviewBarProps(): Promise<ComponentProps<typeof ServicesOverviewBar>> {
  try {
    const landingPageData = await getGlobalSettings('landing-page')

    const services = landingPageData?.servicesBar || []

    const sortedServices = [...services].sort((a, b) => (a.order || 0) - (b.order || 0))

    const servicesData = sortedServices.map((service) => ({
      name: service.title || '',
      icon: service.icon || 'Car', // Default icon if not specified
    }))

    return { services: servicesData }
  } catch (error) {
    console.error('Error loading services overview:', error)
    // Return with default services on error
    const defaultServices = [
      { name: 'Interior Detailing', icon: 'Car' },
      { name: 'Exterior Detailing', icon: 'Car' },
      { name: 'Paint Correction', icon: 'Car' },
      { name: 'Ceramic Coating', icon: 'Car' },
      { name: 'Paint Protection Film', icon: 'Car' },
      { name: 'Window Tinting', icon: 'Car' },
    ]
    return { services: defaultServices }
  }
}

async function ServicesOverviewBarData() {
  const props = await getServicesOverviewBarProps()
  return <ServicesOverviewBar {...props} />
}

function ServicesOverviewBarLoading() {
  return (
    <div className="flex items-center justify-center bg-brandDark py-8">
      <LoadingSpinner size="md" />
    </div>
  )
}

export default function ServicesOverviewBarWrapper() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<ServicesOverviewBarLoading />}>
        <ServicesOverviewBarData />
      </Suspense>
    </ErrorBoundary>
  )
}
