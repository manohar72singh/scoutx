// app/blog/[slug]/page.js — Public blog post detail
export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import pool from '@/lib/db';
import BlogCard from '@/components/BlogCard';
import { readingTime } from '@/lib/readingTime';
import { extractHeadings } from '@/lib/extractHeadings';

async function getPost(slug) {
  const [rows] = await pool.query(
    `SELECT * FROM blog_posts WHERE slug = ? AND status = 'published' LIMIT 1`,
    [slug]
  );
  return rows[0] || null;
}

async function getRelatedPosts(excludeId) {
  const [rows] = await pool.query(
    `SELECT id, title, slug, excerpt, content, featured_image, published_at
     FROM blog_posts
     WHERE status = 'published' AND id != ?
     ORDER BY published_at DESC
     LIMIT 3`,
    [excludeId]
  );
  return rows.map((post) => ({ ...post, reading_time: readingTime(post.content) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || `${post.title} — ScoutX Protection Group Pvt. Ltd.`;
  const url = `https://scoutxsecurity.com/blog/${post.slug}`;
  const image = post.featured_image
    ? `https://scoutxsecurity.com/uploads/blog/${post.featured_image}`
    : 'https://scoutxsecurity.com/logo.png';

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      images: [{ url: image }],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [relatedPosts] = await Promise.all([getRelatedPosts(post.id)]);

  const url = `https://scoutxsecurity.com/blog/${post.slug}`;
  const image = post.featured_image ? `https://scoutxsecurity.com/uploads/blog/${post.featured_image}` : undefined;
  const minutes = readingTime(post.content);
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(`${post.title} — ${url}`)}`;
  const { html: contentHtml, headings } = extractHeadings(post.content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: post.title,
              description: post.meta_description || post.excerpt,
              image: image ? [image] : undefined,
              datePublished: post.published_at,
              dateModified: post.updated_at,
              author: { '@type': 'Organization', name: 'ScoutX Protection Group Pvt. Ltd.' },
              publisher: {
                '@type': 'Organization',
                name: 'ScoutX Protection Group Pvt. Ltd.',
                logo: { '@type': 'ImageObject', url: 'https://scoutxsecurity.com/logo.png' },
              },
              mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scoutxsecurity.com' },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://scoutxsecurity.com/blog' },
                { '@type': 'ListItem', position: 3, name: post.title, item: url },
              ],
            },
          ]),
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-14 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#8A93A6] mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-[#2A3550]">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="text-[#2A3550]">/</span>
            <span className="text-[#4A8FD4] truncate max-w-[200px]">{post.title}</span>
          </nav>

          <h1 className="font-heading text-3xl md:text-5xl font-bold uppercase text-white mb-5 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#A8A8A8]">
            {post.published_at && (
              <span className="flex items-center gap-1.5">
                📅 {new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
            <span className="text-[#2A3550]">•</span>
            <span className="flex items-center gap-1.5">⏱️ {minutes} min read</span>
            <span className="text-[#2A3550]">•</span>
            <span className="flex items-center gap-1.5">🛡️ ScoutX Protection Group</span>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6" style={{ background: '#050914' }}>
        <div className="max-w-3xl mx-auto">
          {/* Featured image / gradient banner */}
          <div className="relative w-full h-72 md:h-[26rem] rounded-lg overflow-hidden mb-10 border border-[#1A2235]">
            {post.featured_image ? (
              <Image src={`/uploads/blog/${post.featured_image}`} alt={post.title} fill className="object-cover" priority />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center relative"
                style={{ background: 'linear-gradient(135deg, #111827 0%, #1E4D8C 55%, #2E6FBF 120%)' }}
              >
                <div className="absolute inset-0 tactical-grid opacity-20" />
                <span className="text-8xl opacity-90 drop-shadow-lg">🛡️</span>
              </div>
            )}
          </div>

          {/* Share row */}
          <div className="flex items-center gap-3 mb-10 pb-8 border-b border-[#1A2235]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A93A6]">Share</span>
            <a
              href={whatsappShare}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-bold rounded hover:bg-[#25D366]/20 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp
            </a>
          </div>

          {/* Table of contents */}
          {headings.length > 1 && (
            <div className="card-dark p-6 mb-10">
              <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-[#A8A8A8] mb-4">In This Article</h2>
              <ol className="space-y-2.5">
                {headings.map((h, i) => (
                  <li key={h.id} className={h.level === 3 ? 'pl-5' : ''}>
                    <a href={`#${h.id}`} className="flex items-start gap-2.5 text-sm text-[#C0C0C0] hover:text-[#4A8FD4] transition-colors">
                      <span className="text-[#2E6FBF] font-heading font-bold text-xs shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Article content */}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />

          {/* CTA */}
          <div className="mt-16 p-8 rounded-lg text-center border border-[#1A2235]" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
            <p className="text-[#E8E8E8] font-heading uppercase tracking-wide text-sm mb-4">Need professional security guards for your premises?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact#quote" className="btn-primary text-sm px-6 py-3 inline-flex justify-center">
                Get a Free Quote →
              </Link>
              <a href="tel:+918682066666" className="btn-secondary text-sm px-6 py-3 inline-flex justify-center">
                📞 Call +91 86820 66666
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 border-t border-[#1A2235]" style={{ background: '#0A0F1F' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-[#A8A8A8] shrink-0">Read Next</h2>
              <div className="h-px flex-grow bg-[#1A2235]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <BlogCard key={related.id} post={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
