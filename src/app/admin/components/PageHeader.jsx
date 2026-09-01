"use client"
import React from 'react';
import Link from 'next/link';
import { font } from './theme';
import { useTheme, themes } from '../context/ThemeContext';

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  actionButton,
  icon,
  filters,
  meta,
}) {
  const { theme } = useTheme();
  const th = themes[theme];
  const trailingActions = actions ?? actionButton;

  return (
    <div style={{ marginBottom: 24, fontFamily: font.family }}>
      {breadcrumbs?.length > 0 && (
        <nav aria-label="Breadcrumb" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          marginBottom: 10, fontSize: font.size.md, color: th.textSubtle,
        }}>
          {breadcrumbs.map((c, i) => {
            const last = i === breadcrumbs.length - 1;
            const node = c.href && !last
              ? <Link href={c.href} style={{ color: th.textMuted, textDecoration: 'none', fontWeight: font.weight.medium }}>{c.label}</Link>
              : <span style={{ color: last ? th.text : th.textSubtle, fontWeight: last ? font.weight.semibold : font.weight.medium }}>{c.label}</span>;
            return (
              <React.Fragment key={i}>
                {node}
                {!last && <ChevronRight th={th} />}
              </React.Fragment>
            );
          })}
        </nav>
      )}

      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: 16, flexWrap: 'wrap',
      }}>
        <div style={{ minWidth: 0, flex: '1 1 auto' }}>
          <h1 style={{
            margin: 0, fontSize: font.size['3xl'], fontWeight: font.weight.bold,
            color: th.text, letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>{title}</h1>
          {subtitle && (
            <p style={{
              margin: '6px 0 0', color: th.textSubtle, fontSize: font.size.base,
              fontWeight: font.weight.regular, lineHeight: 1.5, maxWidth: 640,
            }}>{subtitle}</p>
          )}
          {meta && (
            <div style={{ marginTop: 10, display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: font.size.md, color: th.textSubtle }}>
              {meta}
            </div>
          )}
        </div>

        {trailingActions && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            {trailingActions}
          </div>
        )}
      </div>

      {filters && (
        <div style={{ marginTop: 18 }}>{filters}</div>
      )}
    </div>
  );
}

function ChevronRight({ th }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={th.textFaint} strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
    </svg>
  );
}
