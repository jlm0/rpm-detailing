import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getGlobalSettings, getPayloadData } from "@/lib/payload";
import type { ServicesPageData } from "@/types/payload-collections";

import ServicesPage from "./services-page";

async function ServicesPageContent() {
  try {
    const [servicesData, siteSettings] = await Promise.all([
      getGlobalSettings("services-page"),
      getGlobalSettings("site-settings")
    ]);
    const pageData = servicesData;

    const services = pageData?.services?.map(s => ({
      title: s.title || '',
      description: s.description || '',
      features: s.features?.map(f => ({ feature: f })) || [],
      image: s.image?.url ? {
        url: s.image.url,
        alt: s.image.alt
      } : undefined,
      price: s.price,
      duration: undefined,
    })) || [];

    return (
      <ServicesPage
        heroTitle={pageData?.heroTitle || "Our Premium Detailing Services"}
        heroSubtitle={pageData?.heroSubtitle || "Professional auto detailing services tailored to your needs"}
        heroImage={pageData?.heroImage?.url || "/placeholder.svg"}
        services={services}
        ctaTitle={pageData?.ctaTitle || "Ready to Transform Your Vehicle?"}
        ctaText={pageData?.ctaText || "Schedule your detailing service today and experience the RPM difference."}
        ctaButtonText={pageData?.ctaButtonText || "Book Now"}
        ctaButtonLink={pageData?.ctaButtonLink || "/booking"}
        headerProps={{
          logo: siteSettings?.darkLogo?.url || '/placeholder.svg',
          companyName: siteSettings?.companyName || 'RPM Detailing',
          navigation: siteSettings?.navigation || [],
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