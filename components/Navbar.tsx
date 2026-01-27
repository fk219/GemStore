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
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
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

    // Luxury Menu Animation
    useGSAP(() => {
        if (isMenuOpen) {
            const tl = gsap.timeline();
            tl.to(menuRef.current, { display: 'block', duration: 0 })
                .to(menuBgRef.current, {
                    clipPath: 'circle(150% at 100% 0%)',
                    duration: 1.8, // Slower for luxury feel
                    ease: 'cubic-bezier(0.16, 1, 0.3, 1)' // Luxury easing
                })
                .from('.menu-item', {
                    y: 12, // Reduced from 80 for subtlety
                    opacity: 0,
                    stagger: 0.12, // Increased stagger
                    duration: 1.5, // Slower reveal
                    ease: 'cubic-bezier(0.16, 1, 0.3, 1)'
                }, "-=1.2");
        } else {
            gsap.to(menuBgRef.current, {
                clipPath: 'circle(0% at 100% 0%)',
                duration: 1.5, // Slower close
                ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
                onComplete: () => gsap.set(menuRef.current, { display: 'none' })
            });
        }
    }, { dependencies: [isMenuOpen] });

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    if (!themeCtx || !langCtx) return null;

    const { theme, toggleTheme } = themeCtx;
    const { locale, setLocale } = langCtx;

    // Navigation items with images
    const navItems = [
        { name: 'Home', path: '/', img: 'https://images.unsplash.com/photo-1615111784767-4d7c02783103?auto=format&fit=crop&q=80&w=800' },
        { name: 'Gemstones', path: '/gemstones', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800' },
        { name: 'About', path: '/about', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800' },
        { name: 'Contact', path: '/book', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800' }
    ];

    // Dynamic theme colors
    const accentColor = theme === 'dark' ? '#b5a16d' : '#8B7355';
    const bgColor = theme === 'dark' ? 'bg-[#0F0F0F]/80' : 'bg-[#FBFBF9]/80';
    const textColor = theme === 'dark' ? 'text-[#FBFBF9]' : 'text-[#1A1A1A]';
    const borderColor = theme === 'dark' ? 'border-[#b5a16d]/20' : 'border-[#8B7355]/20';

    return (
        <>
            <nav className="fixed top-8 left-0 w-full z-[60] pointer-events-none">
                <div className={`mx-auto px-6 py-6 transition-all duration-1000 flex items-center justify-between pointer-events-auto ${isScrolled
                        ? `mt-4 max-w-4xl ${bgColor} backdrop-blur-xl ${borderColor} border rounded-full py-3 px-8 shadow-2xl`
                        : 'max-w-7xl pt-8'
                    }`}>
                    <Link href="/" className="flex items-center gap-2 group">
                        <Diamond
                            className={`transition-all duration-1000 ${isScrolled ? 'w-5 h-5' : 'w-8 h-8'} group-hover:rotate-45`}
                            style={{ color: accentColor }}
                        />
                        <span
                            className={`font-serif tracking-[0.3em] uppercase transition-all duration-1000 ${isScrolled ? 'text-sm' : 'text-2xl'}`}
                            style={{ color: accentColor }}
                        >
                            Timeless Craft
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 ${textColor} transition-all duration-700 hover:opacity-60`}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <button
                            className={`group flex items-center gap-3 py-2 px-5 ${borderColor} border rounded-full transition-all duration-700 hover:shadow-lg`}
                            style={{
                                backgroundColor: 'transparent',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = accentColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <span
                                className={`text-[10px] uppercase tracking-[0.2em] font-bold ${textColor} group-hover:text-[#1A1A1A] transition-colors duration-700`}
                            >
                                Menu
                            </span>
                            <div className="flex flex-col gap-1 w-4 overflow-hidden">
                                <div
                                    className="h-[1px] w-full transition-colors duration-700"
                                    style={{ backgroundColor: accentColor }}
                                ></div>
                                <div
                                    className="h-[1px] w-1/2 ml-auto transition-colors duration-700"
                                    style={{ backgroundColor: accentColor }}
                                ></div>
                            </div>
                        </button>
                    </div>

                    <button
                        className="lg:hidden p-3 rounded-full shadow-lg"
                        style={{ backgroundColor: accentColor, color: '#1A1A1A' }}
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </nav>

            {/* Luxury Full-Screen Menu */}
            <div ref={menuRef} className="fixed inset-0 z-[100] hidden">
                <div
                    ref={menuBgRef}
                    className={`absolute inset-0 ${theme === 'dark' ? 'bg-[#0A0A0B]' : 'bg-[#1A1A1A]'}`}
                    style={{ clipPath: 'circle(0% at 100% 0%)' }}
                >
                    <div className="relative w-full h-full flex flex-col lg:flex-row overflow-hidden">
                        {/* Left Side - Navigation */}
                        <div className="w-full lg:w-3/5 h-full flex flex-col justify-between p-12 lg:p-24 relative z-10">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-20">
                                <Link href="/" className="flex items-center gap-2">
                                    <Diamond className="w-6 h-6" style={{ color: accentColor }} />
                                    <span className="font-serif text-xl tracking-[0.3em] uppercase" style={{ color: accentColor }}>
                                        Timeless Craft
                                    </span>
                                </Link>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="group flex items-center gap-4 transition-colors duration-700"
                                    style={{ color: accentColor }}
                                >
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Close Menu</span>
                                    <div
                                        className="w-10 h-10 flex items-center justify-center border rounded-full transition-all duration-700 group-hover:border-white"
                                        style={{ borderColor: `${accentColor}33` }}
                                    >
                                        <X size={18} />
                                    </div>
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <div className="flex flex-col space-y-6 lg:space-y-4">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        className="menu-item group flex items-center gap-10"
                                        onMouseEnter={() => setHoveredLink(item.img)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                    >
                                        <span
                                            className="font-serif text-sm lg:text-lg italic transition-colors duration-700"
                                            style={{ color: `${accentColor}4D` }}
                                        >
                                            0{index + 1}
                                        </span>
                                        <h2
                                            className="font-serif text-5xl lg:text-[8vw] leading-[1] text-white/40 group-hover:text-white transition-all group-hover:italic group-hover:translate-x-5 duration-1000 uppercase tracking-tight"
                                        >
                                            {item.name}
                                        </h2>
                                    </Link>
                                ))}
                            </div>

                            {/* Footer Info */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-20 mt-12 border-t border-white/5">
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest mb-4" style={{ color: accentColor }}>
                                        Location
                                    </h4>
                                    <p className="text-white/60 text-xs font-sans leading-relaxed">
                                        Mayfair District<br />London, UK
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest mb-4" style={{ color: accentColor }}>
                                        Inquiries
                                    </h4>
                                    <p className="text-white/60 text-xs font-sans leading-relaxed">
                                        rare@timelesscraft.com
                                    </p>
                                </div>
                                <div className="flex items-end lg:justify-end lg:col-span-2">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setLocale(locale === 'EN' ? 'FR' : 'EN')}
                                            className="text-[10px] font-bold text-white/40 hover:opacity-100 uppercase flex items-center gap-2 transition-all duration-700"
                                            style={{ color: accentColor }}
                                        >
                                            <Languages size={14} /> {locale}
                                        </button>
                                        <button
                                            className="text-[10px] font-bold text-white/40 transition-all duration-700"
                                            style={{ color: accentColor }}
                                        >
                                            IG
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Dynamic Image */}
                        <div className="hidden lg:flex w-2/5 h-full items-center justify-center p-24 border-l border-white/5 relative" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl group">
                                <img
                                    src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=1200"
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-20"
                                    alt=""
                                />
                                {navItems.map((item) => (
                                    <img
                                        key={item.img}
                                        src={item.img}
                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1500 ${hoveredLink === item.img ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-110 rotate-3'}`}
                                        alt=""
                                    />
                                ))}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                                    <div
                                        className="w-16 h-16 border rounded-full flex items-center justify-center animate-pulse mb-6"
                                        style={{ borderColor: `${accentColor}80` }}
                                    >
                                        <Diamond className="w-6 h-6" style={{ color: accentColor }} />
                                    </div>
                                    <h3 className="text-white font-serif text-2xl italic tracking-wide mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-1500">
                                        Rare by Nature
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
