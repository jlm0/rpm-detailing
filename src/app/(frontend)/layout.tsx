import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "RPM Detailing | Premium Auto Detailing in Boise, ID",
  description: "Transform your vehicle with RPM Detailing's premium auto detailing services in Boise. Ceramic coating, paint correction, and full interior/exterior detailing.",
  keywords: "auto detailing, car detailing, ceramic coating, paint correction, Boise, Idaho, RPM Detailing",
  authors: [{ name: "RPM Detailing" }],
  creator: "RPM Detailing",
  publisher: "RPM Detailing",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rpmdetailing.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "RPM Detailing | Premium Auto Detailing in Boise, ID",
    description: "Transform your vehicle with RPM Detailing's premium auto detailing services in Boise. Ceramic coating, paint correction, and full interior/exterior detailing.",
    url: 'https://rpmdetailing.com',
    siteName: 'RPM Detailing',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/placeholder.svg',
        width: 1200,
        height: 630,
        alt: 'RPM Detailing Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "RPM Detailing | Premium Auto Detailing in Boise, ID",
    description: "Transform your vehicle with RPM Detailing's premium auto detailing services in Boise. Ceramic coating, paint correction, and full interior/exterior detailing.",
    images: ['/placeholder.svg'],
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
      <body>{children}</body>
    </html>
  );
}
