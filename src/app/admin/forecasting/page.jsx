"use client"
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { useTheme, themes } from '../context/ThemeContext';

const quarterlyForecast = [
  { quarter: 'Q1 2024', actual: 495000, forecast: 480000, target: 450000 },
  { quarter: 'Q2 2024', actual: 730000, forecast: 720000, target: 680000 },
  { quarter: 'Q3 2024', actual: 1075000, forecast: 1050000, target: 1000000 },
  { quarter: 'Q4 2024', actual: null, forecast: 1380000, target: 1250000 },
];

const monthlyForecast = [
  { month: 'Jan', actual: 150000, forecast: 155000 },
  { month: 'Feb', actual: 180000, forecast: 175000 },
  { month: 'Mar', actual: 165000, forecast: 170000 },
  { month: 'Apr', actual: 200000, forecast: 195000 },
  { month: 'May', actual: 240000, forecast: 235000 },
  { month: 'Jun', actual: 290000, forecast: 280000 },
  { month: 'Jul', actual: 330000, forecast: 320000 },
  { month: 'Aug', actual: 355000, forecast: 360000 },
  { month: 'Sep', actual: 390000, forecast: 395000 },
  { month: 'Oct', actual: null, forecast: 420000 },
  { month: 'Nov', actual: null, forecast: 460000 },
  { month: 'Dec', actual: null, forecast: 510000 },
];

const fmt = (n) => {
  if (!n && n !== 0) return '—';
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  return `$${(n / 1000).toFixed(0)}K`;
};

const CustomTooltip = ({ active, payload, label, th }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ backgroundColor: th.chartTooltipBg, border: `1px solid ${th.chartTooltipBorder}`, borderRadius: '8px', padding: '10px 14px', fontSize: '12px' }}>
      <div style={{ fontWeight: '600', color: th.text, marginBottom: '6px' }}>{label}</div>
      {payload.map(p => p.value != null && (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: p.color, display: 'inline-block' }} />
          <span style={{ color: th.textMuted }}>{p.name === 'actual' ? 'Actual' : p.name === 'forecast' ? 'Forecast' : 'Target'}:</span>
          <span style={{ fontWeight: '600', color: th.text }}>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function ForecastingPage() {
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

  const pendingDeals = deals.filter(d => d.status === 'Pending');
  const pendingValue = pendingDeals.reduce((s, d) => s + d.value, 0);
  const wonDeals = deals.filter(d => d.status === 'Won');
  const wonValue = wonDeals.reduce((s, d) => s + d.value, 0);
  const avgDealSize = deals.length ? deals.reduce((s, d) => s + d.value, 0) / deals.length : 0;
  const winRate = deals.length ? (wonDeals.length / deals.length * 100).toFixed(1) : 0;
  const forecastedRevenue = pendingValue * (Number(winRate) / 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Forecasted Revenue', value: loading ? '—' : fmt(wonValue + forecastedRevenue), note: 'Won + weighted pipeline', color: '#10b981' },
          { label: 'Pipeline Value', value: loading ? '—' : fmt(pendingValue), note: `${pendingDeals.length} open deals` },
          { label: 'Avg Deal Size', value: loading ? '—' : fmt(avgDealSize), note: `Across ${deals.length} deals` },
          { label: 'Win Rate', value: loading ? '—' : `${winRate}%`, note: `${wonDeals.length} / ${deals.length} deals` },
        ].map(s => (
          <div key={s.label} style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: th.textSubtle, marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: s.color || th.text, marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: th.textFaint }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* Monthly forecast chart */}
      <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: th.text }}>Revenue Forecast</div>
            <div style={{ fontSize: '12px', color: th.textSubtle }}>Actual vs forecasted monthly revenue</div>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: th.textSubtle }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4', display: 'inline-block' }} />Actual</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6', display: 'inline-block' }} />Forecast</span>
          </div>
        </div>
        <div style={{ height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyForecast} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gAct" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={th.chartGrid} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: th.chartText }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: th.chartText }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip content={<CustomTooltip th={th} />} />
              <Area type="monotone" dataKey="actual" stroke="#06b6d4" strokeWidth={2.5} fill="url(#gAct)" dot={false} connectNulls={false} />
              <Area type="monotone" dataKey="forecast" stroke="#8b5cf6" strokeWidth={2} fill="url(#gForecast)" dot={false} strokeDasharray="6 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quarterly breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Bar chart */}
        <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: '700', color: th.text, marginBottom: '4px' }}>Quarterly Performance</div>
          <div style={{ fontSize: '12px', color: th.textSubtle, marginBottom: '16px' }}>Actual vs target by quarter</div>
          <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyForecast} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={th.chartGrid} vertical={false} />
                <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: th.chartText }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: th.chartText }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip content={<CustomTooltip th={th} />} />
                <Bar dataKey="target" fill={`${th.border}`} radius={[4, 4, 0, 0]} />
                <Bar dataKey="forecast" fill="#8b5cf6" radius={[4, 4, 0, 0]} opacity={0.8} />
                <Bar dataKey="actual" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quarterly table */}
        <div style={{ backgroundColor: th.surface, border: `1px solid ${th.border}`, borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${th.border}` }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: th.text }}>Quarterly Targets</div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: th.bg }}>
                {['Quarter', 'Target', 'Forecast', 'Actual', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: th.textSubtle, textAlign: 'left', borderBottom: `1px solid ${th.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quarterlyForecast.map(q => {
                const pct = q.actual ? ((q.actual / q.target) * 100).toFixed(0) : null;
                return (
                  <tr key={q.quarter} className="so-row-hover" style={{ borderBottom: `1px solid ${th.border}` }}>
                    <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: '600', color: th.text }}>{q.quarter}</td>
                    <td style={{ padding: '12px 14px', fontSize: '13px', color: th.textMuted }}>{fmt(q.target)}</td>
                    <td style={{ padding: '12px 14px', fontSize: '13px', color: '#8b5cf6', fontWeight: '600' }}>{fmt(q.forecast)}</td>
                    <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: '700', color: th.text }}>{fmt(q.actual)}</td>
                    <td style={{ padding: '12px 14px' }}>
                      {pct
                        ? <span style={{ fontSize: '11px', fontWeight: '700', color: Number(pct) >= 100 ? '#10b981' : '#f59e0b', backgroundColor: Number(pct) >= 100 ? th.wonBg : th.pendingBg, padding: '2px 8px', borderRadius: '20px' }}>{pct}%</span>
                        : <span style={{ fontSize: '11px', color: th.textFaint }}>Projected</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
