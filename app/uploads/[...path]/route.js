// app/uploads/[...path]/route.js
// Dynamically serves user-uploaded files from public/uploads directory (hero images, blog images, resumes)

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

export async function GET(req, { params }) {
  try {
    const { path: pathSegments } = await params;
    if (!pathSegments || pathSegments.length === 0) {
      return new NextResponse('File not found', { status: 404 });
    }

    // Sanitize path segments to prevent directory traversal
    const safeSegments = pathSegments.map((seg) => path.basename(seg));
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadsDir, ...safeSegments);

    // Ensure the resolved path is inside public/uploads
    if (!filePath.startsWith(uploadsDir)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const stat = await fs.stat(filePath);
    if (!stat.isFile()) {
      return new NextResponse('File not found', { status: 404 });
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': stat.size.toString(),
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return new NextResponse('File not found', { status: 404 });
    }
    console.error('Error serving uploaded file:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
