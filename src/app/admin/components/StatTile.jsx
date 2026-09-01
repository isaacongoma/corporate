"use client"
import React from 'react';
import Link from 'next/link';
import { color, font } from './theme';
import { useTheme, themes } from '../context/ThemeContext';

export default function StatTile({ label, value, hint, tone = 'default', href, icon }) {
  const { theme } = useTheme();
  const th = themes[theme];

  const TONES = {
    default: { accent: th.textMuted, bg: th.surfaceHover, border: th.border },
    brand:   { accent: color.brand600,  bg: 'rgba(16,185,129,0.1)', border: color.brand200 },
    info:    { accent: '#3b82f6',       bg: 'rgba(59,130,246,0.1)', border: '#93c5fd' },
    success: { accent: '#15803d',       bg: 'rgba(22,163,74,0.1)',  border: '#86efac' },
  };

  const t = TONES[tone] || TONES.default;
  const content = (
    <div
      style={{
        background: th.surface, border: `1px solid ${th.border}`,
        borderRadius: 12, padding: 20, fontFamily: font.family,
        transition: 'box-shadow .15s, border-color .15s',
        display: 'flex', flexDirection: 'column', gap: 14,
        cursor: href ? 'pointer' : 'default',
      }}
      onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 18px -8px rgba(15,23,42,0.12)'; e.currentTarget.style.borderColor = th.borderStrong; }}
      onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = th.border; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: th.textSubtle, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
        <div style={{
          width: 34, height: 34, borderRadius: 8, background: t.bg,
          color: t.accent, border: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{icon}</div>
      </div>
      <div>
        <div style={{ fontSize: 30, fontWeight: 800, color: th.text, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 12, color: th.textSubtle, marginTop: 6 }}>{hint}</div>
      </div>
    </div>
  );
  return href
    ? <Link href={href} style={{ textDecoration: 'none' }}>{content}</Link>
    : content;
}
