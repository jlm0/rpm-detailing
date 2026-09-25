'use client'

import Image from 'next/image'

import ScrollAnimate from '@/components/motion/scroll-animate'
import type { AboutPage } from '@/payload-types'

interface RichTextLeaf {
  text?: string
}

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
  if (content?.root.children) {
    return (
      <div>
        {content.root.children.map((paragraph, i) => (
          <p key={i} className="mt-4">
            {Array.isArray(paragraph.children) &&
              paragraph.children.map((text: RichTextLeaf | null, j: number) => {
                if (text && typeof text === 'object' && 'text' in text) {
                  return <span key={j}>{text.text || ''}</span>
                }
                return null
              })}
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

export default function AboutStory({
  title,
  content,
  image,
  imageAlt = 'Our story',
}: AboutStoryProps) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <ScrollAnimate variantName="fadeInUp">
            <h2 className="mb-6 text-3xl font-bold text-brandDark lg:text-4xl">{title}</h2>
            <div className="prose prose-sm max-w-none text-brandMediumGray md:prose-lg">
              <RenderStoryContent content={content} />
            </div>
          </ScrollAnimate>

          <ScrollAnimate variantName="fadeInUp" delay={0.2}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
              <Image src={image} alt={imageAlt} fill className="object-cover" />
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  )
}
