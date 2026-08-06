'use client';
// app/testimonials/TestimonialsClientPage.jsx

import { useState, useEffect } from 'react';

const staticTestimonials = [];

export default function TestimonialsClientPage() {
  const [testimonials, setTestimonials] = useState(staticTestimonials);

  useEffect(() => {
    fetch(`/api/testimonials`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data?.data?.length) setTestimonials(data.data); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
      <div className="max-w-6xl mx-auto">
      {testimonials.length === 0 ? (
        <div className="text-center py-20 text-[#A8A8A8]">
          No testimonials available yet. Client feedback will be updated here shortly!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="pt-6">
                <p className="text-[#D0D0D0] leading-relaxed italic text-sm mb-6">&quot;{t.quote_text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-white text-sm shrink-0"
                    style={{ background: 'linear-gradient(135deg, #1E4D8C, #2E6FBF)' }}
                  >
                    {t.client_name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-heading text-sm font-bold uppercase tracking-wider text-[#E8E8E8]">{t.client_name}</div>
                    {t.client_company && <div className="text-[#A8A8A8] text-xs">{t.client_company}</div>}
                  </div>
                  <div className="ml-auto text-yellow-400 text-xs">★★★★★</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </section>
  );
}
