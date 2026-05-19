"use client"
import React, { useMemo, useState } from 'react';
import { color, font, radius, shadow } from './theme';
import { Input, Select } from './Form';

/**
 * <DataTable
 *    columns={[{ header, accessor, render, align, width }]}
 *    data={rows}
 *    loading
 *    rowKey="id"
 *    searchable
 *    searchPlaceholder
 *    filters={<>...</>}
 *    pagination={{ pageSize: 10 }}
 *    empty={{ title, description, action }}
 *    onRowClick={row => ...}
 *    rowActions={row => <...>}
 * />
 */
export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  rowKey = 'id',
  searchable = true,
  searchPlaceholder = 'Search…',
  filters,
  pagination,
  empty,
  onRowClick,
  rowActions,
  toolbar,
  selectable = false,
  onSelectionChange,
  stickyHeader = false,
}) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const pageSize = pagination?.pageSize ?? 10;

  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter(row =>
      columns.some(c => {
        if (c.searchable === false) return false;
        const val = c.accessor ? row[c.accessor] : '';
        return val != null && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, columns, query]);

  const totalPages = pagination ? Math.max(1, Math.ceil(filtered.length / pageSize)) : 1;
  const currentPage = Math.min(page, totalPages);
  const visible = pagination ? filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize) : filtered;
  const start = filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(filtered.length, currentPage * pageSize);

  const toggleRow = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
    onSelectionChange?.(Array.from(next));
  };
  const toggleAll = () => {
    const ids = visible.map(r => r[rowKey]);
    const allSelected = ids.every(id => selected.has(id));
    const next = new Set(selected);
    ids.forEach(id => allSelected ? next.delete(id) : next.add(id));
    setSelected(next);
    onSelectionChange?.(Array.from(next));
  };
  const allVisibleSelected = visible.length > 0 && visible.every(r => selected.has(r[rowKey]));

  const showToolbar = searchable || filters || toolbar;

  return (
    <div style={{
      background: color.surface,
      border: `1px solid ${color.border}`,
      borderRadius: radius.lg,
      boxShadow: shadow.xs,
      overflow: 'hidden',
      fontFamily: font.family,
    }}>
      {showToolbar && (
        <div style={{
          padding: '14px 18px', borderBottom: `1px solid ${color.divider}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 12, flexWrap: 'wrap', background: color.surface,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {selectable && selected.size > 0 ? (
              <span style={{ fontSize: font.size.md, color: color.textMuted, fontWeight: font.weight.semibold }}>
                {selected.size} selected
              </span>
            ) : filters}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {toolbar}
            {searchable && (
              <div style={{ width: 260 }}>
                <Input
                  placeholder={searchPlaceholder}
                  value={query}
                  onChange={e => { setQuery(e.target.value); setPage(1); }}
                  icon={<SearchIcon />}
                  style={{ padding: '8px 12px 8px 36px', height: 36 }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
          <thead>
            <tr style={{ background: color.surfaceAlt, borderBottom: `1px solid ${color.border}`, ...(stickyHeader ? { position: 'sticky', top: 0 } : {}) }}>
              {selectable && (
                <th style={thStyle(48)}>
                  <input type="checkbox" checked={allVisibleSelected} onChange={toggleAll}
                    style={{ accentColor: color.brand500, cursor: 'pointer', width: 16, height: 16 }} />
                </th>
              )}
              {columns.map((c, i) => (
                <th key={i} style={{
                  ...thStyle(c.width),
                  textAlign: c.align || 'left',
                }}>{c.header}</th>
              ))}
              {rowActions && <th style={{ ...thStyle(56), textAlign: 'right' }}>{''}</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [0, 1, 2, 3, 4].map(i => (
                <tr key={i} style={{ borderBottom: `1px solid ${color.divider}` }}>
                  {selectable && <td style={tdStyle}><SkeletonCell width={16} /></td>}
                  {columns.map((c, j) => <td key={j} style={tdStyle}><SkeletonCell /></td>)}
                  {rowActions && <td style={tdStyle}><SkeletonCell width={24} /></td>}
                </tr>
              ))
            ) : visible.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)} style={{ padding: 0 }}>
                  <EmptyState {...(empty || {})} hasQuery={!!query} />
                </td>
              </tr>
            ) : (
              visible.map((row, rIdx) => {
                const id = row[rowKey] ?? rIdx;
                const isSelected = selected.has(id);
                return (
                  <tr
                    key={id}
                    onClick={() => onRowClick?.(row)}
                    style={{
                      borderBottom: `1px solid ${color.divider}`,
                      background: isSelected ? color.brand50 : color.surface,
                      cursor: onRowClick ? 'pointer' : 'default',
                      transition: 'background-color .12s',
                    }}
                    onMouseOver={e => e.currentTarget.style.background = isSelected ? color.brand50 : color.surfaceAlt}
                    onMouseOut={e => e.currentTarget.style.background = isSelected ? color.brand50 : color.surface}
                  >
                    {selectable && (
                      <td style={tdStyle} onClick={e => e.stopPropagation()}>
                        <input type="checkbox" checked={isSelected} onChange={() => toggleRow(id)}
                          style={{ accentColor: color.brand500, cursor: 'pointer', width: 16, height: 16 }} />
                      </td>
                    )}
                    {columns.map((c, cIdx) => (
                      <td key={cIdx} style={{ ...tdStyle, textAlign: c.align || 'left' }}>
                        {c.render ? c.render(row) : (row[c.accessor] ?? '—')}
                      </td>
                    ))}
                    {rowActions && (
                      <td style={{ ...tdStyle, textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'inline-flex', gap: 6, justifyContent: 'flex-end' }}>
                          {rowActions(row)}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && !loading && filtered.length > 0 && (
        <Pagination
          start={start} end={end} total={filtered.length}
          page={currentPage} totalPages={totalPages}
          onChange={setPage}
        />
      )}
    </div>
  );
}

function thStyle(width) {
  return {
    padding: '8px 16px',
    fontSize: font.size.sm, fontWeight: font.weight.semibold,
    color: color.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em',
    whiteSpace: 'nowrap', ...(width ? { width } : {}),
  };
}

const tdStyle = {
  padding: '8px 16px',
  fontSize: font.size.base, color: color.textMuted,
  verticalAlign: 'middle',
};

function Pagination({ start, end, total, page, totalPages, onChange }) {
  return (
    <div style={{
      padding: '12px 18px', borderTop: `1px solid ${color.divider}`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: color.surface, fontSize: font.size.md, color: color.textSubtle,
      gap: 12, flexWrap: 'wrap',
    }}>
      <span>
        Showing <strong style={{ color: color.text }}>{start}–{end}</strong> of <strong style={{ color: color.text }}>{total}</strong>
      </span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <PageBtn disabled={page <= 1} onClick={() => onChange(page - 1)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" /></svg>
          Prev
        </PageBtn>
        <span style={{ padding: '0 10px', fontSize: font.size.md, fontWeight: font.weight.semibold, color: color.text }}>
          {page} / {totalPages}
        </span>
        <PageBtn disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" /></svg>
        </PageBtn>
      </div>
    </div>
  );
}

function PageBtn({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '6px 10px', height: 30,
      background: color.surface, color: disabled ? color.textFaint : color.textMuted,
      border: `1px solid ${color.border}`, borderRadius: radius.md,
      fontSize: font.size.md, fontWeight: font.weight.semibold,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'background-color .15s, border-color .15s',
    }}
      onMouseOver={e => { if (!disabled) { e.currentTarget.style.background = color.surfaceAlt; e.currentTarget.style.borderColor = color.borderStrong; } }}
      onMouseOut={e => { e.currentTarget.style.background = color.surface; e.currentTarget.style.borderColor = color.border; }}
    >{children}</button>
  );
}

function EmptyState({ title = 'Nothing to show here', description, action, icon, hasQuery }) {
  return (
    <div style={{
      padding: '56px 24px', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 8,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: radius.lg, background: color.brand50,
        color: color.brand600, display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 8,
      }}>
        {icon || <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /></svg>}
      </div>
      <div style={{ fontSize: font.size.lg, fontWeight: font.weight.bold, color: color.text }}>
        {hasQuery ? 'No results found' : title}
      </div>
      <div style={{ fontSize: font.size.md, color: color.textSubtle, maxWidth: 360 }}>
        {hasQuery ? 'Try adjusting your search terms.' : description}
      </div>
      {action && !hasQuery && <div style={{ marginTop: 10 }}>{action}</div>}
    </div>
  );
}

function SkeletonCell({ width = '80%' }) {
  return <div style={{
    height: 14, width, borderRadius: radius.sm,
    background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
    backgroundSize: '200% 100%', animation: 'admin-shimmer 1.4s infinite',
  }}>
    <style>{`@keyframes admin-shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`}</style>
  </div>;
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
    </svg>
  );
}
