"use client"
import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import Button, { IconButton } from '../components/Button';
import Badge from '../components/Badge';
import Drawer from '../components/Drawer';
import { color, font } from '../components/theme';
import { useTheme, themes } from '../context/ThemeContext';

export default function MessagesPage() {
  const { theme } = useTheme();
  const th = themes[theme];
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readIds, setReadIds] = useState(() => new Set());
  const [active, setActive] = useState(null);

  const load = () => {
    setLoading(true);
    fetch('/api/messages').then(r => r.json()).then(d => { setMessages(d || []); setLoading(false); });
  };
  useEffect(load, []);

  const openMessage = (row) => {
    setActive(row);
    setReadIds(prev => { const n = new Set(prev); n.add(row.id); return n; });
  };

  const total = messages.length;
  const unread = messages.filter(m => !readIds.has(m.id)).length;
  const today = messages.filter(m => {
    const d = new Date(m.createdAt); const t = new Date();
    return d.toDateString() === t.toDateString();
  }).length;

  const columns = [
    {
      header: 'From', accessor: 'name',
      render: (row) => {
        const isUnread = !readIds.has(row.id);
        const initials = (row.name || '?').split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase();
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
              background: `linear-gradient(135deg, ${color.brand500}, ${color.brand700})`,
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 13, letterSpacing: '0.02em',
            }}>{initials}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: isUnread ? 700 : 600, color: th.text, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {row.name}
              </div>
              <div style={{ color: th.textSubtle, fontSize: 12, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 220 }}>
                {row.email}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: 'Subject', accessor: 'subject',
      render: (row) => (
        <div style={{ minWidth: 0 }}>
          <div style={{ color: th.text, fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 360 }}>
            {row.subject || 'Quote request'}
          </div>
          <div style={{ color: th.textSubtle, fontSize: 13, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 360 }}>
            {row.message}
          </div>
        </div>
      ),
    },
    {
      header: 'Status', accessor: 'status', width: 120,
      render: (row) => readIds.has(row.id)
        ? <Badge variant="default" dot>Read</Badge>
        : <Badge variant="brand" dot>Unread</Badge>,
    },
    {
      header: 'Received', accessor: 'createdAt', width: 160,
      render: (row) => <span style={{ color: th.textMuted }}>{formatRelative(row.createdAt)}</span>,
    },
  ];

  return (
    <>
      <PageHeader
        title="Contact Messages"
        subtitle="Review inquiries, quote requests and customer messages."
        breadcrumbs={[{ label: 'Dashboard', href: '/admin' }, { label: 'Messages' }]}
        actions={<Button variant="secondary" onClick={load} icon={<RefreshIcon />}>Refresh</Button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Messages" value={total} hint="All received inquiries" tone="default" th={th} />
        <StatCard label="Unread" value={unread} hint="Pending response" tone="brand" th={th} />
        <StatCard label="Received Today" value={today} hint="In the last 24 hours" tone="info" th={th} />
      </div>

      <DataTable
        columns={columns}
        data={messages}
        loading={loading}
        rowKey="id"
        searchPlaceholder="Search by name, email or subject…"
        pagination={{ pageSize: 10 }}
        onRowClick={openMessage}
        rowActions={(row) => (
          <IconButton label="View message" onClick={() => openMessage(row)} size="sm">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1 1 0 0 1 0-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178a1 1 0 0 1 0 .644C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </IconButton>
        )}
        empty={{ title: 'No messages yet', description: 'When customers reach out via the contact form, their messages will appear here.' }}
      />

      <Drawer
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.subject || 'Customer message'}
        subtitle={active ? `From ${active.name} · ${formatRelative(active.createdAt)}` : ''}
        width={520}
        footer={
          <>
            <Button variant="secondary" onClick={() => setActive(null)}>Close</Button>
            {active?.email && (
              <Button variant="primary" onClick={() => window.location.href = `mailto:${active.email}?subject=Re: ${encodeURIComponent(active.subject || 'Your inquiry')}`}>
                Reply by email
              </Button>
            )}
          </>
        }
      >
        {active && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: font.family }}>
            <div style={{ backgroundColor: th.bg, border: `1px solid ${th.border}`, borderRadius: 12, padding: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', rowGap: 10, columnGap: 16, fontSize: 13 }}>
                <KV label="Name" value={active.name} th={th} />
                <KV label="Email" value={<a href={`mailto:${active.email}`} style={{ color: color.brand500, textDecoration: 'none', fontWeight: 600 }}>{active.email}</a>} th={th} />
                {active.phone && <KV label="Phone" value={<a href={`tel:${active.phone}`} style={{ color: color.brand500, textDecoration: 'none', fontWeight: 600 }}>{active.phone}</a>} th={th} />}
                <KV label="Received" value={new Date(active.createdAt).toLocaleString()} th={th} />
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em', color: th.textSubtle, fontWeight: 700, marginBottom: 8 }}>Message</div>
              <div style={{
                padding: 18, background: th.bg, border: `1px solid ${th.border}`,
                borderRadius: 12, color: th.text, fontSize: 14, lineHeight: 1.65, whiteSpace: 'pre-wrap',
              }}>
                {active.message}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}

function StatCard({ label, value, hint, tone = 'default', th }) {
  const tones = {
    default: { fg: th.text, ring: th.border, bg: th.surface },
    brand:   { fg: color.brand500, ring: color.brand200, bg: 'rgba(16,185,129,0.08)' },
    info:    { fg: '#3b82f6', ring: '#93c5fd', bg: 'rgba(59,130,246,0.08)' },
  };
  const t = tones[tone] || tones.default;
  return (
    <div style={{
      background: t.bg, border: `1px solid ${t.ring}`, borderRadius: 12,
      padding: '18px 20px', fontFamily: font.family,
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: th.textSubtle, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: t.fg, letterSpacing: '-0.02em', marginTop: 6 }}>{value}</div>
      <div style={{ fontSize: 12, color: th.textSubtle, marginTop: 4 }}>{hint}</div>
    </div>
  );
}

function KV({ label, value, th }) {
  return (
    <>
      <div style={{ color: th.textSubtle, fontWeight: 600 }}>{label}</div>
      <div style={{ color: th.text, fontWeight: 500, wordBreak: 'break-word' }}>{value}</div>
    </>
  );
}

function formatRelative(iso) {
  if (!iso) return '';
  const d = new Date(iso); const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function RefreshIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M20 9A8 8 0 0 0 5.93 7M4 15a8 8 0 0 0 14.07 2" /></svg>;
}
