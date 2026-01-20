
import React, { useState, useEffect, createContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Theme, ThemeContextType, Locale, LanguageContextType } from './types';
import { TRANSLATIONS } from './constants';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import LegacyPage from './pages/LegacyPage';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [locale, setLocale] = useState<Locale>('EN');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.className = theme === 'dark' 
      ? 'bg-[#0F0F0F] text-[#FBFBF9]' 
      : 'bg-[#FBFBF9] text-[#1A1A1A]';
  }, [theme]);

  const valueLanguage = {
    locale,
    setLocale,
    t: TRANSLATIONS[locale]
  };

  const valueTheme = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={valueTheme}>
      <LanguageContext.Provider value={valueLanguage}>
        <Router>
          <div className={`min-h-screen relative overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'dark' : ''}`}>
            <CustomCursor />
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/legacy" element={<LegacyPage />} />
              <Route path="/book" element={<BookingPage />} />
            </Routes>
            <FloatingWhatsApp />
          </div>
        </Router>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
