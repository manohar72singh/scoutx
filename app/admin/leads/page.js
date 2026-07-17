'use client';
// app/admin/leads/page.js

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/AdminLayout';

const STATUS_OPTIONS = ['new', 'contacted', 'in_progress', 'closed', 'rejected'];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const limit = 20;

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const url = new URL('/api/admin/leads', window.location.origin);
    url.searchParams.set('page', page);
    url.searchParams.set('limit', limit);
    if (filter) url.searchParams.set('status', filter);
    if (search) url.searchParams.set('search', search);
    const res = await fetch(url.toString());
    const data = await res.json();
    if (data.success) { setLeads(data.data); setTotal(data.total); }
    setLoading(false);
  }, [page, filter, search]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => { setSearch(searchInput); setPage(1); }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const updateStatus = async (id, status) => {
    await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchLeads();
  };

  const deleteLead = async (id) => {
    if (!confirm('Are you sure you want to delete this lead? This action cannot be undone.')) return;
    await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
    fetchLeads();
  };

  const exportCSV = () => {
    const url = new URL('/api/admin/leads/export', window.location.origin);
    if (filter) url.searchParams.set('status', filter);
    window.open(url.toString(), '_blank');
  };

  const statusClass = (s) => {
    if (s === 'new') return 'status-new';
    if (s === 'contacted' || s === 'in_progress') return 'status-contacted';
    if (s === 'closed') return 'status-closed';
    return 'status-rejected';
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="font-heading text-3xl font-bold uppercase text-white">Quote Leads</h1>
            <p className="text-[#A8A8A8] text-sm mt-1">{total} result{total !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={exportCSV}
            className="btn-secondary text-sm px-4 py-2 flex items-center gap-2 shrink-0"
          >
            📥 Export CSV
          </button>
        </div>

        {/* Search + Filter Bar */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name, company, phone, city..."
              className="form-input pl-9 w-full"
              style={{ background: '#111827' }}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-sm">🔍</span>
            {searchInput && (
              <button onClick={() => { setSearchInput(''); setSearch(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-white text-xs">✕</button>
            )}
          </div>
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(1); }}
            className="form-input max-w-[160px]"
            style={{ background: '#111827' }}
          >
            <option value="">All Status</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
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
                  <th>City</th><th>Status</th><th>Actions</th>
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
                    <td>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedLead(lead)} 
                          className="px-3 py-1 bg-[#2E6FBF] text-white text-xs rounded hover:bg-[#1E4D8C] transition-colors"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => deleteLead(lead.id)} 
                          className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-800 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
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

      {/* View Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#111827] border border-[#2A2A2A] rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-[#2A2A2A]">
              <h2 className="text-xl font-heading font-bold text-white uppercase">Lead Details #{selectedLead.id}</h2>
              <button 
                onClick={() => setSelectedLead(null)}
                className="text-[#A8A8A8] hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0B0B0D] p-4 rounded border border-[#2A2A2A]">
                  <p className="text-xs text-[#A8A8A8] uppercase mb-1">Company Name</p>
                  <p className="text-white font-medium">{selectedLead.company_name}</p>
                </div>
                <div className="bg-[#0B0B0D] p-4 rounded border border-[#2A2A2A]">
                  <p className="text-xs text-[#A8A8A8] uppercase mb-1">Contact Person</p>
                  <p className="text-white font-medium">{selectedLead.contact_person}</p>
                </div>
                <div className="bg-[#0B0B0D] p-4 rounded border border-[#2A2A2A]">
                  <p className="text-xs text-[#A8A8A8] uppercase mb-1">Phone Number</p>
                  <a href={`tel:${selectedLead.phone}`} className="text-[#4A8FD4] hover:underline font-medium">{selectedLead.phone}</a>
                </div>
                <div className="bg-[#0B0B0D] p-4 rounded border border-[#2A2A2A]">
                  <p className="text-xs text-[#A8A8A8] uppercase mb-1">Email Address</p>
                  {selectedLead.email ? (
                    <a href={`mailto:${selectedLead.email}`} className="text-[#4A8FD4] hover:underline font-medium">{selectedLead.email}</a>
                  ) : (
                    <span className="text-[#A8A8A8]">Not provided</span>
                  )}
                </div>
                <div className="bg-[#0B0B0D] p-4 rounded border border-[#2A2A2A]">
                  <p className="text-xs text-[#A8A8A8] uppercase mb-1">City / Location</p>
                  <p className="text-white font-medium">{selectedLead.city}</p>
                </div>
                <div className="bg-[#0B0B0D] p-4 rounded border border-[#2A2A2A]">
                  <p className="text-xs text-[#A8A8A8] uppercase mb-1">Guards Needed</p>
                  <p className="text-white font-medium">{selectedLead.guards_needed || 'Not specified'}</p>
                </div>
                <div className="bg-[#0B0B0D] p-4 rounded border border-[#2A2A2A]">
                  <p className="text-xs text-[#A8A8A8] uppercase mb-1">Service Type</p>
                  <p className="text-white font-medium">{selectedLead.service_type || 'General'}</p>
                </div>
                <div className="bg-[#0B0B0D] p-4 rounded border border-[#2A2A2A]">
                  <p className="text-xs text-[#A8A8A8] uppercase mb-1">Submitted On</p>
                  <p className="text-white font-medium">{new Date(selectedLead.created_at).toLocaleString('en-IN')}</p>
                </div>
              </div>
              
              <div className="bg-[#0B0B0D] p-4 rounded border border-[#2A2A2A] mt-4">
                <p className="text-xs text-[#A8A8A8] uppercase mb-2">Message / Requirements</p>
                <p className="text-white whitespace-pre-wrap">{selectedLead.message || <span className="text-[#A8A8A8] italic">No additional message provided.</span>}</p>
              </div>
            </div>
            
            <div className="p-6 border-t border-[#2A2A2A] bg-[#0B0B0D] rounded-b-lg flex justify-end gap-3">
              <button 
                onClick={() => setSelectedLead(null)}
                className="px-6 py-2 border border-[#2A2A2A] text-white rounded hover:bg-[#111827] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
