// components/TableOfContents.jsx
'use client';

import { useState, useEffect } from 'react';

export default function TableOfContents({ headings = [], title = 'In This Article' }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0.1 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of Contents"
      className="card-dark p-6 mb-10 border border-[#1A2235] bg-[#0A0F1F] rounded-xl shadow-lg relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#2E6FBF] to-[#1E4D8C]" />
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1A2235]">
        <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-[#E8E8E8] flex items-center gap-2">
          <span>📑</span> {title}
        </h2>
        <span className="text-[10px] uppercase font-bold text-[#8A93A6]">
          {headings.length} Sections
        </span>
      </div>
      <ol className="space-y-2.5">
        {headings.map((h, i) => {
          const isActive = activeId === h.id;
          return (
            <li
              key={h.id}
              className={`transition-colors ${
                h.level === 3 ? 'pl-5 text-xs' : h.level === 4 ? 'pl-8 text-xs' : 'text-sm'
              }`}
            >
              <a
                href={`#${h.id}`}
                title={`Jump to ${h.text}`}
                className={`flex items-start gap-2.5 transition-all duration-200 group ${
                  isActive
                    ? 'text-[#4A8FD4] font-semibold translate-x-1'
                    : 'text-[#C0C0C0] hover:text-white hover:translate-x-0.5'
                }`}
              >
                <span
                  className={`font-heading font-bold text-xs shrink-0 mt-0.5 transition-colors ${
                    isActive ? 'text-[#4A8FD4]' : 'text-[#2E6FBF] group-hover:text-white'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <span className="leading-snug">{h.text}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
