"use client"
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme, themes } from './context/ThemeContext';

// Static monthly revenue chart data (can be extended to be dynamic from DB later)
const revenueData = [
  { month: 'Jan', revenue: 150000, target: 120000 },
  { month: 'Feb', revenue: 180000, target: 140000 },
  { month: 'Mar', revenue: 165000, target: 155000 },
  { month: 'Apr', revenue: 200000, target: 170000 },
  { month: 'May', revenue: 240000, target: 190000 },
  { month: 'Jun', revenue: 290000, target: 210000 },
  { month: 'Jul', revenue: 330000, target: 235000 },
  { month: 'Aug', revenue: 355000, target: 255000 },
  { month: 'Sep', revenue: 390000, target: 278000 },
  { month: 'Oct', revenue: 428000, target: 308000 },
  { month: 'Nov', revenue: 475000, target: 342000 },
  { month: 'Dec', revenue: 548000, target: 382000 },
];

const fmt = (n) => {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n}`;
};

function StatCard({ label, value, change, positive, icon, th }) {
  return (
    <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <span style={{ fontSize: '13px', color: th.textSubtle, fontWeight: '500' }}>{label}</span>
        <div style={{ color: th.textFaint }}>{icon}</div>
      </div>
      <div style={{ fontSize: '26px', fontWeight: '700', color: th.text, marginBottom: '8px' }}>{value}</div>
      {change && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '600', color: positive ? th.statUp : th.statDown }}>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            {positive
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-9 9-4-4-6 6"/>
              : <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0v-8m0 8l-9-9-4 4-6-6"/>}
          </svg>
          {change}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status, th }) {
  const map = {
    Won: { bg: th.wonBg, text: th.wonText, icon: '✓' },
    Pending: { bg: th.pendingBg, text: th.pendingText, icon: '⊙' },
    Lost: { bg: th.lostBg, text: th.lostText, icon: '✕' },
  };
  const s = map[status] || { bg: th.surfaceHover, text: th.textSubtle, icon: '' };
  return (
    <span style={{ padding: '3px 9px', borderRadius: '999px', fontSize: '11px', fontWeight: '600', backgroundColor: s.bg, color: s.text }}>
      {s.icon} {status}
    </span>
  );
}

const ChartTooltip = ({ active, payload, label, th }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ backgroundColor: th.chartTooltipBg, border: `1px solid ${th.chartTooltipBorder}`, borderRadius: '8px', padding: '10px 14px', fontSize: '12px' }}>
      <div style={{ fontWeight: '600', color: th.text, marginBottom: '6px' }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: p.color, display: 'inline-block' }} />
          <span style={{ color: th.textMuted }}>{p.name === 'revenue' ? 'Revenue' : 'Target'}:</span>
          <span style={{ fontWeight: '600', color: th.text }}>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function OverviewPage() {
  const { theme } = useTheme();
  const th = themes[theme];
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sales/overview')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const kpis = data?.kpis || {};
  const pipelineStages = data?.pipelineStages || [];
  const recentDeals = data?.recentDeals || [];
  const topPerformers = data?.topPerformers || [];
  const totalPipelineValue = data?.totalPipelineValue || 0;
  const memberColors = ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <StatCard th={th} label="Total Revenue" value={loading ? '—' : fmt(kpis.totalRevenue || 0)} change="+12.5%" positive icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>} />
        <StatCard th={th} label="Conversion Rate" value={loading ? '—' : `${kpis.conversionRate || 0}%`} change="+3.2%" positive icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>} />
        <StatCard th={th} label="Active Deals" value={loading ? '—' : String(kpis.activeDeals || 0)} change="-5" positive={false} icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4l3 3"/></svg>} />
        <StatCard th={th} label="New Leads" value={loading ? '—' : String(kpis.newLeads || 0)} change="+18.3%" positive icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/></svg>} />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '16px' }}>
        {/* Revenue Trend */}
        <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: th.text }}>Revenue Trend</div>
              <div style={{ fontSize: '12px', color: th.textSubtle, marginTop: '2px' }}>Monthly performance vs target</div>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontWeight: '500', color: th.textSubtle }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4', display: 'inline-block' }} />Revenue</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />Target</span>
            </div>
          </div>
          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gTgt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={th.chartGrid} vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: th.chartText }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: th.chartText }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip content={<ChartTooltip th={th} />} />
                <Area type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2.5} fill="url(#gRev)" dot={false} />
                <Area type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} fill="url(#gTgt)" dot={false} strokeDasharray="5 3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Stages */}
        <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: '700', color: th.text, marginBottom: '2px' }}>Pipeline Stages</div>
          <div style={{ fontSize: '12px', color: th.textSubtle, marginBottom: '20px' }}>Distribution by stage</div>
          {loading
            ? <div style={{ color: th.textFaint, fontSize: '13px' }}>Loading…</div>
            : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {pipelineStages.map(s => (
                  <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: th.text }}>{s.label}</span>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
                        <span style={{ color: th.textSubtle }}>{s.count}</span>
                        <span style={{ fontWeight: '700', color: th.text }}>{s.pct}%</span>
                      </div>
                    </div>
                    <div style={{ height: '6px', backgroundColor: th.border, borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${s.pct}%`, backgroundColor: s.color, borderRadius: '3px' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: `1px solid ${th.border}`, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: th.textSubtle }}>Total Pipeline Value</span>
            <span style={{ fontSize: '15px', fontWeight: '700', color: th.text }}>{fmt(totalPipelineValue)}</span>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Recent Deals */}
        <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${th.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: th.text }}>Recent Deals</div>
              <div style={{ fontSize: '12px', color: th.textSubtle }}>Latest activity</div>
            </div>
            <a href="/admin/deals" style={{ fontSize: '12px', fontWeight: '600', color: th.accent, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View all
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </a>
          </div>
          {loading
            ? <div style={{ padding: '20px', color: th.textFaint, fontSize: '13px' }}>Loading…</div>
            : recentDeals.map((d, i) => (
              <div key={i} className="so-row-hover" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderBottom: i < recentDeals.length - 1 ? `1px solid ${th.border}` : 'none' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: th.surfaceHover, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: th.textMuted, flexShrink: 0 }}>{d.initial}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: th.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.company}</div>
                  <div style={{ fontSize: '11px', color: th.textSubtle }}>{d.rep} · {d.ago}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: th.text }}>{fmt(d.value)}</div>
                  <div style={{ marginTop: '2px' }}><StatusBadge status={d.status} th={th} /></div>
                </div>
              </div>
            ))}
        </div>

        {/* Top Performers */}
        <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${th.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: th.text }}>Top Performers</div>
              <div style={{ fontSize: '12px', color: th.textSubtle }}>{"This month's leaders"}</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          {loading
            ? <div style={{ padding: '20px', color: th.textFaint, fontSize: '13px' }}>Loading…</div>
            : topPerformers.map((p, i) => (
              <div key={p.id} className="so-row-hover" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderBottom: i < topPerformers.length - 1 ? `1px solid ${th.border}` : 'none' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: p.color || memberColors[i] || '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#fff' }}>{p.initials}</div>
                  <div style={{ position: 'absolute', top: '-4px', left: '-4px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#f59e0b', color: '#fff', fontSize: '9px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: th.text }}>{p.name}</div>
                  <div style={{ fontSize: '11px', color: th.textSubtle }}>{p.deals} deals closed</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: th.text }}>{fmt(p.revenue)}</div>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: th.statUp }}>{p.growth}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
