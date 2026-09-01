"use client"
import React, { useEffect } from 'react';
import { font, radius } from './theme';
import { useTheme, themes } from '../context/ThemeContext';
import { IconButton } from './Button';

export default function Drawer({ open, onClose, title, subtitle, children, footer, width = 480 }) {
  const { theme } = useTheme();
  const th = themes[theme];

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)',
        backdropFilter: 'blur(2px)', zIndex: 200, animation: 'fadeIn .15s ease-out',
      }} />
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: width,
        background: th.surface, zIndex: 210, display: 'flex', flexDirection: 'column',
        boxShadow: '-20px 0 40px rgba(15,23,42,0.2)',
        animation: 'slideIn .2s ease-out', fontFamily: font.family,
      }}>
        <header style={{
          padding: '18px 24px', borderBottom: `1px solid ${th.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <div>
            {title && <h2 style={{ margin: 0, fontSize: font.size.lg, fontWeight: font.weight.bold, color: th.text, letterSpacing: '-0.01em' }}>{title}</h2>}
            {subtitle && <p style={{ margin: '3px 0 0', fontSize: font.size.md, color: th.textSubtle }}>{subtitle}</p>}
          </div>
          <IconButton label="Close" onClick={onClose} variant="ghost">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
            </svg>
          </IconButton>
        </header>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {children}
        </div>

        {footer && (
          <footer style={{
            padding: '14px 24px', borderTop: `1px solid ${th.border}`,
            background: th.surfaceHover, display: 'flex', justifyContent: 'flex-end', gap: 10,
          }}>
            {footer}
          </footer>
        )}
      </aside>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }
      `}</style>
    </>
  );
}

export function Modal({ open, onClose, title, subtitle, children, footer, width = 480 }) {
  const { theme } = useTheme();
  const th = themes[theme];

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)',
      backdropFilter: 'blur(3px)', zIndex: 200, display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: 16,
      animation: 'fadeIn .15s ease-out', fontFamily: font.family,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: width, background: th.surface,
        borderRadius: radius.lg, boxShadow: '0 24px 48px -12px rgba(15,23,42,0.35)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '92vh',
        animation: 'popIn .18s ease-out',
      }}>
        {(title || subtitle) && (
          <header style={{
            padding: '18px 24px', borderBottom: `1px solid ${th.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          }}>
            <div>
              {title && <h2 style={{ margin: 0, fontSize: font.size.lg, fontWeight: font.weight.bold, color: th.text, letterSpacing: '-0.01em' }}>{title}</h2>}
              {subtitle && <p style={{ margin: '3px 0 0', fontSize: font.size.md, color: th.textSubtle }}>{subtitle}</p>}
            </div>
            <IconButton label="Close" onClick={onClose} variant="ghost">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
              </svg>
            </IconButton>
          </header>
        )}
        <div style={{ flex: 1, overflowY: 'auto' }}>{children}</div>
        {footer && (
          <footer style={{
            padding: '14px 24px', borderTop: `1px solid ${th.border}`,
            background: th.surfaceHover, display: 'flex', justifyContent: 'flex-end', gap: 10,
          }}>
            {footer}
          </footer>
        )}
      </div>
      <style>{`
        @keyframes popIn { from { opacity: 0; transform: scale(.96) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  );
}
