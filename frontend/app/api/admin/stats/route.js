// app/api/admin/stats/route.js

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(req) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const [[{ total: leads_total }]] = await pool.query('SELECT COUNT(*) as total FROM leads');
    const [[{ total: leads_new }]] = await pool.query('SELECT COUNT(*) as total FROM leads WHERE status = "new"');
    
    const [[{ total: apps_total }]] = await pool.query('SELECT COUNT(*) as total FROM applications');
    const [[{ total: apps_new }]] = await pool.query('SELECT COUNT(*) as total FROM applications WHERE status = "new"');
    
    const [[{ total: testimonials_total }]] = await pool.query('SELECT COUNT(*) as total FROM testimonials');

    return NextResponse.json({
      success: true,
      data: { leads_total, leads_new, apps_total, apps_new, testimonials_total },
    }, { status: 200 });

  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
