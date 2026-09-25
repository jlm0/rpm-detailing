'use client'

import { Mail, MapPin, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  phone?: string
  email?: string
  address?: string
  hours?: {
    weekdays: string
    saturday: string
    sunday: string
  }
  ctaHeading?: string
  ctaText?: string
  ctaButtonText?: string
  ctaButtonLink?: string
  uiLabels?: {
    getInTouch?: string
    contactInfo?: string
    openingHours?: string
    closeModal?: string
  }
}

const ContactModal = ({
  isOpen,
  onClose,
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
  uiLabels = {
    getInTouch: 'Get In Touch',
    contactInfo: 'Contact Info',
    openingHours: 'Opening Hours',
    closeModal: 'Close modal',
  },
}: ContactModalProps) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="max-h-[90vh] w-full max-w-4xl transform overflow-y-auto rounded-lg bg-brandDark text-neutral-300 shadow-xl transition-all duration-200">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between border-b border-neutral-700 bg-brandDark p-6">
            <h2 className="text-2xl font-bold text-white">{uiLabels.getInTouch}</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={uiLabels.closeModal}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="grid gap-8 p-6 md:grid-cols-3">
            {/* Contact Info */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">{uiLabels.contactInfo}</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-brandRed" />
                  <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="hover:underline">
                    {phone}
                  </a>
                </li>
                <li className="flex items-center space-x-2 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-brandRed" />
                  <a href={`mailto:${email}`} className="break-all hover:underline">
                    {email}
                  </a>
                </li>
                <li className="flex items-start space-x-2 transition-colors hover:text-white">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brandRed" />
                  <span>{address}</span>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">{uiLabels.openingHours}</h3>
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

            {/* Need Help */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">{ctaHeading}</h3>
              <p className="mb-4 text-sm">{ctaText}</p>
              <Link href={ctaButtonLink} onClick={onClose}>
                <Button className="w-full bg-brandRed text-white hover:bg-red-700">
                  {ctaButtonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactModal
