// app/[citySlug]/page.js — City SEO landing pages
// Handles: /security-guards-ghaziabad, /security-guards-noida, etc.

import { notFound } from 'next/navigation';
import Link from 'next/link';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CityLeadForm from '@/components/CityLeadForm';

const cities = {
  'security-guards-ghaziabad': {
    name: 'Ghaziabad',
    state: 'Uttar Pradesh',
    headline: 'Security Guard Services in Ghaziabad',
    subheadline: 'PSARA-licensed, police-verified guards for residential societies, offices, factories & events across Ghaziabad, UP.',
    industries: ['Govindpuram residential societies', 'Indirapuram corporate offices', 'Sahibabad industrial units', 'NH-58 highway logistics', 'Ghaziabad hospitals & clinics'],
    meta_title: 'Security Guard Services in Ghaziabad | ScoutX Protection Group',
    meta_desc: 'PSARA-licensed security guard company in Ghaziabad. Police-verified guards for societies, offices, factories & events. Call +91 86820 66666 for a free quote.',
  },
  'security-guards-noida': {
    name: 'Noida',
    state: 'Uttar Pradesh',
    headline: 'Security Guard Services in Noida',
    subheadline: 'Professional security guards for Noida\'s IT parks, corporate hubs, residential sectors & commercial complexes. PSARA licensed.',
    industries: ['IT parks and tech campuses', 'Sector 18 and 62 commercial zones', 'Residential sectors', 'Greater Noida Expressway logistics', 'Corporate offices in Noida'],
    meta_title: 'Security Guard Services in Noida | ScoutX Protection Group',
    meta_desc: 'PSARA-licensed security guard agency in Noida. Trained guards for IT parks, offices, malls & events. Call +91 86820 66666 for a free quote.',
  },
  'security-guards-greater-noida': {
    name: 'Greater Noida',
    state: 'Uttar Pradesh',
    headline: 'Security Guard Services in Greater Noida',
    subheadline: 'Trained security personnel for Greater Noida\'s residential townships, industrial estates, and educational institutions.',
    industries: ['Knowledge Park IT offices', 'Yamuna Expressway industrial units', 'Greater Noida residential townships', 'Hospitals and healthcare facilities', 'Educational institutions'],
    meta_title: 'Security Guard Services in Greater Noida | ScoutX Protection Group',
    meta_desc: 'Security guards in Greater Noida. PSARA-licensed, police-verified. Covering residential, industrial, educational, and commercial sites. Get a free quote.',
  },
  'security-guards-delhi': {
    name: 'Delhi',
    state: 'Delhi NCR',
    headline: 'Security Guard Services in Delhi',
    subheadline: 'Armed and unarmed security guards for Delhi\'s offices, retail hubs, events, and residential colonies. Fully compliant with PSA Act.',
    industries: ['South Delhi commercial offices', 'Connaught Place & CP retail', 'Delhi hospitals and clinics', 'Event security for Delhi venues', 'Bank & ATM security'],
    meta_title: 'Security Guard Services in Delhi | ScoutX Protection Group',
    meta_desc: 'Professional security guard services in Delhi NCR. PSARA-licensed, police-verified guards for offices, events & residential. Call +91 86820 66666.',
  },
  'security-guards-gurgaon': {
    name: 'Gurgaon',
    state: 'Haryana',
    headline: 'Security Guard Services in Gurgaon',
    subheadline: 'Top-tier security guards for Gurgaon\'s corporate offices, cyber hubs, and premium residential societies.',
    industries: ['Cyber City corporate parks', 'DLF Phase residential areas', 'Udyog Vihar industrial zones', 'Gurgaon retail and malls', 'Nightlife and bouncer security'],
    meta_title: 'Security Guard Services in Gurgaon | ScoutX Protection Group',
    meta_desc: 'Looking for security guards in Gurgaon? We provide highly trained, police-verified guards for corporate and residential security. Get a free quote.',
  },
  'security-guards-faridabad': {
    name: 'Faridabad',
    state: 'Haryana',
    headline: 'Security Guard Services in Faridabad',
    subheadline: 'Reliable security agency in Faridabad for manufacturing plants, industrial sectors, and residential complexes.',
    industries: ['Sector 27 & 58 industrial areas', 'Manufacturing plants and factories', 'Residential group housings', 'Warehouses and logistics', 'Hospitals and healthcare'],
    meta_title: 'Security Guard Services in Faridabad | ScoutX Protection Group',
    meta_desc: 'ScoutX offers PSARA-licensed security guards in Faridabad for industrial and residential safety. Trained and verified guards. Call +91 86820 66666.',
  },
  'security-guards-meerut': {
    name: 'Meerut',
    state: 'Uttar Pradesh',
    headline: 'Security Guard Services in Meerut',
    subheadline: 'Professional security guard agency in Meerut providing trusted manpower for factories, schools, and residential areas.',
    industries: ['Meerut industrial estates', 'Educational institutes and universities', 'Residential societies', 'Commercial markets', 'Event and VIP security'],
    meta_title: 'Security Guard Services in Meerut | ScoutX Protection Group',
    meta_desc: 'Hire professional security guards in Meerut. PSARA compliant, police verified, and highly trained. Contact ScoutX Protection Group for a free quote.',
  },
  'security-guards-hapur': {
    name: 'Hapur',
    state: 'Uttar Pradesh',
    headline: 'Security Guard Services in Hapur',
    subheadline: 'Dedicated security solutions for Hapur\'s growing industrial clusters, warehouses, and commercial spaces.',
    industries: ['Hapur UPSIDC industrial area', 'Warehouses and godowns', 'Cold storages', 'Commercial hubs', 'Residential properties'],
    meta_title: 'Security Guard Services in Hapur | ScoutX Protection Group',
    meta_desc: 'ScoutX Protection Group provides verified security guards in Hapur for industrial and commercial sectors. Get secured today.',
  },
};

const slugList = Object.keys(cities);

export async function generateStaticParams() {
  return slugList.map((slug) => ({ citySlug: slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const city = cities[resolvedParams.citySlug];
  if (!city) return {};
  return {
    title: city.meta_title,
    description: city.meta_desc,
    alternates: { canonical: `https://www.scoutxprotection.com/${resolvedParams.citySlug}` },
  };
}

export default async function CityPage({ params }) {
  const resolvedParams = await params;
  const city = cities[resolvedParams.citySlug];
  if (!city) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: `ScoutX Protection Group ${city.name}`,
            description: city.meta_desc,
            url: `https://www.scoutxprotection.com/${resolvedParams.citySlug}`,
            telephone: '+91-8682066666',
            areaServed: city.name,
            address: {
              '@type': 'PostalAddress',
              addressLocality: city.name,
              addressRegion: city.state,
              addressCountry: 'IN',
            }
          }),
        }}
      />
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="section-label">📍 {city.name}, {city.state}</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase text-white mb-4">
            {city.headline}
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-lg max-w-2xl mx-auto mt-6 mb-8">{city.subheadline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact#quote" className="btn-primary text-base px-8 py-4">
              Get a Free Quote in {city.name}
            </Link>
            <a href="tel:+918682066666" className="btn-secondary text-base px-8 py-4">
              📞 Call: 86820 66666
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-8 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {['PSARA Licensed', '100% Police Verified', '500+ Guards Deployed', 'Fully Insured', '24/7 Support'].map((t) => (
              <span key={t} className="trust-badge text-sm text-[#E8E8E8]">✅ {t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Why ScoutX in city */}
      <section className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold uppercase text-white">
              Serving <span className="text-gradient-steel">{city.name}</span> & Surroundings
            </h2>
            <div className="chrome-divider max-w-xs mx-auto mt-4" />
          </div>

          {/* CTA / Lead Form Area */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            
            {/* Left Col: Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-4">
                  Areas &amp; Sectors We Cover in {city.name}
                </h3>
                <ul className="space-y-2">
                {city.industries.map((ind) => (
                  <li key={ind} className="flex items-center gap-3 text-[#D0D0D0] text-sm">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs" style={{ background: 'rgba(46,111,191,0.2)', color: '#4A8FD4' }}>✓</span>
                    {ind}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-4">Why Choose ScoutX in {city.name}?</h3>
              {[
                'Local knowledge of key premises and risk areas',
                'Fast deployment — guards ready within 24–48 hours',
                'Dedicated supervisor for your site',
                'WhatsApp contact for instant communication',
                'Competitive monthly rates with no hidden charges',
              ].map((p) => (
                <div key={p} className="flex gap-3 text-[#A8A8A8] text-sm">
                  <span className="text-[#2E6FBF] mt-0.5">→</span>
                  {p}
                </div>
              ))}
            </div>
          </div>
            
          {/* Right Col: Lead Capture Form */}
          <div className="sticky top-24">
              <CityLeadForm cityName={city.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Other cities */}
      <section className="py-12 px-4 sm:px-6" style={{ background: '#0B0B0D', borderTop: '1px solid rgba(192,192,192,0.1)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-[#A8A8A8] mb-4">We Also Serve</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {slugList.filter((s) => s !== resolvedParams.citySlug).map((slug) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="px-4 py-2 text-sm font-heading uppercase tracking-wider text-[#C0C0C0] border border-[rgba(192,192,192,0.2)] rounded hover:border-[rgba(46,111,191,0.5)] hover:text-white transition-all"
              >
                Security Guards {cities[slug].name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
