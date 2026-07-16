'use client';
// app/admin/leads/page.js

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

const STATUS_OPTIONS = ['new', 'contacted', 'in_progress', 'closed', 'rejected'];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const limit = 20;

  const fetchLeads = async () => {
    setLoading(true);
    const url = new URL('/api/admin/leads', window.location.origin);
    url.searchParams.set('page', page);
    url.searchParams.set('limit', limit);
    if (filter) url.searchParams.set('status', filter);
    const res = await fetch(url.toString());
    const data = await res.json();
    if (data.success) { setLeads(data.data); setTotal(data.total); }
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, [page, filter]);

  const updateStatus = async (id, status) => {
    await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchLeads();
  };

  const statusClass = (s) => {
    if (s === 'new') return 'status-new';
    if (s === 'contacted' || s === 'in_progress') return 'status-contacted';
    if (s === 'closed') return 'status-closed';
    return 'status-rejected';
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold uppercase text-white">Quote Leads</h1>
          <p className="text-[#A8A8A8] text-sm mt-1">{total} total submissions</p>
        </div>
        <select
          value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          className="form-input max-w-[160px]" style={{ background: '#111827' }}
        >
          <option value="">All Status</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="card-dark overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#A8A8A8]">Loading...</div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center text-[#A8A8A8]">No leads found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th><th>Company</th><th>Contact</th><th>Phone</th>
                  <th>City</th><th>Guards</th><th>Service</th><th>Date</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="text-[#A8A8A8]">#{lead.id}</td>
                    <td className="font-medium">{lead.company_name}</td>
                    <td>{lead.contact_person}</td>
                    <td>
                      <a href={`tel:${lead.phone}`} className="text-[#4A8FD4] hover:underline">{lead.phone}</a>
                    </td>
                    <td>{lead.city}</td>
                    <td>{lead.guards_needed || '—'}</td>
                    <td className="text-[#A8A8A8]">{lead.service_type || '—'}</td>
                    <td className="text-[#A8A8A8] text-xs">{new Date(lead.created_at).toLocaleDateString('en-IN')}</td>
                    <td>
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={`status-badge status-badge ${statusClass(lead.status)} bg-transparent border-0 cursor-pointer text-xs font-heading uppercase`}
                        style={{ background: 'transparent' }}
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="flex justify-center gap-2 mt-5">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary text-sm px-3 py-1.5 disabled:opacity-40">← Prev</button>
          <span className="text-[#A8A8A8] text-sm py-1.5">Page {page} of {Math.ceil(total / limit)}</span>
          <button onClick={() => setPage((p) => p + 1)} disabled={page >= Math.ceil(total / limit)} className="btn-secondary text-sm px-3 py-1.5 disabled:opacity-40">Next →</button>
        </div>
      )}
    </AdminLayout>
  );
}
