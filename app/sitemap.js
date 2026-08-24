// app/sitemap.js — Dynamic sitemap for Google Search Console indexing
export const dynamic = 'force-dynamic';

import pool from '@/lib/db';
import { locationsData, locationSlugs } from '@/lib/locationsData';
import { servicesData, serviceSlugs } from '@/lib/servicesData';
import { keywordSlugs } from '@/lib/keywordsData';

export default async function sitemap() {
  const baseUrl = 'https://scoutxsecurity.com';
  const now = new Date();

  // Core Static Pages
  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/industries`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/why-choose-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/testimonials`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/html-sitemap`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Core Services
  const servicePages = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Top 8 Cities
  const cityPages = [
    'security-guards-ghaziabad',
    'security-guards-noida',
    'security-guards-greater-noida',
    'security-guards-delhi',
    'security-guards-gurgaon',
    'security-guards-faridabad',
    'security-guards-meerut',
    'security-guards-hapur',
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Shopping Malls & Micro-Hubs
  const locationHubPages = locationSlugs.map((slug) => ({
    url: `${baseUrl}/locations/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Programmatic Service x Location Matrix Pages
  const serviceLocationPages = [];
  for (const locationSlug of locationSlugs) {
    for (const serviceSlug of serviceSlugs) {
      serviceLocationPages.push({
        url: `${baseUrl}/locations/${locationSlug}/${serviceSlug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    }
  }

  // Targeted High-Intent Keyword Pages
  const keywordPages = keywordSlugs.map((slug) => ({
    url: `${baseUrl}/security-services/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Blog Posts
  let blogPages = [];
  try {
    const [rows] = await pool.query(
      `SELECT slug, updated_at FROM blog_posts WHERE status = 'published' OR (status = 'scheduled' AND published_at <= NOW())`
    );
    blogPages = rows.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updated_at,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Sitemap: failed to load blog posts', error);
  }

  const blogIndex = [
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  return [
    ...staticPages,
    ...servicePages,
    ...cityPages,
    ...locationHubPages,
    ...serviceLocationPages,
    ...keywordPages,
    ...blogIndex,
    ...blogPages,
  ];
}
