import AboutUsSectionWrapper from '@/components/landing/about-us-section-wrapper'
import BrandsSectionWrapper from '@/components/landing/brands-section-wrapper'
import CtaBannerSectionWrapper from '@/components/landing/cta-banner-section-wrapper'
import DetailedServicesSectionWrapper from '@/components/landing/detailed-services-section-wrapper'
import HeroSectionWrapper from '@/components/landing/hero-section-wrapper'
import LandingFooterWrapper from '@/components/landing/landing-footer-wrapper'
import LandingHeaderWrapper from '@/components/landing/landing-header-wrapper'
import ServicesOverviewBarWrapper from '@/components/landing/services-overview-bar-wrapper'
import TestimonialsSectionWrapper from '@/components/landing/testimonials-section-wrapper'
import WorkingProcessSectionWrapper from '@/components/landing/working-process-section-wrapper'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <LandingHeaderWrapper />
      <main className="flex flex-1 flex-col gap-0 lg:gap-8">
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
  )
}
