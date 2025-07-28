import type { Metadata } from "next";
import "@/app/globals.css";
import { getGlobalSettings } from '@/lib/payload';

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getGlobalSettings('site-settings');
  
  const companyName = siteSettings?.companyName || "RPM Detailing";
  const description = siteSettings?.description || "Transform your vehicle with RPM Detailing's premium auto detailing services in Boise. Ceramic coating, paint correction, and full interior/exterior detailing.";
  const siteUrl = 'https://rpmdetailing.com';
  const title = `${companyName} | Premium Auto Detailing in Boise, ID`;
  const ogImage = siteSettings?.logo?.url || '/placeholder.svg';
  
  return {
    title,
    description,
    keywords: "auto detailing, car detailing, ceramic coating, paint correction, Boise, Idaho, RPM Detailing",
    authors: [{ name: companyName }],
    creator: companyName,
    publisher: companyName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: companyName,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${companyName} Logo`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#D9232D" />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
