"use client"
import React from 'react';
import Link from 'next/link';
import { color, font } from './theme';

const TONES = {
  default: { accent: color.textMuted, bg: color.surfaceAlt, border: color.border },
  brand:   { accent: color.brand600,  bg: color.brand50,    border: color.brand200 },
  info:    { accent: '#1d4ed8',       bg: color.infoBg,     border: '#bfdbfe' },
  success: { accent: '#15803d',       bg: color.successBg,  border: '#bbf7d0' },
};

export default function StatTile({ label, value, hint, tone = 'default', href, icon }) {
  const t = TONES[tone] || TONES.default;
  const content = (
    <div
      style={{
        background: color.surface, border: `1px solid ${color.border}`,
        borderRadius: 12, padding: 20, fontFamily: font.family,
        transition: 'box-shadow .15s, border-color .15s',
        display: 'flex', flexDirection: 'column', gap: 14,
        cursor: href ? 'pointer' : 'default',
      }}
      onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 18px -8px rgba(15,23,42,0.12)'; e.currentTarget.style.borderColor = color.borderStrong; }}
      onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = color.border; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: color.textSubtle, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
        <div style={{
          width: 34, height: 34, borderRadius: 8, background: t.bg,
          color: t.accent, border: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{icon}</div>
      </div>
      <div>
        <div style={{ fontSize: 30, fontWeight: 800, color: color.text, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 12, color: color.textSubtle, marginTop: 6 }}>{hint}</div>
      </div>
    </div>
  );
  return href
    ? <Link href={href} style={{ textDecoration: 'none' }}>{content}</Link>
    : content;
}
