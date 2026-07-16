'use client';
// app/admin/dashboard/page.js

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/stats`)
      .then((r) => r.json())
      .then((data) => { if (data.success) setStats(data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { label: 'Total Leads',        value: stats.leads_total, sub: `${stats.leads_new} new`,  icon: '📋', href: '/admin/leads',        color: '#2E6FBF' },
    { label: 'Applications',       value: stats.apps_total,  sub: `${stats.apps_new} new`,   icon: '👷', href: '/admin/applications',  color: '#4A8FD4' },
    { label: 'Testimonials',       value: stats.testimonials_total, sub: 'in database', icon: '⭐', href: '/admin/testimonials', color: '#1E4D8C' },
  ] : [];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase text-white">Dashboard</h1>
        <p className="text-[#A8A8A8] text-sm mt-1">Welcome back! Here's what's happening at ScoutX.</p>
      </div>

      {loading ? (
        <div className="text-[#A8A8A8]">Loading stats...</div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {cards.map((c) => (
            <Link key={c.label} href={c.href} className="card-dark p-6 hover:border-[rgba(46,111,191,0.5)] transition-all block">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{c.icon}</span>
                <span className="status-badge status-new">{c.sub}</span>
              </div>
              <div className="font-heading text-5xl font-bold mb-1" style={{ color: c.color }}>{c.value}</div>
              <div className="font-heading text-sm uppercase tracking-wider text-[#C0C0C0]">{c.label}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick links */}
      <div className="card-dark p-6">
        <h2 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/leads?status=new" className="btn-primary text-sm px-4 py-2">View New Leads</Link>
          <Link href="/admin/applications?status=new" className="btn-secondary text-sm px-4 py-2">Review Applications</Link>
          <Link href="/admin/testimonials" className="btn-secondary text-sm px-4 py-2">Manage Testimonials</Link>
        </div>
      </div>
    </AdminLayout>
  );
}
