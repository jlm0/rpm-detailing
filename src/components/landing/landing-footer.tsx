'use client'

import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import ScrollAnimate from '@/components/motion/scroll-animate'
import { Button } from '@/components/ui/button'

interface FooterHours {
  weekdays: string
  saturday: string
  sunday: string
}

interface LandingFooterProps {
  logo?: string
  companyName?: string
  description?: string
  phone?: string
  email?: string
  address?: string
  hours?: FooterHours
  ctaHeading?: string
  ctaText?: string
  ctaButtonText?: string
  ctaButtonLink?: string
  copyright?: string
}

const LandingFooter = ({
  logo = '/placeholder.svg',
  companyName = 'RPM Detailing',
  description = "Your trusted partner for premium car detailing services. We restore and protect your vehicle's beauty with meticulous care.",
  phone = '(425) 345-3564',
  email = 'support@rpm-detailing.com',
  address = 'Boise, ID, USA',
  hours = {
    weekdays: 'Mon - Fri: 8.00 am - 6.00 pm',
    saturday: 'Saturday: 9.00 am - 4.00 pm',
    sunday: 'Sunday: Closed',
  },
  ctaHeading = 'Need Help?',
  ctaText = 'Ready for a showroom shine? Book your car detailing appointment today!',
  ctaButtonText = 'Book Now',
  ctaButtonLink = '/booking',
  copyright = `© ${new Date().getFullYear()} Carbonick. All Rights Reserved. Designed by v0.`,
}: LandingFooterProps) => {
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
                <div className="relative h-10 w-32">
                  <Image
                    src={logo}
                    alt={`${companyName} Logo`}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
              </Link>
              <p className="text-sm leading-relaxed">{description}</p>
            </div>
          </ScrollAnimate>
          <ScrollAnimate variantName="fadeInUp">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">Contact Info</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 text-brandRed" />
                  <span>{phone}</span>
                </li>
                <li className="flex items-center space-x-2 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 text-brandRed" />
                  <span>{email}</span>
                </li>
                <li className="flex items-center space-x-2 transition-colors hover:text-white">
                  <MapPin className="h-4 w-4 text-brandRed" />
                  <span>{address}</span>
                </li>
              </ul>
            </div>
          </ScrollAnimate>
          <ScrollAnimate variantName="fadeInUp">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">Opening Hours</h3>
              <ul className="space-y-2 text-sm">
                <li
                  dangerouslySetInnerHTML={{
                    __html: hours.weekdays.replace(
                      /: (.+)/,
                      ': <span class="text-white">$1</span>',
                    ),
                  }}
                />
                <li
                  dangerouslySetInnerHTML={{
                    __html: hours.saturday.replace(
                      /: (.+)/,
                      ': <span class="text-white">$1</span>',
                    ),
                  }}
                />
                <li
                  dangerouslySetInnerHTML={{
                    __html: hours.sunday.replace(/: (.+)/, ': <span class="text-white">$1</span>'),
                  }}
                />
              </ul>
            </div>
          </ScrollAnimate>
          <ScrollAnimate variantName="fadeInUp">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">{ctaHeading}</h3>
              <p className="mb-4 text-sm">{ctaText}</p>
              <Link href={ctaButtonLink}>
                <Button className="w-full bg-brandRed text-white hover:bg-red-700">
                  {ctaButtonText}
                </Button>
              </Link>
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

export default LandingFooter
