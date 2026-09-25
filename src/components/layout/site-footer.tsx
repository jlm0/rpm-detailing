import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Reveal from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { getGlobal, image } from '@/lib/cms'

import { CmsLink } from './cms-link'
import { ContactDetails, OpeningHours } from './contact'

const labelClass =
  'mb-6 font-sans text-xs font-semibold tracking-[0.2em] text-white/50 uppercase [font-stretch:100%]'

export default async function SiteFooter() {
  const [footer, { business, branding }] = await Promise.all([
    getGlobal('footer'),
    getGlobal('site-settings'),
  ])
  const logo = image(branding.logo, 'thumbnail')
  const copyright = footer.copyright.replaceAll('{year}', String(new Date().getFullYear()))

  return (
    <footer id="contact" className="border-t border-white/5 bg-brandDark bg-grain text-white/70">
      <div className="container mx-auto px-4 pt-20 pb-10 md:pt-24">
        <Reveal
          stagger
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr] lg:gap-14"
        >
          <Reveal>
            <Link href="/" className="mb-6 inline-flex rounded-sm">
              {logo && (
                <span className="relative block h-10 w-36">
                  <Image
                    src={logo.url}
                    alt={logo.alt}
                    fill
                    className="object-contain object-left"
                    sizes="144px"
                  />
                </span>
              )}
            </Link>
            <p className="max-w-xs text-sm leading-relaxed">{footer.description}</p>
          </Reveal>
          <Reveal>
            <h2 className={labelClass}>{footer.contactHeading}</h2>
            <ContactDetails business={business} />
          </Reveal>
          <Reveal>
            <h2 className={labelClass}>{footer.hoursHeading}</h2>
            <OpeningHours hours={business.hours} />
          </Reveal>
          <Reveal className="rounded-lg bg-white/[0.04] p-6 ring-1 ring-white/10">
            <h2 className="mb-3 text-xl font-bold text-white">{footer.cta.heading}</h2>
            <p className="mb-6 text-sm leading-relaxed">{footer.cta.text}</p>
            <Button asChild variant="brand" size="lg" className="w-full">
              <CmsLink url={footer.cta.button.url}>
                {footer.cta.button.label}
                <ArrowRight />
              </CmsLink>
            </Button>
          </Reveal>
        </Reveal>
        <p className="mt-16 border-t border-white/10 pt-8 text-xs text-white/50 md:mt-20">
          {copyright}
        </p>
      </div>
    </footer>
  )
}
