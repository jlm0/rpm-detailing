import { ArrowRight, Check, Clock } from 'lucide-react'
import Image from 'next/image'

import { CmsLink } from '@/components/layout/cms-link'
import ScrollAnimate from '@/components/motion/scroll-animate'
import { RichText } from '@/components/rich-text'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { image } from '@/lib/cms'
import type { Service, ServicesPage } from '@/payload-types'

interface ServicesDetailProps {
  services: Service[]
  labels: ServicesPage['labels']
}

export default function ServicesDetail({ services, labels }: ServicesDetailProps) {
  const { bookButton } = labels
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="space-y-16 md:space-y-20">
          {services.map((service, index) => {
            const photo = image(service.image, 'card')
            return (
              <ScrollAnimate
                key={service.id}
                variantName="fadeInUp"
                delay={index * 0.1}
                className={`grid items-center gap-12 md:grid-cols-2 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <Card className="overflow-hidden">
                    <div className="relative aspect-[16/9]">
                      {photo && (
                        <Image src={photo.url} alt={photo.alt} fill className="object-cover" />
                      )}
                    </div>
                  </Card>
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div>
                    <h2 className="mb-4 text-3xl font-bold text-brandDark lg:text-4xl">
                      {service.title}
                    </h2>
                    <RichText
                      data={service.description}
                      className="prose prose-lg max-w-none text-brandMediumGray"
                    />
                  </div>

                  {service.features && service.features.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-brandDark">{labels.includes}</h3>
                      <ul className="space-y-2">
                        {service.features.map((item, idx) => (
                          <li key={item.id ?? idx} className="flex items-start gap-3">
                            <Check className="mt-0.5 h-5 w-5 shrink-0 text-brandRed" />
                            <span className="text-brandMediumGray">{item.feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row">
                    <div className="border-l-4 border-brandRed pl-6">
                      <p className="mb-1 text-sm font-semibold tracking-wider text-brandRed uppercase">
                        {labels.price}
                      </p>
                      <p className="text-4xl font-bold text-brandDark">{service.price}</p>
                      {service.duration && (
                        <div className="mt-2 flex items-center gap-2 text-brandMediumGray">
                          <Clock className="h-4 w-4 text-brandRed" />
                          <span className="text-sm">{service.duration}</span>
                        </div>
                      )}
                    </div>
                    <Button asChild size="lg" variant="brand" className="mt-auto self-start">
                      <CmsLink url={bookButton.url}>
                        {bookButton.label}
                        <ArrowRight />
                      </CmsLink>
                    </Button>
                  </div>
                </div>
              </ScrollAnimate>
            )
          })}
        </div>
      </div>
    </section>
  )
}
