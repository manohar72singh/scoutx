// components/CertificationsSection.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

const certifications = [
  {
    id: 'psara',
    badge: 'Statutory License',
    icon: '🛡️',
    title: 'Government PSARA License',
    regNo: 'UP-PSARA-REG-2024',
    authority: 'Controlling Authority, Home Department (Govt. of UP)',
    desc: 'Authorized under the Private Security Agencies (Regulation) Act, 2005 to deploy trained, verified security personnel across Uttar Pradesh and Delhi NCR.',
    highlights: ['Mandatory Police Verification', 'Governed Training Standards', 'Legal Immunity for Clients'],
  },
  {
    id: 'iso',
    badge: 'Quality Standard',
    icon: '🏆',
    title: 'ISO 9001:2015 Certified',
    regNo: 'ISO-9001-QMS-VERIFIED',
    authority: 'International Organization for Standardization',
    desc: 'Certified Quality Management System guaranteeing consistent, standard operating procedures in guard recruitment, field vigilance, and rapid incident handling.',
    highlights: ['Standardized SOPs', 'Audited Guard Rostering', 'Continuous Quality Improvement'],
  },
  {
    id: 'msme',
    badge: 'Govt. Enterprise',
    icon: '🇮🇳',
    title: 'MSME / Udyam Registered',
    regNo: 'UDYAM-UP-28-XXXXX',
    authority: 'Ministry of Micro, Small & Medium Enterprises, Govt. of India',
    desc: 'Officially recognized enterprise with verified corporate standing, eligible for public, institutional, and private B2B security contracts.',
    highlights: ['Govt. Portal Verified', 'Formal Enterprise Status', 'National Compliance Framework'],
  },
  {
    id: 'police',
    badge: '100% Verified',
    icon: '👮',
    title: 'Police Character Verification Standard',
    regNo: 'POLICE-VERIFIED-ROSTER',
    authority: 'Local Police Headquarters & District Authorities',
    desc: 'Zero-compromise criminal background check and physical residence verification for 100% of security guards prior to their site posting.',
    highlights: ['Zero Criminal Record Policy', 'Documented Verification Records', 'Audit-Ready for Clients'],
  },
  {
    id: 'esic-epfo',
    badge: 'Labor Compliant',
    icon: '📑',
    title: 'ESIC & EPFO Statutory Compliance',
    regNo: 'EPF & ESIC REGISTERED',
    authority: 'Ministry of Labour & Employment, Govt. of India',
    desc: 'Guards receive statutory Provident Fund, Employees’ State Insurance, and Workmen’s Compensation, ensuring 100% legal protection against workplace liability.',
    highlights: ['Workmen Compensation Cover', 'Statutory ESIC Healthcare', 'Zero Client Liability'],
  },
  {
    id: 'safety',
    badge: 'Accreditation',
    icon: '🔥',
    title: 'Fire Safety & First Aid Accreditation',
    regNo: 'DISASTER-RESPONSE-CERT',
    authority: 'Civil Defence & National Safety Standards',
    desc: 'All security supervisors and senior guards are trained in fire extinguishing drills, CPR, emergency building evacuation, and crowd management.',
    highlights: ['160+ Hours Practical Training', 'Emergency CPR Certified', 'Rapid Evacuation Protocol'],
  },
];

export default function CertificationsSection({
  title = 'Company Documents & Legal Certifications',
  subtitle = 'LEGAL ACCREDITATION & E-E-A-T COMPLIANCE',
  description = 'ScoutX Protection Group operates under full statutory compliance with state and central regulatory authorities.',
  showCTA = true,
  className = '',
}) {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section className={`py-20 px-4 sm:px-6 bg-[#050914] border-t border-[#1A2235] ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#2E6FBF] text-xs font-bold uppercase tracking-[0.2em]">
            {subtitle}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white mt-2 mb-4 leading-tight">
            {title}
          </h2>
          <div className="chrome-divider max-w-xs mx-auto mb-6" />
          <p className="text-[#A8A8A8] text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="card-dark p-6 sm:p-7 border border-[#1A2235] hover:border-[#2E6FBF]/60 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#2E6FBF]/5 rounded-full blur-2xl group-hover:bg-[#2E6FBF]/10 transition-colors" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0A0F1F] border border-[#1A2235] flex items-center justify-center text-2xl group-hover:border-[#2E6FBF]/40 transition-colors">
                    {cert.icon}
                  </div>
                  <span className="px-2.5 py-1 bg-[rgba(46,111,191,0.15)] text-[#4A8FD4] text-[10px] font-heading font-bold uppercase tracking-wider rounded border border-[#2E6FBF]/30">
                    {cert.badge}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold uppercase text-white mb-1 group-hover:text-[#4A8FD4] transition-colors">
                  {cert.title}
                </h3>

                <div className="text-[11px] font-mono text-[#2E6FBF] font-semibold tracking-wider mb-3">
                  {cert.regNo}
                </div>

                <p className="text-[#8A93A6] text-xs leading-relaxed mb-4">
                  {cert.desc}
                </p>

                <div className="space-y-1.5 mb-6 pt-3 border-t border-[#1A2235]/60">
                  <div className="text-[10px] uppercase font-bold text-[#A8A8A8] tracking-wider mb-1">
                    Authority: <span className="text-[#C0C0C0] font-normal">{cert.authority}</span>
                  </div>
                  {cert.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-[#C0C0C0]">
                      <span className="text-[#25D366] text-xs">✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveCert(cert)}
                className="w-full py-2.5 px-4 bg-[#0A0F1F] border border-[#1A2235] text-xs font-heading font-bold uppercase tracking-wider text-[#C0C0C0] hover:text-white hover:border-[#2E6FBF] rounded transition-colors flex items-center justify-center gap-2"
              >
                <span>🔍</span> View Compliance Details
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 p-6 rounded-xl bg-[#0A0F1F] border border-[#1A2235] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🏛️</div>
            <div>
              <h3 className="font-heading text-base font-bold uppercase text-white">
                100% Audit-Ready &amp; Legal Protection
              </h3>
              <p className="text-[#8A93A6] text-xs mt-0.5">
                We provide complete compliance dossiers (PSARA license copies, police verification slips, GST &amp; ESIC receipts) with every B2B contract.
              </p>
            </div>
          </div>
          {showCTA && (
            <Link
              href="/contact#quote"
              className="btn-primary text-xs uppercase tracking-wider py-3 px-6 shrink-0 inline-flex items-center gap-2"
            >
              Request Compliance Dossier →
            </Link>
          )}
        </div>
      </div>

      {/* Modal for viewing compliance details */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0A0F1F] border border-[#2E6FBF]/50 rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 text-[#8A93A6] hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{activeCert.icon}</span>
              <div>
                <span className="text-[10px] font-heading font-bold uppercase text-[#4A8FD4] tracking-widest">
                  {activeCert.badge}
                </span>
                <h4 className="font-heading text-lg font-bold uppercase text-white">
                  {activeCert.title}
                </h4>
              </div>
            </div>

            <div className="p-3 bg-[#050914] rounded border border-[#1A2235] mb-4">
              <div className="text-[10px] text-[#8A93A6] uppercase tracking-wider font-bold">Registration / License Code</div>
              <div className="font-mono text-sm font-bold text-[#4A8FD4] mt-0.5">{activeCert.regNo}</div>
            </div>

            <div className="space-y-3 text-xs text-[#A8A8A8] mb-6">
              <p>
                <strong className="text-white">Issuing Authority:</strong> {activeCert.authority}
              </p>
              <p>{activeCert.desc}</p>
              <div className="pt-2">
                <strong className="text-white block mb-1">Key Guarantees:</strong>
                <ul className="list-disc list-inside space-y-1 text-[#C0C0C0]">
                  {activeCert.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/contact#quote"
                onClick={() => setActiveCert(null)}
                className="btn-primary text-xs uppercase tracking-wider py-2.5 px-4 flex-1 text-center"
              >
                Request Certificate Copy
              </Link>
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                className="btn-secondary text-xs uppercase tracking-wider py-2.5 px-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
