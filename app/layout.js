// app/layout.js — Root layout with shared metadata

import './globals.css';
import LayoutUI from '@/components/LayoutUI';

export const metadata = {
  title: {
    default: 'ScoutX Protection Group | Security Guard Services in Ghaziabad, NCR',
    template: '%s | ScoutX Protection Group',
  },
  description:
    'ScoutX Protection Group Pvt. Ltd. — PSARA-licensed security guard services in Ghaziabad, Noida, Delhi NCR. Police-verified guards for residential, corporate, industrial & event security.',
  keywords: [
    'security guard services ghaziabad',
    'security agency noida',
    'private security company delhi ncr',
    'PSARA licensed security agency UP',
    'armed security guards',
    'event security services',
    'industrial security ghaziabad',
  ],
  openGraph: {
    title: 'ScoutX Protection Group | Security Guard Services in Ghaziabad NCR',
    description:
      'PSARA-licensed, police-verified security guards for residential societies, offices, factories, banks, hospitals, and events across Delhi NCR.',
    url: 'https://www.scoutxprotection.com',
    siteName: 'ScoutX Protection Group',
    locale: 'en_IN',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.scoutxprotection.com' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <head>
        {/* LocalBusiness structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'ScoutX Protection Group Pvt. Ltd.',
              description: 'PSARA-licensed private security guard services',
              url: 'https://www.scoutxprotection.com',
              telephone: ['+91-8682066666', '+91-7611865555'],
              email: 'scoutxprotection@gmail.com',
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
              areaServed: ['Ghaziabad', 'Noida', 'Greater Noida', 'Delhi'],
              priceRange: '₹₹',
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <LayoutUI>{children}</LayoutUI>
      </body>
    </html>
  );
}
