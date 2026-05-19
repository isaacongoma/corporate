"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [topProfileOpen, setTopProfileOpen] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', role: 'Admin' });

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.ok ? r.json() : null).then(d => {
      if (d) setUser({ name: d.name || d.email, email: d.email, role: d.role || 'Admin' });
    });
  }, []);

  const initials = (user.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: (
      <svg style={{width:'22px',height:'22px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
    ) },
    { label: 'System Settings', href: '/admin/settings', icon: (
      <svg style={{width:'22px',height:'22px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    ) },
  ];

  const cmsItems = [
    { label: 'Pages Hierarchy', href: '/admin/pages', icon: (
      <svg style={{width:'22px',height:'22px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
    ) },
    { label: 'Contact Messages', href: '/admin/messages', icon: (
      <svg style={{width:'22px',height:'22px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
    ) },
    { label: 'Blog Publication', href: '/admin/blog', icon: (
      <svg style={{width:'22px',height:'22px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
    ) },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
      `}</style>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: '#f8fafc' }}>
        
        {/* Unified Dark Sidebar */}
        <aside style={{ width: '260px', height: '100%', backgroundColor: '#0f172a', display: 'flex', flexDirection: 'column', color: '#94a3b8', zIndex: 10, flexShrink: 0, overflow: 'hidden' }}>
          
          {/* Logo Area */}
          <div style={{ height: '65px', padding: '0 20px', boxSizing: 'border-box', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '12px', color: '#fff' }}>
             <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
             </div>
             <div style={{ lineHeight: '1.2' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>PRIME WATCH</div>
                <div style={{ fontSize: '10px', color: '#34d399', fontWeight: '600' }}>SECURITY GROUP</div>
             </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 16px' }}>
             <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '8px', color: '#64748b' }}>Administration</div>
             <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0' }}>
               {navItems.map(item => {
                 const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                 return (
                   <li key={item.label} style={{ marginBottom: '4px' }}>
                     <Link href={item.href} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', borderRadius: '8px', backgroundColor: isActive ? '#064e3b' : 'transparent', color: isActive ? '#34d399' : '#cbd5e1', textDecoration: 'none', fontSize: '13px', fontWeight: isActive ? '600' : '500', transition: 'all 0.2s', borderLeft: isActive ? '3px solid #10b981' : '3px solid transparent' }}>
                       <span style={{ marginRight: '12px', display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                       {item.label}
                     </Link>
                   </li>
                 );
               })}
             </ul>

             <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '8px', color: '#64748b' }}>CMS & Website</div>
             <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
               {cmsItems.map(item => {
                 const isActive = pathname.startsWith(item.href);
                 return (
                   <li key={item.label} style={{ marginBottom: '4px' }}>
                     <Link href={item.href} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', borderRadius: '8px', backgroundColor: isActive ? '#064e3b' : 'transparent', color: isActive ? '#34d399' : '#cbd5e1', textDecoration: 'none', fontSize: '13px', fontWeight: isActive ? '600' : '500', transition: 'all 0.2s', borderLeft: isActive ? '3px solid #10b981' : '3px solid transparent' }}>
                       <span style={{ marginRight: '12px', display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                       {item.label}
                     </Link>
                   </li>
                 );
               })}
             </ul>
          </div>
          
          {/* User Profile Bottom Sticky */}
          <div style={{ height: '65px', padding: '0 20px', boxSizing: 'border-box', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', position: 'relative' }} onClick={() => setProfileOpen(!profileOpen)}>
             <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '700' }}>{initials}</div>
             <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{user.role}</div>
             </div>
             <div style={{ color: '#64748b' }}>
               <svg style={{width:'16px',height:'16px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
             </div>
             
             {/* Dropdown overlay */}
             {profileOpen && (
               <>
                 <div onClick={(e) => { e.stopPropagation(); setProfileOpen(false); }} style={{ position: 'fixed', inset: 0, zIndex: 50, cursor: 'default' }}></div>
                 <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', bottom: '70px', left: '20px', width: '230px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', overflow: 'hidden', padding: 0, zIndex: 100, cursor: 'default' }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                       <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{user.name}</div>
                       <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{user.email}</div>
                    </div>
                    <div style={{ padding: '8px' }}>
                       <Link href="/admin/profile" onClick={() => setProfileOpen(false)} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', color: '#475569', textDecoration: 'none', fontSize: '13px', fontWeight: '600', borderRadius: '8px', transition: 'background 0.2s', width: '100%', boxSizing: 'border-box' }} onMouseOver={e=>e.currentTarget.style.backgroundColor='#f1f5f9'} onMouseOut={e=>e.currentTarget.style.backgroundColor='transparent'}>
                          <svg style={{marginRight:'10px',width:'18px',height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                          My Account
                       </Link>
                    </div>
                    <div style={{ padding: '8px', borderTop: '1px solid #f1f5f9' }}>
                       <button onClick={handleLogout} style={{ width: '100%', textAlign: 'left', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#dc2626', display: 'flex', alignItems: 'center', fontWeight: '600', borderRadius: '8px', transition: 'background-color 0.2s' }} onMouseOver={e=>e.currentTarget.style.backgroundColor='#fef2f2'} onMouseOut={e=>e.currentTarget.style.backgroundColor='transparent'}>
                         <svg style={{marginRight:'10px',width:'18px',height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                         Sign Out
                       </button>
                    </div>
                 </div>
               </>
             )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
           <header style={{ height: '65px', boxSizing: 'border-box', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between', backgroundColor: '#fff', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '14px' }}>
                 <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="Search anything..." style={{ padding: '8px 16px 8px 36px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', width: '280px', color: '#0f172a' }} />
                    <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4, width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                 </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                 <Link href="/" style={{ color: '#475569', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='#10b981'} onMouseOut={e=>e.currentTarget.style.color='#475569'}>
                   <svg style={{width:'16px',height:'16px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                   Live Site
                 </Link>
                 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}>
                       <svg style={{width:'18px',height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                    </button>
                    <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}>
                       <svg style={{width:'18px',height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    </button>
                 </div>

                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '8px', cursor: 'pointer', position: 'relative' }} onClick={() => setTopProfileOpen(!topProfileOpen)}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: '700' }}>
                       {initials}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                       <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', lineHeight: '1.2' }}>{user.name}</span>
                       <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>{user.role}</span>
                    </div>

                    {topProfileOpen && (
                      <>
                        <div onClick={(e) => { e.stopPropagation(); setTopProfileOpen(false); }} style={{ position: 'fixed', inset: 0, zIndex: 50, cursor: 'default' }}></div>
                        <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: '50px', right: '0', width: '230px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', overflow: 'hidden', padding: 0, zIndex: 100, cursor: 'default' }}>
                           <div style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                              <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{user.name}</div>
                              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{user.email}</div>
                           </div>
                           <div style={{ padding: '8px' }}>
                              <Link href="/admin/profile" onClick={() => setTopProfileOpen(false)} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', color: '#475569', textDecoration: 'none', fontSize: '13px', fontWeight: '600', borderRadius: '8px', transition: 'background 0.2s', width: '100%', boxSizing: 'border-box' }} onMouseOver={e=>e.currentTarget.style.backgroundColor='#f1f5f9'} onMouseOut={e=>e.currentTarget.style.backgroundColor='transparent'}>
                                 <svg style={{marginRight:'10px',width:'18px',height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                 My Account
                              </Link>
                           </div>
                           <div style={{ padding: '8px', borderTop: '1px solid #f1f5f9' }}>
                              <button onClick={handleLogout} style={{ width: '100%', textAlign: 'left', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#dc2626', display: 'flex', alignItems: 'center', fontWeight: '600', borderRadius: '8px', transition: 'background-color 0.2s' }} onMouseOver={e=>e.currentTarget.style.backgroundColor='#fef2f2'} onMouseOut={e=>e.currentTarget.style.backgroundColor='transparent'}>
                                <svg style={{marginRight:'10px',width:'18px',height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                Sign Out
                              </button>
                           </div>
                        </div>
                      </>
                    )}
                 </div>
              </div>
           </header>
           <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#f8fafc' }}>
             {children}
           </div>
        </main>
      </div>
    </>
  );
}
