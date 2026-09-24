'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'

interface AboutCtaProps {
  title: string
  buttonText: string
  buttonLink: string
}

export default function AboutCta({ title, buttonText, buttonLink }: AboutCtaProps) {
  return (
    <section className="bg-brandDark py-16 text-white lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInUp" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold lg:text-4xl">{title}</h2>
          <Link href={buttonLink}>
            <Button
              size="default"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white hover:text-brandDark sm:px-6 sm:py-3 sm:text-base"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </ScrollAnimate>
      </div>
    </section>
  )
}
