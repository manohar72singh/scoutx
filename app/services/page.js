// app/services/page.js

import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import FadeIn from '@/components/FadeIn';

export const metadata = {
  title: 'Security Guard Services — Armed, Unarmed, Event, Female Guards',
  description:
    'ScoutX offers armed guards, unarmed guards, bouncers, female security guards, event security, and mobile patrol services in Ghaziabad, Noida, Delhi NCR. PSARA licensed.',
};

const services = [
  {
    id: 'armed-guards',
    icon: '🔫',
    title: 'Armed Guards',
    badge: 'High-Risk Premises',
    desc: 'Our licensed armed security personnel are deployed at high-value and high-risk locations including banks, jewellery stores, cash-counting centres, and cash-in-transit operations. All armed guards hold valid firearms licenses under the Arms Act and are periodically re-trained.',
    ideal: ['Banks & Jewellery Stores', 'Cash-in-Transit', 'High-Value Warehouses', 'Diplomatic Establishments'],
  },
  {
    id: 'unarmed-guards',
    icon: '🦺',
    title: 'Unarmed Guards',
    badge: 'Most Popular',
    desc: 'Our unarmed security personnel are trained in access control, visitor management, perimeter patrol, emergency response, and daily security reporting. They are the backbone of day-to-day security at most commercial and residential sites.',
    ideal: ['Residential Societies', 'Corporate Offices', 'Retail Outlets', 'Educational Institutions'],
  },
  {
    id: 'bouncers',
    icon: '💪',
    title: 'Bouncers',
    badge: 'Crowd Control',
    desc: 'Physically fit, professionally trained bouncers for crowd management, conflict de-escalation, and VIP area protection. Our bouncers are trained in verbal judo and conflict resolution — force is always the last resort.',
    ideal: ['Nightclubs & Pubs', 'High-Profile Events', 'Concert Venues', 'Private VIP Functions'],
  },
  {
    id: 'female-guards',
    icon: '👩‍✈️',
    title: 'Female Security Guards',
    badge: 'Women Safety',
    desc: "Trained female security personnel for frisking, access control at women-only areas, loss prevention in women's retail sections, and general security at hospitals, schools, and family-focused venues.",
    ideal: ['Hospitals & Clinics', 'Schools & Colleges', 'Women\'s Retail Sections', 'Metro & Transit Hubs'],
  },
  {
    id: 'event-security',
    icon: '🎪',
    title: 'Event Security',
    badge: 'Full Coverage',
    desc: 'End-to-end security management for events of any scale — from corporate conferences to large outdoor concerts and weddings. We handle advance site assessment, guard deployment planning, crowd flow management, emergency exits, and post-event escort.',
    ideal: ['Concerts & Exhibitions', 'Corporate Conferences', 'Weddings & Private Parties', 'Political & Religious Events'],
  },
  {
    id: 'mobile-patrol',
    icon: '🚗',
    title: 'Mobile Patrol & PSO',
    badge: 'Executive Protection',
    desc: 'Vehicle-mounted mobile patrol units conduct random check rounds across multiple client sites, reducing guard complacency and providing an additional deterrence layer. Personal Security Officers (PSOs) provide discreet close-protection to executives, entrepreneurs, and VIP individuals.',
    ideal: ['Multi-Site Complexes', 'Executive Protection', 'Industrial Estates', 'Night-time Patrols'],
  },
];

export default function ServicesPage() {
  return (
    <>
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
