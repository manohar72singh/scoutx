// app/api/admin/cta/route.js — Admin-managed homepage CTA content & hero image

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
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

async function saveImage(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = (path.extname(file.name) || '.jpg').toLowerCase();
  const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e6)}-${cleanBase}${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'hero');
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), buffer);
  return filename;
}

export async function GET(req) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const [rows] = await pool.query('SELECT * FROM cta_content WHERE id = 1 LIMIT 1');
    return NextResponse.json({ success: true, data: rows[0] || null }, { status: 200 });
  } catch (error) {
    console.error('Fetch CTA content error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}

export async function PUT(req) {
  const auth = verifyAuth(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const formData = await req.formData();

    const eyebrow_text = formData.get('eyebrow_text')?.toString().trim() || null;
    const heading_line1 = formData.get('heading_line1')?.toString().trim();
    const heading_line2 = formData.get('heading_line2')?.toString().trim() || null;
    const description = formData.get('description')?.toString().trim() || null;
    const primary_btn_text = formData.get('primary_btn_text')?.toString().trim();
    const primary_btn_link = formData.get('primary_btn_link')?.toString().trim();
    const whatsapp_btn_text = formData.get('whatsapp_btn_text')?.toString().trim() || null;
    const whatsapp_number = formData.get('whatsapp_number')?.toString().trim() || null;
    const phone1_label = formData.get('phone1_label')?.toString().trim() || null;
    const phone1_number = formData.get('phone1_number')?.toString().trim() || null;
    const phone2_label = formData.get('phone2_label')?.toString().trim() || null;
    const phone2_number = formData.get('phone2_number')?.toString().trim() || null;
    const imageFile = formData.get('hero_image');
    const removeImage = formData.get('remove_hero_image') === 'true';

    if (!heading_line1 || !primary_btn_text || !primary_btn_link) {
      return NextResponse.json({ success: false, message: 'Heading and primary button text/link are required' }, { status: 400 });
    }

    const [existingRows] = await pool.query('SELECT hero_image FROM cta_content WHERE id = 1 LIMIT 1');
    let heroImage = existingRows[0]?.hero_image || null;

    if (imageFile && typeof imageFile === 'object' && imageFile.size > 0) {
      if (imageFile.size > MAX_FILE_SIZE) {
        return NextResponse.json({ success: false, message: 'Image size exceeds 15MB limit.' }, { status: 400 });
      }
      if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) {
        return NextResponse.json({ success: false, message: 'Invalid image type. JPEG, PNG, WEBP, GIF, and AVIF are allowed.' }, { status: 400 });
      }
      heroImage = await saveImage(imageFile);
    } else if (removeImage) {
      heroImage = null;
    }

    const query = `
      INSERT INTO cta_content
        (id, hero_image, eyebrow_text, heading_line1, heading_line2, description, primary_btn_text, primary_btn_link, whatsapp_btn_text, whatsapp_number, phone1_label, phone1_number, phone2_label, phone2_number)
      VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        hero_image = VALUES(hero_image),
        eyebrow_text = VALUES(eyebrow_text),
        heading_line1 = VALUES(heading_line1),
        heading_line2 = VALUES(heading_line2),
        description = VALUES(description),
        primary_btn_text = VALUES(primary_btn_text),
        primary_btn_link = VALUES(primary_btn_link),
        whatsapp_btn_text = VALUES(whatsapp_btn_text),
        whatsapp_number = VALUES(whatsapp_number),
        phone1_label = VALUES(phone1_label),
        phone1_number = VALUES(phone1_number),
        phone2_label = VALUES(phone2_label),
        phone2_number = VALUES(phone2_number)
    `;
    const values = [
      heroImage, eyebrow_text, heading_line1, heading_line2, description,
      primary_btn_text, primary_btn_link,
      whatsapp_btn_text, whatsapp_number,
      phone1_label, phone1_number,
      phone2_label, phone2_number,
    ];
    await pool.execute(query, values);

    return NextResponse.json({ success: true, message: 'CTA section updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Update CTA content error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
