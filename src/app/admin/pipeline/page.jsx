"use client"
import React, { useState, useEffect } from 'react';
import { useTheme, themes } from '../context/ThemeContext';

const STAGES = ['Lead', 'Qualified', 'Proposal', 'Negotiation'];
const stageColors = { Lead: '#06b6d4', Qualified: '#10b981', Proposal: '#f59e0b', Negotiation: '#8b5cf6' };
const stageBg = { Lead: 'rgba(6,182,212,0.08)', Qualified: 'rgba(16,185,129,0.08)', Proposal: 'rgba(245,158,11,0.08)', Negotiation: 'rgba(139,92,246,0.08)' };

function StatusBadge({ status, th }) {
  const map = { Won: { bg: th.wonBg, text: th.wonText }, Pending: { bg: th.pendingBg, text: th.pendingText }, Lost: { bg: th.lostBg, text: th.lostText } };
  const s = map[status] || { bg: th.surfaceHover, text: th.textSubtle };
  return <span style={{ padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '700', backgroundColor: s.bg, color: s.text }}>{status}</span>;
}

function DealCard({ deal, th, onUpdate }) {
  const fmt = (n) => n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;
  return (
    <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '10px', padding: '14px', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
      onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
      onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: th.surfaceHover, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: th.textMuted, flexShrink: 0 }}>{deal.company[0]}</div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: th.text }}>{deal.company}</div>
        </div>
        <StatusBadge status={deal.status} th={th} />
      </div>
      {deal.contact && <div style={{ fontSize: '11px', color: th.textSubtle, marginBottom: '4px' }}>{deal.contact}</div>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ fontSize: '14px', fontWeight: '700', color: th.text }}>{fmt(deal.value)}</div>
        {deal.rep && <div style={{ fontSize: '11px', color: th.textFaint, backgroundColor: th.bg, padding: '2px 8px', borderRadius: '20px' }}>{deal.rep.split(' ')[0]}</div>}
      </div>
      {deal.closeDate && (
        <div style={{ fontSize: '11px', color: th.textFaint, marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18"/></svg>
          {new Date(deal.closeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      )}
    </div>
  );
}

export default function PipelinePage() {
  const { theme } = useTheme();
  const th = themes[theme];
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sales/deals')
      .then(r => r.json())
      .then(d => { setDeals(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const byStage = (stage) => deals.filter(d => d.stage === stage);
  const stageValue = (stage) => byStage(stage).reduce((s, d) => s + d.value, 0);
  const fmt = (n) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;
  const totalValue = deals.reduce((s, d) => s + d.value, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Summary bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {STAGES.map(stage => (
          <div key={stage} style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '16px 18px', borderTop: `3px solid ${stageColors[stage]}` }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: stageColors[stage], marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stage}</div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: th.text, marginBottom: '2px' }}>{loading ? '—' : byStage(stage).length}</div>
            <div style={{ fontSize: '12px', color: th.textSubtle }}>{loading ? '' : fmt(stageValue(stage))}</div>
          </div>
        ))}
      </div>

      {/* Total pipeline value */}
      <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: th.textSubtle }}>Total Pipeline Value</div>
        <div style={{ fontSize: '20px', fontWeight: '700', color: th.text }}>{loading ? '—' : fmt(totalValue)}</div>
      </div>

      {/* Kanban board */}
      {loading
        ? <div style={{ textAlign: 'center', padding: '40px', color: th.textFaint }}>Loading pipeline…</div>
        : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', alignItems: 'start' }}>
            {STAGES.map(stage => {
              const stageDeals = byStage(stage);
              return (
                <div key={stage} style={{ backgroundColor: stageBg[stage], border: `1px solid ${stageColors[stage]}30`, borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ padding: '12px 14px', borderBottom: `1px solid ${stageColors[stage]}30`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: stageColors[stage] }} />
                      <span style={{ fontSize: '13px', fontWeight: '700', color: th.text }}>{stage}</span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: stageColors[stage], backgroundColor: `${stageColors[stage]}20`, padding: '2px 8px', borderRadius: '20px' }}>{stageDeals.length}</span>
                  </div>
                  <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '120px' }}>
                    {stageDeals.length === 0
                      ? <div style={{ textAlign: 'center', color: th.textFaint, fontSize: '12px', padding: '20px 0' }}>No deals</div>
                      : stageDeals.map(d => <DealCard key={d.id} deal={d} th={th} />)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
}
