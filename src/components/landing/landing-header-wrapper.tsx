import { getGlobalSettings, getMediaUrl } from '@/lib/payload'

import LandingHeader from './landing-header'

export default async function LandingHeaderWrapper() {
  const [siteSettings, uiLabels] = await Promise.all([
    getGlobalSettings('site-settings'),
    getGlobalSettings('ui-labels'),
  ])

  // Default navigation items if not in CMS
  const defaultNavigation = [
    { label: 'Home', link: '/', order: 1 },
    { label: 'Services', link: '/services', order: 2 },
    { label: 'About', link: '/about', order: 3 },
    { label: 'Testimonials', link: '#testimonials', order: 4 },
    { label: 'Contact', link: '#contact', order: 5 },
  ]

  // Sort navigation by order field if it exists
  const navigation = siteSettings?.navigation || defaultNavigation
  const sortedNavigation =
    Array.isArray(navigation) && navigation.length > 0
      ? [...navigation]
          .filter((item) => item.label && item.link) // Filter out items without required fields
          .map((item) => ({
            label: item.label!,
            link: item.link!,
            order: item.order || 0,
          }))
          .sort((a, b) => (a.order || 0) - (b.order || 0))
      : defaultNavigation

  const headerData = {
    logo: getMediaUrl(siteSettings?.darkLogo) || '/placeholder.svg',
    companyName: siteSettings?.companyName || 'RPM Detailing',
    navigation: sortedNavigation,
    headerCTA: {
      text: siteSettings?.headerCTA?.text || 'Book Now',
      link: siteSettings?.headerCTA?.link || '/booking',
      show: siteSettings?.headerCTA?.show ?? true,
    },
    // Pass contact info for the modal
    contactInfo: {
      phone: siteSettings?.phone || '(425) 345-3564',
      email: siteSettings?.email || 'support@rpm-detailing.com',
      address: siteSettings?.address || 'Boise, ID, USA',
      hours: {
        weekdays: siteSettings?.hours?.weekdays || 'Mon - Fri: 8.00 am - 6.00 pm',
        saturday: siteSettings?.hours?.saturday || 'Saturday: 9.00 am - 4.00 pm',
        sunday: siteSettings?.hours?.sunday || 'Sunday: Closed',
      },
      ctaHeading:
        uiLabels?.modalLabels?.needHelp || siteSettings?.footerCTA?.heading || 'Need Help?',
      ctaText:
        siteSettings?.footerCTA?.text ||
        'Ready for a showroom shine? Book your car detailing appointment today!',
      ctaButtonText: siteSettings?.footerCTA?.buttonText || 'Book Now',
      ctaButtonLink: siteSettings?.footerCTA?.buttonLink || '/booking',
    },
    // Pass UI labels
    uiLabels: {
      modalLabels: {
        getInTouch: uiLabels?.modalLabels?.getInTouch || 'Get In Touch',
        contactInfo: uiLabels?.modalLabels?.contactInfo || 'Contact Info',
        openingHours: uiLabels?.modalLabels?.openingHours || 'Opening Hours',
      },
      navigationLabels: {
        menu: uiLabels?.navigationLabels?.menu || 'Menu',
        closeMobileMenu: uiLabels?.navigationLabels?.closeMobileMenu || 'Close mobile menu',
        toggleMobileMenu: uiLabels?.navigationLabels?.toggleMobileMenu || 'Toggle mobile menu',
      },
      accessibility: {
        closeModal: uiLabels?.accessibility?.closeModal || 'Close modal',
      },
    },
  }

  return <LandingHeader {...headerData} />
}
