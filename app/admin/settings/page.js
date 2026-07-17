'use client';
// app/admin/settings/page.js

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

const CheckIcon = ({ pass }) => (
  <span className={`text-xs font-bold ${pass ? 'text-green-400' : 'text-[#555]'}`}>
    {pass ? '✓' : '○'}
  </span>
);

export default function AdminSettingsPage() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('scoutx_admin_user');
    if (user) setAdmin(JSON.parse(user));
  }, []);

  const handleChange = (e) => {
    setStatus(null);
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Password requirement checks
  const checks = {
    length:    form.newPassword.length >= 8,
    uppercase: /[A-Z]/.test(form.newPassword),
    lowercase: /[a-z]/.test(form.newPassword),
    number:    /\d/.test(form.newPassword),
    special:   /[@$!%*?&#^()_+\-=]/.test(form.newPassword),
  };
  const score = Object.values(checks).filter(Boolean).length;
  const strengthConfig = !form.newPassword ? null :
    score <= 2 ? { label: 'Weak',   color: '#ef4444', bg: 'bg-red-500',    w: 'w-1/3' } :
    score <= 3 ? { label: 'Medium', color: '#f59e0b', bg: 'bg-amber-500',  w: 'w-2/3' } :
    score === 4 ? { label: 'Good',  color: '#3b82f6', bg: 'bg-blue-500',   w: 'w-11/12' } :
                 { label: 'Strong', color: '#22c55e', bg: 'bg-green-500',  w: 'w-full' };

  const passwordsMatch = form.confirmPassword && form.newPassword === form.confirmPassword;
  const passwordsMismatch = form.confirmPassword && form.newPassword !== form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/admin/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch {
      setStatus('error');
      setMessage('Connection error. Please try again.');
    }
  };

  const EyeIcon = ({ show, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#A8A8A8] transition-colors"
      tabIndex={-1}
    >
      {show ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  );

  const InputField = ({ id, name, label, placeholder, show, onToggle, value, autoComplete, required }) => (
    <div>
      <label htmlFor={id} className="block text-[#C0C0C0] text-sm font-medium mb-2">
        {label} {required && <span className="text-[#4A8FD4]">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? 'text' : 'password'}
          required={required}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="form-input pr-10"
        />
        <EyeIcon show={show} onToggle={onToggle} />
      </div>
    </div>
  );

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold uppercase text-white">Settings</h1>
          <p className="text-[#A8A8A8] text-sm mt-1">Manage your account security</p>
        </div>
        {admin && (
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0B0B0D] border border-[rgba(192,192,192,0.1)]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2E6FBF] to-[#1E4D8C] flex items-center justify-center text-white font-bold text-sm">
              {admin.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-white text-sm font-medium leading-none">{admin.username}</p>
              <p className="text-[#A8A8A8] text-xs mt-0.5">Administrator</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ─── Left: Change Password Form ─────────────────── */}
        <div className="lg:col-span-2">
          <div className="card-dark overflow-hidden">
            {/* Card Header */}
            <div className="px-8 py-5 border-b border-[rgba(192,192,192,0.08)] flex items-center gap-3"
              style={{ background: 'linear-gradient(135deg, rgba(30,77,140,0.15) 0%, rgba(11,11,13,0) 100%)' }}>
              <div className="w-10 h-10 rounded-lg bg-[rgba(46,111,191,0.15)] border border-[rgba(46,111,191,0.25)] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#4A8FD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <div>
                <h2 className="font-heading text-base font-bold uppercase tracking-wider text-white">Change Password</h2>
                <p className="text-[#A8A8A8] text-xs mt-0.5">Update your admin login credentials</p>
              </div>
            </div>

            <div className="p-8">
              {/* Alert Messages */}
              {status === 'success' && (
                <div className="mb-6 p-4 rounded-lg bg-green-950/40 border border-green-700/40 flex items-start gap-3">
                  <span className="text-green-400 text-lg mt-0.5">✅</span>
                  <div>
                    <p className="text-green-400 font-medium text-sm">{message}</p>
                    <p className="text-green-600 text-xs mt-0.5">Please use your new password for future logins.</p>
                  </div>
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 p-4 rounded-lg bg-red-950/40 border border-red-700/40 flex items-start gap-3">
                  <span className="text-red-400 text-lg mt-0.5">❌</span>
                  <p className="text-red-400 font-medium text-sm">{message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                {/* Current Password */}
                <InputField
                  id="currentPassword" name="currentPassword" label="Current Password"
                  placeholder="Enter your current password"
                  show={showCurrent} onToggle={() => setShowCurrent(v => !v)}
                  value={form.currentPassword} autoComplete="current-password" required
                />

                {/* Separator */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-[rgba(192,192,192,0.08)]" />
                  <span className="text-[#555] text-xs uppercase tracking-widest">New Credentials</span>
                  <div className="flex-1 h-px bg-[rgba(192,192,192,0.08)]" />
                </div>

                {/* New Password */}
                <div>
                  <label htmlFor="newPassword" className="block text-[#C0C0C0] text-sm font-medium mb-2">
                    New Password <span className="text-[#4A8FD4]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword" name="newPassword"
                      type={showNew ? 'text' : 'password'}
                      required value={form.newPassword} onChange={handleChange}
                      placeholder="Create a strong password"
                      autoComplete="new-password" className="form-input pr-10"
                    />
                    <EyeIcon show={showNew} onToggle={() => setShowNew(v => !v)} />
                  </div>

                  {/* Strength Bar */}
                  {form.newPassword && strengthConfig && (
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs text-[#A8A8A8]">Strength</span>
                        <span className="text-xs font-semibold" style={{ color: strengthConfig.color }}>
                          {strengthConfig.label}
                        </span>
                      </div>
                      <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-500 ${strengthConfig.bg} ${strengthConfig.w}`} />
                      </div>
                    </div>
                  )}

                  {/* Checklist */}
                  {form.newPassword && (
                    <div className="mt-3 grid grid-cols-2 gap-1.5">
                      {[
                        { key: 'length',    label: '8+ characters' },
                        { key: 'uppercase', label: 'Uppercase (A-Z)' },
                        { key: 'lowercase', label: 'Lowercase (a-z)' },
                        { key: 'number',    label: 'Number (0-9)' },
                        { key: 'special',   label: 'Special char (@#!)' },
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center gap-1.5">
                          <CheckIcon pass={checks[key]} />
                          <span className={`text-xs ${checks[key] ? 'text-[#A8A8A8]' : 'text-[#444]'}`}>{label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-[#C0C0C0] text-sm font-medium mb-2">
                    Confirm New Password <span className="text-[#4A8FD4]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword" name="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      required value={form.confirmPassword} onChange={handleChange}
                      placeholder="Re-enter new password"
                      autoComplete="new-password"
                      className={`form-input pr-10 transition-colors ${
                        passwordsMatch ? 'border-green-700/60' :
                        passwordsMismatch ? 'border-red-700/60' : ''
                      }`}
                    />
                    <EyeIcon show={showConfirm} onToggle={() => setShowConfirm(v => !v)} />
                  </div>
                  {passwordsMatch && (
                    <p className="text-green-400 text-xs mt-1.5 flex items-center gap-1">✓ Passwords match</p>
                  )}
                  {passwordsMismatch && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">✗ Passwords do not match</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    '🔐 Update Password'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ─── Right: Security Info Panel ────────────────── */}
        <div className="space-y-4">

          {/* Security Status */}
          <div className="card-dark p-5">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#E8E8E8] mb-4">Security Status</h3>
            <div className="space-y-3">
              {[
                { label: 'bcrypt Hashing', status: true,  icon: '🔒' },
                { label: 'JWT Auth Tokens', status: true,  icon: '🛡️' },
                { label: 'HttpOnly Cookies', status: true,  icon: '🍪' },
                { label: 'Rate Limiting',   status: true,  icon: '🚦' },
                { label: 'Security Headers', status: true, icon: '⛑️' },
              ].map(({ label, status, icon }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-[rgba(192,192,192,0.05)] last:border-0">
                  <div className="flex items-center gap-2 text-[#A8A8A8] text-sm">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status ? 'bg-green-900/40 text-green-400 border border-green-800/50' : 'bg-red-900/40 text-red-400 border border-red-800/50'}`}>
                    {status ? 'Active' : 'Off'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Password Tips */}
          <div className="card-dark p-5">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#E8E8E8] mb-3">Password Tips</h3>
            <ul className="space-y-2.5">
              {[
                'Use 12+ characters for best security',
                'Mix letters, numbers & symbols',
                'Never share your password',
                'Update every 3–6 months',
                'Avoid using real words or names',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-xs text-[#A8A8A8]">
                  <span className="text-[#2E6FBF] mt-0.5 shrink-0">›</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Session Info */}
          <div className="card-dark p-5">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#E8E8E8] mb-3">Session Info</h3>
            <div className="space-y-2 text-xs text-[#A8A8A8]">
              <div className="flex justify-between">
                <span>Session expires</span>
                <span className="text-[#C0C0C0]">24 hours</span>
              </div>
              <div className="flex justify-between">
                <span>Login lockout</span>
                <span className="text-[#C0C0C0]">5 attempts / 15 min</span>
              </div>
              <div className="flex justify-between">
                <span>Token type</span>
                <span className="text-[#C0C0C0]">JWT (HttpOnly)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
