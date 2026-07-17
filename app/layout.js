// app/layout.js â€” Root layout with shared metadata

import './globals.css';
import LayoutUI from '@/components/LayoutUI';

export const metadata = {
  metadataBase: new URL('https://www.scoutxsecurity.com'),
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
    url: 'https://www.scoutxsecurity.com',
    siteName: 'ScoutX Protection Group',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/logo.jpeg',
        width: 800,
        height: 600,
        alt: 'ScoutX Protection Group Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScoutX Protection Group | Top Security Agency in NCR',
    description: 'Professional security guard services in Ghaziabad, Noida, and Delhi NCR.',
    images: ['/logo.jpeg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.scoutxsecurity.com' },
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
              url: 'https://www.scoutxsecurity.com',
              logo: 'https://www.scoutxsecurity.com/logo.jpeg',
              image: 'https://www.scoutxsecurity.com/logo.jpeg',
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
              areaServed: ['Ghaziabad', 'Noida', 'Greater Noida', 'Delhi'],
              priceRange: '₹₹',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '00:00',
                  closes: '23:59',
                },
              ],
              sameAs: [
                'https://www.scoutxsecurity.com',
              ]
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
