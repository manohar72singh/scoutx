// app/api/blog/[slug]/route.js
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req, { params }) {
  try {
    const { slug } = await params;

    const [rows] = await pool.query(
      `SELECT * FROM blog_posts WHERE slug = ? AND status = 'published' LIMIT 1`,
      [slug]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Fetch blog post error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
