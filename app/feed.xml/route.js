// app/feed.xml/route.js — Dynamic RSS Feed for Google & Feed Crawlers
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = 'https://scoutxsecurity.com';
  let posts = [];

  try {
    const [rows] = await pool.query(
      `SELECT title, slug, excerpt, published_at, updated_at 
       FROM blog_posts 
       WHERE status = 'published' OR (status = 'scheduled' AND published_at <= NOW())
       ORDER BY published_at DESC 
       LIMIT 20`
    );
    posts = rows;
  } catch (error) {
    console.error('Failed to generate RSS feed from DB', error);
  }

  const itemsXml = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || post.title}]]></description>
      <pubDate>${new Date(post.published_at || post.updated_at || Date.now()).toUTCString()}</pubDate>
    </item>`
    )
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ScoutX Protection Group Security Insights &amp; Updates</title>
    <link>${baseUrl}</link>
    <description>Latest security guides, PSARA compliance insights, and guard deployment standards across Ghaziabad, Noida &amp; Delhi NCR.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
