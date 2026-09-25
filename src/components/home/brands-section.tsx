import Image from 'next/image'

import { CmsLink } from '@/components/layout/cms-link'
import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'
import { image } from '@/lib/cms'
import type { Brand, HomePage } from '@/payload-types'

interface BrandsSectionProps {
  section: HomePage['brands']
  brands: Brand[]
}

export function BrandsSection({ section, brands }: BrandsSectionProps) {
  return (
    <section className="bg-brandDark py-16 text-white lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInDown" className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">{section.title}</h2>
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.05}
          delay={0.2}
          className="grid grid-cols-3 items-center justify-items-center gap-8 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8"
        >
          {brands.map((brand) => {
            const logo = image(brand.logo, 'thumbnail')
            return (
              logo && (
                <ScrollAnimate variantName="zoomIn" key={brand.id}>
                  <div className="opacity-70 transition-opacity hover:opacity-100">
                    <Image
                      src={logo.url}
                      alt={logo.alt}
                      width={100}
                      height={50}
                      className="object-contain"
                      sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 100px"
                    />
                  </div>
                </ScrollAnimate>
              )
            )
          })}
        </ScrollAnimate>
        <ScrollAnimate variantName="fadeInUp" delay={0.4} className="mt-12 text-center">
          <Button asChild variant="light" size="lg">
            <CmsLink url={section.button.url}>{section.button.label}</CmsLink>
          </Button>
        </ScrollAnimate>
      </div>
    </section>
  )
}
