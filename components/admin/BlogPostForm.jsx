'use client';
// components/admin/BlogPostForm.jsx — Shared create/edit form for blog posts with TipTap Image support

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import { slugify } from '@/lib/slugify';

function ToolbarButton({ onClick, active, children, title, disabled }) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`px-2.5 py-1.5 rounded text-xs font-heading uppercase tracking-wide transition-colors ${
        active ? 'bg-[#2E6FBF] text-white' : 'text-[#C0C0C0] hover:bg-[rgba(255,255,255,0.08)] hover:text-white'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

function EditorToolbar({ editor }) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleInlineImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.url) {
        editor.chain().focus().setImage({ src: data.url, alt: file.name }).run();
      } else {
        alert(data.message || 'Failed to upload image.');
      }
    } catch (err) {
      alert('Error uploading image. Please check your connection.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const insertImageUrl = () => {
    const url = window.prompt('Enter Image Web URL (https://... or /uploads/...):');
    if (url && url.trim()) {
      editor.chain().focus().setImage({ src: url.trim(), alt: 'Blog Image' }).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-[rgba(192,192,192,0.15)]" style={{ background: '#0B0B0D' }}>
      <ToolbarButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>B</ToolbarButton>
      <ToolbarButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>I</ToolbarButton>
      <ToolbarButton title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>S</ToolbarButton>
      <ToolbarButton title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
      <ToolbarButton title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
      <ToolbarButton title="Bullet List" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</ToolbarButton>
      <ToolbarButton title="Numbered List" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</ToolbarButton>
      <ToolbarButton title="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>&quot;</ToolbarButton>
      <ToolbarButton title="Link" active={editor.isActive('link')} onClick={setLink}>🔗</ToolbarButton>

      {/* Inline Image Upload & URL */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInlineImageUpload}
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/avif"
        className="hidden"
      />
      <ToolbarButton
        title="Upload & Insert Image"
        disabled={uploadingImage}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploadingImage ? '⏳ Uploading...' : '🖼️ +Image'}
      </ToolbarButton>
      <ToolbarButton title="Insert Image via Web URL" onClick={insertImageUrl}>
        🌐 Image URL
      </ToolbarButton>

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
  const [scheduledAt, setScheduledAt] = useState(
    initialData?.published_at
      ? new Date(new Date(initialData.published_at).getTime() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16)
      : ''
  );
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    initialData?.featured_image
      ? (initialData.featured_image.startsWith('http') || initialData.featured_image.startsWith('/')
          ? initialData.featured_image
          : `/uploads/blog/${initialData.featured_image}`)
      : null
  );
  const [removeImage, setRemoveImage] = useState(false);
  const featuredFileInputRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
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
    setRemoveImage(false);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(true);
    if (featuredFileInputRef.current) featuredFileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !editor?.getText().trim()) {
      setError('Title and content are required.');
      return;
    }

    if (status === 'scheduled' && !scheduledAt) {
      setError('Please choose a scheduled publication date and time.');
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
      if (scheduledAt) formData.set('published_at', new Date(scheduledAt).toISOString());
      if (imageFile) formData.set('featured_image', imageFile);
      if (removeImage) formData.set('remove_image', 'true');

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
            <div className="px-5 pt-4 flex items-center justify-between">
              <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Content *</label>
              <span className="text-xs text-[#8A93A6]">💡 You can insert images anywhere using the &quot;🖼️ +Image&quot; button</span>
            </div>
            <EditorToolbar editor={editor} />
            <div className="p-4 min-h-[350px]" onClick={() => editor?.chain().focus().run()}>
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-5">
          <div className="card-dark p-5">
            <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Publish Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-input" style={{ background: '#111827' }}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">⏰ Schedule for Later</option>
            </select>

            {(status === 'scheduled' || status === 'published') && (
              <div className="mt-4 pt-3 border-t border-[rgba(192,192,192,0.15)]">
                <label className="block text-[#C0C0C0] text-xs font-medium mb-1.5">
                  {status === 'scheduled' ? 'Scheduled Publication Date & Time *' : 'Published Date (Optional)'}
                </label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="form-input text-xs"
                  required={status === 'scheduled'}
                />
                {status === 'scheduled' && (
                  <p className="text-[11px] text-[#8A93A6] mt-1.5">
                    Post will automatically go live when this date and time arrives.
                  </p>
                )}
              </div>
            )}

            <button type="submit" disabled={saving} className="btn-primary w-full justify-center py-3 mt-4 disabled:opacity-60">
              {saving ? 'Saving...' : isEditing ? '💾 Update Post' : status === 'scheduled' ? '⏰ Schedule Post' : '➕ Create Post'}
            </button>
          </div>

          <div className="card-dark p-5">
            <label className="block text-[#C0C0C0] text-sm font-medium mb-1.5">Featured Image</label>
            {imagePreview && (
              <div className="relative mb-2 rounded overflow-hidden border border-[rgba(192,192,192,0.15)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Featured Preview" className="w-full h-36 object-cover" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-black/70 hover:bg-red-900/80 text-white text-xs px-2 py-1 rounded"
                >
                  ✕ Remove
                </button>
              </div>
            )}
            <input
              ref={featuredFileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/avif"
              onChange={handleImageChange}
              className="form-input text-xs"
            />
            <p className="text-[11px] text-[#8A93A6] mt-1.5">Supported formats: JPG, PNG, WEBP, GIF, AVIF (Max 15MB)</p>
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
