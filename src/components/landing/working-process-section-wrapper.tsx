import { getGlobalSettings } from '@/lib/payload';

import WorkingProcessSection from './working-process-section';

interface LandingPageData {
  processSection?: {
    title?: string
    subtitle?: string
    steps?: Array<{
      order?: number
      title?: string
      active?: boolean
      description?: string
      image?: {
        url?: string
        alt?: string
      }
    }>
  }
  aboutSection?: {
    stats?: Array<{
      value?: string
      label?: string
      icon?: string
    }>
  }
}

export default async function WorkingProcessSectionWrapper() {
  
  // Fetch landing page data
  const landingPageData = await getGlobalSettings('landing-page') as LandingPageData | null;

  const processSteps = landingPageData?.processSection?.steps || [];
  const sortedSteps = [...processSteps].sort((a, b) => (a.order || 0) - (b.order || 0));
  
  const stats = landingPageData?.aboutSection?.stats || [];

  const processData = {
    preHeading: landingPageData?.processSection?.subtitle || "// OUR DETAILING METHOD",
    heading: landingPageData?.processSection?.title || "Our Meticulous Detailing Process",
    processTabs: sortedSteps.length > 0 
      ? sortedSteps.map((step) => step.title || '')
      : ["Wash & Decon", "Paint Correction", "Protection", "Interior Finishing"],
    activeTab: 0,
    processImage: sortedSteps[0]?.image?.url || "/placeholder.svg?width=1200&height=525",
    stats: stats.length > 0
      ? stats.map((stat) => ({
          value: stat.value || '',
          label: stat.label || '',
          iconName: stat.icon || "Users",
        }))
      : [
          { value: "858", label: "Happy Clients", iconName: "Users" },
          { value: "984", label: "Vehicles Detailed", iconName: "Car" },
          { value: "29", label: "Years of Detailing", iconName: "Settings2" },
          { value: "55", label: "Detailing Awards", iconName: "Award" },
        ],
  };

  return <WorkingProcessSection {...processData} />;
}