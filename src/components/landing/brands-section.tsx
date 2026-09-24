'use client'

import Image from 'next/image'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'

interface Brand {
  name: string
  logo: {
    url: string
    alt?: string
  }
}

interface BrandsSectionProps {
  brands: Brand[]
}

const BrandsSection = ({ brands }: BrandsSectionProps) => {
  return (
    <section className="bg-brandDark py-16 text-white lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInDown" className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">We Detail All Makes and Models</h2>
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.05}
          delay={0.2}
          className="grid grid-cols-3 items-center justify-items-center gap-8 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8"
        >
          {brands.map((brand) => (
            <ScrollAnimate variantName="zoomIn" key={brand.name}>
              <div className="opacity-70 transition-opacity hover:opacity-100">
                <Image
                  src={brand.logo.url}
                  alt={brand.logo.alt || `${brand.name} logo`}
                  width={100}
                  height={50}
                  className="object-contain"
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 100px"
                />
              </div>
            </ScrollAnimate>
          ))}
        </ScrollAnimate>
        <ScrollAnimate variantName="fadeInUp" delay={0.4} className="mt-12 text-center">
          <Button
            variant="outline"
            size="default"
            className="border-white bg-transparent text-white hover:bg-white hover:text-brandRed md:px-6 md:py-3 md:text-base"
          >
            Book Your Make
          </Button>
        </ScrollAnimate>
      </div>
    </section>
  )
}

export default BrandsSection
