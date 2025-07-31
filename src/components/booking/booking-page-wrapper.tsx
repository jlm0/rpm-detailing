import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getGlobalSettings } from '@/lib/payload';

import BookingPageContent from './booking-page-content';

export default async function BookingPageWrapper() {
  const siteSettings = await getGlobalSettings('site-settings') || {};
  
  const calcomConfig = siteSettings.calcom || {};
  
  // If Cal.com is not enabled or configured, show a fallback
  if (!calcomConfig.enabled || !calcomConfig.link) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-brandLightGray p-4 text-center">
        <h1 className="text-4xl font-bold text-brandDark mb-4">
          {calcomConfig.fallbackTitle || "Book Your Detailing Service"}
        </h1>
        <p className="text-brandMediumGray mb-8">
          {calcomConfig.fallbackMessage || `Online booking is currently unavailable. Please contact us directly at ${siteSettings.phone || "(425) 345-3564"} to schedule your appointment.`}
        </p>
        <Link href="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    );
  }

  return <BookingPageContent 
    calLink={calcomConfig.link}
    eventSlug={calcomConfig.eventSlug || undefined}
    companyName={siteSettings.companyName || "RPM Detailing"}
    phone={siteSettings.phone}
    email={siteSettings.email}
  />;
}