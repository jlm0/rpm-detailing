'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useId, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { backdrop, duration, ease } from '@/lib/motion'
import type { Header, SiteSetting } from '@/payload-types'

import { CmsLink } from './cms-link'
import { ContactDetails, OpeningHours } from './contact'
import { useModal } from './use-modal'

interface ContactPopupProps {
  isOpen: boolean
  onClose: () => void
  popup: Header['contactPopup']
  business: SiteSetting['business']
}

function ContactDialog({ onClose, popup, business }: Omit<ContactPopupProps, 'isOpen'>) {
  const dialog = useRef<HTMLDivElement>(null)
  const titleId = useId()
  useModal(dialog, onClose)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6">
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        {...backdrop}
      />
      <motion.div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[90svh] w-full max-w-4xl overflow-y-auto rounded-xl bg-brandDark bg-grain text-white/75 shadow-2xl ring-1 ring-white/10"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: duration.base, ease: ease.enter },
        }}
        exit={{
          opacity: 0,
          y: 8,
          scale: 0.98,
          transition: { duration: duration.quick, ease: ease.exit },
        }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-brandDark px-6 py-5 sm:px-8">
          <h2 id={titleId} className="text-2xl font-bold text-white sm:text-3xl">
            {popup.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 rounded-md p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={popup.closeLabel}
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="grid gap-10 px-6 py-8 sm:px-8 md:grid-cols-3 md:gap-8">
          <div>
            <h3 className="mb-5 font-sans text-xs font-semibold tracking-[0.2em] text-white/60 uppercase [font-stretch:100%]">
              {popup.contactHeading}
            </h3>
            <ContactDetails business={business} />
          </div>

          <div>
            <h3 className="mb-5 font-sans text-xs font-semibold tracking-[0.2em] text-white/60 uppercase [font-stretch:100%]">
              {popup.hoursHeading}
            </h3>
            <OpeningHours hours={business.hours} />
          </div>

          <div className="rounded-lg bg-white/[0.04] p-5 ring-1 ring-white/10">
            <h3 className="mb-3 text-lg font-bold text-white">{popup.ctaHeading}</h3>
            <p className="mb-5 text-sm leading-relaxed">{popup.ctaText}</p>
            <Button asChild variant="brand" size="lg" className="w-full">
              <CmsLink url={popup.ctaButton.url} onClick={onClose}>
                {popup.ctaButton.label}
              </CmsLink>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ContactPopup({ isOpen, ...props }: ContactPopupProps) {
  return <AnimatePresence>{isOpen && <ContactDialog {...props} />}</AnimatePresence>
}
