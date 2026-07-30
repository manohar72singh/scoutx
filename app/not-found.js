'use client';

// app/not-found.js — Premium ScoutX Security 404 Page
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LogoSVG from '@/components/LogoSVG';

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const quickLinks = [
    {
      title: 'Security Services',
      desc: 'Armed, unarmed & event guards',
      href: '/services',
      icon: (
        <svg className="w-5 h-5 text-[#4A8FD4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'About ScoutX',
      desc: 'PSARA license & credentials',
      href: '/about',
      icon: (
        <svg className="w-5 h-5 text-[#4A8FD4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H7" />
        </svg>
      ),
    },
    {
      title: 'Industries Served',
      desc: 'Corporate, residential, banking',
      href: '/industries',
      icon: (
        <svg className="w-5 h-5 text-[#4A8FD4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Locations in NCR',
      desc: 'Ghaziabad, Noida, Delhi NCR',
      href: '/security-guards-ghaziabad',
      icon: (
        <svg className="w-5 h-5 text-[#4A8FD4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'Get Security Quote',
      desc: 'Instant guard pricing',
      href: '/contact#quote',
      icon: (
        <svg className="w-5 h-5 text-[#4A8FD4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: 'Join Our Team',
      desc: 'Guard jobs & applications',
      href: '/careers',
      icon: (
        <svg className="w-5 h-5 text-[#4A8FD4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  const filteredLinks = searchQuery.trim()
    ? quickLinks.filter(
        (link) =>
          link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : quickLinks;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const match = quickLinks.find((l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) {
      router.push(match.href);
    } else {
      router.push(`/services`);
    }
  };

  return (
    <main className="min-h-screen bg-[#060913] text-[#F5F5F5] flex flex-col justify-between relative overflow-hidden font-body select-none py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74,143,212,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74,143,212,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Tactical Security Glow Orbs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(30,77,140,0.25),transparent_70%)] blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-[radial-gradient(circle,rgba(46,111,191,0.12),transparent_70%)] blur-2xl" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[radial-gradient(circle,rgba(13,19,33,0.8),transparent_70%)] blur-2xl" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center items-center text-center">
        
        {/* Security Badge Alert Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(239,68,68,0.15)] animate-pulse">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>SECURITY ALERT • PERIMETER RESTRICTED</span>
        </div>

        {/* ScoutX Shield Logo Box */}
        <div className="relative mb-6 group cursor-pointer" onClick={() => router.push('/')}>
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#1E4D8C] via-[#4A8FD4] to-[#1E4D8C] opacity-40 blur transition duration-500 group-hover:opacity-75" />
          <div className="relative flex items-center justify-center p-3 rounded-2xl bg-[#0A0F1F] border border-[#1E4D8C]/40 shadow-2xl">
            <LogoSVG size={54} />
          </div>
        </div>

        {/* Giant Metallic 404 Text */}
        <div className="relative">
          <h1
            className="font-heading font-extrabold text-[110px] sm:text-[160px] md:text-[190px] leading-none tracking-tight select-none"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #76A9E0 45%, #1E4D8C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 10px 40px rgba(0,0,0,0.8)',
            }}
          >
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#4A8FD4]/40 bg-[#060913]/90 px-4 py-1 rounded border border-[#1E4D8C]/20">
              Zone Unreachable
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-[#E8E8E8] uppercase tracking-wider mb-3">
          Page Not Found
        </h2>
        <p className="text-[#A8A8A8] text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
          The requested route is outside our monitored perimeter. It may have been moved, renamed, or is temporarily offline.
        </p>

        {/* Direct Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 w-full max-w-md">
          <Link
            href="/"
            className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#1E4D8C] to-[#2E6FBF] hover:from-[#2E6FBF] hover:to-[#4A8FD4] text-white font-heading font-semibold text-sm tracking-wider uppercase shadow-lg shadow-[#1E4D8C]/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Return to Safety
          </Link>
          <Link
            href="/contact#quote"
            className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0D1321] border border-[#1E4D8C]/50 hover:border-[#4A8FD4] text-[#E8E8E8] hover:text-white font-heading font-semibold text-sm tracking-wider uppercase transition-all duration-200 hover:bg-[#111827]"
          >
            <svg className="w-4 h-4 text-[#4A8FD4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Request Guard
          </Link>
        </div>

        {/* Tactical Search Bar */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-lg mb-10">
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, locations, or pages..."
              className="w-full px-5 py-3.5 pl-12 rounded-xl bg-[#0D1321]/90 border border-[#1E4D8C]/40 text-sm text-[#F5F5F5] placeholder-[#666] focus:outline-none focus:border-[#4A8FD4] focus:ring-1 focus:ring-[#4A8FD4] transition-all"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A8FD4]/70 group-focus-within:text-[#4A8FD4] transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 14 0z" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#888] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {/* Recommended Quick Navigation Grid */}
        <div className="w-full max-w-3xl text-left">
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#4A8FD4]/80 font-semibold">
              Authorized Destinations
            </span>
            <span className="text-xs text-[#666]">
              Showing {filteredLinks.length} options
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative p-4 rounded-xl bg-[#0D1321]/60 border border-[#1A2540] hover:border-[#1E4D8C] hover:bg-[#111827] transition-all duration-200 flex items-start gap-3 shadow-md"
              >
                <div className="p-2 rounded-lg bg-[#1E4D8C]/15 border border-[#1E4D8C]/30 text-[#4A8FD4] group-hover:bg-[#1E4D8C]/30 group-hover:scale-105 transition-all">
                  {link.icon}
                </div>
                <div>
                  <h3 className="text-sm font-heading font-medium text-[#E8E8E8] group-hover:text-white transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-xs text-[#888] mt-0.5 group-hover:text-[#A8A8A8] transition-colors">
                    {link.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Support Ribbon */}
      <footer className="relative z-10 mt-12 pt-6 border-t border-[#1A2540]/60 max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777]">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="ScoutX Protection Group" width={22} height={22} className="rounded" />
          <span className="font-heading font-semibold text-[#A8A8A8]">
            ScoutX Protection Group Pvt. Ltd.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="tel:+918682066666"
            className="inline-flex items-center gap-1.5 text-[#4A8FD4] hover:underline font-mono"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1.01 1.01 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            24/7 Support: +91-8682066666
          </a>
          <span className="text-[#444]">|</span>
          <span className="font-mono">ERR_404_RESTRICTED_ROUTE</span>
        </div>
      </footer>
    </main>
  );
}
