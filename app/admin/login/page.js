'use client';
// app/admin/login/page.js

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoSVG from '@/components/LogoSVG';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `/api/admin/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('scoutx_admin_user', JSON.stringify(data.admin));
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials.');
      }
    } catch {
      setError('Connection error. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0A0F1F, #111827)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <LogoSVG size={56} />
          <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-white mt-4">Admin Panel</h1>
          <p className="text-[#A8A8A8] text-sm">ScoutX Protection Group</p>
        </div>

        <div className="card-dark p-8">
          <h2 className="font-heading text-lg font-bold uppercase text-[#E8E8E8] mb-6">Sign In</h2>

          {error && (
            <div className="mb-4 p-3 rounded bg-red-900/30 border border-red-700/50 text-red-400 text-sm">❌ {error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="username" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Username / Email</label>
              <input
                id="username" name="username" type="text" required autoComplete="username"
                value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                placeholder="scoutxsecurity@gmail.com"
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Password</label>
              <input
                id="password" name="password" type="password" required autoComplete="current-password"
                value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                className="form-input"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 mt-2 disabled:opacity-60"
            >
              {loading ? 'Signing In...' : '🔐 Sign In'}
            </button>
          </form>


        </div>
      </div>
    </div>
  );
}
