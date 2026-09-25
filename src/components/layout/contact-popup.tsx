'use client'

import { Mail, MapPin, Phone, X } from 'lucide-react'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import type { Header, SiteSetting } from '@/payload-types'

import { CmsLink } from './cms-link'
import { OpeningHours, telHref } from './contact'

interface ContactPopupProps {
  isOpen: boolean
  onClose: () => void
  popup: Header['contactPopup']
  business: SiteSetting['business']
}

export default function ContactPopup({ isOpen, onClose, popup, business }: ContactPopupProps) {
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
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="max-h-[90vh] w-full max-w-4xl transform overflow-y-auto rounded-lg bg-brandDark text-neutral-300 shadow-xl transition-all duration-200">
          <div className="sticky top-0 flex items-center justify-between border-b border-neutral-700 bg-brandDark p-6">
            <h2 className="text-2xl font-bold text-white">{popup.title}</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={popup.closeLabel}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">{popup.contactHeading}</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-brandRed" />
                  <a href={telHref(business.phone)} className="hover:underline">
                    {business.phone}
                  </a>
                </li>
                <li className="flex items-center space-x-2 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-brandRed" />
                  <a href={`mailto:${business.email}`} className="break-all hover:underline">
                    {business.email}
                  </a>
                </li>
                <li className="flex items-start space-x-2 transition-colors hover:text-white">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brandRed" />
                  <span>{business.address}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">{popup.hoursHeading}</h3>
              <OpeningHours hours={business.hours} />
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">{popup.ctaHeading}</h3>
              <p className="mb-4 text-sm">{popup.ctaText}</p>
              <CmsLink url={popup.ctaButton.url} onClick={onClose}>
                <Button className="w-full bg-brandRed text-white hover:bg-red-700">
                  {popup.ctaButton.label}
                </Button>
              </CmsLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
