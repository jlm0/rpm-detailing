import { ArrowRight, Check, Clock } from 'lucide-react'
import Image from 'next/image'

import { CmsLink } from '@/components/layout/cms-link'
import Reveal from '@/components/motion/reveal'
import { RichText } from '@/components/rich-text'
import { Button } from '@/components/ui/button'
import { Price } from '@/components/ui/price'
import { image } from '@/lib/cms'
import { serviceAnchor } from '@/lib/site-map'
import { cn } from '@/lib/utils'
import type { Service, ServicesPage } from '@/payload-types'

interface ServicesDetailProps {
  services: Service[]
  labels: ServicesPage['labels']
}

export default function ServicesDetail({ services, labels }: ServicesDetailProps) {
  const { bookButton } = labels
  if (services.length === 0) return null

  return (
    <section className="bg-white py-20 md:py-28 lg:py-32">
      <div className="container mx-auto divide-y divide-neutral-200 px-4">
        {services.map((service, index) => {
          const photo = image(service.image, 'card')
          const reversed = index % 2 === 1
          return (
            <article
              key={service.id}
              id={serviceAnchor(service.id)}
              className="grid scroll-mt-28 gap-10 py-16 first:pt-0 last:pb-0 md:grid-cols-2 md:gap-14 md:py-24 lg:gap-24"
            >
              <Reveal className={cn('md:sticky md:top-28 md:self-start', reversed && 'md:order-2')}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brandInk">
                  {photo && (
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      style={{ objectPosition: photo.position }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/55 to-transparent" />
                  <span
                    aria-hidden
                    className="absolute top-5 left-6 font-display text-sm font-bold tracking-[0.2em] text-white/90 tabular-nums"
                  >
                    {String(index + 1).padStart(2, '0')} /{' '}
                    {String(services.length).padStart(2, '0')}
                  </span>
                </div>
              </Reveal>

              <Reveal order={1} className="flex flex-col">
                <h2 className="mb-6 text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-bold tracking-[-0.03em] text-brandInk">
                  {service.title}
                </h2>
                <RichText
                  data={service.description}
                  className="prose max-w-prose text-brandMediumGray md:prose-lg"
                />

                {service.features && service.features.length > 0 && (
                  <div className="mt-10">
                    <h3 className="mb-4 font-sans text-xs font-semibold tracking-[0.2em] text-brandInk uppercase [font-stretch:100%]">
                      {labels.includes}
                    </h3>
                    <ul className="grid border-t border-neutral-200 lg:grid-cols-2 lg:gap-x-8">
                      {service.features.map((item, idx) => (
                        <li
                          key={item.id ?? idx}
                          className="flex items-start gap-3 border-b border-neutral-200 py-3 text-brandInk"
                        >
                          <Check
                            className="mt-1 size-4 shrink-0 text-brandRed"
                            strokeWidth={2.5}
                            aria-hidden
                          />
                          <span>{item.feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-10 flex flex-col gap-6 rounded-lg bg-brandLightGray p-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between md:p-7">
                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-semibold tracking-[0.2em] text-brandRed uppercase">
                      {labels.price}
                    </p>
                    <p className="font-display text-4xl leading-none font-bold tracking-tight [overflow-wrap:break-word] text-brandInk [font-stretch:112%] tabular-nums">
                      <Price amount={service.price} suffix={service.priceSuffix} />
                    </p>
                    {service.duration && (
                      <p className="mt-3 flex items-center gap-2 text-sm text-brandMediumGray">
                        <Clock className="size-4 text-brandRed" aria-hidden />
                        {service.duration}
                      </p>
                    )}
                  </div>
                  <Button asChild size="lg" variant="brand" className="shrink-0">
                    <CmsLink url={bookButton.url}>
                      {bookButton.label}
                      <ArrowRight />
                    </CmsLink>
                  </Button>
                </div>
              </Reveal>
            </article>
          )
        })}
      </div>
    </section>
  )
}
