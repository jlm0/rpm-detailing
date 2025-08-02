import { Suspense } from 'react'

import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { getGlobalSettings } from '@/lib/payload'

import ServicesOverviewBar from './services-overview-bar'

async function ServicesOverviewBarData() {
  try {
    const landingPageData = await getGlobalSettings('landing-page');

    const services = landingPageData?.servicesBar || [];

    const sortedServices = [...services].sort((a, b) => (a.order || 0) - (b.order || 0));

    const servicesData = sortedServices.map((service) => ({
      name: service.title || '',
      icon: service.icon || 'Car', // Default icon if not specified
    }));

    return <ServicesOverviewBar services={servicesData} />;
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
    return <ServicesOverviewBar services={defaultServices} />
  }
}

function ServicesOverviewBarLoading() {
  return (
    <div className="py-8 flex items-center justify-center bg-brandDark">
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