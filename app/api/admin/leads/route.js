// app/api/admin/leads/route.js

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(req) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const offset = (page - 1) * limit;
    const status = searchParams.get('status');

    let query = 'SELECT * FROM leads';
    let countQuery = 'SELECT COUNT(*) as total FROM leads';
    let values = [];

    if (status) {
      query += ' WHERE status = ?';
      countQuery += ' WHERE status = ?';
      values.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    values.push(limit, offset);

    const [rows] = await pool.query(query, values);
    const [[{ total }]] = await pool.query(countQuery, status ? [status] : []);

    return NextResponse.json({ success: true, data: rows, total, page, limit }, { status: 200 });
  } catch (error) {
    console.error('Fetch leads error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
