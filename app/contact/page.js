'use client';
// app/contact/page.js — Contact + Get a Quote forms

import { useState } from 'react';
import FadeIn from '@/components/FadeIn';

export default function ContactPage() {
  const API = '';

  // Quote form
  const [quoteForm, setQuoteForm] = useState({
    company_name: '', contact_person: '', phone: '', email: '',
    city: '', guards_needed: '', service_type: '', message: '', website: '',
  });
  const [quoteStatus, setQuoteStatus] = useState(null);
  const [quoteErrors, setQuoteErrors] = useState([]);

  // Contact form
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [contactStatus, setContactStatus] = useState(null);

  const serviceOptions = [
    'Security Guard', 'Security Guard (Gunman)', 'Female Security Guard',
    'Female Security Officer', 'Field Supervisor', 'PSO', 'Bouncer', 'Mixed / Multiple Services',
  ];

  const handleQuoteChange = (e) => setQuoteForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleContactChange = (e) => setContactForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submitQuote = async (e) => {
    e.preventDefault();
    setQuoteStatus('loading');
    setQuoteErrors([]);
    try {
      const res = await fetch(`${API}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteForm),
      });
      const data = await res.json();
      if (data.success) {
        setQuoteStatus('success');
        setQuoteForm({ company_name: '', contact_person: '', phone: '', email: '', city: '', guards_needed: '', service_type: '', message: '', website: '' });
      } else {
        setQuoteStatus('error');
        setQuoteErrors(data.errors || [{ msg: data.message }]);
      }
    } catch {
      setQuoteStatus('error');
      setQuoteErrors([{ msg: 'Network error. Please try again.' }]);
    }
  };

  const submitContact = async (e) => {
    e.preventDefault();
    setContactStatus('loading');
    // For the simple contact form, re-use leads endpoint with minimal fields
    try {
      const res = await fetch(`${API}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: contactForm.name,
          contact_person: contactForm.name,
          phone: contactForm.phone || '0000000000',
          email: contactForm.email,
          city: 'General',
          message: contactForm.message,
          service_type: 'General Enquiry',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setContactStatus('success');
        setContactForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setContactStatus('error');
      }
    } catch {
      setContactStatus('error');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="section-label">Get in Touch</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase text-white mb-4">
            Contact &amp; <span className="text-gradient-steel">Get a Quote</span>
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-lg max-w-2xl mx-auto mt-6">
            Reach us via phone, WhatsApp, or email — or fill in the quote form below and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact info bar */}
      <section className="py-10 px-4 sm:px-6" style={{ background: '#0B0B0D', borderBottom: '1px solid rgba(192,192,192,0.1)' }}>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4">
          <FadeIn delay={0.1} direction="up">
            <a href="tel:+918682066666" className="card-dark p-5 text-center hover:border-[#4A8FD4] hover:shadow-[0_0_15px_rgba(74,143,212,0.2)] hover:-translate-y-1 transition-all duration-300 group block">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📞</div>
            <div className="font-heading text-xs font-bold uppercase tracking-wider text-[#C0C0C0] mb-1">Ashok Choudhary</div>
            <div className="font-heading text-xl font-bold text-white group-hover:text-[#4A8FD4] transition-colors">+91 86820 66666</div>
              <div className="text-[#A8A8A8] text-xs mt-1">Tap to call</div>
            </a>
          </FadeIn>
          <FadeIn delay={0.2} direction="up">
            <a href="tel:+917611865555" className="card-dark p-5 text-center hover:border-[#4A8FD4] hover:shadow-[0_0_15px_rgba(74,143,212,0.2)] hover:-translate-y-1 transition-all duration-300 group block">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📞</div>
            <div className="font-heading text-xs font-bold uppercase tracking-wider text-[#C0C0C0] mb-1">Anil Choudhary</div>
            <div className="font-heading text-xl font-bold text-white group-hover:text-[#4A8FD4] transition-colors">+91 76118 65555</div>
              <div className="text-[#A8A8A8] text-xs mt-1">Tap to call</div>
            </a>
          </FadeIn>
          <FadeIn delay={0.3} direction="up">
            <a
              href="https://wa.me/918682066666?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20security%20services."
              target="_blank" rel="noopener noreferrer"
              className="card-dark p-5 text-center hover:border-[#25D366] hover:shadow-[0_0_15px_rgba(37,211,102,0.2)] hover:-translate-y-1 transition-all duration-300 group block"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">💬</div>
            <div className="font-heading text-xs font-bold uppercase tracking-wider text-[#C0C0C0] mb-1">WhatsApp</div>
            <div className="font-heading text-xl font-bold text-[#25D366] group-hover:text-[#20BA5A] transition-colors">Quick Quote</div>
              <div className="text-[#A8A8A8] text-xs mt-1">Instant response</div>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Forms */}
      <section className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

          {/* Quote Form (Primary) */}
          <FadeIn direction="left" delay={0.2} className="lg:col-span-2">
            <div id="quote" className="card-dark p-8 scroll-mt-24 focus-within:border-[#2E6FBF] focus-within:shadow-[0_0_20px_rgba(46,111,191,0.15)] transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded flex items-center justify-center text-sm" style={{ background: 'rgba(46,111,191,0.3)' }}>📋</div>
              <div>
                <h2 className="font-heading text-2xl font-bold uppercase text-white">Request a Security Quote</h2>
                <p className="text-[#A8A8A8] text-xs">Primary conversion form — we respond within 24 hours</p>
              </div>
            </div>

            {quoteStatus === 'success' && (
              <div className="mb-6 p-4 rounded-lg bg-green-900/30 border border-green-700/50 text-green-400 text-sm font-medium">
                ✅ Quote request submitted! Our team will contact you within 24 hours.
                <br /><span className="text-xs mt-1 block">For faster response: <a href="https://wa.me/918682066666" target="_blank" rel="noopener noreferrer" className="underline">WhatsApp us</a></span>
              </div>
            )}
            {quoteStatus === 'error' && quoteErrors.length > 0 && (
              <div className="mb-6 p-4 rounded-lg bg-red-900/30 border border-red-700/50 text-red-400 text-sm">
                {quoteErrors.map((e, i) => <p key={i}>❌ {e.msg}</p>)}
              </div>
            )}

            <form onSubmit={submitQuote} className="space-y-4" noValidate>
              {/* Honeypot */}
              <input type="text" name="website" value={quoteForm.website} onChange={handleQuoteChange} style={{ display: 'none' }} tabIndex={-1} />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company_name" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Company / Organisation Name *</label>
                  <input id="company_name" name="company_name" type="text" required value={quoteForm.company_name} onChange={handleQuoteChange} placeholder="ABC Pvt. Ltd." className="form-input" />
                </div>
                <div>
                  <label htmlFor="contact_person" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Your Name *</label>
                  <input id="contact_person" name="contact_person" type="text" required value={quoteForm.contact_person} onChange={handleQuoteChange} placeholder="Full name" className="form-input" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="q_phone" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Mobile Number *</label>
                  <input id="q_phone" name="phone" type="tel" required value={quoteForm.phone} onChange={handleQuoteChange} placeholder="10-digit mobile" className="form-input" />
                </div>
                <div>
                  <label htmlFor="q_email" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Email Address</label>
                  <input id="q_email" name="email" type="email" value={quoteForm.email} onChange={handleQuoteChange} placeholder="your@company.com" className="form-input" />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">City *</label>
                  <input id="city" name="city" type="text" required value={quoteForm.city} onChange={handleQuoteChange} placeholder="Ghaziabad / Noida" className="form-input" />
                </div>
                <div>
                  <label htmlFor="guards_needed" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Guards Needed</label>
                  <input id="guards_needed" name="guards_needed" type="number" min="1" value={quoteForm.guards_needed} onChange={handleQuoteChange} placeholder="e.g. 5" className="form-input" />
                </div>
                <div>
                  <label htmlFor="service_type" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Service Type</label>
                  <select id="service_type" name="service_type" value={quoteForm.service_type} onChange={handleQuoteChange} className="form-input" style={{ background: '#111827' }}>
                    <option value="">-- Select --</option>
                    {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="q_message" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Additional Requirements</label>
                <textarea id="q_message" name="message" rows={4} value={quoteForm.message} onChange={handleQuoteChange} placeholder="Describe your premises, shift timings, any special requirements..." className="form-input resize-none" />
              </div>

              <button
                type="submit"
                id="quote-submit-btn"
                disabled={quoteStatus === 'loading'}
                className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60"
              >
                {quoteStatus === 'loading' ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Submitting...</>
                ) : '📋 Get My Free Security Quote'}
              </button>
            </form>
          </div>
          </FadeIn>

          {/* Sidebar: Contact form + address */}
          <FadeIn direction="right" delay={0.3} className="space-y-6">
            {/* Simple contact */}
            <div className="card-dark p-6 focus-within:border-[#2E6FBF] focus-within:shadow-[0_0_20px_rgba(46,111,191,0.15)] transition-all duration-500">
              <h3 className="font-heading text-lg font-bold uppercase text-white mb-4">General Enquiry</h3>
              {contactStatus === 'success' && (
                <div className="mb-4 p-3 rounded bg-green-900/30 border border-green-700/50 text-green-400 text-sm">✅ Message sent!</div>
              )}
              {contactStatus === 'error' && (
                <div className="mb-4 p-3 rounded bg-red-900/30 border border-red-700/50 text-red-400 text-sm">❌ Failed. Please try again.</div>
              )}
              <form onSubmit={submitContact} className="space-y-3" noValidate>
                <input id="c_name" name="name" type="text" required value={contactForm.name} onChange={handleContactChange} placeholder="Your name" className="form-input" />
                <input id="c_phone" name="phone" type="tel" value={contactForm.phone} onChange={handleContactChange} placeholder="Mobile number" className="form-input" />
                <input id="c_email" name="email" type="email" required value={contactForm.email} onChange={handleContactChange} placeholder="Email address" className="form-input" />
                <textarea id="c_message" name="message" rows={3} required value={contactForm.message} onChange={handleContactChange} placeholder="Your message..." className="form-input resize-none" />
                <button type="submit" id="contact-submit-btn" disabled={contactStatus === 'loading'} className="btn-secondary w-full justify-center disabled:opacity-60">
                  {contactStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Address card */}
            <div className="card-dark p-6 space-y-3 group hover:border-[#2E6FBF]/50 transition-all duration-300">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#C0C0C0]">Our Office</h3>
              <p className="text-[#A8A8A8] text-sm leading-relaxed">
                Shop No 1, Ground Floor,<br />H-39 KH No 1468, Govindpuram,<br />Ghaziabad, UP 201013
              </p>
              <a href="mailto:scoutxsecurity@gmail.com" className="flex items-center gap-2 text-[#A8A8A8] hover:text-white text-sm transition-colors">
                ✉️ scoutxsecurity@gmail.com
              </a>
              <div className="pt-2 overflow-hidden rounded-lg">
                <iframe
                  title="ScoutX Office Location"
                  src="https://maps.google.com/maps?q=Govindpuram,Ghaziabad,UP&z=14&output=embed"
                  width="100%"
                  height="180"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  className="group-hover:scale-105 transition-transform duration-700"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
