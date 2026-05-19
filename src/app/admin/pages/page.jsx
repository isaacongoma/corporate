"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import Button, { IconButton } from '../components/Button';
import Badge from '../components/Badge';
import { color } from '../components/theme';

export default function PagesList() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch('/api/pages').then(r => r.json()).then(d => { setPages(d || []); setLoading(false); });
  };
  useEffect(load, []);

  const columns = [
    {
      header: 'Page', accessor: 'title',
      render: (row) => (
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, color: color.text, fontSize: 14 }}>{row.title}</div>
          <div style={{ color: color.textFaint, fontSize: 12, marginTop: 2, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>/{row.slug}</div>
        </div>
      ),
    },
    {
      header: 'Type', accessor: 'type', width: 140,
      render: () => <Badge variant="brand">CMS Page</Badge>,
    },
    {
      header: 'Last Modified', accessor: 'updatedAt', width: 180,
      render: (row) => (
        <span style={{ color: color.textMuted }}>
          {new Date(row.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Pages Management"
        subtitle="Edit the content blocks and copy across your public-facing pages."
        breadcrumbs={[{ label: 'Dashboard', href: '/admin' }, { label: 'Pages' }]}
        actions={<Button variant="secondary" onClick={load} icon={<RefreshIcon />}>Refresh</Button>}
      />

      <DataTable
        columns={columns}
        data={pages}
        loading={loading}
        rowKey="id"
        searchPlaceholder="Search pages by name or slug…"
        pagination={{ pageSize: 10 }}
        empty={{ title: 'No pages configured', description: 'CMS pages will appear here once they are seeded in the database.' }}
        rowActions={(row) => (
          <>
            <Link href={`/admin/pages/${row.slug}`} style={{ textDecoration: 'none' }}>
              <IconButton label="Edit page" size="sm">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.06 2.06 0 1 1 2.915 2.915L7.5 19.68l-4 1 1-4L16.862 4.487Z" /></svg>
              </IconButton>
            </Link>
            <a href={`/${row.slug}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <IconButton label="View on public site" size="sm">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </IconButton>
            </a>
          </>
        )}
      />
    </>
  );
}

function RefreshIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M20 9A8 8 0 0 0 5.93 7M4 15a8 8 0 0 0 14.07 2" /></svg>;
}
