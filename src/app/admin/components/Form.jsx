"use client"
import React from 'react';
import { color, radius, shadow, font } from './theme';
import { useTheme, themes } from '../context/ThemeContext';

function getBaseField(th) {
  return {
    width: '100%',
    padding: '9px 12px',
    fontSize: font.size.base,
    fontFamily: font.family,
    color: th.inputText,
    background: th.inputBg,
    border: `1px solid ${th.inputBorder}`,
    borderRadius: radius.md,
    outline: 'none',
    boxSizing: 'border-box',
    lineHeight: 1.4,
    transition: 'border-color .15s, box-shadow .15s, background-color .15s',
  };
}

function focusHandlers(th, error) {
  return {
    onFocus: e => {
      e.target.style.borderColor = error ? color.danger : color.brand500;
      e.target.style.boxShadow = error ? '0 0 0 3px rgba(220,38,38,0.15)' : shadow.focus;
    },
    onBlur: e => {
      e.target.style.borderColor = error ? color.danger : th.inputBorder;
      e.target.style.boxShadow = 'none';
    },
  };
}

export function Label({ children, htmlFor, required, hint, style }) {
  const { theme } = useTheme();
  const th = themes[theme];
  return (
    <label htmlFor={htmlFor} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: 6, fontSize: font.size.md, fontWeight: font.weight.semibold, color: th.text, ...style,
    }}>
      <span>
        {children}
        {required && <span style={{ color: color.danger, marginLeft: 3 }}>*</span>}
      </span>
      {hint && <span style={{ fontSize: font.size.sm, color: th.textSubtle, fontWeight: font.weight.regular }}>{hint}</span>}
    </label>
  );
}

export function HelpText({ children, error }) {
  const { theme } = useTheme();
  const th = themes[theme];
  if (!children) return null;
  return (
    <p style={{
      margin: '6px 0 0', fontSize: font.size.sm,
      color: error ? color.danger : th.textSubtle,
    }}>{children}</p>
  );
}

export function FormField({ label, required, hint, help, error, children, id }) {
  return (
    <div style={{ width: '100%' }}>
      {label && <Label htmlFor={id} required={required} hint={hint}>{label}</Label>}
      {children}
      <HelpText error={!!error}>{error || help}</HelpText>
    </div>
  );
}

export function Input({ error, icon, style, ...props }) {
  const { theme } = useTheme();
  const th = themes[theme];
  const baseField = getBaseField(th);
  if (icon) {
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: th.textFaint, display: 'inline-flex' }}>{icon}</span>
        <input
          {...props}
          style={{
            ...baseField,
            paddingLeft: 36,
            borderColor: error ? color.danger : th.inputBorder,
            ...style,
          }}
          {...focusHandlers(th, error)}
        />
      </div>
    );
  }
  return (
    <input
      {...props}
      style={{ ...baseField, borderColor: error ? color.danger : th.inputBorder, ...style }}
      {...focusHandlers(th, error)}
    />
  );
}

export function Textarea({ error, style, rows = 4, ...props }) {
  const { theme } = useTheme();
  const th = themes[theme];
  const baseField = getBaseField(th);
  return (
    <textarea
      rows={rows}
      {...props}
      style={{ ...baseField, resize: 'vertical', minHeight: 90, borderColor: error ? color.danger : th.inputBorder, ...style }}
      {...focusHandlers(th, error)}
    />
  );
}

export function Select({ error, children, style, ...props }) {
  const { theme } = useTheme();
  const th = themes[theme];
  const baseField = getBaseField(th);
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <select
        {...props}
        style={{
          ...baseField,
          appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none',
          paddingRight: 36, cursor: 'pointer',
          borderColor: error ? color.danger : th.inputBorder, ...style,
        }}
        {...focusHandlers(th, error)}
      >
        {children}
      </select>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={th.textSubtle} strokeWidth="2"
        style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

export function Toggle({ checked, onChange, label, description, disabled, id }) {
  const { theme } = useTheme();
  const th = themes[theme];
  return (
    <label htmlFor={id} style={{
      display: 'flex', alignItems: 'flex-start', gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1,
    }}>
      <span style={{
        position: 'relative', width: 40, height: 22, flexShrink: 0,
        background: checked ? color.brand500 : th.inputBorder,
        borderRadius: radius.pill, transition: 'background-color .2s',
        display: 'inline-block',
      }}>
        <input
          id={id} type="checkbox" checked={checked} onChange={onChange} disabled={disabled}
          style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'inherit' }}
        />
        <span style={{
          position: 'absolute', top: 2, left: checked ? 20 : 2, width: 18, height: 18,
          background: '#fff', borderRadius: '50%', transition: 'left .2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        }} />
      </span>
      {(label || description) && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {label && <span style={{ fontSize: font.size.base, fontWeight: font.weight.semibold, color: th.text }}>{label}</span>}
          {description && <span style={{ fontSize: font.size.md, color: th.textSubtle, lineHeight: 1.4 }}>{description}</span>}
        </span>
      )}
    </label>
  );
}

export function FormSection({ title, description, children, style }) {
  const { theme } = useTheme();
  const th = themes[theme];
  return (
    <section style={{
      padding: '24px 28px', borderBottom: `1px solid ${th.border}`, ...style,
    }}>
      {(title || description) && (
        <header style={{ marginBottom: 20, display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32, alignItems: 'start' }}>
          <div>
            {title && <h3 style={{ margin: 0, fontSize: font.size.lg, fontWeight: font.weight.bold, color: th.text, letterSpacing: '-0.01em' }}>{title}</h3>}
            {description && <p style={{ margin: '6px 0 0', fontSize: font.size.md, color: th.textSubtle, lineHeight: 1.5 }}>{description}</p>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>{children}</div>
        </header>
      )}
      {!title && !description && <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>{children}</div>}
    </section>
  );
}

export function FormRow({ children, columns = 2, style }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gap: 18, ...style,
    }}>
      {children}
    </div>
  );
}
