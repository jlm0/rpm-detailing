import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getGlobalSettings } from "@/lib/payload";
import { defaultServices } from "@/lib/default-content";
import type { ServicesPage as ServicesPageData } from "@/payload-types";

import ServicesPage from "./services-page";

async function ServicesPageContent() {
  // Default navigation items if not in CMS
  const defaultNavigation = [
    { label: "Home", link: "/", order: 1 },
    { label: "Services", link: "/services", order: 2 },
    { label: "About", link: "/about", order: 3 },
    { label: "Testimonials", link: "#testimonials", order: 4 },
    { label: "Contact", link: "#contact", order: 5 },
  ];

  try {
    const siteSettings = await getGlobalSettings("site-settings");
    const pageData = await getGlobalSettings("services-page") as ServicesPageData | null;

    // Sort navigation by order field if it exists
    const navigation = siteSettings?.navigation || defaultNavigation;
    const sortedNavigation = Array.isArray(navigation) && navigation.length > 0
      ? [...navigation].sort((a, b) => (a.order || 0) - (b.order || 0))
      : defaultNavigation;

    const services = pageData?.services && pageData.services.length > 0 ? pageData.services.map(s => ({
      title: s.title || "",
      description: typeof s.description === 'object' ? "Service description" : (s.description || ""),
      features: s.features?.map(f => ({ feature: f.feature || "" })),
      image: s.image && typeof s.image === 'object' && 'url' in s.image ? { url: s.image.url || "", alt: s.image.alt || undefined } : undefined,
      price: s.price || undefined,
      duration: s.duration || undefined
    })) : defaultServices;

    return (
      <ServicesPage
        heroTitle={pageData?.heroTitle || "Our Premium Detailing Services"}
        heroSubtitle={pageData?.heroSubtitle || "Professional auto detailing services tailored to your needs"}
        heroImage={pageData?.heroImage && typeof pageData.heroImage === 'object' && 'url' in pageData.heroImage ? pageData.heroImage.url || "/placeholder.svg" : "/placeholder.svg"}
        services={services}
        ctaTitle={pageData?.ctaTitle || "Ready to Transform Your Vehicle?"}
        ctaText={pageData?.ctaText || "Schedule your detailing service today and experience the RPM difference."}
        ctaButtonText={pageData?.ctaButtonText || "Book Now"}
        ctaButtonLink={pageData?.ctaButtonLink || "/booking"}
        headerProps={{
          logo: siteSettings?.darkLogo?.url || '/placeholder.svg',
          companyName: siteSettings?.companyName || 'RPM Detailing',
          navigation: sortedNavigation,
          headerCTA: {
            text: siteSettings?.headerCTA?.text || 'Book Now',
            link: siteSettings?.headerCTA?.link || '/booking',
            show: siteSettings?.headerCTA?.show ?? true,
          }
        }}
        footerProps={{
          logo: siteSettings?.darkLogo?.url || '/placeholder.svg',
          companyName: siteSettings?.companyName || 'RPM Detailing',
          description: siteSettings?.description,
          phone: siteSettings?.phone,
          email: siteSettings?.email,
          address: siteSettings?.address,
          hours: siteSettings?.hours,
          ctaHeading: siteSettings?.footerCTA?.heading,
          ctaText: siteSettings?.footerCTA?.text,
          ctaButtonText: siteSettings?.footerCTA?.buttonText,
          ctaButtonLink: siteSettings?.footerCTA?.buttonLink,
          copyright: siteSettings?.copyright,
        }}
      />
    );
  } catch (error) {
    console.error("Error loading services page:", error);
    // Return with default data
    return (
      <ServicesPage
        heroTitle="Our Premium Detailing Services"
        heroSubtitle="Professional auto detailing services tailored to your needs"
        heroImage="/placeholder.svg"
        services={[]}
        ctaTitle="Ready to Transform Your Vehicle?"
        ctaText="Schedule your detailing service today and experience the RPM difference."
        ctaButtonText="Book Now"
        ctaButtonLink="/booking"
      />
    );
  }
}

export default function ServicesPageWrapper() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<LoadingSpinner />}>
        <ServicesPageContent />
      </Suspense>
    </ErrorBoundary>
  );
}