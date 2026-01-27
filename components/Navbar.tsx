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

    // --- Dynamic Styles ---
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

    // Force dark text/border inside menu context if needed, but our menu is a takeover
    // so we handle menu coloring locally within the menu render.

    const navLinks = [
        {
            name: 'Home',
            path: '/',
            image: "https://images.unsplash.com/photo-1620218151276-8575084934e6?auto=format&fit=crop&q=80&w=1200",
            desc: "Provenance"
        },
        {
            name: 'Products',
            path: '/gemstones',
            image: "https://images.unsplash.com/photo-1615486511484-92e57bb6eb64?auto=format&fit=crop&q=80&w=1200",
            desc: "The Vault"
        },
        {
            name: 'About',
            path: '/about',
            image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=1200",
            desc: "Legacy"
        },
        {
            name: 'Contact',
            path: '/book',
            image: "https://images.unsplash.com/photo-1549488497-217e3350160a?auto=format&fit=crop&q=80&w=1200",
            desc: "Concierge"
        },
    ];

    const activeImage = hoveredLink
        ? navLinks.find(l => l.name === hoveredLink)?.image
        : navLinks.find(l => l.path === pathname)?.image || navLinks[0].image;

    // GSAP Refs
    const sunRef = useRef(null);
    const moonRef = useRef(null);
    const menuRef = useRef(null);
    const containerRef = useRef(null);
    const navContentRef = useRef(null); // To hide navbar content

    // Theme Icon Animation
    useGSAP(() => {
        if (theme === 'dark') {
            // Sun Exit / Moon Enter
            gsap.to(sunRef.current, { rotation: 180, scale: 0, opacity: 0, duration: 0.5 });
            gsap.fromTo(moonRef.current, { rotation: -180, scale: 0, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: 0.5, delay: 0.1 });
        } else {
            // Moon Exit / Sun Enter
            gsap.to(moonRef.current, { rotation: 180, scale: 0, opacity: 0, duration: 0.5 });
            gsap.fromTo(sunRef.current, { rotation: -180, scale: 0, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: 0.5, delay: 0.1 });
        }
    }, [theme]);

    // Menu Open/Close Animation
    useGSAP(() => {
        if (!menuRef.current || !navContentRef.current) return;

        if (isMenuOpen) {
            gsap.set(menuRef.current, { pointerEvents: "auto" });

            gsap.to(navContentRef.current, {
                y: -24,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out",
            });

            gsap.fromTo(
                menuRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                }
            );

            gsap.fromTo(
                ".menu-bg-image",
                { opacity: 0, scale: 1.02 },
                {
                    opacity: 0.35,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out",
                    stagger: 0.05,
                }
            );

            gsap.fromTo(
                ".menu-content-stagger",
                { y: 24, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power2.out",
                    stagger: 0.08,
                    delay: 0.1,
                }
            );

            gsap.fromTo(
                ".menu-close-btn",
                { opacity: 0, scale: 0.9, rotate: 4 },
                {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    duration: 0.35,
                    ease: "power2.out",
                    delay: 0.1,
                }
            );
        } else {
            gsap.to(".menu-content-stagger", {
                y: 16,
                opacity: 0,
                duration: 0.4,
                ease: "power2.inOut",
                stagger: 0.06,
            });

            gsap.to(".menu-close-btn", {
                opacity: 0,
                scale: 0.9,
                rotate: -4,
                duration: 0.3,
                ease: "power2.inOut",
            });

            gsap.to(menuRef.current, {
                opacity: 0,
                duration: 0.45,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(menuRef.current, { pointerEvents: "none" });
                },
            });

            gsap.to(navContentRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                clearProps: "all",
                delay: 0.05,
            });
        }
    }, [isMenuOpen]);

    return (
        <>
            {/* --- MAIN NAVBAR --- */}
            <nav
                ref={containerRef}
                className={`fixed top-0 left-0 w-full z-[900] px-8 md:px-12 py-8 transition-all duration-700 ${isScrolled ? 'py-4 backdrop-blur-md bg-white/5 dark:bg-black/20' : ''
                    }`}
            >
                {/* Navbar Inner Content Container (to animate out) */}
                <div ref={navContentRef} className="flex justify-between items-center w-full relative z-[901]">

                    {/* Brand */}
                    <Link href="/" className={`group flex items-center gap-6 ${effectiveTextColorClass} transition-colors duration-500`}>
                        <span className="text-2xl md:text-3xl tracking-[0.05em] font-serif uppercase leading-none transition-all duration-700 group-hover:tracking-[0.1em] font-light italic text-shadow-sm">
                            Maihan Group
                        </span>
                        <div className="hidden md:flex flex-col gap-[2px]">
                            <span className="w-1 h-1 rounded-full bg-current opacity-40"></span>
                            <span className="w-1 h-1 rounded-full bg-current opacity-40"></span>
                        </div>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-8 md:gap-12">
                        {/* Enhanced Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`relative w-12 h-12 flex items-center justify-center rounded-full border border-transparent hover:border-current/20 ${effectiveTextColorClass} transition-all duration-500`}
                            aria-label="Toggle Theme"
                        >
                            <div className="absolute inset-0 flex items-center justify-center p-3" ref={sunRef}>
                                {/* Detailed Sun */}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full stroke-[1.5]">
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center p-3 opacity-0" ref={moonRef}>
                                {/* Detailed Moon */}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full stroke-[1.5]">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                    <path d="M12 2v0 M12 22v0 M2 12h0 M22 12h0" className="opacity-0" /> {/* Spacer */}
                                </svg>
                            </div>
                        </button>

                        {/* Text "Menu" Button */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className={`group flex items-center gap-3 ${effectiveTextColorClass} focus:outline-none`}
                        >
                            <span className="hidden md:block text-[10px] tracking-[0.2em] uppercase font-light group-hover:tracking-[0.3em] transition-all">Menu</span>
                            <div className="flex flex-col gap-[6px] items-end w-8">
                                <span className="w-full h-[1px] bg-current transition-all group-hover:w-1/2"></span>
                                <span className="w-2/3 h-[1px] bg-current transition-all group-hover:w-full"></span>
                                <span className="w-full h-[1px] bg-current transition-all group-hover:w-1/2"></span>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- FULL SCREEN OVERLAY MENU --- */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-[1000] pointer-events-none opacity-0 overflow-hidden"
            >
                <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md" />

                <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                    {navLinks.map((link) => (
                        <Image
                            key={link.name}
                            src={link.image}
                            alt={link.name}
                            fill
                            className={`menu-bg-image object-cover transition-opacity duration-1000 ease-in-out mix-blend-overlay ${activeImage === link.image ? 'opacity-40' : 'opacity-0'
                                }`}
                        />
                    ))}
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                {/* 3. CLOSE BUTTON */}
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="menu-close-btn absolute top-8 right-8 md:top-12 md:right-12 z-[1200] w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:text-white transition-all duration-300 ease-[var(--easing-standard)] opacity-0 scale-100"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 stroke-[1.5]">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* 4. MAIN LAYOUT */}
                <div className="absolute inset-0 z-50 flex flex-col md:flex-row h-full w-full p-8 md:p-20 text-[#FBFBF9]">

                    {/* Left: Info */}
                    <div className="hidden md:flex flex-col justify-end w-1/4 pb-10">
                        <div className="menu-content-stagger space-y-8 opacity-0 translate-y-8">
                            <div>
                                <span className="block text-eyebrow opacity-40 mb-2">Connect</span>
                                <p className="text-body font-light opacity-80">concierge@tcraft.com</p>
                            </div>
                            <div>
                                <span className="block text-eyebrow opacity-40 mb-2">Social</span>
                                <div className="flex gap-4 text-body font-light opacity-80">
                                    <span className="hover:text-amber-400 cursor-pointer transition-colors duration-300 ease-[var(--easing-standard)]">Instagram</span>
                                    <span className="hover:text-amber-400 cursor-pointer transition-colors duration-300 ease-[var(--easing-standard)]">Twitter</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center: HUGE LINKS */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <ul className="space-y-2 md:space-y-6 text-center">
                            {navLinks.map((link, i) => (
                                <li key={link.name} className="menu-content-stagger overflow-hidden opacity-0 translate-y-12">
                                    <Link
                                        href={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        onMouseEnter={() => setHoveredLink(link.name)}
                                        className={`block leading-[0.9] font-serif font-light tracking-tight transition-all duration-500
                                            ${pathname === link.path
                                                ? 'italic text-white scale-110 translate-x-4'
                                                : 'text-white/40 hover:text-white hover:italic hover:scale-105 hover:translate-x-2'
                                            }
                                            text-5xl md:text-[8vw]
                                        `}
                                    >
                                        {link.name}
                                    </Link>
                                    <span className={`block text-[10px] tracking-[0.6em] uppercase mt-2 font-sans transition-opacity duration-500 ${pathname === link.path ? 'opacity-100 text-amber-400' : 'opacity-30'}`}>
                                        {link.desc}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Meta */}
                    <div className="hidden md:flex flex-col justify-between items-end w-1/4 pb-10">
                        <div className="menu-content-stagger opacity-0 translate-y-8 text-right">
                            <span className="block text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Location</span>
                            <p className="text-sm font-light opacity-80">Geneva, Switzerland</p>
                            <p className="text-sm font-light opacity-80 underline decoration-white/20 underline-offset-4 mt-2">View Map</p>
                        </div>
                        <div className="menu-content-stagger opacity-0 translate-y-8 text-right">
                            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center text-[10px] uppercase tracking-widest opacity-50 animate-[spin_10s_linear_infinite]">
                                Est. 82
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Navbar;
