// lib/auth.js
import jwt from 'jsonwebtoken';

export function verifyAuth(req) {
  const token = req.cookies.get('scoutx_admin_token')?.value;
  if (!token) {
    return { error: 'Unauthorized', status: 401 };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    return { decoded };
  } catch (error) {
    return { error: 'Invalid token', status: 401 };
  }
}
