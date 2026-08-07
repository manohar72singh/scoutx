// app/api/admin/blog/[id]/route.js

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { slugify } from '@/lib/slugify';
import fs from 'fs/promises';
import path from 'path';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

async function uniqueSlug(base, excludeId) {
  let slug = base;
  let suffix = 2;
  while (true) {
    const [rows] = await pool.query('SELECT id FROM blog_posts WHERE slug = ? AND id != ? LIMIT 1', [slug, excludeId]);
    if (rows.length === 0) return slug;
    slug = `${base}-${suffix++}`;
  }
}

async function saveImage(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blog');
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), buffer);
  return filename;
}

export async function GET(req, { params }) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { id } = await params;
    const [rows] = await pool.query('SELECT * FROM blog_posts WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Fetch blog post error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { id } = await params;

    const [existingRows] = await pool.query('SELECT * FROM blog_posts WHERE id = ? LIMIT 1', [id]);
    if (existingRows.length === 0) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }
    const existing = existingRows[0];

    const formData = await req.formData();

    const title = formData.get('title')?.toString().trim();
    const excerpt = formData.get('excerpt')?.toString().trim() || null;
    const content = formData.get('content')?.toString().trim();
    const metaTitle = formData.get('meta_title')?.toString().trim() || null;
    const metaDescription = formData.get('meta_description')?.toString().trim() || null;
    const status = formData.get('status')?.toString() === 'published' ? 'published' : 'draft';
    const requestedSlug = formData.get('slug')?.toString().trim();
    const imageFile = formData.get('featured_image');

    if (!title || !content) {
      return NextResponse.json({ success: false, message: 'Title and content are required.' }, { status: 400 });
    }

    const baseSlug = slugify(requestedSlug || title);
    if (!baseSlug) {
      return NextResponse.json({ success: false, message: 'Could not generate a valid slug from the title.' }, { status: 400 });
    }
    const slug = baseSlug === existing.slug ? existing.slug : await uniqueSlug(baseSlug, id);

    let featuredImage = existing.featured_image;
    if (imageFile && imageFile.size > 0) {
      if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) {
        return NextResponse.json({ success: false, message: 'Invalid image type. Only JPEG, PNG, and WEBP are allowed.' }, { status: 400 });
      }
      featuredImage = await saveImage(imageFile);
    }

    const publishedAt = status === 'published' ? (existing.published_at || new Date()) : existing.published_at;

    await pool.execute(
      `UPDATE blog_posts
       SET title=?, slug=?, excerpt=?, content=?, featured_image=?, meta_title=?, meta_description=?, status=?, published_at=?
       WHERE id=?`,
      [title, slug, excerpt, content, featuredImage, metaTitle, metaDescription, status, publishedAt, id]
    );

    return NextResponse.json({ success: true, message: 'Post updated successfully', slug }, { status: 200 });
  } catch (error) {
    console.error('Update blog post error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { id } = await params;
    await pool.execute('DELETE FROM blog_posts WHERE id=?', [id]);
    return NextResponse.json({ success: true, message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete blog post error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
