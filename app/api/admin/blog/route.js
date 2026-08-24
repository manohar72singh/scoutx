// app/api/admin/blog/route.js

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { slugify } from '@/lib/slugify';
import fs from 'fs/promises';
import path from 'path';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

async function uniqueSlug(base) {
  let slug = base;
  let suffix = 2;
  while (true) {
    const [rows] = await pool.query('SELECT id FROM blog_posts WHERE slug = ? LIMIT 1', [slug]);
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
    if (search) { conditions.push('title LIKE ?'); values.push(`%${search}%`); }

    const whereClause = conditions.length ? ' WHERE ' + conditions.join(' AND ') : '';

    const query = `SELECT id, title, slug, excerpt, featured_image, status, published_at, created_at, updated_at FROM blog_posts${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    const countQuery = `SELECT COUNT(*) as total FROM blog_posts${whereClause}`;

    const [rows] = await pool.query(query, [...values, limit, offset]);
    const [[{ total }]] = await pool.query(countQuery, values);

    return NextResponse.json({ success: true, data: rows, total, page, limit }, { status: 200 });
  } catch (error) {
    console.error('Fetch blog posts error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}

export async function POST(req) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const formData = await req.formData();

    const title = formData.get('title')?.toString().trim();
    const excerpt = formData.get('excerpt')?.toString().trim() || null;
    const content = formData.get('content')?.toString().trim();
    const metaTitle = formData.get('meta_title')?.toString().trim() || null;
    const metaDescription = formData.get('meta_description')?.toString().trim() || null;
    const rawStatus = formData.get('status')?.toString();
    const status = ['published', 'scheduled', 'draft'].includes(rawStatus) ? rawStatus : 'draft';
    const scheduledDate = formData.get('published_at')?.toString().trim();
    const requestedSlug = formData.get('slug')?.toString().trim();
    const imageFile = formData.get('featured_image');

    if (!title || !content) {
      return NextResponse.json({ success: false, message: 'Title and content are required.' }, { status: 400 });
    }

    const baseSlug = slugify(requestedSlug || title);
    if (!baseSlug) {
      return NextResponse.json({ success: false, message: 'Could not generate a valid slug from the title.' }, { status: 400 });
    }
    const slug = await uniqueSlug(baseSlug);

    let featuredImage = null;
    if (imageFile && imageFile.size > 0) {
      if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) {
        return NextResponse.json({ success: false, message: 'Invalid image type. Only JPEG, PNG, and WEBP are allowed.' }, { status: 400 });
      }
      featuredImage = await saveImage(imageFile);
    }

    let publishedAt = null;
    if (status === 'scheduled' && scheduledDate) {
      publishedAt = new Date(scheduledDate);
    } else if (status === 'published') {
      publishedAt = scheduledDate ? new Date(scheduledDate) : new Date();
    }

    const [result] = await pool.execute(
      `INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, meta_title, meta_description, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, excerpt, content, featuredImage, metaTitle, metaDescription, status, publishedAt]
    );

    return NextResponse.json({ success: true, message: 'Post created successfully', id: result.insertId, slug }, { status: 201 });
  } catch (error) {
    console.error('Create blog post error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
