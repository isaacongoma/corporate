"use client"
import React, { useState, useEffect } from 'react';
import { useTheme, themes } from '../context/ThemeContext';

const typeFilters = ['All', 'Enterprise', 'Growth', 'Starter'];

function HealthBar({ score, th }) {
  const color = score >= 90 ? '#10b981' : score >= 75 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
  const textColor = score >= 90 ? '#10b981' : score >= 75 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
  const trend = score >= 80 ? 'up' : score >= 65 ? 'flat' : 'down';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: th.textSubtle }}>
          Health Score
          <svg width="12" height="12" fill="none" stroke={trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : th.textSubtle} strokeWidth="2.5" viewBox="0 0 24 24">
            {trend === 'up' ? <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-9 9-4-4-6 6"/> : trend === 'down' ? <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0v-8m0 8l-9-9-4 4-6-6"/> : <path strokeLinecap="round" d="M5 12h14"/>}
          </svg>
        </div>
        <span style={{ fontSize: '14px', fontWeight: '700', color: textColor }}>{score}%</span>
      </div>
      <div style={{ height: '6px', backgroundColor: th.border, borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${score}%`, backgroundColor: color, borderRadius: '3px', transition: 'width 0.5s' }} />
      </div>
    </div>
  );
}

function TypeBadge({ type, th }) {
  const map = {
    Enterprise: { bg: th.badgeEntBg, text: th.badgeEntText },
    Growth: { bg: th.badgeGrowthBg, text: th.badgeGrowthText },
    Starter: { bg: th.badgeStarterBg, text: th.badgeStarterText },
  };
  const s = map[type] || { bg: th.surfaceHover, text: th.textSubtle };
  return (
    <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', backgroundColor: s.bg, color: s.text }}>{type}</span>
  );
}

function CustomerCard({ c, th, onEdit }) {
  const fmt = (n) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;
  return (
    <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '20px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: c.color || '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: '#fff', flexShrink: 0 }}>{c.initials || c.name.slice(0, 2).toUpperCase()}</div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: th.text }}>{c.name}</div>
              <div style={{ fontSize: '12px', color: th.textSubtle }}>{c.industry}</div>
            </div>
          </div>
          <TypeBadge type={c.type} th={th} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', marginBottom: '14px', fontSize: '12px', color: th.textSubtle }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span>{c.phone}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '14px', padding: '12px', backgroundColor: th.bg, borderRadius: '8px' }}>
          <div>
            <div style={{ fontSize: '11px', color: th.textSubtle, marginBottom: '2px' }}>Revenue</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: th.text }}>{fmt(c.revenue)}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: th.textSubtle, marginBottom: '2px' }}>Active Deals</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: th.text }}>{c.deals?.filter(d => d.status === 'Pending').length ?? 0}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: th.textSubtle, marginBottom: '2px' }}>Last Contact</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: th.text }}>{c.lastContact || '—'}</div>
          </div>
        </div>

        <HealthBar score={c.healthScore} th={th} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', borderTop: `1px solid ${th.border}` }}>
        <button style={{ padding: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'none', border: 'none', borderRight: `1px solid ${th.border}`, cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: th.textSubtle }} onMouseOver={e => e.currentTarget.style.backgroundColor = th.surfaceHover} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18"/></svg>
          Schedule
        </button>
        <button style={{ padding: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'none', border: 'none', borderRight: `1px solid ${th.border}`, cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: th.textSubtle }} onMouseOver={e => e.currentTarget.style.backgroundColor = th.surfaceHover} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          Email
        </button>
        <button onClick={() => onEdit(c)} style={{ padding: '11px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: th.textSubtle }} onMouseOver={e => e.currentTarget.style.backgroundColor = th.surfaceHover} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </button>
      </div>
    </div>
  );
}

function AddCustomerModal({ th, onClose, onSave }) {
  const [form, setForm] = useState({ name: '', industry: '', type: 'Starter', location: '', email: '', phone: '', revenue: '', healthScore: 75, initials: '', color: '#10b981', lastContact: 'Today' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputStyle = { width: '100%', padding: '9px 12px', backgroundColor: th.inputBg, border: `1px solid ${th.inputBorder}`, borderRadius: '8px', fontSize: '13px', color: th.inputText, outline: 'none' };
  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', color: th.textSubtle, marginBottom: '5px' };

  const handleSave = async () => {
    await fetch('/api/sales/customers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, revenue: Number(form.revenue) || 0, healthScore: Number(form.healthScore) || 75 }) });
    onSave();
  };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '520px', backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', zIndex: 101, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${th.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: th.text }}>Add Customer</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: th.textSubtle, padding: '4px' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '70vh', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div><label style={labelStyle}>Company Name *</label><input className="so-input" style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Acme Corporation" /></div>
            <div><label style={labelStyle}>Industry</label><input className="so-input" style={inputStyle} value={form.industry} onChange={e => set('industry', e.target.value)} placeholder="Technology" /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div><label style={labelStyle}>Type</label>
              <select className="so-input" style={inputStyle} value={form.type} onChange={e => set('type', e.target.value)}>
                <option>Starter</option><option>Growth</option><option>Enterprise</option>
              </select>
            </div>
            <div><label style={labelStyle}>Initials</label><input className="so-input" style={inputStyle} value={form.initials} onChange={e => set('initials', e.target.value)} placeholder="AC" maxLength={2} /></div>
          </div>
          <div><label style={labelStyle}>Location</label><input className="so-input" style={inputStyle} value={form.location} onChange={e => set('location', e.target.value)} placeholder="San Francisco, CA" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div><label style={labelStyle}>Email</label><input className="so-input" style={inputStyle} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="contact@company.com" /></div>
            <div><label style={labelStyle}>Phone</label><input className="so-input" style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 (555) 000-0000" /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div><label style={labelStyle}>Revenue ($)</label><input className="so-input" style={inputStyle} type="number" value={form.revenue} onChange={e => set('revenue', e.target.value)} placeholder="0" /></div>
            <div><label style={labelStyle}>Health Score (0–100)</label><input className="so-input" style={inputStyle} type="number" min="0" max="100" value={form.healthScore} onChange={e => set('healthScore', e.target.value)} /></div>
          </div>
        </div>
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${th.border}`, display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '9px 18px', backgroundColor: th.bg, border: `1px solid ${th.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: th.textMuted }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: '9px 18px', backgroundColor: '#10b981', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#fff' }}>Add Customer</button>
        </div>
      </div>
    </>
  );
}

export default function CustomersPage() {
  const { theme } = useTheme();
  const th = themes[theme];
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const loadCustomers = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter !== 'All') params.set('type', filter);
    if (search) params.set('search', search);
    fetch(`/api/sales/customers?${params}`)
      .then(r => r.json())
      .then(d => { setCustomers(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadCustomers(); }, [filter, search]);

  const totalRevenue = customers.reduce((s, c) => s + c.revenue, 0);
  const avgHealth = customers.length ? Math.round(customers.reduce((s, c) => s + c.healthScore, 0) / customers.length) : 0;
  const totalDeals = customers.reduce((s, c) => s + (c.deals?.filter(d => d.status === 'Pending').length || 0), 0);
  const fmt = (n) => n >= 1000000 ? `$${(n / 1000000).toFixed(2)}M` : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Total Customers', value: customers.length, icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
          { label: 'Total Revenue', value: fmt(totalRevenue), icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>, color: '#10b981' },
          { label: 'Avg Health Score', value: `${avgHealth}%`, icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>, color: '#f59e0b' },
          { label: 'Active Deals', value: totalDeals, icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>, color: '#06b6d4' },
        ].map(s => (
          <div key={s.label} style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: th.textSubtle, marginBottom: '6px' }}>{s.label}</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: s.color || th.text }}>{loading ? '—' : s.value}</div>
            </div>
            <div style={{ color: th.textFaint }}>{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
          <svg width="14" height="14" fill="none" stroke={th.textFaint} strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} className="so-input" style={{ paddingLeft: '32px', paddingRight: '12px', height: '38px', backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '8px', fontSize: '13px', color: th.inputText, width: '100%' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" fill="none" stroke={th.textSubtle} strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 9h10M11 14h2"/></svg>
          {typeFilters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 14px', borderRadius: '8px', border: `1px solid ${filter === f ? '#10b981' : th.border}`, backgroundColor: filter === f ? 'rgba(16,185,129,0.1)' : th.surface, color: filter === f ? '#10b981' : th.textSubtle, fontSize: '13px', fontWeight: filter === f ? '700' : '500', cursor: 'pointer', transition: 'all 0.15s' }}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={() => setShowAdd(true)} style={{ padding: '8px 16px', backgroundColor: '#10b981', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 5v14M5 12h14"/></svg>
          Add Customer
        </button>
      </div>

      {/* Cards grid */}
      {loading
        ? <div style={{ color: th.textFaint, fontSize: '14px', textAlign: 'center', padding: '40px' }}>Loading customers…</div>
        : customers.length === 0
          ? <div style={{ color: th.textSubtle, fontSize: '14px', textAlign: 'center', padding: '60px', backgroundColor: th.surface, borderRadius: '12px', border: `1px solid ${th.border}` }}>No customers found.</div>
          : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {customers.map(c => <CustomerCard key={c.id} c={c} th={th} onEdit={() => {}} />)}
            </div>
          )}

      {showAdd && <AddCustomerModal th={th} onClose={() => setShowAdd(false)} onSave={() => { setShowAdd(false); loadCustomers(); }} />}
    </div>
  );
}
