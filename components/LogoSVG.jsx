// components/LogoSVG.jsx — ScoutX shield-X emblem
import Image from 'next/image';

export default function LogoSVG({ size = 40, className = '' }) {
  return (
    <Image
      src="/logo.jpeg"
      alt="ScoutX Protection Group Logo"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
