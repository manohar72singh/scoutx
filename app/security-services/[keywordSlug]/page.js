// app/security-services/[keywordSlug]/page.js — High-Intent SEO Keyword Landing Pages

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { keywordsData, keywordSlugs } from '@/lib/keywordsData';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CertificationsSection from '@/components/CertificationsSection';
import CityLeadForm from '@/components/CityLeadForm';
import FAQSection from '@/components/FAQSection';
import FadeIn from '@/components/FadeIn';

export async function generateStaticParams() {
  return keywordSlugs.map((slug) => ({ keywordSlug: slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const kw = keywordsData[resolvedParams.keywordSlug];
  if (!kw) return {};

  return {
    title: kw.metaTitle,
    description: kw.metaDesc,
    alternates: { canonical: `https://scoutxsecurity.com/security-services/${resolvedParams.keywordSlug}` },
    openGraph: {
      url: `https://scoutxsecurity.com/security-services/${resolvedParams.keywordSlug}`,
      title: kw.metaTitle,
      description: kw.metaDesc,
      siteName: 'ScoutX Protection Group',
      type: 'website',
    },
  };
}

export default async function KeywordLandingPage({ params }) {
  const resolvedParams = await params;
  const kw = keywordsData[resolvedParams.keywordSlug];
  if (!kw) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: kw.h1,
              serviceType: kw.targetKeyword,
              provider: {
                '@type': 'LocalBusiness',
                name: 'ScoutX Protection Group Pvt. Ltd.',
                url: 'https://scoutxsecurity.com',
                telephone: '+91-8682066666',
                email: 'scoutxsecurity@gmail.com',
              },
              areaServed: {
                '@type': 'State',
                name: 'Delhi NCR & Uttar Pradesh',
              },
              description: kw.metaDesc,
              url: `https://scoutxsecurity.com/security-services/${resolvedParams.keywordSlug}`,
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
                  name: 'Specialized Security',
                  item: 'https://scoutxsecurity.com/services',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: kw.targetKeyword,
                  item: `https://scoutxsecurity.com/security-services/${resolvedParams.keywordSlug}`,
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: kw.faqs.map((faq) => ({
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
            <Link href="/services" title="All Security Services" className="hover:text-white transition-colors">Services</Link>
            <span className="text-[#2A3550]">/</span>
            <span className="text-[#4A8FD4]">{kw.targetKeyword}</span>
          </nav>

          <span className="section-label">🛡️ PSARA LICENSED • GOVT. APPROVED AGENCY</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white mb-4 leading-tight">
            {kw.h1}
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-base sm:text-lg max-w-3xl mx-auto mt-6 mb-8 leading-relaxed">
            {kw.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact#quote" title="Request free security assessment" className="btn-primary text-base px-8 py-4">
              Get a Free Security Quote
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
            {['UP-PSARA Licensed Agency', '100% Police Verified Guards', 'ISO 9001:2015 Certified', '500+ Active Deployments', 'Same-Day Relief Guarantee'].map((t) => (
              <span key={t} className="trust-badge text-xs sm:text-sm text-[#E8E8E8]">✅ {t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content & Lead Form */}
      <section className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-start">

          {/* Left Col: Overview & Compliance Highlights */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#050914] p-8 rounded-xl border border-[rgba(192,192,192,0.1)]">
              <h2 className="font-heading text-2xl font-bold uppercase text-white mb-4">
                Operational Overview &amp; Compliance Standards
              </h2>
              <p className="text-[#A8A8A8] leading-relaxed mb-6">
                {kw.overview}
              </p>
              <div className="p-4 bg-[#0A0F1F] rounded-lg border border-[#1A2235] text-xs text-[#8A93A6]">
                💡 <strong className="text-white">Legal Protection Note:</strong> Engaging a verified PSARA-certified security agency ensures that your commercial premises and residential societies are fully covered for premises liability and insurance verification.
              </div>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold uppercase text-[#E8E8E8] mb-4">
                Key Compliance &amp; Operational Strengths
              </h3>
              <div className="space-y-3">
                {kw.complianceHighlights.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#050914] rounded-lg border border-[#1A2235]">
                    <h4 className="font-heading text-sm font-bold uppercase text-white mb-1 flex items-center gap-2">
                      <span className="text-[#4A8FD4]">✓</span> {item.title}
                    </h4>
                    <p className="text-xs text-[#8A93A6]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-4">
                Target Sectors &amp; Deployment Environments:
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {kw.targetSectors.map((sector, idx) => (
                  <div key={idx} className="p-3 bg-[#050914] rounded border border-[#1A2235] text-xs text-[#D0D0D0] flex items-center gap-2">
                    <span className="text-[#2E6FBF]">🏢</span>
                    <span>{sector}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Instant Quote Form */}
          <div className="lg:col-span-5 sticky top-24">
            <CityLeadForm cityName={kw.targetKeyword} />
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <CertificationsSection title={`${kw.targetKeyword} Compliance Credentials`} />

      {/* 4 Keyword FAQs */}
      <FAQSection
        title={`Frequently Asked Questions: ${kw.targetKeyword}`}
        subtitle="COMPLIANCE & HIRING FAQS"
        description="Essential details regarding licensing, vetting, and SLA deployment terms."
        faqs={kw.faqs}
      />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Other Targeted Keyword Landing Pages */}
      <section className="py-14 px-4 sm:px-6 bg-[#0B0B0D] border-t border-[rgba(192,192,192,0.1)]">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-[#A8A8A8] mb-6">
            Explore Other Specialized Security Solutions in NCR:
          </h3>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {keywordSlugs.filter((s) => s !== resolvedParams.keywordSlug).map((slug) => (
              <Link
                key={slug}
                href={`/security-services/${slug}`}
                title={keywordsData[slug].targetKeyword}
                className="px-3.5 py-2 text-xs font-heading uppercase tracking-wider text-[#C0C0C0] bg-[#111827] border border-[rgba(192,192,192,0.2)] rounded hover:border-[#2E6FBF] hover:text-white transition-all"
              >
                {keywordsData[slug].targetKeyword}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
