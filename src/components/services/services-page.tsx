import LandingFooter from "@/components/landing/landing-footer";
import LandingHeader from "@/components/landing/landing-header";

import ServicesCta from "./services-cta";
import ServicesDetail from "./services-detail";
import ServicesHero from "./services-hero";

interface Service {
  title: string;
  description: string;
  features?: { feature: string }[];
  image?: { url: string; alt?: string };
  price?: string;
  duration?: string;
}

interface ServicesPageProps {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  services: Service[];
  ctaTitle: string;
  ctaText: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  headerProps?: any;
  footerProps?: any;
}

export default function ServicesPage({
  heroTitle,
  heroSubtitle,
  heroImage,
  services,
  ctaTitle,
  ctaText,
  ctaButtonText,
  ctaButtonLink,
  headerProps,
  footerProps,
}: ServicesPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <LandingHeader {...headerProps} />
      <main className="flex-1 flex flex-col gap-0 md:gap-8">
        <ServicesHero
          title={heroTitle}
          subtitle={heroSubtitle}
          backgroundImage={heroImage}
        />
        <ServicesDetail services={services} />
        <ServicesCta
          title={ctaTitle}
          text={ctaText}
          buttonText={ctaButtonText}
          buttonLink={ctaButtonLink}
        />
      </main>
      <LandingFooter {...footerProps} />
    </div>
  );
}