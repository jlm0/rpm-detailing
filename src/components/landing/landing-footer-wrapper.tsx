import { getGlobalSettings, getMediaUrl } from '@/lib/payload'

import LandingFooter from './landing-footer'

export default async function LandingFooterWrapper() {
  const siteSettings = await getGlobalSettings('site-settings')

  const footerData = {
    logo: getMediaUrl(siteSettings?.darkLogo) || '/placeholder.svg',
    companyName: siteSettings?.companyName || 'RPM Detailing',
    description:
      siteSettings?.description ||
      "Your trusted partner for premium car detailing services. We restore and protect your vehicle's beauty with meticulous care.",
    phone: siteSettings?.phone || '(425) 345-3564',
    email: siteSettings?.email || 'support@rpm-detailing.com',
    address: siteSettings?.address || 'Boise, ID, USA',
    hours: {
      weekdays: siteSettings?.hours?.weekdays || 'Mon - Fri: 8.00 am - 6.00 pm',
      saturday: siteSettings?.hours?.saturday || 'Saturday: 9.00 am - 4.00 pm',
      sunday: siteSettings?.hours?.sunday || 'Sunday: Closed',
    },
    ctaHeading: siteSettings?.footerCTA?.heading || 'Need Help?',
    ctaText:
      siteSettings?.footerCTA?.text ||
      'Ready for a showroom shine? Book your car detailing appointment today!',
    ctaButtonText: siteSettings?.footerCTA?.buttonText || 'Book Now',
    ctaButtonLink: siteSettings?.footerCTA?.buttonLink || '/booking',
    copyright:
      siteSettings?.copyright?.replace('{year}', new Date().getFullYear().toString()) ||
      `© ${new Date().getFullYear()} RPM Detailing. All Rights Reserved.`,
  }

  return <LandingFooter {...footerData} />
}
