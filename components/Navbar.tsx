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
    const menuRef = useRef(null);

    useGSAP(() => {
        // Theme Toggle Animation
        if (theme === 'dark') {
            gsap.to(sunRef.current, { y: 20, opacity: 0, scale: 0.5, duration: 0.5, ease: "power2.in" });
            gsap.fromTo(moonRef.current, { y: -20, opacity: 0, scale: 0.5 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay: 0.2 });
        } else {
            gsap.to(moonRef.current, { y: -20, opacity: 0, scale: 0.5, duration: 0.5, ease: "power2.in" });
            gsap.fromTo(sunRef.current, { y: 20, opacity: 0, scale: 0.5 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay: 0.2 });
        }
    }, [theme]);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

        if (isMenuOpen) {
            // OPEN Sequence
            gsap.set(menuRef.current, { pointerEvents: "auto", opacity: 1 });

            tl.to(".menu-bg", { y: "0%", duration: 0.8, ease: "power4.inOut" })
                .to(".menu-panel", { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.3")
                .to(".menu-link", { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 }, "-=0.4")
                .to(".menu-close", { opacity: 1, duration: 0.5 }, "-=0.5");
        } else {
            // CLOSE Sequence
            tl.to(".menu-close", { opacity: 0, duration: 0.3 })
                .to(".menu-link", { y: 10, opacity: 0, duration: 0.3, stagger: 0.02 }, "-=0.2")
                .to(".menu-panel", { y: 20, opacity: 0, duration: 0.4, stagger: 0.05 }, "-=0.2")
                .to(".menu-bg", { y: "100%", duration: 0.6, ease: "power4.inOut" })
                .set(menuRef.current, { pointerEvents: "none", opacity: 0 }); // Hide container after anim
        }

    }, [isMenuOpen]);

    return (
        <>
            <nav
                className={`fixed top-8 left-0 w-full z-[900] px-8 md:px-12 py-8 flex justify-between items-center transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${isScrolled ? 'backdrop-blur-[20px] bg-white/70 dark:bg-black/70 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-4' : ''
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
                        {/* Theme Toggle - Abstract Eclipse */}
                        <button
                            onClick={toggleTheme}
                            className={`relative w-10 h-10 flex items-center justify-center rounded-full border ${effectiveBorderColorClass} ${effectiveTextColorClass} group/theme overflow-hidden transition-all duration-700 hover:border-current/40 hover:scale-105`}
                            aria-label="Toggle Atmosphere"
                        >
                            <div className="absolute inset-0 flex items-center justify-center" ref={sunRef}>
                                {/* Abstract Sun: Solid Circle with Ring */}
                                <div className="w-2 h-2 bg-current rounded-full shadow-[0_0_10px_currentColor] opacity-80" />
                                <div className="absolute w-5 h-5 border border-current opacity-20 rounded-full scale-0 group-hover/theme:scale-100 transition-transform duration-500" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transform translate-y-[-20px]" ref={moonRef}>
                                {/* Abstract Moon: Eclipse Ring */}
                                <div className="w-3 h-3 border border-current rounded-full" />
                                <div className="w-1 h-1 bg-current rounded-full absolute -top-1 right-0 opacity-50" />
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
                ref={menuRef} // Using GSAP ref control
                className={`fixed inset-0 z-[1000] pointer-events-none opacity-0`} // Raised Z-Index to cover Marquee (800) and Navbar (900)
            >
                {/* Background */}
                <div className="menu-bg absolute inset-0 bg-[#FBFBF9] dark:bg-[#0A0A0A] translate-y-full overflow-hidden">
                    {/* Abstract Floating Elements for Menu */}
                    <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-900/5 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/5 opacity-20 pointer-events-none scale-[0.9]" />
                </div>

                {/* Close Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // Trigger close animation via state change effect (handled below)
                        setIsMenuOpen(false);
                        setHoveredLink(null);
                    }}
                    className={`menu-close absolute top-10 right-8 md:top-14 md:right-20 group w-24 h-24 flex flex-col items-center justify-center ${textColorClass} z-[1050] cursor-pointer hover:opacity-100 opacity-0`}
                    aria-label="Close Menu"
                >
                    <div className="relative w-12 h-12 flex items-center justify-center pointer-events-none">
                        <span className="absolute w-full h-[1px] bg-current rotate-45 transition-all duration-700 group-hover:rotate-[135deg]"></span>
                        <span className="absolute w-full h-[1px] bg-current -rotate-45 transition-all duration-700 group-hover:-rotate-[135deg]"></span>
                    </div>
                </button>

                {/* Content Grid */}
                <div className={`h-full w-full flex flex-col md:flex-row ${textColorClass} relative z-10`}>

                    {/* LEFT PANEL: Brand Details & Info */}
                    <div className="menu-panel hidden md:flex flex-col justify-between w-1/4 h-full p-16 border-r border-[#646464]/10 opacity-0 translate-y-20">
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
                                        className="relative group/navitem flex items-center gap-8 menu-link opacity-0 translate-y-10" // Stagger target
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
                    <div className="menu-panel hidden md:flex w-1/3 h-full items-center justify-center p-16 bg-[#FBFBF9] dark:bg-[#0C0C0C] transition-colors duration-500 opacity-0 translate-y-20">
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
