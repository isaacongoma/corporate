"use client"
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from './PageHeader';
import Card from './Card';
import Button from './Button';
import Badge from './Badge';
import Toast from './Toast';
import { FormField, Input, Textarea, Toggle } from './Form';
import ImageUpload from './ImageUpload';
import QuillEditor from './QuillEditor';
import { color, font } from './theme';
import { useTheme, themes } from '../context/ThemeContext';

const slugify = (s) => (s || '').toLowerCase().trim()
  .replace(/['"]/g, '')
  .replace(/[^\w\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

const EXCERPT_MAX = 280;

export default function BlogEditor({ initial, mode = 'create' }) {
  const router = useRouter();
  const { theme } = useTheme();
  const th = themes[theme];
  const [form, setForm] = useState(() => ({
    id: initial?.id ?? null,
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    excerpt: initial?.excerpt ?? '',
    content: initial?.content ?? '',
    featuredImage: initial?.featuredImage ?? '',
    published: initial?.published ?? true,
  }));
  const [slugTouched, setSlugTouched] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const update = (patch) => setForm(prev => ({ ...prev, ...patch }));

  const onTitleChange = (title) => {
    setForm(prev => ({
      ...prev, title,
      slug: slugTouched ? prev.slug : slugify(title),
    }));
  };

  const wordCount = useMemo(() => {
    const text = (form.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return text ? text.split(' ').length : 0;
  }, [form.content]);
  const readingMinutes = Math.max(1, Math.round(wordCount / 220));

  const save = async (publishOverride) => {
    if (!form.title.trim()) { setToast({ variant: 'danger', message: 'Title is required.' }); return; }
    if (!form.slug.trim()) { setToast({ variant: 'danger', message: 'Slug is required.' }); return; }

    setSaving(true);
    const payload = {
      title: form.title.trim(),
      slug: slugify(form.slug),
      excerpt: form.excerpt?.trim() || null,
      content: form.content || '',
      featuredImage: form.featuredImage || null,
      published: publishOverride ?? form.published,
    };

    try {
      const url = mode === 'edit' ? `/api/blogs/${form.id}` : '/api/blogs';
      const method = mode === 'edit' ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to save.');
      }
      setToast({ variant: 'success', message: mode === 'edit' ? 'Post updated.' : 'Post created.' });
      setTimeout(() => router.push('/admin/blog'), 700);
    } catch (err) {
      setSaving(false);
      setToast({ variant: 'danger', message: err.message || 'Unable to save.' });
    }
  };

  const excerptRemaining = EXCERPT_MAX - (form.excerpt?.length || 0);

  return (
    <>
      <PageHeader
        title={mode === 'edit' ? 'Edit Post' : 'Create Post'}
        subtitle={mode === 'edit' ? 'Update the content of an existing article.' : 'Draft a new article for your public blog.'}
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Blog', href: '/admin/blog' },
          { label: mode === 'edit' ? 'Edit' : 'New Post' },
        ]}
        actions={
          <>
            <Button variant="secondary" onClick={() => router.push('/admin/blog')}>Cancel</Button>
            {mode === 'edit' ? (
              <Button variant="primary" onClick={() => save()} loading={saving}>Save Changes</Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => save(false)} loading={saving && !form.published}>Save as Draft</Button>
                <Button variant="primary" onClick={() => save(true)} loading={saving && form.published}>Publish Post</Button>
              </>
            )}
          </>
        }
      />

      {toast && (
        <div style={{ marginBottom: 16 }}>
          <Toast variant={toast.variant} onClose={() => setToast(null)}>{toast.message}</Toast>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: 20, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
          <Card padding={0}>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <FormField label="Title" required>
                <Input
                  value={form.title}
                  onChange={e => onTitleChange(e.target.value)}
                  placeholder="A clear, compelling headline…"
                  style={{ fontSize: 18, fontWeight: 600, padding: '12px 14px' }}
                />
              </FormField>

              <FormField
                label="URL Slug"
                hint={<span style={{ color: th.textFaint }}>/{form.slug || 'your-post-url'}</span>}
                help="Auto-generated from the title. Click to customize."
              >
                <Input
                  value={form.slug}
                  onChange={e => { setSlugTouched(true); update({ slug: slugify(e.target.value) }); }}
                  placeholder="url-friendly-slug"
                  style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13 }}
                />
              </FormField>

              <FormField
                label="Short Description"
                hint={<span style={{ color: excerptRemaining < 0 ? color.danger : th.textFaint }}>{excerptRemaining} chars left</span>}
                help="Shown on blog listings and social previews."
              >
                <Textarea
                  rows={3}
                  value={form.excerpt}
                  onChange={e => update({ excerpt: e.target.value.slice(0, EXCERPT_MAX) })}
                  placeholder="A brief summary (one or two sentences)…"
                />
              </FormField>
            </div>
          </Card>

          <Card padding={0}>
            <div style={{
              padding: '16px 20px', borderBottom: `1px solid ${th.border}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              fontFamily: font.family,
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: th.text }}>Content</h3>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: th.textSubtle }}>Rich-text editor. Use headings, lists, links and media.</p>
              </div>
              <div style={{ display: 'flex', gap: 10, fontSize: 12, color: th.textSubtle }}>
                <span>{wordCount.toLocaleString()} words</span>
                <span style={{ color: th.textFaint }}>•</span>
                <span>~{readingMinutes} min read</span>
              </div>
            </div>
            <div style={{ padding: 20 }}>
              <QuillEditor value={form.content} onChange={v => update({ content: v })} />
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 16 }}>
          <Card padding={0}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${th.border}` }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: th.text, fontFamily: font.family }}>Publishing</h3>
            </div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, fontFamily: font.family }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: th.textMuted, fontWeight: 600 }}>Status</span>
                {form.published
                  ? <Badge variant="success" dot>Published</Badge>
                  : <Badge variant="default" dot>Draft</Badge>}
              </div>
              <Toggle
                id="published"
                checked={form.published}
                onChange={e => update({ published: e.target.checked })}
                label="Publish to public site"
                description="Turn off to keep this post hidden as a draft."
              />
            </div>
          </Card>

          <Card padding={0}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${th.border}` }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: th.text, fontFamily: font.family }}>Featured Image</h3>
            </div>
            <div style={{ padding: 20 }}>
              <ImageUpload
                label={null}
                value={form.featuredImage}
                onChange={(url) => update({ featuredImage: url })}
                folder="blog"
                help="Shown as the hero image on the post and in listings."
                aspect="16 / 9"
              />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
