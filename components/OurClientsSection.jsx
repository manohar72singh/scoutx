'use client';

import FadeIn from './FadeIn';

const clients = [
  "Orriva By Lotus",
  "Wedding Crown Banquets",
  "Evara Banquets",
  "Vione Banquets",
  "Kaizen Agrochem",
  "Galaxy Mall"
];

export default function OurClientsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-[#050914] relative overflow-hidden border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#2E6FBF] text-xs font-bold uppercase tracking-[0.2em]">Trusted By</span>
          <h2 className="font-heading text-4xl md:text-5xl font-black uppercase text-white mt-2">
            OUR <span className="text-[#2E6FBF]">CLIENTS</span>
          </h2>
          <div className="w-16 h-1 bg-[#2E6FBF] mx-auto mt-6" />
        </div>

        <FadeIn className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {clients.map((client, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-center p-6 bg-[#0B0B0D] border border-[#1A233A] rounded-xl hover:border-[#2E6FBF] transition-all duration-300 group"
            >
              <span className="font-heading font-bold text-center text-[#A8A8A8] group-hover:text-white transition-colors duration-300">
                {client}
              </span>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
