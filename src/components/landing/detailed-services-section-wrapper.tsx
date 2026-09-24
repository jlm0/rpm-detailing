import { getGlobalSettings, getMediaUrl } from '@/lib/payload'

import DetailedServicesSection from './detailed-services-section'

export default async function DetailedServicesSectionWrapper() {
  // Fetch landing page content from global
  const landingPageData = await getGlobalSettings('landing-page')

  const services = landingPageData?.detailedServices || []
  const sortedServices = [...services].sort((a, b) => (a.order || 0) - (b.order || 0))

  // Default packages if CMS data not available
  const defaultPackages = [
    {
      id: '01',
      title: 'Restore',
      description:
        "Our restoration process goes beyond surface cleaning—it's a meticulous, multi-stage transformation designed to bring your vehicle back to its original beauty, or better.",
      imgSrc: '/placeholder.svg?width=400&height=300',
      imgAlt: 'Car paint correction process',
    },
    {
      id: '02',
      title: 'Protect',
      description:
        'At RPM, we use only the highest-quality protective products to ensure your vehicle looks its best and stays that way. Our detailing solutions offer superior resistance against UV rays, road grime, water spots, and environmental contaminants.',
      imgSrc: '/placeholder.svg?width=400&height=300',
      imgAlt: 'Applying ceramic coating to a car',
    },
    {
      id: '03',
      title: 'Maintain — RPM+',
      description: 'RPM+ (Subscription service – more to come)',
      imgSrc: '/placeholder.svg?width=400&height=300',
      imgAlt: 'A perfectly maintained luxury car',
    },
  ]

  const packages = sortedServices.length
    ? sortedServices.map((p, index) => ({
        id: p.packageId || String(index + 1).padStart(2, '0'),
        title: p.title || '',
        description: p.description || '',
        imgSrc: getMediaUrl(p.image) || '/placeholder.svg?width=400&height=300',
        imgAlt:
          typeof p.image === 'object' && p.image !== null
            ? p.image.alt || p.title || ''
            : p.title || '',
      }))
    : defaultPackages

  return <DetailedServicesSection packages={packages} />
}
