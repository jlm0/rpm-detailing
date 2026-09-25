import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import { CmsLink } from '@/components/layout/cms-link'
import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { image } from '@/lib/cms'
import type { HomePage, Service } from '@/payload-types'

interface PackagesSectionProps {
  packages: HomePage['packages']
  services: Service[]
}

export function PackagesSection({ packages, services }: PackagesSectionProps) {
  return (
    <section id="services" className="bg-brandDark bg-tire-track-pattern py-16 text-white lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInDown" className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold tracking-wider text-brandRed uppercase">
            {packages.eyebrow}
          </p>
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">{packages.title}</h2>
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.15}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => {
            const photo = image(service.image, 'card')
            return (
              <ScrollAnimate variantName="zoomIn" key={service.id}>
                <Card className="group flex h-full flex-col overflow-hidden border-neutral-700 bg-brandMediumGray text-white">
                  <div className="relative aspect-[4/3]">
                    {photo && (
                      <Image
                        src={photo.url}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                  </div>
                  <CardContent className="flex flex-grow flex-col p-6">
                    <p className="mb-3 text-5xl font-bold text-brandRed">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mb-3 text-2xl font-semibold">{service.title}</h3>
                    <p className="mb-4 line-clamp-4 flex-grow overflow-hidden text-sm leading-relaxed text-neutral-300">
                      {service.summary}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="self-start border-brandRed px-4 py-2 text-brandRed hover:bg-brandRed hover:text-white"
                    >
                      <CmsLink url={packages.cardButton.url}>
                        {packages.cardButton.label} <ArrowRight className="ml-2 h-4 w-4" />
                      </CmsLink>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollAnimate>
            )
          })}
        </ScrollAnimate>
        <ScrollAnimate variantName="fadeInUp" delay={0.3} className="mt-12 text-center">
          <Button asChild className="bg-brandRed px-8 py-3 text-lg text-white hover:bg-red-700">
            <CmsLink url={packages.viewAll.url}>{packages.viewAll.label}</CmsLink>
          </Button>
        </ScrollAnimate>
      </div>
    </section>
  )
}
