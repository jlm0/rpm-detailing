"use client";

import Image from "next/image";

import ScrollAnimate from "@/components/motion/scroll-animate";

interface ServicesHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  backgroundImageAlt?: string;
}

export default function ServicesHero({
  title,
  subtitle,
  backgroundImage,
  backgroundImageAlt = "Services hero background",
}: ServicesHeroProps) {
  return (
    <section className="relative bg-brandDark text-white py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brandDark/90 to-brandDark/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimate variantName="fadeInUp" className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl text-white/80">
            {subtitle}
          </p>
        </ScrollAnimate>
      </div>
    </section>
  );
}