'use client'

import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'
import type { LandingPage } from '@/payload-types'

type AboutContent = string | NonNullable<LandingPage['aboutSection']>['content']

type RichTextLeaf = { text?: string }

interface AboutUsSectionProps {
  whyChooseSection?: {
    subtitle: string
    title: string
    content: AboutContent
    image?: string
  }
  transformationSection?: {
    subtitle: string
    title: string
    content: string
    features: string[]
  }
  yearsOfExperience?: number
}

function RenderAboutContent({ content }: { content: AboutContent }) {
  if (typeof content === 'string') {
    return (
      <p className="mb-6 text-base leading-relaxed text-brandMediumGray md:text-lg">{content}</p>
    )
  }
  if (content && content.root && content.root.children) {
    return (
      <div className="mb-6 text-base leading-relaxed text-brandMediumGray md:text-lg">
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
    <p className="mb-6 text-base leading-relaxed text-brandMediumGray md:text-lg">
      Modern vehicle finishes and interiors require specialized care. Our detailing service excels
      by combining advanced techniques, premium products, and highly skilled technicians to restore
      and protect your vehicle&apos;s beauty. Trust RPM Detailing for meticulous attention to
      detail.
    </p>
  )
}

const AboutUsSection = ({
  whyChooseSection = {
    subtitle: '// WHY CHOOSE RPM DETAILING',
    title: 'Expert Car Detailing Since 2020',
    content:
      'Modern vehicle finishes and interiors require specialized care. Our detailing service excels by combining advanced techniques, premium products, and highly skilled technicians to restore and protect your vehicle&apos;s beauty. Trust RPM Detailing for meticulous attention to detail.',
    image: '/placeholder.svg',
  },
  transformationSection = {
    subtitle: '// COMPLETE TRANSFORMATION',
    title: 'We Offer Comprehensive Detailing for Your Car',
    content:
      'From a meticulous hand wash to full paint correction and ceramic coatings, we provide a complete suite of detailing services. We&apos;re the preferred choice for discerning car owners who value quality and lasting results.',
    features: [
      'Premium hand wash and decontamination',
      'Multi-stage paint correction and polishing',
      'Durable ceramic coatings and paint protection',
    ],
  },
  yearsOfExperience = 20,
}: AboutUsSectionProps) => {
  return (
    <section id="about" className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <ScrollAnimate variantName="slideInLeft" className="relative">
            <Image
              src={whyChooseSection.image || '/placeholder.svg'}
              alt="Professional car polishing service"
              width={600}
              height={400}
              className="rounded-lg object-cover shadow-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
            <div className="absolute -bottom-8 -left-8 w-52 rounded-lg bg-brandRed p-6 text-center text-white shadow-lg">
              <p className="text-4xl font-bold">{yearsOfExperience}+</p>
              <p className="text-sm">Years of Experience</p>
            </div>
          </ScrollAnimate>
          <ScrollAnimate variantName="slideInRight" delay={0.2} className="">
            <p className="mb-2 text-sm font-semibold tracking-wider text-brandRed uppercase">
              {whyChooseSection.subtitle}
            </p>
            <h2 className="mb-4 text-3xl font-bold text-brandDark lg:text-4xl">
              {whyChooseSection.title}
            </h2>
            <RenderAboutContent content={whyChooseSection.content} />
            <Link href="/booking">
              <Button
                variant="outline"
                className="border-brandRed text-brandRed hover:bg-brandRed hover:text-white"
              >
                Book Now
              </Button>
            </Link>
          </ScrollAnimate>
        </div>

        <div className="mt-16 grid items-center gap-12 md:grid-cols-2 lg:mt-24 lg:gap-16">
          <ScrollAnimate variantName="slideInRight" delay={0.1} className="order-2 md:order-1">
            <p className="mb-2 text-sm font-semibold tracking-wider text-brandRed uppercase">
              {transformationSection.subtitle}
            </p>
            <h2 className="mb-4 text-3xl font-bold text-brandDark lg:text-4xl">
              {transformationSection.title}
            </h2>
            <p className="mb-6 text-base leading-relaxed text-brandMediumGray md:text-lg">
              {transformationSection.content}
            </p>
            <ul className="space-y-3">
              {transformationSection.features.map((item) => (
                <li key={item} className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brandRed" />
                  <span className="text-base text-brandMediumGray md:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollAnimate>
          <ScrollAnimate
            variantName="slideInLeft"
            delay={0.2}
            staggerChildren={0.1}
            className="order-1 grid grid-cols-1 gap-4 sm:grid-cols-3 md:order-2"
          >
            {['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'].map((src, index) => (
              <ScrollAnimate variantName="zoomIn" key={index}>
                <Image
                  src={src || '/placeholder.svg'}
                  alt={`Car detailing process ${index + 1}`}
                  width={200}
                  height={150}
                  className="aspect-[4/3] w-full rounded-lg object-cover shadow-md"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 33vw, 200px"
                />
              </ScrollAnimate>
            ))}
          </ScrollAnimate>
        </div>
      </div>
    </section>
  )
}

export default AboutUsSection
