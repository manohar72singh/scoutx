// components/BlogComments.jsx
'use client';

import { useState, useEffect } from 'react';

export default function BlogComments({ postSlug, postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [form, setForm] = useState({
    author_name: '',
    author_email: '',
    comment_text: '',
    website: '', // honeypot
  });
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    async function loadComments() {
      try {
        const query = postId ? `postId=${postId}` : `slug=${postSlug}`;
        const res = await fetch(`/api/blog/comments?${query}`);
        const data = await res.json();
        if (data.success) {
          setComments(data.comments || []);
        }
      } catch (err) {
        console.error('Failed to load comments:', err);
      } finally {
        setLoading(false);
      }
    }
    if (postSlug || postId) {
      loadComments();
    }
  }, [postSlug, postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    if (!form.author_name.trim() || !form.author_email.trim() || !form.comment_text.trim()) {
      setStatusMsg({ type: 'error', text: 'Please fill in your name, email, and comment.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: postSlug,
          postId: postId,
          author_name: form.author_name.trim(),
          author_email: form.author_email.trim(),
          comment_text: form.comment_text.trim(),
          parent_id: replyTo ? replyTo.id : null,
          website: form.website,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatusMsg({ type: 'success', text: 'Thank you! Your comment has been posted.' });
        if (data.comment) {
          setComments((prev) => [...prev, data.comment]);
        }
        setForm({ author_name: '', author_email: '', comment_text: '', website: '' });
        setReplyTo(null);
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Failed to post comment. Please try again.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Network error. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Group top-level comments and their replies
  const topLevelComments = comments.filter((c) => !c.parent_id);
  const getReplies = (parentId) => comments.filter((c) => c.parent_id === parentId);

  return (
    <div className="mt-14 pt-10 border-t border-[#1A2235]">
      {/* Heading */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1A2235]">
        <div>
          <span className="text-[#2E6FBF] text-[10px] font-bold uppercase tracking-[0.2em]">
            COMMUNITY &amp; FEEDBACK
          </span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase text-white mt-1">
            Comments &amp; Discussion ({comments.length})
          </h2>
        </div>
        <a
          href="#leave-comment"
          className="text-xs font-heading font-bold uppercase tracking-wider text-[#4A8FD4] hover:text-white transition-colors"
        >
          Write a Comment ↓
        </a>
      </div>

      {/* Comment list */}
      {loading ? (
        <div className="py-8 text-center text-[#8A93A6] text-xs">Loading comments...</div>
      ) : topLevelComments.length === 0 ? (
        <div className="p-6 rounded-lg bg-[#0A0F1F] border border-[#1A2235] text-center mb-10">
          <p className="text-[#A8A8A8] text-sm mb-2">No comments yet.</p>
          <p className="text-[#8A93A6] text-xs">Be the first to share your thoughts on this article!</p>
        </div>
      ) : (
        <div className="space-y-6 mb-12">
          {topLevelComments.map((c) => (
            <div key={c.id} className="space-y-4">
              <div className="p-5 rounded-lg bg-[#0A0F1F] border border-[#1A2235]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E4D8C] to-[#2E6FBF] flex items-center justify-center font-heading font-bold text-white text-xs">
                      {c.author_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-heading text-xs font-bold uppercase text-white">
                        {c.author_name}
                      </div>
                      <div className="text-[10px] text-[#8A93A6]">
                        {new Date(c.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setReplyTo(c);
                      const formEl = document.getElementById('leave-comment');
                      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[11px] text-[#4A8FD4] hover:text-white font-medium transition-colors"
                  >
                    Reply ↩
                  </button>
                </div>
                <p className="text-[#C0C0C0] text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {c.comment_text}
                </p>
              </div>

              {/* Replies */}
              {getReplies(c.id).map((r) => (
                <div key={r.id} className="ml-6 sm:ml-10 p-4 rounded-lg bg-[#050914] border border-[#1A2235]/70">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-7 h-7 rounded-full bg-[#1A2235] flex items-center justify-center font-heading font-bold text-[#4A8FD4] text-[10px]">
                      {r.author_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-heading text-[11px] font-bold uppercase text-[#E8E8E8]">
                        {r.author_name}
                      </div>
                      <div className="text-[9px] text-[#8A93A6]">
                        {new Date(r.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                  <p className="text-[#A8A8A8] text-xs leading-relaxed whitespace-pre-line">
                    {r.comment_text}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Form */}
      <div id="leave-comment" className="card-dark p-6 sm:p-8 border border-[#1A2235]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-base font-bold uppercase text-white">
            {replyTo ? `Replying to ${replyTo.author_name}` : 'Leave a Comment'}
          </h3>
          {replyTo && (
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="text-xs text-red-400 hover:underline"
            >
              Cancel Reply ✕
            </button>
          )}
        </div>
        <p className="text-[#8A93A6] text-xs mb-5">
          Your email address will not be published. Required fields are marked *
        </p>

        {statusMsg.text && (
          <div
            className={`p-3.5 rounded mb-5 text-xs font-medium ${
              statusMsg.type === 'success'
                ? 'bg-emerald-950/40 border border-emerald-700/50 text-emerald-300'
                : 'bg-red-950/40 border border-red-700/50 text-red-300'
            }`}
          >
            {statusMsg.type === 'success' ? '✓ ' : '✕ '}
            {statusMsg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="comment_author_name" className="block text-xs font-heading font-bold uppercase text-[#C0C0C0] mb-1.5">
                Name *
              </label>
              <input
                id="comment_author_name"
                type="text"
                required
                placeholder="Your full name"
                value={form.author_name}
                onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                className="form-input text-xs"
              />
            </div>
            <div>
              <label htmlFor="comment_author_email" className="block text-xs font-heading font-bold uppercase text-[#C0C0C0] mb-1.5">
                Email *
              </label>
              <input
                id="comment_author_email"
                type="email"
                required
                placeholder="your.email@example.com"
                value={form.author_email}
                onChange={(e) => setForm({ ...form, author_email: e.target.value })}
                className="form-input text-xs"
              />
            </div>
          </div>

          <div>
            <label htmlFor="comment_message_text" className="block text-xs font-heading font-bold uppercase text-[#C0C0C0] mb-1.5">
              Comment *
            </label>
            <textarea
              id="comment_message_text"
              rows={4}
              required
              placeholder="Write your constructive thoughts or ask questions about security operations..."
              value={form.comment_text}
              onChange={(e) => setForm({ ...form, comment_text: e.target.value })}
              className="form-input text-xs resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary text-xs uppercase tracking-wider py-3 px-6 disabled:opacity-60"
          >
            {submitting ? 'Posting Comment...' : 'Post Comment →'}
          </button>
        </form>
      </div>
    </div>
  );
}
