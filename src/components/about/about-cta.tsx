import { ArrowRight } from 'lucide-react'

import { CmsLink } from '@/components/layout/cms-link'
import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'
import type { AboutPage } from '@/payload-types'

export default function AboutCta({ title, button }: AboutPage['cta']) {
  return (
    <section className="bg-brandDark py-16 text-white lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInUp" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold lg:text-4xl">{title}</h2>
          <Button
            asChild
            size="default"
            variant="outline"
            className="border-white bg-transparent text-white hover:bg-white hover:text-brandDark sm:px-6 sm:py-3 sm:text-base"
          >
            <CmsLink url={button.url}>
              {button.label}
              <ArrowRight className="ml-2 h-5 w-5" />
            </CmsLink>
          </Button>
        </ScrollAnimate>
      </div>
    </section>
  )
}
