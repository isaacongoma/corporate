"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import Button, { IconButton } from '../components/Button';
import Badge from '../components/Badge';
import Toast from '../components/Toast';
import { color } from '../components/theme';
import { useTheme, themes } from '../context/ThemeContext';

export default function BlogAdmin() {
  const router = useRouter();
  const { theme } = useTheme();
  const th = themes[theme];
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const fetchBlogs = () => {
    setLoading(true);
    fetch('/api/blogs').then(r => r.json()).then(d => { setBlogs(d || []); setLoading(false); });
  };
  useEffect(fetchBlogs, []);

  const handleDelete = async (row) => {
    if (!confirm(`Delete "${row.title}"? This can't be undone.`)) return;
    const res = await fetch(`/api/blogs/${row.id}`, { method: 'DELETE' });
    if (res.ok) {
      setToast({ variant: 'success', message: 'Post deleted.' });
      fetchBlogs();
      setTimeout(() => setToast(null), 3000);
    } else {
      setToast({ variant: 'danger', message: 'Failed to delete.' });
    }
  };

  const columns = [
    {
      header: 'Title', accessor: 'title',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
            background: row.featuredImage ? `url(${row.featuredImage}) center/cover` : 'rgba(16,185,129,0.1)',
            color: color.brand500, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {!row.featuredImage && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5v-15A1.5 1.5 0 0 1 5.5 3H19a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6.5A1.5 1.5 0 0 1 5 19.5Zm0 0A1.5 1.5 0 0 1 6.5 18H20" />
              </svg>
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, color: th.text, fontSize: 14, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 320 }}>
              {row.title}
            </div>
            <div style={{ color: th.textFaint, fontSize: 12, marginTop: 2 }}>/{row.slug}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Status', accessor: 'published', width: 140,
      render: (row) => row.published
        ? <Badge variant="success" dot>Published</Badge>
        : <Badge variant="default" dot>Draft</Badge>,
    },
    {
      header: 'Author', accessor: 'author', width: 160,
      render: () => <span style={{ color: th.textMuted, fontWeight: 500 }}>Super Admin</span>,
    },
    {
      header: 'Published', accessor: 'createdAt', width: 150,
      render: (row) => <span style={{ color: th.textMuted }}>{new Date(row.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>,
    },
  ];

  return (
    <>
      <PageHeader
        title="Blog Publication"
        subtitle="Create, edit and manage articles published to your public site."
        breadcrumbs={[{ label: 'Dashboard', href: '/admin' }, { label: 'Blog' }]}
        actions={
          <>
            <Button variant="secondary" size="md" onClick={fetchBlogs} icon={<RefreshIcon />}>Refresh</Button>
            <Link href="/admin/blog/new" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="md" icon={<PlusIcon />}>Create Post</Button>
            </Link>
          </>
        }
      />

      {toast && (
        <div style={{ marginBottom: 16 }}>
          <Toast variant={toast.variant} onClose={() => setToast(null)}>{toast.message}</Toast>
        </div>
      )}

      <DataTable
        columns={columns}
        data={blogs}
        loading={loading}
        rowKey="id"
        searchPlaceholder="Search by title or slug…"
        pagination={{ pageSize: 10 }}
        onRowClick={(row) => router.push(`/admin/blog/${row.id}/edit`)}
        empty={{
          title: 'No posts yet',
          description: 'Publish your first article to start engaging visitors.',
          action: (
            <Link href="/admin/blog/new" style={{ textDecoration: 'none' }}>
              <Button variant="primary" icon={<PlusIcon />}>Create Post</Button>
            </Link>
          ),
        }}
        rowActions={(row) => (
          <>
            <Link href={`/admin/blog/${row.id}/edit`} style={{ textDecoration: 'none' }}>
              <IconButton label="Edit" size="sm">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.06 2.06 0 1 1 2.915 2.915L7.5 19.68l-4 1 1-4L16.862 4.487Z" /></svg>
              </IconButton>
            </Link>
            <IconButton label="Delete" onClick={() => handleDelete(row)} size="sm" style={{ color: color.danger }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12m-9 4v6m6-6v6M5 7l1 13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-13M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" /></svg>
            </IconButton>
          </>
        )}
      />
    </>
  );
}

function PlusIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" /></svg>;
}
function RefreshIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M20 9A8 8 0 0 0 5.93 7M4 15a8 8 0 0 0 14.07 2" /></svg>;
}
