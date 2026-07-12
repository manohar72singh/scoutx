// app/api/testimonials/route.js

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured') === 'true';

    let query = 'SELECT * FROM testimonials';
    let values = [];

    if (featured) {
      query += ' WHERE is_featured = true';
    }
    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, values);

    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error) {
    console.error('Fetch testimonials error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
