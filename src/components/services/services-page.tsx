import LandingFooter from "@/components/landing/landing-footer";
import LandingHeader from "@/components/landing/landing-header";
import type { ComponentProps } from "react";
import type { ServicesPage } from "@/payload-types";

import ServicesCta from "./services-cta";
import ServicesDetail from "./services-detail";
import ServicesHero from "./services-hero";

interface Service {
  title: string;
  description: string | NonNullable<ServicesPage['services']>[0]['description'];
  features?: { feature: string }[];
  image?: { url: string; alt?: string };
  price?: string;
  duration?: string;
}

interface ServicesPageProps {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt?: string;
  services: Service[];
  serviceIncludesLabel?: string;
  startingAtLabel?: string;
  bookServiceButtonText?: string;
  ctaTitle: string;
  ctaText: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  headerProps?: ComponentProps<typeof LandingHeader>;
  footerProps?: ComponentProps<typeof LandingFooter>;
}

export default function ServicesPage({
  heroTitle,
  heroSubtitle,
  heroImage,
  heroImageAlt,
  services,
  serviceIncludesLabel,
  startingAtLabel,
  bookServiceButtonText,
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
          backgroundImageAlt={heroImageAlt}
        />
        <ServicesDetail 
          services={services}
          serviceIncludesLabel={serviceIncludesLabel}
          startingAtLabel={startingAtLabel}
          bookServiceButtonText={bookServiceButtonText}
        />
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