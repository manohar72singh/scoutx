// app/html-sitemap/page.js — HTML Sitemap for Googlebot Crawl Depth & Fast Indexation

import Link from 'next/link';

export const metadata = {
  title: 'HTML Sitemap | Complete Website Directory - ScoutX Security',
  description: 'Complete directory of all pages, security services, city hubs, and resources on ScoutX Protection Group website.',
  alternates: { canonical: 'https://scoutxsecurity.com/html-sitemap' },
};

const pagesData = {
  main: [
    { title: 'Home Page', href: '/' },
    { title: 'About Us', href: '/about' },
    { title: 'All Services Overview', href: '/services' },
    { title: 'Industries We Serve', href: '/industries' },
    { title: 'Why Choose ScoutX', href: '/why-choose-us' },
    { title: 'Client Testimonials & Ratings', href: '/testimonials' },
    { title: 'Guard Photo Gallery', href: '/gallery' },
    { title: 'Security Blog & Insights', href: '/blog' },
    { title: 'Careers & Job Openings', href: '/careers' },
    { title: 'Contact Us & Free Quote', href: '/contact' },
  ],
  services: [
    { title: 'Unarmed Security Guard Services', href: '/services/security-guard' },
    { title: 'Armed Security Guards (Gunman)', href: '/services/security-guard-gunman' },
    { title: 'Female Security Guard Services', href: '/services/female-security-guard' },
    { title: 'Female Security Officer Services', href: '/services/female-security-officer' },
    { title: 'Security Supervisor Services', href: '/services/security-supervisor' },
    { title: 'Personal Security Officer (PSO Bodyguard)', href: '/services/pso' },
    { title: 'Professional Bouncers & Event Security', href: '/services/bouncer' },
    { title: 'Commercial & Facility Housekeeping Services', href: '/services/housekeeping-services' },
    { title: 'Private Detective & Background Verification', href: '/services/detective-services' },
  ],
  cities: [
    { title: 'Security Guard Services in Ghaziabad', href: '/security-guards-ghaziabad' },
    { title: 'Security Guard Services in Noida', href: '/security-guards-noida' },
    { title: 'Security Guard Services in Greater Noida', href: '/security-guards-greater-noida' },
    { title: 'Security Guard Services in Delhi', href: '/security-guards-delhi' },
    { title: 'Security Guard Services in Gurgaon (Gurugram)', href: '/security-guards-gurgaon' },
    { title: 'Security Guard Services in Faridabad', href: '/security-guards-faridabad' },
    { title: 'Security Guard Services in Meerut', href: '/security-guards-meerut' },
    { title: 'Security Guard Services in Hapur', href: '/security-guards-hapur' },
  ],
};

export default function HtmlSitemapPage() {
  return (
    <div className="bg-[#050914] min-h-screen text-white pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">Website Structure</span>
          <h1 className="font-heading text-4xl md:text-5xl font-black uppercase text-white mt-2 mb-4">
            HTML <span className="text-[#2E6FBF]">Sitemap Directory</span>
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-sm max-w-2xl mx-auto mt-4">
            Browse all pages, regional landing hubs, and specialized security services available across Delhi NCR.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Pages */}
          <div className="bg-[#0A0F1F] border border-[#1A2235] p-6 rounded-lg">
            <h2 className="font-heading text-lg font-bold uppercase text-[#4A8FD4] mb-4 pb-2 border-b border-[#1A2235] flex items-center gap-2">
              <span>🏛️</span> Main Pages
            </h2>
            <ul className="space-y-2.5 text-sm text-[#C0C0C0]">
              {pagesData.main.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="hover:text-white hover:underline flex items-center gap-2 transition-colors">
                    <span className="text-[#2E6FBF]">→</span> {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Security Services */}
          <div className="bg-[#0A0F1F] border border-[#1A2235] p-6 rounded-lg">
            <h2 className="font-heading text-lg font-bold uppercase text-[#4A8FD4] mb-4 pb-2 border-b border-[#1A2235] flex items-center gap-2">
              <span>🛡️</span> Security Services
            </h2>
            <ul className="space-y-2.5 text-sm text-[#C0C0C0]">
              {pagesData.services.map((svc) => (
                <li key={svc.href}>
                  <Link href={svc.href} className="hover:text-white hover:underline flex items-center gap-2 transition-colors">
                    <span className="text-[#2E6FBF]">→</span> {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* City Hubs (Local SEO) */}
          <div className="bg-[#0A0F1F] border border-[#1A2235] p-6 rounded-lg">
            <h2 className="font-heading text-lg font-bold uppercase text-[#4A8FD4] mb-4 pb-2 border-b border-[#1A2235] flex items-center gap-2">
              <span>📍</span> NCR Service Hubs
            </h2>
            <ul className="space-y-2.5 text-sm text-[#C0C0C0]">
              {pagesData.cities.map((city) => (
                <li key={city.href}>
                  <Link href={city.href} className="hover:text-white hover:underline flex items-center gap-2 transition-colors">
                    <span className="text-[#2E6FBF]">→</span> {city.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
