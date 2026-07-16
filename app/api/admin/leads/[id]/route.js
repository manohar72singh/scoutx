// app/api/admin/leads/[id]/route.js

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function PATCH(req, { params }) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { status } = await req.json();
    const id = params.id;

    if (!status) {
      return NextResponse.json({ success: false, message: 'Status is required' }, { status: 400 });
    }

    await pool.query('UPDATE leads SET status = ? WHERE id = ?', [status, id]);
    return NextResponse.json({ success: true, message: 'Status updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Update lead error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
