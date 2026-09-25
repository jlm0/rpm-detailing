import { MapPin, Phone } from 'lucide-react'
import Image from 'next/image'

import { CmsLink } from '@/components/layout/cms-link'
import { telHref } from '@/components/layout/contact'
import { Magnetic } from '@/components/motion/magnetic'
import { Button } from '@/components/ui/button'
import { image } from '@/lib/cms'
import type { HomePage, SiteSetting } from '@/payload-types'

import { HeroSlides } from './hero-slides'

interface HeroSectionProps {
  hero: HomePage['hero']
  business: SiteSetting['business']
}

export function HeroSection({ hero, business }: HeroSectionProps) {
  const background = image(hero.backgroundImage, 'hero')

  return (
    <section className="relative isolate flex min-h-[max(40rem,calc(100svh-5rem))] flex-col justify-end overflow-hidden bg-brandInk text-white md:justify-center">
      {background && (
        <div className="absolute inset-x-0 top-0 -z-10 h-[58%] hero-parallax md:inset-0 md:h-auto">
          <Image
            src={background.url}
            alt={background.alt}
            fill
            priority
            className="object-cover opacity-60 motion-safe:animate-settle"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brandInk via-brandInk/30 to-brandInk/10 md:bg-linear-to-r md:from-brandInk/40 md:via-transparent" />
        </div>
      )}

      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 hidden w-1/2 bg-brandRed bg-grunge-texture bg-blend-multiply [clip-path:polygon(0_0,100%_0,calc(100%-4.5rem)_100%,0_100%)] md:block lg:w-[46%]"
      />

      <div className="container">
        <div className="-mx-4 px-4 pt-16 pb-10 max-md:bg-brandRed max-md:bg-grunge-texture max-md:bg-blend-multiply max-md:[clip-path:polygon(0_2.5rem,100%_0,100%_100%,0_100%)] md:mx-0 md:max-w-[calc(50vw-6rem)] md:px-0 md:py-24 lg:max-w-[34rem]">
          <HeroSlides slides={hero.slides}>
            <Magnetic className="w-full sm:w-auto">
              <Button asChild variant="light" size="lg" className="w-full">
                <CmsLink url={hero.cta.url}>{hero.cta.label}</CmsLink>
              </Button>
            </Magnetic>
          </HeroSlides>
        </div>
      </div>

      {(hero.showPhone || hero.showAddress) && (
        <div className="absolute right-8 bottom-8 hidden animate-rise flex-col gap-3 rounded-md border border-white/10 bg-brandInk/55 px-5 py-4 text-sm backdrop-blur-md enter-step-4 md:flex lg:right-12 lg:bottom-12">
          {hero.showPhone && (
            <a
              href={telHref(business.phone)}
              className="flex items-center gap-3 text-white/90 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-brandRed" aria-hidden />
              <span>
                {hero.phoneLabel}{' '}
                <span className="font-medium text-white tabular-nums">{business.phone}</span>
              </span>
            </a>
          )}
          {hero.showAddress && (
            <p className="flex items-center gap-3 text-white/90">
              <MapPin className="h-4 w-4 text-brandRed" aria-hidden />
              <span>{business.address}</span>
            </p>
          )}
        </div>
      )}
    </section>
  )
}
