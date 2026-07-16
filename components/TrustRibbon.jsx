// components/TrustRibbon.jsx
export default function TrustRibbon() {
  return (
    <div className="bg-[#1E4D8C] text-white py-2 px-4 hidden sm:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-[0.65rem] md:text-[0.7rem] font-heading font-bold uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            PSARA Licensed Agency
          </span>
          <span className="opacity-50">|</span>
          <span className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            100% Police Verified Guards
          </span>
          <span className="hidden md:inline opacity-50">|</span>
          <span className="hidden md:flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            Ex-Army Supervisors
          </span>
        </div>
        <div className="flex items-center gap-4 text-white/90">
          <span className="flex items-center gap-1.5">ISO 9001:2015 CERTIFIED</span>
          <span className="hidden lg:inline opacity-50">|</span>
          <span className="hidden lg:flex items-center gap-1.5">24/7 CONTROL ROOM</span>
        </div>
      </div>
    </div>
  );
}
