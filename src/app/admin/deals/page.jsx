"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme, themes } from '../context/ThemeContext';

const STATUS_FILTERS = ['All', 'Won', 'Pending', 'Lost'];
const STAGES = ['Lead', 'Qualified', 'Proposal', 'Negotiation'];
const REPS = ['Sarah Chen', 'Mike Johnson', 'Emily Davis', 'James Wilson', 'Lisa Park'];

function StatusBadge({ status, th }) {
  const map = { Won: { bg: th.wonBg, text: th.wonText }, Pending: { bg: th.pendingBg, text: th.pendingText }, Lost: { bg: th.lostBg, text: th.lostText } };
  const s = map[status] || { bg: th.surfaceHover, text: th.textSubtle };
  return <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '600', backgroundColor: s.bg, color: s.text }}>{status}</span>;
}

function StageBadge({ stage, th }) {
  return <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', backgroundColor: th.surfaceHover, color: th.textSubtle }}>{stage}</span>;
}

function DealModal({ deal, th, onClose, onSave }) {
  const isEdit = !!deal?.id;
  const [form, setForm] = useState(deal || { company: '', contact: '', email: '', value: '', stage: 'Lead', status: 'Pending', rep: '', closeDate: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputStyle = { width: '100%', padding: '9px 12px', backgroundColor: th.inputBg, border: `1px solid ${th.inputBorder}`, borderRadius: '8px', fontSize: '13px', color: th.inputText, outline: 'none' };
  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', color: th.textSubtle, marginBottom: '5px' };

  const handleSave = async () => {
    const url = isEdit ? `/api/sales/deals/${deal.id}` : '/api/sales/deals';
    const method = isEdit ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, value: Number(form.value) || 0 }) });
    onSave();
  };

  const handleDelete = async () => {
    if (!confirm('Delete this deal?')) return;
    await fetch(`/api/sales/deals/${deal.id}`, { method: 'DELETE' });
    onSave();
  };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '520px', backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', zIndex: 101 }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${th.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: th.text }}>{isEdit ? 'Edit Deal' : 'New Deal'}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: th.textSubtle }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '65vh', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div><label style={labelStyle}>Company *</label><input className="so-input" style={inputStyle} value={form.company} onChange={e => set('company', e.target.value)} /></div>
            <div><label style={labelStyle}>Contact Name</label><input className="so-input" style={inputStyle} value={form.contact || ''} onChange={e => set('contact', e.target.value)} /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div><label style={labelStyle}>Email</label><input className="so-input" style={inputStyle} type="email" value={form.email || ''} onChange={e => set('email', e.target.value)} /></div>
            <div><label style={labelStyle}>Value ($)</label><input className="so-input" style={inputStyle} type="number" value={form.value} onChange={e => set('value', e.target.value)} /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div><label style={labelStyle}>Stage</label>
              <select className="so-input" style={inputStyle} value={form.stage} onChange={e => set('stage', e.target.value)}>
                {STAGES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Status</label>
              <select className="so-input" style={inputStyle} value={form.status} onChange={e => set('status', e.target.value)}>
                <option>Pending</option><option>Won</option><option>Lost</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div><label style={labelStyle}>Sales Rep</label>
              <select className="so-input" style={inputStyle} value={form.rep || ''} onChange={e => set('rep', e.target.value)}>
                <option value="">Select rep…</option>
                {REPS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Close Date</label><input className="so-input" style={inputStyle} type="date" value={form.closeDate ? form.closeDate.split('T')[0] : ''} onChange={e => set('closeDate', e.target.value)} /></div>
          </div>
        </div>
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${th.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {isEdit && <button onClick={handleDelete} style={{ padding: '8px 14px', backgroundColor: th.lostBg, color: th.lostText, border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Delete</button>}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={onClose} style={{ padding: '9px 18px', backgroundColor: th.bg, border: `1px solid ${th.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: th.textMuted }}>Cancel</button>
            <button onClick={handleSave} style={{ padding: '9px 18px', backgroundColor: '#10b981', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#fff' }}>Save Deal</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function DealsPage() {
  const { theme } = useTheme();
  const th = themes[theme];
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [modal, setModal] = useState(null);

  const loadDeals = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== 'All') params.set('status', statusFilter);
    if (search) params.set('search', search);
    fetch(`/api/sales/deals?${params}`)
      .then(r => r.json())
      .then(d => { setDeals(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [statusFilter, search]);

  useEffect(() => { loadDeals(); }, [loadDeals]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = [...deals].sort((a, b) => {
    let va = a[sortKey], vb = b[sortKey];
    if (sortKey === 'value') { va = Number(va); vb = Number(vb); }
    if (va < vb) return sortDir === 'asc' ? -1 : 1;
    if (va > vb) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const fmt = (n) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;
  const totalValue = deals.reduce((s, d) => s + d.value, 0);
  const wonValue = deals.filter(d => d.status === 'Won').reduce((s, d) => s + d.value, 0);

  const thTh = (key) => (
    <th onClick={() => handleSort(key)} style={{ padding: '10px 16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: th.textSubtle, textAlign: 'left', cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none', borderBottom: `1px solid ${th.border}` }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        {key === 'company' ? 'Company' : key === 'value' ? 'Value' : key === 'stage' ? 'Stage' : key === 'status' ? 'Status' : key === 'rep' ? 'Rep' : 'Close Date'}
        {sortKey === key && <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" d={sortDir === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}/></svg>}
      </span>
    </th>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {[
          { label: 'Total Deals', value: deals.length },
          { label: 'Total Value', value: fmt(totalValue), color: '#10b981' },
          { label: 'Won Value', value: fmt(wonValue), color: '#10b981' },
        ].map(s => (
          <div key={s.label} style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '18px 20px' }}>
            <div style={{ fontSize: '12px', color: th.textSubtle, marginBottom: '6px' }}>{s.label}</div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: s.color || th.text }}>{loading ? '—' : s.value}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
          <svg width="14" height="14" fill="none" stroke={th.textFaint} strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Search deals..." value={search} onChange={e => setSearch(e.target.value)} className="so-input" style={{ paddingLeft: '32px', paddingRight: '12px', height: '36px', backgroundColor: th.inputBg, border: `1px solid ${th.inputBorder}`, borderRadius: '8px', fontSize: '13px', color: th.inputText, width: '100%' }} />
        </div>
        <div style={{ display: 'flex', backgroundColor: th.bg, borderRadius: '8px', padding: '3px', gap: '2px', border: `1px solid ${th.border}` }}>
          {STATUS_FILTERS.map(f => (
            <button key={f} onClick={() => setStatusFilter(f)} style={{ padding: '5px 14px', borderRadius: '6px', border: 'none', backgroundColor: statusFilter === f ? '#10b981' : 'transparent', color: statusFilter === f ? '#fff' : th.textSubtle, fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s' }}>{f}</button>
          ))}
        </div>
        <button onClick={() => setModal({})} style={{ padding: '8px 16px', backgroundColor: '#10b981', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 5v14M5 12h14"/></svg>
          New Deal
        </button>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ fontSize: '14px', color: th.textSubtle, padding: '12px 20px 4px', fontStyle: 'italic' }}>
          View and manage all your deals in one place
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: th.bg }}>
              <tr>
                {thTh('company')}
                <th style={{ padding: '10px 16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: th.textSubtle, textAlign: 'left', borderBottom: `1px solid ${th.border}` }}>Contact</th>
                {thTh('value')}
                {thTh('stage')}
                {thTh('status')}
                {thTh('rep')}
                {thTh('closeDate')}
                <th style={{ padding: '10px 16px', borderBottom: `1px solid ${th.border}` }} />
              </tr>
            </thead>
            <tbody>
              {loading
                ? <tr><td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: th.textFaint, fontSize: '13px' }}>Loading deals…</td></tr>
                : sorted.length === 0
                  ? <tr><td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: th.textFaint, fontSize: '13px' }}>No deals found.</td></tr>
                  : sorted.map(d => (
                    <tr key={d.id} className="so-row-hover" style={{ borderBottom: `1px solid ${th.border}` }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: th.surfaceHover, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: th.textSubtle, flexShrink: 0 }}>{d.company[0]}</div>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: th.text }}>{d.company}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontSize: '13px', fontWeight: '500', color: th.text }}>{d.contact}</div>
                        <div style={{ fontSize: '11px', color: th.textFaint }}>{d.email}</div>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '700', color: th.text }}>{fmt(d.value)}</td>
                      <td style={{ padding: '14px 16px' }}><StageBadge stage={d.stage} th={th} /></td>
                      <td style={{ padding: '14px 16px' }}><StatusBadge status={d.status} th={th} /></td>
                      <td style={{ padding: '14px 16px', fontSize: '13px', color: th.textMuted }}>{d.rep}</td>
                      <td style={{ padding: '14px 16px', fontSize: '13px', color: th.textMuted }}>{d.closeDate ? new Date(d.closeDate).toLocaleDateString() : '—'}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <button onClick={() => setModal(d)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: th.textFaint, padding: '4px' }}>
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal !== null && <DealModal deal={modal.id ? modal : null} th={th} onClose={() => setModal(null)} onSave={() => { setModal(null); loadDeals(); }} />}
    </div>
  );
}
