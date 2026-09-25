import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import { CmsLink } from '@/components/layout/cms-link'
import { Magnetic } from '@/components/motion/magnetic'
import Reveal from '@/components/motion/reveal'
import { Spotlight } from '@/components/motion/spotlight'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import { image } from '@/lib/cms'
import type { HomePage, Service } from '@/payload-types'

interface PackagesSectionProps {
  packages: HomePage['packages']
  services: Service[]
}

export function PackagesSection({ packages, services }: PackagesSectionProps) {
  const viewAll = (
    <Magnetic>
      <Button asChild variant="brand" size="lg">
        <CmsLink url={packages.viewAll.url}>
          {packages.viewAll.label}
          <ArrowRight />
        </CmsLink>
      </Button>
    </Magnetic>
  )

  return (
    <section
      id="services"
      className="bg-brandDark bg-tire-track-pattern py-20 text-white md:py-28 lg:py-36"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={packages.eyebrow} title={packages.title} tone="dark" />
          <Reveal order={1} className="hidden shrink-0 md:block">
            {viewAll}
          </Reveal>
        </div>
        <Reveal stagger order={1} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((service, index) => {
            const photo = image(service.image, 'card')
            return (
              <Reveal key={service.id}>
                <article className="group/card relative flex h-full flex-col overflow-hidden rounded-lg bg-white/[0.035] ring-1 ring-white/10 transition-shadow duration-base hover:ring-brandRed/60 hover:duration-quick">
                  <div className="relative aspect-[4/3] overflow-hidden bg-brandInk">
                    {photo && (
                      <Image
                        src={photo.url}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-slow ease-enter motion-safe:group-hover/card:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-brandDark via-brandDark/10 to-transparent" />
                    <span
                      aria-hidden
                      className="absolute bottom-4 left-6 font-display text-6xl leading-none font-bold text-brandRed [font-stretch:118%]"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-5">
                    <h3 className="mb-3 text-2xl font-bold">{service.title}</h3>
                    <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-white/65">
                      {service.summary}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                      <p className="font-display text-xl font-bold [font-stretch:112%] tabular-nums">
                        {service.price}
                      </p>
                      <Button asChild variant="light" size="sm">
                        <CmsLink url={packages.cardButton.url}>
                          {packages.cardButton.label}
                          <ArrowRight />
                        </CmsLink>
                      </Button>
                    </div>
                  </div>
                  <Spotlight />
                </article>
              </Reveal>
            )
          })}
        </Reveal>
        <Reveal className="mt-10 md:hidden">{viewAll}</Reveal>
      </div>
    </section>
  )
}
