// app/layout.js — Root layout with shared SEO metadata and Search Console verification

import './globals.css';
import Script from 'next/script';
import LayoutUI from '@/components/LayoutUI';

export const metadata = {
  metadataBase: new URL('https://scoutxsecurity.com'),
  title: {
    default: 'ScoutX Protection Group | Security Services in Ghaziabad NCR',
    template: '%s | ScoutX Protection Group',
  },
  description:
    'PSARA-licensed security guard, housekeeping & detective agency in Ghaziabad, Noida & Delhi NCR. Police-verified guards for societies, offices & factories.',
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
    title: 'ScoutX Protection Group | Security Guard & Housekeeping Services',
    description:
      'PSARA-licensed, police-verified security guards and housekeeping services for residential, corporate & industrial sites across Ghaziabad & Delhi NCR.',
    url: 'https://scoutxsecurity.com',
    siteName: 'ScoutX Protection Group',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://scoutxsecurity.com/logo.png',
        width: 800,
        height: 600,
        alt: 'ScoutX Protection Group Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScoutX Protection Group | Top Security Agency in NCR',
    description: 'Professional security guard and housekeeping services in Ghaziabad, Noida, and Delhi NCR.',
    images: ['https://scoutxsecurity.com/logo.png'],
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  robots: { index: true, follow: true },
  alternates: { canonical: './' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <head>
        {/* Geo Meta Tags for Local SEO */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Ghaziabad, Noida, Delhi NCR" />
        <meta name="geo.position" content="28.6926;77.4388" />
        <meta name="ICBM" content="28.6926, 77.4388" />

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
                url: 'https://scoutxsecurity.com',
                logo: 'https://scoutxsecurity.com/logo.png',
                image: 'https://scoutxsecurity.com/logo.png',
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
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  reviewCount: '185',
                  bestRating: '5',
                  worstRating: '1',
                },
                priceRange: '₹₹',
                openingHoursSpecification: [
                  {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    opens: '00:00',
                    closes: '23:59',
                  },
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'ScoutX Protection Group',
                url: 'https://scoutxsecurity.com',
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
