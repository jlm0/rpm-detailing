import Image from 'next/image'

import { CmsLink } from '@/components/layout/cms-link'
import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import { image } from '@/lib/cms'
import type { Brand, HomePage } from '@/payload-types'

interface BrandsSectionProps {
  section: HomePage['brands']
  brands: Brand[]
}

export function BrandsSection({ section, brands }: BrandsSectionProps) {
  return (
    <section className="bg-brandInk py-20 text-white md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading title={section.title} tone="dark" align="center" className="mb-12" />
        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.05}
          className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-x-10"
        >
          {brands.map((brand) => {
            const logo = image(brand.logo, 'thumbnail')
            return (
              logo && (
                <ScrollAnimate
                  variantName="fadeInUp"
                  key={brand.id}
                  className="flex h-16 w-24 items-center justify-center opacity-55 grayscale transition-opacity duration-300 hover:opacity-100 md:w-32"
                >
                  <Image
                    src={logo.url}
                    alt={logo.alt}
                    width={128}
                    height={40}
                    className="h-auto max-h-10 w-full object-contain"
                    sizes="128px"
                  />
                </ScrollAnimate>
              )
            )
          })}
        </ScrollAnimate>
        <ScrollAnimate variantName="fadeInUp" delay={0.2} className="mt-12 text-center">
          <Button asChild variant="light" size="lg">
            <CmsLink url={section.button.url}>{section.button.label}</CmsLink>
          </Button>
        </ScrollAnimate>
      </div>
    </section>
  )
}
