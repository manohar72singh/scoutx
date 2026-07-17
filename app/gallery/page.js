// app/gallery/page.js
// Placeholder gallery — replace images with real photos when supplied

import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';

export const metadata = {
  title: 'Gallery | ScoutX Guards in Action in NCR',
  description: 'See ScoutX Protection Group\'s guards in action — on duty at residential societies, corporate offices, industrial sites, and events across Delhi NCR.',
  alternates: { canonical: 'https://www.scoutxsecurity.com/gallery' },
  openGraph: {
    url: 'https://www.scoutxsecurity.com/gallery',
    title: 'ScoutX Security Guard Gallery',
    description: 'Photos of our professional security guards on duty across NCR.',
  }
};

const galleryItems = [
  { emoji: '🦺', label: 'Unarmed Guards on Duty', desc: 'Gate security at residential complex, Ghaziabad' },
  { emoji: '🔫', label: 'Armed Guard Deployment', desc: 'Bank branch security, Noida', img: '/services-armed.png' },
  { emoji: '👩‍✈️', label: 'Female Security Officers', desc: 'Hospital security team, Greater Noida', img: '/gallery-female-guard.png' },
  { emoji: '🎪', label: 'Event Security Team', desc: 'Conference security, Delhi', img: '/gallery-event.png' },
  { emoji: '🏭', label: 'Industrial Security', desc: 'Factory perimeter patrol, Ghaziabad' },
  { emoji: '🚗', label: 'Mobile Patrol Unit', desc: 'Night patrol vehicle, Noida', img: '/gallery-patrol.png' },
  { emoji: '🎓', label: 'Guard Training Session', desc: 'Training centre, Govindpuram', img: '/gallery-training.png' },
  { emoji: '👔', label: 'Guard Uniform & Equipment', desc: 'Uniform parade — annual inspection' },
  { emoji: '📋', label: 'Supervisor Audit', desc: 'Field supervisor conducting attendance check' },
];

export default function GalleryPage() {
  return (
    <>
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
                      alt={item.label} 
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
                      [Real photo to be inserted]
                    </div>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(transparent, rgba(10,15,31,0.95))' }}>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">{item.label}</h3>
                  <p className="text-[#A8A8A8] text-xs mt-1">{item.desc}</p>
                </div>

                {/* Caption */}
                <div className="p-4">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#E8E8E8]">{item.label}</h3>
                  <p className="text-[#A8A8A8] text-xs mt-1">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="mt-12 p-6 rounded-xl border border-dashed border-[rgba(192,192,192,0.2)] text-center">
            <p className="text-[#A8A8A8] text-sm mb-4">
              📸 <strong className="text-[#E8E8E8]">Placeholder Notice:</strong> Real operational photos will be added here once supplied by the client. Contact us to see actual on-site demonstrations.
            </p>
            <Link href="/contact" className="btn-secondary text-sm">
              Arrange a Site Visit
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
