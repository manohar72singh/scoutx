'use client';
// app/admin/cta/page.js — Admin-editable homepage closing CTA section

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';

const empty = {
  eyebrow_text: '',
  heading_line1: '',
  heading_line2: '',
  description: '',
  primary_btn_text: '',
  primary_btn_link: '',
  whatsapp_btn_text: '',
  whatsapp_number: '',
  phone1_label: '',
  phone1_number: '',
  phone2_label: '',
  phone2_number: '',
};

export default function AdminCtaPage() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('success');
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState(null);
  const [removeHeroImage, setRemoveHeroImage] = useState(false);
  const fileInputRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/cta');
      const data = await res.json();
      if (data.success && data.data) {
        setForm({ ...empty, ...data.data });
        setHeroImagePreview(data.data.hero_image ? `/uploads/hero/${data.data.hero_image}` : null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleHeroImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroImageFile(file);
    setRemoveHeroImage(false);
    setHeroImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveHeroImage = () => {
    setHeroImageFile(null);
    setHeroImagePreview(null);
    setRemoveHeroImage(true);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'hero_image') return;
        formData.set(key, value ?? '');
      });
      if (heroImageFile) formData.set('hero_image', heroImageFile);
      if (removeHeroImage) formData.set('remove_hero_image', 'true');

      const res = await fetch('/api/admin/cta', { method: 'PUT', body: formData });
      const data = await res.json();
      setMsgType(data.success ? 'success' : 'error');
      if (data.success) {
        setHeroImageFile(null);
        setRemoveHeroImage(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchData();
      }
    } catch {
      setMsgType('error');
      setMsg('Connection error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const waLink = form.whatsapp_number ? `https://wa.me/${form.whatsapp_number.replace(/\D/g, '')}` : '#';

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold uppercase text-white">Homepage CTA</h1>
          <p className="text-[#A8A8A8] text-sm mt-1">Edit the closing call-to-action section shown at the bottom of the homepage.</p>
        </div>
        <Link href="/" target="_blank" className="btn-secondary text-sm">🌐 View Homepage ↗</Link>
      </div>

      {loading ? (
        <div className="text-[#A8A8A8]">Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="card-dark p-6">
            <h2 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-4">Edit CTA Content</h2>
            {msg && (
              <div className={`mb-4 p-3 rounded text-sm border ${
                msgType === 'success'
                  ? 'bg-blue-900/30 border-blue-700/50 text-[#4A8FD4]'
                  : 'bg-red-950/40 border-red-700/40 text-red-400'
              }`}>
                {msg}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Hero Background Image</label>
                {heroImagePreview && (
                  <div className="relative mb-2 rounded-lg overflow-hidden border border-[rgba(192,192,192,0.15)] aspect-video">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={heroImagePreview} alt="Hero preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={handleRemoveHeroImage}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-red-900/80 text-white text-xs px-2 py-1 rounded"
                    >
                      ✕ Remove
                    </button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/avif"
                  onChange={handleHeroImageChange}
                  className="form-input"
                />
                <p className="text-[#666] text-xs mt-1">JPEG, PNG, WEBP, GIF, or AVIF (Max 15MB). Leave empty to keep the current image.</p>
              </div>

              <div>
                <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Eyebrow Label</label>
                <input value={form.eyebrow_text} onChange={update('eyebrow_text')} placeholder="e.g. TAKE ACTION TODAY" className="form-input" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Heading Line 1 *</label>
                  <input required value={form.heading_line1} onChange={update('heading_line1')} placeholder="SECURE YOUR PREMISES" className="form-input" />
                </div>
                <div>
                  <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Heading Line 2 (highlighted)</label>
                  <input value={form.heading_line2} onChange={update('heading_line2')} placeholder="STARTING TODAY" className="form-input" />
                </div>
              </div>

              <div>
                <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Description</label>
                <textarea rows={3} value={form.description} onChange={update('description')} placeholder="Get a customized security deployment plan..." className="form-input resize-none" />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[rgba(192,192,192,0.08)]" />
                <span className="text-[#555] text-xs uppercase tracking-widest">Buttons</span>
                <div className="flex-1 h-px bg-[rgba(192,192,192,0.08)]" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Primary Button Text *</label>
                  <input required value={form.primary_btn_text} onChange={update('primary_btn_text')} placeholder="GET A FREE QUOTE" className="form-input" />
                </div>
                <div>
                  <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Primary Button Link *</label>
                  <input required value={form.primary_btn_link} onChange={update('primary_btn_link')} placeholder="/contact#quote" className="form-input" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">WhatsApp Button Text</label>
                  <input value={form.whatsapp_btn_text} onChange={update('whatsapp_btn_text')} placeholder="WHATSAPP US" className="form-input" />
                </div>
                <div>
                  <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">WhatsApp Number</label>
                  <input value={form.whatsapp_number} onChange={update('whatsapp_number')} placeholder="918682066666" className="form-input" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[rgba(192,192,192,0.08)]" />
                <span className="text-[#555] text-xs uppercase tracking-widest">Phone Numbers</span>
                <div className="flex-1 h-px bg-[rgba(192,192,192,0.08)]" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Phone 1 Name</label>
                  <input value={form.phone1_label} onChange={update('phone1_label')} placeholder="Ashok Choudhary" className="form-input" />
                </div>
                <div>
                  <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Phone 1 Number</label>
                  <input value={form.phone1_number} onChange={update('phone1_number')} placeholder="+91 86820 66666" className="form-input" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Phone 2 Name</label>
                  <input value={form.phone2_label} onChange={update('phone2_label')} placeholder="Anil Choudhary" className="form-input" />
                </div>
                <div>
                  <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Phone 2 Number</label>
                  <input value={form.phone2_number} onChange={update('phone2_number')} placeholder="+91 76118 65555" className="form-input" />
                </div>
              </div>

              <button type="submit" disabled={saving} className="btn-primary w-full justify-center py-3 text-sm disabled:opacity-60">
                {saving ? 'Saving...' : '💾 Save Changes'}
              </button>
            </form>
          </div>

          {/* Live Preview */}
          <div className="sticky top-8">
            <h2 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-4">Live Preview</h2>
            <div className="rounded-lg overflow-hidden border border-[rgba(192,192,192,0.1)]">
              <section className="py-16 px-6 relative overflow-hidden" style={{ background: '#050914' }}>
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#1A2235 1px, transparent 1px), linear-gradient(90deg, #1A2235 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: '0.2' }} />
                <div className="relative z-10 max-w-lg mx-auto text-center">
                  {form.eyebrow_text && (
                    <span className="text-[#2E6FBF] text-xs font-bold uppercase tracking-[0.2em]">{form.eyebrow_text}</span>
                  )}
                  <h2 className="font-heading text-3xl font-black uppercase mt-2 mb-4 leading-tight text-white">
                    {form.heading_line1 || 'YOUR HEADING HERE'} <br />
                    {form.heading_line2 && <span className="text-[#2E6FBF]">{form.heading_line2}</span>}
                  </h2>
                  {form.description && (
                    <p className="text-[#A8A8A8] text-sm max-w-md mx-auto mb-8">{form.description}</p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    {form.primary_btn_text && (
                      <span className="bg-[#2E6FBF] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded flex items-center gap-2">
                        {form.primary_btn_text} <span className="text-lg leading-none">→</span>
                      </span>
                    )}
                    {form.whatsapp_btn_text && (
                      <span className="bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded flex items-center gap-2">
                        {form.whatsapp_btn_text}
                      </span>
                    )}
                  </div>
                  {(form.phone1_number || form.phone2_number) && (
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[#8A93A6]">
                      {form.phone1_number && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#2E6FBF]">📞</span> {form.phone1_label}: <span className="text-white">{form.phone1_number}</span>
                        </div>
                      )}
                      {form.phone1_number && form.phone2_number && <span className="hidden sm:inline opacity-30">|</span>}
                      {form.phone2_number && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#25D366]">📞</span> {form.phone2_label}: <span className="text-white">{form.phone2_number}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>
            </div>
            {form.whatsapp_number && (
              <p className="text-[#555] text-xs mt-3">WhatsApp link preview: <span className="text-[#A8A8A8]">{waLink}</span></p>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
