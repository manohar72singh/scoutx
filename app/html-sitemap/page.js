// app/html-sitemap/page.js — HTML Sitemap for Googlebot Crawl Depth & Fast Indexation

import Link from 'next/link';
import { locationsData, locationSlugs } from '@/lib/locationsData';
import { servicesData, serviceSlugs } from '@/lib/servicesData';
import { keywordsData, keywordSlugs } from '@/lib/keywordsData';

export const metadata = {
  title: 'HTML Sitemap | Complete Website Directory - ScoutX Security',
  description: 'Complete directory of all pages, security services, shopping mall security hubs, and NCR locations on ScoutX Protection Group website.',
  alternates: { canonical: 'https://scoutxsecurity.com/html-sitemap' },
};

const pagesData = {
  main: [
    { title: 'Home Page', href: '/' },
    { title: 'About Us', href: '/about' },
    { title: 'All Services Overview', href: '/services' },
    { title: 'Industries We Serve', href: '/industries' },
    { title: 'Why Choose ScoutX', href: '/why-choose-us' },
    { title: 'Licenses & Certifications', href: '/why-choose-us#certifications' },
    { title: 'Client Testimonials & Ratings', href: '/testimonials' },
    { title: 'Guard Photo Gallery', href: '/gallery' },
    { title: 'Security Blog & Insights', href: '/blog' },
    { title: 'Careers & Job Openings', href: '/careers' },
    { title: 'Contact Us & Free Quote', href: '/contact' },
  ],
  services: serviceSlugs.map((slug) => ({
    title: servicesData[slug].title,
    href: `/services/${slug}`,
  })),
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
  mallsAndHubs: locationSlugs.map((slug) => ({
    title: `Security Services for ${locationsData[slug].name}`,
    href: `/locations/${slug}`,
  })),
  keywords: keywordSlugs.map((slug) => ({
    title: keywordsData[slug].targetKeyword,
    href: `/security-services/${slug}`,
  })),
};

export default function HtmlSitemapPage() {
  return (
    <div className="bg-[#050914] min-h-screen text-white pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">Website Directory</span>
          <h1 className="font-heading text-4xl md:text-5xl font-black uppercase text-white mt-2 mb-4">
            HTML <span className="text-[#2E6FBF]">Sitemap Directory</span>
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-sm max-w-2xl mx-auto mt-4">
            Browse all pages, shopping mall security hubs, specialized service lines, and keyword landing pages across Delhi NCR.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Main Pages */}
          <div className="bg-[#0A0F1F] border border-[#1A2235] p-6 rounded-lg">
            <h2 className="font-heading text-lg font-bold uppercase text-[#4A8FD4] mb-4 pb-2 border-b border-[#1A2235] flex items-center gap-2">
              <span>🏛️</span> Main Company Pages
            </h2>
            <ul className="space-y-2.5 text-sm text-[#C0C0C0]">
              {pagesData.main.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} title={page.title} className="hover:text-white hover:underline flex items-center gap-2 transition-colors">
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
                  <Link href={svc.href} title={svc.title} className="hover:text-white hover:underline flex items-center gap-2 transition-colors">
                    <span className="text-[#2E6FBF]">→</span> {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* City Hubs (Local SEO) */}
          <div className="bg-[#0A0F1F] border border-[#1A2235] p-6 rounded-lg">
            <h2 className="font-heading text-lg font-bold uppercase text-[#4A8FD4] mb-4 pb-2 border-b border-[#1A2235] flex items-center gap-2">
              <span>📍</span> Major City Hubs
            </h2>
            <ul className="space-y-2.5 text-sm text-[#C0C0C0]">
              {pagesData.cities.map((city) => (
                <li key={city.href}>
                  <Link href={city.href} title={city.title} className="hover:text-white hover:underline flex items-center gap-2 transition-colors">
                    <span className="text-[#2E6FBF]">→</span> {city.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shopping Malls & Micro-Hubs */}
          <div className="bg-[#0A0F1F] border border-[#1A2235] p-6 rounded-lg md:col-span-2">
            <h2 className="font-heading text-lg font-bold uppercase text-[#4A8FD4] mb-4 pb-2 border-b border-[#1A2235] flex items-center gap-2">
              <span>🏬</span> Shopping Malls &amp; Commercial Hubs
            </h2>
            <div className="grid sm:grid-cols-2 gap-2 text-xs text-[#C0C0C0]">
              {pagesData.mallsAndHubs.map((mall) => (
                <Link
                  key={mall.href}
                  href={mall.href}
                  title={mall.title}
                  className="p-2.5 bg-[#050914] rounded border border-[#1A2235] hover:border-[#2E6FBF] hover:text-white transition-all flex items-center gap-2"
                >
                  <span className="text-[#2E6FBF]">→</span> {mall.title}
                </Link>
              ))}
            </div>
          </div>

          {/* High-Intent Keyword Landing Pages */}
          <div className="bg-[#0A0F1F] border border-[#1A2235] p-6 rounded-lg">
            <h2 className="font-heading text-lg font-bold uppercase text-[#4A8FD4] mb-4 pb-2 border-b border-[#1A2235] flex items-center gap-2">
              <span>🎯</span> High-Rank Target Searches
            </h2>
            <ul className="space-y-2.5 text-sm text-[#C0C0C0]">
              {pagesData.keywords.map((kw) => (
                <li key={kw.href}>
                  <Link href={kw.href} title={kw.title} className="hover:text-white hover:underline flex items-center gap-2 transition-colors">
                    <span className="text-[#2E6FBF]">→</span> {kw.title}
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
