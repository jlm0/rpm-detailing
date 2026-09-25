import Image from 'next/image'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { image } from '@/lib/cms'
import type { AboutPage } from '@/payload-types'

export default function AboutHero({ title, subtitle, image: media }: AboutPage['hero']) {
  const background = image(media, 'hero')

  return (
    <section className="relative overflow-hidden bg-brandDark py-24 text-white lg:py-32">
      <div className="absolute inset-0 z-0">
        {background && (
          <Image
            src={background.url}
            alt={background.alt}
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-r from-brandDark/90 to-brandDark/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <ScrollAnimate variantName="fadeInUp" className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-7xl">{title}</h1>
          <p className="text-xl text-white/80">{subtitle}</p>
        </ScrollAnimate>
      </div>
    </section>
  )
}
