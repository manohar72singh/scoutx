'use client';
// components/ClientLogoMarquee.jsx
import { motion } from 'framer-motion';

const clients = [
  { name: "TATA MOTORS", icon: <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2"/><path strokeWidth="2" strokeLinecap="round" d="M8 8h8M12 8v8"/></svg> },
  { name: "DLF BUILDERS", icon: <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg> },
  { name: "HDFC BANK", icon: <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/></svg> },
  { name: "FORTIS HOSPITAL", icon: <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16"/></svg> },
  { name: "AMAZON WAREHOUSING", icon: <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg> },
  { name: "RELIANCE RETAIL", icon: <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> },
  { name: "L&T CONSTRUCTION", icon: <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon strokeWidth="2" strokeLinejoin="round" points="12,2 22,22 2,22"/></svg> },
  { name: "MAX HEALTHCARE", icon: <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg> },
];

export default function ClientLogoMarquee() {
  return (
    <div className="w-full bg-[#0B0B0D] border-y border-[rgba(192,192,192,0.1)] py-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-[#A8A8A8]">
          Trusted by Industry Leaders
        </h3>
      </div>
      
      {/* Left/Right Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0B0D] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0B0D] to-transparent z-10" />

      <div className="flex overflow-hidden group">
        <motion.div
          className="flex min-w-full flex-shrink-0 items-center justify-around gap-8 px-4"
          animate={{ x: [0, "-100%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35
          }}
        >
          {clients.map((client, i) => (
            <div key={i} className="flex flex-shrink-0 items-center font-heading text-xl font-bold uppercase tracking-wider text-[#707070] hover:text-[#C0C0C0] transition-colors cursor-default whitespace-nowrap">
              {client.icon}
              {client.name}
            </div>
          ))}
        </motion.div>
        <motion.div
          className="flex min-w-full flex-shrink-0 items-center justify-around gap-8 px-4"
          animate={{ x: [0, "-100%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35
          }}
        >
          {clients.map((client, i) => (
            <div key={i + clients.length} className="flex flex-shrink-0 items-center font-heading text-xl font-bold uppercase tracking-wider text-[#707070] hover:text-[#C0C0C0] transition-colors cursor-default whitespace-nowrap">
              {client.icon}
              {client.name}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
