import Image from 'next/image'

import Reveal from '@/components/motion/reveal'
import { RichText } from '@/components/rich-text'
import { SectionHeading } from '@/components/ui/section-heading'
import { image } from '@/lib/cms'
import type { AboutPage } from '@/payload-types'

export default function AboutStory({ title, content, image: media }: AboutPage['story']) {
  const photo = image(media, 'card')

  return (
    <section className="bg-white py-20 md:py-28 lg:py-36">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <div>
            <SectionHeading title={title} />
            <Reveal order={1} className="mt-6">
              <RichText
                data={content}
                className="prose max-w-prose text-brandMediumGray md:prose-lg"
              />
            </Reveal>
          </div>

          <Reveal order={1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brandInk lg:aspect-[5/4]">
              {photo && (
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: photo.position }}
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
