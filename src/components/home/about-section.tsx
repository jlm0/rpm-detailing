import { Check } from 'lucide-react'
import Image from 'next/image'

import { CmsLink } from '@/components/layout/cms-link'
import Reveal from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import { image } from '@/lib/cms'
import { cn } from '@/lib/utils'
import type { HomePage } from '@/payload-types'

interface AboutSectionProps {
  about: HomePage['about']
  transformation: HomePage['transformation']
  yearsOfExperience: number
}

function Paragraphs({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

export function AboutSection({ about, transformation, yearsOfExperience }: AboutSectionProps) {
  const aboutImage = image(about.image, 'card')
  const gallery = transformation.gallery.map((media) => image(media, 'card'))

  return (
    <section id="about" className="overflow-hidden bg-white py-20 md:py-28 lg:py-36">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-16 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <Reveal className="relative mr-4 mb-8 md:mr-0">
            {aboutImage && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brandLightGray lg:aspect-[5/4]">
                <Image
                  src={aboutImage.url}
                  alt={aboutImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="absolute -right-4 -bottom-8 flex min-w-40 flex-col gap-1 rounded-md bg-brandRed bg-grunge-texture px-6 py-5 text-white bg-blend-multiply shadow-[0_24px_48px_-24px_rgb(217_35_45/0.8)] md:right-auto md:-left-6 lg:-left-10">
              <p className="font-display text-5xl leading-none font-bold tracking-tight [font-stretch:118%]">
                {yearsOfExperience}+
              </p>
              <p className="text-xs font-semibold tracking-[0.16em] text-white/85 uppercase">
                {about.badgeLabel}
              </p>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow={about.eyebrow}
              title={about.title}
              description={<Paragraphs text={about.body} />}
            />
            <Reveal order={1} className="mt-10">
              <Button asChild variant="brandOutline" size="lg">
                <CmsLink url={about.cta.url}>{about.cta.label}</CmsLink>
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="mt-28 grid items-center gap-16 md:grid-cols-2 lg:mt-40 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <SectionHeading
              eyebrow={transformation.eyebrow}
              title={transformation.title}
              description={<Paragraphs text={transformation.body} />}
            />
            {transformation.features && transformation.features.length > 0 && (
              <Reveal
                stagger
                order={1}
                className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200"
              >
                {transformation.features.map((item, index) => (
                  <Reveal key={item.id ?? index} className="flex items-center gap-4 py-4">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brandRed/10">
                      <Check className="size-3.5 text-brandRed" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="text-base text-brandInk md:text-lg">{item.feature}</span>
                  </Reveal>
                ))}
              </Reveal>
            )}
          </div>
          <Reveal stagger className="grid grid-cols-2 grid-rows-2 gap-3 md:gap-4">
            {gallery.map(
              (photo, index) =>
                photo && (
                  <Reveal
                    variant="fade"
                    key={index}
                    className={cn(
                      'relative overflow-hidden rounded-lg bg-brandLightGray',
                      index === 0 ? 'row-span-2' : 'aspect-square',
                    )}
                  >
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </Reveal>
                ),
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
