// app/api/blog/route.js
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, slug, excerpt, featured_image, published_at
       FROM blog_posts
       WHERE status = 'published'
       ORDER BY published_at DESC`
    );

    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error) {
    console.error('Fetch blog posts error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
