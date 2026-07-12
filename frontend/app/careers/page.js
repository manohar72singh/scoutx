'use client';
// app/careers/page.js

import { useState } from 'react';
import Link from 'next/link';

export default function CareersPage() {
  const [form, setForm] = useState({
    full_name: '', phone: '', email: '', position_applied: '', experience_years: '', website: '',
  });
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState([]);

  const positions = [
    'Unarmed Security Guard', 'Armed Security Guard', 'Bouncer', 'Female Security Guard',
    'Event Security Officer', 'Mobile Patrol Guard', 'Supervisor / Field Officer',
  ];

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrors([]);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (resume) fd.append('resume', resume);

    try {
      const res = await fetch(
        `/api/applications`,
        { method: 'POST', body: fd }
      );
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ full_name: '', phone: '', email: '', position_applied: '', experience_years: '', website: '' });
        setResume(null);
      } else {
        setStatus('error');
        setErrors(data.errors || [{ msg: data.message || 'Submission failed. Please try again.' }]);
      }
    } catch {
      setStatus('error');
      setErrors([{ msg: 'Network error. Please check your connection.' }]);
    }
  };

  const jobListings = [
    { title: 'Security Guard (Unarmed)', location: 'Ghaziabad / Noida', type: 'Full-Time / Part-Time', salary: '₹12,000 – ₹18,000/month' },
    { title: 'Security Guard (Armed)', location: 'Delhi NCR', type: 'Full-Time', salary: '₹18,000 – ₹28,000/month' },
    { title: 'Female Security Officer', location: 'Ghaziabad / Greater Noida', type: 'Full-Time', salary: '₹12,000 – ₹16,000/month' },
    { title: 'Event Security Officer', location: 'Delhi NCR', type: 'Contractual', salary: '₹800 – ₹1,200/day' },
    { title: 'Field Supervisor', location: 'Ghaziabad', type: 'Full-Time', salary: '₹22,000 – ₹30,000/month' },
  ];

  return (
    <>
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
            Join India's most professional security team. We offer competitive pay, training, uniform, growth opportunities, and stable employment.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { icon: '💰', label: 'Competitive Pay', sub: 'Monthly salary + overtime' },
              { icon: '🎓', label: 'Free Training', sub: '160+ hours certified' },
              { icon: '👔', label: 'Free Uniform', sub: 'Full kit on joining' },
              { icon: '🏥', label: 'ESI/PF Benefits', sub: 'Govt. social security' },
            ].map((b) => (
              <div key={b.label} className="card-dark p-4 text-center">
                <div className="text-3xl mb-2">{b.icon}</div>
                <div className="font-heading text-sm font-bold uppercase text-[#E8E8E8]">{b.label}</div>
                <div className="text-[#A8A8A8] text-xs mt-1">{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-4 pb-16 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold uppercase text-white mb-6">
            Open <span className="text-gradient-steel">Positions</span>
          </h2>
          <div className="space-y-3 mb-12">
            {jobListings.map((job) => (
              <div key={job.title} className="card-dark p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading text-lg font-bold uppercase text-[#E8E8E8]">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="text-[#A8A8A8] text-xs flex items-center gap-1">
                      📍 {job.location}
                    </span>
                    <span className="text-[#A8A8A8] text-xs flex items-center gap-1">
                      ⏱️ {job.type}
                    </span>
                    <span className="text-[#4A8FD4] text-xs font-semibold flex items-center gap-1">
                      💰 {job.salary}
                    </span>
                  </div>
                </div>
                <a
                  href="#apply"
                  className="btn-primary text-sm shrink-0"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>

          {/* Application Form */}
          <div id="apply" className="card-dark p-8 scroll-mt-24">
            <h2 className="font-heading text-2xl font-bold uppercase text-white mb-2">
              Submit Your Application
            </h2>
            <p className="text-[#A8A8A8] text-sm mb-6">Fill in your details and upload your resume (PDF/DOC, max 5MB). Our HR team will contact you within 3 working days.</p>

            {status === 'success' && (
              <div className="mb-6 p-4 rounded-lg bg-green-900/30 border border-green-700/50 text-green-400 text-sm font-medium">
                ✅ Application submitted successfully! We'll review your profile and contact you within 3 working days.
              </div>
            )}
            {status === 'error' && errors.length > 0 && (
              <div className="mb-6 p-4 rounded-lg bg-red-900/30 border border-red-700/50 text-red-400 text-sm">
                {errors.map((err, i) => <p key={i}>❌ {err.msg}</p>)}
              </div>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5" noValidate>
              {/* Honeypot */}
              <input type="text" name="website" value={form.website} onChange={handleChange} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="full_name" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Full Name *</label>
                  <input
                    id="full_name" name="full_name" type="text" required
                    value={form.full_name} onChange={handleChange}
                    placeholder="Your full name"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Mobile Number *</label>
                  <input
                    id="phone" name="phone" type="tel" required
                    value={form.phone} onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Email Address</label>
                  <input
                    id="email" name="email" type="email"
                    value={form.email} onChange={handleChange}
                    placeholder="your@email.com (optional)"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="position_applied" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Position Applied For *</label>
                  <select
                    id="position_applied" name="position_applied" required
                    value={form.position_applied} onChange={handleChange}
                    className="form-input"
                    style={{ background: '#111827' }}
                  >
                    <option value="">-- Select Position --</option>
                    {positions.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="experience_years" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Years of Security Experience *</label>
                  <input
                    id="experience_years" name="experience_years" type="number" min="0" max="50" required
                    value={form.experience_years} onChange={handleChange}
                    placeholder="0 if fresher"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="resume" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Upload Resume (PDF/DOC, max 5MB)</label>
                  <input
                    id="resume" name="resume" type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files[0])}
                    className="form-input cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-heading file:font-bold file:uppercase file:bg-[rgba(46,111,191,0.3)] file:text-[#4A8FD4] hover:file:bg-[rgba(46,111,191,0.5)]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                id="careers-submit-btn"
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : '🚀 Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
