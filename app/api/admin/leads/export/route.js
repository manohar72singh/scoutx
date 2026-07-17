// app/api/admin/leads/export/route.js
// Exports ALL leads as CSV download

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(req) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let query = 'SELECT id, company_name, contact_person, phone, email, city, guards_needed, service_type, message, status, created_at FROM leads';
    const values = [];

    if (status) {
      query += ' WHERE status = ?';
      values.push(status);
    }
    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, values);

    // Build CSV
    const headers = ['ID', 'Company Name', 'Contact Person', 'Phone', 'Email', 'City', 'Guards Needed', 'Service Type', 'Message', 'Status', 'Submitted On'];
    
    const escape = (val) => {
      if (val == null) return '';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const csvRows = [
      headers.join(','),
      ...rows.map(r => [
        r.id,
        escape(r.company_name),
        escape(r.contact_person),
        escape(r.phone),
        escape(r.email),
        escape(r.city),
        r.guards_needed ?? '',
        escape(r.service_type),
        escape(r.message),
        escape(r.status),
        escape(new Date(r.created_at).toLocaleString('en-IN')),
      ].join(',')),
    ];

    const csv = csvRows.join('\n');
    const filename = `scoutx-leads-${new Date().toISOString().slice(0, 10)}.csv`;

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Export leads error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
