'use client';
// components/admin/BlogPostForm.jsx — Shared create/edit form for blog posts

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { slugify } from '@/lib/slugify';

function ToolbarButton({ onClick, active, children, title }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`px-2.5 py-1.5 rounded text-xs font-heading uppercase tracking-wide transition-colors ${
        active ? 'bg-[#2E6FBF] text-white' : 'text-[#C0C0C0] hover:bg-[rgba(255,255,255,0.08)] hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function EditorToolbar({ editor }) {
  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl || 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-[rgba(192,192,192,0.15)]" style={{ background: '#0B0B0D' }}>
      <ToolbarButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>B</ToolbarButton>
      <ToolbarButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>I</ToolbarButton>
      <ToolbarButton title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>S</ToolbarButton>
      <ToolbarButton title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
      <ToolbarButton title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
      <ToolbarButton title="Bullet List" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</ToolbarButton>
      <ToolbarButton title="Numbered List" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</ToolbarButton>
      <ToolbarButton title="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>&quot;</ToolbarButton>
      <ToolbarButton title="Link" active={editor.isActive('link')} onClick={setLink}>🔗</ToolbarButton>
      <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()}>↺</ToolbarButton>
      <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()}>↻</ToolbarButton>
    </div>
  );
}

export default function BlogPostForm({ initialData, postId }) {
  const router = useRouter();
  const isEditing = Boolean(postId);

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '');
  const [status, setStatus] = useState(initialData?.status || 'draft');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    initialData?.featured_image ? `/uploads/blog/${initialData.featured_image}` : null
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: initialData?.content || '',
    immediatelyRender: false,
    editorProps: {
      attributes: { class: 'blog-editor-content' },
    },
  });

  const handleTitleChange = useCallback((e) => {
    const value = e.target.value;
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }, [slugTouched]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !editor?.getText().trim()) {
      setError('Title and content are required.');
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.set('title', title.trim());
      formData.set('slug', slug.trim());
      formData.set('excerpt', excerpt.trim());
      formData.set('content', editor.getHTML());
      formData.set('meta_title', metaTitle.trim());
      formData.set('meta_description', metaDescription.trim());
      formData.set('status', status);
      if (imageFile) formData.set('featured_image', imageFile);

      const url = isEditing ? `/api/admin/blog/${postId}` : '/api/admin/blog';
      const res = await fetch(url, { method: isEditing ? 'PUT' : 'POST', body: formData });
      const data = await res.json();

      if (data.success) {
        router.push('/admin/blog');
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 rounded bg-red-900/30 border border-red-700/50 text-red-400 text-sm">❌ {error}</div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card-dark p-5">
            <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Title *</label>
            <input required value={title} onChange={handleTitleChange} placeholder="e.g. 5 Reasons Your Office Needs Armed Security Guards" className="form-input" />

            <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5 mt-4">
              URL Slug * <span className="text-[#666] font-normal normal-case">/blog/{slug || '...'}</span>
            </label>
            <input
              required
              value={slug}
              onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true); }}
              placeholder="auto-generated-from-title"
              className="form-input"
            />

            <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5 mt-4">Excerpt (short summary)</label>
            <textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Shown on the blog listing page..." className="form-input resize-none" maxLength={300} />
          </div>

          <div className="card-dark p-0 overflow-hidden">
            <div className="px-5 pt-4">
              <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Content *</label>
            </div>
            <EditorToolbar editor={editor} />
            <div className="p-4 min-h-[320px]" onClick={() => editor?.chain().focus().run()}>
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-5">
          <div className="card-dark p-5">
            <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-input" style={{ background: '#111827' }}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <button type="submit" disabled={saving} className="btn-primary w-full justify-center py-3 mt-4 disabled:opacity-60">
              {saving ? 'Saving...' : isEditing ? '💾 Update Post' : '➕ Create Post'}
            </button>
          </div>

          <div className="card-dark p-5">
            <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Featured Image</label>
            {imagePreview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imagePreview} alt="" className="w-full h-32 object-cover rounded mb-2 border border-[rgba(192,192,192,0.15)]" />
            )}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} className="form-input text-xs" />
          </div>

          <div className="card-dark p-5">
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-[#A8A8A8] mb-3">SEO</h3>
            <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Meta Title</label>
            <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="Falls back to Title" className="form-input" maxLength={200} />

            <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5 mt-4">Meta Description</label>
            <textarea rows={3} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Falls back to Excerpt" className="form-input resize-none" maxLength={300} />
          </div>
        </div>
      </div>
    </form>
  );
}
