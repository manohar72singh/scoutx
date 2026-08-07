'use client';
// app/admin/blog/[id]/edit/page.js

import { useState, useEffect, use } from 'react';
import AdminLayout from '@/components/AdminLayout';
import BlogPostForm from '@/components/admin/BlogPostForm';

export default function EditBlogPostPage({ params }) {
  const { id } = use(params);
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setPost(data.data);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true));
  }, [id]);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold uppercase text-white">Edit Post</h1>
        <p className="text-[#A8A8A8] text-sm mt-1">Update this blog post.</p>
      </div>
      {notFound ? (
        <div className="card-dark p-8 text-center text-[#A8A8A8]">Post not found.</div>
      ) : !post ? (
        <div className="card-dark p-8 text-center text-[#A8A8A8]">Loading...</div>
      ) : (
        <BlogPostForm postId={id} initialData={post} />
      )}
    </AdminLayout>
  );
}
