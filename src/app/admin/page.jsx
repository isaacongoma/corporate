import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import PageHeader from './components/PageHeader';
import Card from './components/Card';
import Badge from './components/Badge';
import StatTile from './components/StatTile';
import { color, font } from './components/theme';

export default async function AdminDashboard() {
  const [blogsCount, messagesCount, servicesCount, pagesCount, recentMessages, recentBlogs] = await Promise.all([
    prisma.blog.count(),
    prisma.contactMessage.count(),
    prisma.service.count(),
    prisma.page.count(),
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.blog.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ]);

  const stats = [
    { label: 'Contact Messages',  value: messagesCount,  hint: 'Inquiries received',         tone: 'brand',   href: '/admin/messages',  icon: <InboxIcon /> },
    { label: 'Blog Articles',     value: blogsCount,     hint: 'Published posts',            tone: 'info',    href: '/admin/blog',      icon: <ArticleIcon /> },
    { label: 'CMS Pages',         value: pagesCount,     hint: 'Editable public pages',      tone: 'default', href: '/admin/pages',     icon: <LayoutIcon /> },
    { label: 'Active Services',   value: servicesCount,  hint: 'Services on the site',       tone: 'success', href: '/admin/settings',  icon: <ShieldIcon /> },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="An overview of your public site, content and recent activity."
        meta={<><span>Data refreshed · just now</span><span style={{ color: color.textFaint }}>•</span><span>Prime Watch Security</span></>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        {stats.map(s => <StatTile key={s.label} {...s} />)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
        <Card padding={0}>
          <PanelHeader title="Recent Messages" linkLabel="View all" href="/admin/messages" />
          <ListEmptyOr items={recentMessages} empty="No messages yet.">
            {recentMessages.map(m => (
              <li key={m.id} style={listItem}>
                <Avatar name={m.name} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', minWidth: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: color.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</span>
                    <Badge variant="brand">New</Badge>
                  </div>
                  <div style={{ fontSize: 12, color: color.textSubtle, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>
                    {m.subject || m.message?.slice(0, 60)}
                  </div>
                </div>
                <span style={{ fontSize: 12, color: color.textFaint, flexShrink: 0 }}>
                  {formatRelative(m.createdAt)}
                </span>
              </li>
            ))}
          </ListEmptyOr>
        </Card>

        <Card padding={0}>
          <PanelHeader title="Latest Blog Posts" linkLabel="Manage" href="/admin/blog" />
          <ListEmptyOr items={recentBlogs} empty="No posts published yet.">
            {recentBlogs.map(b => (
              <li key={b.id} style={listItem}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  background: b.featuredImage ? `url(${b.featuredImage}) center/cover` : color.brand50,
                  color: color.brand600, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {!b.featuredImage && <ArticleIcon size={16} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: color.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.title}</div>
                  <div style={{ fontSize: 12, color: color.textSubtle, marginTop: 2 }}>/{b.slug}</div>
                </div>
                {b.published
                  ? <Badge variant="success">Published</Badge>
                  : <Badge variant="default">Draft</Badge>}
              </li>
            ))}
          </ListEmptyOr>
        </Card>
      </div>
    </>
  );
}

const listItem = {
  display: 'flex', alignItems: 'center', gap: 12,
  padding: '12px 20px', borderBottom: `1px solid ${color.divider}`,
  fontFamily: font.family, listStyle: 'none',
};

function PanelHeader({ title, linkLabel, href }) {
  return (
    <header style={{
      padding: '16px 20px', borderBottom: `1px solid ${color.divider}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: font.family,
    }}>
      <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: color.text }}>{title}</h3>
      {href && (
        <Link href={href} style={{
          fontSize: 13, color: color.brand700, textDecoration: 'none',
          fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          {linkLabel}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" /></svg>
        </Link>
      )}
    </header>
  );
}

function ListEmptyOr({ items, empty, children }) {
  if (!items || items.length === 0) {
    return (
      <div style={{ padding: '32px 20px', textAlign: 'center', color: color.textSubtle, fontSize: 13, fontFamily: font.family }}>
        {empty}
      </div>
    );
  }
  return <ul style={{ margin: 0, padding: 0 }}>{children}</ul>;
}

function Avatar({ name }) {
  const initials = (name || '?').split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
      background: `linear-gradient(135deg, ${color.brand500}, ${color.brand700})`,
      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: 13,
    }}>{initials}</div>
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
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function InboxIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M4 13h4l2 3h4l2-3h4M4 13l2-7h12l2 7M4 13v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /></svg>; }
function ArticleIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5v-15A1.5 1.5 0 0 1 5.5 3H19a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6.5A1.5 1.5 0 0 1 5 19.5Zm0 0A1.5 1.5 0 0 1 6.5 18H20M9 7h6M9 11h6M9 15h4" /></svg>; }
function LayoutIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M9 21V9M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /></svg>; }
function ShieldIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>; }
