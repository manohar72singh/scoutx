'use client';
import Link from 'next/link';

export default function ServiceCard({ icon, badge, title, children, link, linkText }) {
  return (
    <div className="card-dark p-6 flex flex-col h-full hover:border-[#2E6FBF]/50 transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300 shrink-0">
          {icon}
        </span>
        <div>
          {badge && (
            <div className="inline-block px-2 py-0.5 bg-[rgba(46,111,191,0.2)] text-[#4A8FD4] text-[10px] font-heading font-bold uppercase tracking-wider rounded mb-1">
              {badge}
            </div>
          )}
          <h2 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] group-hover:text-white transition-colors leading-tight">
            {title}
          </h2>
        </div>
      </div>
      
      <div className="flex-grow text-[#A8A8A8] text-sm leading-relaxed mb-6 space-y-4">
        {children}
      </div>

      {link && (
        <div className="mt-auto">
          <Link href={link} className="inline-flex items-center gap-2 text-[#2E6FBF] text-xs font-heading font-bold uppercase tracking-wider hover:text-[#4A8FD4] transition-colors group/link">
            {linkText || 'Learn More'}
            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
