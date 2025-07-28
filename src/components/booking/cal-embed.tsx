"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface CalEmbedProps {
  calLink: string;
  eventSlug?: string;
  config?: {
    name?: string;
    email?: string;
    notes?: string;
    guests?: string[];
    theme?: "light" | "dark" | "auto";
  };
}

export default function CalEmbed({ calLink, eventSlug, config }: CalEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        cal("ui", {
          theme: config?.theme || "light",
          cssVarsPerTheme: {
            light: {
              "cal-brand": "#d32f2f", // brandRed
              "cal-text": "#1f2937", // brandDark
              "cal-text-subtle": "#6b7280", // brandMediumGray
              "cal-bg": "#f3f4f6", // brandLightGray
              "cal-bg-subtle": "#ffffff",
              "cal-bg-muted": "#f9fafb",
              "cal-border": "#e5e7eb",
              "cal-border-subtle": "#f3f4f6",
            },
            dark: {
              "cal-brand": "#d32f2f", // brandRed
              "cal-text": "#ffffff",
              "cal-text-subtle": "#9ca3af",
              "cal-bg": "#1f2937",
              "cal-bg-subtle": "#111827",
              "cal-bg-muted": "#374151",
              "cal-border": "#4b5563",
              "cal-border-subtle": "#374151",
            },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing Cal.com:", error);
        setHasError(true);
        setIsLoading(false);
      }
    })();
  }, [config?.theme]);

  const calUrl = eventSlug ? `${calLink}/${eventSlug}` : calLink;

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    window.location.reload();
  };

  if (hasError) {
    return (
      <div className="w-full h-full min-h-[600px] flex items-center justify-center bg-brandLightGray rounded-lg">
        <div className="text-center max-w-md p-8">
          <h3 className="text-xl font-semibold text-brandDark mb-4">
            Unable to Load Booking Calendar
          </h3>
          <p className="text-brandMediumGray mb-6">
            We&apos;re having trouble loading the booking calendar. 
            Please try again or contact us directly to schedule your appointment.
          </p>
          <div className="space-y-4">
            <Button
              onClick={handleRetry}
              className="w-full bg-brandRed hover:bg-brandRed/90"
            >
              Try Again
            </Button>
            <div className="text-sm text-brandMediumGray">
              <p>Or call us directly:</p>
              <p className="font-semibold text-lg">(425) 345-3564</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[600px] relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-brandLightGray rounded-lg">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-brandMediumGray">Loading booking calendar...</p>
          </div>
        </div>
      )}
      <Cal
        calLink={calUrl}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{
          ...(config?.name && { name: config.name }),
          ...(config?.email && { email: config.email }),
          ...(config?.notes && { notes: config.notes }),
          ...(config?.guests && { guests: config.guests }),
          theme: config?.theme || "light",
        }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}