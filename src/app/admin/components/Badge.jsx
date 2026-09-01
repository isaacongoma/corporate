"use client"
import React from 'react';
import { color, radius, font } from './theme';
import { useTheme, themes } from '../context/ThemeContext';

export default function Badge({ children, variant = 'default', dot = false, style }) {
  const { theme } = useTheme();
  const th = themes[theme];

  const VARIANTS = {
    default: { bg: th.surfaceHover, fg: th.textMuted, border: th.border },
    success: { bg: color.successBg, fg: '#15803d', border: '#bbf7d0' },
    warning: { bg: color.warningBg, fg: '#b45309', border: '#fde68a' },
    danger:  { bg: color.dangerBg,  fg: '#b91c1c', border: '#fecaca' },
    info:    { bg: color.infoBg,    fg: '#1d4ed8', border: '#bfdbfe' },
    brand:   { bg: color.brand50,   fg: color.brand700, border: color.brand200 },
  };

  const v = VARIANTS[variant] || VARIANTS.default;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 10px',
      background: v.bg, color: v.fg, border: `1px solid ${v.border}`,
      fontSize: font.size.xs, fontWeight: font.weight.semibold,
      borderRadius: radius.pill, lineHeight: '16px', letterSpacing: '.01em',
      whiteSpace: 'nowrap', ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, background: v.fg, borderRadius: '50%', flexShrink: 0 }} />}
      {children}
    </span>
  );
}
