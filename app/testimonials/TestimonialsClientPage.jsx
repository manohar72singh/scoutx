'use client';
// app/testimonials/TestimonialsClientPage.jsx

import { useState, useEffect } from 'react';

const staticTestimonials = [
  { id: 1, client_name: 'Rajesh Sharma', client_company: 'Green Valley RWA, Ghaziabad', quote_text: 'ScoutX provided highly trained, disciplined guards for our society. Response time is excellent and the team is very professional. Highly recommended!' },
  { id: 2, client_name: 'Priya Mehta', client_company: 'TechCorp Pvt. Ltd., Noida', quote_text: 'We have been using ScoutX for our office premises for over a year. Their guards are punctual, well-uniformed, and always vigilant. Great service!' },
  { id: 3, client_name: 'Amit Verma', client_company: 'Verma Textile Mills, Greater Noida', quote_text: 'After switching to ScoutX, pilferage incidents in our factory dropped significantly. Their mobile patrol and supervisor checks give us real peace of mind.' },
  { id: 4, client_name: 'Sunita Agarwal', client_company: 'City Mall, Ghaziabad', quote_text: 'Managing weekend crowd at our mall was a nightmare before ScoutX. Now their well-trained security team handles it flawlessly every single time.' },
  { id: 5, client_name: 'Dr. Prakash Jain', client_company: 'Jain Multi-Specialty Hospital, Noida', quote_text: 'Hospital security requires sensitivity and firmness in equal measure. ScoutX understood this perfectly and deployed exactly the right mix of male and female guards for us.' },
  { id: 6, client_name: 'Mohan Kapoor', client_company: 'Kapoor Events Pvt. Ltd., Delhi', quote_text: 'We engaged ScoutX for a 2,000-person corporate event. Their event security team was professional, coordinated, and the client had zero complaints. Will use again.' },
];

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="pt-6">
                <p className="text-[#D0D0D0] leading-relaxed italic text-sm mb-6">"{t.quote_text}"</p>
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
      </div>
    </section>
  );
}
