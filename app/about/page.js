// app/about/page.js

import Link from 'next/link';
import Image from 'next/image';
import LogoSVG from '@/components/LogoSVG';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import OurClientsSection from '@/components/OurClientsSection';
import CertificationsSection from '@/components/CertificationsSection';
import FAQSection from '@/components/FAQSection';

export const metadata = {
  title: 'About Us | ScoutX Protection Group in NCR',
  description:
    'Learn about ScoutX Protection Group Pvt. Ltd. — our founding story, mission, leadership, and commitment to PSARA-compliant security in Ghaziabad and Delhi NCR.',
  alternates: { canonical: 'https://scoutxsecurity.com/about' },
  openGraph: {
    url: 'https://scoutxsecurity.com/about',
    title: 'About ScoutX Protection Group | PSARA Licensed Agency',
    description: 'Our founding story, mission, leadership, and commitment to PSARA-compliant security across Delhi NCR.',
    siteName: 'ScoutX Protection Group',
    type: 'website',
  }
};

const values = [
  { icon: '⚖️', title: 'Compliance First', desc: 'We operate strictly under PSARA guidelines, ensuring full legal protection for every client contract.' },
  { icon: '🎯', title: 'Zero Compromise', desc: 'Every guard deployed meets our stringent vetting, training, and conduct standards — no exceptions.' },
  { icon: '🤝', title: 'Client Partnership', desc: 'We are not just a vendor. We become your long-term security partner, adapting as your needs evolve.' },
  { icon: '⚡', title: '24/7 Accountability', desc: 'Supervisor rounds, GPS attendance, and dedicated point-of-contact ensure continuous service quality.' },
];

const aboutFaqs = [
  {
    q: 'When was ScoutX Protection Group established and where is it headquartered?',
    a: 'ScoutX Protection Group Pvt. Ltd. was founded to provide military-grade private security and is headquartered with its central operational command in Govindpuram, Ghaziabad, operating across the entire Delhi NCR region.',
  },
  {
    q: 'How does ScoutX verify the credentials and criminal background of its guards?',
    a: 'Every candidate undergoes mandatory local police background checks, residence verification, physical fitness drills, and 160+ hours of certified tactical training before on-site placement.',
  },
  {
    q: 'What makes ScoutX different from unorganized local security guard vendors?',
    a: 'ScoutX operates under a legitimate Government UP-PSARA license, provides statutory ESIC/EPF benefits, comprehensive Workmen’s Compensation insurance, 24/7 mobile supervisor checks, and guaranteed same-day guard replacement.',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'AboutPage',
              name: 'About ScoutX Protection Group',
              description: 'Our founding story, mission, leadership, and commitment to PSARA-compliant security.',
              url: 'https://scoutxsecurity.com/about',
              mainEntity: {
                '@type': 'LocalBusiness',
                name: 'ScoutX Protection Group Pvt. Ltd.',
                url: 'https://scoutxsecurity.com',
                telephone: '+91-8682066666',
                email: 'scoutxsecurity@gmail.com',
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
                  name: 'About Us',
                  item: 'https://scoutxsecurity.com/about',
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: aboutFaqs.map((faq) => ({
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
      {/* Page Hero */}
      <section className="relative w-full overflow-hidden min-h-[60vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-100">
          <Image
            src="/about.jpeg"
            alt="ScoutX Security Guard Team in Ghaziabad"
            title="ScoutX Professional Security Team"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050914]/90 via-[#050914]/50 to-[#0B0B0D]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center mt-10">
          <span className="section-label shadow-lg bg-black/50">Our Story</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase text-white mb-4 drop-shadow-2xl">
            About <span className="text-gradient-steel">ScoutX</span>
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#E8E8E8] text-lg max-w-2xl mx-auto mt-6 font-medium drop-shadow-lg">
            Born from a vision to bring military-grade professionalism to private security services in India.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-label">Who We Are</span>
            <h2 className="font-heading text-4xl font-bold uppercase text-white mb-6">
              Redefining Security Standards in <span className="text-gradient-steel">UP &amp; Delhi NCR</span>
            </h2>
            <div className="space-y-4 text-[#A8A8A8] leading-relaxed">
              <p>
                ScoutX Protection Group Pvt. Ltd. was founded with a single conviction — that quality private security should not be a privilege reserved for MNCs and large enterprises. Residential societies, mid-sized factories, regional hospitals, and local events deserve the same level of professional, compliant, and reliable protection.
              </p>
              <p>
                Operating under the <strong className="text-[#E8E8E8]">Private Security Agencies Regulation Act (PSARA)</strong>, we are a fully government-licensed security agency headquartered in Govindpuram, Ghaziabad, serving clients across the NCR region.
              </p>
              <p>
                Our guards are not simply watchmen — they are trained security professionals who undergo rigorous background verification, physical fitness assessment, and 160+ hours of classroom and practical training before their first deployment.
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <Link href="/contact#quote" title="Request a security quote" className="btn-primary">Get a Quote</Link>
              <Link href="/why-choose-us" title="Review our credentials" className="btn-secondary">Our Credentials</Link>
            </div>
          </div>

          {/* Stats panel */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '500+', label: 'Guards Deployed' },
              { value: '5+', label: 'Years Experience' },
              { value: '100+', label: 'Client Sites' },
              { value: '100%', label: 'Police Verified' },
            ].map((stat) => (
              <div key={stat.label} className="card-dark p-6 text-center">
                <div className="font-heading text-5xl font-bold text-gradient-steel mb-2">{stat.value}</div>
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#C0C0C0]">{stat.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="section-label">Our Purpose</span>
          <h2 className="font-heading text-4xl font-bold uppercase text-white mb-6">Mission &amp; Vision</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="card-dark p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-heading text-xl font-bold uppercase text-[#E8E8E8] mb-3">Our Mission</h3>
              <p className="text-[#A8A8A8] leading-relaxed">
                To provide every client with PSARA-compliant, police-verified security personnel who protect lives, assets, and reputations with professionalism, discipline, and round-the-clock accountability.
              </p>
            </div>
            <div className="card-dark p-8">
              <div className="text-4xl mb-4">🔭</div>
              <h3 className="font-heading text-xl font-bold uppercase text-[#E8E8E8] mb-3">Our Vision</h3>
              <p className="text-[#A8A8A8] leading-relaxed">
                To be the most trusted name in private security across Uttar Pradesh and Delhi NCR — recognised not just for our guard count, but for our zero-compromise standards and the peace of mind we deliver to every client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">Leadership</span>
            <h2 className="font-heading text-4xl font-bold uppercase text-white">
              Meet the <span className="text-gradient-silver">Directors</span>
            </h2>
            <div className="chrome-divider max-w-xs mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Ashok Choudhary',
                title: 'Director & Co-Founder',
                phone: '8682066666',
                bio: 'With extensive experience in security operations and business management, Ashok leads ScoutX\'s strategic growth, client relationships, and compliance framework. His hands-on approach ensures every client receives personalised attention and consistent service quality.',
              },
              {
                name: 'Anil Choudhary',
                title: 'Director & Co-Founder',
                phone: '7611865555',
                bio: 'Anil oversees guard recruitment, training, and field operations at ScoutX. His deep understanding of operational ground realities ensures that every guard deployed meets the company\'s stringent standards for discipline, conduct, and readiness.',
              },
            ].map((dir) => (
              <div key={dir.name} className="card-dark p-8">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center font-heading font-bold text-white text-2xl mb-4 glow-steel"
                  style={{ background: 'linear-gradient(135deg, #1E4D8C, #2E6FBF)' }}>
                  {dir.name.charAt(0)}
                </div>
                <h3 className="font-heading text-xl font-bold uppercase text-[#E8E8E8] mb-1">{dir.name}</h3>
                <h4 className="text-[#2E6FBF] text-sm font-heading uppercase tracking-wider mb-4">{dir.title}</h4>
                <p className="text-[#A8A8A8] text-sm leading-relaxed mb-4">{dir.bio}</p>
                <a
                  href={`tel:+91${dir.phone}`}
                  title={`Call Director ${dir.name}`}
                  className="inline-flex items-center gap-2 text-[#4A8FD4] text-sm hover:text-white transition-colors font-heading font-semibold"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +91 {dir.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">Core Values</span>
            <h2 className="font-heading text-4xl font-bold uppercase text-white">
              What We <span className="text-gradient-steel">Stand For</span>
            </h2>
            <div className="chrome-divider max-w-xs mx-auto mt-4" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="card-dark p-6 text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-heading text-base font-bold uppercase text-[#E8E8E8] mb-2">{v.title}</h3>
                <p className="text-[#A8A8A8] text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <CertificationsSection />

      {/* Our Clients */}
      <OurClientsSection />

      {/* 3 FAQs Section */}
      <FAQSection
        title="Frequently Asked Questions About ScoutX"
        subtitle="COMPANY & LEADERSHIP"
        description="Learn more about our licensing, training, and deployment standards."
        faqs={aboutFaqs}
      />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6" style={{ background: '#0B0B0D', borderTop: '1px solid rgba(192,192,192,0.1)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold uppercase text-white mb-4">
            Partner With ScoutX Today
          </h2>
          <p className="text-[#A8A8A8] mb-6">Get a customised security deployment plan for your premises within 24 hours.</p>
          <Link href="/contact#quote" title="Request a free customized security quote" className="btn-primary">Request a Free Quote</Link>
        </div>
      </section>
    </>
  );
}
