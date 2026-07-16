// components/WhyChooseUsSection.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

// ── Why Choose Us Data ─────────────────────────────────────────────────────────
const whyUs = [
  {
    icon: '📄',
    title: 'PSARA LICENSED',
    desc: 'India’s Private Security Agencies Regulation Act (PSARA) mandates licensing for all security agencies. ScoutX operates fully within PSARA, ensuring your security contract is legally valid and enforceable.',
  },
  {
    icon: '✅',
    title: 'POLICE VERIFICATION',
    desc: 'Every guard undergoes rigorous verification, criminal background checks, police certifications, and character assessment before deployment.',
  },
  {
    icon: '🎓',
    title: 'PROFESSIONAL TRAINING',
    desc: 'Guards receive 160+ hours of physical training, fire safety, first aid, crowd control, and communication skills at our training facility.',
  },
  {
    icon: '👕',
    title: 'UNIFORM & EQUIPMENT',
    desc: 'Standardised ScoutX uniform, photo ID, boots, baton, walkie-talkie, and shift diary provided to every deployed guard.',
  },
  {
    icon: '🛡️',
    title: 'INSURANCE COVERAGE',
    desc: 'All guards covered under workmen’s compensation insurance. You are protected from liability in the unlikely event of an on-duty incident.',
  },
  {
    icon: '📋',
    title: 'SUPERVISOR ROUNDS',
    desc: 'Dedicated supervisors conduct surprise rounds (day and night) to log attendance and ensure guards are alert and on their post.',
  },
];

export default function WhyChooseUsSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#050914]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left side text */}
          <div className="lg:w-5/12">
            <span className="text-[#2E6FBF] text-xs font-bold uppercase tracking-[0.2em]">WHY CHOOSE SCOUTX</span>
            <h2 className="font-heading text-4xl md:text-5xl font-black uppercase mt-2 mb-6 leading-[1.1] text-white">
              NOT JUST GUARDS — <br />
              <span className="text-[#2E6FBF]">A SECURITY PARTNER</span>
            </h2>
            <p className="text-[#A8A8A8] text-sm leading-relaxed mb-8">
              In a crowded market of security agencies, the difference between a mediocre agency and a great one is invisible — until something goes wrong. ScoutX's process is built to make sure nothing does.
            </p>
            
            <div className="border border-[#1A2235] bg-[#0A0F1F] p-5 rounded flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#2E6FBF]/20 flex items-center justify-center text-[#2E6FBF]">
                🛡️
              </div>
              <div>
                <div className="text-[10px] text-[#A8A8A8] uppercase tracking-widest font-bold">PSARA LICENSE NUMBER</div>
                <div className="font-heading text-lg font-bold text-white tracking-wider">UP-PSARA-XXXX-2024</div>
              </div>
            </div>

            <Link href="/about" className="bg-[#2E6FBF] hover:bg-[#1E4D8C] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded inline-flex items-center gap-2 transition-colors">
              LEARN MORE ABOUT OUR PROCESS <span className="text-lg leading-none">→</span>
            </Link>
          </div>

          {/* Right side list - ACCORDION */}
          <div className="lg:w-7/12">
            <div className="flex flex-col gap-4">
              {whyUs.map((item, i) => {
                const isOpen = openIdx === i;
                return (
                  <div 
                    key={i} 
                    className={`border border-[#1A2235] rounded overflow-hidden transition-all duration-300 ${isOpen ? 'bg-[rgba(46,111,191,0.05)] border-[#2E6FBF]/30' : 'bg-[#0A0F1F] hover:border-[#2E6FBF]/20'}`}
                  >
                    <button
                      onClick={() => setOpenIdx(isOpen ? -1 : i)}
                      className="w-full text-left flex items-center gap-4 p-4 focus:outline-none"
                    >
                      <div className={`w-10 h-10 shrink-0 rounded flex items-center justify-center text-lg transition-colors ${isOpen ? 'bg-[#2E6FBF] text-white' : 'bg-[#111827] border border-[#1F2937]'}`}>
                        {item.icon}
                      </div>
                      <div className="flex-grow">
                        <h3 className={`font-heading text-sm font-bold uppercase tracking-wide transition-colors ${isOpen ? 'text-[#4A8FD4]' : 'text-white'}`}>
                          {item.title}
                        </h3>
                      </div>
                      <div className={`text-[#A8A8A8] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#2E6FBF]' : ''}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    <div 
                      className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="p-4 pt-0 pl-[4.5rem]">
                        <p className="text-[#8A93A6] text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
