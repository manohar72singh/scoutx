// app/api/admin/auth/login/route.js

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ─── In-memory Rate Limiter ────────────────────────────────────────────────
// Tracks failed login attempts per IP address
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;          // Max failed attempts allowed
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

function getRateLimitKey(req) {
  // Use IP from header (works behind Vercel/Nginx proxies)
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (record) {
    // If locked out, check if lockout period has passed
    if (record.lockedUntil && now < record.lockedUntil) {
      const remainingMinutes = Math.ceil((record.lockedUntil - now) / 60000);
      return { allowed: false, remainingMinutes };
    }
    // Reset if lockout expired
    if (record.lockedUntil && now >= record.lockedUntil) {
      loginAttempts.delete(ip);
    }
  }

  return { allowed: true };
}

function recordFailedAttempt(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, lockedUntil: null };

  record.count += 1;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
  }

  loginAttempts.set(ip, record);
}

function clearFailedAttempts(ip) {
  loginAttempts.delete(ip);
}
// ──────────────────────────────────────────────────────────────────────────


export async function POST(req) {
  const ip = getRateLimitKey(req);

  // --- Rate limit check ---
  const { allowed, remainingMinutes } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { success: false, message: `Too many failed attempts. Try again in ${remainingMinutes} minute(s).` },
      { status: 429 }
    );
  }

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Username and password are required' }, { status: 400 });
    }

    const [users] = await pool.execute('SELECT * FROM admin_users WHERE username = ? LIMIT 1', [username]);
    if (users.length === 0) {
      recordFailedAttempt(ip);
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const admin = users[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      recordFailedAttempt(ip);
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    // --- Successful login: clear failed attempts ---
    clearFailedAttempts(ip);

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('SECURITY ERROR: JWT_SECRET is not set in environment variables!');
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      jwtSecret,
      { expiresIn: '1d' }
    );

    const cookieStore = await cookies();
    cookieStore.set('scoutx_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      admin: { id: admin.id, username: admin.username },
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
