import { getGlobalSettings, getMediaUrl } from '@/lib/payload'

import WorkingProcessSection from './working-process-section'

export default async function WorkingProcessSectionWrapper() {
  // Fetch landing page data
  const landingPageData = await getGlobalSettings('landing-page')

  const processSteps = landingPageData?.processSection?.steps ?? []
  const sortedSteps = [...processSteps].sort((a, b) => (a.order || 0) - (b.order || 0))

  const stats = landingPageData?.aboutSection?.stats ?? []

  const processData = {
    preHeading: landingPageData?.processSection?.subtitle || '// OUR DETAILING METHOD',
    heading: landingPageData?.processSection?.title || 'Our Meticulous Detailing Process',
    processTabs:
      sortedSteps.length > 0
        ? sortedSteps.map((step) => step.title || '')
        : ['Wash & Decon', 'Paint Correction', 'Protection', 'Interior Finishing'],
    activeTab: 0,
    processImage: getMediaUrl(sortedSteps[0]?.image) || '/placeholder.svg?width=1200&height=525',
    stats:
      stats.length > 0
        ? stats.map((stat) => ({
            value: stat.value || '',
            label: stat.label || '',
            iconName: stat.icon || 'Users',
          }))
        : [
            { value: '858', label: 'Happy Clients', iconName: 'Users' },
            { value: '984', label: 'Vehicles Detailed', iconName: 'Car' },
            { value: '29', label: 'Years of Detailing', iconName: 'Settings2' },
            { value: '55', label: 'Detailing Awards', iconName: 'Award' },
          ],
  }

  return <WorkingProcessSection {...processData} />
}
