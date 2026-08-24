// app/api/admin/stats/route.js
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(req) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const [[{ total: leads_total }]] = await pool.query('SELECT COUNT(*) as total FROM leads');
    const [[{ total: leads_new }]] = await pool.query('SELECT COUNT(*) as total FROM leads WHERE status = "new"');
    const [[{ total: leads_today }]] = await pool.query('SELECT COUNT(*) as total FROM leads WHERE DATE(created_at) = CURDATE()');
    
    const [[{ total: apps_total }]] = await pool.query('SELECT COUNT(*) as total FROM applications');
    const [[{ total: apps_new }]] = await pool.query('SELECT COUNT(*) as total FROM applications WHERE status = "new"');
    const [[{ total: apps_today }]] = await pool.query('SELECT COUNT(*) as total FROM applications WHERE DATE(created_at) = CURDATE()');
    
    const [[{ total: testimonials_total }]] = await pool.query('SELECT COUNT(*) as total FROM testimonials');

    let comments_total = 0;
    try {
      const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM blog_comments');
      comments_total = total;
    } catch {
      comments_total = 0;
    }

    let posts_total = 0;
    try {
      const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM blog_posts');
      posts_total = total;
    } catch {
      posts_total = 0;
    }

    return NextResponse.json({
      success: true,
      data: {
        leads_total,
        leads_new,
        leads_today,
        apps_total,
        apps_new,
        apps_today,
        testimonials_total,
        comments_total,
        posts_total,
      },
    }, { status: 200 });

  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
