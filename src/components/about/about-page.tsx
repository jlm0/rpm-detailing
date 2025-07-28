"use client";

import LandingFooter from "@/components/landing/landing-footer";
import LandingHeader from "@/components/landing/landing-header";

import AboutCta from "./about-cta";
import AboutHero from "./about-hero";
import AboutStory from "./about-story";
import AboutTeam from "./about-team";
import AboutValues from "./about-values";

interface Value {
  title: string;
  description: string;
  icon?: string;
}

interface TeamMember {
  name: string;
  position?: string;
  bio?: string;
  image?: { url: string; alt?: string };
}

interface AboutPageProps {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt?: string;
  storyTitle: string;
  storyContent: string;
  storyImage: string;
  storyImageAlt?: string;
  values: Value[];
  teamTitle: string;
  teamSubtitle: string;
  teamMembers: TeamMember[];
  ctaTitle: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  headerProps?: any;
  footerProps?: any;
}

export default function AboutPage({
  heroTitle,
  heroSubtitle,
  heroImage,
  heroImageAlt,
  storyTitle,
  storyContent,
  storyImage,
  storyImageAlt,
  values,
  teamTitle,
  teamSubtitle,
  teamMembers,
  ctaTitle,
  ctaButtonText,
  ctaButtonLink,
  headerProps,
  footerProps,
}: AboutPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <LandingHeader {...headerProps} />
      <main className="flex-1 flex flex-col gap-0 md:gap-8">
        <AboutHero
          title={heroTitle}
          subtitle={heroSubtitle}
          backgroundImage={heroImage}
          backgroundImageAlt={heroImageAlt}
        />
        <AboutStory
          title={storyTitle}
          content={storyContent}
          image={storyImage}
          imageAlt={storyImageAlt}
        />
        {values && values.length > 0 && <AboutValues values={values} />}
        {teamMembers && teamMembers.length > 0 && (
          <AboutTeam
            title={teamTitle}
            subtitle={teamSubtitle}
            members={teamMembers}
          />
        )}
        <AboutCta
          title={ctaTitle}
          buttonText={ctaButtonText}
          buttonLink={ctaButtonLink}
        />
      </main>
      <LandingFooter {...footerProps} />
    </div>
  );
}