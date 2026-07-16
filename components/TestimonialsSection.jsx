'use client';
// components/TestimonialsSection.jsx — Fetches from backend API or uses static fallback

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const staticTestimonials = [
  {
    id: 1,
    client_name: 'Rajesh Sharma',
    client_company: 'Green Valley RWA, Ghaziabad',
    quote_text:
      'ScoutX provided highly trained, disciplined guards for our society. Response time is excellent and the team is very professional. Highly recommended!',
  },
  {
    id: 2,
    client_name: 'Priya Mehta',
    client_company: 'TechCorp Pvt. Ltd., Noida',
    quote_text:
      'We have been using ScoutX for our office premises for over a year. Their guards are punctual, well-uniformed, and always vigilant. Great service!',
  },
  {
    id: 3,
    client_name: 'Amit Verma',
    client_company: 'Verma Textile Mills, Greater Noida',
    quote_text:
      'After switching to ScoutX, pilferage incidents in our factory dropped significantly. Their mobile patrol and supervisor checks give us real peace of mind.',
  },
  {
    id: 4,
    client_name: 'Sunita Agarwal',
    client_company: 'City Mall, Ghaziabad',
    quote_text:
      'Managing weekend crowd at our mall was a nightmare before ScoutX. Now their well-trained security team handles it flawlessly every single time.',
  },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(staticTestimonials);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Try fetching from backend; fall back to static data on error
    fetch(`/api/testimonials?featured=true`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.data?.length) setTestimonials(data.data);
      })
      .catch(() => {/* use static */});
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [testimonials.length]);

  const goTo = (idx) => {
    clearInterval(intervalRef.current);
    setCurrent(idx);
  };

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#0B0B0D] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2E6FBF]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#2E6FBF] text-xs font-bold uppercase tracking-[0.2em]">Client Stories</span>
          <h2 className="font-heading text-4xl md:text-5xl font-black uppercase text-white mt-2">
            WHAT OUR <span className="text-[#2E6FBF]">CLIENTS SAY</span>
          </h2>
          <div className="w-16 h-1 bg-[#2E6FBF] mx-auto mt-6" />
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden px-4 md:px-12">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((t) => (
              <div key={t.id} className="min-w-full px-2 md:px-4">
                <div className="bg-[#111827] border border-[#1A2235] rounded-lg p-8 md:p-10 relative group hover:border-[#2E6FBF]/30 transition-colors">
                  {/* Big Quote Icon */}
                  <div className="absolute top-6 right-8 text-7xl text-[#1E293B] font-serif leading-none opacity-50 group-hover:text-[#2E6FBF]/20 transition-colors">"</div>
                  
                  <div className="relative z-10">
                    <p className="text-[#A8A8A8] text-base md:text-lg leading-relaxed italic mb-8">
                      "{t.quote_text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded bg-[#0A0F1F] border border-[#1A2235] flex items-center justify-center font-heading font-bold text-[#4A8FD4] text-lg shrink-0"
                      >
                        {t.client_name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-heading text-base font-bold uppercase tracking-wider text-white">
                          {t.client_name}
                        </div>
                        {t.client_company && (
                          <div className="text-[#2E6FBF] text-xs font-bold uppercase tracking-wider mt-0.5">
                            {t.client_company}
                          </div>
                        )}
                      </div>
                      {/* Stars */}
                      <div className="ml-auto flex gap-1 text-[#2E6FBF] text-sm">
                        ★★★★★
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-10 bg-[#2E6FBF]' : 'w-2 bg-[#1A2235] hover:bg-[#2E6FBF]/50'
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/testimonials" className="bg-transparent border border-[#2E6FBF] text-[#4A8FD4] hover:bg-[#2E6FBF] hover:text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded inline-flex transition-colors">
            READ ALL TESTIMONIALS
          </Link>
        </div>
      </div>
    </section>
  );
}
