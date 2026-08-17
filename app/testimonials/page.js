// app/testimonials/page.js

import Link from 'next/link';
import TestimonialsClientPage from './TestimonialsClientPage';

export const metadata = {
  title: 'Client Reviews & Ratings | ScoutX Protection Group',
  description:
    'Read verified client reviews and ratings for ScoutX Protection Group\'s security guard services. Trusted by 100+ residential societies, offices & factories across Ghaziabad, Noida & Delhi NCR.',
  alternates: { canonical: 'https://scoutxsecurity.com/testimonials' },
  openGraph: {
    url: 'https://scoutxsecurity.com/testimonials',
    title: 'ScoutX Security Client Reviews & Ratings',
    description: 'See verified reviews and ratings from our residential, corporate, and industrial clients in NCR.',
  }
};

export default function TestimonialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'ScoutX Protection Group Pvt. Ltd.',
              url: 'https://scoutxsecurity.com',
              telephone: '+91-8682066666',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Shop No 1, Ground Floor, H-39 KH No 1468, Govindpuram',
                addressLocality: 'Ghaziabad',
                addressRegion: 'Uttar Pradesh',
                postalCode: '201013',
                addressCountry: 'IN',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '128',
                bestRating: '5',
                worstRating: '1',
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
                  name: 'Testimonials',
                  item: 'https://scoutxsecurity.com/testimonials',
                },
              ],
            },
          ]),
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="section-label">Client Feedback &amp; 4.9★ Rating</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase text-white mb-4">
            What Our <span className="text-gradient-silver">Clients Say</span>
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-lg max-w-2xl mx-auto mt-6">
            Real feedback from residential societies, corporate offices, and event organisers across Delhi NCR.
          </p>
        </div>
      </section>

      {/* Testimonials (client-side for API fetch) */}
      <TestimonialsClientPage />

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #1E4D8C, #2E6FBF)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl font-bold uppercase text-white mb-4">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-[rgba(255,255,255,0.8)] mb-6">Join 100+ businesses and societies that trust ScoutX for their security.</p>
          <Link href="/contact#quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1E4D8C] font-heading font-bold text-base uppercase tracking-wider rounded-md hover:bg-[#F5F5F5] transition-all hover:-translate-y-1">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
