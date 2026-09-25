import { ArrowRight } from 'lucide-react'

import { CmsLink } from '@/components/layout/cms-link'
import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'
import type { ServicesPage } from '@/payload-types'

export default function ServicesCta({ title, text, button }: ServicesPage['cta']) {
  return (
    <section className="bg-brandRed py-16 text-white lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimate variantName="fadeInUp" className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold lg:text-4xl">{title}</h2>
          <p className="mb-8 text-lg text-white/90">{text}</p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white bg-transparent text-white hover:bg-white hover:text-brandRed"
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
