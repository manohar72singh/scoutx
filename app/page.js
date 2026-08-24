// app/page.js — Home page
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Image from 'next/image';
import TestimonialsSection from '@/components/TestimonialsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import OurClientsSection from '@/components/OurClientsSection';
import CertificationsSection from '@/components/CertificationsSection';
import AnimatedStats from '@/components/AnimatedStats';
import FadeIn from '@/components/FadeIn';
import pool from '@/lib/db';

// Fallback used if the admin hasn't saved CTA content yet (or on DB error)
const ctaFallback = {
  hero_image: null,
  eyebrow_text: 'TAKE ACTION TODAY',
  heading_line1: 'SECURE YOUR PREMISES',
  heading_line2: 'STARTING TODAY',
  description: 'Get a customized security deployment plan within 24 hours. No obligation, no pushy sales — just an honest quote from our security experts.',
  primary_btn_text: 'GET A FREE QUOTE',
  primary_btn_link: '/contact#quote',
  whatsapp_btn_text: 'WHATSAPP US',
  whatsapp_number: '918682066666',
  phone1_label: 'Ashok Choudhary',
  phone1_number: '+91 86820 66666',
  phone2_label: 'Anil Choudhary',
  phone2_number: '+91 76118 65555',
};

async function getCtaContent() {
  try {
    const [rows] = await pool.query('SELECT * FROM cta_content WHERE id = 1 LIMIT 1');
    return rows[0] ? { ...ctaFallback, ...rows[0] } : ctaFallback;
  } catch (error) {
    console.error('Fetch CTA content error:', error);
    return ctaFallback;
  }
}

export const metadata = {
  title: 'Security Guard & Housekeeping Services in Ghaziabad NCR',
  description:
    'PSARA-licensed security guard & housekeeping agency in Ghaziabad, Noida & Delhi NCR. Police-verified guards for societies, offices & factories.',
  alternates: { canonical: 'https://scoutxsecurity.com' },
  openGraph: {
    title: 'Security Guard & Housekeeping Services in Ghaziabad NCR',
    description: 'ScoutX Protection Group — PSARA-licensed security guards, housekeeping & detective services across Delhi NCR.',
    url: 'https://scoutxsecurity.com',
    siteName: 'ScoutX Protection Group',
    type: 'website',
  }
};

// ── Trust bar data ────────────────────────────────────────────────────────
const trustItems = [
  { icon: '🛡️', title: 'PSARA LICENSED', desc: 'Govt. Regulated UP-PSARA' },
  { icon: '✅', title: '100% POLICE VERIFIED', desc: 'Background Checked For All Guards' },
  { icon: '👮', title: '500+ GUARDS', desc: 'Actively Deployed Across NCR' },
  { icon: '📄', title: 'FULLY INSURED', desc: 'Guards Covered Under Workmen\'s Compensation' },
];

// ── Services data ─────────────────────────────────────────────────────────
const services = [
  {
    num: '01',
    icon: '🛡️',
    title: 'SECURITY GUARD',
    desc: 'Professionally trained, police-verified guards for residential societies, offices, and retail. Uniform, attendance tracking, and supervisor rounds included.',
    href: '/services/security-guard',
  },
  {
    num: '02',
    icon: '🎯',
    title: 'SECURITY GUARD (GUNMAN)',
    desc: 'Licensed armed security personnel for banks, ATMs, cash-in-transit, jewelry stores, and high-value asset protection.',
    href: '/services/security-guard-gunman',
  },
  {
    num: '03',
    icon: '👩‍✈️',
    title: 'FEMALE SECURITY GUARD',
    desc: 'Police-verified female security personnel for hospitals, retail, frisking booths, corporate offices, and spaces requiring gender-specific security.',
    href: '/services/female-security-guard',
  },
  {
    num: '04',
    icon: '💼',
    title: 'FEMALE SECURITY OFFICER',
    desc: 'Experienced female officers for supervisory roles, sensitive corporate environments, and VIP escorting. Focus on compliance and guest management.',
    href: '/services/female-security-officer',
  },
  {
    num: '05',
    icon: '📋',
    title: 'SECURITY SUPERVISOR',
    desc: 'Dedicated on-site or mobile supervisors to manage guard deployment, conduct night checks, and ensure 100% adherence to SLAs and protocols.',
    href: '/services/security-supervisor',
  },
  {
    num: '06',
    icon: '🕴️',
    title: 'PSO',
    desc: 'Personal Security Officers (PSO) providing discreet, close-protection for executives, VIPs, and high-net-worth individuals.',
    href: '/services/pso',
  },
  {
    num: '07',
    icon: '💪',
    title: 'BOUNCER',
    desc: 'Highly trained bouncers for crowd management, conflict de-escalation, and VIP venues. Intimidating presence with a focus on safe crowd control.',
    href: '/services/bouncer',
  },
  {
    num: '08',
    icon: '🧹',
    title: 'HOUSEKEEPING SERVICES',
    desc: 'Professional housekeeping and sanitation staff for offices, societies, hospitals, and commercial sites. Daily maintenance and deep cleaning.',
    href: '/services/housekeeping-services',
  },
  {
    num: '09',
    icon: '🕵️',
    title: 'DETECTIVE SERVICES',
    desc: 'Discreet background verification, corporate intelligence, asset tracing, and surveillance handled with utmost confidentiality.',
    href: '/services/detective-services',
  },
];

// ── Industries ────────────────────────────────────────────────────────────
const industries = [
  {
    icon: '🏘️',
    title: 'RESIDENTIAL SOCIETIES',
    highlight: 'STOP THEFT, TRESPASSING & UNAUTHORIZED ENTRY',
    desc: 'Round-the-clock gate guards, visitor management, and night patrol for housing societies, gated communities, and apartments.'
  },
  {
    icon: '🏢',
    title: 'CORPORATE OFFICES',
    highlight: 'PROTECT EMPLOYEES, ASSETS & SENSITIVE DATA',
    desc: 'Access control, reception security, and parking management for IT parks, commercial complexes, and office towers.'
  },
  {
    icon: '🏭',
    title: 'FACTORIES & INDUSTRIAL',
    highlight: 'PREVENT PILFERAGE, THEFT & SAFETY VIOLATIONS',
    desc: 'Heavy-duty guards for manufacturing plants, warehouses, and industrial estates. Compliance with Factory Act safety norms.'
  },
  {
    icon: '🏦',
    title: 'BANKS & ATMS',
    highlight: 'ZERO TOLERANCE FOR ROBBERY OR FRAUD ATTEMPTS',
    desc: 'Armed guards, cash-in-transit escorts, and round-the-clock ATM security. Trained in de-escalation and emergency protocols.'
  },
  {
    icon: '🏥',
    title: 'HOSPITALS & HEALTHCARE',
    highlight: 'PATIENT SAFETY, VISITORS & INCIDENT INCIDENTS',
    desc: 'Sensitive environment specialists trained in patient management, VIP ward security, and emergency response.'
  },
  {
    icon: '🛍️',
    title: 'MALLS & RETAIL',
    highlight: 'PREVENT SHOPLIFTING & CROWD INCIDENTS',
    desc: 'Loss prevention guards, floor security, and entry management for shopping malls, showrooms, and retail chains.'
  },
];

// ── City Hubs for Local SEO ───────────────────────────────────────────────
const cityHubs = [
  {
    name: 'Ghaziabad',
    slug: 'security-guards-ghaziabad',
    tagline: 'Headquarters & Operational Command',
    keyAreas: 'Govindpuram, Indirapuram, Raj Nagar Ext, Crossings Republik, Vasundhara, Kavi Nagar, Sahibabad',
    icon: '📍',
  },
  {
    name: 'Noida',
    slug: 'security-guards-noida',
    tagline: 'Corporate, IT & High-Rise Societies',
    keyAreas: 'Sector 62, Sector 18, Sector 137, Noida Expressway, Sector 150, Special Economic Zones',
    icon: '🏢',
  },
  {
    name: 'Greater Noida',
    slug: 'security-guards-greater-noida',
    tagline: 'Institutional & Heavy Industrial Estates',
    keyAreas: 'Pari Chowk, Knowledge Park I-III, Ecotech Industrial Areas, Greater Noida West',
    icon: '🏭',
  },
  {
    name: 'Delhi',
    slug: 'security-guards-delhi',
    tagline: 'Capital Region Commercial & VIP Security',
    keyAreas: 'East Delhi, Connaught Place, South Delhi, Okhla Industrial Area, Naraina, Rohini',
    icon: '🏛️',
  },
  {
    name: 'Gurgaon (Gurugram)',
    slug: 'security-guards-gurgaon',
    tagline: 'MNCs, Tech Parks & Luxury Condos',
    keyAreas: 'DLF Cyber City, Golf Course Road, Sohna Road, Udyog Vihar, Manesar',
    icon: '🏙️',
  },
  {
    name: 'Faridabad',
    slug: 'security-guards-faridabad',
    tagline: 'Industrial & Manufacturing Hubs',
    keyAreas: 'Sector 15, NIT Faridabad, Mathura Road Industrial Belt, Ballabhgarh',
    icon: '⚙️',
  },
  {
    name: 'Meerut',
    slug: 'security-guards-meerut',
    tagline: 'Commercial Hubs & Expressway Corridor',
    keyAreas: 'Partapur Industrial Area, Shastri Nagar, Delhi-Meerut Expressway, Modipuram',
    icon: '🛡️',
  },
  {
    name: 'Hapur',
    slug: 'security-guards-hapur',
    tagline: 'Warehousing & Agricultural Logistics',
    keyAreas: 'UPSIDC Industrial Area, Pilkhuwa Textile Cluster, Cold Storages, Anand Vihar',
    icon: '📦',
  },
];

export default async function HomePage() {
  const cta = await getCtaContent();
  const waNumber = (cta.whatsapp_number || '').replace(/\D/g, '');
  const tel1 = (cta.phone1_number || '').replace(/\s+/g, '');
  const tel2 = (cta.phone2_number || '').replace(/\s+/g, '');

  return (
    <div className="bg-[#050914] min-h-screen text-white font-sans">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden min-h-[90vh] flex items-center pt-24 pb-12">
        {/* Optimized Background Image */}
        <div className="absolute inset-0 z-0 opacity-100">
          <Image
            src={cta.hero_image ? `/uploads/hero/${cta.hero_image}` : '/home.jpeg'}
            alt="ScoutX Security Guards on duty across Delhi NCR"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#050914]/80 via-[#050914]/40 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050914]/80 via-[#050914]/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full -mt-20 md:-mt-28">
          <div className="max-w-3xl">
            {/* Main headline */}
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl uppercase tracking-tighter leading-[0.95] mb-3">
              <span className="text-white block">SECURING WHAT</span>
              <span className="text-[#2E6FBF] block">MATTERS MOST</span>
              <span className="text-white block">TO YOU</span>
            </h1>

            {/* Subheadline */}
            <p className="text-[#A8A8A8] text-xs sm:text-sm leading-relaxed mb-4 max-w-xl font-medium tracking-wide">
              ScoutX Protection Group provides professional, PSARA-licensed, police-verified
              security guards for residential societies, corporate offices,
              factories, banks, malls, hospitals, and events across Ghaziabad,
              Noida &amp; Delhi NCR.
            </p>

            {/* Action Buttons */}
            <FadeIn delay={0.2} direction="up" className="flex flex-wrap gap-3 mb-6">
              <Link href="/contact#quote" className="bg-[#2E6FBF] hover:bg-[#1E4D8C] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded flex items-center gap-1.5 transition-colors">
                GET A FREE QUOTE <span className="text-sm leading-none">→</span>
              </Link>
              <Link href="/careers" className="bg-transparent border border-[#2E6FBF] text-white hover:bg-[#2E6FBF]/10 text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded flex items-center gap-1.5 transition-colors">
                APPLY FOR A JOB <span className="text-sm leading-none">→</span>
              </Link>
              <a href="https://wa.me/918682066666" target="_blank" rel="noreferrer" className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded flex items-center gap-1.5 transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WHATSAPP US
              </a>
            </FadeIn>

            {/* Stats Row */}
            <FadeIn delay={0.4} direction="up">
              <AnimatedStats />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────── */}
      <section className="bg-[#0A0F1F] border-y border-[#1A2235]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#1A2235]">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-6 px-4 hover:bg-[#111827] transition-colors">
                <div className="text-3xl opacity-80">{item.icon}</div>
                <div>
                  <div className="font-heading font-bold text-sm tracking-wide text-white">{item.title}</div>
                  <div className="text-xs text-[#8A93A6] mt-0.5 leading-tight">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ──────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-[#050914] relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-[#2E6FBF] text-xs font-bold uppercase tracking-[0.2em]">OUR SERVICES</span>
            <h2 className="font-heading text-4xl md:text-5xl font-black uppercase mt-2 mb-4 leading-tight">
              COMPLETE SECURITY <br />
              <span className="text-[#2E6FBF]">SOLUTIONS</span>
            </h2>
            <p className="text-[#A8A8A8] text-sm max-w-2xl mx-auto">
              From unarmed watchmen to armed escorts and mobile patrols — ScoutX delivers the right guard, fully trained and police-verified, for every security need.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up" className="bg-[#0A0F1F] border border-[#1A2235] rounded p-8 relative group hover:border-[#2E6FBF]/50 transition-all hover:-translate-y-1 hover:shadow-2xl">
                {/* Number Watermark */}
                <div className="absolute top-4 right-4 font-heading font-black text-6xl text-[#1A2235] opacity-50 group-hover:text-[#2E6FBF]/10 transition-colors pointer-events-none">
                  {s.num}
                </div>

                <div className="w-12 h-12 rounded-full border border-[#1A2235] flex items-center justify-center text-xl mb-6 bg-[#050914] group-hover:border-[#2E6FBF]/50 transition-colors">
                  {s.icon}
                </div>

                <h3 className="font-heading text-lg font-bold uppercase text-white mb-3 tracking-wide">{s.title}</h3>
                <p className="text-[#8A93A6] text-xs leading-relaxed mb-6 min-h-[60px]">{s.desc}</p>

                <Link href={s.href} className="text-[#2E6FBF] text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
                  REQUEST THIS SERVICE <span className="text-sm">→</span>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="text-center mt-12">
            <Link href="/services" className="inline-flex items-center gap-2 border border-[#2E6FBF] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded hover:bg-[#2E6FBF] transition-colors">
              VIEW ALL SERVICES <span className="text-lg leading-none">→</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── LOCATIONS WE SERVE (DELHI NCR SEO HUB) ────────────────────── */}
      <section id="locations" className="py-24 px-4 sm:px-6 bg-[#0A0F1F] border-t border-[#1A2235] relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-[#2E6FBF] text-xs font-bold uppercase tracking-[0.2em]">AREAS WE COVER</span>
            <h2 className="font-heading text-4xl md:text-5xl font-black uppercase mt-2 mb-4 leading-tight">
              SECURITY GUARD SERVICES <br />
              <span className="text-[#2E6FBF]">ACROSS DELHI NCR</span>
            </h2>
            <p className="text-[#A8A8A8] text-sm max-w-2xl mx-auto">
              ScoutX operates local branch supervisors and mobile patrol units in 8 key regions across Delhi NCR, guaranteeing rapid guard deployment within 24 to 48 hours.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cityHubs.map((city, idx) => (
              <FadeIn key={city.slug} delay={idx * 0.05} direction="up">
                <Link
                  href={`/${city.slug}`}
                  className="block h-full bg-[#050914] border border-[#1A2235] rounded-lg p-6 group hover:border-[#2E6FBF] transition-all hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl">{city.icon}</span>
                      <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#2E6FBF] bg-[#2E6FBF]/10 px-2 py-1 rounded">
                        Verified Team
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold uppercase text-white group-hover:text-[#4A8FD4] transition-colors mb-1">
                      {city.name}
                    </h3>
                    <div className="text-[#4A8FD4] text-xs font-semibold mb-3">
                      {city.tagline}
                    </div>
                    <p className="text-[#8A93A6] text-xs leading-relaxed mb-4">
                      <strong className="text-[#C0C0C0]">Key Localities:</strong> {city.keyAreas}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#1A2235] flex items-center justify-between text-[11px] font-heading font-bold uppercase tracking-wider text-[#2E6FBF] group-hover:text-white transition-colors">
                    <span>Explore {city.name} Guards</span>
                    <span>→</span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES SECTION ───────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-[#050914] border-y border-[#1A2235]">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-[#2E6FBF] text-xs font-bold uppercase tracking-[0.2em]">INDUSTRIES WE SERVE</span>
            <h2 className="font-heading text-4xl md:text-5xl font-black uppercase mt-2 mb-4 leading-tight">
              SECURITY FOR EVERY <br />
              INDUSTRY &amp; SETTING
            </h2>
            <p className="text-[#A8A8A8] text-sm max-w-2xl mx-auto">
              We understand that a bank has different threats than a hospital or a residential society. Our guards are industry-trained to handle the specific risks of your environment.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up" className="bg-[#0A0F1F] border border-[#1A2235] p-6 rounded hover:border-[#2E6FBF]/40 transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="flex items-center gap-3 mb-4 border-b border-[#1A2235] pb-4">
                  <div className="text-2xl">{ind.icon}</div>
                  <h3 className="font-heading text-base font-bold uppercase tracking-wide text-white">{ind.title}</h3>
                </div>
                <div className="text-[#4A8FD4] text-[10px] font-bold uppercase tracking-wider mb-2">
                  ↳ {ind.highlight}
                </div>
                <p className="text-[#8A93A6] text-xs leading-relaxed">
                  {ind.desc}
                </p>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="text-center mt-12">
            <Link href="/industries" className="inline-flex items-center gap-2 border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded hover:bg-white hover:text-[#050914] transition-all">
              EXPLORE ALL INDUSTRIES <span className="text-lg leading-none">→</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── COMPANY CERTIFICATIONS & PSARA ACCREDITATION ─────────── */}
      <CertificationsSection />

      {/* ── WHY CHOOSE US ────────────────────────────────────────────── */}
      <WhyChooseUsSection />

      {/* ── OUR CLIENTS ──────────────────────────────────────────────── */}
      <OurClientsSection />

      {/* ── FAQ SECTION & FAQPage SCHEMA ────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-[#0A0F1F] border-t border-[#1A2235]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What security guard services does ScoutX Protection Group provide in Ghaziabad & NCR?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ScoutX Protection Group provides 100% police-verified security guards, armed gunmen, female security guards, security supervisors, PSOs, event bouncers, housekeeping staff, and detective services across Ghaziabad, Noida & Delhi NCR.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is ScoutX Protection Group a PSARA-licensed security agency?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, ScoutX Protection Group Pvt. Ltd. is a PSARA-licensed private security agency operating strictly under government regulations in Uttar Pradesh and Delhi NCR.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Are all security guards police-verified?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, 100% of our security personnel undergo strict police verification, background screening, and comprehensive security protocol training before on-site deployment.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How quickly can security guards be deployed to our location?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We can deploy trained security guards to residential societies, corporate offices, factories, or events within 24 to 48 hours of initial consultation.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Which areas in Delhi NCR do you cover?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We provide security guard services across Ghaziabad, Noida, Greater Noida, Delhi, Gurgaon, Faridabad, Meerut, Hapur, and surrounding Delhi NCR regions.',
                  },
                },
              ],
            }),
          }}
        />

        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-[#2E6FBF] text-xs font-bold uppercase tracking-[0.2em]">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase mt-2 mb-4 leading-tight">
              EVERYTHING YOU NEED TO KNOW ABOUT <br />
              <span className="text-[#2E6FBF]">SCOUTX SECURITY SERVICES</span>
            </h2>
            <p className="text-[#A8A8A8] text-sm max-w-2xl mx-auto">
              Got questions about PSARA licensing, guard deployment, or police verification? We have answers.
            </p>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                q: 'What security guard services does ScoutX Protection Group provide in Ghaziabad & NCR?',
                a: 'ScoutX Protection Group provides 100% police-verified security guards, armed gunmen, female security guards, security supervisors, PSOs (Personal Security Officers), event bouncers, housekeeping staff, and detective services across Ghaziabad, Noida, Delhi, Gurgaon, and NCR.',
              },
              {
                q: 'Is ScoutX Protection Group a PSARA-licensed security agency?',
                a: 'Yes, ScoutX Protection Group Pvt. Ltd. is a PSARA-licensed private security agency operating strictly under government regulations in Uttar Pradesh and Delhi NCR.',
              },
              {
                q: 'Are all security guards police-verified?',
                a: 'Yes, 100% of our security personnel undergo mandatory police background verification, physical fitness screening, address verification, and intensive pre-deployment security training.',
              },
              {
                q: 'How quickly can security guards be deployed to our location?',
                a: 'We can deploy trained security guards to residential societies, corporate offices, factories, or commercial sites within 24 to 48 hours of initial consultation. Emergency deployments can also be arranged.',
              },
              {
                q: 'Which areas in Delhi NCR do you cover?',
                a: 'We provide security guard and housekeeping services across Ghaziabad (Govindpuram, Indirapuram, Raj Nagar), Noida, Greater Noida, Delhi, Gurgaon, Faridabad, Meerut, Hapur, and surrounding NCR regions.',
              },
            ].map((faq, idx) => (
              <FadeIn key={idx} delay={idx * 0.05} direction="up">
                <details className="group bg-[#050914] border border-[#1A2235] rounded p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:border-[#2E6FBF]/40 transition-colors">
                  <summary className="flex items-center justify-between font-heading text-base font-bold text-white tracking-wide">
                    <span>{faq.q}</span>
                    <span className="ml-4 flex-shrink-0 text-[#2E6FBF] group-open:rotate-180 transition-transform duration-300 text-lg">
                      ▼
                    </span>
                  </summary>
                  <p className="text-[#8A93A6] text-xs sm:text-sm leading-relaxed mt-4 pt-4 border-t border-[#1A2235]">
                    {faq.a}
                  </p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-[#050914] relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#1A2235 1px, transparent 1px), linear-gradient(90deg, #1A2235 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: '0.2' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {cta.eyebrow_text && (
            <span className="text-[#2E6FBF] text-xs font-bold uppercase tracking-[0.2em]">{cta.eyebrow_text}</span>
          )}
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase mt-2 mb-4 leading-tight">
            {cta.heading_line1} <br />
            {cta.heading_line2 && <span className="text-[#2E6FBF]">{cta.heading_line2}</span>}
          </h2>
          {cta.description && (
            <p className="text-[#A8A8A8] text-sm max-w-2xl mx-auto mb-10">
              {cta.description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={cta.primary_btn_link} className="bg-[#2E6FBF] hover:bg-[#1E4D8C] text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded flex items-center gap-2 transition-all">
              {cta.primary_btn_text} <span className="text-lg leading-none">→</span>
            </Link>
            {cta.whatsapp_btn_text && waNumber && (
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer" className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded flex items-center gap-2 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                {cta.whatsapp_btn_text}
              </a>
            )}
          </div>

          {(cta.phone1_number || cta.phone2_number) && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#8A93A6]">
              {cta.phone1_number && (
                <div className="flex items-center gap-2">
                  <span className="text-[#2E6FBF]">📞</span> {cta.phone1_label}: <a href={`tel:${tel1}`} className="text-white hover:text-[#2E6FBF]">{cta.phone1_number}</a>
                </div>
              )}
              {cta.phone1_number && cta.phone2_number && <span className="hidden sm:inline opacity-30">|</span>}
              {cta.phone2_number && (
                <div className="flex items-center gap-2">
                  <span className="text-[#25D366]">📞</span> {cta.phone2_label}: <a href={`tel:${tel2}`} className="text-white hover:text-[#2E6FBF]">{cta.phone2_number}</a>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
