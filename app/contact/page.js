// app/contact/page.js

import ContactClient from '@/components/ContactClient';
import FAQSection from '@/components/FAQSection';

export const metadata = {
  title: 'Contact ScoutX | Request a Free Security Guard Quote in NCR',
  description:
    'Get in touch with ScoutX Protection Group. Request a customized, PSARA-compliant security guard quote for your residential society, corporate office, or factory in Ghaziabad, Noida & Delhi NCR.',
  alternates: { canonical: 'https://scoutxsecurity.com/contact' },
  openGraph: {
    url: 'https://scoutxsecurity.com/contact',
    title: 'Contact ScoutX | Request a Free Security Quote',
    description: 'Get a customized security deployment plan and transparent pricing within 24 hours.',
    siteName: 'ScoutX Protection Group',
    type: 'website',
  }
};

const contactFaqs = [
  {
    q: 'How fast can I expect a response and site assessment after submitting a quote request?',
    a: 'Our security directors review quote requests immediately and contact you within 2 to 4 hours. On-site physical security audits across Ghaziabad and Noida can be arranged within 24 hours.',
  },
  {
    q: 'Are security site visits and deployment blueprints free of cost?',
    a: 'Yes, 100% free and no obligation. We walk your premises, identify vulnerability points, and propose an optimal guard count before you commit.',
  },
  {
    q: 'Can we contact ScoutX directly for emergency or temporary event guard deployment?',
    a: 'Yes. For immediate assistance or urgent short-term event security, call Director Ashok Choudhary at +91 86820 66666 or message us directly on WhatsApp.',
  },
];

export default function ContactPage() {
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
              description: 'Request a free security guard quote or contact our operational directors.',
              url: 'https://scoutxsecurity.com/contact',
              mainEntity: {
                '@type': 'LocalBusiness',
                name: 'ScoutX Protection Group Pvt. Ltd.',
                url: 'https://scoutxsecurity.com',
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
                  name: 'Contact',
                  item: 'https://scoutxsecurity.com/contact',
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: contactFaqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            },
          ]),
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="section-label">Get in Touch</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase text-white mb-4">
            Contact &amp; <span className="text-gradient-steel">Get a Quote</span>
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-lg max-w-2xl mx-auto mt-6">
            Reach us via phone, WhatsApp, or email — or fill in the quote form below and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Interactive Contact & Quote Form Component */}
      <ContactClient />

      {/* 3 FAQs Section */}
      <FAQSection
        title="Frequently Asked Questions: Quotations & Support"
        subtitle="ESTIMATES & RESPONSE TIMES"
        description="Clear details on our survey process, pricing turnaround, and immediate contact channels."
        faqs={contactFaqs}
      />
    </>
  );
}
