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
    const search = searchParams.get('search')?.trim();

    let conditions = [];
    let values = [];

    if (status) { conditions.push('status = ?'); values.push(status); }
    if (search) {
      conditions.push('(company_name LIKE ? OR contact_person LIKE ? OR phone LIKE ? OR city LIKE ?)');
      const q = `%${search}%`;
      values.push(q, q, q, q);
    }

    const whereClause = conditions.length ? ' WHERE ' + conditions.join(' AND ') : '';

    const query = `SELECT * FROM leads${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    const countQuery = `SELECT COUNT(*) as total FROM leads${whereClause}`;

    const [rows] = await pool.query(query, [...values, limit, offset]);
    const [[{ total }]] = await pool.query(countQuery, values);

    return NextResponse.json({ success: true, data: rows, total, page, limit }, { status: 200 });
  } catch (error) {
    console.error('Fetch leads error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
