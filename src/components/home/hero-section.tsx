import { MapPin, Phone } from 'lucide-react'
import Image from 'next/image'

import { CmsLink } from '@/components/layout/cms-link'
import ScrollAnimate from '@/components/motion/scroll-animate'
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
    <section className="relative flex h-[calc(100vh-80px)] min-h-[600px] items-center bg-brandDark text-white md:min-h-[700px]">
      {background && (
        <div className="absolute inset-0">
          <Image
            src={background.url}
            alt={background.alt}
            fill
            priority
            className="object-cover opacity-40"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
          />
        </div>
      )}

      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-brandRed bg-grunge-texture opacity-90 bg-blend-multiply md:w-2/5" />

      <div className="relative z-10 container mx-auto flex h-full items-center justify-between px-4">
        <HeroSlides slides={hero.slides}>
          <Button
            asChild
            variant="outline"
            className="w-full border-white bg-transparent px-8 py-3 text-lg text-white hover:bg-white hover:text-brandRed sm:w-auto"
          >
            <CmsLink url={hero.cta.url}>{hero.cta.label}</CmsLink>
          </Button>
        </HeroSlides>

        {(hero.showPhone || hero.showAddress) && (
          <ScrollAnimate
            variantName="fadeInRight"
            delay={0.4}
            className="absolute right-4 bottom-10 hidden flex-col space-y-4 rounded-sm bg-black/30 p-4 md:flex"
          >
            {hero.showPhone && (
              <a
                href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                className="flex items-center space-x-2"
              >
                <Phone className="h-5 w-5 text-brandRed" />
                <span>
                  {hero.phoneLabel} {business.phone}
                </span>
              </a>
            )}
            {hero.showAddress && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-brandRed" />
                <span>{business.address}</span>
              </div>
            )}
          </ScrollAnimate>
        )}
      </div>
    </section>
  )
}
