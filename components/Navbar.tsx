'use client';

import React, { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Diamond, Sun, Moon, Languages } from 'lucide-react';
import { ThemeContext, LanguageContext } from '@/app/providers';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface NavbarProps {
    themeOverride?: 'light' | 'dark' | 'auto';
}

const Navbar: React.FC<NavbarProps> = ({ themeOverride = 'auto' }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const pathname = usePathname();
    const themeCtx = useContext(ThemeContext);
    const langCtx = useContext(LanguageContext);

    const menuRef = useRef<HTMLDivElement>(null);
    const menuBgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
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

    useGSAP(() => {
        if (isMenuOpen) {
            const tl = gsap.timeline();
            tl.to(menuRef.current, { display: 'flex', duration: 0 })
                .to(menuBgRef.current, {
                    clipPath: 'circle(150% at 100% 0%)',
                    duration: 1.2,
                    ease: 'power4.out'
                })
                .from('.menu-item', {
                    y: 20,
                    opacity: 0,
                    stagger: 0.08,
                    duration: 0.8,
                    ease: 'power3.out'
                }, "-=0.8");
        } else {
            gsap.to(menuBgRef.current, {
                clipPath: 'circle(0% at 100% 0%)',
                duration: 0.8,
                ease: 'power3.inOut',
                onComplete: () => { gsap.set(menuRef.current, { display: 'none' }); }
            });
        }
    }, { dependencies: [isMenuOpen] });

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    if (!themeCtx || !langCtx) return null;

    const { theme, toggleTheme } = themeCtx;
    const { locale, setLocale } = langCtx;

    const navItems = [
        { name: 'Home', path: '/', img: 'https://images.unsplash.com/photo-1615111784767-4d7c02783103?auto=format&fit=crop&q=80&w=800' },
        { name: 'Gemstones', path: '/gemstones', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800' },
        { name: 'Origins', path: '/origins', img: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800' },
        { name: 'Journal', path: '/blog', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800' },
        { name: 'About', path: '/about', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800' },
        { name: 'Contact', path: '/contact', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800' }
    ];

    const accentColor = '#b5a16d';
    const isActivePage = (path: string) => pathname === path;

    return (
        <>
            {/* MAIN NAVBAR - Improved visibility & sizing */}
            <nav className="fixed top-0 left-0 w-full z-[60] pointer-events-none">
                <div className={`mx-auto transition-all duration-700 pointer-events-auto ${isScrolled
                    ? 'mt-3 px-4 max-w-6xl'
                    : 'mt-4 px-6 max-w-[1600px]'
                    }`}>
                    <div className={`flex items-center justify-between transition-all duration-700 ${isScrolled
                        ? 'py-2.5 px-6 bg-[#F9F8F4]/95 dark:bg-[#1A1A1A]/95 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-full shadow-2xl shadow-black/5 dark:shadow-black/20'
                        : 'py-3 px-0'
                        }`}>
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <Diamond
                                className={`transition-all duration-700 group-hover:rotate-180 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`}
                                style={{ color: accentColor }}
                                strokeWidth={1.5}
                            />
                            <span
                                className={`font-serif tracking-[0.25em] uppercase transition-all duration-700 text-[#1A1A1A] dark:text-white font-light ${isScrolled ? 'text-sm' : 'text-lg'}`}
                            >
                                Maihan Group
                            </span>
                        </Link>

                        {/* Desktop Controls */}
                        <div className="hidden lg:flex items-center gap-6">
                            {/* Quick Nav Links */}
                            <div className="flex items-center gap-1 mr-4">
                                {navItems.slice(0, 4).map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`relative px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-500 ${isActivePage(item.path)
                                            ? 'text-[#b5a16d]'
                                            : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                                            }`}
                                    >
                                        {item.name}
                                        {isActivePage(item.path) && (
                                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#b5a16d]" />
                                        )}
                                    </Link>
                                ))}
                            </div>

                            <div className="w-px h-4 bg-black/10 dark:bg-white/10" />

                            {/* Private Viewing CTA - Sticky */}
                            <Link
                                href="/contact"
                                className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full border border-[#b5a16d]/30 bg-[#b5a16d]/5 hover:bg-[#b5a16d] hover:text-[#1A1A1A] text-[#b5a16d] transition-all duration-500 group"
                            >
                                <span className="text-[9px] tracking-[0.2em] uppercase font-medium">Private Viewing</span>
                            </Link>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-all duration-500"
                            >
                                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                            </button>

                            {/* Menu Button - Premium Style */}
                            <button
                                className="group flex items-center gap-3 py-2 px-5 border border-[#b5a16d]/30 rounded-full bg-[#b5a16d]/5 hover:bg-[#b5a16d] hover:border-[#b5a16d] transition-all duration-500"
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#b5a16d] group-hover:text-[#1A1A1A] transition-colors duration-500">
                                    Menu
                                </span>
                                <div className="flex flex-col gap-[3px] w-4">
                                    <div className="h-[1.5px] w-full bg-[#b5a16d] group-hover:bg-[#1A1A1A] dark:group-hover:bg-[#F9F8F4] transition-colors duration-500" />
                                    <div className="h-[1.5px] w-2/3 ml-auto bg-[#b5a16d] group-hover:bg-[#1A1A1A] dark:group-hover:bg-[#F9F8F4] transition-colors duration-500" />
                                </div>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden flex items-center gap-2 p-2.5 rounded-full bg-[#b5a16d] text-[#1A1A1A]"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Menu size={18} strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* FULLSCREEN MENU - Optimized for 100vh */}
            <div ref={menuRef} className="fixed inset-0 z-[100] hidden">
                <div
                    ref={menuBgRef}
                    className="absolute inset-0 bg-secondary dark:bg-[#0A0A0B]"
                    style={{ clipPath: 'circle(0% at 100% 0%)' }}
                >
                    <div className="relative w-full h-screen flex flex-col lg:flex-row overflow-hidden">

                        {/* LEFT SIDE - Navigation (fits in viewport) */}
                        <div className="w-full lg:w-3/5 h-full flex flex-col justify-between p-6 md:p-10 lg:p-16">

                            {/* Header Row */}
                            <div className="flex justify-between items-center">
                                <Link href="/" className="flex items-center gap-3">
                                    <Diamond className="w-5 h-5" style={{ color: accentColor }} strokeWidth={1.5} />
                                    <span className="font-serif text-base tracking-[0.25em] uppercase text-[#1A1A1A] dark:text-white font-light">
                                        Maihan Group
                                    </span>
                                </Link>

                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="group flex items-center gap-3 text-white/60 hover:text-white transition-all duration-500"
                                >
                                    <span className="text-[9px] uppercase tracking-[0.2em] font-medium">Close</span>
                                    <div className="w-8 h-8 flex items-center justify-center border border-black/10 dark:border-white/20 rounded-full group-hover:border-[#b5a16d] group-hover:bg-[#b5a16d]/10 transition-all duration-500">
                                        <X size={14} />
                                    </div>
                                </button>
                            </div>

                            {/* Navigation Links - Compact for 100vh */}
                            <div className="flex-1 flex flex-col justify-center py-6 lg:py-8">
                                <div className="space-y-2 lg:space-y-1">
                                    {navItems.map((item, index) => (
                                        <Link
                                            key={item.name}
                                            href={item.path}
                                            className="menu-item group flex items-center gap-6 py-2 lg:py-3"
                                            onMouseEnter={() => setHoveredLink(item.img)}
                                            onMouseLeave={() => setHoveredLink(null)}
                                        >
                                            {/* Number */}
                                            <span className="font-serif text-sm italic text-[#b5a16d]/40 w-8">
                                                0{index + 1}
                                            </span>

                                            {/* Link Name */}
                                            <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-none uppercase tracking-tight transition-all duration-500 ${isActivePage(item.path)
                                                ? 'text-[#b5a16d]'
                                                : 'text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-4'
                                                }`}>
                                                {item.name}
                                            </h2>

                                            {/* Active Indicator */}
                                            {isActivePage(item.path) && (
                                                <div className="flex items-center gap-2 ml-auto">
                                                    <span className="text-[8px] uppercase tracking-[0.3em] text-[#b5a16d]/60">Current</span>
                                                    <div className="w-2 h-2 rounded-full bg-[#b5a16d] animate-pulse" />
                                                </div>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Row - Compact */}
                            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/5 dark:border-white/5">
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={() => setLocale(locale === 'EN' ? 'FR' : 'EN')}
                                        className="flex items-center gap-2 text-[9px] font-medium text-black/40 dark:text-white/40 hover:text-[#b5a16d] uppercase tracking-[0.15em] transition-all duration-500"
                                    >
                                        <Languages size={12} /> {locale}
                                    </button>
                                    <span className="text-black/20 dark:text-white/20">|</span>
                                    <span className="text-[9px] text-black/30 dark:text-white/30 tracking-[0.1em]">rare@maihangroup.com</span>
                                </div>
                                <div className="text-[8px] text-black/20 dark:text-white/20 tracking-[0.2em] uppercase">
                                    Est. 2001 • London
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE - Dynamic Image */}
                        <div className="hidden lg:flex w-2/5 h-full items-center justify-center p-10 border-l border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/30">
                            <div className="relative w-full h-[70vh] max-h-[600px] overflow-hidden rounded-2xl">
                                {/* Base Image */}
                                <img
                                    src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=1200"
                                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                                    alt=""
                                />

                                {/* Hover Images */}
                                {navItems.map((item) => (
                                    <img
                                        key={item.name}
                                        src={item.img}
                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hoveredLink === item.img ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                                            }`}
                                        alt=""
                                    />
                                ))}

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                                {/* Center Icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 border border-[#b5a16d]/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <Diamond className="w-8 h-8 text-[#b5a16d]/60" strokeWidth={0.5} />
                                    </div>
                                </div>

                                {/* Bottom Text */}
                                <div className="absolute bottom-8 left-0 right-0 text-center">
                                    <p className="text-[10px] tracking-[0.4em] uppercase text-black/40 dark:text-white/40">Rare by Nature</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
