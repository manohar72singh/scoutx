// app/blog/[slug]/page.js — Public blog post detail
export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import pool from '@/lib/db';
import BlogCard from '@/components/BlogCard';
import TableOfContents from '@/components/TableOfContents';
import BlogComments from '@/components/BlogComments';
import BlogShareButtons from '@/components/BlogShareButtons';
import FAQSection from '@/components/FAQSection';
import { readingTime } from '@/lib/readingTime';
import { extractHeadings } from '@/lib/extractHeadings';

async function getPost(slug) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM blog_posts
       WHERE slug = ? AND (status = 'published' OR (status = 'scheduled' AND published_at <= NOW()))
       LIMIT 1`,
      [slug]
    );
    return rows[0] || null;
  } catch (err) {
    console.error('getPost error:', err);
    return null;
  }
}

async function getRelatedPosts(excludeId) {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, slug, excerpt, content, featured_image, published_at
       FROM blog_posts
       WHERE (status = 'published' OR (status = 'scheduled' AND published_at <= NOW())) AND id != ?
       ORDER BY published_at DESC
       LIMIT 3`,
      [excludeId]
    );
    return rows.map((post) => ({ ...post, reading_time: readingTime(post.content) }));
  } catch (err) {
    console.error('getRelatedPosts error:', err);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = post.meta_title || `${post.title} | ScoutX Security`;
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
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

const articleFaqs = [
  {
    q: 'How does ScoutX ensure the operational advice in this article is practiced on site?',
    a: 'Every protocol detailed in our guides is integrated into our guard training curriculum and enforced through daily GPS attendance logging and random supervisor site audits.',
  },
  {
    q: 'Can ScoutX customize a security deployment plan based on these guidelines for our premises?',
    a: 'Yes. Our security directors conduct free on-site risk assessments across Ghaziabad, Noida, Greater Noida, and Delhi NCR to draft a tailor-made deployment plan within 24 hours.',
  },
  {
    q: 'What legal compliance documents does ScoutX provide upon guard deployment?',
    a: 'We provide our official UP-PSARA license certificate, police character clearance slips for every guard, ESIC/EPFO registration documents, and comprehensive Workmen’s Compensation insurance policies.',
  },
];

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
              image: image ? [image] : ['https://scoutxsecurity.com/logo.png'],
              datePublished: post.published_at,
              dateModified: post.updated_at,
              author: {
                '@type': 'Organization',
                name: 'ScoutX Protection Group Pvt. Ltd.',
                url: 'https://scoutxsecurity.com',
              },
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
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: articleFaqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            },
          ]),
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-14 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#8A93A6] mb-6">
            <Link href="/" title="ScoutX Home" className="hover:text-white transition-colors">Home</Link>
            <span className="text-[#2A3550]">/</span>
            <Link href="/blog" title="ScoutX Security Blog" className="hover:text-white transition-colors">Blog</Link>
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
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.featured_image.startsWith('http') || post.featured_image.startsWith('/')
                  ? post.featured_image
                  : `/uploads/blog/${post.featured_image}`}
                alt={post.title}
                title={post.title}
                className="w-full h-full object-cover"
              />
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

          {/* Multi-Platform Social Share Row */}
          <BlogShareButtons title={post.title} url={url} />

          {/* Table of contents */}
          <TableOfContents headings={headings} />

          {/* Article content */}
          <article className="blog-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />

          {/* CTA */}
          <div className="mt-16 p-8 rounded-lg text-center border border-[#1A2235]" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
            <h3 className="font-heading text-lg font-bold uppercase text-white mb-2">
              Need Professional PSARA-Licensed Security Guards?
            </h3>
            <p className="text-[#A8A8A8] text-xs sm:text-sm mb-6 max-w-md mx-auto">
              Get a customized security deployment plan and transparent quote within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact#quote" title="Get a free security quote" className="btn-primary text-xs uppercase tracking-wider px-6 py-3 inline-flex justify-center">
                Get a Free Quote →
              </Link>
              <a href="tel:+918682066666" title="Call ScoutX Security Director" className="btn-secondary text-xs uppercase tracking-wider px-6 py-3 inline-flex justify-center">
                📞 Call +91 86820 66666
              </a>
            </div>
          </div>

          {/* Interactive Comments Section */}
          <BlogComments postSlug={post.slug} postId={post.id} />
        </div>
      </section>

      {/* 3 FAQs Section */}
      <FAQSection
        title="Key Questions on Security Implementation"
        subtitle="GROUND-LEVEL PROTOCOLS"
        description="Common operational questions related to guard deployment and compliance."
        faqs={articleFaqs}
      />

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 border-t border-[#1A2235]" style={{ background: '#0A0F1F' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-[#A8A8A8] shrink-0">
                Recommended Related Articles
              </h2>
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
