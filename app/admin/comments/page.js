'use client';
// app/admin/comments/page.js — Admin Blog Comments Management & Moderation Dashboard

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchTerm.trim()) params.set('search', searchTerm.trim());

      const res = await fetch(`/api/admin/comments?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setComments(data.data || []);
      }
    } catch (err) {
      console.error('Failed to load comments', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(id);
    try {
      const res = await fetch('/api/admin/comments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
      } else {
        alert(data.message || 'Failed to update status.');
      }
    } catch {
      alert('Error updating comment.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this comment?')) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/comments?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setComments((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert(data.message || 'Failed to delete comment.');
      }
    } catch {
      alert('Error deleting comment.');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold uppercase text-white tracking-wide flex items-center gap-2">
              <span>💬</span> Blog Comments &amp; Moderation
            </h1>
            <p className="text-[#8A93A6] text-xs mt-1">
              Review, approve, or remove comments submitted by readers on your blog articles.
            </p>
          </div>
          <div className="text-xs font-heading font-bold uppercase px-3 py-1.5 rounded bg-[#111827] border border-[#2A3550] text-[#4A8FD4]">
            Total Comments: {comments.length}
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#0B0B0D] p-4 rounded-xl border border-[rgba(192,192,192,0.1)]">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-heading font-bold uppercase text-[#8A93A6]">Filter:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#111827] text-white text-xs rounded border border-[#2A3550] px-3 py-2 outline-none"
            >
              <option value="all">All Comments</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="spam">Spam</option>
            </select>
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by author, email, or blog title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111827] text-white text-xs rounded border border-[#2A3550] px-3 py-2 placeholder-[#666] outline-none"
            />
          </div>
        </div>

        {/* Comments List */}
        {loading ? (
          <div className="text-center py-16 text-[#8A93A6]">Loading comments from database...</div>
        ) : comments.length === 0 ? (
          <div className="bg-[#0B0B0D] rounded-xl border border-[rgba(192,192,192,0.1)] p-12 text-center">
            <div className="text-4xl mb-3 opacity-40">💬</div>
            <h3 className="font-heading text-base font-bold uppercase text-white mb-1">No Comments Found</h3>
            <p className="text-[#8A93A6] text-xs">
              {searchTerm || statusFilter !== 'all' ? 'Try changing your search filters.' : 'Comments submitted by users on your blog posts will appear here.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c.id}
                className="bg-[#0B0B0D] p-5 rounded-xl border border-[rgba(192,192,192,0.1)] hover:border-[#2E6FBF]/40 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-[rgba(192,192,192,0.08)] mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#111827] border border-[#2E6FBF]/30 flex items-center justify-center font-heading font-bold text-white text-sm">
                      {c.author_name ? c.author_name[0].toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="font-heading text-sm font-bold text-white flex items-center gap-2">
                        <span>{c.author_name}</span>
                        <span className="text-[10px] text-[#8A93A6] font-mono">&lt;{c.author_email}&gt;</span>
                      </div>
                      <div className="text-[11px] text-[#8A93A6]">
                        {new Date(c.created_at).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge & Actions */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-heading font-bold uppercase px-2.5 py-0.5 rounded ${
                        c.status === 'approved'
                          ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-700/50'
                          : c.status === 'spam'
                          ? 'bg-red-900/30 text-red-400 border border-red-700/50'
                          : 'bg-amber-900/30 text-amber-400 border border-amber-700/50'
                      }`}
                    >
                      {c.status}
                    </span>

                    {c.status !== 'approved' && (
                      <button
                        onClick={() => handleStatusChange(c.id, 'approved')}
                        disabled={actionLoading === c.id}
                        className="px-2 py-1 rounded bg-emerald-700/30 text-emerald-300 hover:bg-emerald-700 text-xs font-heading font-bold uppercase transition-colors"
                      >
                        ✓ Approve
                      </button>
                    )}

                    {c.status !== 'spam' && (
                      <button
                        onClick={() => handleStatusChange(c.id, 'spam')}
                        disabled={actionLoading === c.id}
                        className="px-2 py-1 rounded bg-amber-700/30 text-amber-300 hover:bg-amber-700 text-xs font-heading font-bold uppercase transition-colors"
                      >
                        ⚠️ Spam
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(c.id)}
                      disabled={actionLoading === c.id}
                      className="px-2 py-1 rounded bg-red-700/30 text-red-300 hover:bg-red-700 text-xs font-heading font-bold uppercase transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>

                {/* Comment Body */}
                <p className="text-[#D0D0D0] text-sm leading-relaxed mb-3 whitespace-pre-wrap">
                  {c.comment_text}
                </p>

                {/* Article Info */}
                {c.post_title && (
                  <div className="pt-2 border-t border-[rgba(192,192,192,0.05)] text-xs text-[#8A93A6] flex items-center justify-between">
                    <div>
                      <span>Article: </span>
                      <strong className="text-[#E8E8E8]">{c.post_title}</strong>
                    </div>
                    {c.post_slug && (
                      <Link
                        href={`/blog/${c.post_slug}`}
                        target="_blank"
                        className="text-[#4A8FD4] hover:underline flex items-center gap-1"
                      >
                        View Article ↗
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
