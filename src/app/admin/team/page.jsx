"use client"
import React, { useState, useEffect } from 'react';
import { useTheme, themes } from '../context/ThemeContext';

function MemberModal({ member, th, onClose, onSave }) {
  const isEdit = !!member?.id;
  const [form, setForm] = useState(member || { name: '', email: '', role: '', initials: '', color: '#10b981', territory: '', deals: '', revenue: '', growth: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputStyle = { width: '100%', padding: '9px 12px', backgroundColor: th.inputBg, border: `1px solid ${th.inputBorder}`, borderRadius: '8px', fontSize: '13px', color: th.inputText, outline: 'none' };
  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', color: th.textSubtle, marginBottom: '5px' };

  const handleSave = async () => {
    const url = isEdit ? `/api/sales/team/${member.id}` : '/api/sales/team';
    const method = isEdit ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, deals: Number(form.deals) || 0, revenue: Number(form.revenue) || 0 }) });
    onSave();
  };

  const handleDelete = async () => {
    if (!confirm('Remove this team member?')) return;
    await fetch(`/api/sales/team/${member.id}`, { method: 'DELETE' });
    onSave();
  };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', zIndex: 101 }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${th.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: th.text }}>{isEdit ? 'Edit Member' : 'Add Team Member'}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: th.textSubtle }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '65vh', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div><label style={labelStyle}>Full Name *</label><input className="so-input" style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} /></div>
            <div><label style={labelStyle}>Initials</label><input className="so-input" style={inputStyle} value={form.initials || ''} onChange={e => set('initials', e.target.value)} maxLength={2} /></div>
          </div>
          <div><label style={labelStyle}>Email</label><input className="so-input" style={inputStyle} type="email" value={form.email || ''} onChange={e => set('email', e.target.value)} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div><label style={labelStyle}>Role</label><input className="so-input" style={inputStyle} value={form.role || ''} onChange={e => set('role', e.target.value)} placeholder="Account Executive" /></div>
            <div><label style={labelStyle}>Territory</label><input className="so-input" style={inputStyle} value={form.territory || ''} onChange={e => set('territory', e.target.value)} placeholder="West Coast" /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div><label style={labelStyle}>Deals Closed</label><input className="so-input" style={inputStyle} type="number" value={form.deals || ''} onChange={e => set('deals', e.target.value)} /></div>
            <div><label style={labelStyle}>Revenue ($)</label><input className="so-input" style={inputStyle} type="number" value={form.revenue || ''} onChange={e => set('revenue', e.target.value)} /></div>
            <div><label style={labelStyle}>Growth</label><input className="so-input" style={inputStyle} value={form.growth || ''} onChange={e => set('growth', e.target.value)} placeholder="+12%" /></div>
          </div>
          <div><label style={labelStyle}>Avatar Color</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899', '#ef4444', '#3b82f6'].map(c => (
                <button key={c} onClick={() => set('color', c)} style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: c, border: form.color === c ? `3px solid ${th.text}` : '3px solid transparent', cursor: 'pointer', padding: 0 }} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${th.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>{isEdit && <button onClick={handleDelete} style={{ padding: '8px 14px', backgroundColor: th.lostBg, color: th.lostText, border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Remove</button>}</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={onClose} style={{ padding: '9px 18px', backgroundColor: th.bg, border: `1px solid ${th.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: th.textMuted }}>Cancel</button>
            <button onClick={handleSave} style={{ padding: '9px 18px', backgroundColor: '#10b981', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#fff' }}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function TeamPage() {
  const { theme } = useTheme();
  const th = themes[theme];
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  const loadMembers = () => {
    setLoading(true);
    fetch('/api/sales/team')
      .then(r => r.json())
      .then(d => { setMembers(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadMembers(); }, []);

  const fmt = (n) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;
  const totalRevenue = members.reduce((s, m) => s + m.revenue, 0);
  const totalDeals = members.reduce((s, m) => s + m.deals, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {[
          { label: 'Team Members', value: members.length },
          { label: 'Total Deals', value: totalDeals, color: '#10b981' },
          { label: 'Total Revenue', value: fmt(totalRevenue), color: '#10b981' },
        ].map(s => (
          <div key={s.label} style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '18px 20px' }}>
            <div style={{ fontSize: '12px', color: th.textSubtle, marginBottom: '6px' }}>{s.label}</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: s.color || th.text }}>{loading ? '—' : s.value}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => setModal({})} style={{ padding: '9px 18px', backgroundColor: '#10b981', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 5v14M5 12h14"/></svg>
          Add Member
        </button>
      </div>

      {/* Team grid */}
      {loading
        ? <div style={{ textAlign: 'center', padding: '40px', color: th.textFaint }}>Loading team…</div>
        : members.length === 0
          ? <div style={{ textAlign: 'center', padding: '60px', color: th.textSubtle, backgroundColor: th.surface, borderRadius: '12px', border: `1px solid ${th.border}` }}>No team members yet.</div>
          : (
            <>
              {/* Leaderboard table */}
              <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: `1px solid ${th.border}` }}>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: th.text }}>Leaderboard</div>
                  <div style={{ fontSize: '12px', color: th.textSubtle }}>Ranked by revenue generated this month</div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: th.bg }}>
                      {['Rank', 'Name', 'Role', 'Territory', 'Deals', 'Revenue', 'Growth'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: th.textSubtle, textAlign: 'left', borderBottom: `1px solid ${th.border}` }}>{h}</th>
                      ))}
                      <th style={{ padding: '10px 16px', borderBottom: `1px solid ${th.border}` }} />
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((m, i) => (
                      <tr key={m.id} className="so-row-hover" style={{ borderBottom: i < members.length - 1 ? `1px solid ${th.border}` : 'none' }}>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: i === 0 ? '#f59e0b' : i === 1 ? '#9ca3af' : i === 2 ? '#d97706' : th.surfaceHover, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: i < 3 ? '#fff' : th.textFaint }}>{i + 1}</div>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: m.color || '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#fff', flexShrink: 0 }}>{m.initials || m.name.slice(0, 2).toUpperCase()}</div>
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: '600', color: th.text }}>{m.name}</div>
                              <div style={{ fontSize: '11px', color: th.textSubtle }}>{m.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: th.textMuted }}>{m.role}</td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: th.textMuted }}>{m.territory || '—'}</td>
                        <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: '700', color: th.text }}>{m.deals}</td>
                        <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: '700', color: th.text }}>{fmt(m.revenue)}</td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '700', color: '#10b981' }}>{m.growth || '—'}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <button onClick={() => setModal(m)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: th.textFaint, padding: '4px' }}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

      {modal !== null && <MemberModal member={modal.id ? modal : null} th={th} onClose={() => setModal(null)} onSave={() => { setModal(null); loadMembers(); }} />}
    </div>
  );
}
