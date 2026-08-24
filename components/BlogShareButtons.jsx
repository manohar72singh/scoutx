'use client';
// components/BlogShareButtons.jsx — Multi-platform social share component for blog posts

import { useState } from 'react';

export default function BlogShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`Check out this security guide from ScoutX: ${url}`)}`,
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Read this guide on ScoutX Security: ${title}`,
          url,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 py-4 border-y border-[#1A2235] my-8">
      <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#8A93A6] mr-1 flex items-center gap-1.5">
        <span>📢</span> Share Article:
      </span>

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on WhatsApp"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-xs font-bold font-heading uppercase tracking-wider group"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        WhatsApp
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on LinkedIn"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all text-xs font-bold font-heading uppercase tracking-wider group"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
        LinkedIn
      </a>

      {/* Twitter / X */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on X (Twitter)"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/15 text-white hover:bg-white hover:text-black transition-all text-xs font-bold font-heading uppercase tracking-wider group"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        X / Twitter
      </a>

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Facebook"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all text-xs font-bold font-heading uppercase tracking-wider group"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
        </svg>
        Facebook
      </a>

      {/* Telegram */}
      <a
        href={shareLinks.telegram}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Telegram"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0088cc]/10 border border-[#0088cc]/30 text-[#0088cc] hover:bg-[#0088cc] hover:text-white transition-all text-xs font-bold font-heading uppercase tracking-wider group"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/>
        </svg>
        Telegram
      </a>

      {/* Email */}
      <a
        href={shareLinks.email}
        title="Share via Email"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2E6FBF]/10 border border-[#2E6FBF]/30 text-[#4A8FD4] hover:bg-[#2E6FBF] hover:text-white transition-all text-xs font-bold font-heading uppercase tracking-wider group"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        Email
      </a>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopy}
        title="Copy Link to Clipboard"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-heading uppercase tracking-wider transition-all ${
          copied
            ? 'bg-emerald-600 text-white border border-emerald-500'
            : 'bg-[#111827] border border-[#2A3550] text-[#C0C0C0] hover:text-white hover:border-[#4A8FD4]'
        }`}
      >
        <span>{copied ? '✓' : '🔗'}</span>
        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>

      {/* Mobile Web Share Button (shown if browser supports navigator.share) */}
      {typeof window !== 'undefined' && typeof navigator !== 'undefined' && Boolean(navigator.share) && (
        <button
          type="button"
          onClick={handleNativeShare}
          title="Share on device apps"
          className="inline-flex sm:hidden items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#1E4D8C] to-[#2E6FBF] text-white text-xs font-bold font-heading uppercase tracking-wider"
        >
          <span>📲</span> More Apps
        </button>
      )}
    </div>
  );
}
