'use client';
// components/Header.jsx

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LogoSVG from './LogoSVG';

const navLinks = [
  { label: 'Home',          href: '/' },
  { label: 'About',         href: '/about' },
  { 
    label: 'Services',      
    href: '/services',
    dropdown: [
      { label: 'Security Guard', href: '/services/security-guard' },
      { label: 'Security Guard (Gunman)', href: '/services/security-guard-gunman' },
      { label: 'Female Security Guard', href: '/services/female-security-guard' },
      { label: 'Female Security Officer', href: '/services/female-security-officer' },
      { label: 'Security Supervisor', href: '/services/security-supervisor' },
      { label: 'PSO', href: '/services/pso' },
      { label: 'Bouncer', href: '/services/bouncer' },
      { label: 'Housekeeping Services', href: '/services/housekeeping-services' },
      { label: 'Detective Services', href: '/services/detective-services' },
    ]
  },
  { label: 'Industries',    href: '/industries' },
  { label: 'Gallery',       href: '/gallery' },
  { label: 'Careers',       href: '/careers' },
  { label: 'Contact',       href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', menuOpen);
    return () => document.body.classList.remove('mobile-menu-open');
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0F1F]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.5)] border-b border-[rgba(192,192,192,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="ScoutX Protection Group Home">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <LogoSVG size={42} />
            </div>
            <div className="leading-tight">
              <div className="font-heading font-bold text-lg uppercase tracking-widest text-gradient-silver">
                ScoutX
              </div>
              <div className="font-body text-[0.6rem] uppercase tracking-[0.2em] text-[#C0C0C0]/60 -mt-0.5">
                Protection Group
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="px-3 py-2 font-heading text-sm font-medium uppercase tracking-wider text-[#C0C0C0] hover:text-white transition-colors duration-200 flex items-center gap-1"
                >
                  {link.label}
                  {link.dropdown && (
                    <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#2E6FBF] group-hover:w-full transition-all duration-300" />
                </Link>
                
                {/* Desktop Dropdown */}
                {link.dropdown && (
                  <div className="absolute top-full left-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left -translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="bg-[#0A0F1F] border border-[rgba(192,192,192,0.1)] rounded-md shadow-xl overflow-hidden backdrop-blur-md">
                      {link.dropdown.map((sublink) => (
                        <Link
                          key={sublink.href}
                          href={sublink.href}
                          className="block px-4 py-3 text-sm font-heading tracking-wide text-[#C0C0C0] hover:text-white hover:bg-[#2E6FBF]/20 transition-colors border-b border-[rgba(192,192,192,0.05)] last:border-0"
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact#quote" className="btn-primary text-sm px-4 py-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Get a Quote
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 text-[#C0C0C0] hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <div className="w-6 flex flex-col gap-1.5 transition-all">
              <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(10,15,31,0.98)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(192,192,192,0.1)' }}
      >
        <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <div key={link.href} className="flex flex-col">
              {link.dropdown ? (
                <button
                  onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                  className="flex items-center justify-between px-4 py-3 font-heading text-base uppercase tracking-wider text-[#C0C0C0] hover:text-white hover:bg-[rgba(46,111,191,0.1)] rounded-lg transition-all w-full text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#2E6FBF]" />
                    {link.label}
                  </div>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180 text-white' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 font-heading text-base uppercase tracking-wider text-[#C0C0C0] hover:text-white hover:bg-[rgba(46,111,191,0.1)] rounded-lg transition-all"
                >
                  <span className="w-1 h-1 rounded-full bg-[#2E6FBF]" />
                  {link.label}
                </Link>
              )}
              
              {/* Mobile Submenu (Toggleable) */}
              {link.dropdown && (
                <div 
                  className={`pl-8 flex flex-col gap-1 border-l border-[#2E6FBF]/20 ml-5 overflow-hidden transition-all duration-300 ${
                    activeDropdown === link.label ? 'max-h-96 mt-1 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {link.dropdown.map((sublink) => (
                    <Link
                      key={sublink.href}
                      href={sublink.href}
                      onClick={() => setMenuOpen(false)}
                      className="px-4 py-2 text-sm font-heading text-[#A8A8A8] hover:text-white hover:bg-[rgba(46,111,191,0.1)] rounded-lg transition-all"
                    >
                      {sublink.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-[rgba(192,192,192,0.1)] flex flex-col gap-2">
            <a href="tel:+918682066666" className="flex items-center gap-2 px-4 py-2 text-[#C0C0C0] text-sm">
              <svg className="w-4 h-4 text-[#2E6FBF]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Ashok Choudhary: 86820 66666
            </a>
            <a href="tel:+917611865555" className="flex items-center gap-2 px-4 py-2 text-[#C0C0C0] text-sm">
              <svg className="w-4 h-4 text-[#2E6FBF]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Anil Choudhary: 76118 65555
            </a>
            <Link
              href="/contact#quote"
              onClick={() => setMenuOpen(false)}
              className="btn-primary justify-center mt-1"
            >
              Get a Quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
