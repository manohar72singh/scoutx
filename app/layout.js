// app/layout.js — Root layout with shared SEO metadata and Search Console verification

import './globals.css';
import Script from 'next/script';
import LayoutUI from '@/components/LayoutUI';

export const metadata = {
  metadataBase: new URL('https://www.scoutxsecurity.com'),
  title: {
    default: 'ScoutX Protection Group | Security Guard & Housekeeping Services in Ghaziabad, NCR',
    template: '%s | ScoutX Protection Group',
  },
  description:
    'ScoutX Protection Group Pvt. Ltd. — PSARA-licensed security guard, housekeeping, and detective agency in Ghaziabad, Noida & Delhi NCR. Police-verified guards for residential, corporate & industrial security.',
  keywords: [
    'security guard services ghaziabad',
    'security agency noida',
    'private security company delhi ncr',
    'PSARA licensed security agency UP',
    'armed security guards gunman',
    'female security guard services',
    'security supervisor ghaziabad',
    'housekeeping services noida ghaziabad',
    'private detective services delhi ncr',
    'event security guards NCR',
    'industrial security ghaziabad',
    'bouncers for events NCR',
  ],
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'ScoutX Protection Group | Security Guard & Housekeeping Services in Ghaziabad NCR',
    description:
      'PSARA-licensed, police-verified security guards and facility management services for residential societies, corporate offices, factories, banks & events across Delhi NCR.',
    url: 'https://www.scoutxsecurity.com',
    siteName: 'ScoutX Protection Group',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'ScoutX Protection Group Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScoutX Protection Group | Top Security & Housekeeping Agency in NCR',
    description: 'Professional security guard and housekeeping services in Ghaziabad, Noida, and Delhi NCR.',
    images: ['/logo.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'YOUR_GOOGLE_VERIFICATION_CODE_HERE',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.scoutxsecurity.com' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <head>
        {/* Organization & WebSite JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'SecurityService',
                name: 'ScoutX Protection Group Pvt. Ltd.',
                description: 'PSARA-licensed private security guard, housekeeping, and detective agency.',
                url: 'https://www.scoutxsecurity.com',
                logo: 'https://www.scoutxsecurity.com/logo.png',
                image: 'https://www.scoutxsecurity.com/logo.png',
                telephone: ['+91-8682066666', '+91-7611865555'],
                email: 'scoutxsecurity@gmail.com',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Shop No 1, Ground Floor, H-39 KH No 1468, Govindpuram',
                  addressLocality: 'Ghaziabad',
                  addressRegion: 'Uttar Pradesh',
                  postalCode: '201013',
                  addressCountry: 'IN',
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: 28.6926,
                  longitude: 77.4388,
                },
                areaServed: [
                  'Ghaziabad',
                  'Noida',
                  'Greater Noida',
                  'Delhi',
                  'Gurgaon',
                  'Faridabad',
                  'Meerut',
                  'Hapur',
                  'Delhi NCR',
                ],
                priceRange: '₹₹',
                openingHoursSpecification: [
                  {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    opens: '00:00',
                    closes: '23:59',
                  },
                ],
                sameAs: ['https://www.scoutxsecurity.com'],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'ScoutX Protection Group',
                url: 'https://www.scoutxsecurity.com',
              },
            ]),
          }}
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <LayoutUI>{children}</LayoutUI>
      </body>
    </html>
  );
}
