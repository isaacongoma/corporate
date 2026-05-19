// Admin design-system tokens. Import these instead of hard-coding values
// so colors, spacing, radii and shadows stay consistent across the panel.

export const color = {
  // Brand (emerald — security)
  brand50:  '#ecfdf5',
  brand100: '#d1fae5',
  brand200: '#a7f3d0',
  brand500: '#10b981',
  brand600: '#059669',
  brand700: '#047857',
  brand800: '#065f46',

  // Neutral
  bg:       '#f7f8fa',
  surface:  '#ffffff',
  surfaceAlt: '#fafbfc',
  border:   '#e5e7eb',
  borderStrong: '#d1d5db',
  divider:  '#f1f5f9',

  // Text
  text:        '#0f172a',
  textMuted:   '#475569',
  textSubtle:  '#64748b',
  textFaint:   '#94a3b8',

  // Semantic
  success:  '#16a34a',
  successBg:'#dcfce7',
  warning:  '#d97706',
  warningBg:'#fef3c7',
  danger:   '#dc2626',
  dangerBg: '#fee2e2',
  info:     '#2563eb',
  infoBg:   '#dbeafe',
};

export const radius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  pill: '999px',
};

export const shadow = {
  xs: '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
  sm: '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px 0 rgba(15, 23, 42, 0.04)',
  md: '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
  lg: '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.05)',
  xl: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.06)',
  focus: '0 0 0 3px rgba(16, 185, 129, 0.18)',
};

export const font = {
  family: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  size: {
    xs: '11px', sm: '12px', md: '13px', base: '14px',
    lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px',
  },
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
};

export const space = { 1:'4px', 2:'8px', 3:'12px', 4:'16px', 5:'20px', 6:'24px', 8:'32px', 10:'40px' };
