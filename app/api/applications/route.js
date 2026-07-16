// app/api/applications/route.js

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    const full_name = formData.get('full_name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const position_applied = formData.get('position_applied');
    const experience_years = formData.get('experience_years');
    const website = formData.get('website');
    const resumeFile = formData.get('resume');

    // Honeypot check
    if (website) {
      return NextResponse.json({ success: true, message: 'Application submitted successfully.' }, { status: 200 });
    }

    if (!full_name || !phone || !position_applied || experience_years === null) {
      return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
    }

    let resume_file_path = null;
    if (resumeFile && resumeFile.size > 0) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(resumeFile.type)) {
         return NextResponse.json({ success: false, message: 'Invalid file type. Only PDF and DOC files are allowed.' }, { status: 400 });
      }

      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${resumeFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');
      
      // Ensure directory exists
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      
      resume_file_path = filename;
    }

    const query = `
      INSERT INTO applications (full_name, phone, email, position_applied, experience_years, resume_file_path)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      full_name,
      phone,
      email || null,
      position_applied,
      parseInt(experience_years, 10) || 0,
      resume_file_path,
    ];

    await pool.execute(query, values);

    return NextResponse.json({ success: true, message: 'Application submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
