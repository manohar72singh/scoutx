// app/industries/page.js

import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import FadeIn from '@/components/FadeIn';

export const metadata = {
  title: 'Industries We Serve | Residential, Corporate & Industrial Security',
  description:
    'ScoutX provides security guards for residential societies, corporate offices, factories, banks, hospitals, malls, and events in Ghaziabad, Noida, Delhi NCR.',
  alternates: { canonical: 'https://scoutxsecurity.com/industries' },
  openGraph: {
    url: 'https://scoutxsecurity.com/industries',
    title: 'Industries Secured by ScoutX',
    description: 'Specialized security guard services for residential, commercial, industrial, and institutional sectors in NCR.',
  }
};

const industries = [
  {
    icon: '🏘️',
    title: 'Residential Societies',
    challenge: 'Societies face theft, unauthorised entry, and inadequate visitor tracking — especially at night.',
    solution: 'We deploy trained guards at entry/exit gates, implement visitor log books, conduct floor patrols, and manage CCTV monitoring. Female guards available for added resident comfort.',
    guards: 'Unarmed guards, gate staff',
  },
  {
    icon: '🏢',
    title: 'Corporate Offices',
    challenge: 'Offices need professional access control, visitor management, and discretion — without creating a fortress atmosphere.',
    solution: 'Our corporate-trained guards are groomed, presentable, and trained in courteous access control, visitor registration, emergency evacuation procedures, and inter-shift handover documentation.',
    guards: 'Unarmed guards, reception security',
  },
  {
    icon: '🏭',
    title: 'Factories & Industrial Units',
    challenge: 'Factories face pilferage, unauthorised exit of goods, shift handover gaps, and safety compliance requirements.',
    solution: 'We provide multi-shift guard coverage with frisking protocols, entry/exit vehicle inspection, material gate passes, and periodic supervisor audits to close accountability gaps.',
    guards: 'Armed + unarmed guards',
  },
  {
    icon: '🏦',
    title: 'Banks & ATMs',
    challenge: 'Banks carry extreme risk — from robbery threats to ATM tampering and customer safety inside the premises.',
    solution: 'We deploy licensed armed guards at bank branches and unarmed guards at ATM kiosks. All banking guards undergo additional compliance training on RBI security guidelines.',
    guards: 'Licensed armed guards',
  },
  {
    icon: '🏥',
    title: 'Hospitals & Healthcare',
    challenge: 'Hospitals face emotional crowds, patient safety concerns, unauthorised access to ICUs, and the need for female security in sensitive areas.',
    solution: 'We provide a mix of male and female guards for OPD crowd control, ICU/emergency wing access control, night patrolling, and parking management.',
    guards: 'Male + female guards',
  },
  {
    icon: '🛍️',
    title: 'Malls & Retail',
    challenge: 'High-footfall retail environments face shoplifting, crowd crush risks during sales, and the challenge of maintaining an inviting atmosphere while preventing loss.',
    solution: 'Our retail-trained guards handle loss prevention, fitting room monitoring, parking lot security, and holiday rush crowd management — staying professional and non-intrusive.',
    guards: 'Loss prevention officers',
  },
  {
    icon: '🎤',
    title: 'Events & Exhibitions',
    challenge: 'Event organisers face unpredictable crowd behaviour, VIP safety, access zone breaches, and post-event clearing risks.',
    solution: 'ScoutX provides end-to-end event security: pre-event site assessment, zone-wise guard allocation, emergency response planning, crowd flow management, and post-event perimeter monitoring.',
    guards: 'Event security team, bouncers',
  },
];

export default function IndustriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: 'Industries We Serve',
                item: 'https://scoutxsecurity.com/industries',
              },
            ],
          }),
        }}
      />
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="section-label">Who We Protect</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase text-white mb-4">
            Industries We <span className="text-gradient-silver">Serve</span>
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-lg max-w-2xl mx-auto mt-6">
            Every industry has unique security challenges. We design deployments around your specific environment, not a one-size-fits-all template.
          </p>
        </div>
      </section>

      {/* Industry Cards Grid */}
      <section className="py-20 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => (
              <FadeIn key={ind.title} delay={idx * 0.1} direction="up" className="h-full">
                <ServiceCard
                  icon={ind.icon}
                  title={ind.title}
                  badge={ind.guards}
                  link="/contact#quote"
                  linkText="Get Custom Plan"
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-[#C0C0C0] mb-2">
                        ⚠️ The Challenge
                      </h3>
                      <p className="text-xs">{ind.challenge}</p>
                    </div>
                    <div>
                      <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-[#C0C0C0] mb-2">
                        ✅ Our Solution
                      </h3>
                      <p className="text-xs">{ind.solution}</p>
                    </div>
                  </div>
                </ServiceCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #1E4D8C, #2E6FBF)' }}>
        <FadeIn direction="up">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-4xl font-bold uppercase text-white mb-4">
              Don't See Your Industry?
            </h2>
            <p className="text-[rgba(255,255,255,0.8)] mb-6">We adapt to any environment. Contact us to discuss your specific security requirements.</p>
            <Link href="/contact#quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1E4D8C] font-heading font-bold text-base uppercase tracking-wider rounded-md hover:bg-[#0B0B0D] hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
              Request a Custom Plan
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
