import { Suspense, type ComponentProps } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { getGlobalSettings, getMediaUrl } from '@/lib/payload'
import { defaultServices } from '@/lib/default-content'
import type { ServicesPage as ServicesPageData } from '@/payload-types'

import ServicesPage from './services-page'

async function getServicesPageProps(): Promise<ComponentProps<typeof ServicesPage>> {
  // Default navigation items if not in CMS
  const defaultNavigation = [
    { label: 'Home', link: '/', order: 1 },
    { label: 'Services', link: '/services', order: 2 },
    { label: 'About', link: '/about', order: 3 },
    { label: 'Testimonials', link: '#testimonials', order: 4 },
    { label: 'Contact', link: '#contact', order: 5 },
  ]

  try {
    const siteSettings = await getGlobalSettings('site-settings')
    const pageData = (await getGlobalSettings('services-page')) as ServicesPageData | null

    // Sort navigation by order field if it exists
    const navigation = siteSettings?.navigation || defaultNavigation
    const sortedNavigation =
      Array.isArray(navigation) && navigation.length > 0
        ? [...navigation]
            .filter((item) => item.label && item.link)
            .map((item) => ({
              label: item.label!,
              link: item.link!,
              order: item.order || 0,
            }))
            .sort((a, b) => (a.order || 0) - (b.order || 0))
        : defaultNavigation

    const services =
      pageData?.services && pageData.services.length > 0
        ? pageData.services.map((s) => ({
            title: s.title || '',
            description: s.description || 'Service description',
            features: s.features?.map((f) => ({ feature: f.feature || '' })),
            image:
              s.image && typeof s.image === 'object' && 'url' in s.image
                ? { url: s.image.url || '', alt: s.image.alt || undefined }
                : undefined,
            price: s.price || undefined,
            duration: s.duration || undefined,
          }))
        : defaultServices

    return {
      heroTitle: pageData?.heroTitle || 'Our Premium Detailing Services',
      heroSubtitle:
        pageData?.heroSubtitle || 'Professional auto detailing services tailored to your needs',
      heroImage:
        pageData?.heroImage && typeof pageData.heroImage === 'object' && 'url' in pageData.heroImage
          ? pageData.heroImage.url || '/placeholder.svg'
          : '/placeholder.svg',
      heroImageAlt: pageData?.heroImageAlt || 'Services hero background',
      services,
      serviceIncludesLabel: pageData?.serviceIncludesLabel || 'Service Includes:',
      startingAtLabel: pageData?.startingAtLabel || 'Starting at',
      bookServiceButtonText: pageData?.bookServiceButtonText || 'Book This Service',
      ctaTitle: pageData?.ctaTitle || 'Ready to Transform Your Vehicle?',
      ctaText:
        pageData?.ctaText ||
        'Schedule your detailing service today and experience the RPM difference.',
      ctaButtonText: pageData?.ctaButtonText || 'Book Now',
      ctaButtonLink: pageData?.ctaButtonLink || '/booking',
      headerProps: {
        logo: getMediaUrl(siteSettings?.darkLogo) || '/placeholder.svg',
        companyName: siteSettings?.companyName || 'RPM Detailing',
        navigation: sortedNavigation,
        headerCTA: {
          text: siteSettings?.headerCTA?.text || 'Book Now',
          link: siteSettings?.headerCTA?.link || '/booking',
          show: siteSettings?.headerCTA?.show ?? true,
        },
      },
      footerProps: {
        logo: getMediaUrl(siteSettings?.darkLogo) || '/placeholder.svg',
        companyName: siteSettings?.companyName || 'RPM Detailing',
        description: siteSettings?.description || undefined,
        phone: siteSettings?.phone || undefined,
        email: siteSettings?.email || undefined,
        address: siteSettings?.address || undefined,
        hours: siteSettings?.hours
          ? {
              weekdays: siteSettings.hours.weekdays || 'Mon - Fri: 8.00 am - 6.00 pm',
              saturday: siteSettings.hours.saturday || 'Saturday: 9.00 am - 4.00 pm',
              sunday: siteSettings.hours.sunday || 'Sunday: Closed',
            }
          : undefined,
        ctaHeading: siteSettings?.footerCTA?.heading || undefined,
        ctaText: siteSettings?.footerCTA?.text || undefined,
        ctaButtonText: siteSettings?.footerCTA?.buttonText || undefined,
        ctaButtonLink: siteSettings?.footerCTA?.buttonLink || undefined,
        copyright: siteSettings?.copyright || undefined,
      },
    }
  } catch (error) {
    console.error('Error loading services page:', error)
    // Return with default data
    return {
      heroTitle: 'Our Premium Detailing Services',
      heroSubtitle: 'Professional auto detailing services tailored to your needs',
      heroImage: '/placeholder.svg',
      services: [],
      ctaTitle: 'Ready to Transform Your Vehicle?',
      ctaText: 'Schedule your detailing service today and experience the RPM difference.',
      ctaButtonText: 'Book Now',
      ctaButtonLink: '/booking',
    }
  }
}

async function ServicesPageContent() {
  const props = await getServicesPageProps()
  return <ServicesPage {...props} />
}

export default function ServicesPageWrapper() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<LoadingSpinner />}>
        <ServicesPageContent />
      </Suspense>
    </ErrorBoundary>
  )
}
