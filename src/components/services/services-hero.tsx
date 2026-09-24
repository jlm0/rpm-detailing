'use client'

import Image from 'next/image'

import ScrollAnimate from '@/components/motion/scroll-animate'

interface ServicesHeroProps {
  title: string
  subtitle: string
  backgroundImage: string
  backgroundImageAlt?: string
}

export default function ServicesHero({
  title,
  subtitle,
  backgroundImage,
  backgroundImageAlt = 'Services hero background',
}: ServicesHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brandDark py-24 text-white lg:py-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-brandDark/90 to-brandDark/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <ScrollAnimate variantName="fadeInUp" className="max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="text-xl text-white/80">{subtitle}</p>
        </ScrollAnimate>
      </div>
    </section>
  )
}
