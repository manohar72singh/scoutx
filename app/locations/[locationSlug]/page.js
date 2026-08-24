// app/locations/[locationSlug]/page.js — Dynamic Location & Shopping Mall Security Hub

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { locationsData, locationSlugs } from '@/lib/locationsData';
import { servicesData, serviceSlugs } from '@/lib/servicesData';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CertificationsSection from '@/components/CertificationsSection';
import CityLeadForm from '@/components/CityLeadForm';
import FAQSection from '@/components/FAQSection';
import FadeIn from '@/components/FadeIn';

export async function generateStaticParams() {
  return locationSlugs.map((slug) => ({ locationSlug: slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const loc = locationsData[resolvedParams.locationSlug];
  if (!loc) return {};

  return {
    title: loc.metaTitle,
    description: loc.metaDesc,
    alternates: { canonical: `https://scoutxsecurity.com/locations/${resolvedParams.locationSlug}` },
    openGraph: {
      url: `https://scoutxsecurity.com/locations/${resolvedParams.locationSlug}`,
      title: loc.metaTitle,
      description: loc.metaDesc,
      siteName: 'ScoutX Protection Group',
      type: 'website',
    },
  };
}

export default async function LocationHubPage({ params }) {
  const resolvedParams = await params;
  const loc = locationsData[resolvedParams.locationSlug];
  if (!loc) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: `ScoutX Security Services - ${loc.name}`,
              description: loc.metaDesc,
              url: `https://scoutxsecurity.com/locations/${resolvedParams.locationSlug}`,
              telephone: '+91-8682066666',
              email: 'scoutxsecurity@gmail.com',
              areaServed: `${loc.name}, ${loc.city}, ${loc.state}`,
              address: {
                '@type': 'PostalAddress',
                addressLocality: loc.name,
                addressRegion: loc.state,
                postalCode: loc.pincode,
                addressCountry: 'IN',
              },
              priceRange: '₹₹',
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
                  name: 'Locations & Malls',
                  item: 'https://scoutxsecurity.com/html-sitemap',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: loc.name,
                  item: `https://scoutxsecurity.com/locations/${resolvedParams.locationSlug}`,
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: loc.faqs.map((faq) => ({
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
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A93A6] mb-6">
            <Link href="/" title="Home" className="hover:text-white transition-colors">Home</Link>
            <span className="text-[#2A3550]">/</span>
            <Link href="/html-sitemap" title="All NCR Locations" className="hover:text-white transition-colors">Locations</Link>
            <span className="text-[#2A3550]">/</span>
            <span className="text-[#4A8FD4]">{loc.shortName}</span>
          </nav>

          <span className="section-label">📍 {loc.name} • PSARA LICENSED</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase text-white mb-4">
            Security Guard &amp; Facility Services in <span className="text-gradient-steel">{loc.shortName}</span>
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-base sm:text-lg max-w-3xl mx-auto mt-6 mb-8 leading-relaxed">
            {loc.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact#quote" title={`Get a security quote in ${loc.name}`} className="btn-primary text-base px-8 py-4">
              Get a Quote in {loc.shortName}
            </Link>
            <a href="tel:+918682066666" title="Call ScoutX Security Director" className="btn-secondary text-base px-8 py-4">
              📞 Call: 86820 66666
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {['100% Police Verified', 'UP-PSARA Licensed Agency', 'Workmen Compensation Insured', 'Surprise Night Audits', 'Same-Day Guard Replacement'].map((t) => (
              <span key={t} className="trust-badge text-xs sm:text-sm text-[#E8E8E8]">✅ {t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Location Details & Service Grid */}
      <section className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">

            {/* Left Col: Location Info & Challenges */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-[#050914] p-6 rounded-xl border border-[rgba(192,192,192,0.1)]">
                <h2 className="font-heading text-xl font-bold uppercase text-white mb-3">
                  Security Assessment for {loc.name}
                </h2>
                <p className="text-[#A8A8A8] text-sm leading-relaxed mb-4">
                  {loc.description}
                </p>
                <div className="text-xs text-[#4A8FD4] font-medium flex items-center gap-2">
                  <span>📌 Key Landmark Corridor:</span>
                  <span className="text-[#E8E8E8]">{loc.landmark}</span>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-4">
                  ⚠️ Primary Security Vulnerabilities in this Zone:
                </h3>
                <ul className="space-y-2.5">
                  {loc.keyChallenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[#D0D0D0] text-sm">
                      <span className="text-amber-400 mt-0.5">⚠️</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-4">
                  ✅ Recommended Guard Deployments in {loc.shortName}:
                </h3>
                <ul className="space-y-2.5">
                  {loc.idealDeployments.map((deployment, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[#D0D0D0] text-sm">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: 'rgba(46,111,191,0.2)', color: '#4A8FD4' }}>✓</span>
                      <span>{deployment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Col: Instant Quote Form */}
            <div className="lg:col-span-5 sticky top-24">
              <CityLeadForm cityName={loc.name} />
            </div>
          </div>

          {/* Programmatic Service Pages Grid for this Location */}
          <div className="mt-16 pt-12 border-t border-[#1A2235]">
            <div className="text-center mb-10">
              <span className="text-[#2E6FBF] text-xs font-bold uppercase tracking-[0.2em]">AVAILABLE SERVICE LINES</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-white mt-2">
                All Specialized Security Services in <span className="text-[#2E6FBF]">{loc.shortName}</span>
              </h2>
              <p className="text-[#A8A8A8] text-sm max-w-2xl mx-auto mt-3">
                Click any service below for dedicated duties, equipment specs, and pricing in {loc.shortName}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {serviceSlugs.map((svcSlug) => {
                const svc = servicesData[svcSlug];
                return (
                  <Link
                    key={svcSlug}
                    href={`/locations/${resolvedParams.locationSlug}/${svcSlug}`}
                    title={`${svc.title} in ${loc.name}`}
                    className="p-5 bg-[#050914] border border-[#1A2235] rounded-lg hover:border-[#2E6FBF] hover:-translate-y-1 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl">{svc.icon}</span>
                        <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#4A8FD4] px-2 py-0.5 bg-[#2E6FBF]/10 rounded">
                          {svc.badge}
                        </span>
                      </div>
                      <h3 className="font-heading text-sm font-bold uppercase text-white group-hover:text-[#4A8FD4] transition-colors mb-1.5">
                        {svc.shortTitle} in {loc.shortName}
                      </h3>
                      <p className="text-[#8A93A6] text-xs line-clamp-2 leading-relaxed">
                        {svc.heroSub}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#1A2235] text-[11px] text-[#2E6FBF] font-heading font-bold uppercase tracking-wider flex items-center justify-between">
                      <span>View Deployment Details</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <CertificationsSection title={`ScoutX Legal Compliance & Licensing in ${loc.city}`} />

      {/* FAQs Section */}
      <FAQSection
        title={`Frequently Asked Questions: Security in ${loc.shortName}`}
        subtitle="LOCAL COMPLIANCE & RATES"
        description={`Everything you need to know about hiring security guards and bouncers in ${loc.name}.`}
        faqs={loc.faqs}
      />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Other NCR Locations / Malls Internal Linking */}
      <section className="py-14 px-4 sm:px-6 bg-[#0B0B0D] border-t border-[rgba(192,192,192,0.1)]">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-[#A8A8A8] mb-6">
            Explore Other High-Traffic Malls &amp; Commercial Hubs in NCR:
          </h3>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {locationSlugs.filter((s) => s !== resolvedParams.locationSlug).map((slug) => (
              <Link
                key={slug}
                href={`/locations/${slug}`}
                title={`Security in ${locationsData[slug].name}`}
                className="px-3.5 py-2 text-xs font-heading uppercase tracking-wider text-[#C0C0C0] bg-[#111827] border border-[rgba(192,192,192,0.2)] rounded hover:border-[#2E6FBF] hover:text-white transition-all"
              >
                {locationsData[slug].shortName}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
