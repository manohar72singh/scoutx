'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function AnimatedStats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="flex flex-wrap gap-8 sm:gap-12 text-white/90">
      <div>
        <div className="font-heading font-bold text-2xl tracking-tight">
          {inView ? <CountUp end={500} duration={2.5} /> : '0'}+
        </div>
        <div className="text-[10px] uppercase tracking-widest text-[#A8A8A8] mt-1">GUARDS DEPLOYED</div>
      </div>
      <div>
        <div className="font-heading font-bold text-2xl tracking-tight">
          {inView ? <CountUp end={5} duration={2.5} /> : '0'}+
        </div>
        <div className="text-[10px] uppercase tracking-widest text-[#A8A8A8] mt-1">YEARS EXPERIENCE</div>
      </div>
      <div>
        <div className="font-heading font-bold text-2xl tracking-tight">PSARA</div>
        <div className="text-[10px] uppercase tracking-widest text-[#A8A8A8] mt-1">LICENSED & CERTIFIED</div>
      </div>
      <div>
        <div className="font-heading font-bold text-2xl tracking-tight">
          {inView ? <CountUp end={100} duration={2.5} /> : '0'}%
        </div>
        <div className="text-[10px] uppercase tracking-widest text-[#A8A8A8] mt-1">POLICE VERIFIED</div>
      </div>
    </div>
  );
}
