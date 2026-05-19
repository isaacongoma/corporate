"use client"
import React from 'react';
import { color, radius, shadow, font } from './theme';

const VARIANTS = {
  success: { bg: color.successBg, fg: '#166534', border: '#bbf7d0', icon: '✓' },
  danger:  { bg: color.dangerBg,  fg: '#b91c1c', border: '#fecaca', icon: '!' },
  warning: { bg: color.warningBg, fg: '#b45309', border: '#fde68a', icon: '!' },
  info:    { bg: color.infoBg,    fg: '#1d4ed8', border: '#bfdbfe', icon: 'i' },
};

export default function Toast({ variant = 'info', children, onClose, style }) {
  const v = VARIANTS[variant] || VARIANTS.info;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 14px', borderRadius: radius.md,
      background: v.bg, color: v.fg, border: `1px solid ${v.border}`,
      fontSize: font.size.md, fontWeight: font.weight.semibold,
      boxShadow: shadow.sm, ...style,
    }}>
      <span style={{
        width: 20, height: 20, borderRadius: '50%',
        background: v.fg, color: v.bg, display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: font.weight.bold, flexShrink: 0,
      }}>{v.icon}</span>
      <span style={{ flex: 1 }}>{children}</span>
      {onClose && (
        <button onClick={onClose} aria-label="Dismiss" style={{
          background: 'transparent', border: 'none', color: v.fg, cursor: 'pointer',
          opacity: 0.6, padding: 0, display: 'inline-flex',
        }} onMouseOver={e => e.currentTarget.style.opacity = '1'} onMouseOut={e => e.currentTarget.style.opacity = '0.6'}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
}
