'use client';
// app/admin/dashboard/page.js

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

// ─── Pure CSS Bar Chart (no external library needed) ───────────────────────
function BarChart({ data, color = '#2E6FBF', label }) {
  if (!data || data.length === 0) return (
    <div className="flex items-center justify-center h-32 text-[#555] text-sm">No data yet</div>
  );
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div>
      <p className="text-[#A8A8A8] text-xs uppercase tracking-widest mb-4 font-heading">{label}</p>
      <div className="flex items-end gap-2 h-32">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
            <span className="text-xs text-[#555] group-hover:text-[#A8A8A8] transition-colors font-bold" style={{ minHeight: 18 }}>
              {d.count > 0 ? d.count : ''}
            </span>
            <div className="w-full rounded-t-sm transition-all duration-500 relative" style={{ height: `${Math.max((d.count / max) * 100, 4)}%`, background: color, opacity: 0.85 }}>
              <div className="absolute inset-0 rounded-t-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: color }} />
            </div>
            <span className="text-[9px] text-[#555] group-hover:text-[#A8A8A8] transition-colors text-center leading-tight">{d.month?.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Donut-style Status Breakdown ──────────────────────────────────────────
const STATUS_COLORS = {
  new: '#3b82f6',
  contacted: '#f59e0b',
  in_progress: '#8b5cf6',
  closed: '#22c55e',
  rejected: '#ef4444',
};

function StatusBreakdown({ data }) {
  if (!data || data.length === 0) return (
    <div className="flex items-center justify-center h-24 text-[#555] text-sm">No data yet</div>
  );
  const total = data.reduce((acc, d) => acc + Number(d.count), 0);
  return (
    <div className="space-y-2.5">
      {data.map((d) => (
        <div key={d.status} className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: STATUS_COLORS[d.status] || '#555' }} />
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#A8A8A8] capitalize">{d.status?.replace('_', ' ')}</span>
              <span className="text-white font-bold">{d.count}</span>
            </div>
            <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${(d.count / total) * 100}%`, background: STATUS_COLORS[d.status] || '#555' }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/stats').then(r => r.json()),
      fetch('/api/admin/charts').then(r => r.json()),
    ]).then(([statsData, chartsData]) => {
      if (statsData.success) setStats(statsData.data);
      if (chartsData.success) setCharts(chartsData.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const statCards = stats ? [
    { label: 'Total Leads',    value: stats.leads_total,    sub: `${stats.leads_new} new · ${stats.leads_today} today`, icon: '📋', href: '/admin/leads',       color: '#2E6FBF' },
    { label: 'Applications',   value: stats.apps_total,     sub: `${stats.apps_new} new · ${stats.apps_today} today`,   icon: '👷', href: '/admin/applications', color: '#4A8FD4' },
    { label: 'Blog Posts',     value: stats.posts_total || 0, sub: 'articles published',                              icon: '📝', href: '/admin/blog',         color: '#38BDF8' },
    { label: 'Blog Comments',  value: stats.comments_total || 0, sub: 'user discussions',                             icon: '💬', href: '/admin/comments',     color: '#10B981' },
  ] : [];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase text-white">Dashboard</h1>
        <p className="text-[#A8A8A8] text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening at ScoutX.</p>
      </div>

      {loading ? (
        <div className="text-[#A8A8A8]">Loading...</div>
      ) : (
        <>
          {/* ── Stat Cards ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {statCards.map((c) => (
              <Link key={c.label} href={c.href} className="card-dark p-6 hover:border-[rgba(46,111,191,0.5)] transition-all block group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{c.icon}</span>
                  <span className="status-badge status-new text-xs">{c.sub}</span>
                </div>
                <div className="font-heading text-5xl font-bold mb-1 group-hover:scale-105 transition-transform origin-left" style={{ color: c.color }}>{c.value}</div>
                <div className="font-heading text-sm uppercase tracking-wider text-[#C0C0C0]">{c.label}</div>
              </Link>
            ))}
          </div>

          {/* ── Charts Row ── */}
          <div className="grid lg:grid-cols-3 gap-5 mb-8">
            {/* Leads Chart */}
            <div className="card-dark p-6 lg:col-span-1">
              <BarChart data={charts?.leadsByMonth} color="#2E6FBF" label="Monthly Leads (Last 6 Months)" />
            </div>

            {/* Applications Chart */}
            <div className="card-dark p-6 lg:col-span-1">
              <BarChart data={charts?.appsByMonth} color="#4A8FD4" label="Monthly Applications (Last 6 Months)" />
            </div>

            {/* Status Breakdown */}
            <div className="card-dark p-6">
              <p className="text-[#A8A8A8] text-xs uppercase tracking-widest mb-4 font-heading">Leads by Status</p>
              <StatusBreakdown data={charts?.leadsByStatus} />
            </div>
          </div>

          {/* ── Quick Actions ── */}
          <div className="card-dark p-6">
            <h2 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/leads?status=new" className="btn-primary text-sm px-4 py-2">View New Leads</Link>
              <Link href="/admin/applications?status=new" className="btn-secondary text-sm px-4 py-2">Review Applications</Link>
              <Link href="/admin/testimonials" className="btn-secondary text-sm px-4 py-2">Manage Testimonials</Link>
              <a href="/api/admin/leads/export" download target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                📥 Export Leads CSV
              </a>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
