// app/careers/page.js

import Link from 'next/link';
import CareersClient from '@/components/CareersClient';
import FAQSection from '@/components/FAQSection';

export const metadata = {
  title: 'Security Careers & Guard Jobs in Ghaziabad, Noida & NCR | ScoutX',
  description:
    'Join ScoutX Protection Group — Apply for security guard, armed gunman, female security officer, supervisor, bouncer, and housekeeping jobs across Delhi NCR. Competitive pay, PF/ESIC & free training.',
  alternates: { canonical: 'https://scoutxsecurity.com/careers' },
  openGraph: {
    url: 'https://scoutxsecurity.com/careers',
    title: 'Security Careers & Guard Jobs in Delhi NCR | ScoutX',
    description: 'Apply for verified security guard, supervisor, and facility jobs in Ghaziabad, Noida, and NCR.',
    siteName: 'ScoutX Protection Group',
    type: 'website',
  }
};

const jobListings = [
  { title: 'Security Guard (Unarmed)', type: 'Full-Time / Part-Time' },
  { title: 'Security Guard (Gunman)', type: 'Full-Time' },
  { title: 'Female Security Guard', type: 'Full-Time / Part-Time' },
  { title: 'Female Security Officer', type: 'Full-Time' },
  { title: 'Security Supervisor', type: 'Full-Time' },
  { title: 'Operation Manager', type: 'Full-Time' },
  { title: 'PSO (Personal Security Officer)', type: 'Full-Time / Contractual' },
  { title: 'Professional Bouncer', type: 'Full-Time / Contractual' },
  { title: 'Housekeeping Staff', type: 'Full-Time / Part-Time' },
  { title: 'Private Detective / Field Investigator', type: 'Full-Time / Contractual' },
];

const careersFaqs = [
  {
    q: 'What are the basic eligibility criteria for joining ScoutX as a security guard?',
    a: 'Candidates must be minimum 18 years old, physically fit, possess valid government ID proof (Aadhaar/Voter ID), pass local police character verification, and complete our mandatory training.',
  },
  {
    q: 'Does ScoutX provide free uniforms, accommodation, and PF/ESIC benefits?',
    a: 'Yes. All active guards are provided complete uniforms and duty gear, statutory Provident Fund, ESIC healthcare coverage, and accommodation support at select NCR depots.',
  },
  {
    q: 'How long does the recruitment and training process take before placement?',
    a: 'After document verification and physical screening, candidates undergo our structured 160+ hour training module and are deployed within 7 to 10 days.',
  },
];

export default function CareersPage() {
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
                  name: 'Careers',
                  item: 'https://scoutxsecurity.com/careers',
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: careersFaqs.map((faq) => ({
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
          <span className="section-label">Join Our Team</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase text-white mb-4">
            Build a Career in <span className="text-gradient-steel">Security</span>
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-lg max-w-2xl mx-auto mt-6">
            Join India&apos;s most professional security team. We offer competitive pay, certified training, free uniforms, growth opportunities, and stable employment.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: '💰', label: 'Competitive Pay', sub: 'Monthly salary + overtime & bonuses' },
              { icon: '🎓', label: 'Free Certified Training', sub: '160+ hours certified by ex-defence staff' },
              { icon: '🏥', label: 'ESI/PF & Medical Cover', sub: 'Full statutory social security & insurance' },
            ].map((b) => (
              <div key={b.label} className="card-dark p-4 text-center">
                <div className="text-3xl mb-2">{b.icon}</div>
                <h3 className="font-heading text-sm font-bold uppercase text-[#E8E8E8]">{b.label}</h3>
                <div className="text-[#A8A8A8] text-xs mt-1">{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings & Interactive Form */}
      <section className="py-4 pb-16 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold uppercase text-white mb-6">
            Current Open <span className="text-gradient-steel">Job Positions</span>
          </h2>
          <div className="space-y-3 mb-12">
            {jobListings.map((job) => (
              <div key={job.title} className="card-dark p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading text-lg font-bold uppercase text-[#E8E8E8]">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="text-[#A8A8A8] text-xs flex items-center gap-1">
                      ⏱️ {job.type}
                    </span>
                  </div>
                </div>
                <a
                  href="#apply"
                  title={`Apply for ${job.title}`}
                  className="btn-primary text-xs uppercase tracking-wider px-5 py-2.5 shrink-0"
                >
                  Apply Now →
                </a>
              </div>
            ))}
          </div>

          {/* Interactive Form */}
          <CareersClient />
        </div>
      </section>

      {/* 3 FAQs Section */}
      <FAQSection
        title="Frequently Asked Questions: Guard Recruitment & Careers"
        subtitle="EMPLOYMENT GUIDELINES"
        description="Learn more about our hiring requirements, training modules, and employee benefits."
        faqs={careersFaqs}
      />
    </>
  );
}
