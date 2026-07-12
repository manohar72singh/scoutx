// app/api/admin/testimonials/[id]/route.js

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function PUT(req, { params }) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { client_name, client_company, quote_text, is_featured } = await req.json();
    const id = params.id;

    if (!client_name || !quote_text) {
      return NextResponse.json({ success: false, message: 'Name and quote are required' }, { status: 400 });
    }

    const query = 'UPDATE testimonials SET client_name=?, client_company=?, quote_text=?, is_featured=? WHERE id=?';
    const values = [client_name, client_company || null, quote_text, is_featured ? 1 : 0, id];
    await pool.execute(query, values);

    return NextResponse.json({ success: true, message: 'Testimonial updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Update testimonial error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const id = params.id;
    await pool.execute('DELETE FROM testimonials WHERE id=?', [id]);
    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
