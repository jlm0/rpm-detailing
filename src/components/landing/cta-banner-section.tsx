'use client'

import { Wrench, CalendarDays, Car, Sparkles, SprayCan, type LucideIcon } from 'lucide-react'
import Link from 'next/link'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  CalendarDays,
  Car,
  Sparkles,
  SprayCan,
}

interface CtaItem {
  title: string
  description: string
  iconName: string
}

interface CtaBannerSectionProps {
  preHeading?: string
  heading?: string
  ctaButtonText?: string
  ctaButtonLink?: string
  ctaItems?: CtaItem[]
}

const defaultCtaItems: CtaItem[] = [
  {
    title: 'Choose Your Package',
    description:
      'Select from our range of detailing packages or tell us your specific needs for a custom quote.',
    iconName: 'Wrench',
  },
  {
    title: 'Schedule Your Detail',
    description:
      'Pick a convenient date and time. We offer flexible scheduling, including mobile services at your location.',
    iconName: 'CalendarDays',
  },
  {
    title: 'Enjoy a Pristine Car',
    description:
      'Our experts will meticulously detail your vehicle, leaving it looking and feeling brand new. Satisfaction guaranteed!',
    iconName: 'Car',
  },
]

const CtaBannerSection = ({
  preHeading = '// EXPERIENCE THE DIFFERENCE',
  heading = "Rediscover Your Car's Beauty, Hassle-Free",
  ctaButtonText = 'Book Now',
  ctaButtonLink = '/booking',
  ctaItems = defaultCtaItems,
}: CtaBannerSectionProps) => {
  return (
    <section className="bg-brandRed py-16 text-white lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInDown" className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold tracking-wider text-white/80 uppercase">
            {preHeading}
          </p>
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">{heading}</h2>
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.15}
          className="mb-12 grid gap-8 text-center md:grid-cols-3 lg:gap-12"
        >
          {ctaItems.map((item) => {
            const IconComponent = iconMap[item.iconName] ?? Car
            return (
              <ScrollAnimate variantName="fadeInUp" key={item.title}>
                <div className="flex flex-col items-center">
                  <IconComponent className="mb-4 h-12 w-12 text-white" />
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/90">{item.description}</p>
                </div>
              </ScrollAnimate>
            )
          })}
        </ScrollAnimate>
        <ScrollAnimate variantName="fadeInUp" delay={0.3} className="text-center">
          <Link href={ctaButtonLink}>
            <Button
              variant="outline"
              className="w-full border-white bg-transparent px-8 py-3 text-lg text-white hover:bg-white hover:text-brandRed sm:w-auto"
            >
              {ctaButtonText}
            </Button>
          </Link>
        </ScrollAnimate>
      </div>
    </section>
  )
}

export default CtaBannerSection
