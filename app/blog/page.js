// app/blog/page.js — Public blog listing
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Image from 'next/image';
import pool from '@/lib/db';
import BlogCard from '@/components/BlogCard';
import FAQSection from '@/components/FAQSection';
import { readingTime } from '@/lib/readingTime';

export const metadata = {
  title: 'Security Insights & Guides | ScoutX Protection Group Blog',
  description: 'Expert guides on residential society security, PSARA compliance, guard deployment standards, and crime prevention in Ghaziabad, Noida & Delhi NCR.',
  alternates: { canonical: 'https://scoutxsecurity.com/blog' },
  openGraph: {
    title: 'Security Insights & Guides | ScoutX Protection Group Blog',
    description: 'Expert security advice, PSARA legal compliance guides, and guard deployment standards for NCR.',
    url: 'https://scoutxsecurity.com/blog',
    siteName: 'ScoutX Protection Group',
    type: 'website',
  },
};

const blogFaqs = [
  {
    q: 'How frequently does ScoutX publish security articles and industry updates?',
    a: 'We publish weekly research-backed guides covering private security laws (PSARA), RWA society guard sizing, factory loss prevention, and modern electronic surveillance best practices.',
  },
  {
    q: 'Can Resident Welfare Associations (RWAs) request a security consultation based on your guides?',
    a: 'Yes. Every guide is accompanied by direct access to our field supervisors. You can request a free on-site security survey and custom deployment blueprint directly through our contact page.',
  },
  {
    q: 'Are your articles written by certified security professionals?',
    a: 'All ScoutX blog content is authored and reviewed by licensed security consultants, operational directors, and ex-defence specialists with decades of boots-on-the-ground experience in Delhi NCR.',
  },
];

async function getPosts() {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, slug, excerpt, content, featured_image, published_at
       FROM blog_posts
       WHERE status = 'published' OR (status = 'scheduled' AND published_at <= NOW())
       ORDER BY published_at DESC`
    );
    return rows.map((post) => ({ ...post, reading_time: readingTime(post.content) }));
  } catch (error) {
    console.error('Fetch posts error:', error);
    return [];
  }
}

export default async function BlogIndexPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scoutxsecurity.com' },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://scoutxsecurity.com/blog' },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: 'ScoutX Security Insights & Blog',
              description: 'Guides on security guard deployment, PSARA compliance, and facility protection.',
              url: 'https://scoutxsecurity.com/blog',
              publisher: {
                '@type': 'Organization',
                name: 'ScoutX Protection Group Pvt. Ltd.',
                logo: 'https://scoutxsecurity.com/logo.png',
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: blogFaqs.map((faq) => ({
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
      <section className="relative pt-32 pb-16 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(30,77,140,0.25),transparent_70%)] blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="section-label">📰 ScoutX Field Intelligence</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase text-white mb-4">
            Security Insights &amp; <span className="text-gradient-steel">Blog</span>
          </h1>
          <div className="chrome-divider max-w-xs mx-auto" />
          <p className="text-[#A8A8A8] text-lg max-w-2xl mx-auto mt-6">
            Actionable security blueprints, PSARA regulatory compliance manuals, and ground-level deployment strategies across Ghaziabad, Noida &amp; Delhi NCR.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6" style={{ background: '#050914' }}>
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4 opacity-40">📰</div>
              <p className="text-[#A8A8A8]">No posts published yet. Check back soon.</p>
            </div>
          ) : (
            <>
              {/* Spotlight: latest post */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  title={`Read full article: ${featured.title}`}
                  className="group grid md:grid-cols-2 gap-0 bg-[#0A0F1F] border border-[#1A2235] rounded-lg overflow-hidden mb-14 hover:border-[#2E6FBF]/50 transition-all duration-300 hover:shadow-[0_25px_60px_-20px_rgba(46,111,191,0.4)]"
                >
                  <div className="relative h-64 md:h-full min-h-[280px] overflow-hidden">
                    {featured.featured_image ? (
                      <Image
                        src={`/uploads/blog/${featured.featured_image}`}
                        alt={`ScoutX Blog: ${featured.title}`}
                        title={featured.title}
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center relative"
                        style={{ background: 'linear-gradient(135deg, #111827 0%, #1E4D8C 55%, #2E6FBF 120%)' }}
                      >
                        <div className="absolute inset-0 tactical-grid opacity-20" />
                        <span className="text-7xl opacity-90 drop-shadow-lg">🛡️</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1F] via-transparent to-transparent md:bg-gradient-to-r" />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <span className="inline-block w-fit px-2.5 py-1 bg-[rgba(46,111,191,0.2)] text-[#4A8FD4] text-[10px] font-heading font-bold uppercase tracking-wider rounded mb-4">
                      Latest Featured Post
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#8A93A6] mb-3">
                      {featured.published_at && (
                        <span>{new Date(featured.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      )}
                      <span className="text-[#2A3550]">•</span>
                      <span>{featured.reading_time} min read</span>
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase text-white mb-4 leading-tight group-hover:text-[#4A8FD4] transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-[#A8A8A8] text-sm leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                    )}
                    <span className="inline-flex items-center gap-2 text-[#2E6FBF] text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                      Read Full Article <span>→</span>
                    </span>
                  </div>
                </Link>
              )}

              {rest.length > 0 && (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-[#A8A8A8] shrink-0">
                      Explore All Published Articles
                    </h2>
                    <div className="h-px flex-grow bg-[#1A2235]" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* 3 FAQs Section */}
      <FAQSection
        title="Frequently Asked Questions About Our Blog & Insights"
        subtitle="EDITORIAL & RESEARCH STANDARDS"
        description="Understanding how ScoutX compiles and publishes private security knowledge."
        faqs={blogFaqs}
      />
    </>
  );
}
