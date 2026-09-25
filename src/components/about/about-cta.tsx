import { ArrowRight } from 'lucide-react'

import { CmsLink } from '@/components/layout/cms-link'
import { Magnetic } from '@/components/motion/magnetic'
import Reveal from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import type { AboutPage } from '@/payload-types'

export default function AboutCta({ title, button }: AboutPage['cta']) {
  return (
    <section className="bg-brandRed bg-grunge-texture py-20 text-white bg-blend-multiply md:py-28">
      <div className="container mx-auto flex flex-col items-center px-4 text-center">
        <SectionHeading title={title} tone="red" align="center" />
        <Reveal order={1} className="mt-10">
          <Magnetic>
            <Button asChild size="lg" variant="light">
              <CmsLink url={button.url}>
                {button.label}
                <ArrowRight />
              </CmsLink>
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
