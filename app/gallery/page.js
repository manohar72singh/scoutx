// app/gallery/page.js

import Link from 'next/link';
import Image from 'next/image';
import FAQSection from '@/components/FAQSection';
import FadeIn from '@/components/FadeIn';

export const metadata = {
  title: 'Operational Gallery | ScoutX Security Guards on Duty in NCR',
  description: 'See ScoutX Protection Group\'s guards in action — on duty at residential societies, corporate offices, industrial sites, and events across Delhi NCR.',
  alternates: { canonical: 'https://scoutxsecurity.com/gallery' },
  openGraph: {
    url: 'https://scoutxsecurity.com/gallery',
    title: 'ScoutX Security Guard Gallery | Guards in Action in NCR',
    description: 'Photos and field deployments of our professional security guards on duty across NCR.',
    siteName: 'ScoutX Protection Group',
    type: 'website',
  }
};

const galleryItems = [
  { emoji: '🦺', label: 'Unarmed Society Guards on Duty', desc: 'Gate security & visitor screening at residential complex, Ghaziabad' },
  { emoji: '🔫', label: 'Armed Gunman Security Deployment', desc: 'Bank branch & cash-in-transit vault protection, Noida', img: '/services-armed.png' },
  { emoji: '👩‍✈️', label: 'Female Security Officers', desc: 'Hospital & women retail security team, Greater Noida', img: '/gallery-female-guard.png' },
  { emoji: '🎪', label: 'Event Security & Crowd Control Team', desc: 'Conference & exhibition perimeter protection, Delhi', img: '/gallery-event.png' },
  { emoji: '🏭', label: 'Industrial Factory & Warehouse Security', desc: 'Factory perimeter patrol and material gate pass verification, Ghaziabad' },
  { emoji: '🚗', label: 'Mobile Patrol Supervisor Unit', desc: 'Surprise midnight audit patrol vehicle, Noida', img: '/gallery-patrol.png' },
  { emoji: '🎓', label: 'Guard Tactical Training Drill', desc: 'Fire safety & physical drill session at Govindpuram Training Centre', img: '/gallery-training.png' },
  { emoji: '👔', label: 'Guard Uniform & Equipment Inspection', desc: 'Turnout inspection with photo ID, whistles, batons & torches' },
  { emoji: '📋', label: 'On-Site Security Supervisor Audit', desc: 'Digital GPS attendance check and register review' },
];

const galleryFaqs = [
  {
    q: 'Can client committees request an in-person site visit or guard demonstration before signing a contract?',
    a: 'Yes, ScoutX gladly arranges guided site visits to active society or corporate deployments across Ghaziabad and Noida, or brings a sample guard squad for committee review.',
  },
  {
    q: 'Are guards equipped with standard tactical gear and company uniforms as shown in the gallery?',
    a: 'Yes, every deployed security personnel is issued a customized ScoutX uniform, photo identification badge, shift register, flashlight, lanyard, whistle, and batons where permitted.',
  },
  {
    q: 'How frequently do ScoutX field managers conduct turnout inspections and uniform parades?',
    a: 'Field supervisors inspect guard turnouts daily during shift handovers and conduct surprise weekly uniform and equipment readiness audits.',
  },
];

export default function GalleryPage() {
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
                  name: 'Gallery',
                  item: 'https://scoutxsecurity.com/gallery',
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: galleryFaqs.map((faq) => ({
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
          <span className="section-label">Visual Proof</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase text-white mb-4">
            Our Guards <span className="text-gradient-steel">In Action</span>
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-lg max-w-2xl mx-auto mt-6">
            From gate duty to event management — see how ScoutX personnel operate across different deployment environments.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleryItems.map((item, i) => (
              <FadeIn
                key={i}
                delay={i * 0.1}
                direction="up"
                className="group relative overflow-hidden rounded-xl border border-[rgba(192,192,192,0.1)] cursor-pointer hover:border-[rgba(46,111,191,0.4)] transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                {/* Image or Placeholder */}
                {item.img ? (
                  <div className="h-56 relative overflow-hidden">
                    <Image
                      src={item.img}
                      alt={`ScoutX Operational Deployment: ${item.label}`}
                      title={item.label}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div
                    className="h-56 flex flex-col items-center justify-center gap-3 transition-transform duration-300 group-hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #0D1321, #111827)' }}
                  >
                    <span className="text-6xl">{item.emoji}</span>
                    <div className="text-[#A8A8A8] text-xs text-center px-4 font-body italic">
                      [Operational photo: {item.label}]
                    </div>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(transparent, rgba(10,15,31,0.95))' }}>
                  <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-white">{item.label}</h2>
                  <p className="text-[#A8A8A8] text-xs mt-1">{item.desc}</p>
                </div>

                {/* Caption */}
                <div className="p-4">
                  <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#E8E8E8]">{item.label}</h2>
                  <p className="text-[#A8A8A8] text-xs mt-1">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="mt-12 p-6 rounded-xl border border-dashed border-[rgba(192,192,192,0.2)] text-center">
            <p className="text-[#A8A8A8] text-sm mb-4">
              📸 <strong className="text-[#E8E8E8]">Operational Transparency:</strong> Live field photos from our client sites in Ghaziabad, Noida, and Greater Noida. Contact us to schedule a site demonstration.
            </p>
            <Link href="/contact" title="Arrange a site demonstration" className="btn-secondary text-sm">
              Arrange a Site Visit
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 3 FAQs Section */}
      <FAQSection
        title="Frequently Asked Questions: Field Operations & Proof"
        subtitle="OPERATIONAL STANDARDS"
        description="Understanding our turnout inspections, equipment standards, and site verification."
        faqs={galleryFaqs}
      />
    </>
  );
}
