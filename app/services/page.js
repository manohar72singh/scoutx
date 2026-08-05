// app/services/page.js

import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import FadeIn from '@/components/FadeIn';

export const metadata = {
  title: 'Our Security & Facility Services | Armed Guards, Housekeeping & Detective in NCR',
  description:
    'ScoutX offers security guards, gunman, bouncers, female security guards, security supervisors, housekeeping services, and private detective investigations across Ghaziabad, Noida & Delhi NCR.',
  alternates: { canonical: 'https://scoutxsecurity.com/services' },
  openGraph: {
    url: 'https://scoutxsecurity.com/services',
    title: 'Security & Facility Services by ScoutX Protection Group',
    description: 'Comprehensive security and housekeeping solutions including armed guards, bouncers, facility cleaning, and private investigations in NCR.',
  }
};

const services = [
  {
    id: 'security-guard',
    icon: '🛡️',
    title: 'Security Guard',
    badge: 'Most Popular',
    desc: 'Our security personnel are trained in access control, visitor management, perimeter patrol, emergency response, and daily reporting. They are the backbone of day-to-day security at commercial and residential sites.',
    ideal: ['Residential Societies', 'Corporate Offices', 'Retail Outlets', 'Educational Institutions'],
  },
  {
    id: 'security-guard-gunman',
    icon: '🎯',
    title: 'Security Guard (Gunman)',
    badge: 'High-Risk Premises',
    desc: 'Our licensed armed security personnel are deployed at high-value locations including banks, jewellery stores, and cash-in-transit operations. All armed guards hold valid firearms licenses under the Arms Act.',
    ideal: ['Banks & Jewellery Stores', 'Cash-in-Transit', 'High-Value Warehouses', 'Diplomatic Establishments'],
  },
  {
    id: 'female-security-guard',
    icon: '👩‍✈️',
    title: 'Female Security Guard',
    badge: 'Women Safety',
    desc: "Trained female security personnel for frisking, access control at women-only areas, loss prevention in women's retail sections, and general security at hospitals, schools, and family-focused venues.",
    ideal: ['Hospitals & Clinics', 'Schools & Colleges', 'Women\'s Retail Sections', 'Metro & Transit Hubs'],
  },
  {
    id: 'female-security-officer',
    icon: '💼',
    title: 'Female Security Officer',
    badge: 'Supervision & VIP',
    desc: 'Experienced female officers designed for supervisory roles, sensitive corporate environments, and VIP escorting. They focus on compliance, guest management, and resolving complex security issues gracefully.',
    ideal: ['Corporate Headquarters', 'VIP Escort', 'High-End Retail', 'Event Management'],
  },
  {
    id: 'security-supervisor',
    icon: '📋',
    title: 'Security Supervisor',
    badge: 'Quality Control',
    desc: 'Dedicated on-site or mobile supervisors that manage guard deployment, conduct surprise night checks, and ensure 100% adherence to SLAs and protocols across all your facilities.',
    ideal: ['Multiple Facility Management', 'Large Campuses', 'Industrial Parks', 'Night Shift Monitoring'],
  },
  {
    id: 'pso',
    icon: '🕴️',
    title: 'PSO',
    badge: 'Executive Protection',
    desc: 'Personal Security Officers (PSOs) provide discreet close-protection to executives, entrepreneurs, celebrities, and VIP individuals, ensuring their safety during travel and public appearances.',
    ideal: ['High-Net-Worth Individuals', 'Celebrities', 'Corporate Executives', 'Politicians'],
  },
  {
    id: 'bouncer',
    icon: '💪',
    title: 'Bouncer',
    badge: 'Crowd Control',
    desc: 'Physically fit, professionally trained bouncers for crowd management, conflict de-escalation, and VIP area protection. Our bouncers are trained in verbal judo and conflict resolution.',
    ideal: ['Nightclubs & Pubs', 'High-Profile Events', 'Concert Venues', 'Private VIP Functions'],
  },
  {
    id: 'housekeeping-services',
    icon: '🧹',
    title: 'Housekeeping Services',
    badge: 'Facility Cleaning',
    desc: 'Professional housekeeping and sanitation staff for corporate offices, residential societies, hospitals, and commercial sites. Comprehensive facility maintenance and hygiene management.',
    ideal: ['Corporate Offices', 'Residential Societies', 'Hospitals & Clinics', 'Shopping Malls'],
  },
  {
    id: 'detective-services',
    icon: '🕵️',
    title: 'Detective Services',
    badge: 'Confidential Investigation',
    desc: 'Discreet background verification, corporate intelligence, asset tracing, and surveillance services handled by experienced private investigators with utmost confidentiality.',
    ideal: ['Corporate Background Checks', 'Pre/Post-Matrimonial Checks', 'Fraud Investigation', 'Surveillance'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
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
                  name: 'Services',
                  item: 'https://scoutxsecurity.com/services',
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Security & Facility Management Services',
              url: 'https://scoutxsecurity.com/services',
              itemListElement: services.map((s, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: s.title,
                url: `https://scoutxsecurity.com/services/${s.id}`,
              })),
            },
          ]),
        }}
      />
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="section-label">What We Offer</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase text-white mb-4">
            Our <span className="text-gradient-steel">Security Services</span>
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-lg max-w-2xl mx-auto mt-6">
            Six specialised service lines, each staffed by guards trained specifically for that environment. One agency, every requirement.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <FadeIn key={svc.id} delay={idx * 0.1} direction="up" className="h-full">
                <ServiceCard
                  icon={svc.icon}
                  title={svc.title}
                  badge={svc.badge}
                  link={`/services/${svc.id}`}
                  linkText="View Details"
                >
                  <p>{svc.desc}</p>
                  <div>
                    <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-[#C0C0C0] mb-3 mt-6">
                      Ideal For
                    </h3>
                    <ul className="space-y-2">
                      {svc.ideal.map((use) => (
                        <li key={use} className="flex items-start gap-2 text-[#D0D0D0] text-xs">
                          <span className="text-[#4A8FD4] mt-0.5">✓</span>
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ServiceCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #1E4D8C, #2E6FBF)' }}>
        <FadeIn direction="up">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-4xl font-bold uppercase text-white mb-4">
              Need a Custom Security Mix?
            </h2>
            <p className="text-[rgba(255,255,255,0.8)] mb-6">
              Many clients require a combination of services. Tell us your requirements and we'll design a complete security deployment plan.
            </p>
            <Link href="/contact#quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1E4D8C] font-heading font-bold text-base uppercase tracking-wider rounded-md hover:bg-[#0B0B0D] hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
              Get a Custom Quote
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
