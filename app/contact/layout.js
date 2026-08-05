// app/contact/layout.js

export const metadata = {
  title: 'Contact Us | Get a Free Security Quote',
  description: 'Contact ScoutX Protection Group for PSARA-licensed security guards in Ghaziabad and NCR. Request a free quote for residential, corporate, or event security today.',
  alternates: { canonical: 'https://scoutxsecurity.com/contact' },
  openGraph: {
    title: 'Contact ScoutX Protection Group | Get a Quote',
    description: 'Looking for reliable security guards in NCR? Contact us today for a free assessment and quote.',
    url: 'https://scoutxsecurity.com/contact',
  },
};

export default function ContactLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'ContactPage',
              name: 'Contact ScoutX Protection Group',
              description: 'Request a free security quote or contact our security management team in Ghaziabad & Delhi NCR.',
              url: 'https://scoutxsecurity.com/contact',
              mainEntity: {
                '@type': 'SecurityService',
                name: 'ScoutX Protection Group Pvt. Ltd.',
                telephone: '+91-8682066666',
                email: 'scoutxsecurity@gmail.com',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Shop No 1, Ground Floor, H-39 KH No 1468, Govindpuram',
                  addressLocality: 'Ghaziabad',
                  addressRegion: 'Uttar Pradesh',
                  postalCode: '201013',
                  addressCountry: 'IN',
                },
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://scoutxsecurity.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Contact Us',
                  item: 'https://scoutxsecurity.com/contact',
                },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
