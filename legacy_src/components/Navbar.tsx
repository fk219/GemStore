
import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext, LanguageContext } from '../App';
import { Locale } from '../types';

const Navbar: React.FC = () => {
  const themeCtx = useContext(ThemeContext);
  const langCtx = useContext(LanguageContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  if (!themeCtx || !langCtx) return null;

  const { theme, toggleTheme } = themeCtx;
  const { locale, setLocale } = langCtx;

  const navLinks = [
    { name: 'House', path: '/about' },
    { name: 'Archive', path: '/' },
    { name: 'Legacy', path: '/legacy' },
    { name: 'Consult', path: '/book' },
  ];

  const textColorClass = "text-[#1A1A1A] dark:text-[#FBFBF9]";
  const borderColorClass = "border-[#1A1A1A]/10 dark:border-[#FBFBF9]/10";

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[70] px-8 md:px-20 py-8 md:py-10 flex justify-between items-center transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isScrolled ? 'backdrop-blur-xl bg-[#FBFBF9]/40 dark:bg-[#0F0F0F]/40 py-6 md:py-7 shadow-[0_4px_30px_rgba(0,0,0,0.02)]' : ''
        }`}
      >
        <Link 
          to="/" 
          className={`group flex items-center gap-10 ${textColorClass}`}
        >
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-light tracking-[0.7em] uppercase serif leading-none transition-all duration-700 group-hover:tracking-[0.8em]">
              T.CRAFT
            </span>
            <div className="h-[1px] w-0 bg-current transition-all duration-700 group-hover:w-full opacity-25 mt-3"></div>
          </div>
          <span className="hidden md:block text-[7px] tracking-[1.4em] uppercase opacity-25 font-light border-l border-current pl-10 py-1.5 leading-none italic">
            Maison de Rareté
          </span>
        </Link>
        
        <div className="flex items-center gap-10 md:gap-24">
          <div className={`hidden lg:flex items-center gap-16 ${textColorClass} text-[9px] tracking-[0.5em] uppercase font-medium`}>
            {navLinks.map((link) => (
               <Link 
                key={link.name}
                to={link.path} 
                className="opacity-40 hover:opacity-100 hover:tracking-[0.7em] transition-all duration-500 py-2"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6 md:gap-10">
            <button 
              onClick={toggleTheme} 
              className={`relative w-12 h-12 flex items-center justify-center rounded-full border ${borderColorClass} ${textColorClass} group/theme overflow-hidden transition-all duration-700 hover:border-current hover:bg-current/[0.03]`}
              aria-label="Toggle Atmosphere"
            >
              <div 
                className={`absolute inset-0 transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  theme === 'dark' ? 'translate-y-0' : '-translate-y-full'
                }`}
              >
                <div className="h-12 flex items-center justify-center">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <div className="h-12 flex items-center justify-center">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
                  </svg>
                </div>
              </div>
            </button>

            <button 
              className={`group relative flex flex-col items-end justify-center gap-3 ${textColorClass} focus:outline-none h-12 w-12`}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Reveal Narrative"
            >
              <div className="flex flex-col items-end gap-2 overflow-hidden">
                <span className={`w-10 h-[1px] bg-current transition-all duration-700 group-hover:-translate-x-3`}></span>
                <span className={`w-5 h-[1px] bg-current transition-all duration-700 group-hover:w-10`}></span>
              </div>
              <div className="absolute inset-0 border border-current opacity-0 scale-50 rounded-full group-hover:opacity-10 group-hover:scale-100 transition-all duration-700"></div>
            </button>
          </div>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 z-[100] transition-all duration-[1.2s] ease-[cubic-bezier(0.85, 0, 0.15, 1)] ${
          isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-[#FBFBF9] dark:bg-[#0A0A0A]"></div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false);
          }}
          className={`absolute top-10 right-10 md:top-16 md:right-24 group w-24 h-24 flex flex-col items-center justify-center ${textColorClass} z-[120] cursor-pointer`}
          aria-label="Close Menu"
        >
          <div className="relative w-12 h-12 flex items-center justify-center pointer-events-none">
            <span className="absolute w-full h-[1px] bg-current rotate-45 transition-all duration-700 group-hover:rotate-[135deg]"></span>
            <span className="absolute w-full h-[1px] bg-current -rotate-45 transition-all duration-700 group-hover:-rotate-[135deg]"></span>
          </div>
          <span className="mt-5 text-[9px] tracking-[0.7em] uppercase opacity-20 font-medium transition-opacity group-hover:opacity-100 pointer-events-none">Fermer</span>
        </button>

        <div className={`h-full flex flex-col md:flex-row ${textColorClass} relative z-10`}>
          <div className="hidden md:flex w-2/5 h-full border-r border-zinc-100 dark:border-zinc-900/30 flex-col items-center justify-center p-24 relative overflow-hidden">
            <div className="overflow-hidden aspect-[3/4] w-full max-w-sm rounded-[50px] relative group">
              <img 
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200" 
                alt="Refraction Study" 
                className="w-full h-full object-cover grayscale transition-transform duration-[8s] group-hover:scale-110"
              />
            </div>
            <p className="mt-20 text-[10px] tracking-[0.9em] uppercase opacity-20 leading-relaxed italic font-light text-center">
              "Rarity is a silent language spoken by time."
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center px-12 md:px-40 py-24">
            <div className="flex flex-col gap-6 md:gap-10">
              {navLinks.map((link, i) => (
                <div key={`${link.name}-${i}`} className="overflow-hidden group/navitem">
                  <Link 
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-5xl md:text-[5.5rem] font-light serif italic leading-[0.9] transition-all duration-[1.4s] ease-[cubic-bezier(0.19,1,0.22,1)] hover:translate-x-16 ${
                      isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
                    style={{ transitionDelay: `${0.4 + i * 0.15}s` }}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
