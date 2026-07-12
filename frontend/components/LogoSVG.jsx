// components/LogoSVG.jsx — ScoutX shield-X emblem

export default function LogoSVG({ size = 40, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ScoutX Protection Group logo"
    >
      <defs>
        {/* Chrome/silver gradient for shield border */}
        <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#E8E8E8" />
          <stop offset="40%"  stopColor="#C0C0C0" />
          <stop offset="100%" stopColor="#909090" />
        </linearGradient>
        {/* Steel blue gradient for X */}
        <linearGradient id="steelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#4A8FD4" />
          <stop offset="50%"  stopColor="#2E6FBF" />
          <stop offset="100%" stopColor="#1E4D8C" />
        </linearGradient>
        {/* Inner shield fill */}
        <linearGradient id="innerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#111827" />
          <stop offset="100%" stopColor="#0A0F1F" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer shield — chrome border */}
      <path
        d="M40 2 L74 14 L74 46 C74 64 58 80 40 88 C22 80 6 64 6 46 L6 14 Z"
        fill="url(#silverGrad)"
      />
      {/* Bevel highlight */}
      <path
        d="M40 6 L70 17 L70 46 C70 62 55 77 40 84"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
        fill="none"
      />
      {/* Inner shield fill */}
      <path
        d="M40 8 L70 19 L70 46 C70 62 55 77 40 84 C25 77 10 62 10 46 L10 19 Z"
        fill="url(#innerGrad)"
      />
      {/* Inner chrome rim */}
      <path
        d="M40 8 L70 19 L70 46 C70 62 55 77 40 84 C25 77 10 62 10 46 L10 19 Z"
        fill="none"
        stroke="url(#silverGrad)"
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* X mark — steel blue */}
      <g filter="url(#glow)">
        <line x1="23" y1="28" x2="57" y2="62" stroke="url(#steelGrad)" strokeWidth="8" strokeLinecap="round" />
        <line x1="57" y1="28" x2="23" y2="62" stroke="url(#steelGrad)" strokeWidth="8" strokeLinecap="round" />
        {/* X highlight */}
        <line x1="24" y1="28" x2="38" y2="42" stroke="rgba(255,255,255,0.25)" strokeWidth="3" strokeLinecap="round" />
        <line x1="56" y1="28" x2="42" y2="42" stroke="rgba(255,255,255,0.25)" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}
