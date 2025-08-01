'use client'

import Image from 'next/image'

import ScrollAnimate from '@/components/motion/scroll-animate'
import type { AboutPage } from '@/payload-types'

interface AboutStoryProps {
  title: string
  content: string | AboutPage['storyContent']
  image: string
  imageAlt?: string
}

function RenderStoryContent({ content }: { content: string | AboutPage['storyContent'] }) {
  if (typeof content === 'string') {
    return <p>{content}</p>
  }
  if (content && content.root && content.root.children) {
    return (
      <div>
        {content.root.children.map((paragraph: any, i) => (
          <p key={i} className="mt-4">
            {paragraph.children && Array.isArray(paragraph.children) && 
              paragraph.children.map((text: any, j: number) => {
                if (text && typeof text === 'object' && 'text' in text) {
                  return <span key={j}>{text.text || ''}</span>
                }
                return null
              })
            }
          </p>
        ))}
      </div>
    )
  }
  return (
    <div>
      <p>
        RPM Detailing was founded with a passion for excellence and a commitment to providing the
        highest quality auto detailing services.
      </p>
      <p className="mt-4">
        Over the years, we&apos;ve built a reputation for meticulous attention to detail, using only
        the finest products and techniques. Our team of skilled professionals takes pride in
        transforming vehicles and exceeding our customers&apos; expectations.
      </p>
      <p className="mt-4">
        Today, we continue to innovate and improve our services, staying at the forefront of the
        auto detailing industry while maintaining the personal touch that sets us apart.
      </p>
    </div>
  )
}

export default function AboutStory({ title, content, image, imageAlt = "Our story" }: AboutStoryProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollAnimate variantName="fadeInUp">
            <h2 className="text-3xl lg:text-4xl font-bold text-brandDark mb-6">{title}</h2>
            <div className="text-brandMediumGray prose prose-sm md:prose-lg max-w-none">
              <RenderStoryContent content={content} />
            </div>
          </ScrollAnimate>

          <ScrollAnimate variantName="fadeInUp" delay={0.2}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <Image src={image} alt={imageAlt} fill className="object-cover" />
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  )
}
