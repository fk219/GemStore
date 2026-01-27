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
        const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

        if (isMenuOpen) {
            // 1. Hide Navbar Content
            gsap.to(navContentRef.current, { y: -100, opacity: 0, duration: 0.5 });

            // 2. Menu Reveal Sequence
            gsap.set(menuRef.current, { pointerEvents: "auto", opacity: 1 });

            // Background curtains (Split reveal)
            tl.to(".menu-curtain-left", { scaleY: 1, duration: 0.8, ease: "expo.inOut" })
                .to(".menu-curtain-right", { scaleY: 1, duration: 0.8, ease: "expo.inOut" }, "<")

                // Image/Content Fade In
                .fromTo(".menu-bg-image", { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 0.4, duration: 1.5 }, "-=0.4")
                .to(".menu-content-stagger", { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=1")

                // Close Button Reveal
                .to(".menu-close-btn", { scale: 1, opacity: 1, rotate: 0, duration: 0.5 }, "-=0.5");

        } else {
            // Close Sequence
            tl.to(".menu-close-btn", { scale: 0, rotate: 90, duration: 0.4 })
                .to(".menu-content-stagger", { y: 50, opacity: 0, duration: 0.4, stagger: 0.05 }, "-=0.2")
                .to(".menu-bg-image", { opacity: 0, duration: 0.5 }, "-=0.4")

                .to(".menu-curtain-left", { scaleY: 0, duration: 0.8, ease: "expo.inOut" }, "-=0.2")
                .to(".menu-curtain-right", { scaleY: 0, duration: 0.8, ease: "expo.inOut" }, "<")

                .set(menuRef.current, { pointerEvents: "none", opacity: 0 })

                // Bring back Navbar Content
                .to(navContentRef.current, { y: 0, opacity: 1, duration: 0.5, clearProps: "all" }, "-=0.5");
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
                            T.Craft
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
                {/* 1. Backdrop Curtains (Top/Bottom or Left/Right split) */}
                <div className="absolute inset-0 flex">
                    {/* Left Curtain */}
                    <div className="menu-curtain-left w-1/2 h-full bg-[#050505] origin-bottom transform scale-y-0 relative z-10 border-r border-white/5"></div>
                    {/* Right Curtain */}
                    <div className="menu-curtain-right w-1/2 h-full bg-[#050505] origin-bottom transform scale-y-0 relative z-10"></div>
                </div>

                {/* 2. Dynamic Background Image Layer (Behind content, In front of curtains?) 
                    Wait, if curtains are z-10, this should be z-20? No, we want curtains to REVEAL this.
                    Actually, let's make curtains backdrop color, and this image sits ON TOP but fades in?
                    Or, curtains are the background. Image fades in over them.
                */}
                <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
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
                    <div className="absolute inset-0 bg-black/60" /> {/* Darken overlay */}
                </div>

                {/* 3. CLOSE BUTTON */}
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="menu-close-btn absolute top-8 right-8 md:top-12 md:right-12 z-[1200] w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors opacity-0 scale-0"
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
                                <span className="block text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Connect</span>
                                <p className="text-sm font-light opacity-80">concierge@tcraft.com</p>
                            </div>
                            <div>
                                <span className="block text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Social</span>
                                <div className="flex gap-4 text-sm font-light opacity-80">
                                    <span className="hover:text-amber-400 cursor-pointer transition-colors">Instagram</span>
                                    <span className="hover:text-amber-400 cursor-pointer transition-colors">Twitter</span>
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
