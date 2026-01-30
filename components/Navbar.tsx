"use client";

import React, { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Diamond, Sun, Moon, ArrowRight, Search } from 'lucide-react';
import { ThemeContext, LanguageContext } from '@/app/providers';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    const pathname = usePathname();
    const themeCtx = useContext(ThemeContext);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuBgRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLImageElement>(null);

    // Dynamic Navigation Data
    const navItems = [
        { name: 'Home', path: '/', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=1920' },
        { name: 'Gemstones', path: '/gemstones', img: 'https://images.unsplash.com/photo-1623861214379-37f00030da4f?auto=format&fit=crop&q=80&w=1920' },
        { name: 'Origins', path: '/origins', img: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&q=80&w=1920' },
        { name: 'Maison', path: '/about', img: 'https://images.unsplash.com/photo-1547376044-c71c0800d115?auto=format&fit=crop&q=80&w=1920' },
        { name: 'Journal', path: '/blog', img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1920' },
        { name: 'Contact', path: '/contact', img: 'https://images.unsplash.com/photo-1549887552-93f8efb0815e?auto=format&fit=crop&q=80&w=1920' }
    ];

    // Scroll Listener for Sticky State & Vanish Logic
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Sticky State
            setIsScrolled(currentScrollY > 50);

            // Vanish Logic (Hide on scroll down, show on scroll up)
            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY.current) {
                    setIsVisible(false); // Scrolling DOWN
                } else {
                    setIsVisible(true);  // Scrolling UP
                }
            } else {
                setIsVisible(true); // Always show at top
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Menu Animation (Cinematic Reveal)
    useGSAP(() => {
        if (isMenuOpen) {
            const tl = gsap.timeline();

            // 1. Reveal Container
            tl.set(menuRef.current, { display: 'flex' })
                .to(menuBgRef.current, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.2,
                    ease: 'expo.inOut'
                })
                // 2. Cascade Links
                .from('.nav-link-item', {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power4.out'
                }, "-=0.8")
                // 3. Reveal Meta Info (Footer/Line)
                .from('.menu-meta', {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    ease: 'power2.out'
                }, "-=0.6");

        } else {
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(menuRef.current, { display: 'none' });
                    setHoveredLink(null); // Reset image
                }
            });

            tl.to(menuBgRef.current, {
                clipPath: 'inset(0% 0% 100% 0%)',
                duration: 1,
                ease: 'expo.inOut'
            });
        }
    }, { dependencies: [isMenuOpen] });

    // Close menu on route change
    useEffect(() => { setIsMenuOpen(false); }, [pathname]);

    if (!themeCtx) return null;
    const { theme, toggleTheme } = themeCtx;

    // Active Highlight Logic
    const currentImg = hoveredLink || navItems.find(i => i.path === pathname)?.img || navItems[0].img;

    return (
        <>
            {/* --- STICKY NAV (80% Width, Centered) --- */}
            <nav
                className={`fixed top-6 left-1/2 -translate-x-1/2 w-[80%] z-[60] pointer-events-none transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-[200%]'
                    }`}
            >
                <div
                    className={`
                        relative w-full flex items-center justify-between pointer-events-auto
                        px-8 py-4 rounded-full transition-all duration-700
                        ${isScrolled
                            ? 'bg-[#F9F8F4]/80 dark:bg-[#1A1A1A]/80 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-2xl'
                            : 'bg-transparent border border-transparent'
                        }
                    `}
                >
                    {/* 1. LOGO */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-28 h-8 md:w-32 md:h-10">
                            <Image
                                src="/images/logo.webp"
                                alt="Maihan"
                                fill
                                className={`object-contain ${isScrolled ? 'dark:invert' : 'dark:invert'}`}
                            />
                        </div>
                    </Link>

                    {/* 2. ACTIONS (Only 3 Buttons) */}
                    <div className="flex items-center gap-2 md:gap-4">

                        {/* Action 1: Theme */}
                        <button
                            onClick={toggleTheme}
                            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${isScrolled ? 'bg-black/5 dark:bg-white/10 text-black dark:text-white' : 'bg-white/10 backdrop-blur-md text-black dark:text-white'}`}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* Action 2: Contact (Concierge) */}
                        <Link
                            href="/contact"
                            className={`hidden md:flex items-center justify-center p-3 px-6 rounded-full transition-all duration-300 hover:scale-105 ${isScrolled ? 'bg-[#1A1A1A] text-[#b5a16d] dark:bg-white dark:text-[#1A1A1A]' : 'bg-[#1A1A1A] text-[#b5a16d] shadow-lg'}`}
                        >
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Concierge</span>
                        </Link>

                        {/* Action 3: Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className={`flex items-center gap-3 p-3 pl-5 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${isScrolled ? 'bg-[#b5a16d] text-white' : 'bg-[#b5a16d] text-white shadow-lg'}`}
                        >
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium hidden md:block">Menu</span>
                            <Menu size={18} />
                        </button>

                    </div>
                </div>
            </nav>


            {/* --- CINEMATIC FULL SCREEN MENU --- */}
            <div ref={menuRef} className="fixed inset-0 z-[100] hidden">
                <div ref={menuBgRef} className="absolute inset-0 bg-[#F4F1EA] dark:bg-[#0A0A0B] overflow-hidden transition-colors duration-700" style={{ clipPath: 'inset(100% 0% 0% 0%)' }}>

                    {/* BACKGROUND LAYER (Visuals) */}
                    <div className="absolute inset-0 opacity-10 dark:opacity-40 pointer-events-none">
                        {navItems.map((item) => (
                            <div
                                key={item.path}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentImg === item.img ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <img
                                    src={item.img}
                                    alt="Menu Background"
                                    className="w-full h-full object-cover scale-105 brightness-50 blur-[2px] grayscale dark:grayscale-0"
                                />
                            </div>
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F1EA] dark:from-[#0A0A0B] via-[#F4F1EA]/80 dark:via-[#0A0A0B]/50 to-transparent" />
                    </div>

                    {/* CONTENT LAYER */}
                    <div className="relative z-10 w-full h-full flex flex-col md:flex-row">

                        {/* LEFT: Navigation Links */}
                        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-24 pt-20">

                            <div className="flex flex-col gap-2">
                                {/* Header / Close for Mobile */}
                                <div className="md:hidden flex justify-between items-center mb-12 menu-meta">
                                    <div className="relative w-24 h-8">
                                        <Image src="/images/logo.webp" alt="Maihan" fill className="object-contain dark:invert" />
                                    </div>
                                    <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-black/5 dark:bg-white/10 rounded-full text-[#1A1A1A] dark:text-white">
                                        <X size={20} />
                                    </button>
                                </div>

                                {navItems.map((item, index) => {
                                    const isActive = pathname === item.path;
                                    return (
                                        <Link
                                            key={index}
                                            href={item.path}
                                            className="nav-link-item group relative py-4 lg:py-6 flex items-center justify-between border-b border-[#1A1A1A]/10 dark:border-white/10"
                                            onMouseEnter={() => setHoveredLink(item.img)}
                                            onMouseLeave={() => setHoveredLink(null)}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <div className="relative flex items-baseline gap-6 transition-transform duration-500 group-hover:translate-x-4">
                                                <span className={`font-mono text-xs transition-colors duration-300 ${isActive ? 'text-[#b5a16d]' : 'text-[#b5a16d]/70 dark:text-[#b5a16d]'}`}>
                                                    0{index + 1}
                                                </span>
                                                <span
                                                    className={`font-serif text-4xl md:text-6xl transition-all duration-300 ${isActive
                                                        ? 'text-[#b5a16d] italic'
                                                        : 'text-[#1A1A1A] dark:text-white group-hover:text-[#b5a16d] group-hover:italic'
                                                        } ${hoveredLink === item.img ? 'text-[#b5a16d] italic drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]' : ''}`}
                                                >
                                                    {item.name}
                                                </span>

                                                {/* Center-Outwards Underline: Visible if Active OR Hovered */}
                                                <span
                                                    className={`absolute -bottom-2 left-0 w-full h-[1px] bg-[#b5a16d] origin-center transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                                                />
                                            </div>

                                            {/* Arrow Indicator */}
                                            <ArrowRight className={`text-[#b5a16d] transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Footer Meta */}
                            <div className="menu-meta mt-16 flex justify-between items-end text-[#1A1A1A]/60 dark:text-white/40">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] uppercase tracking-widest">Contact</span>
                                    <span className="font-serif text-lg text-[#1A1A1A] dark:text-white">rare@maihangroup.com</span>
                                </div>
                                <div className="hidden md:flex flex-col gap-2">
                                    <span className="text-[10px] uppercase tracking-widest">Follow Us</span>
                                    <div className="flex gap-4 text-xs font-medium text-[#1A1A1A] dark:text-white">
                                        <span>IG</span>
                                        <span>LI</span>
                                        <span>TW</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Visual Preview (Desktop) & Close/Theme Buttons */}
                        <div className="hidden md:flex w-1/2 h-full flex-col justify-center items-center relative p-12 lg:p-16 border-l border-[#1A1A1A]/5 dark:border-white/5 bg-[#F9F8F4]/50 dark:bg-white/[0.02] backdrop-blur-sm">

                            {/* Top Right Actions: Theme & Close */}
                            <div className="absolute top-12 right-12 flex items-center gap-4">
                                <button
                                    onClick={toggleTheme}
                                    className="menu-button-close p-3 rounded-full bg-[#1A1A1A]/5 dark:bg-white/5 hover:bg-[#b5a16d] hover:text-white transition-all duration-300 text-[#1A1A1A] dark:text-white"
                                >
                                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                </button>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="menu-button-close group flex items-center gap-3 px-6 py-3 rounded-full bg-[#1A1A1A]/5 dark:bg-white/5 hover:bg-[#b5a16d] transition-all duration-300"
                                >
                                    <span className="text-[10px] tracking-widest uppercase text-[#1A1A1A] dark:text-white group-hover:text-white font-medium">Close</span>
                                    <X size={16} className="text-[#1A1A1A] dark:text-white group-hover:text-white" />
                                </button>
                            </div>

                            {/* Floating Card Preview - Center Vertically */}
                            <div className="menu-meta relative w-full aspect-[4/5] max-w-md hidden lg:block overflow-hidden rounded-sm border border-[#1A1A1A]/10 dark:border-white/10 shadow-2xl">
                                {navItems.map((item) => (
                                    <img
                                        key={item.path}
                                        src={item.img}
                                        alt={item.name}
                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${currentImg === item.img ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                                    />
                                ))}
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                                    <span className="text-[#b5a16d] font-mono text-xs mb-2 tracking-widest uppercase">Featured Collection</span>
                                    <h3 className="text-white font-serif text-3xl italic">
                                        {hoveredLink
                                            ? navItems.find(n => n.img === hoveredLink)?.name
                                            : "The Collection"}
                                    </h3>
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
