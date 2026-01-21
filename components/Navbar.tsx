"use client";

import React, { useContext, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeContext, LanguageContext } from '@/app/providers';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface NavbarProps {
    themeOverride?: 'light' | 'dark' | 'auto';
}

const Navbar: React.FC<NavbarProps> = ({ themeOverride = 'auto' }) => {
    const themeCtx = useContext(ThemeContext);
    const langCtx = useContext(LanguageContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        handleScroll(); // Check on mount
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!themeCtx || !langCtx) return null;

    const { theme, toggleTheme } = themeCtx;
    const { locale, setLocale } = langCtx;

    // Determine effective text color
    // If scrolled, always adapt to the blur background (usually standard text color)
    // If not scrolled and themeOverride is set, use that.
    // Otherwise fallback to standard theme text.

    // For Home Hero (Dark), we likely pass themeOverride='dark' (meaning Dark Mode text -> White)
    // Wait, 'dark' mode usually means White Text. 'light' means Black Text.

    let effectiveTextColorClass = "text-zinc-900 dark:text-[#FBFBF9]"; // Default auto
    let effectiveBorderColorClass = "border-zinc-900/20 dark:border-[#FBFBF9]/20";

    if (!isScrolled && !isMenuOpen) {
        if (themeOverride === 'dark') { // Force "Dark Mode" style (White Text)
            effectiveTextColorClass = "text-[#FBFBF9]";
            effectiveBorderColorClass = "border-[#FBFBF9]/20";
        } else if (themeOverride === 'light') { // Force "Light Mode" style (Black Text)
            effectiveTextColorClass = "text-zinc-900";
            effectiveBorderColorClass = "border-zinc-900/20";
        }
    }

    // Force "Menu Open" state colors if menu is open (usually contrast against menu bg)
    if (isMenuOpen) {
        effectiveTextColorClass = "text-zinc-900 dark:text-[#FBFBF9]";
        effectiveBorderColorClass = "border-zinc-900/20 dark:border-[#FBFBF9]/20";
    }

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/gemstones' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/book' },
    ];

    // GSAP Refs for visual enhancement
    const sunRef = useRef(null);
    const moonRef = useRef(null);

    useGSAP(() => {
        if (theme === 'dark') {
            gsap.to(sunRef.current, { y: 20, opacity: 0, scale: 0.5, duration: 0.5, ease: "power2.in" });
            gsap.fromTo(moonRef.current, { y: -20, opacity: 0, scale: 0.5 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay: 0.2 });
        } else {
            gsap.to(moonRef.current, { y: -20, opacity: 0, scale: 0.5, duration: 0.5, ease: "power2.in" });
            gsap.fromTo(sunRef.current, { y: 20, opacity: 0, scale: 0.5 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay: 0.2 });
        }
    }, [theme]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-[70] px-8 md:px-12 py-8 flex justify-between items-center transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${isScrolled ? 'backdrop-blur-xl bg-[#FBFBF9]/90 dark:bg-[#050505]/90 shadow-sm py-4' : ''
                    }`}
            >
                <Link
                    href="/"
                    className={`group flex items-center gap-6 ${effectiveTextColorClass} z-[80] relative transition-colors duration-500`}
                >
                    <span className="text-2xl md:text-3xl tracking-[0.05em] font-serif uppercase leading-none transition-all duration-700 group-hover:tracking-[0.1em] font-light italic">
                        T.Craft
                    </span>
                    <span className="hidden md:block w-px h-6 bg-current opacity-30 mx-2 rotate-12"></span>
                    <span className="hidden md:block text-[10px] tracking-[0.4em] uppercase opacity-60 font-sans font-light">
                        Maison
                    </span>
                </Link>

                {/* Minimalist Navigation - Burger Only */}
                <div className="flex items-center gap-8 md:gap-12">

                    <div className="flex items-center gap-6 md:gap-8">
                        {/* Theme Toggle - Animated Sun/Moon */}
                        <button
                            onClick={toggleTheme}
                            className={`relative w-10 h-10 flex items-center justify-center rounded-full border ${effectiveBorderColorClass} ${effectiveTextColorClass} group/theme overflow-hidden transition-all duration-700 hover:border-current/40 hover:scale-105`}
                            aria-label="Toggle Atmosphere"
                        >
                            <div className="absolute inset-0 flex items-center justify-center" ref={sunRef}>
                                <svg className="h-4 w-4 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transform translate-y-[-20px]" ref={moonRef}>
                                <svg className="h-4 w-4 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </div>
                        </button>

                        <button
                            className={`group relative flex flex-col items-end justify-center gap-2 ${effectiveTextColorClass} focus:outline-none h-10 w-12 transition-colors duration-500`}
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Reveal Narrative"
                        >
                            <span className={`w-12 h-px bg-current transition-all duration-700 ease-expo group-hover:w-8 group-hover:bg-amber-500`}></span>
                            <span className={`w-8 h-px bg-current transition-all duration-700 ease-expo group-hover:w-12`}></span>
                            <span className={`w-12 h-px bg-current transition-all duration-700 ease-expo group-hover:w-6`}></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Same Full Screen Menu with updated Typography and Close Button Fix */}
            <div
                className={`fixed inset-0 z-[100] transition-all duration-[1.2s] ease-[cubic-bezier(0.85, 0, 0.15, 1)] ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-full pointer-events-none'
                    }`}
            >
                {/* Background with Theme Context Color */}
                <div className="absolute inset-0 bg-[#FBFBF9] dark:bg-[#0A0A0A]"></div>

                {/* Close Button Fix */}
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        setIsMenuOpen(false);
                    }}
                    className={`absolute top-10 right-8 md:top-14 md:right-20 group w-24 h-24 flex flex-col items-center justify-center ${textColorClass} z-[120] cursor-pointer hover:opacity-100`}
                    aria-label="Close Menu"
                >
                    <div className="relative w-12 h-12 flex items-center justify-center pointer-events-none">
                        <span className="absolute w-full h-[1px] bg-current rotate-45 transition-all duration-700 group-hover:rotate-[135deg]"></span>
                        <span className="absolute w-full h-[1px] bg-current -rotate-45 transition-all duration-700 group-hover:-rotate-[135deg]"></span>
                    </div>
                    <span className="mt-5 text-[8px] tracking-[0.5em] uppercase opacity-40 font-light font-sans transition-opacity group-hover:opacity-100 pointer-events-none">Fermer</span>
                </button>

                <div className={`h-full flex flex-col md:flex-row ${textColorClass} relative z-10`}>
                    <div className="hidden md:flex w-2/5 h-full border-r border-zinc-100 dark:border-zinc-900/30 flex-col items-center justify-center p-24 relative overflow-hidden">
                        <div className="overflow-hidden aspect-[3/4] w-full max-w-sm rounded-[50px] relative group">
                            <Image
                                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
                                alt="Refraction Study"
                                fill
                                className="object-cover grayscale transition-transform duration-[8s] group-hover:scale-110"
                            />
                        </div>
                        <p className="mt-20 text-[10px] tracking-[0.8em] uppercase opacity-40 leading-relaxed italic font-light text-center font-sans">
                            &quot;Rarity is a silent language spoken by time.&quot;
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col justify-center px-12 md:px-40 py-24">
                        <div className="flex flex-col gap-6 md:gap-10">
                            {navLinks.map((link, i) => (
                                <div key={`${link.name}-${i}`} className="overflow-hidden group/navitem">
                                    <Link
                                        href={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block text-6xl md:text-[6rem] font-light font-serif uppercase leading-[0.9] transition-all duration-[1.4s] ease-[cubic-bezier(0.19,1,0.22,1)] hover:translate-x-12 opacity-80 hover:opacity-100 ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'
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
