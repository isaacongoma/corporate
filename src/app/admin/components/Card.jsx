"use client"
import React from 'react';
import { radius, shadow, font } from './theme';
import { useTheme, themes } from '../context/ThemeContext';

export default function Card({ children, padding = 24, style, hoverable, ...rest }) {
  const { theme } = useTheme();
  const th = themes[theme];
  return (
    <div
      style={{
        background: th.surface,
        border: `1px solid ${th.border}`,
        borderRadius: radius.lg,
        boxShadow: shadow.xs,
        overflow: 'hidden',
        transition: hoverable ? 'box-shadow .2s, border-color .2s' : undefined,
        ...style,
      }}
      onMouseOver={hoverable ? e => { e.currentTarget.style.boxShadow = shadow.md; e.currentTarget.style.borderColor = th.borderStrong; } : undefined}
      onMouseOut={hoverable ? e => { e.currentTarget.style.boxShadow = shadow.xs; e.currentTarget.style.borderColor = th.border; } : undefined}
      {...rest}
    >
      {typeof padding === 'number'
        ? <div style={{ padding }}>{children}</div>
        : children}
    </div>
  );
}

export function CardHeader({ title, subtitle, actions, style }) {
  const { theme } = useTheme();
  const th = themes[theme];
  return (
    <div style={{
      padding: '16px 20px', borderBottom: `1px solid ${th.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, flexWrap: 'wrap', ...style,
    }}>
      <div>
        {title && <h3 style={{ margin: 0, fontSize: font.size.base, fontWeight: font.weight.bold, color: th.text, letterSpacing: '-0.01em' }}>{title}</h3>}
        {subtitle && <p style={{ margin: '4px 0 0', fontSize: font.size.md, color: th.textSubtle }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{actions}</div>}
    </div>
  );
}

export function CardBody({ children, padding = 20, style }) {
  return <div style={{ padding, ...style }}>{children}</div>;
}

export function CardFooter({ children, style, align = 'right' }) {
  const { theme } = useTheme();
  const th = themes[theme];
  return (
    <div style={{
      padding: '14px 20px',
      borderTop: `1px solid ${th.border}`,
      background: th.surfaceHover,
      display: 'flex',
      justifyContent: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'space-between',
      gap: 10, alignItems: 'center', ...style,
    }}>
      {children}
    </div>
  );
}
