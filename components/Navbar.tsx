"use client";

import React, { useContext, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when menu is open
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

    let effectiveTextColorClass = "text-zinc-900 dark:text-[#FBFBF9]";
    let effectiveBorderColorClass = "border-zinc-900/20 dark:border-[#FBFBF9]/20";

    if (!isScrolled && !isMenuOpen) {
        if (themeOverride === 'dark') {
            effectiveTextColorClass = "text-[#FBFBF9]";
            effectiveBorderColorClass = "border-[#FBFBF9]/20";
        } else if (themeOverride === 'light') {
            effectiveTextColorClass = "text-zinc-900";
            effectiveBorderColorClass = "border-zinc-900/20";
        }
    }

    if (isMenuOpen) {
        effectiveTextColorClass = "text-zinc-900 dark:text-[#FBFBF9]";
        effectiveBorderColorClass = "border-zinc-900/20 dark:border-[#FBFBF9]/20";
    }

    // Helper for Full Screen Menu Text Color
    const textColorClass = effectiveTextColorClass;

    const navLinks = [
        {
            name: 'Home',
            path: '/',
            image: "https://images.unsplash.com/photo-1620218151276-8575084934e6?auto=format&fit=crop&q=80&w=1200",
            desc: "The provenance of rare earth."
        },
        {
            name: 'Products',
            path: '/gemstones',
            image: "https://images.unsplash.com/photo-1615486511484-92e57bb6eb64?auto=format&fit=crop&q=80&w=1200",
            desc: "The Vault. Curated archives."
        },
        {
            name: 'About',
            path: '/about',
            image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=1200",
            desc: "The legacy of L'Éclat."
        },
        {
            name: 'Contact',
            path: '/book',
            image: "https://images.unsplash.com/photo-1549488497-217e3350160a?auto=format&fit=crop&q=80&w=1200",
            desc: "Private viewing & concierge."
        },
    ];

    const activeImage = hoveredLink
        ? navLinks.find(l => l.name === hoveredLink)?.image
        : navLinks.find(l => l.path === pathname)?.image || navLinks[0].image;

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

            {/* FULL SCREEN INTERACTIVE MENU */}
            <div
                className={`fixed inset-0 z-[100] transition-all duration-[0.8s] ease-[cubic-bezier(0.85, 0, 0.15, 1)] ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-full pointer-events-none'
                    }`}
            >
                {/* Background */}
                <div className="absolute inset-0 bg-[#FBFBF9] dark:bg-[#0A0A0A]"></div>

                {/* Close Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(false);
                        setHoveredLink(null);
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

                {/* Content Grid */}
                <div className={`h-full w-full flex flex-col md:flex-row ${textColorClass} relative z-10`}>

                    {/* LEFT PANEL: Brand Details & Info */}
                    <div className="hidden md:flex flex-col justify-between w-1/4 h-full p-16 border-r border-[#646464]/10">
                        <div className="space-y-8">
                            <span className="text-[10px] tracking-[0.2em] uppercase opacity-40">Maison L'Éclat</span>
                            <div className="space-y-2 text-xs font-light tracking-wide opacity-60">
                                <p>42 Bond Street, Mayfair</p>
                                <p>London W1S 2SB</p>
                                <p>+44 20 7946 0123</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <span className="text-[10px] tracking-[0.2em] uppercase opacity-40 block">Language</span>
                            <div className="flex gap-4 text-xs tracking-widest uppercase">
                                <button className="opacity-100 border-b border-current pb-1">EN</button>
                                <button className="opacity-40 hover:opacity-100 transition-opacity">FR</button>
                                <button className="opacity-40 hover:opacity-100 transition-opacity">JP</button>
                            </div>
                        </div>
                    </div>

                    {/* CENTER PANEL: Navigation Links */}
                    <div className="flex-1 flex flex-col justify-center px-12 md:px-24">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link, i) => {
                                const isActive = pathname === link.path;
                                const isHovered = hoveredLink === link.name;

                                return (
                                    <div
                                        key={`${link.name}-${i}`}
                                        className="relative group/navitem flex items-center gap-8"
                                        onMouseEnter={() => setHoveredLink(link.name)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                    >
                                        <div className={`w-2 h-2 rounded-full bg-amber-500 transition-all duration-300 ${isActive || isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />

                                        <Link
                                            href={link.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`block font-serif uppercase leading-[1.1] transition-all duration-300 hover:ml-4
                                                ${isActive ? 'opacity-100 italic' : 'opacity-70 hover:opacity-100 hover:italic'}
                                                text-5xl md:text-[5rem] font-light
                                            `}
                                        >
                                            {link.name}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT PANEL: Dynamic Image Preview */}
                    <div className="hidden md:flex w-1/3 h-full items-center justify-center p-16 bg-[#FBFBF9] dark:bg-[#0C0C0C] transition-colors duration-500">
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm">
                            {/* We use key to force unmount/mount transition or just simple CSS fade */}
                            {navLinks.map((link) => (
                                <Image
                                    key={link.name}
                                    src={link.image}
                                    alt={link.name}
                                    fill
                                    className={`object-cover transition-opacity duration-500 ease-out ${activeImage === link.image ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                                        }`}
                                />
                            ))}

                            {/* Overlay Text for Image */}
                            <div className="absolute bottom-8 left-8 z-10">
                                <p className="text-white text-xs tracking-[0.2em] uppercase font-light mix-blend-difference">
                                    {hoveredLink
                                        ? navLinks.find(l => l.name === hoveredLink)?.desc
                                        : navLinks.find(l => l.path === pathname)?.desc}
                                </p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
