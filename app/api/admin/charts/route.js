// app/api/admin/charts/route.js
// Returns monthly leads + applications data for dashboard charts

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(req) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    // Last 6 months leads per month
    const [leadsByMonth] = await pool.query(`
      SELECT 
        DATE_FORMAT(created_at, '%b %Y') as month,
        DATE_FORMAT(created_at, '%Y-%m') as month_key,
        COUNT(*) as count
      FROM leads
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY month_key, month
      ORDER BY month_key ASC
    `);

    // Last 6 months applications per month
    const [appsByMonth] = await pool.query(`
      SELECT 
        DATE_FORMAT(created_at, '%b %Y') as month,
        DATE_FORMAT(created_at, '%Y-%m') as month_key,
        COUNT(*) as count
      FROM applications
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY month_key, month
      ORDER BY month_key ASC
    `);

    // Leads by status breakdown
    const [leadsByStatus] = await pool.query(`
      SELECT status, COUNT(*) as count FROM leads GROUP BY status
    `);

    return NextResponse.json({
      success: true,
      data: { leadsByMonth, appsByMonth, leadsByStatus },
    });
  } catch (error) {
    console.error('Charts error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
