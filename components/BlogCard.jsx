import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ post, priority = false }) {
  const dateLabel = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  const imageUrl = post.featured_image
    ? (post.featured_image.startsWith('http') || post.featured_image.startsWith('/')
        ? post.featured_image
        : `/uploads/blog/${post.featured_image}`)
    : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-[#0A0F1F] border border-[#1A2235] rounded-lg overflow-hidden group hover:border-[#2E6FBF]/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-15px_rgba(46,111,191,0.35)] flex flex-col h-full"
    >
      <div className="relative w-full h-48 overflow-hidden shrink-0">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center relative"
            style={{ background: 'linear-gradient(135deg, #111827 0%, #1E4D8C 55%, #2E6FBF 120%)' }}
          >
            <div className="absolute inset-0 tactical-grid opacity-20" />
            <span className="text-5xl opacity-90 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">🛡️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1F]/70 via-transparent to-transparent" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#4A8FD4] mb-2">
          {dateLabel && <span>{dateLabel}</span>}
          {dateLabel && <span className="text-[#2A3550]">•</span>}
          <span className="text-[#8A93A6]">{post.reading_time || 1} min read</span>
        </div>

        <h3 className="font-heading text-lg font-bold uppercase text-white mb-2 tracking-wide leading-snug group-hover:text-[#4A8FD4] transition-colors">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-[#8A93A6] text-xs leading-relaxed line-clamp-3 flex-grow">{post.excerpt}</p>
        )}

        <span className="inline-flex items-center gap-1.5 mt-5 text-[#2E6FBF] text-[10px] font-bold uppercase tracking-widest group-hover:gap-2.5 transition-all">
          Read Article <span className="text-sm">→</span>
        </span>
      </div>
    </Link>
  );
}
