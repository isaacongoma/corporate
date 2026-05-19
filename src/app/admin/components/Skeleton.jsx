import React from 'react';
import { color, radius, shadow } from './theme';

export default function Skeleton({ width = '100%', height = '14px', borderRadius = radius.sm, marginBottom = 8, style }) {
  return (
    <div style={{
      width, height, borderRadius, marginBottom,
      background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
      backgroundSize: '200% 100%',
      animation: 'admin-shimmer 1.4s infinite',
      ...style,
    }}>
      <style>{`
        @keyframes admin-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div style={{
      width: '100%', background: color.surface,
      border: `1px solid ${color.border}`, borderRadius: radius.lg,
      boxShadow: shadow.xs, padding: 18,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <Skeleton width={180} height={20} marginBottom={0} />
        <Skeleton width={220} height={32} marginBottom={0} />
      </div>
      {[0, 1, 2, 3, 4].map(i => <Skeleton key={i} height={44} marginBottom={10} />)}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div style={{
      width: '100%', background: color.surface,
      border: `1px solid ${color.border}`, borderRadius: radius.lg,
      boxShadow: shadow.xs, padding: 24,
    }}>
      <Skeleton height={22} width="32%" marginBottom={20} />
      <Skeleton height={36} marginBottom={14} />
      <Skeleton height={36} marginBottom={14} />
      <Skeleton height={36} marginBottom={0} />
    </div>
  );
}
