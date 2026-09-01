"use client"
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useTheme, themes } from '../context/ThemeContext';

const conversionData = [
  { month: 'Jan', rate: 19.5 }, { month: 'Feb', rate: 21.3 }, { month: 'Mar', rate: 23.1 },
  { month: 'Apr', rate: 24.8 }, { month: 'May', rate: 27.2 }, { month: 'Jun', rate: 28.6 },
  { month: 'Jul', rate: 30.1 }, { month: 'Aug', rate: 31.4 }, { month: 'Sep', rate: 32.9 },
  { month: 'Oct', rate: 34.2 }, { month: 'Nov', rate: 36.8 }, { month: 'Dec', rate: 38.5 },
];

const leadSources = [
  { name: 'Direct', value: 35, color: '#06b6d4' },
  { name: 'Referral', value: 25, color: '#10b981' },
  { name: 'Organic', value: 20, color: '#f59e0b' },
  { name: 'Paid Ads', value: 15, color: '#ef4444' },
  { name: 'Social', value: 5, color: '#8b5cf6' },
];

const reportTypes = [
  { title: 'Sales Summary', desc: 'Monthly revenue and deal metrics', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>, color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
  { title: 'Conversion Rates', desc: 'Funnel performance analysis', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>, color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { title: 'Lead Sources', desc: 'Channel attribution breakdown', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  { title: 'Forecast', desc: 'Revenue predictions & targets', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18"/></svg>, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
];

const recentReports = [
  { name: 'Monthly Sales Summary', date: 'Dec 2024', size: '2.4 MB', type: 'PDF' },
  { name: 'Q4 Conversion Analysis', date: 'Oct–Dec 2024', size: '1.8 MB', type: 'PDF' },
  { name: 'Lead Source Attribution', date: 'Nov 2024', size: '956 KB', type: 'Excel' },
  { name: 'Annual Revenue Forecast', date: '2025 Projection', size: '3.1 MB', type: 'PDF' },
];

const CustomTooltip = ({ active, payload, label, th }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ backgroundColor: th.chartTooltipBg, border: `1px solid ${th.chartTooltipBorder}`, borderRadius: '8px', padding: '10px 14px', fontSize: '12px' }}>
      <div style={{ fontWeight: '600', color: th.text, marginBottom: '4px' }}>{label}</div>
      <div style={{ color: '#10b981', fontWeight: '700' }}>{payload[0]?.value}%</div>
    </div>
  );
};

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
  if (value < 8) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="700">{value}%</text>;
};

export default function ReportsPage() {
  const { theme } = useTheme();
  const th = themes[theme];
  const [stats, setStats] = useState({ won: 0, total: 0, totalRev: 0 });

  useEffect(() => {
    fetch('/api/sales/deals').then(r => r.json()).then(deals => {
      const won = deals.filter(d => d.status === 'Won').length;
      const totalRev = deals.filter(d => d.status === 'Won').reduce((s, d) => s + d.value, 0);
      setStats({ won, total: deals.length, totalRev });
    }).catch(() => {});
  }, []);

  const fmt = (n) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;
  const convRate = stats.total ? ((stats.won / stats.total) * 100).toFixed(1) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Report cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {reportTypes.map(r => (
          <div key={r.title} style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '20px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.color, marginBottom: '12px' }}>{r.icon}</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: th.text, marginBottom: '4px' }}>{r.title}</div>
            <div style={{ fontSize: '12px', color: th.textSubtle, marginBottom: '14px' }}>{r.desc}</div>
            <button style={{ fontSize: '12px', fontWeight: '600', color: th.accent, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              View Report
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '16px' }}>
        {/* Conversion Rate Trend */}
        <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: th.text }}>Conversion Rate Trend</div>
              <div style={{ fontSize: '12px', color: th.textSubtle }}>Monthly lead to deal conversion</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700', color: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', padding: '4px 10px', borderRadius: '20px' }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-9 9-4-4-6 6"/></svg>
              +{convRate}% YoY
            </div>
          </div>
          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={th.chartGrid} vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: th.chartText }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: th.chartText }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip content={<CustomTooltip th={th} />} />
                <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Sources */}
        <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: '700', color: th.text, marginBottom: '4px' }}>Lead Sources</div>
          <div style={{ fontSize: '12px', color: th.textSubtle, marginBottom: '10px' }}>Where your leads come from</div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ flexShrink: 0 }}>
              <PieChart width={160} height={160}>
                <Pie data={leadSources} cx={75} cy={75} innerRadius={50} outerRadius={75} dataKey="value" labelLine={false} label={renderLabel}>
                  {leadSources.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {leadSources.map(s => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: th.textMuted }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: s.color, display: 'inline-block', flexShrink: 0 }} />
                    {s.name}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: th.text }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${th.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: th.text }}>Recent Reports</div>
            <div style={{ fontSize: '12px', color: th.textSubtle }}>Your generated reports</div>
          </div>
          <button style={{ padding: '8px 14px', backgroundColor: th.bg, border: `1px solid ${th.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: th.textSubtle, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Generate New
          </button>
        </div>
        {recentReports.map((r, i) => (
          <div key={i} className="so-row-hover" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px', borderBottom: i < recentReports.length - 1 ? `1px solid ${th.border}` : 'none' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: r.type === 'PDF' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.type === 'PDF' ? '#ef4444' : '#10b981', flexShrink: 0 }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: th.text }}>{r.name}</div>
              <div style={{ fontSize: '11px', color: th.textSubtle }}>{r.date} · {r.size}</div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', backgroundColor: th.bg, border: `1px solid ${th.border}`, borderRadius: '7px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: th.textMuted, flexShrink: 0 }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
