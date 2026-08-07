'use client';
// app/admin/blog/new/page.js

import AdminLayout from '@/components/AdminLayout';
import BlogPostForm from '@/components/admin/BlogPostForm';

export default function NewBlogPostPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold uppercase text-white">New Post</h1>
        <p className="text-[#A8A8A8] text-sm mt-1">Write a new SEO-optimized blog post.</p>
      </div>
      <BlogPostForm />
    </AdminLayout>
  );
}
