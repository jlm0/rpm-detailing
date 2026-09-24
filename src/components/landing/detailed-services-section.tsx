'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface DetailingPackage {
  id: string
  title: string
  description: string
  imgSrc: string
  imgAlt: string
}

interface DetailedServicesSectionProps {
  packages?: DetailingPackage[]
}

const DetailedServicesSection = ({
  packages = [
    {
      id: '01',
      title: 'Restore',
      description:
        "Our restoration process goes beyond surface cleaning—it's a meticulous, multi-stage transformation designed to bring your vehicle back to its original beauty, or better.",
      imgSrc: '/placeholder.svg',
      imgAlt: 'Professional exterior detailing service',
    },
    {
      id: '02',
      title: 'Protect',
      description:
        'At RPM, we use only the highest-quality protective products to ensure your vehicle looks its best and stays that way. Our detailing solutions offer superior resistance against UV rays, road grime, water spots, and environmental contaminants.',
      imgSrc: '/placeholder.svg',
      imgAlt: 'Applying ceramic coating to protect vehicle',
    },
    {
      id: '03',
      title: 'Maintain — RPM+',
      description: 'RPM+ (Subscription service – more to come)',
      imgSrc: '/placeholder.svg',
      imgAlt: 'Premium interior detailing and maintenance',
    },
  ],
}: DetailedServicesSectionProps) => {
  return (
    <section
      id="services"
      className="bg-tire-track-pattern bg-brandDark bg-cover py-16 text-white lg:py-24"
    >
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInDown" className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold tracking-wider text-brandRed uppercase">
            OUR DETAILING PACKAGES
          </p>
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Transform Your Vehicle with Our Expert Detailing
          </h2>
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.15}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {packages.map((service) => (
            <ScrollAnimate variantName="zoomIn" key={service.id}>
              <Card className="group flex h-full flex-col overflow-hidden border-neutral-700 bg-brandMediumGray text-white">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={service.imgSrc || '/placeholder.svg'}
                    alt={service.imgAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="flex flex-grow flex-col p-6">
                  <p className="mb-3 text-5xl font-bold text-brandRed">{service.id}</p>
                  <h3 className="mb-3 text-2xl font-semibold">{service.title}</h3>
                  <p className="mb-4 line-clamp-4 flex-grow overflow-hidden text-sm leading-relaxed text-neutral-300">
                    {service.description}
                  </p>
                  <Link href="/booking">
                    <Button
                      variant="outline"
                      className="border-brandRed px-4 py-2 text-brandRed hover:bg-brandRed hover:text-white"
                    >
                      Book Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </ScrollAnimate>
          ))}
        </ScrollAnimate>
        <ScrollAnimate variantName="fadeInUp" delay={0.3} className="mt-12 text-center">
          <Link href="/services">
            <Button className="bg-brandRed px-8 py-3 text-lg text-white hover:bg-red-700">
              View All Services
            </Button>
          </Link>
        </ScrollAnimate>
      </div>
    </section>
  )
}

export default DetailedServicesSection
