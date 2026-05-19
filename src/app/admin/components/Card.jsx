"use client"
import React from 'react';
import { color, radius, shadow, font } from './theme';

export default function Card({ children, padding = 24, style, hoverable, ...rest }) {
  return (
    <div
      style={{
        background: color.surface,
        border: `1px solid ${color.border}`,
        borderRadius: radius.lg,
        boxShadow: shadow.xs,
        overflow: 'hidden',
        transition: hoverable ? 'box-shadow .2s, border-color .2s' : undefined,
        ...style,
      }}
      onMouseOver={hoverable ? e => { e.currentTarget.style.boxShadow = shadow.md; e.currentTarget.style.borderColor = color.borderStrong; } : undefined}
      onMouseOut={hoverable ? e => { e.currentTarget.style.boxShadow = shadow.xs; e.currentTarget.style.borderColor = color.border; } : undefined}
      {...rest}
    >
      {typeof padding === 'number'
        ? <div style={{ padding }}>{children}</div>
        : children}
    </div>
  );
}

export function CardHeader({ title, subtitle, actions, style }) {
  return (
    <div style={{
      padding: '16px 20px', borderBottom: `1px solid ${color.divider}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, flexWrap: 'wrap', ...style,
    }}>
      <div>
        {title && <h3 style={{ margin: 0, fontSize: font.size.base, fontWeight: font.weight.bold, color: color.text, letterSpacing: '-0.01em' }}>{title}</h3>}
        {subtitle && <p style={{ margin: '4px 0 0', fontSize: font.size.md, color: color.textSubtle }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{actions}</div>}
    </div>
  );
}

export function CardBody({ children, padding = 20, style }) {
  return <div style={{ padding, ...style }}>{children}</div>;
}

export function CardFooter({ children, style, align = 'right' }) {
  return (
    <div style={{
      padding: '14px 20px',
      borderTop: `1px solid ${color.divider}`,
      background: color.surfaceAlt,
      display: 'flex',
      justifyContent: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'space-between',
      gap: 10, alignItems: 'center', ...style,
    }}>
      {children}
    </div>
  );
}
