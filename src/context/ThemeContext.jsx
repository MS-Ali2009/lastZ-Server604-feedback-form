import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  inferno: {
    primary: '#f43f5e',
    secondary: '#fb7185',
    accent: '#e11d48',
    glow: 'rgba(244, 63, 94, 0.5)',
    text: 'text-rose-500',
    border: 'border-rose-500/50',
    bg: 'bg-rose-500/10',
    gradient: 'from-rose-600 to-orange-500'
  },
  cyber: {
    primary: '#00e5ff',
    secondary: '#22d3ee',
    accent: '#0891b2',
    glow: 'rgba(0, 229, 255, 0.5)',
    text: 'text-cyan-400',
    border: 'border-cyan-400/50',
    bg: 'bg-cyan-400/10',
    gradient: 'from-cyan-500 to-blue-500'
  },
  neon: {
    primary: '#7c3aed',
    secondary: '#a78bfa',
    accent: '#6d28d9',
    glow: 'rgba(124, 58, 237, 0.5)',
    text: 'text-violet-500',
    border: 'border-violet-500/50',
    bg: 'bg-violet-500/10',
    gradient: 'from-violet-600 to-fuchsia-500'
  },
  toxic: {
    primary: '#afff00',
    secondary: '#d4ff00',
    accent: '#83bf00',
    glow: 'rgba(175, 255, 0, 0.5)',
    text: 'text-[#afff00]',
    border: 'border-[#afff00]/50',
    bg: 'bg-[#afff00]/10',
    gradient: 'from-[#afff00] to-green-600'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('inferno');

  const themeData = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themeData }}>
      <div className={`theme-${currentTheme} min-h-screen transition-all duration-500`} style={{ '--theme-primary': themeData.primary, '--theme-glow': themeData.glow }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
