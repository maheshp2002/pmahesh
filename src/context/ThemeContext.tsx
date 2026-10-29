'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyTheme(t: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (t === 'light') {
    root.classList.remove('dark');
    root.classList.add('light');
    root.style.colorScheme = 'light';
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    // Check URL param or localStorage or default to dark
    const urlParams = new URLSearchParams(window.location.search);
    const paramTheme = urlParams.get('theme') as Theme | null;
    const savedTheme = (paramTheme === 'light' || paramTheme === 'dark')
      ? paramTheme
      : (localStorage.getItem('mahesh_portfolio_theme') as Theme | null);

    const activeTheme = (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
    applyTheme(activeTheme);
    if (activeTheme === 'light') {
      queueMicrotask(() => {
        setThemeState('light');
      });
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('mahesh_portfolio_theme', t);
    applyTheme(t);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div className={theme === 'light' ? 'light-mode' : 'dark-mode'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
