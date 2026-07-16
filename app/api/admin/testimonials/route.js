// app/api/admin/testimonials/route.js

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(req) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error) {
    console.error('Fetch testimonials error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}

export async function POST(req) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { client_name, client_company, quote_text, is_featured } = await req.json();

    if (!client_name || !quote_text) {
      return NextResponse.json({ success: false, message: 'Name and quote are required' }, { status: 400 });
    }

    const query = 'INSERT INTO testimonials (client_name, client_company, quote_text, is_featured) VALUES (?, ?, ?, ?)';
    const values = [client_name, client_company || null, quote_text, is_featured ? 1 : 0];
    const [result] = await pool.execute(query, values);

    return NextResponse.json({ success: true, message: 'Testimonial added successfully', id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Add testimonial error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
