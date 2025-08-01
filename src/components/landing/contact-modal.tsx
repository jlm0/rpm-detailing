"use client";

import { X, Phone, MapPin, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone?: string;
  email?: string;
  address?: string;
  hours?: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  ctaHeading?: string;
  ctaText?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  uiLabels?: {
    getInTouch?: string;
    contactInfo?: string;
    openingHours?: string;
    closeModal?: string;
  };
}

const ContactModal = ({
  isOpen,
  onClose,
  phone = "(425) 345-3564",
  email = "support@rpm-detailing.com",
  address = "Boise, ID, USA",
  hours = {
    weekdays: "Mon - Fri: 8.00 am - 6.00 pm",
    saturday: "Saturday: 9.00 am - 4.00 pm",
    sunday: "Sunday: Closed",
  },
  ctaHeading = "Need Help?",
  ctaText = "Ready for a showroom shine? Book your car detailing appointment today!",
  ctaButtonText = "Book Now",
  ctaButtonLink = "/booking",
  uiLabels = {
    getInTouch: "Get In Touch",
    contactInfo: "Contact Info",
    openingHours: "Opening Hours",
    closeModal: "Close modal",
  },
}: ContactModalProps) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-200"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-brandDark text-neutral-300 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-200">
          {/* Header */}
          <div className="sticky top-0 bg-brandDark border-b border-neutral-700 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">{uiLabels.getInTouch}</h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              aria-label={uiLabels.closeModal}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">{uiLabels.contactInfo}</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 text-brandRed flex-shrink-0" />
                  <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="hover:underline">
                    {phone}
                  </a>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 text-brandRed flex-shrink-0" />
                  <a href={`mailto:${email}`} className="hover:underline break-all">
                    {email}
                  </a>
                </li>
                <li className="flex items-start space-x-2 hover:text-white transition-colors">
                  <MapPin className="h-4 w-4 text-brandRed flex-shrink-0 mt-0.5" />
                  <span>{address}</span>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">{uiLabels.openingHours}</h3>
              <ul className="space-y-2 text-sm">
                <li dangerouslySetInnerHTML={{ __html: hours.weekdays.replace(/: (.+)/, ': <span class="text-white">$1</span>') }} />
                <li dangerouslySetInnerHTML={{ __html: hours.saturday.replace(/: (.+)/, ': <span class="text-white">$1</span>') }} />
                <li dangerouslySetInnerHTML={{ __html: hours.sunday.replace(/: (.+)/, ': <span class="text-white">$1</span>') }} />
              </ul>
            </div>

            {/* Need Help */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">{ctaHeading}</h3>
              <p className="text-sm mb-4">{ctaText}</p>
              <Link href={ctaButtonLink} onClick={onClose}>
                <Button className="bg-brandRed hover:bg-red-700 text-white w-full">
                  {ctaButtonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactModal;