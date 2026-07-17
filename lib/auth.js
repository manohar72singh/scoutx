// lib/auth.js
import jwt from 'jsonwebtoken';

export function verifyAuth(req) {
  const token = req.cookies.get('scoutx_admin_token')?.value;
  if (!token) {
    return { error: 'Unauthorized', status: 401 };
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('SECURITY ERROR: JWT_SECRET is not set!');
    return { error: 'Server configuration error', status: 500 };
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return { decoded };
  } catch {
    return { error: 'Invalid or expired session', status: 401 };
  }
}
