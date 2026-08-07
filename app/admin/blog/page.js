'use client';
// app/admin/blog/page.js

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const limit = 20;

  const fetchPosts = useCallback(async () => {
    try {
      const url = new URL('/api/admin/blog', window.location.origin);
      url.searchParams.set('page', String(page));
      url.searchParams.set('limit', String(limit));
      if (filter) url.searchParams.set('status', filter);
      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) { setPosts(data.data); setTotal(data.total); }
    } finally {
      setLoading(false);
    }
  }, [page, filter]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const deletePost = async (id) => {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold uppercase text-white">Blog</h1>
          <p className="text-[#A8A8A8] text-sm mt-1">{total} post{total !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary text-sm px-4 py-2 shrink-0">➕ New Post</Link>
      </div>

      <div className="flex gap-3 mb-4">
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          className="form-input max-w-[160px]"
          style={{ background: '#111827' }}
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="card-dark overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#A8A8A8]">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-[#A8A8A8]">No posts yet. Create your first one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th><th>Slug</th><th>Status</th><th>Published</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="font-medium">{post.title}</td>
                    <td className="text-[#A8A8A8]">/blog/{post.slug}</td>
                    <td>
                      <span className={`status-badge ${post.status === 'published' ? 'status-closed' : 'status-new'}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="text-[#A8A8A8]">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {post.status === 'published' && (
                          <Link href={`/blog/${post.slug}`} target="_blank" className="px-3 py-1 bg-[#111827] border border-[rgba(192,192,192,0.15)] text-white text-xs rounded hover:bg-[#1a2540] transition-colors">
                            View
                          </Link>
                        )}
                        <Link href={`/admin/blog/${post.id}/edit`} className="px-3 py-1 bg-[#2E6FBF] text-white text-xs rounded hover:bg-[#1E4D8C] transition-colors">
                          Edit
                        </Link>
                        <button onClick={() => deletePost(post.id)} className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-800 transition-colors">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {total > limit && (
        <div className="flex justify-center gap-2 mt-5">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary text-sm px-3 py-1.5 disabled:opacity-40">← Prev</button>
          <span className="text-[#A8A8A8] text-sm py-1.5">Page {page} of {Math.ceil(total / limit)}</span>
          <button onClick={() => setPage((p) => p + 1)} disabled={page >= Math.ceil(total / limit)} className="btn-secondary text-sm px-3 py-1.5 disabled:opacity-40">Next →</button>
        </div>
      )}
    </AdminLayout>
  );
}
