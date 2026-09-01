"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeProvider, useTheme, themes } from './context/ThemeContext';

/* ─── Nav definitions ─── */
const salesNav = [
  { href: '/admin', label: 'Overview', exact: true, icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { href: '/admin/pipeline', label: 'Pipeline', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M10 18h4"/></svg> },
  { href: '/admin/deals', label: 'Deals', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg> },
  { href: '/admin/customers', label: 'Customers', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
  { href: '/admin/team', label: 'Team', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg> },
  { href: '/admin/forecasting', label: 'Forecasting', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg> },
  { href: '/admin/reports', label: 'Reports', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> },
  { href: '/admin/settings', label: 'Settings', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
];

const cmsNav = [
  { href: '/admin/blog', label: 'Blog', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg> },
  { href: '/admin/messages', label: 'Messages', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
  { href: '/admin/pages', label: 'CMS Pages', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> },
];

const pageTitles = {
  '/admin': 'Overview',
  '/admin/pipeline': 'Pipeline',
  '/admin/deals': 'Deals',
  '/admin/customers': 'Customers',
  '/admin/team': 'Team',
  '/admin/forecasting': 'Forecasting',
  '/admin/reports': 'Reports',
  '/admin/settings': 'Settings',
  '/admin/blog': 'Blog',
  '/admin/messages': 'Messages',
  '/admin/pages': 'CMS Pages',
  '/admin/profile': 'Profile',
};

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </ThemeProvider>
  );
}

function AdminLayoutInner({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const th = themes[theme];

  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState({ name: 'John Doe', email: 'john.doe@company.com', role: 'Sales Manager' });

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.ok ? r.json() : null).then(d => {
      if (d) setUser({ name: d.name || d.email, email: d.email, role: d.role || 'Sales Manager' });
    }).catch(() => {});
  }, []);

  const initials = (user.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const isActive = (item) => item.exact ? pathname === item.href : (pathname === item.href || pathname.startsWith(item.href + '/'));

  const pageTitle = Object.entries(pageTitles).find(([k]) => pathname === k || (!pageTitles[pathname] && pathname.startsWith(k + '/')))?.[1]
    || pageTitles[pathname] || 'Admin';

  const sidebarW = collapsed ? '64px' : '240px';

  const navLinkStyle = (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: collapsed ? 0 : '10px',
    padding: collapsed ? '10px 0' : '9px 12px',
    justifyContent: collapsed ? 'center' : 'flex-start',
    borderRadius: '8px',
    backgroundColor: active ? th.sidebarActiveBg : 'transparent',
    color: active ? th.sidebarActiveText : th.sidebarText,
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: active ? '600' : '500',
    transition: 'all 0.15s',
    borderLeft: active ? `3px solid ${th.accent}` : '3px solid transparent',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    cursor: 'pointer',
  });

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: th.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${th.scrollThumb}; border-radius: 3px; }
        .so-nav-link:hover { background-color: ${th.sidebarActiveBg} !important; color: ${th.sidebarActiveText} !important; }
        .so-row-hover:hover { background-color: ${th.surfaceHover} !important; }
        .so-btn-ghost:hover { background-color: ${th.surfaceHover} !important; }
        .so-input:focus { outline: none; border-color: ${th.accent} !important; box-shadow: 0 0 0 3px rgba(16,185,129,0.15); }
        .so-tab-btn { transition: all 0.15s; }
        .so-tab-btn:hover { background-color: ${th.surfaceHover} !important; }
      `}</style>

      {/* ─── Sidebar ─── */}
      <aside style={{
        width: sidebarW,
        minWidth: sidebarW,
        height: '100%',
        backgroundColor: th.sidebarBg,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease, min-width 0.2s ease',
        overflow: 'hidden',
        zIndex: 20,
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ height: '64px', padding: collapsed ? '0' : '0 16px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: '10px', borderBottom: `1px solid ${th.sidebarBorder}`, flexShrink: 0 }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
          </div>
          {!collapsed && (
            <span style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.3px' }}>SalesOps</span>
          )}
        </div>

        {/* Nav */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: collapsed ? '16px 8px' : '16px 12px' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {salesNav.map(item => {
              const active = isActive(item);
              return (
                <li key={item.href} style={{ marginBottom: '2px' }} title={collapsed ? item.label : ''}>
                  <Link href={item.href} className="so-nav-link" style={navLinkStyle(active)}>
                    <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div style={{ margin: collapsed ? '16px 0 8px' : '20px 4px 8px', fontSize: '10px', fontWeight: '700', letterSpacing: '0.8px', textTransform: 'uppercase', color: th.sidebarSection, whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {collapsed ? '···' : 'CMS Tools'}
          </div>

          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {cmsNav.map(item => {
              const active = isActive(item);
              return (
                <li key={item.href} style={{ marginBottom: '2px' }} title={collapsed ? item.label : ''}>
                  <Link href={item.href} className="so-nav-link" style={navLinkStyle(active)}>
                    <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Collapse button */}
        <button onClick={() => setCollapsed(c => !c)} style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: '8px', padding: collapsed ? '0' : '0 16px', background: 'none', border: 'none', borderTop: `1px solid ${th.sidebarBorder}`, color: th.sidebarText, cursor: 'pointer', fontSize: '13px', fontWeight: '500', flexShrink: 0, transition: 'color 0.15s', width: '100%' }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          {!collapsed && <span>Collapse</span>}
        </button>
      </aside>

      {/* ─── Main ─── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Header */}
        <header style={{ height: '64px', backgroundColor: th.headerBg, borderBottom: `1px solid ${th.headerBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0, zIndex: 10 }}>
          {/* Left: title + date filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: th.text }}>{pageTitle}</h1>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '8px', color: th.textSubtle, fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18"/></svg>
              Last 30 days
            </button>
          </div>

          {/* Right: search + notifications + avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <svg width="15" height="15" fill="none" stroke={th.textFaint} strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Search..." className="so-input" style={{ paddingLeft: '32px', paddingRight: '12px', height: '36px', backgroundColor: th.inputBg, border: `1px solid ${th.inputBorder}`, borderRadius: '8px', fontSize: '13px', color: th.inputText, width: '220px' }} />
            </div>

            {/* Bell */}
            <button className="so-btn-ghost" style={{ width: '36px', height: '36px', borderRadius: '50%', background: th.surface, border: `1px solid ${th.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', color: th.textSubtle }}>
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span style={{ position: 'absolute', top: '7px', right: '7px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', border: '2px solid ' + th.headerBg }} />
            </button>

            {/* Theme toggle */}
            <button onClick={toggleTheme} className="so-btn-ghost" title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} style={{ width: '36px', height: '36px', borderRadius: '50%', background: th.surface, border: `1px solid ${th.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: th.textSubtle }}>
              {theme === 'dark'
                ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>}
            </button>

            {/* User avatar */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setProfileOpen(p => !p)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: '700', flexShrink: 0 }}>{initials}</div>
              </button>

              {profileOpen && (
                <>
                  <div onClick={() => setProfileOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                  <div style={{ position: 'absolute', top: '44px', right: 0, width: '220px', backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', zIndex: 50, overflow: 'hidden' }}>
                    <div style={{ padding: '14px 16px', borderBottom: `1px solid ${th.border}` }}>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: th.text }}>{user.name}</div>
                      <div style={{ fontSize: '12px', color: th.textSubtle, marginTop: '2px' }}>{user.email}</div>
                    </div>
                    <div style={{ padding: '6px' }}>
                      <Link href="/admin/settings" onClick={() => setProfileOpen(false)} className="so-btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', color: th.textMuted, textDecoration: 'none', fontSize: '13px', fontWeight: '500', borderRadius: '8px' }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        Profile & Settings
                      </Link>
                      <button onClick={handleLogout} className="so-btn-ghost" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '13px', fontWeight: '500', borderRadius: '8px', textAlign: 'left' }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto', backgroundColor: th.bg, padding: '24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
