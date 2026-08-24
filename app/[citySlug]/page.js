// app/[citySlug]/page.js — City SEO landing pages
// Handles: /security-guards-ghaziabad, /security-guards-noida, etc.

import { notFound } from 'next/navigation';
import Link from 'next/link';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CertificationsSection from '@/components/CertificationsSection';
import CityLeadForm from '@/components/CityLeadForm';

const servicesList = [
  { label: 'Unarmed Security Guard', href: '/services/security-guard', icon: '🛡️' },
  { label: 'Armed Gunman Security', href: '/services/security-guard-gunman', icon: '🎯' },
  { label: 'Female Security Guard', href: '/services/female-security-guard', icon: '👩‍✈️' },
  { label: 'Female Security Officer', href: '/services/female-security-officer', icon: '💼' },
  { label: 'Security Supervisor', href: '/services/security-supervisor', icon: '📋' },
  { label: 'PSO / VIP Bodyguard', href: '/services/pso', icon: '🕴️' },
  { label: 'Bouncer Services', href: '/services/bouncer', icon: '💪' },
  { label: 'Housekeeping Services', href: '/services/housekeeping-services', icon: '🧹' },
  { label: 'Detective Services', href: '/services/detective-services', icon: '🕵️' },
];

const cities = {
  'security-guards-ghaziabad': {
    name: 'Ghaziabad',
    state: 'Uttar Pradesh',
    headline: 'Security Guard Services in Ghaziabad',
    subheadline: 'PSARA-licensed, police-verified security guards and facility management for residential societies, corporate offices, factories & events across Ghaziabad.',
    description: 'ScoutX Protection Group is a leading PSARA-licensed private security agency with operational command based in Ghaziabad. We provide 24/7 security guard deployment, CCTV surveillance monitoring, mobile patrol supervisors, and housekeeping staff across major Ghaziabad residential hubs and industrial clusters.',
    localities: ['Govindpuram', 'Indirapuram', 'Raj Nagar Extension', 'Crossings Republik', 'Vasundhara', 'Vaishali', 'Sahibabad Industrial Area', 'Kavi Nagar', 'Shastri Nagar', 'NH-58 & Delhi-Meerut Expressway Belt'],
    industries: ['High-Rise Residential Societies & Gated Communities', 'Corporate Offices & IT Workspaces in Indirapuram & Vaishali', 'Manufacturing Units & Warehouses in Sahibabad & Kavi Nagar', 'Hospitals, Nursing Homes & Medical Facilities', 'Retail Malls, Showrooms & Banquet Venues'],
    meta_title: 'Security Guard Services in Ghaziabad | PSARA Licensed Agency - ScoutX',
    meta_desc: 'Hire PSARA-licensed, police-verified security guards in Ghaziabad. 24/7 supervisor rounds, society & factory security. Call +91 86820 66666 for a free quote.',
    faqs: [
      {
        q: 'Is ScoutX Protection Group a licensed security agency in Ghaziabad?',
        a: 'Yes, ScoutX Protection Group Pvt. Ltd. holds an official PSARA license from the Government of Uttar Pradesh, operating legally across all sectors of Ghaziabad and NCR.'
      },
      {
        q: 'How fast can security guards be deployed in Ghaziabad?',
        a: 'Because our primary branch is located in Govindpuram, Ghaziabad, we can inspect your premises and deploy verified guards within 24 hours.'
      },
      {
        q: 'Are guards verified by Uttar Pradesh Police?',
        a: '100% of our security personnel undergo mandatory local police background checks and identity verification before being posted at any client site.'
      },
      {
        q: 'Do you provide female security guards and bouncers in Ghaziabad?',
        a: 'Yes, we provide trained female security guards for hospitals, schools, and frisking booths, as well as bouncers and PSOs for private events and VIP protection in Ghaziabad.'
      }
    ]
  },
  'security-guards-noida': {
    name: 'Noida',
    state: 'Uttar Pradesh',
    headline: 'Security Guard Services in Noida',
    subheadline: 'Professional, tech-enabled security guard personnel for Noida\'s corporate tech parks, IT/ITES companies, gated townships & commercial complexes.',
    description: 'Noida is NCR’s primary corporate and industrial hub. ScoutX Protection Group delivers tailored security operations in Noida, ensuring strict visitor access control, emergency de-escalation, biometric attendance, and round-the-clock supervisor vigilance across Sectors 1 to 168.',
    localities: ['Sector 62 IT & Institutional Hub', 'Sector 18 Commercial & Atta Market', 'Sector 137 & Sector 143 Expressway Societies', 'Sector 150 Sports City', 'Sector 59 & 63 Industrial Areas', 'Noida-Greater Noida Expressway Corridor'],
    industries: ['IT Parks, MNC Campuses & Software Towers', 'Luxury High-Rise Societies & Condominiums', 'Manufacturing Plants & Packaging Units', 'Co-Working Hubs & Commercial Plazas', 'Event Halls, Banquets & Exhibition Centres'],
    meta_title: 'Security Guard Services in Noida | PSARA Certified Agency - ScoutX',
    meta_desc: 'Top PSARA-licensed security guard agency in Noida. Police-verified guards for IT parks, corporate towers, and residential sectors. Call +91 86820 66666.',
    faqs: [
      {
        q: 'What types of security services are available in Noida?',
        a: 'We provide corporate security guards, armed gunmen for bank/ATM cash transit, female frisking guards, bouncers, and facility housekeeping across all sectors of Noida.'
      },
      {
        q: 'How do you monitor security guards on duty in Noida?',
        a: 'We implement GPS-enabled supervisor inspections, digital visitor logging, and random night surprise audits to ensure maximum alertness.'
      },
      {
        q: 'Can we get customized security guard uniforms matching our corporate branding in Noida?',
        a: 'Yes, our guards can be deployed in standard crisp tactical uniforms, safari suits (for executive buildings), or specialized corporate blazers.'
      },
      {
        q: 'Are your security guards in Noida covered under EPF and ESIC?',
        a: 'Yes, 100% of our security personnel are enrolled in EPF, ESIC, and covered under Workmen’s Compensation insurance.'
      }
    ]
  },
  'security-guards-greater-noida': {
    name: 'Greater Noida',
    state: 'Uttar Pradesh',
    headline: 'Security Guard Services in Greater Noida',
    subheadline: 'PSARA-licensed security guards and patrol units for Greater Noida\'s residential townships, institutional campuses & industrial estates.',
    description: 'Greater Noida features sprawling industrial belts, university campuses, and large-scale residential projects. ScoutX provides robust perimeter protection, gate management, vehicle checking, and quick-response security teams tailored for large premises.',
    localities: ['Pari Chowk & Commercial Belt', 'Knowledge Park I, II & III (Universities)', 'Ecotech Industrial Areas I to XVI', 'Greater Noida West (Noida Extension)', 'Yamuna Expressway Industrial Corridor', 'Surajpur Industrial Area'],
    industries: ['Colleges, Universities & Educational Campuses', 'Large Manufacturing & Automobile Industrial Plants', 'Gated Townships & Multi-Acre Societies', 'Warehouses & Logistics Hubs along Yamuna Expressway', 'Hospitals & Research Institutes'],
    meta_title: 'Security Guard Services in Greater Noida | PSARA Licensed - ScoutX',
    meta_desc: 'Professional security guard agency in Greater Noida. PSARA certified, police verified guards for Knowledge Park campuses, factories & townships. Free quote.',
    faqs: [
      {
        q: 'Do you provide campus security for universities in Knowledge Park Greater Noida?',
        a: 'Yes, we specialize in educational institution security, including gate control, female warden support, hostel security, and crowd handling during events.'
      },
      {
        q: 'Are your security guards trained for heavy industrial safety in Greater Noida?',
        a: 'Yes, our industrial guards are trained in fire safety, material gate-pass verification, loading dock surveillance, and Factory Act compliance.'
      },
      {
        q: 'How fast can guards be deployed to Greater Noida West (Noida Extension)?',
        a: 'We can deploy verified residential and commercial security personnel to Greater Noida West societies within 24 to 48 hours.'
      },
      {
        q: 'Do you provide mobile night patrol vehicles in Greater Noida industrial sectors?',
        a: 'Yes, our mobile patrol supervisors conduct scheduled and surprise midnight inspections across Ecotech and Surajpur industrial parks.'
      }
    ]
  },
  'security-guards-delhi': {
    name: 'Delhi',
    state: 'Delhi NCR',
    headline: 'Security Guard Services in Delhi',
    subheadline: 'Armed and unarmed security personnel for Delhi\'s commercial towers, retail establishments, VIP residences & industrial zones.',
    description: 'ScoutX Protection Group offers premium security personnel across North, South, East, and West Delhi. From PSO close protection to high-end retail security and night factory patrols, we ensure complete peace of mind.',
    localities: ['Connaught Place (CP) & Central Delhi', 'Okhla Industrial Area Phases I-III', 'South Delhi (Saket, Hauz Khas, GK, Vasant Kunj)', 'East Delhi (Laxmi Nagar, Mayur Vihar, Patparganj)', 'West Delhi (Rajouri Garden, Janakpuri, Naraina)', 'Netaji Subhash Place & Rohini'],
    industries: ['Corporate Headquarters & Diplomatic Properties', 'High-End Retail Outlets, Jewellers & Showrooms', 'Manufacturing & Warehousing in Okhla & Naraina', 'Hospitals, Diagnostics & Clinics', 'Nightlife Venues, Clubs & Private VIP Functions'],
    meta_title: 'Security Guard Services in Delhi NCR | Police Verified - ScoutX',
    meta_desc: 'Hire reliable security guard services in Delhi NCR. Armed guards, PSOs, corporate guards & bouncers. 100% police verified. Call +91 86820 66666.',
    faqs: [
      {
        q: 'Do you provide Personal Security Officers (PSO) with armed licenses in Delhi?',
        a: 'Yes, we provide licensed armed gunmen and ex-servicemen PSOs for corporate executives, VIPs, and high-net-worth individuals across Delhi.'
      },
      {
        q: 'What is the contract duration for hiring security guards in Delhi?',
        a: 'We offer flexible contracts ranging from monthly ongoing deployments to short-term event security (daily or weekly).'
      },
      {
        q: 'Are your security guards vetted by Delhi Police authorities?',
        a: 'Yes, 100% of guards deployed in Delhi undergo complete police background verification and identity authentication.'
      },
      {
        q: 'Can you provide female security guards for retail showrooms and hospitals in Delhi?',
        a: 'Yes, we provide trained female security staff for frisking, crowd control, and visitor screening in Delhi hospitals and luxury retail venues.'
      }
    ]
  },
  'security-guards-gurgaon': {
    name: 'Gurgaon',
    state: 'Haryana',
    headline: 'Security Guard Services in Gurgaon (Gurugram)',
    subheadline: 'Elite security guards and corporate facility protection for Gurgaon\'s Fortune 500 offices, cyber hubs & luxury residential societies.',
    description: 'Gurgaon demands world-class security standards. ScoutX delivers trained, well-groomed, and tech-proficient security guards capable of managing visitor flows, VIP escorts, and automated access control systems across Gurugram.',
    localities: ['DLF Cyber City & Cyber Hub', 'Golf Course Road & Golf Course Ext Road', 'Udyog Vihar Phases I-V', 'Sohna Road Commercial Hub', 'MG Road & Sector 29 Commercial Areas', 'Manesar IMT Industrial Belt'],
    industries: ['MNC Corporate Offices & Tech Campuses', 'Luxury Condominiums & Gated Villas', 'Automobile & Industrial Manufacturing in Manesar', 'Fine-Dining Restaurants, Pubs & Luxury Malls', 'Co-Working & Shared Spaces'],
    meta_title: 'Security Guard Services in Gurgaon Gurugram | ScoutX Security',
    meta_desc: 'PSARA compliant security guard services in Gurgaon. Police verified guards for Cyber City offices, luxury societies & Manesar industrial units. Get a quote.',
    faqs: [
      {
        q: 'Can you provide English-speaking corporate security guards in Gurgaon?',
        a: 'Yes, we provide English-speaking, front-desk trained security personnel for corporate headquarters and international MNCs in Gurgaon.'
      },
      {
        q: 'Are your guards insured under Workmen’s Compensation in Gurgaon?',
        a: 'Yes, all ScoutX security personnel are fully covered under statutory Workmen’s Compensation, PF, and ESIC.'
      },
      {
        q: 'Do you provide armed gunmen for jewelry stores and banks in Gurugram?',
        a: 'Yes, we provide licensed armed security guards with verified arms licenses for high-risk financial and retail establishments.'
      },
      {
        q: 'How do you handle guard replacements in DLF Cyber City or Golf Course Road offices?',
        a: 'We guarantee same-day replacement within 24 hours from our standby roster in Gurgaon.'
      }
    ]
  },
  'security-guards-faridabad': {
    name: 'Faridabad',
    state: 'Haryana',
    headline: 'Security Guard Services in Faridabad',
    subheadline: 'Dependable security manpower for Faridabad\'s engineering factories, industrial corridors, and residential sectors.',
    description: 'ScoutX Protection Group offers specialized industrial and commercial security solutions in Faridabad, preventing theft, property damage, and unauthorized worker entry in major industrial sectors.',
    localities: ['Sector 15 & Sector 16 Prime Residential', 'NIT Faridabad Commercial Hub', 'Sector 24, 25 & 58 Industrial Areas', 'Mathura Road Highway Corridor', 'Ballabhgarh Industrial Area'],
    industries: ['Heavy Engineering & Manufacturing Plants', 'Auto Ancillary Factories & Foundries', 'Residential Group Housings & Societies', 'Logistics Warehouses on Mathura Road', 'Healthcare & Educational Centres'],
    meta_title: 'Security Guard Services in Faridabad | Industrial & Society Guards - ScoutX',
    meta_desc: 'Hire verified security guards in Faridabad for manufacturing plants, industrial zones & societies. PSARA compliant. Contact ScoutX for a free assessment.',
    faqs: [
      {
        q: 'What is the cost of hiring security guards in Faridabad?',
        a: 'Our monthly rates depend on the guard category (unarmed, armed, supervisor) and 8-hour vs 12-hour shift requirements. Contact us for a customized quote.'
      },
      {
        q: 'Do you manage shift handovers and night checks in Faridabad?',
        a: 'Yes, our patrol supervisors conduct mandatory daily attendance checks and random midnight audits across Faridabad client locations.'
      },
      {
        q: 'Are guards in Faridabad trained in fire safety and industrial hazards?',
        a: 'Yes, our industrial guards complete hands-on fire drill practice, fire extinguisher operation, and industrial safety compliance training.'
      },
      {
        q: 'Can ScoutX supply housekeeping staff alongside security guards in Faridabad?',
        a: 'Yes, we provide integrated security and housekeeping facility packages under a single contract.'
      }
    ]
  },
  'security-guards-meerut': {
    name: 'Meerut',
    state: 'Uttar Pradesh',
    headline: 'Security Guard Services in Meerut',
    subheadline: 'Trained, police-verified security guards for Meerut\'s industrial estates, universities, hospitals & commercial hubs.',
    description: 'With rapid connectivity via the Delhi-Meerut Expressway, ScoutX provides high-caliber security guard deployments in Meerut, ensuring complete site protection for commercial, academic, and manufacturing organizations.',
    localities: ['Partapur Industrial Area', 'Delhi-Meerut Expressway Corridor', 'Shastri Nagar & Saket Residential', 'Modipuram Agro-Industrial Hub', 'Roorkee Road Educational Belt', 'Meerut Cantt & Mall Road'],
    industries: ['Sports Goods, Scissors & Textile Manufacturing', 'Universities, Engineering Colleges & Schools', 'Hospitals & Medical Centres', 'Commercial Showrooms & Wholesale Markets', 'Residential Colonies & Gated Enclaves'],
    meta_title: 'Security Guard Services in Meerut | PSARA Licensed - ScoutX',
    meta_desc: 'Professional security guard agency in Meerut. Police verified guards for Partapur factories, universities, and societies. Call +91 86820 66666.',
    faqs: [
      {
        q: 'Do you provide security guards for educational institutes in Meerut?',
        a: 'Yes, we provide discipline-focused security guards and female officers for schools, colleges, and university campuses in Meerut.'
      },
      {
        q: 'Are ScoutX guards in Meerut verified by local police?',
        a: 'Yes, every guard deployed in Meerut undergoes background verification through local police stations.'
      },
      {
        q: 'How quickly can guards be deployed to Partapur industrial area?',
        a: 'We can deploy trained industrial security personnel to Partapur and Modipuram facilities within 24 to 48 hours.'
      },
      {
        q: 'Do you provide armed gunman security for cash transit and bank branches in Meerut?',
        a: 'Yes, we supply licensed armed guards with valid arms licenses for banks, ATMs, and jewelry establishments across Meerut.'
      }
    ]
  },
  'security-guards-hapur': {
    name: 'Hapur',
    state: 'Uttar Pradesh',
    headline: 'Security Guard Services in Hapur',
    subheadline: 'PSARA-licensed security guards for Hapur\'s industrial clusters, logistics warehouses & commercial properties.',
    description: 'ScoutX Protection Group brings professional security management to Hapur and Pilkhuwa, safeguarding warehouses, textile units, cold storage facilities, and residential properties with trained personnel.',
    localities: ['Hapur UPSIDC Industrial Area', 'Pilkhuwa Textile & Manufacturing Hub', 'Anand Vihar & City Centre', 'NH-9 Logistics & Cold Storage Corridor', 'Dhaulana Industrial Area'],
    industries: ['Warehousing, Godowns & Cold Storages', 'Textile & Garment Manufacturing Clusters', 'Agricultural Processing Units', 'Commercial Showrooms & Banks', 'Residential Enclaves'],
    meta_title: 'Security Guard Services in Hapur | PSARA Security Agency - ScoutX',
    meta_desc: 'Verified security guards in Hapur & Pilkhuwa for factories, warehouses, and commercial spaces. PSARA compliant. Contact ScoutX for a free quote.',
    faqs: [
      {
        q: 'Do you provide 24/7 security for warehouses and godowns in Hapur?',
        a: 'Yes, we provide 24/7 round-the-clock guards with logbook maintenance, seal inspection, and perimeter checking for godowns in Hapur.'
      },
      {
        q: 'How can I request a security audit for my factory in Hapur?',
        a: 'Call our team at +91 86820 66666 or submit the quick lead form on this page for a free on-site security assessment.'
      },
      {
        q: 'Are ScoutX guards deployed in Pilkhuwa textile units police-verified?',
        a: 'Yes, 100% of our security personnel undergo police verification and background screening before site deployment.'
      },
      {
        q: 'What emergency relief support is available in Hapur if a guard is absent?',
        a: 'We maintain reserve relief guards in our regional deployment roster to ensure 0% post vacancy.'
      }
    ]
  },
};

const slugList = Object.keys(cities);

export async function generateStaticParams() {
  return slugList.map((slug) => ({ citySlug: slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const city = cities[resolvedParams.citySlug];
  if (!city) return {};
  return {
    title: city.meta_title,
    description: city.meta_desc,
    alternates: { canonical: `https://scoutxsecurity.com/${resolvedParams.citySlug}` },
    openGraph: {
      url: `https://scoutxsecurity.com/${resolvedParams.citySlug}`,
      title: city.meta_title,
      description: city.meta_desc,
      siteName: 'ScoutX Protection Group',
      type: 'website',
    }
  };
}

export default async function CityPage({ params }) {
  const resolvedParams = await params;
  const city = cities[resolvedParams.citySlug];
  if (!city) notFound();

  const cityFaqs = city.faqs;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: `ScoutX Protection Group ${city.name}`,
              description: city.meta_desc,
              url: `https://scoutxsecurity.com/${resolvedParams.citySlug}`,
              telephone: '+91-8682066666',
              email: 'scoutxsecurity@gmail.com',
              areaServed: `${city.name}, ${city.state}`,
              address: {
                '@type': 'PostalAddress',
                addressLocality: city.name,
                addressRegion: city.state,
                addressCountry: 'IN',
              },
              priceRange: '₹₹',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://scoutxsecurity.com'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: `Security Guards in ${city.name}`,
                  item: `https://scoutxsecurity.com/${resolvedParams.citySlug}`
                }
              ]
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: cityFaqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            },
          ]),
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A93A6] mb-6">
            <Link href="/" title="Home" className="hover:text-white transition-colors">Home</Link>
            <span className="text-[#2A3550]">/</span>
            <span className="text-[#4A8FD4]">Security in {city.name}</span>
          </nav>

          <span className="section-label">📍 {city.name}, {city.state} • PSARA LICENSED</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase text-white mb-4">
            {city.headline}
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-base sm:text-lg max-w-3xl mx-auto mt-6 mb-8 leading-relaxed">
            {city.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact#quote" title={`Get a free quote in ${city.name}`} className="btn-primary text-base px-8 py-4">
              Get a Free Quote in {city.name}
            </Link>
            <a href="tel:+918682066666" title="Call ScoutX Security Director" className="btn-secondary text-base px-8 py-4">
              📞 Call: 86820 66666
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-8 px-4 sm:px-6" style={{ background: '#0B0B0D' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {['PSARA Licensed UP/NCR', '100% Police Verified', '500+ Guards Deployed', 'Fully Insured (ESIC/PF)', '24/7 Mobile Supervisors'].map((t) => (
              <span key={t} className="trust-badge text-sm text-[#E8E8E8]">✅ {t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Why ScoutX in city & Lead capture */}
      <section className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-white">
              Trusted Security Services Across <span className="text-gradient-steel">{city.name}</span>
            </h2>
            <div className="chrome-divider max-w-xs mx-auto mt-4" />
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start mb-12">

            {/* Left Col: Info */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-[#050914] p-6 rounded-xl border border-[rgba(192,192,192,0.1)]">
                <h3 className="font-heading text-xl font-bold uppercase text-white mb-3">
                  Overview of Security Solutions in {city.name}
                </h3>
                <p className="text-[#A8A8A8] text-sm sm:text-base leading-relaxed">
                  {city.description}
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-4">
                  Key Localities We Cover in {city.name}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {city.localities.map((loc) => (
                    <span key={loc} className="px-3 py-1.5 bg-[#1A2235] text-xs text-[#D0D0D0] rounded border border-white/5 font-medium">
                      📍 {loc}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-4">
                  Sectors &amp; Industries Protected in {city.name}:
                </h3>
                <ul className="space-y-2.5">
                  {city.industries.map((ind) => (
                    <li key={ind} className="flex items-center gap-3 text-[#D0D0D0] text-sm">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: 'rgba(46,111,191,0.2)', color: '#4A8FD4' }}>✓</span>
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-lg bg-[rgba(46,111,191,0.08)] border border-[rgba(46,111,191,0.2)]">
                <h4 className="font-heading font-bold text-white uppercase text-sm mb-2">
                  Why Clients in {city.name} Choose ScoutX:
                </h4>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-[#A8A8A8]">
                  <div className="flex items-center gap-2"><span>🛡️</span> Rapid 24-48h Deployment</div>
                  <div className="flex items-center gap-2"><span>📋</span> Strict Police Clearance</div>
                  <div className="flex items-center gap-2"><span>🚨</span> Surprise Night Audits</div>
                  <div className="flex items-center gap-2"><span>📱</span> Direct Management Contact</div>
                </div>
              </div>
            </div>

            {/* Right Col: Lead Capture Form */}
            <div className="lg:col-span-5 sticky top-24">
              <CityLeadForm cityName={city.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Services available in this city */}
      <section className="py-20 px-4 sm:px-6 bg-[#050914] border-t border-[#1A2235]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#2E6FBF] text-xs font-bold uppercase tracking-[0.2em]">SPECIALIZED ROLES</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-white mt-2">
              Security Services Available in <span className="text-[#2E6FBF]">{city.name}</span>
            </h2>
            <p className="text-[#A8A8A8] text-sm max-w-2xl mx-auto mt-3">
              Explore our full range of guard categories and facility solutions deployed across {city.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {servicesList.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                title={`${svc.label} in ${city.name}`}
                className="p-5 bg-[#0A0F1F] border border-[#1A2235] rounded-lg hover:border-[#2E6FBF] transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{svc.icon}</span>
                  <h3 className="font-heading text-sm font-bold uppercase text-white group-hover:text-[#4A8FD4] transition-colors">
                    {svc.label}
                  </h3>
                </div>
                <span className="text-[#2E6FBF] group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <CertificationsSection title={`ScoutX Compliance & Certifications in ${city.name}`} />

      {/* Local FAQs Section */}
      <section className="py-20 px-4 sm:px-6 bg-[#0A0F1F] border-t border-[#1A2235]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#2E6FBF] text-xs font-bold uppercase tracking-[0.2em]">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-white mt-2">
              FAQs About Security Guards in <span className="text-[#2E6FBF]">{city.name}</span>
            </h2>
          </div>

          <div className="space-y-4">
            {cityFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-[#050914] border border-[#1A2235] rounded p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:border-[#2E6FBF]/40 transition-colors"
              >
                <summary className="flex items-center justify-between font-heading text-base font-bold text-white tracking-wide">
                  <span>{faq.q}</span>
                  <span className="ml-4 flex-shrink-0 text-[#2E6FBF] group-open:rotate-180 transition-transform duration-300 text-lg">
                    ▼
                  </span>
                </summary>
                <p className="text-[#8A93A6] text-sm leading-relaxed mt-4 pt-4 border-t border-[#1A2235]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us component */}
      <WhyChooseUsSection />

      {/* Other cities in NCR with high-equity internal linking */}
      <section className="py-14 px-4 sm:px-6" style={{ background: '#0B0B0D', borderTop: '1px solid rgba(192,192,192,0.1)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-[#A8A8A8] mb-4">
            We Also Deploy Guards in Other NCR Regions:
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {slugList.filter((s) => s !== resolvedParams.citySlug).map((slug) => (
              <Link
                key={slug}
                href={`/${slug}`}
                title={`Security Guards in ${cities[slug].name}`}
                className="px-4 py-2.5 text-xs font-heading uppercase tracking-wider text-[#C0C0C0] bg-[#111827] border border-[rgba(192,192,192,0.2)] rounded hover:border-[#2E6FBF] hover:text-white transition-all"
              >
                Security Guards in {cities[slug].name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
