import { getGlobalSettings } from '@/lib/payload'

import CtaBannerSection from './cta-banner-section'

export default async function CtaBannerSectionWrapper() {
  const landingPageData = await getGlobalSettings('landing-page')

  const ctaData = landingPageData?.ctaBanner

  const bannerData = {
    preHeading: ctaData?.preHeading || '// EXPERIENCE THE DIFFERENCE',
    heading: ctaData?.heading || "Rediscover Your Car's Beauty, Hassle-Free",
    ctaButtonText: ctaData?.buttonText || 'Book Now',
    ctaButtonLink: ctaData?.buttonLink || '/booking',
    ctaItems: ctaData?.ctaItems?.map((item) => ({
      title: item.title || 'Item Title',
      description: item.description || 'Item description',
      iconName: item.iconName || 'Wrench',
    })) || [
      {
        title: 'Choose Your Package',
        description:
          'Select from our range of detailing packages or tell us your specific needs for a custom quote.',
        iconName: 'Wrench',
      },
      {
        title: 'Schedule Your Detail',
        description:
          'Pick a convenient date and time. We offer flexible scheduling, including mobile services at your location.',
        iconName: 'CalendarDays',
      },
      {
        title: 'Enjoy a Pristine Car',
        description:
          'Our experts will meticulously detail your vehicle, leaving it looking and feeling brand new. Satisfaction guaranteed!',
        iconName: 'Car',
      },
    ],
  }

  return <CtaBannerSection {...bannerData} />
}
