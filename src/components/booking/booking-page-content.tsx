"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import ScrollAnimate from "@/components/motion/scroll-animate";
import { Button } from "@/components/ui/button";

import CalEmbed from "./cal-embed";

interface BookingPageContentProps {
  calLink: string;
  eventSlug?: string;
  companyName: string;
  phone?: string;
  email?: string;
}

export default function BookingPageContent({ 
  calLink, 
  eventSlug, 
  companyName,
  phone,
  email 
}: BookingPageContentProps) {
  return (
    <div className="min-h-screen bg-brandLightGray">
      {/* Header */}
      <header className="bg-brandDark text-white py-4">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-brandRed">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <ScrollAnimate variantName="fadeInDown" className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brandDark mb-4">
            Book Your Detailing Service
          </h1>
          <p className="text-brandMediumGray max-w-2xl mx-auto">
            Schedule your professional car detailing appointment with {companyName}. 
            Choose a convenient time and we&apos;ll take care of the rest.
          </p>
        </ScrollAnimate>

        <ScrollAnimate 
          variantName="fadeInUp" 
          delay={0.2}
          className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl p-4 md:p-8"
        >
          <CalEmbed calLink={calLink} eventSlug={eventSlug} />
        </ScrollAnimate>

        {/* Contact Information */}
        <ScrollAnimate 
          variantName="fadeInUp" 
          delay={0.4}
          className="text-center mt-8 space-y-2"
        >
          <p className="text-brandMediumGray">
            Having trouble booking? Contact us directly:
          </p>
          {phone && (
            <p className="text-brandDark font-semibold">
              Phone: <a href={`tel:${phone}`} className="text-brandRed hover:underline">{phone}</a>
            </p>
          )}
          {email && (
            <p className="text-brandDark font-semibold">
              Email: <a href={`mailto:${email}`} className="text-brandRed hover:underline">{email}</a>
            </p>
          )}
        </ScrollAnimate>
      </main>
    </div>
  );
}