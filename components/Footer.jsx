// components/Footer.jsx

import Link from 'next/link';
import LogoSVG from './LogoSVG';

const services = [
  'Security Guard', 'Security Guard (Gunman)', 'Female Security Guard',
  'Female Security Officer', 'Security Supervisor', 'PSO', 'Bouncer',
  'Housekeeping Services', 'Detective Services',
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Why Choose Us', href: '/why-choose-us' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0D] border-t border-[rgba(192,192,192,0.1)]">

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <LogoSVG size={40} />
              <div>
                <div className="font-heading text-lg font-bold uppercase tracking-widest text-gradient-silver">ScoutX</div>
                <div className="text-[0.6rem] uppercase tracking-[0.2em] text-[#C0C0C0]/50">Protection Group Pvt. Ltd.</div>
              </div>
            </Link>
            <p className="text-[#A8A8A8] text-sm leading-relaxed mb-4">
              India&apos;s trusted private security agency, providing PSARA-licensed, police-verified guards for residential, corporate, industrial, and event security.
            </p>
            {/* PSARA badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[rgba(30,77,140,0.2)] border border-[rgba(46,111,191,0.3)] rounded text-xs font-heading uppercase tracking-wider text-[#4A8FD4]">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              PSARA Licensed
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-[#E8E8E8] mb-4 pb-2 border-b border-[rgba(192,192,192,0.1)]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-[#A8A8A8] hover:text-white text-sm transition-colors duration-200 group"
                  >
                    <span className="w-1.5 h-0.5 bg-[#2E6FBF] group-hover:w-3 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-[#E8E8E8] mb-4 pb-2 border-b border-[rgba(192,192,192,0.1)]">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="flex items-center gap-2 text-[#A8A8A8] hover:text-white text-sm transition-colors duration-200 group"
                  >
                    <span className="w-1.5 h-0.5 bg-[#2E6FBF] group-hover:w-3 transition-all duration-200" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-[#E8E8E8] mb-4 pb-2 border-b border-[rgba(192,192,192,0.1)]">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2.5">
                <svg className="w-4 h-4 text-[#2E6FBF] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-[#A8A8A8] text-sm leading-relaxed">
                  Shop No 1, Ground Floor, H-39 KH No 1468,<br />Govindpuram, Ghaziabad, UP 201013
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#2E6FBF] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div className="text-sm grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
                  <a href="tel:+918682066666" className="text-[#A8A8A8] hover:text-white transition-colors whitespace-nowrap">
                    Ashok Choudhary:
                  </a>
                  <a href="tel:+918682066666" className="text-[#A8A8A8] hover:text-white transition-colors whitespace-nowrap">
                    +91 86820 66666
                  </a>
                  <a href="tel:+917611865555" className="text-[#A8A8A8] hover:text-white transition-colors whitespace-nowrap">
                    Anil Choudhary:
                  </a>
                  <a href="tel:+917611865555" className="text-[#A8A8A8] hover:text-white transition-colors whitespace-nowrap">
                    +91 76118 65555
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#2E6FBF] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:scoutxsecurity@gmail.com" className="text-[#A8A8A8] hover:text-white text-sm transition-colors break-all">
                  scoutxsecurity@gmail.com
                </a>
              </div>
              <a
                href="https://wa.me/918682066666?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20security%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-heading font-bold uppercase tracking-wider rounded transition-all mt-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>



      {/* Bottom bar */}
      <div className="border-t border-[rgba(192,192,192,0.07)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#A8A8A8]">
          <p>© {new Date().getFullYear()} ScoutX Protection Group Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link>
            <span className="hidden sm:inline text-[#2E6FBF]">•</span>
            <span className="hidden sm:inline">PSARA Licensed</span>
            <span className="text-[#2E6FBF]">•</span>
            <a
              href="https://quantyrotechnologies.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0F1F] border border-[#2E6FBF]/30 hover:border-[#4A8FD4] shadow-[0_0_10px_rgba(46,111,191,0.15)] hover:shadow-[0_0_20px_rgba(74,143,212,0.35)] transition-all duration-300 group hover:-translate-y-0.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
              </span>
              <span className="text-[11px] text-[#A8A8A8] group-hover:text-[#E8E8E8] transition-colors">
                Designed & Developed by
              </span>
              <span className="font-heading text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E8E8] to-[#4A8FD4] group-hover:from-white group-hover:to-[#60A5FA] transition-all">
                Quantyro Technologies
              </span>
              <svg className="w-3.5 h-3.5 text-[#4A8FD4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
