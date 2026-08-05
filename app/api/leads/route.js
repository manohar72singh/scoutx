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

    // Send email notifications asynchronously
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

      const currentYear = new Date().getFullYear();

      // 1. Admin Notification Email HTML
      const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #1E4D8C; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">SCOUTX PROTECTION</h1>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #333333; margin-top: 0;">New Lead Received</h2>
          <p style="color: #555555; font-size: 16px; line-height: 1.5;">A new inquiry has been submitted on the website. Here are the details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #333333; width: 40%;">Company/Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #555555;">${company_name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #333333;">Contact Person:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #555555;">${contact_person}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #333333;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #555555;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #333333;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #555555;">${email || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #333333;">City:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #555555;">${city}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #333333;">Guards Needed:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #555555;">${guards_needed || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #333333;">Service Type:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #555555;">${service_type || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #333333;">Message:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #555555;">${message || 'N/A'}</td>
            </tr>
          </table>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; color: #888888; font-size: 12px;">
          &copy; ${currentYear} ScoutX Protection Group. All rights reserved.
        </div>
      </div>
      `;

      const adminMailOptions = {
        from: `"ScoutX Website" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        subject: `New Lead: ${company_name} - ${city}`,
        html: adminHtml,
      };

      // 2. User Auto-Reply Email HTML
      const userHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.12); border: 1px solid #eaeaea;">
        
        <!-- Header Section -->
        <div style="background: linear-gradient(135deg, #1E4D8C 0%, #11315e 100%); padding: 35px 20px; text-align: center; border-bottom: 4px solid #4A8FD4;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">SCOUTX PROTECTION</h1>
          <p style="color: #a3c4ed; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 1px;">PREMIER SECURITY SOLUTIONS</p>
        </div>
        
        <!-- Body Section -->
        <div style="padding: 40px 35px; background-color: #ffffff;">
          <h2 style="color: #222222; margin-top: 0; font-size: 22px; font-weight: 600;">Thank You for Reaching Out!</h2>
          <p style="color: #444444; font-size: 16px; line-height: 1.7; margin-bottom: 20px;">Dear <strong style="color: #1E4D8C;">${contact_person}</strong>,</p>
          <p style="color: #555555; font-size: 16px; line-height: 1.7; margin-bottom: 20px;">We have successfully received your inquiry at <strong>ScoutX Protection Group</strong>. Thank you for considering us as your trusted security partner.</p>
          <p style="color: #555555; font-size: 16px; line-height: 1.7; margin-bottom: 30px;">Our dedicated security experts are currently reviewing your requirements. We prioritize our clients' safety and peace of mind, and a representative will get back to you within <strong style="color: #1E4D8C;">24 hours</strong> with a tailored security plan.</p>
          
          <!-- Inquiry Summary Card -->
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 25px; border-left: 5px solid #2E6FBF; margin-bottom: 35px;">
            <h3 style="margin: 0 0 15px 0; color: #1E4D8C; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Your Inquiry Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 15px; width: 40%;"><strong>Company/Name:</strong></td>
                <td style="padding: 8px 0; color: #334155; font-size: 15px; font-weight: 500;">${company_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 15px;"><strong>Service Interest:</strong></td>
                <td style="padding: 8px 0; color: #334155; font-size: 15px; font-weight: 500;">${service_type || 'General Security Inquiry'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 15px;"><strong>Location:</strong></td>
                <td style="padding: 8px 0; color: #334155; font-size: 15px; font-weight: 500;">${city}</td>
              </tr>
            </table>
          </div>
          
          <!-- Contact Block -->
          <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f0f7ff; border-radius: 8px;">
            <p style="margin: 0 0 15px 0; color: #1E4D8C; font-size: 16px; font-weight: 600;">Need immediate assistance?</p>
            <div style="display: inline-block; text-align: left; background: white; padding: 15px 25px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 15px;">📞 <strong>Ashok Choudhary:</strong> <a href="tel:+918682066666" style="color: #2E6FBF; text-decoration: none; font-weight: bold;">+91 86820 66666</a></p>
              <p style="margin: 0; color: #4b5563; font-size: 15px;">📞 <strong>Anil Choudhary:</strong> <a href="tel:+917611865555" style="color: #2E6FBF; text-decoration: none; font-weight: bold;">+91 76118 65555</a></p>
            </div>
            <p style="margin: 15px 0 0 0; color: #6b7280; font-size: 14px;">You can also reply directly to this email.</p>
          </div>
          
          <p style="color: #555555; font-size: 16px; line-height: 1.7; margin-bottom: 0;">Warm Regards,<br><strong style="color: #1E4D8C; font-size: 18px;">The ScoutX Team</strong></p>
        </div>
        
        <!-- Footer Section -->
        <div style="background-color: #111111; padding: 25px 20px; text-align: center; border-top: 1px solid #333333;">
          <p style="color: #999999; font-size: 13px; margin: 0 0 10px 0; line-height: 1.5;">
            &copy; ${currentYear} ScoutX Protection Group. All rights reserved.<br>
            Providing uncompromised security services across India.
          </p>
          <div style="margin-top: 15px;">
             <a href="https://scoutxsecurity.com" style="color: #4A8FD4; text-decoration: none; font-size: 13px; font-weight: bold; margin: 0 10px;">Visit Website</a> | 
             <a href="mailto:scoutxsecurity@gmail.com" style="color: #4A8FD4; text-decoration: none; font-size: 13px; font-weight: bold; margin: 0 10px;">Contact Support</a>
          </div>
        </div>
      </div>
      `;

      // Send both emails asynchronously (we don't await so it doesn't slow down the response)
      transporter.sendMail(adminMailOptions).catch(err => console.error('Failed to send admin email:', err));

      if (email) {
        const userMailOptions = {
          from: `"ScoutX Protection Group" <${process.env.SMTP_USER}>`,
          to: email,
          subject: 'Thank you for contacting ScoutX Protection',
          html: userHtml,
        };
        transporter.sendMail(userMailOptions).catch(err => console.error('Failed to send user auto-reply:', err));
      }
    }

    return NextResponse.json({ success: true, message: 'Lead submitted successfully', leadId: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
