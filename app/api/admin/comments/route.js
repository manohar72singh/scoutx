// app/api/admin/comments/route.js — Admin API for blog comments moderation

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

async function ensureCommentsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_comments (
      id INT PRIMARY KEY AUTO_INCREMENT,
      post_id INT NOT NULL,
      author_name VARCHAR(100) NOT NULL,
      author_email VARCHAR(150) NOT NULL,
      comment_text TEXT NOT NULL,
      parent_id INT DEFAULT NULL,
      status VARCHAR(20) DEFAULT 'approved',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_post_id (post_id),
      INDEX idx_status (status)
    )
  `);
}

export async function GET(req) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    await ensureCommentsTable();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.trim();

    let conditions = [];
    let values = [];

    if (status && status !== 'all') {
      conditions.push('c.status = ?');
      values.push(status);
    }
    if (search) {
      conditions.push('(c.author_name LIKE ? OR c.author_email LIKE ? OR c.comment_text LIKE ? OR p.title LIKE ?)');
      values.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.length ? ' WHERE ' + conditions.join(' AND ') : '';

    const query = `
      SELECT 
        c.id, 
        c.post_id, 
        c.author_name, 
        c.author_email, 
        c.comment_text, 
        c.status, 
        c.created_at,
        p.title as post_title,
        p.slug as post_slug
      FROM blog_comments c
      LEFT JOIN blog_posts p ON c.post_id = p.id
      ${whereClause}
      ORDER BY c.created_at DESC
    `;

    const [rows] = await pool.query(query, values);

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Admin fetch comments error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}

export async function PUT(req) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    await ensureCommentsTable();
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'ID and status required' }, { status: 400 });
    }

    await pool.execute('UPDATE blog_comments SET status = ? WHERE id = ?', [status, id]);

    return NextResponse.json({ success: true, message: 'Comment status updated successfully' });
  } catch (error) {
    console.error('Admin update comment error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    await ensureCommentsTable();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Comment ID is required' }, { status: 400 });
    }

    await pool.execute('DELETE FROM blog_comments WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Admin delete comment error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
