import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

import { CmsLink } from '@/components/layout/cms-link'
import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'
import { image } from '@/lib/cms'
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
    <div className="mb-6 space-y-4 text-base leading-relaxed text-brandMediumGray md:text-lg">
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
    <section id="about" className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <ScrollAnimate variantName="slideInLeft" className="relative">
            {aboutImage && (
              <Image
                src={aboutImage.url}
                alt={aboutImage.alt}
                width={600}
                height={400}
                className="rounded-lg object-cover shadow-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            )}
            <div className="absolute -bottom-8 -left-8 w-52 rounded-lg bg-brandRed p-6 text-center text-white shadow-lg">
              <p className="text-4xl font-bold">{yearsOfExperience}+</p>
              <p className="text-sm">{about.badgeLabel}</p>
            </div>
          </ScrollAnimate>
          <ScrollAnimate variantName="slideInRight" delay={0.2}>
            <p className="mb-2 text-sm font-semibold tracking-wider text-brandRed uppercase">
              {about.eyebrow}
            </p>
            <h2 className="mb-4 text-3xl font-bold text-brandDark lg:text-4xl">{about.title}</h2>
            <Paragraphs text={about.body} />
            <Button asChild variant="brandOutline" size="lg">
              <CmsLink url={about.cta.url}>{about.cta.label}</CmsLink>
            </Button>
          </ScrollAnimate>
        </div>

        <div className="mt-16 grid items-center gap-12 md:grid-cols-2 lg:mt-24 lg:gap-16">
          <ScrollAnimate variantName="slideInRight" delay={0.1} className="order-2 md:order-1">
            <p className="mb-2 text-sm font-semibold tracking-wider text-brandRed uppercase">
              {transformation.eyebrow}
            </p>
            <h2 className="mb-4 text-3xl font-bold text-brandDark lg:text-4xl">
              {transformation.title}
            </h2>
            <Paragraphs text={transformation.body} />
            {transformation.features && transformation.features.length > 0 && (
              <ul className="space-y-3">
                {transformation.features.map((item, index) => (
                  <li key={item.id ?? index} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-brandRed" />
                    <span className="text-base text-brandMediumGray md:text-lg">
                      {item.feature}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </ScrollAnimate>
          <ScrollAnimate
            variantName="slideInLeft"
            delay={0.2}
            staggerChildren={0.1}
            className="order-1 grid grid-cols-1 gap-4 sm:grid-cols-3 md:order-2"
          >
            {gallery.map(
              (photo, index) =>
                photo && (
                  <ScrollAnimate variantName="zoomIn" key={index}>
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      width={200}
                      height={150}
                      className="aspect-[4/3] w-full rounded-lg object-cover shadow-md"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 33vw, 200px"
                    />
                  </ScrollAnimate>
                ),
            )}
          </ScrollAnimate>
        </div>
      </div>
    </section>
  )
}
