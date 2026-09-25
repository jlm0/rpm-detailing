'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import ContactModal from '@/components/landing/contact-modal'
import { Button } from '@/components/ui/button'

interface NavigationItem {
  label: string
  link: string
  order?: number
}

interface HeaderCTA {
  text: string
  link: string
  show: boolean
}

interface ContactInfo {
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
}

interface UILabels {
  modalLabels?: {
    getInTouch?: string
    contactInfo?: string
    openingHours?: string
  }
  navigationLabels?: {
    menu?: string
    closeMobileMenu?: string
    toggleMobileMenu?: string
  }
  accessibility?: {
    closeModal?: string
  }
}

interface LandingHeaderProps {
  logo?: string
  companyName?: string
  navigation?: NavigationItem[]
  headerCTA?: HeaderCTA
  contactInfo?: ContactInfo
  uiLabels?: UILabels
}

const LandingHeader = ({
  logo = '/placeholder.svg',
  companyName = 'RPM Detailing',
  navigation = [
    { label: 'Home', link: '/' },
    { label: 'Services', link: '/services' },
    { label: 'About', link: '/about' },
    { label: 'Testimonials', link: '#testimonials' },
    { label: 'Contact', link: '#contact' },
  ],
  headerCTA = { text: 'Book Now', link: '/booking', show: true },
  contactInfo,
  uiLabels,
}: LandingHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    // Check if there's a hash in the URL after navigation
    if (pathname === '/' && window.location.hash) {
      const id = window.location.hash.substring(1)
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [pathname])

  const handleNavClick = (item: NavigationItem) => {
    if (item.link.startsWith('#')) {
      if (pathname === '/') {
        // We're on the home page, just scroll
        const id = item.link.substring(1)
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        // We're on another page, navigate then scroll
        router.push(`/${item.link}`)
      }
    }
  }

  const getNavLink = (item: NavigationItem) => {
    // For non-anchor links, return as is
    if (!item.link.startsWith('#')) {
      return item.link
    }
    // For anchor links on the home page, return as is
    if (pathname === '/') {
      return item.link
    }
    // For anchor links on other pages, prepend with /
    return `/${item.link}`
  }

  return (
    <header className="sticky top-0 z-50 bg-brandDark text-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <div className="relative h-10 w-24 sm:h-12 sm:w-32 md:w-36">
            <Image
              src={logo}
              alt={`${companyName} Logo`}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 144px"
              priority
            />
          </div>
        </Link>
        <nav className="hidden items-center space-x-6 md:flex md:space-x-8">
          {navigation.length > 0 &&
            navigation.map((item) =>
              item.label === 'Contact' ? (
                <button
                  key={item.label}
                  onClick={() => {
                    setIsContactModalOpen(true)
                  }}
                  className="transition-colors hover:text-brandRed"
                >
                  {item.label}
                </button>
              ) : item.link.startsWith('#') ? (
                <button
                  key={item.label}
                  onClick={() => {
                    handleNavClick(item)
                  }}
                  className="transition-colors hover:text-brandRed"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={getNavLink(item)}
                  className="transition-colors hover:text-brandRed"
                >
                  {item.label}
                </Link>
              ),
            )}
        </nav>
        <div className="flex items-center space-x-4">
          {headerCTA.show && (
            <Link href={headerCTA.link}>
              <Button className="hidden bg-brandRed text-white hover:bg-red-700 sm:inline-flex">
                {headerCTA.text}
              </Button>
            </Link>
          )}
          <button
            onClick={toggleMobileMenu}
            className="rounded-lg p-2 transition-colors hover:bg-white/10 md:hidden"
            aria-label={uiLabels?.navigationLabels?.toggleMobileMenu || 'Toggle mobile menu'}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            onClick={closeMobileMenu}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-64 transform bg-brandDark shadow-xl transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <span className="text-xl font-semibold text-white">
                {uiLabels?.navigationLabels?.menu || 'Menu'}
              </span>
              <button
                onClick={closeMobileMenu}
                className="rounded-lg p-2 transition-colors hover:bg-white/10"
                aria-label={uiLabels?.navigationLabels?.closeMobileMenu || 'Close mobile menu'}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <nav className="flex flex-col space-y-2 p-4">
              {navigation.map((item) =>
                item.label === 'Contact' ? (
                  <button
                    key={item.label}
                    onClick={() => {
                      closeMobileMenu()
                      setIsContactModalOpen(true)
                    }}
                    className="rounded-lg px-4 py-3 text-left text-white transition-colors hover:bg-white/10"
                  >
                    {item.label}
                  </button>
                ) : item.link.startsWith('#') ? (
                  <button
                    key={item.label}
                    onClick={() => {
                      closeMobileMenu()
                      handleNavClick(item)
                    }}
                    className="w-full rounded-lg px-4 py-3 text-left text-white transition-colors hover:bg-white/10"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={getNavLink(item)}
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-3 text-white transition-colors hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ),
              )}

              {headerCTA.show && (
                <Link href={headerCTA.link} onClick={closeMobileMenu} className="mt-4">
                  <Button className="w-full bg-brandRed text-white hover:bg-red-700">
                    {headerCTA.text}
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false)
        }}
        phone={contactInfo?.phone}
        email={contactInfo?.email}
        address={contactInfo?.address}
        hours={contactInfo?.hours}
        ctaHeading={contactInfo?.ctaHeading}
        ctaText={contactInfo?.ctaText}
        ctaButtonText={contactInfo?.ctaButtonText}
        ctaButtonLink={contactInfo?.ctaButtonLink}
        uiLabels={{
          getInTouch: uiLabels?.modalLabels?.getInTouch,
          contactInfo: uiLabels?.modalLabels?.contactInfo,
          openingHours: uiLabels?.modalLabels?.openingHours,
          closeModal: uiLabels?.accessibility?.closeModal,
        }}
      />
    </header>
  )
}

export default LandingHeader
