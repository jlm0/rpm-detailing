"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import ContactModal from "@/components/landing/contact-modal";

interface NavigationItem {
  label: string;
  link: string;
  order?: number;
}

interface HeaderCTA {
  text: string;
  link: string;
  show: boolean;
}

interface LandingHeaderProps {
  logo?: string;
  companyName?: string;
  navigation?: NavigationItem[];
  headerCTA?: HeaderCTA;
}

const LandingHeader = ({
  logo = "/placeholder.svg",
  companyName = "RPM Detailing",
  navigation = [
    { label: "Home", link: "/" },
    { label: "Services", link: "/services" },
    { label: "About", link: "/about" },
    { label: "Testimonials", link: "#testimonials" },
    { label: "Contact", link: "#contact" },
  ],
  headerCTA = { text: "Book Now", link: "/booking", show: true },
}: LandingHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    // Check if there's a hash in the URL after navigation
    if (pathname === '/' && window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [pathname]);

  const handleNavClick = (item: NavigationItem) => {
    if (item.link.startsWith('#')) {
      if (pathname === '/') {
        // We're on the home page, just scroll
        const id = item.link.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // We're on another page, navigate then scroll
        router.push(`/${item.link}`);
      }
    }
  };

  const getNavLink = (item: NavigationItem) => {
    // For non-anchor links, return as is
    if (!item.link.startsWith('#')) {
      return item.link;
    }
    // For anchor links on the home page, return as is
    if (pathname === '/') {
      return item.link;
    }
    // For anchor links on other pages, prepend with /
    return `/${item.link}`;
  };

  return (
    <header className="bg-brandDark text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold">
          <div className="relative h-10 sm:h-12 w-24 sm:w-32 md:w-36">
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
        <nav className="hidden md:flex items-center space-x-6 md:space-x-8">
          {navigation && navigation.length > 0 && navigation.map((item) => (
            item.label === "Contact" ? (
              <button
                key={item.label}
                onClick={() => setIsContactModalOpen(true)}
                className="hover:text-brandRed transition-colors">
                {item.label}
              </button>
            ) : item.link.startsWith('#') ? (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="hover:text-brandRed transition-colors">
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                href={getNavLink(item)}
                className="hover:text-brandRed transition-colors">
                {item.label}
              </Link>
            )
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          {headerCTA.show && (
            <Link href={headerCTA.link}>
              <Button className="bg-brandRed hover:bg-red-700 text-white hidden sm:inline-flex">
                {headerCTA.text}
              </Button>
            </Link>
          )}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-64 bg-brandDark shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-xl font-semibold text-white">Menu</span>
              <button
                onClick={closeMobileMenu}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            
            <nav className="flex flex-col p-4 space-y-2">
              {navigation && navigation.map((item) => (
                item.label === "Contact" ? (
                  <button
                    key={item.label}
                    onClick={() => {
                      closeMobileMenu();
                      setIsContactModalOpen(true);
                    }}
                    className="text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ) : item.link.startsWith('#') ? (
                  <button
                    key={item.label}
                    onClick={() => {
                      closeMobileMenu();
                      handleNavClick(item);
                    }}
                    className="text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-colors text-left w-full"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={getNavLink(item)}
                    onClick={closeMobileMenu}
                    className="text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              ))}
              
              {headerCTA.show && (
                <Link
                  href={headerCTA.link}
                  onClick={closeMobileMenu}
                  className="mt-4"
                >
                  <Button className="w-full bg-brandRed hover:bg-red-700 text-white">
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
        onClose={() => setIsContactModalOpen(false)}
      />
    </header>
  );
};

export default LandingHeader;
