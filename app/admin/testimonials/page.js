'use client';
// app/admin/testimonials/page.js

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

const empty = { client_name: '', client_company: '', quote_text: '', is_featured: false };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const API = '';



  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/admin/testimonials`);
    const data = await res.json();
    if (data.success) setItems(data.data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const method = editing ? 'PUT' : 'POST';
    const url = editing
      ? `${API}/api/admin/testimonials/${editing}`
      : `${API}/api/admin/testimonials`;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMsg(data.message || (data.success ? 'Saved!' : 'Error'));
    setSaving(false);
    if (data.success) { setForm(empty); setEditing(null); fetchItems(); }
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`${API}/api/admin/testimonials/${id}`, {
      method: 'DELETE'
    });
    fetchItems();
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({ client_name: item.client_name, client_company: item.client_company || '', quote_text: item.quote_text, is_featured: !!item.is_featured });
    setMsg('');
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold uppercase text-white">Testimonials</h1>
        <p className="text-[#A8A8A8] text-sm mt-1">Add, edit, or remove client testimonials shown on the website.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="card-dark p-6">
          <h2 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-4">
            {editing ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h2>
          {msg && <div className="mb-4 p-3 rounded bg-blue-900/30 border border-blue-700/50 text-[#4A8FD4] text-sm">{msg}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Client Name *</label>
              <input required value={form.client_name} onChange={(e) => setForm((f) => ({ ...f, client_name: e.target.value }))} placeholder="e.g. Rajesh Sharma" className="form-input" />
            </div>
            <div>
              <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Company / Organisation</label>
              <input value={form.client_company} onChange={(e) => setForm((f) => ({ ...f, client_company: e.target.value }))} placeholder="e.g. Green Valley RWA" className="form-input" />
            </div>
            <div>
              <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Testimonial Quote *</label>
              <textarea required rows={4} value={form.quote_text} onChange={(e) => setForm((f) => ({ ...f, quote_text: e.target.value }))} placeholder="Client's feedback..." className="form-input resize-none" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))} className="w-4 h-4 accent-[#2E6FBF]" />
              <span className="text-[#C0C0C0] text-sm">Feature on homepage</span>
            </label>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                {saving ? 'Saving...' : editing ? '💾 Update' : '➕ Add'}
              </button>
              {editing && (
                <button type="button" onClick={() => { setEditing(null); setForm(empty); setMsg(''); }} className="btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div>
          <h2 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-4">All Testimonials ({items.length})</h2>
          {loading ? (
            <div className="text-[#A8A8A8]">Loading...</div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="card-dark p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="font-heading text-sm font-bold uppercase text-[#E8E8E8]">{item.client_name}</div>
                      {item.client_company && <div className="text-[#A8A8A8] text-xs">{item.client_company}</div>}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {item.is_featured && <span className="status-badge status-closed text-[0.6rem]">Featured</span>}
                      <button onClick={() => startEdit(item)} className="text-[#4A8FD4] hover:text-white text-xs font-heading uppercase">Edit</button>
                      <button onClick={() => deleteItem(item.id)} className="text-red-400 hover:text-red-300 text-xs font-heading uppercase">Del</button>
                    </div>
                  </div>
                  <p className="text-[#A8A8A8] text-xs italic leading-relaxed line-clamp-2">"{item.quote_text}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
