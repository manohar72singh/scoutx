// app/api/admin/auth/change-password/route.js

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { verifyAuth } from '@/lib/auth';

export async function POST(req) {
  // Verify admin is logged in
  const auth = verifyAuth(req);
  if (auth.error) {
    return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  }

  try {
    const { currentPassword, newPassword, confirmPassword } = await req.json();

    // Validations
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ success: false, message: 'New passwords do not match.' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ success: false, message: 'New password must be at least 8 characters long.' }, { status: 400 });
    }

    // Strength check: must have uppercase, lowercase, number
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!strongPassword.test(newPassword)) {
      return NextResponse.json({
        success: false,
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
      }, { status: 400 });
    }

    // Fetch admin from DB
    const adminId = auth.decoded.id;
    const [users] = await pool.execute('SELECT * FROM admin_users WHERE id = ? LIMIT 1', [adminId]);
    if (users.length === 0) {
      return NextResponse.json({ success: false, message: 'Admin not found.' }, { status: 404 });
    }

    const admin = users[0];

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password_hash);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Current password is incorrect.' }, { status: 401 });
    }

    // Hash new password and update
    const newHash = await bcrypt.hash(newPassword, 12);
    await pool.execute('UPDATE admin_users SET password_hash = ? WHERE id = ?', [newHash, adminId]);

    return NextResponse.json({ success: true, message: 'Password changed successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}
