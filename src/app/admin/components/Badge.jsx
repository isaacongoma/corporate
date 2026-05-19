import React from 'react';
import { color, radius, font } from './theme';

/**
 * <Badge variant="success">Active</Badge>
 * variants: default | success | warning | danger | info | brand
 * style: soft (default) | solid | outline
 */
const VARIANTS = {
  default: { soft: { bg: color.divider,   fg: color.textMuted, border: color.border } },
  success: { soft: { bg: color.successBg, fg: '#15803d',        border: '#bbf7d0' } },
  warning: { soft: { bg: color.warningBg, fg: '#b45309',        border: '#fde68a' } },
  danger:  { soft: { bg: color.dangerBg,  fg: '#b91c1c',        border: '#fecaca' } },
  info:    { soft: { bg: color.infoBg,    fg: '#1d4ed8',        border: '#bfdbfe' } },
  brand:   { soft: { bg: color.brand50,   fg: color.brand700,   border: color.brand200 } },
};

export default function Badge({ children, variant = 'default', dot = false, style }) {
  const v = (VARIANTS[variant] || VARIANTS.default).soft;
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
