"use client"
import React, { useState, useEffect } from 'react';
import { useTheme, themes } from '../context/ThemeContext';

const TABS = [
  { id: 'profile', label: 'Profile', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> },
  { id: 'notifications', label: 'Notifications', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg> },
  { id: 'integrations', label: 'Integrations', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg> },
  { id: 'security', label: 'Security', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> },
  { id: 'site', label: 'Site Config', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
];

const ROLES = ['Sales Manager', 'Account Executive', 'Sales Director', 'Sales Development Rep', 'VP of Sales', 'Admin'];
const TIMEZONES = ['Pacific Time (PT)', 'Mountain Time (MT)', 'Central Time (CT)', 'Eastern Time (ET)', 'GMT', 'EAT (East Africa Time)', 'CET', 'IST'];
const CURRENCIES = ['USD ($)', 'EUR (€)', 'GBP (£)', 'KES (KSh)', 'JPY (¥)', 'CAD ($)'];

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: on ? '#10b981' : '#6b7280', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0, padding: 0 }}>
      <span style={{ position: 'absolute', top: '3px', left: on ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </button>
  );
}

function NotificationRow({ label, desc, on, onChange, th }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${th.border}` }}>
      <div>
        <div style={{ fontSize: '14px', fontWeight: '600', color: th.text }}>{label}</div>
        {desc && <div style={{ fontSize: '12px', color: th.textSubtle, marginTop: '2px' }}>{desc}</div>}
      </div>
      <Toggle on={on} onChange={onChange} />
    </div>
  );
}

const integrations = [
  { name: 'Salesforce', desc: 'Sync deals and contacts from Salesforce CRM', logo: '#00A1E0', connected: true },
  { name: 'HubSpot', desc: 'Import leads and marketing data from HubSpot', logo: '#FF7A59', connected: false },
  { name: 'Slack', desc: 'Get deal notifications and alerts in Slack', logo: '#4A154B', connected: true },
  { name: 'Zapier', desc: 'Automate workflows with 5000+ apps via Zapier', logo: '#FF4A00', connected: false },
  { name: 'Google Sheets', desc: 'Export reports and data to Google Sheets', logo: '#34A853', connected: false },
  { name: 'Stripe', desc: 'Track payment and revenue data from Stripe', logo: '#6772E5', connected: false },
];

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const th = themes[theme];
  const [tab, setTab] = useState('profile');
  const [toast, setToast] = useState(null);
  const [profile, setProfile] = useState({ firstName: 'John', lastName: 'Doe', email: 'john.doe@company.com', role: 'Sales Manager', timezone: 'Pacific Time (PT)' });
  const [display, setDisplay] = useState({ currency: 'USD ($)', compact: false });
  const [notifs, setNotifs] = useState({ dealWon: true, newLead: true, teamActivity: false, weeklyReport: true, mentions: true });
  const [siteSettings, setSiteSettings] = useState(null);
  const [loadingSite, setLoadingSite] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.ok ? r.json() : null).then(d => {
      if (d) {
        const [firstName = '', ...rest] = (d.name || 'John Doe').split(' ');
        setProfile(p => ({ ...p, firstName, lastName: rest.join(' ') || 'Doe', email: d.email }));
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (tab === 'site' && !siteSettings) {
      setLoadingSite(true);
      fetch('/api/settings').then(r => r.json()).then(d => { setSiteSettings(d); setLoadingSite(false); }).catch(() => setLoadingSite(false));
    }
  }, [tab]);

  const showToast = (msg, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveProfile = async () => {
    try {
      await fetch('/api/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: `${profile.firstName} ${profile.lastName}`, email: profile.email }) });
      showToast('Profile saved.');
    } catch { showToast('Failed to save.', false); }
  };

  const handleSaveSite = async () => {
    try {
      const res = await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(siteSettings) });
      showToast(res.ok ? 'Site settings saved.' : 'Failed to save.', res.ok);
    } catch { showToast('Network error.', false); }
  };

  const inputStyle = { width: '100%', padding: '10px 12px', backgroundColor: th.inputBg, border: `1px solid ${th.inputBorder}`, borderRadius: '8px', fontSize: '13px', color: th.inputText, outline: 'none' };
  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', color: th.textSubtle, marginBottom: '5px' };

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 200, padding: '12px 20px', borderRadius: '10px', backgroundColor: toast.ok ? '#10b981' : '#ef4444', color: '#fff', fontSize: '13px', fontWeight: '600', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
          {toast.msg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Sidebar tabs */}
        <nav style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '8px', position: 'sticky', top: '16px' }}>
          {TABS.map(t => {
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className="so-tab-btn" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', marginBottom: '2px', backgroundColor: active ? 'rgba(16,185,129,0.1)' : 'transparent', color: active ? '#10b981' : th.textMuted, border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: active ? '700' : '500', textAlign: 'left' }}>
                <span style={{ color: active ? '#10b981' : th.textFaint }}>{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* ── Profile ── */}
          {tab === 'profile' && (
            <>
              <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '24px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: th.text }}>Personal Information</div>
                  <div style={{ fontSize: '12px', color: th.textSubtle, marginTop: '2px' }}>Update your personal details and preferences</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '700', color: '#fff' }}>
                    {profile.firstName[0]}{profile.lastName[0]}
                  </div>
                  <div>
                    <button style={{ padding: '7px 14px', backgroundColor: th.bg, border: `1px solid ${th.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: th.textMuted }}>Change Avatar</button>
                    <div style={{ fontSize: '11px', color: th.textFaint, marginTop: '4px' }}>JPG, PNG or GIF. Max 2MB.</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><label style={labelStyle}>First Name</label><input className="so-input" style={inputStyle} value={profile.firstName} onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))} /></div>
                  <div><label style={labelStyle}>Last Name</label><input className="so-input" style={inputStyle} value={profile.lastName} onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))} /></div>
                  <div><label style={labelStyle}>Email</label><input className="so-input" style={inputStyle} type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} /></div>
                  <div><label style={labelStyle}>Role</label>
                    <select className="so-input" style={inputStyle} value={profile.role} onChange={e => setProfile(p => ({ ...p, role: e.target.value }))}>
                      {ROLES.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div><label style={labelStyle}>Timezone</label>
                    <select className="so-input" style={inputStyle} value={profile.timezone} onChange={e => setProfile(p => ({ ...p, timezone: e.target.value }))}>
                      {TIMEZONES.map(z => <option key={z}>{z}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: th.text, marginBottom: '16px' }}>Display Preferences</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${th.border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ color: th.textSubtle }}><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg></div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: th.text }}>Dark Mode</div>
                        <div style={{ fontSize: '12px', color: th.textSubtle }}>Use dark theme for the interface</div>
                      </div>
                    </div>
                    <Toggle on={theme === 'dark'} onChange={() => toggleTheme()} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${th.border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ color: th.textSubtle }}><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 2a10 10 0 110 20"/></svg></div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: th.text }}>Currency Format</div>
                        <div style={{ fontSize: '12px', color: th.textSubtle }}>Display currency in your locale</div>
                      </div>
                    </div>
                    <select className="so-input" style={{ padding: '6px 10px', backgroundColor: th.inputBg, border: `1px solid ${th.inputBorder}`, borderRadius: '8px', fontSize: '12px', color: th.inputText, cursor: 'pointer' }} value={display.currency} onChange={e => setDisplay(d => ({ ...d, currency: e.target.value }))}>
                      {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ color: th.textSubtle }}><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg></div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: th.text }}>Compact View</div>
                        <div style={{ fontSize: '12px', color: th.textSubtle }}>Show more data in less space</div>
                      </div>
                    </div>
                    <Toggle on={display.compact} onChange={v => setDisplay(d => ({ ...d, compact: v }))} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleSaveProfile} style={{ padding: '10px 24px', backgroundColor: '#10b981', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M5 13l4 4L19 7"/></svg>
                  Save Changes
                </button>
              </div>
            </>
          )}

          {/* ── Notifications ── */}
          {tab === 'notifications' && (
            <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '16px', fontWeight: '700', color: th.text, marginBottom: '4px' }}>Notification Preferences</div>
              <div style={{ fontSize: '12px', color: th.textSubtle, marginBottom: '20px' }}>Choose what you want to be notified about</div>
              <NotificationRow th={th} label="Deal Won" desc="Notified when a deal is marked as won" on={notifs.dealWon} onChange={v => setNotifs(n => ({ ...n, dealWon: v }))} />
              <NotificationRow th={th} label="New Lead" desc="Alert when a new lead is added to the pipeline" on={notifs.newLead} onChange={v => setNotifs(n => ({ ...n, newLead: v }))} />
              <NotificationRow th={th} label="Team Activity" desc="Updates when team members take actions" on={notifs.teamActivity} onChange={v => setNotifs(n => ({ ...n, teamActivity: v }))} />
              <NotificationRow th={th} label="Weekly Report" desc="Receive a weekly performance summary email" on={notifs.weeklyReport} onChange={v => setNotifs(n => ({ ...n, weeklyReport: v }))} />
              <NotificationRow th={th} label="Mentions" desc="When someone mentions you in a comment" on={notifs.mentions} onChange={v => setNotifs(n => ({ ...n, mentions: v }))} />
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => showToast('Notification preferences saved.')} style={{ padding: '10px 24px', backgroundColor: '#10b981', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Save Preferences</button>
              </div>
            </div>
          )}

          {/* ── Integrations ── */}
          {tab === 'integrations' && (
            <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '16px', fontWeight: '700', color: th.text, marginBottom: '4px' }}>Integrations</div>
              <div style={{ fontSize: '12px', color: th.textSubtle, marginBottom: '24px' }}>Connect your favorite tools and services</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {integrations.map(intg => (
                  <div key={intg.name} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', border: `1px solid ${th.border}`, borderRadius: '10px', backgroundColor: th.bg }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: intg.logo, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color: '#fff', flexShrink: 0 }}>{intg.name[0]}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: th.text }}>{intg.name}</div>
                      <div style={{ fontSize: '12px', color: th.textSubtle }}>{intg.desc}</div>
                    </div>
                    <button style={{ padding: '7px 16px', borderRadius: '8px', border: `1px solid ${intg.connected ? th.border : '#10b981'}`, backgroundColor: intg.connected ? th.surface : 'rgba(16,185,129,0.1)', color: intg.connected ? th.textMuted : '#10b981', fontSize: '12px', fontWeight: '600', cursor: 'pointer', flexShrink: 0 }}>
                      {intg.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Security ── */}
          {tab === 'security' && (
            <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '16px', fontWeight: '700', color: th.text, marginBottom: '4px' }}>Security</div>
              <div style={{ fontSize: '12px', color: th.textSubtle, marginBottom: '24px' }}>Manage your password and security settings</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Current Password</label>
                  <input className="so-input" style={inputStyle} type="password" placeholder="••••••••" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><label style={labelStyle}>New Password</label><input className="so-input" style={inputStyle} type="password" placeholder="••••••••" /></div>
                  <div><label style={labelStyle}>Confirm Password</label><input className="so-input" style={inputStyle} type="password" placeholder="••••••••" /></div>
                </div>
                <div style={{ padding: '16px', backgroundColor: th.bg, borderRadius: '10px', border: `1px solid ${th.border}` }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: th.text, marginBottom: '8px' }}>Password Requirements</div>
                  {['At least 8 characters', 'One uppercase letter', 'One number', 'One special character'].map(req => (
                    <div key={req} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: th.textSubtle, marginBottom: '4px' }}>
                      <svg width="12" height="12" fill="none" stroke={th.textFaint} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4m0 4h.01"/></svg>
                      {req}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: `1px solid ${th.border}`, borderRadius: '10px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: th.text }}>Two-Factor Authentication</div>
                    <div style={{ fontSize: '12px', color: th.textSubtle }}>Add an extra layer of security to your account</div>
                  </div>
                  <button style={{ padding: '7px 14px', backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: '8px', color: '#10b981', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Enable 2FA</button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => showToast('Password updated.')} style={{ padding: '10px 24px', backgroundColor: '#10b981', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Update Password</button>
                </div>
              </div>
            </div>
          )}

          {/* ── Site Config ── */}
          {tab === 'site' && (
            <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '16px', fontWeight: '700', color: th.text, marginBottom: '4px' }}>Site Configuration</div>
              <div style={{ fontSize: '12px', color: th.textSubtle, marginBottom: '24px' }}>Manage your public website settings</div>
              {loadingSite || !siteSettings
                ? <div style={{ textAlign: 'center', padding: '40px', color: th.textFaint }}>Loading…</div>
                : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div><label style={labelStyle}>Company Name</label><input className="so-input" style={inputStyle} value={siteSettings.companyName || ''} onChange={e => setSiteSettings(s => ({ ...s, companyName: e.target.value }))} /></div>
                      <div><label style={labelStyle}>Contact Email</label><input className="so-input" style={inputStyle} type="email" value={siteSettings.contactEmail || ''} onChange={e => setSiteSettings(s => ({ ...s, contactEmail: e.target.value }))} /></div>
                      <div><label style={labelStyle}>Phone Numbers</label><input className="so-input" style={inputStyle} value={siteSettings.phoneNumbers || ''} onChange={e => setSiteSettings(s => ({ ...s, phoneNumbers: e.target.value }))} /></div>
                      <div><label style={labelStyle}>Office Location</label><input className="so-input" style={inputStyle} value={siteSettings.officeLocation || ''} onChange={e => setSiteSettings(s => ({ ...s, officeLocation: e.target.value }))} /></div>
                    </div>
                    <div><label style={labelStyle}>Hero Title</label><input className="so-input" style={inputStyle} value={siteSettings.heroTitle || ''} onChange={e => setSiteSettings(s => ({ ...s, heroTitle: e.target.value }))} /></div>
                    <div><label style={labelStyle}>Hero Subtitle</label><textarea className="so-input" style={{ ...inputStyle, height: '80px', resize: 'vertical' }} value={siteSettings.heroSubtitle || ''} onChange={e => setSiteSettings(s => ({ ...s, heroSubtitle: e.target.value }))} /></div>
                    <div><label style={labelStyle}>CTA Button Text</label><input className="so-input" style={inputStyle} value={siteSettings.heroBtnText || ''} onChange={e => setSiteSettings(s => ({ ...s, heroBtnText: e.target.value }))} /></div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button onClick={handleSaveSite} style={{ padding: '10px 24px', backgroundColor: '#10b981', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Save Site Settings</button>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
