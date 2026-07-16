'use client';
// components/FloatingPhone.jsx

import { useState } from 'react';

export default function FloatingPhone() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="tel:+918682066666"
      aria-label="Call ScoutX Protection Group"
      className="fixed bottom-[4.5rem] right-4 z-50 flex items-center gap-3 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <div
        className={`
          hidden md:flex items-center px-3 py-2 rounded-lg text-white text-sm font-medium
          transition-all duration-300 whitespace-nowrap
          bg-[#1E4D8C] shadow-lg
          ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}
        `}
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        📞 Call Us for a Free Quote
      </div>

      {/* Button */}
      <div className="relative">
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full bg-[#2E6FBF] animate-ping opacity-40"
          style={{ animationDuration: '2s' }}
        />
        <div
          className="relative w-11 h-11 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #4A8FD4, #1E4D8C)',
            boxShadow: '0 4px 24px rgba(46,111,191,0.4)',
          }}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </div>
      </div>
    </a>
  );
}
