"use client"
import React from 'react';
import { color, radius, font } from './theme';
import Button, { IconButton } from './Button';
import { FormField, Input } from './Form';

/**
 * Generic repeatable list editor.
 *
 * Props:
 *   label     – section label shown in card header
 *   items     – array of values (strings or objects)
 *   onChange  – (newItems) => void
 *   renderRow – (item, index, onChange) => ReactNode — custom row renderer
 *   emptyRow  – value pushed when "Add" is clicked (default: '')
 *   addLabel  – text for add button (default: 'Add item')
 */
export default function RepeatableList({
  label,
  items = [],
  onChange,
  renderRow,
  emptyRow = '',
  addLabel = 'Add item',
}) {
  const add = () => onChange([...items, typeof emptyRow === 'function' ? emptyRow() : emptyRow]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i, dir) => {
    const next = [...items];
    const to = i + dir;
    if (to < 0 || to >= next.length) return;
    [next[i], next[to]] = [next[to], next[i]];
    onChange(next);
  };
  const update = (i, val) => {
    const next = [...items];
    next[i] = val;
    onChange(next);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: font.family }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 8,
            background: color.surfaceAlt, border: `1px solid ${color.border}`,
            borderRadius: radius.md, padding: '10px 12px',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {renderRow
              ? renderRow(item, i, (val) => update(i, val))
              : (
                <Input
                  value={item}
                  onChange={(e) => update(i, e.target.value)}
                  placeholder={`${label} ${i + 1}`}
                />
              )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
            <IconButton
              label="Move up"
              size="sm"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              style={{ opacity: i === 0 ? 0.3 : 1 }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="m18 15-6-6-6 6" /></svg>
            </IconButton>
            <IconButton
              label="Move down"
              size="sm"
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1}
              style={{ opacity: i === items.length - 1 ? 0.3 : 1 }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" /></svg>
            </IconButton>
          </div>
          <IconButton
            label="Remove"
            size="sm"
            onClick={() => remove(i)}
            style={{ color: color.danger, flexShrink: 0 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
          </IconButton>
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={add}
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" /></svg>}
        style={{ alignSelf: 'flex-start' }}
      >
        {addLabel}
      </Button>
    </div>
  );
}
