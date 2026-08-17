'use client';
// components/AdminLayout.jsx — Shared admin sidebar wrapper

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoSVG from './LogoSVG';

const navItems = [
  { label: 'Dashboard',    href: '/admin/dashboard',    icon: '📊' },
  { label: 'Leads',        href: '/admin/leads',        icon: '📋' },
  { label: 'Applications', href: '/admin/applications', icon: '👷' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: '⭐' },
  { label: 'Blog',         href: '/admin/blog',         icon: '📝' },
  { label: 'Homepage CTA', href: '/admin/cta',          icon: '📢' },
  { label: 'Settings',     href: '/admin/settings',     icon: '⚙️' },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('scoutx_admin_user');
    if (!user) {
      router.replace('/admin/login');
      return;
    }
    try {
      const parsed = JSON.parse(user);
      queueMicrotask(() => setAdmin(parsed));
    } catch {
      router.replace('/admin/login');
    }
  }, [router]);

  const logout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    localStorage.removeItem('scoutx_admin_user');
    router.replace('/admin/login');
  };

  if (!admin) return <div className="min-h-screen flex items-center justify-center text-[#A8A8A8]">Loading...</div>;

  return (
    <div className="min-h-screen flex" style={{ background: '#0A0F1F' }}>
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-[rgba(192,192,192,0.1)] flex flex-col" style={{ background: '#0B0B0D' }}>
        <div className="p-5 border-b border-[rgba(192,192,192,0.1)]">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <LogoSVG size={32} />
            <div>
              <div className="font-heading text-sm font-bold uppercase tracking-wider text-white">ScoutX</div>
              <div className="text-[0.6rem] text-[#A8A8A8] uppercase tracking-wider">Admin Panel</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-heading text-sm uppercase tracking-wider ${
                pathname === item.href
                  ? 'bg-[rgba(46,111,191,0.25)] text-[#4A8FD4] border border-[rgba(46,111,191,0.3)]'
                  : 'text-[#A8A8A8] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[rgba(192,192,192,0.1)]">
          <div className="text-[#A8A8A8] text-xs mb-3">Logged in as <strong className="text-[#E8E8E8]">{admin.username}</strong></div>
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 rounded text-sm text-red-400 hover:bg-[rgba(239,68,68,0.1)] transition-colors font-heading uppercase tracking-wider"
          >
            🚪 Logout
          </button>
          <Link href="/" target="_blank" className="flex items-center gap-1 mt-2 text-xs text-[#A8A8A8] hover:text-white transition-colors">
            🌐 View Website ↗
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
