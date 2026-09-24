'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'

interface ServicesCtaProps {
  title: string
  text: string
  buttonText: string
  buttonLink: string
}

export default function ServicesCta({ title, text, buttonText, buttonLink }: ServicesCtaProps) {
  return (
    <section className="bg-brandRed py-16 text-white lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInUp" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold lg:text-4xl">{title}</h2>
          <p className="mb-8 text-lg text-white/90">{text}</p>
          <Link href={buttonLink}>
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white hover:text-brandRed"
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
