'use client';
// app/admin/applications/page.js

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

const STATUS_OPTIONS = ['new', 'reviewed', 'shortlisted', 'rejected', 'hired'];

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const limit = 20;
  const API = '';

  const fetchApps = async () => {
    setLoading(true);
    const token = localStorage.getItem('scoutx_admin_token');
    const url = new URL(`${API}/api/admin/applications`, window.location.origin);
    url.searchParams.set('page', page);
    url.searchParams.set('limit', limit);
    if (filter) url.searchParams.set('status', filter);
    const res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (data.success) { setApps(data.data); setTotal(data.total); }
    setLoading(false);
  };

  useEffect(() => { fetchApps(); }, [page, filter]);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('scoutx_admin_token');
    await fetch(`${API}/api/admin/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchApps();
  };

  const statusClass = (s) => {
    if (s === 'new') return 'status-new';
    if (s === 'reviewed' || s === 'shortlisted') return 'status-contacted';
    if (s === 'hired') return 'status-closed';
    return 'status-rejected';
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold uppercase text-white">Job Applications</h1>
          <p className="text-[#A8A8A8] text-sm mt-1">{total} total applications</p>
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
        ) : apps.length === 0 ? (
          <div className="p-8 text-center text-[#A8A8A8]">No applications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Phone</th><th>Position</th>
                  <th>Experience</th><th>Resume</th><th>Date</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((app) => (
                  <tr key={app.id}>
                    <td className="text-[#A8A8A8]">#{app.id}</td>
                    <td className="font-medium">{app.full_name}</td>
                    <td>
                      <a href={`tel:${app.phone}`} className="text-[#4A8FD4] hover:underline">{app.phone}</a>
                    </td>
                    <td>{app.position_applied}</td>
                    <td>{app.experience_years} yr{app.experience_years !== 1 ? 's' : ''}</td>
                    <td>
                      {app.resume_file_path ? (
                        <a
                          href={`${API}/uploads/resumes/${app.resume_file_path}`}
                          target="_blank" rel="noopener noreferrer"
                          className="text-[#4A8FD4] hover:underline text-xs flex items-center gap-1"
                        >
                          📄 View
                        </a>
                      ) : <span className="text-[#A8A8A8] text-xs">No file</span>}
                    </td>
                    <td className="text-[#A8A8A8] text-xs">{new Date(app.created_at).toLocaleDateString('en-IN')}</td>
                    <td>
                      <select
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value)}
                        className={`status-badge ${statusClass(app.status)} bg-transparent border-0 cursor-pointer text-xs font-heading uppercase`}
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
