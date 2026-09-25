'use client'

import { ArrowRight, Check, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { ServicesPage } from '@/payload-types'

type ServiceDescription = string | NonNullable<ServicesPage['services']>[0]['description']

interface RichTextLeaf {
  text?: string
}

interface Service {
  title: string
  description: ServiceDescription
  features?: { feature: string }[]
  image?: { url: string; alt?: string }
  price?: string
  duration?: string
}

interface ServicesDetailProps {
  services: Service[]
  serviceIncludesLabel?: string
  startingAtLabel?: string
  bookServiceButtonText?: string
}

function RenderServiceDescription({ description }: { description: Service['description'] }) {
  if (typeof description === 'string') {
    return description
  }
  if (description?.root.children) {
    return (
      <div>
        {description.root.children.map((paragraph, i) => (
          <p key={i} className="mt-4">
            {Array.isArray(paragraph.children) &&
              paragraph.children.map((text: RichTextLeaf | null, j: number) => {
                if (text && typeof text === 'object' && 'text' in text) {
                  return <span key={j}>{text.text || ''}</span>
                }
                return null
              })}
          </p>
        ))}
      </div>
    )
  }
  return <p>Professional detailing service for your vehicle.</p>
}

const defaultServices: Service[] = [
  {
    title: 'Restore',
    description:
      "Our restoration process goes beyond surface cleaning—it's a meticulous, multi-stage transformation designed to bring your vehicle back to its original beauty, or better. We use advanced techniques and premium products to reverse years of wear and damage.",
    features: [
      { feature: 'Multi-stage paint correction' },
      { feature: 'Deep interior cleaning and conditioning' },
      { feature: 'Engine bay detailing' },
      { feature: 'Headlight restoration' },
      { feature: 'Trim and plastic restoration' },
      { feature: 'Full vehicle decontamination' },
    ],
    price: '$299',
    duration: '4-6 hours',
    image: { url: '/placeholder.svg', alt: 'Professional vehicle restoration service' },
  },
  {
    title: 'Protect',
    description:
      'At RPM, we use only the highest-quality protective products to ensure your vehicle looks its best and stays that way. Our protective solutions offer superior resistance against UV rays, road grime, water spots, and environmental contaminants.',
    features: [
      { feature: 'Ceramic coating application' },
      { feature: 'Paint protection film (PPF)' },
      { feature: 'Interior protection coating' },
      { feature: 'Glass coating for improved visibility' },
      { feature: 'Wheel and caliper coating' },
      { feature: '2-5 year warranty options' },
    ],
    price: '$599',
    duration: '6-8 hours',
    image: { url: '/placeholder.svg', alt: 'Advanced vehicle protection services' },
  },
  {
    title: 'Maintain — RPM+',
    description:
      'Our exclusive RPM+ subscription service ensures your vehicle maintains its showroom condition year-round. Regular maintenance is key to preserving your investment and extending the life of protective coatings.',
    features: [
      { feature: 'Monthly maintenance washes' },
      { feature: 'Quarterly deep cleaning' },
      { feature: 'Priority booking' },
      { feature: 'Member-only pricing on additional services' },
      { feature: 'Annual coating inspection and touch-up' },
      { feature: 'Complimentary interior refreshers' },
    ],
    price: '$99/month',
    duration: '2-3 hours per visit',
    image: { url: '/placeholder.svg', alt: 'RPM+ maintenance subscription service' },
  },
]

export default function ServicesDetail({
  services,
  serviceIncludesLabel = 'Service Includes:',
  startingAtLabel = 'Starting at',
  bookServiceButtonText = 'Book This Service',
}: ServicesDetailProps) {
  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="space-y-16 md:space-y-20">
          {displayServices.map((service, index) => (
            <ScrollAnimate
              key={index}
              variantName="fadeInUp"
              delay={index * 0.1}
              className={`grid items-center gap-12 md:grid-cols-2 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <Card className="overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={service.image?.url || '/placeholder.svg'}
                      alt={service.image?.alt || service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Card>
              </div>

              <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div>
                  <h2 className="mb-4 text-3xl font-bold text-brandDark lg:text-4xl">
                    {service.title}
                  </h2>
                  <div className="prose prose-lg max-w-none text-brandMediumGray">
                    <RenderServiceDescription description={service.description} />
                  </div>
                </div>

                {service.features && service.features.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-brandDark">{serviceIncludesLabel}</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-5 w-5 shrink-0 text-brandRed" />
                          <span className="text-brandMediumGray">{feature.feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row">
                  <div className="border-l-4 border-brandRed pl-6">
                    {service.price && (
                      <>
                        <p className="mb-1 text-sm font-semibold tracking-wider text-brandRed uppercase">
                          {startingAtLabel}
                        </p>
                        <p className="text-4xl font-bold text-brandDark">{service.price}</p>
                      </>
                    )}
                    {service.duration && (
                      <div className="mt-2 flex items-center gap-2 text-brandMediumGray">
                        <Clock className="h-4 w-4 text-brandRed" />
                        <span className="text-sm">{service.duration}</span>
                      </div>
                    )}
                  </div>
                  <Link href="/booking" className="mt-auto">
                    <Button size="lg" className="bg-brandRed text-white hover:bg-red-700">
                      {bookServiceButtonText}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  )
}
