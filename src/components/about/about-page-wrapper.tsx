import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getGlobalSettings, getPayloadData } from "@/lib/payload";
import type { AboutPageData } from "@/types/payload-collections";

import AboutPage from "./about-page";

async function AboutPageContent() {
  try {
    const [aboutData, siteSettings] = await Promise.all([
      getGlobalSettings("about-page"),
      getGlobalSettings("site-settings")
    ]);
    const pageData = aboutData;

    return (
      <AboutPage
        heroTitle={pageData?.heroTitle || "About RPM Detailing"}
        heroSubtitle={pageData?.heroSubtitle || "Your trusted partner in premium auto detailing"}
        heroImage={pageData?.heroImage?.url || "/placeholder.svg"}
        storyTitle={pageData?.storyTitle || "Our Story"}
        storyContent={pageData?.storyContent || "RPM Detailing was founded with a passion for excellence and a commitment to providing the highest quality auto detailing services."}
        storyImage={pageData?.storyImage?.url || "/placeholder.svg"}
        values={pageData?.values?.map(v => ({
          title: v.title || "",
          description: v.description || "",
          icon: v.icon
        })) || []}
        teamTitle={pageData?.teamTitle || "Meet Our Team"}
        teamSubtitle={pageData?.teamSubtitle || "Dedicated professionals passionate about auto detailing"}
        teamMembers={pageData?.teamMembers?.map(m => ({
          name: m.name || "",
          position: m.position,
          bio: m.bio,
          image: m.image?.url ? {
            url: m.image.url,
            alt: m.image.alt
          } : undefined
        })) || []}
        ctaTitle={pageData?.ctaTitle || "Let's Work Together"}
        ctaButtonText={pageData?.ctaButtonText || "Get in Touch"}
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
    console.error("Error loading about page:", error);
    // Return with default data
    return (
      <AboutPage
        heroTitle="About RPM Detailing"
        heroSubtitle="Your trusted partner in premium auto detailing"
        heroImage="/placeholder.svg"
        storyTitle="Our Story"
        storyContent="RPM Detailing was founded with a passion for excellence and a commitment to providing the highest quality auto detailing services."
        storyImage="/placeholder.svg"
        values={[]}
        teamTitle="Meet Our Team"
        teamSubtitle="Dedicated professionals passionate about auto detailing"
        teamMembers={[]}
        ctaTitle="Let's Work Together"
        ctaButtonText="Get in Touch"
        ctaButtonLink="/booking"
      />
    );
  }
}

export default function AboutPageWrapper() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<LoadingSpinner />}>
        <AboutPageContent />
      </Suspense>
    </ErrorBoundary>
  );
}