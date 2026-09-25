import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'
import { getGlobal, image } from '@/lib/cms'

import { CmsLink } from './cms-link'
import { OpeningHours, telHref } from './contact'

export default async function SiteFooter() {
  const [footer, { business, branding }] = await Promise.all([
    getGlobal('footer'),
    getGlobal('site-settings'),
  ])
  const logo = image(branding.logo, 'thumbnail')
  const copyright = footer.copyright.replaceAll('{year}', String(new Date().getFullYear()))

  return (
    <footer id="contact" className="bg-brandDark py-16 text-neutral-300">
      <div className="container mx-auto px-4">
        <ScrollAnimate
          variantName="fadeIn"
          staggerChildren={0.1}
          className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4 xl:gap-16"
        >
          <ScrollAnimate variantName="fadeInUp">
            <div>
              <Link href="/" className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
                {logo && (
                  <div className="relative h-10 w-32">
                    <Image
                      src={logo.url}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  </div>
                )}
              </Link>
              <p className="text-sm leading-relaxed">{footer.description}</p>
            </div>
          </ScrollAnimate>
          <ScrollAnimate variantName="fadeInUp">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">{footer.contactHeading}</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 text-brandRed" />
                  <a href={telHref(business.phone)}>{business.phone}</a>
                </li>
                <li className="flex items-center space-x-2 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 text-brandRed" />
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </li>
                <li className="flex items-center space-x-2 transition-colors hover:text-white">
                  <MapPin className="h-4 w-4 text-brandRed" />
                  <span>{business.address}</span>
                </li>
              </ul>
            </div>
          </ScrollAnimate>
          <ScrollAnimate variantName="fadeInUp">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">{footer.hoursHeading}</h3>
              <OpeningHours hours={business.hours} />
            </div>
          </ScrollAnimate>
          <ScrollAnimate variantName="fadeInUp">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">{footer.cta.heading}</h3>
              <p className="mb-4 text-sm">{footer.cta.text}</p>
              <CmsLink url={footer.cta.button.url}>
                <Button className="w-full bg-brandRed text-white hover:bg-red-700">
                  {footer.cta.button.label}
                </Button>
              </CmsLink>
            </div>
          </ScrollAnimate>
        </ScrollAnimate>
        <ScrollAnimate
          variantName="fadeInUp"
          delay={0.5}
          className="border-t border-neutral-700 pt-8 text-center text-sm"
        >
          <p>{copyright}</p>
        </ScrollAnimate>
      </div>
    </footer>
  )
}
