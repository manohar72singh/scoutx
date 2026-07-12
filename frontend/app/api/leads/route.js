// app/api/leads/route.js

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const data = await req.json();
    const { company_name, contact_person, phone, email, city, guards_needed, service_type, message, website } = data;

    // Honeypot check
    if (website) {
      return NextResponse.json({ success: true, message: 'Lead captured successfully.' }, { status: 200 });
    }

    if (!company_name || !contact_person || !phone || !city) {
      return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
    }

    const query = `
      INSERT INTO leads (company_name, contact_person, phone, email, city, guards_needed, service_type, message)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      company_name,
      contact_person,
      phone,
      email || null,
      city,
      guards_needed ? parseInt(guards_needed, 10) : null,
      service_type || null,
      message || null,
    ];

    const [result] = await pool.execute(query, values);

    // Send email notification asynchronously
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"ScoutX Website" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        subject: `New Lead: ${company_name} - ${city}`,
        text: `New lead received from ScoutX website:\n\nCompany: ${company_name}\nContact: ${contact_person}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\nCity: ${city}\nGuards Needed: ${guards_needed || 'N/A'}\nService: ${service_type || 'N/A'}\nMessage: ${message || 'N/A'}\n\nLog in to the admin panel to view details.`,
      };
      
      transporter.sendMail(mailOptions).catch(err => console.error('Failed to send email:', err));
    }

    return NextResponse.json({ success: true, message: 'Lead submitted successfully', leadId: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
