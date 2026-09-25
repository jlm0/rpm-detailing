import Image from 'next/image'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { RichText } from '@/components/rich-text'
import { image } from '@/lib/cms'
import type { AboutPage } from '@/payload-types'

export default function AboutStory({ title, content, image: media }: AboutPage['story']) {
  const photo = image(media, 'card')

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <ScrollAnimate variantName="fadeInUp">
            <h2 className="mb-6 text-3xl font-bold text-brandDark lg:text-4xl">{title}</h2>
            <RichText
              data={content}
              className="prose prose-sm max-w-none text-brandMediumGray md:prose-lg"
            />
          </ScrollAnimate>

          <ScrollAnimate variantName="fadeInUp" delay={0.2}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
              {photo && <Image src={photo.url} alt={photo.alt} fill className="object-cover" />}
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  )
}
