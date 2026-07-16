'use client';
import { useState } from 'react';

export default function CityLeadForm({ cityName }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    requirement: '',
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          requirement: formData.requirement,
          source: `${cityName} SEO Page`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ fullName: '', phone: '', email: '', requirement: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="card-dark p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="font-heading text-xl font-bold text-white mb-2">Request Received!</h3>
        <p className="text-[#A8A8A8] text-sm">
          Thank you. Our security expert in {cityName} will call you back within 2 hours.
        </p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-[#2E6FBF] text-sm hover:underline">
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="card-dark p-8 border-t-4 border-[#2E6FBF]">
      <h3 className="font-heading text-xl font-bold text-white mb-2 uppercase">Request a Free Quote</h3>
      <p className="text-[#A8A8A8] text-sm mb-6">Need security guards in {cityName}? Fill out the form below for a quick estimate.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            required
            placeholder="Your Name *"
            className="form-input"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
        <div>
          <input
            type="tel"
            required
            placeholder="Phone Number *"
            className="form-input"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address (Optional)"
            className="form-input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <textarea
            required
            placeholder="Tell us about your security requirements..."
            className="form-input min-h-[100px]"
            value={formData.requirement}
            onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
          />
        </div>
        
        {status === 'error' && (
          <div className="text-red-400 text-sm">Something went wrong. Please call us directly.</div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full py-4 text-sm disabled:opacity-50"
        >
          {status === 'loading' ? 'SUBMITTING...' : `GET SECURED IN ${cityName.toUpperCase()}`}
        </button>
      </form>
    </div>
  );
}
