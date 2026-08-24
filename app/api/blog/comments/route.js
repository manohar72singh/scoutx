// app/api/blog/comments/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// Ensure table exists
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
  try {
    await ensureCommentsTable();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const postId = searchParams.get('postId');

    let post_id = postId;
    if (!post_id && slug) {
      const [posts] = await pool.query('SELECT id FROM blog_posts WHERE slug = ? LIMIT 1', [slug]);
      if (posts.length === 0) {
        return NextResponse.json({ success: true, comments: [] });
      }
      post_id = posts[0].id;
    }

    if (!post_id) {
      return NextResponse.json({ success: false, message: 'slug or postId required' }, { status: 400 });
    }

    const [comments] = await pool.query(
      `SELECT id, post_id, author_name, comment_text, parent_id, created_at
       FROM blog_comments
       WHERE post_id = ? AND status = 'approved'
       ORDER BY created_at ASC`,
      [post_id]
    );

    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error('Fetch comments error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await ensureCommentsTable();
    const body = await req.json();
    const { slug, postId, author_name, author_email, comment_text, parent_id, website } = body;

    // Honeypot spam check
    if (website) {
      return NextResponse.json({ success: true, message: 'Comment submitted successfully' });
    }

    if (!author_name?.trim() || !author_email?.trim() || !comment_text?.trim()) {
      return NextResponse.json({ success: false, message: 'Name, email, and comment are required.' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(author_email.trim())) {
      return NextResponse.json({ success: false, message: 'Please provide a valid email address.' }, { status: 400 });
    }

    let targetPostId = postId;
    if (!targetPostId && slug) {
      const [posts] = await pool.query('SELECT id FROM blog_posts WHERE slug = ? LIMIT 1', [slug]);
      if (posts.length === 0) {
        return NextResponse.json({ success: false, message: 'Blog post not found' }, { status: 404 });
      }
      targetPostId = posts[0].id;
    }

    if (!targetPostId) {
      return NextResponse.json({ success: false, message: 'Invalid blog post ID' }, { status: 400 });
    }

    const [result] = await pool.execute(
      `INSERT INTO blog_comments (post_id, author_name, author_email, comment_text, parent_id, status)
       VALUES (?, ?, ?, ?, ?, 'approved')`,
      [
        targetPostId,
        author_name.trim().slice(0, 100),
        author_email.trim().slice(0, 150),
        comment_text.trim().slice(0, 5000),
        parent_id ? parseInt(parent_id) : null,
      ]
    );

    const newComment = {
      id: result.insertId,
      post_id: targetPostId,
      author_name: author_name.trim(),
      comment_text: comment_text.trim(),
      parent_id: parent_id ? parseInt(parent_id) : null,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Comment posted successfully!',
      comment: newComment,
    }, { status: 201 });
  } catch (error) {
    console.error('Post comment error:', error);
    return NextResponse.json({ success: false, message: 'Could not post comment.' }, { status: 500 });
  }
}
