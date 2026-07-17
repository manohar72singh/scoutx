'use client';
// app/not-found.js — Custom 404 Page

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #050810 0%, #0A0F1F 50%, #0d1424 100%)', zIndex: 9999 }}
    >
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74,143,212,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,143,212,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glowing orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2E6FBF, transparent)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #1E4D8C, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div
            className="rounded-2xl overflow-hidden p-2"
            style={{
              background: 'rgba(30,77,140,0.12)',
              border: '1px solid rgba(74,143,212,0.2)',
              boxShadow: '0 0 50px rgba(46,111,191,0.2)',
            }}
          >
            <Image
              src="/logo.jpeg"
              alt="ScoutX Protection Group Logo"
              width={90}
              height={90}
              className="rounded-xl"
              priority
            />
          </div>
        </div>

        {/* Big 404 */}
        <div
          className="font-heading font-black select-none leading-none mb-6"
          style={{
            fontSize: 'clamp(100px, 18vw, 180px)',
            background: 'linear-gradient(135deg, #1E4D8C 0%, #2E6FBF 40%, #4A8FD4 70%, #1E4D8C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: 0.3,
            letterSpacing: '-0.05em',
          }}
        >
          404
        </div>

        {/* Heading */}
        <h1
          className="font-heading font-bold uppercase tracking-widest mb-3"
          style={{
            fontSize: 'clamp(20px, 4vw, 36px)',
            color: '#E8E8E8',
          }}
        >
          Page Not Found
        </h1>

        {/* Subtext */}
        <p className="text-[#A8A8A8] mb-2 text-base leading-relaxed max-w-md mx-auto">
          The page you are looking for doesn&apos;t exist, was moved, or is temporarily unavailable.
        </p>
        <p className="text-[#555] text-sm mb-10">
          Error Code: <code className="text-[#4A8FD4] font-mono">404_NOT_FOUND</code>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            href="/"
            className="btn-primary px-8 py-3 text-sm"
          >
            ← Back to Home
          </Link>
          <Link
            href="/contact"
            className="btn-secondary px-8 py-3 text-sm"
          >
            Contact Us
          </Link>
        </div>

        {/* Quick links */}
        <div
          className="rounded-xl p-6 max-w-lg mx-auto"
          style={{
            background: 'rgba(30,77,140,0.06)',
            border: '1px solid rgba(74,143,212,0.12)',
          }}
        >
          <p className="text-[#A8A8A8] text-xs uppercase tracking-widest font-heading font-semibold mb-4">
            Quick Links
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              { href: '/services',      label: '🛡️ Services' },
              { href: '/about',         label: '🏢 About Us' },
              { href: '/industries',    label: '🏭 Industries' },
              { href: '/contact#quote', label: '📋 Get a Quote' },
              { href: '/careers',       label: '👷 Careers' },
              { href: '/testimonials',  label: '⭐ Reviews' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-[#A8A8A8] hover:text-[#4A8FD4] transition-colors py-2 px-3 rounded-lg hover:bg-[rgba(74,143,212,0.08)] text-left"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer brand */}
        <div className="mt-12 flex items-center justify-center gap-2 opacity-40">
          <Image src="/logo.jpeg" alt="ScoutX Logo" width={20} height={20} className="rounded-sm" />
          <span className="text-[#A8A8A8] text-xs font-heading uppercase tracking-widest">
            ScoutX Protection Group
          </span>
        </div>
      </div>
    </div>
  );
}
