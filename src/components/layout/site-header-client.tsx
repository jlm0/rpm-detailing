'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import type { Header, SiteSetting } from '@/payload-types'

import { CmsLink } from './cms-link'
import ContactPopup from './contact-popup'
import { useModal } from './use-modal'

type NavItem = NonNullable<Header['navItems']>[number]

interface SiteHeaderClientProps {
  header: Header
  business: SiteSetting['business']
  logo: { url: string; alt: string } | null
}

const ease = [0.16, 1, 0.3, 1] as const

const desktopItemClass =
  'relative py-2 text-sm font-medium text-white/70 transition-colors hover:text-white aria-[current=page]:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brandRed after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 aria-[current=page]:after:scale-x-100'

const mobileItemClass =
  'group flex w-full items-baseline gap-4 border-b border-white/10 py-4 text-left font-display text-2xl font-bold tracking-tight text-white/85 [font-stretch:112%] transition-colors hover:text-white aria-[current=page]:text-brandRed'

interface MobileMenuProps {
  header: Header
  renderNavItem: (item: NavItem, className: string, index: number) => ReactNode
  cta: Header['cta'] | undefined
  menuId: string
  onClose: () => void
}

function MobileMenu({ header, renderNavItem, cta, menuId, onClose }: MobileMenuProps) {
  const panel = useRef<HTMLDivElement>(null)
  useModal(panel, onClose)

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        ref={panel}
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label={header.mobileMenu.title}
        className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col bg-brandDark bg-grain shadow-2xl ring-1 ring-white/10"
        initial={{ x: '100%' }}
        animate={{ x: 0, transition: { duration: 0.5, ease } }}
        exit={{ x: '100%', transition: { duration: 0.3, ease: 'easeIn' } }}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <span className="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
            {header.mobileMenu.title}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 rounded-md p-2 text-white transition-colors hover:bg-white/10"
            aria-label={header.mobileMenu.closeLabel}
          >
            <X className="size-6" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-6 pt-4 pb-8">
          {header.navItems.map((item, index) => renderNavItem(item, mobileItemClass, index))}

          {cta && (
            <Button asChild variant="brand" size="lg" className="mt-auto w-full">
              <CmsLink url={cta.url} onClick={onClose}>
                {cta.label}
              </CmsLink>
            </Button>
          )}
        </nav>
      </motion.div>
    </div>
  )
}

export default function SiteHeaderClient({ header, business, logo }: SiteHeaderClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const menuId = useId()
  const cta = header.showCta ? header.cta : undefined

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const id = window.location.hash.substring(1)
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [pathname])

  const goToSection = (hash: string) => {
    if (pathname === '/') {
      document
        .getElementById(hash.substring(1))
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      router.push(`/${hash}`)
    }
  }

  const renderNavItem = (item: NavItem, className: string, index?: number) => {
    const key = item.id ?? item.label
    const inMenu = index !== undefined
    const label = inMenu ? (
      <>
        <span
          aria-hidden
          className="font-sans text-xs font-medium tracking-normal text-white/40 tabular-nums"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        {item.label}
      </>
    ) : (
      item.label
    )
    const afterSelect = () => {
      if (inMenu) closeMobileMenu()
    }

    if (item.type === 'contact') {
      return (
        <button
          key={key}
          type="button"
          onClick={() => {
            afterSelect()
            setIsContactPopupOpen(true)
          }}
          className={className}
        >
          {label}
        </button>
      )
    }

    const { url } = item
    if (!url) return null

    if (url.startsWith('#')) {
      return (
        <button
          key={key}
          type="button"
          onClick={() => {
            afterSelect()
            goToSection(url)
          }}
          className={className}
        >
          {label}
        </button>
      )
    }

    return (
      <CmsLink
        key={key}
        url={url}
        onClick={afterSelect}
        className={className}
        aria-current={url === pathname ? 'page' : undefined}
      >
        {label}
      </CmsLink>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-brandDark text-white">
      <div className="container mx-auto flex h-20 items-center justify-between gap-6 px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 rounded-sm">
          {logo && (
            <div className="relative h-10 w-24 sm:h-12 sm:w-32 md:w-36">
              <Image
                src={logo.url}
                alt={logo.alt}
                fill
                className="object-contain object-left"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 144px"
                priority
              />
            </div>
          )}
        </Link>
        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {header.navItems.map((item) => renderNavItem(item, desktopItemClass))}
        </nav>
        <div className="flex items-center gap-4">
          {cta && (
            <Button asChild variant="brand" className="hidden sm:inline-flex">
              <CmsLink url={cta.url}>{cta.label}</CmsLink>
            </Button>
          )}
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen((open) => !open)
            }}
            className="-mr-2 rounded-md p-2 transition-colors hover:bg-white/10 md:hidden"
            aria-label={header.mobileMenu.openLabel}
            aria-expanded={isMobileMenuOpen}
            aria-controls={isMobileMenuOpen ? menuId : undefined}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            header={header}
            renderNavItem={renderNavItem}
            cta={cta}
            menuId={menuId}
            onClose={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      <ContactPopup
        isOpen={isContactPopupOpen}
        onClose={() => {
          setIsContactPopupOpen(false)
        }}
        popup={header.contactPopup}
        business={business}
      />
    </header>
  )
}
