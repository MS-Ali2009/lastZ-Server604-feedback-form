import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Volume2, VolumeX, Terminal, Palette } from 'lucide-react';
import { useTheme, themes } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';

const Header = () => {
  const { currentTheme, setCurrentTheme, themeData } = useTheme();
  const { isMuted, toggleMute, playSound } = useSound();

  const handleThemeChange = (themeName) => {
    playSound('click');
    setCurrentTheme(themeName);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="w-12 h-12 rounded-xl overflow-hidden border-2" style={{ borderColor: themeData.primary, boxShadow: `0 0 20px ${themeData.glow}` }}>
          <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-orbitron font-black tracking-tighter m-0 leading-none" style={{ color: themeData.primary }}>SERVER 604</h1>
          <p className="text-[10px] font-orbitron text-white/70 tracking-[0.3em] uppercase leading-none mt-1">Feedback Terminal v2.0</p>
        </div>
      </div>

      <div className="flex items-center gap-4 pointer-events-auto">
        {/* Theme Switcher */}
        <div className="flex items-center gap-2 bg-deepNavy/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
          {Object.keys(themes).map((theme) => (
            <button
              key={theme}
              onClick={() => handleThemeChange(theme)}
              onMouseEnter={() => playSound('hover')}
              className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                currentTheme === theme ? 'scale-110 border-white' : 'border-transparent opacity-50 hover:opacity-100'
              }`}
              style={{ 
                backgroundColor: themes[theme].primary
              }}
              title={theme}
            />
          ))}
        </div>

        {/* Sound Toggle */}
        <button
          onClick={() => { playSound('click'); toggleMute(); }}
          onMouseEnter={() => playSound('hover')}
          className="w-10 h-10 rounded-full bg-deepNavy/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 shadow-lg"
          style={{ borderColor: themeData.primary }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
