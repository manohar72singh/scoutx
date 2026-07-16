// app/services/[serviceSlug]/page.js

import { notFound } from 'next/navigation';
import Link from 'next/link';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';

const servicesData = {
  'armed-guards': {
    title: 'Armed Security Guards',
    badge: 'High-Risk Premises',
    icon: '🔫',
    heroSub: 'Licensed armed security personnel for high-value asset protection.',
    description: 'Our licensed armed security personnel are deployed at high-value and high-risk locations including banks, jewellery stores, cash-counting centres, and cash-in-transit operations. All armed guards hold valid firearms licenses under the Arms Act and are periodically re-trained in safe handling and de-escalation tactics.',
    idealFor: [
      'Banks & Financial Institutions',
      'Jewellery Stores & Showrooms',
      'Cash-in-Transit Operations',
      'High-Value Asset Warehouses',
      'Diplomatic Establishments',
      'VIP Escort & Close Protection',
    ],
    duties: [
      'Deterrence of armed robbery and theft',
      'Secure transit of cash and valuables',
      'Access control at highly sensitive zones',
      'Rapid response to critical security breaches',
    ],
    metaTitle: 'Armed Security Guards | ScoutX Protection Group',
    metaDesc: 'PSARA-licensed armed security guards in Delhi NCR, Noida & Ghaziabad for banks, cash transit, and high-value protection. Call for a quote.',
  },
  'unarmed-guards': {
    title: 'Unarmed Security Guards',
    badge: 'Most Popular',
    icon: '🦺',
    heroSub: 'Professional, police-verified watchmen and security guards for daily operations.',
    description: 'Our unarmed security personnel form the backbone of day-to-day security at most commercial and residential sites. They are thoroughly vetted, physically fit, and trained in access control, visitor management, perimeter patrol, emergency response, and daily security reporting.',
    idealFor: [
      'Residential Societies & Gated Communities',
      'Corporate Offices & IT Parks',
      'Retail Outlets & Shopping Malls',
      'Educational Institutions',
      'Factories & Manufacturing Units',
      'Hospitals & Clinics',
    ],
    duties: [
      '24/7 Gate security and access control',
      'Visitor and vendor management (Entry/Exit logs)',
      'Regular perimeter patrols (Day and Night)',
      'Monitoring CCTV feeds and reporting anomalies',
      'Enforcing site-specific safety protocols',
    ],
    metaTitle: 'Unarmed Security Guards | ScoutX Protection Group',
    metaDesc: 'Professional unarmed security guards for residential societies, offices, and retail in Delhi NCR. 100% police verified and PSARA licensed.',
  },
  'bouncers': {
    title: 'Professional Bouncers',
    badge: 'Crowd Control',
    icon: '💪',
    heroSub: 'Physically fit, well-trained bouncers for crowd management and VIP protection.',
    description: 'We provide highly intimidating yet professional bouncers for crowd management, conflict de-escalation, and VIP area protection. Unlike untrained muscle, our bouncers are trained in "verbal judo" and conflict resolution — ensuring force is strictly used as the last resort to maintain a safe environment.',
    idealFor: [
      'Nightclubs, Pubs & Bars',
      'High-Profile Private Events',
      'Concert Venues & Stadiums',
      'Private VIP Functions & Parties',
      'Celebrity Escort',
    ],
    duties: [
      'Screening guests and enforcing entry policies',
      'Managing crowd flow and preventing stampedes',
      'De-escalating aggressive behaviour and conflicts',
      'Escorting unruly individuals off the premises',
      'Providing close protection for VIP guests',
    ],
    metaTitle: 'Professional Bouncers & Crowd Control | ScoutX Protection Group',
    metaDesc: 'Hire professional bouncers for nightclubs, events, and VIP protection in Delhi NCR. Trained in conflict resolution and crowd management.',
  },
  'female-guards': {
    title: 'Female Security Guards',
    badge: 'Women Safety',
    icon: '👩‍✈️',
    heroSub: 'Trained female security personnel for frisking, access control, and specialized roles.',
    description: 'Certain security roles legally and ethically require female personnel. We provide trained female security guards for frisking, access control at women-only areas, loss prevention in women\'s retail sections, and general security at hospitals, schools, and family-focused venues.',
    idealFor: [
      'Hospitals & Maternity Clinics',
      'Schools, Colleges & Hostels',
      'Women\'s Apparel & Retail Sections',
      'Metro Stations & Transit Hubs',
      'Corporate Offices & Receptions',
      'Events requiring female frisking booths',
    ],
    duties: [
      'Frisking female visitors and staff',
      'Managing security in female-only zones (hostels, changing rooms)',
      'Assisting women and children during emergencies',
      'Front-desk access control and visitor management',
    ],
    metaTitle: 'Female Security Guards | ScoutX Protection Group',
    metaDesc: 'Trained female security guards for frisking, hospitals, schools, and corporate offices in Delhi NCR. Professional and PSARA licensed.',
  },
  'event-security': {
    title: 'Event Security Services',
    badge: 'Full Coverage',
    icon: '🎪',
    heroSub: 'End-to-end security management for events of any scale.',
    description: 'From corporate conferences and grand weddings to large outdoor concerts and political rallies, we provide comprehensive event security. We handle the entire security lifecycle: advance site assessment, guard deployment planning, crowd flow management, emergency exit planning, and post-event escort.',
    idealFor: [
      'Concerts & Large Exhibitions',
      'Corporate Conferences & AGMs',
      'Weddings & Private VIP Parties',
      'Political & Religious Gatherings',
      'Sports Tournaments',
    ],
    duties: [
      'Pre-event site risk assessment',
      'Crowd control and queue management',
      'Ticket checking and VIP access control',
      'Emergency response and evacuation planning',
      'Traffic and parking management coordination',
    ],
    metaTitle: 'Event Security Services | ScoutX Protection Group',
    metaDesc: 'Complete event security management in Delhi NCR. Guards and bouncers for concerts, weddings, and corporate events. Get a custom plan.',
  },
  'mobile-patrol': {
    title: 'Mobile Patrol & PSO',
    badge: 'Executive Protection',
    icon: '🚗',
    heroSub: 'Vehicle-mounted patrols and Personal Security Officers for dynamic threats.',
    description: 'Vehicle-mounted mobile patrol units conduct random and scheduled check rounds across multiple client sites, reducing guard complacency and providing an additional layer of deterrence. Additionally, we provide discreet Personal Security Officers (PSOs) for close-protection of executives, entrepreneurs, and VIP individuals.',
    idealFor: [
      'Multi-Site Residential Complexes',
      'Executive Protection & VIP Escort',
      'Large Industrial Estates & Parks',
      'Night-time Area Patrols',
      'Logistics & Convoy Escort',
    ],
    duties: [
      'Randomised vehicle patrols to deter criminal activity',
      'Rapid response to alarms or incidents across large sites',
      'Close physical protection for VIPs (armed or unarmed)',
      'Route reconnaissance for executive travel',
    ],
    metaTitle: 'Mobile Patrol & PSO Services | ScoutX Protection Group',
    metaDesc: 'Mobile security patrols and Personal Security Officers (PSO) in Delhi NCR. Vehicle-mounted guards for large estates and VIP protection.',
  }
};

const slugList = Object.keys(servicesData);

export async function generateStaticParams() {
  return slugList.map((slug) => ({ serviceSlug: slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const svc = servicesData[resolvedParams.serviceSlug];
  if (!svc) return {};
  return {
    title: svc.metaTitle,
    description: svc.metaDesc,
    alternates: { canonical: `https://www.scoutxprotection.com/services/${resolvedParams.serviceSlug}` },
  };
}

export default async function ServiceDetailedPage({ params }) {
  const resolvedParams = await params;
  const svc = servicesData[resolvedParams.serviceSlug];
  if (!svc) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="section-label">{svc.icon} {svc.badge}</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase text-white mb-4">
            {svc.title}
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-lg max-w-2xl mx-auto mt-6 mb-8">{svc.heroSub}</p>
          <Link href="/contact#quote" className="btn-primary text-base px-8 py-4">
            Request {svc.title}
          </Link>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Main Content */}
          <div>
            <h2 className="font-heading text-3xl font-bold uppercase text-white mb-6">
              About This <span className="text-gradient-steel">Service</span>
            </h2>
            <p className="text-[#A8A8A8] leading-relaxed mb-8 text-lg">
              {svc.description}
            </p>

            <h3 className="font-heading text-xl font-bold uppercase text-[#E8E8E8] mb-4 mt-10">Key Responsibilities</h3>
            <ul className="space-y-3">
              {svc.duties.map((duty, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[#C0C0C0]">
                  <span className="text-[#2E6FBF] mt-1 shrink-0">→</span>
                  <span>{duty}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div className="bg-[#050914] border border-[rgba(192,192,192,0.1)] rounded-xl p-8">
            <h3 className="font-heading text-lg font-bold uppercase tracking-widest text-[#E8E8E8] mb-6 border-b border-[rgba(192,192,192,0.1)] pb-4">
              Ideal Environments
            </h3>
            <ul className="space-y-4">
              {svc.idealFor.map((use) => (
                <li key={use} className="flex items-center gap-3 text-[#D0D0D0] text-sm">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: 'rgba(46,111,191,0.2)', color: '#4A8FD4' }}>✓</span>
                  {use}
                </li>
              ))}
            </ul>

            <div className="mt-10 p-5 bg-[#0A0F1F] rounded-lg border border-[#1A2235]">
              <div className="text-center mb-4">
                <span className="text-2xl">🛡️</span>
                <h4 className="font-heading font-bold text-white uppercase text-sm mt-2">PSARA Compliant</h4>
                <p className="text-[#A8A8A8] text-xs mt-1">Legally sound security deployment</p>
              </div>
              <a href="tel:+918682066666" className="w-full btn-secondary text-sm flex justify-center py-3">
                Call for Consultation
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Trust & Credentials */}
      <WhyChooseUsSection />

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #1E4D8C, #2E6FBF)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl font-bold uppercase text-white mb-4">
            Ready to Secure Your Premises?
          </h2>
          <p className="text-[rgba(255,255,255,0.8)] mb-6 text-lg">
            Get a tailored deployment plan and competitive quote for {svc.title.toLowerCase()} within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact#quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1E4D8C] font-heading font-bold text-base uppercase tracking-wider rounded-md hover:bg-[#F5F5F5] transition-all hover:-translate-y-1">
              Get a Free Quote
            </Link>
            <a href="https://wa.me/918682066666" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white text-white font-heading font-bold text-base uppercase tracking-wider rounded-md hover:bg-white/10 transition-all">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
