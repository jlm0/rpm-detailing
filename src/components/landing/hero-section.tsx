'use client'
import { Phone, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'

interface HeroSlide {
  title?: string
  subtitle?: string
}

interface HeroSectionProps {
  slides?: HeroSlide[]
  backgroundImage?: string
  ctaText?: string
  ctaLink?: string
  showPhoneNumbers?: boolean
  showAddress?: boolean
  phone?: string
  address?: string
}

const HeroSection = ({
  slides = [
    {
      title: 'Advanced Detailing Solutions for Your Prized Automobile',
      subtitle: '// PREMIUM CAR DETAILING',
    },
  ],
  backgroundImage = '/placeholder.svg',
  ctaText = 'Book Now',
  ctaLink = '/booking',
  showPhoneNumbers = true,
  showAddress = true,
  phone = '(425) 345-3564',
  address = 'Boise, ID, USA',
}: HeroSectionProps) => {
  const [activeSlide, setActiveSlide] = useState(0)

  // Use the slides from props
  const heroContent = slides
  const currentSlide = heroContent[activeSlide]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroContent.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [heroContent.length])
  return (
    <section className="relative flex h-[calc(100vh-80px)] min-h-[600px] items-center bg-brandDark text-white md:min-h-[700px]">
      {/* Background image and overlay remain as is */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="A beautifully detailed luxury sports car"
          fill
          priority
          className="object-cover opacity-40"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        />
      </div>

      <div className="bg-grunge-texture absolute top-0 bottom-0 left-0 w-1/2 bg-brandRed opacity-90 bg-blend-multiply md:w-2/5">
        {/* Grunge texture applied via tailwind.config.ts */}
      </div>

      <div className="relative z-10 container mx-auto flex h-full items-center justify-between px-4">
        <div className="relative w-full md:w-1/2 lg:w-2/5">
          <ScrollAnimate variantName="fadeInUp" delay={0.2}>
            <div className="flex min-h-[280px] flex-col justify-center lg:min-h-[320px]">
              <p className="mb-4 text-sm tracking-wider uppercase">
                {currentSlide?.subtitle}
              </p>
              <h1 className="mb-8 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
                {currentSlide?.title}
              </h1>
            </div>
            <Link href={ctaLink}>
              <Button
                variant="outline"
                className="w-full border-white bg-transparent px-8 py-3 text-lg text-white hover:bg-white hover:text-brandRed sm:w-auto"
              >
                {ctaText}
              </Button>
            </Link>
          </ScrollAnimate>
          <div className="absolute top-1/2 left-[-50px] hidden -translate-y-1/2 transform flex-col space-y-4 lg:flex">
            {['01', '02', '03'].map((num, index) => (
              <button
                key={num}
                onClick={() => setActiveSlide(index)}
                className={`block text-sm transition-all duration-300 ${
                  activeSlide === index
                    ? 'scale-110 font-bold text-white'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {(showPhoneNumbers || showAddress) && (
          <ScrollAnimate
            variantName="fadeInRight"
            delay={0.4}
            className="absolute right-4 bottom-10 hidden flex-col space-y-4 rounded-sm bg-black/30 p-4 md:flex"
          >
            {showPhoneNumbers && phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-brandRed" />
                <span>Call Us: {phone}</span>
              </div>
            )}
            {showAddress && address && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-brandRed" />
                <span>{address}</span>
              </div>
            )}
          </ScrollAnimate>
        )}
      </div>
    </section>
  )
}

export default HeroSection
