'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import type { Header, SiteSetting } from '@/payload-types'

import { CmsLink } from './cms-link'
import ContactPopup from './contact-popup'

type NavItem = NonNullable<Header['navItems']>[number]

interface SiteHeaderClientProps {
  header: Header
  business: SiteSetting['business']
  logo: { url: string; alt: string } | null
}

export default function SiteHeaderClient({ header, business, logo }: SiteHeaderClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const cta = header.showCta ? header.cta : undefined

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

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

  const renderNavItem = (item: NavItem, className: string, onSelect?: () => void) => {
    const key = item.id ?? item.label

    if (item.type === 'contact') {
      return (
        <button
          key={key}
          onClick={() => {
            onSelect?.()
            setIsContactPopupOpen(true)
          }}
          className={className}
        >
          {item.label}
        </button>
      )
    }

    const { url } = item
    if (!url) return null

    if (url.startsWith('#')) {
      return (
        <button
          key={key}
          onClick={() => {
            onSelect?.()
            goToSection(url)
          }}
          className={className}
        >
          {item.label}
        </button>
      )
    }

    return (
      <CmsLink key={key} url={url} onClick={onSelect} className={className}>
        {item.label}
      </CmsLink>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-brandDark text-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          {logo && (
            <div className="relative h-10 w-24 sm:h-12 sm:w-32 md:w-36">
              <Image
                src={logo.url}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 144px"
                priority
              />
            </div>
          )}
        </Link>
        <nav className="hidden items-center space-x-6 md:flex md:space-x-8">
          {header.navItems.map((item) =>
            renderNavItem(item, 'transition-colors hover:text-brandRed'),
          )}
        </nav>
        <div className="flex items-center space-x-4">
          {cta && (
            <CmsLink url={cta.url}>
              <Button className="hidden bg-brandRed text-white hover:bg-red-700 sm:inline-flex">
                {cta.label}
              </Button>
            </CmsLink>
          )}
          <button
            onClick={toggleMobileMenu}
            className="rounded-lg p-2 transition-colors hover:bg-white/10 md:hidden"
            aria-label={header.mobileMenu.openLabel}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            onClick={closeMobileMenu}
          />

          <div className="absolute top-0 right-0 h-full w-64 transform bg-brandDark shadow-xl transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <span className="text-xl font-semibold text-white">{header.mobileMenu.title}</span>
              <button
                onClick={closeMobileMenu}
                className="rounded-lg p-2 transition-colors hover:bg-white/10"
                aria-label={header.mobileMenu.closeLabel}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <nav className="flex flex-col space-y-2 p-4">
              {header.navItems.map((item) =>
                renderNavItem(
                  item,
                  'w-full rounded-lg px-4 py-3 text-left text-white transition-colors hover:bg-white/10',
                  closeMobileMenu,
                ),
              )}

              {cta && (
                <CmsLink url={cta.url} onClick={closeMobileMenu} className="mt-4">
                  <Button className="w-full bg-brandRed text-white hover:bg-red-700">
                    {cta.label}
                  </Button>
                </CmsLink>
              )}
            </nav>
          </div>
        </div>
      )}

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
