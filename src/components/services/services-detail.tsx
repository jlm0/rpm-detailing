'use client'

import { Check, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Service {
  title: string
  description: any
  features?: { feature: string }[]
  image?: { url: string; alt?: string }
  price?: string
  duration?: string
}

interface ServicesDetailProps {
  services: Service[]
}

function RenderServiceDescription({ description }: { description: any }) {
  if (typeof description === 'string') {
    return description
  }
  if (description && description.root && description.root.children) {
    return (
      <div>
        {description.root.children.map((paragraph: any, i: number) => (
          <p key={i} className="mt-4">
            {paragraph.children.map((text: any, j: number) => (
              <span key={j}>{text.text}</span>
            ))}
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
    description: "Our restoration process goes beyond surface cleaning—it's a meticulous, multi-stage transformation designed to bring your vehicle back to its original beauty, or better. We use advanced techniques and premium products to reverse years of wear and damage.",
    features: [
      { feature: 'Multi-stage paint correction' },
      { feature: 'Deep interior cleaning and conditioning' },
      { feature: 'Engine bay detailing' },
      { feature: 'Headlight restoration' },
      { feature: 'Trim and plastic restoration' },
      { feature: 'Full vehicle decontamination' }
    ],
    price: '$299',
    duration: '4-6 hours',
    image: { url: '/placeholder.svg', alt: 'Professional vehicle restoration service' }
  },
  {
    title: 'Protect',
    description: 'At RPM, we use only the highest-quality protective products to ensure your vehicle looks its best and stays that way. Our protective solutions offer superior resistance against UV rays, road grime, water spots, and environmental contaminants.',
    features: [
      { feature: 'Ceramic coating application' },
      { feature: 'Paint protection film (PPF)' },
      { feature: 'Interior protection coating' },
      { feature: 'Glass coating for improved visibility' },
      { feature: 'Wheel and caliper coating' },
      { feature: '2-5 year warranty options' }
    ],
    price: '$599',
    duration: '6-8 hours',
    image: { url: '/placeholder.svg', alt: 'Advanced vehicle protection services' }
  },
  {
    title: 'Maintain — RPM+',
    description: 'Our exclusive RPM+ subscription service ensures your vehicle maintains its showroom condition year-round. Regular maintenance is key to preserving your investment and extending the life of protective coatings.',
    features: [
      { feature: 'Monthly maintenance washes' },
      { feature: 'Quarterly deep cleaning' },
      { feature: 'Priority booking' },
      { feature: 'Member-only pricing on additional services' },
      { feature: 'Annual coating inspection and touch-up' },
      { feature: 'Complimentary interior refreshers' }
    ],
    price: '$99/month',
    duration: '2-3 hours per visit',
    image: { url: '/placeholder.svg', alt: 'RPM+ maintenance subscription service' }
  }
]

export default function ServicesDetail({ services }: ServicesDetailProps) {
  const displayServices = services && services.length > 0 ? services : defaultServices

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="space-y-16 md:space-y-20">
          {displayServices.map((service, index) => (
            <ScrollAnimate
              key={index}
              variantName="fadeInUp"
              delay={index * 0.1}
              className={`grid md:grid-cols-2 gap-12 items-center ${
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
                  <h2 className="text-3xl lg:text-4xl font-bold text-brandDark mb-4">
                    {service.title}
                  </h2>
                  <div className="text-brandMediumGray prose prose-lg max-w-none">
                    <RenderServiceDescription description={service.description} />
                  </div>
                </div>

                {service.features && service.features.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-brandDark">Service Includes:</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-brandRed mt-0.5 flex-shrink-0" />
                          <span className="text-brandMediumGray">{feature.feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 flex flex-col sm:flex-row items-start gap-6">
                  <div className="pl-6 border-l-4 border-brandRed">
                    {service.price && (
                      <>
                        <p className="text-sm uppercase tracking-wider text-brandRed font-semibold mb-1">Starting at</p>
                        <p className="text-4xl font-bold text-brandDark">{service.price}</p>
                      </>
                    )}
                    {service.duration && (
                      <div className="flex items-center gap-2 mt-2 text-brandMediumGray">
                        <Clock className="h-4 w-4 text-brandRed" />
                        <span className="text-sm">{service.duration}</span>
                      </div>
                    )}
                  </div>
                  <Link href="/booking" className="mt-auto">
                    <Button 
                      size="lg"
                      className="bg-brandRed hover:bg-red-700 text-white">
                      Book This Service
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
