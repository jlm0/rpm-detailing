import AboutUsSectionWrapper from "@/components/landing/about-us-section-wrapper";
import BrandsSectionWrapper from "@/components/landing/brands-section-wrapper";
import CtaBannerSectionWrapper from "@/components/landing/cta-banner-section-wrapper";
import DetailedServicesSectionWrapper from "@/components/landing/detailed-services-section-wrapper";
import HeroSectionWrapper from "@/components/landing/hero-section-wrapper";
import LandingFooterWrapper from "@/components/landing/landing-footer-wrapper";
import LandingHeaderWrapper from "@/components/landing/landing-header-wrapper";
import ServicesOverviewBarWrapper from "@/components/landing/services-overview-bar-wrapper";
import TestimonialsSectionWrapper from "@/components/landing/testimonials-section-wrapper";
import WorkingProcessSectionWrapper from "@/components/landing/working-process-section-wrapper";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <LandingHeaderWrapper />
      <main className="flex-1">
        <HeroSectionWrapper />
        <ServicesOverviewBarWrapper />
        <AboutUsSectionWrapper />
        <DetailedServicesSectionWrapper />
        <CtaBannerSectionWrapper />
        <WorkingProcessSectionWrapper />
        <TestimonialsSectionWrapper />
        <BrandsSectionWrapper />
      </main>
      <LandingFooterWrapper />
    </div>
  );
}
