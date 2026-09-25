import Image from 'next/image'

import { image } from '@/lib/cms'
import type { Media } from '@/payload-types'

interface PageHeroProps {
  title: string
  subtitle: string
  image: number | Media
  cms: string
}

export function PageHero({ title, subtitle, image: media, cms }: PageHeroProps) {
  const background = image(media, 'hero')

  return (
    <section
      data-cms={cms}
      className="relative isolate flex min-h-[26rem] items-end overflow-hidden bg-brandInk text-white md:min-h-[34rem]"
    >
      {background && (
        <div className="absolute inset-0 -z-20 hero-parallax">
          <Image
            src={background.url}
            alt={background.alt}
            fill
            priority
            className="object-cover opacity-55 motion-safe:animate-settle"
            style={{ objectPosition: background.position }}
            sizes="100vw"
          />
        </div>
      )}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-brandInk via-brandInk/60 to-brandInk/20 md:bg-linear-to-r md:from-brandInk/95 md:via-brandInk/60 md:to-brandInk/10" />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 -z-10 h-1.5 w-1/3 bg-brandRed bg-grunge-texture bg-blend-multiply md:w-1/4"
      />

      <div className="container mx-auto px-4 pt-32 pb-14 md:pb-20">
        <div className="max-w-3xl animate-rise">
          <h1 className="text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.98] font-bold tracking-[-0.03em] [font-stretch:118%]">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
