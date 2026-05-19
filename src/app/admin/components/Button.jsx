"use client"
import React from 'react';
import { color, radius, shadow, font } from './theme';

/**
 * <Button variant="primary" size="md" loading icon={...}>Label</Button>
 * variants: primary | secondary | outline | ghost | danger
 * sizes: sm | md | lg
 */
const VARIANTS = {
  primary: {
    background: color.brand600, color: '#fff', border: `1px solid ${color.brand600}`,
    hoverBg: color.brand700, hoverBorder: color.brand700,
    boxShadow: '0 1px 2px rgba(16,185,129,0.3)',
  },
  secondary: {
    background: color.surface, color: color.text, border: `1px solid ${color.border}`,
    hoverBg: color.surfaceAlt, hoverBorder: color.borderStrong,
    boxShadow: shadow.xs,
  },
  outline: {
    background: 'transparent', color: color.brand700, border: `1px solid ${color.brand200}`,
    hoverBg: color.brand50, hoverBorder: color.brand500,
    boxShadow: 'none',
  },
  ghost: {
    background: 'transparent', color: color.textMuted, border: '1px solid transparent',
    hoverBg: color.divider, hoverBorder: 'transparent',
    boxShadow: 'none',
  },
  danger: {
    background: color.danger, color: '#fff', border: `1px solid ${color.danger}`,
    hoverBg: '#b91c1c', hoverBorder: '#b91c1c',
    boxShadow: '0 1px 2px rgba(220,38,38,0.3)',
  },
};

const SIZES = {
  sm: { padding: '6px 12px', fontSize: font.size.sm, height: '30px', iconSize: 14 },
  md: { padding: '8px 14px', fontSize: font.size.md, height: '36px', iconSize: 16 },
  lg: { padding: '10px 18px', fontSize: font.size.base, height: '42px', iconSize: 18 },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconRight,
  children,
  type = 'button',
  onClick,
  style,
  fullWidth,
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: '8px', padding: s.padding, height: s.height,
        fontSize: s.fontSize, fontWeight: font.weight.semibold, fontFamily: font.family,
        background: v.background, color: v.color, border: v.border,
        borderRadius: radius.md, boxShadow: v.boxShadow,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.6 : 1,
        transition: 'background-color .15s, border-color .15s, box-shadow .15s, transform .05s',
        whiteSpace: 'nowrap', width: fullWidth ? '100%' : 'auto',
        letterSpacing: '-0.01em', lineHeight: 1,
        ...style,
      }}
      onMouseOver={e => { if (!isDisabled) { e.currentTarget.style.background = v.hoverBg; e.currentTarget.style.borderColor = v.hoverBorder; } }}
      onMouseOut={e => { if (!isDisabled) { e.currentTarget.style.background = v.background; e.currentTarget.style.borderColor = v.border.split(' ').pop(); } }}
      onMouseDown={e => { if (!isDisabled) e.currentTarget.style.transform = 'translateY(1px)'; }}
      onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
      {...rest}
    >
      {loading && <Spinner size={s.iconSize} color={v.color} />}
      {!loading && icon && <span style={{ display: 'inline-flex', width: s.iconSize, height: s.iconSize }}>{icon}</span>}
      {children}
      {!loading && iconRight && <span style={{ display: 'inline-flex', width: s.iconSize, height: s.iconSize }}>{iconRight}</span>}
    </button>
  );
}

export function IconButton({ children, label, variant = 'secondary', size = 'md', onClick, style, ...rest }) {
  const v = VARIANTS[variant] || VARIANTS.secondary;
  const dim = size === 'sm' ? 30 : size === 'lg' ? 42 : 36;
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      style={{
        width: dim, height: dim, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: v.background, color: v.color, border: v.border, borderRadius: radius.md,
        cursor: 'pointer', boxShadow: v.boxShadow, transition: 'all .15s',
        ...style,
      }}
      onMouseOver={e => { e.currentTarget.style.background = v.hoverBg; e.currentTarget.style.borderColor = v.hoverBorder; }}
      onMouseOut={e => { e.currentTarget.style.background = v.background; e.currentTarget.style.borderColor = v.border.split(' ').pop(); }}
      {...rest}
    >
      {children}
    </button>
  );
}

function Spinner({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ animation: 'admin-spin .8s linear infinite' }}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 00-9-9" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <style>{`@keyframes admin-spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}
