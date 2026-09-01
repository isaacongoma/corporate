"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeCtx = createContext({ theme: 'dark', toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('so-theme');
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('so-theme', next);
      return next;
    });
  };

  return (
    <ThemeCtx.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);

export const themes = {
  dark: {
    sidebarBg: '#111827',
    sidebarBorder: '#1f2937',
    sidebarText: '#9ca3af',
    sidebarActiveText: '#10b981',
    sidebarActiveBg: 'rgba(16,185,129,0.12)',
    sidebarSection: '#4b5563',
    headerBg: '#1f2937',
    headerBorder: '#374151',
    bg: '#111827',
    surface: '#1f2937',
    surfaceHover: '#374151',
    border: '#374151',
    text: '#f9fafb',
    textMuted: '#d1d5db',
    textSubtle: '#9ca3af',
    textFaint: '#6b7280',
    inputBg: '#374151',
    inputBorder: '#4b5563',
    inputText: '#f9fafb',
    statUp: '#10b981',
    statDown: '#ef4444',
    accent: '#10b981',
    accentHover: '#059669',
    badgeEntBg: 'rgba(16,185,129,0.15)',
    badgeEntText: '#34d399',
    badgeGrowthBg: 'rgba(59,130,246,0.15)',
    badgeGrowthText: '#60a5fa',
    badgeStarterBg: 'rgba(168,85,247,0.15)',
    badgeStarterText: '#c084fc',
    wonBg: 'rgba(16,185,129,0.12)',
    wonText: '#34d399',
    pendingBg: 'rgba(245,158,11,0.12)',
    pendingText: '#fbbf24',
    lostBg: 'rgba(239,68,68,0.12)',
    lostText: '#f87171',
    chartGrid: '#374151',
    chartText: '#9ca3af',
    chartTooltipBg: '#1f2937',
    chartTooltipBorder: '#374151',
    scrollThumb: '#374151',
    borderStrong: '#4b5563',
    divider: '#374151',
  },
  light: {
    sidebarBg: '#111827',
    sidebarBorder: '#1f2937',
    sidebarText: '#9ca3af',
    sidebarActiveText: '#10b981',
    sidebarActiveBg: 'rgba(16,185,129,0.12)',
    sidebarSection: '#6b7280',
    headerBg: '#ffffff',
    headerBorder: '#e5e7eb',
    bg: '#f9fafb',
    surface: '#ffffff',
    surfaceHover: '#f3f4f6',
    border: '#e5e7eb',
    text: '#111827',
    textMuted: '#374151',
    textSubtle: '#6b7280',
    textFaint: '#9ca3af',
    inputBg: '#f9fafb',
    inputBorder: '#d1d5db',
    inputText: '#111827',
    statUp: '#059669',
    statDown: '#dc2626',
    accent: '#10b981',
    accentHover: '#059669',
    badgeEntBg: '#d1fae5',
    badgeEntText: '#065f46',
    badgeGrowthBg: '#dbeafe',
    badgeGrowthText: '#1d4ed8',
    badgeStarterBg: '#ede9fe',
    badgeStarterText: '#5b21b6',
    wonBg: '#dcfce7',
    wonText: '#15803d',
    pendingBg: '#fef3c7',
    pendingText: '#b45309',
    lostBg: '#fee2e2',
    lostText: '#b91c1c',
    chartGrid: '#e5e7eb',
    chartText: '#6b7280',
    chartTooltipBg: '#ffffff',
    chartTooltipBorder: '#e5e7eb',
    scrollThumb: '#d1d5db',
    borderStrong: '#d1d5db',
    divider: '#f1f5f9',
  },
};
