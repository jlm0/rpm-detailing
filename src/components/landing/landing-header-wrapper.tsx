import { getGlobalSettings } from '@/lib/payload';

import LandingHeader from './landing-header';

export default async function LandingHeaderWrapper() {
  
  const siteSettings = await getGlobalSettings('site-settings');

  // Default navigation items if not in CMS
  const defaultNavigation = [
    { label: "Home", link: "/", order: 1 },
    { label: "Services", link: "/services", order: 2 },
    { label: "About", link: "/about", order: 3 },
    { label: "Testimonials", link: "#testimonials", order: 4 },
    { label: "Contact", link: "#contact", order: 5 },
  ];

  // Sort navigation by order field if it exists
  const navigation = siteSettings?.navigation || defaultNavigation;
  const sortedNavigation = Array.isArray(navigation) && navigation.length > 0
    ? [...navigation].sort((a, b) => (a.order || 0) - (b.order || 0))
    : defaultNavigation;

  const headerData = {
    logo: siteSettings?.darkLogo?.url || "/placeholder.svg",
    companyName: siteSettings?.companyName || "RPM Detailing",
    navigation: sortedNavigation,
    headerCTA: siteSettings?.headerCTA || {
      text: "Book Now",
      link: "/booking",
      show: true,
    },
  };

  return <LandingHeader {...headerData} />;
}