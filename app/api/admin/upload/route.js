// app/api/admin/upload/route.js — Dedicated image upload API for blog posts and editor

import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

export async function POST(req) {
  const auth = verifyAuth(req);
  if (auth.error) {
    return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') || formData.get('image');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: false, message: 'No image file uploaded.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, message: 'Image size exceeds 15MB limit.' }, { status: 400 });
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json({ success: false, message: 'Invalid image format. JPEG, PNG, WEBP, GIF, and AVIF are allowed.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = (path.extname(file.name) || '.jpg').toLowerCase();
    const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e6)}-${cleanBase}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blog');
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);

    const fileUrl = `/uploads/blog/${filename}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
      filename,
      message: 'Image uploaded successfully',
    }, { status: 200 });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error while saving image.' }, { status: 500 });
  }
}
