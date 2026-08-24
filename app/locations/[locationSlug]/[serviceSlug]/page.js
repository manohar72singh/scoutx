// app/locations/[locationSlug]/[serviceSlug]/page.js — Programmatic Service × Location Landing Page

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { locationsData, locationSlugs } from '@/lib/locationsData';
import { servicesData, serviceSlugs } from '@/lib/servicesData';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CertificationsSection from '@/components/CertificationsSection';
import CityLeadForm from '@/components/CityLeadForm';
import FAQSection from '@/components/FAQSection';

export async function generateStaticParams() {
  const params = [];
  for (const locationSlug of locationSlugs) {
    for (const serviceSlug of serviceSlugs) {
      params.push({
        locationSlug,
        serviceSlug,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const loc = locationsData[resolvedParams.locationSlug];
  const svc = servicesData[resolvedParams.serviceSlug];
  if (!loc || !svc) return {};

  const title = `${svc.title} in ${loc.shortName} | PSARA Licensed - ScoutX`;
  const description = `Hire professional, police-verified ${svc.shortTitle.toLowerCase()} in ${loc.name}. 24/7 supervisor rounds, same-day relief replacement & transparent pricing. Call +91 86820 66666.`;

  return {
    title,
    description,
    alternates: { canonical: `https://scoutxsecurity.com/locations/${resolvedParams.locationSlug}/${resolvedParams.serviceSlug}` },
    openGraph: {
      url: `https://scoutxsecurity.com/locations/${resolvedParams.locationSlug}/${resolvedParams.serviceSlug}`,
      title,
      description,
      siteName: 'ScoutX Protection Group',
      type: 'website',
    },
  };
}

export default async function ServiceLocationPage({ params }) {
  const resolvedParams = await params;
  const loc = locationsData[resolvedParams.locationSlug];
  const svc = servicesData[resolvedParams.serviceSlug];
  if (!loc || !svc) notFound();

  const combinedFaqs = [
    {
      q: `How quickly can ScoutX deploy ${svc.title} in ${loc.shortName}?`,
      a: `We can inspect your premises in ${loc.name} and deploy trained, police-verified ${svc.shortTitle.toLowerCase()} within 24 to 48 hours.`,
    },
    {
      q: `Are ${svc.title} personnel deployed in ${loc.shortName} covered by insurance and PSARA compliance?`,
      a: `Yes, 100% of our ${svc.shortTitle.toLowerCase()} staff operate under our valid UP-PSARA license, with full EPF, ESIC, and Workmen’s Compensation liability coverage.`,
    },
    {
      q: `What specific duties will ${svc.title} handle at ${loc.name}?`,
      a: `Our personnel manage gate entry access, visitor app logs, perimeter patrolling, emergency response, and customized security reporting tailored to ${loc.shortName}.`,
    },
    {
      q: `What is the replacement policy if an assigned guard is absent in ${loc.shortName}?`,
      a: `We provide guaranteed same-day relief replacement within 24 hours with zero additional replacement charges from our local NCR reserve roster.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `${svc.title} in ${loc.name}`,
              serviceType: svc.title,
              provider: {
                '@type': 'LocalBusiness',
                name: 'ScoutX Protection Group Pvt. Ltd.',
                url: 'https://scoutxsecurity.com',
                telephone: '+91-8682066666',
                email: 'scoutxsecurity@gmail.com',
              },
              areaServed: {
                '@type': 'Place',
                name: `${loc.name}, ${loc.city}, ${loc.state}`,
              },
              description: `Professional ${svc.title} deployed in ${loc.name}. Police verified, PSARA compliant, and trained for high-security environments.`,
              url: `https://scoutxsecurity.com/locations/${resolvedParams.locationSlug}/${resolvedParams.serviceSlug}`,
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
                  name: loc.shortName,
                  item: `https://scoutxsecurity.com/locations/${resolvedParams.locationSlug}`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: svc.title,
                  item: `https://scoutxsecurity.com/locations/${resolvedParams.locationSlug}/${resolvedParams.serviceSlug}`,
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: combinedFaqs.map((faq) => ({
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
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A93A6] mb-6 flex-wrap">
            <Link href="/" title="Home" className="hover:text-white transition-colors">Home</Link>
            <span className="text-[#2A3550]">/</span>
            <Link href={`/locations/${resolvedParams.locationSlug}`} title={`Security in ${loc.name}`} className="hover:text-white transition-colors">
              {loc.shortName}
            </Link>
            <span className="text-[#2A3550]">/</span>
            <span className="text-[#4A8FD4]">{svc.shortTitle}</span>
          </nav>

          <span className="section-label">{svc.icon} {svc.badge} • {loc.name}</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase text-white mb-4">
            {svc.title} in <span className="text-gradient-steel">{loc.shortName}</span>
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-base sm:text-lg max-w-3xl mx-auto mt-6 mb-8 leading-relaxed">
            Deploy police-verified, highly trained {svc.shortTitle.toLowerCase()} tailored for commercial establishments, retail showrooms, societies, and facilities in {loc.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact#quote" title={`Request quote for ${svc.title} in ${loc.shortName}`} className="btn-primary text-base px-8 py-4">
              Get {svc.shortTitle} Quote
            </Link>
            <a href="tel:+918682066666" title="Call ScoutX Security Director" className="btn-secondary text-base px-8 py-4">
              📞 86820 66666
            </a>
          </div>
        </div>
      </section>

      {/* Main Details & Lead Form */}
      <section className="py-20 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-start">

          {/* Left Col: Responsibilities & Site Challenges */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#050914] p-8 rounded-xl border border-[rgba(192,192,192,0.1)]">
              <h2 className="font-heading text-2xl font-bold uppercase text-white mb-4">
                About Our <span className="text-gradient-steel">{svc.title}</span> Deployment in {loc.shortName}
              </h2>
              <p className="text-[#A8A8A8] leading-relaxed mb-6">
                {svc.description}
              </p>
              <p className="text-[#8A93A6] text-sm leading-relaxed border-l-2 border-[#2E6FBF] pl-4">
                At <strong className="text-white">{loc.name}</strong>, our {svc.shortTitle.toLowerCase()} are equipped to mitigate localized risks including heavy customer flow, emergency evacuation, access control, and 24/7 supervisor oversight.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold uppercase text-[#E8E8E8] mb-4">
                Core Duties &amp; Responsibilities in {loc.shortName}
              </h3>
              <ul className="space-y-3">
                {svc.duties.map((duty, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#C0C0C0]">
                    <span className="text-[#2E6FBF] mt-1 shrink-0">→</span>
                    <span>{duty}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-4">
                Ideal Deployment Scenarios in {loc.shortName}:
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {svc.idealFor.map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#0A0F1F] rounded border border-[#1A2235] text-xs text-[#D0D0D0] flex items-center gap-2.5">
                    <span className="text-[#4A8FD4]">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Instant Quote Form */}
          <div className="lg:col-span-5 sticky top-24">
            <CityLeadForm cityName={`${svc.shortTitle} in ${loc.shortName}`} />
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <CertificationsSection title={`${svc.shortTitle} Compliance & Certifications in ${loc.city}`} />

      {/* 4 Localized FAQs */}
      <FAQSection
        title={`Frequently Asked Questions: ${svc.title} in ${loc.shortName}`}
        subtitle="DEPLOYMENT PROTOCOLS & COSTS"
        description={`Clear details on shift patterns, replacement guarantees, and equipment for ${svc.title.toLowerCase()} in ${loc.name}.`}
        faqs={combinedFaqs}
      />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Other Services at this Location */}
      <section className="py-14 px-4 sm:px-6 bg-[#0B0B0D] border-t border-[rgba(192,192,192,0.1)]">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-[#A8A8A8] mb-6">
            Other Security Services Available in {loc.shortName}:
          </h3>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {serviceSlugs.filter((s) => s !== resolvedParams.serviceSlug).map((slug) => (
              <Link
                key={slug}
                href={`/locations/${resolvedParams.locationSlug}/${slug}`}
                title={`${servicesData[slug].title} in ${loc.name}`}
                className="px-3.5 py-2 text-xs font-heading uppercase tracking-wider text-[#C0C0C0] bg-[#111827] border border-[rgba(192,192,192,0.2)] rounded hover:border-[#2E6FBF] hover:text-white transition-all"
              >
                {servicesData[slug].shortTitle} in {loc.shortName}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
