// lib/auth.js
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function verifyAuth(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Unauthorized', status: 401 };
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    return { decoded };
  } catch (error) {
    return { error: 'Invalid token', status: 401 };
  }
}
