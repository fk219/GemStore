"use client";

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { LanguageContext } from '@/app/providers';

const Footer: React.FC = () => {
    const langCtx = useContext(LanguageContext);
    const [email, setEmail] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    if (!langCtx) return null;
    const { t } = langCtx;

    const footerLinks = {
        gemstones: {
            title: 'GEMSTONES',
            links: [
                { label: 'Ruby', href: '/gemstones' },
                { label: 'Sapphire', href: '/gemstones' },
                { label: 'Emerald', href: '/gemstones' },
            ]
        },
        resources: {
            title: 'RESOURCES',
            links: [
                { label: 'Origins', href: '/origins' },
                { label: 'Blog', href: '/blog' },
                { label: 'Documentation', href: '/docs' },
            ]
        },
        company: {
            title: 'COMPANY',
            links: [
                { label: 'About Us', href: '/about' },
                { label: 'Careers', href: '/careers' },
                { label: 'Partners', href: '/partners' },
            ]
        },
        legal: {
            title: 'LEGAL',
            links: [
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Cookies Policy', href: '/cookies' },
            ]
        },
    };

    return (
        <footer className="relative bg-[#0A0A0B] text-white overflow-hidden">
            {/* Newsletter Section */}
            <div className="border-b border-white/10">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div className="flex-1 max-w-2xl">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full bg-transparent text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white placeholder:text-white/30 focus:outline-none border-b border-white/20 pb-4 focus:border-[#b5a16d] transition-colors duration-500"
                                />
                            </div>
                            <p className="text-sm text-white/40 mt-6 tracking-wide">
                                By subscribing, you agree to our{' '}
                                <Link href="/terms" className="text-white/60 hover:text-[#b5a16d] transition-colors underline underline-offset-4">
                                    terms & conditions
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-white/60 hover:text-[#b5a16d] transition-colors underline underline-offset-4">
                                    privacy policy
                                </Link>.
                            </p>
                        </div>
                        <button
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="group flex items-center gap-4 px-8 py-4 rounded-full border border-white/20 hover:bg-white hover:text-[#0A0A0B] transition-all duration-500"
                        >
                            <span className="text-xs tracking-[0.3em] uppercase font-medium">Get Started</span>
                            <svg
                                className={`w-5 h-5 transition-transform duration-500 ${isHovered ? 'translate-x-1' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
                <div className="grid grid-cols-12 gap-8 md:gap-12">
                    {/* Brand Section */}
                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[#b5a16d]/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-[#b5a16d]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <span className="text-2xl font-serif tracking-wide">
                                <span className="text-[#b5a16d]">M</span>AIHAN
                            </span>
                        </div>
                        <p className="text-sm text-white/40 mb-8">
                            © 2025 Maihan Group. All rights reserved.
                        </p>

                        {/* Contact & Social */}
                        <div className="space-y-8 pt-8 border-t border-white/10">
                            <div>
                                <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 block mb-3">Contact</span>
                                <a href="mailto:support@maihangroup.com" className="text-lg font-light text-white/80 hover:text-[#b5a16d] transition-colors">
                                    support@maihangroup.com
                                </a>
                            </div>
                            <div>
                                <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 block mb-3">Social</span>
                                <div className="flex items-center gap-2 text-lg font-light text-white/80">
                                    <a href="#" className="hover:text-[#b5a16d] transition-colors">LinkedIn</a>
                                    <span className="text-white/20">/</span>
                                    <a href="#" className="hover:text-[#b5a16d] transition-colors">Twitter</a>
                                    <span className="text-white/20">/</span>
                                    <a href="#" className="hover:text-[#b5a16d] transition-colors">Instagram</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="col-span-12 md:col-span-8 lg:col-span-9">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {Object.values(footerLinks).map((section, idx) => (
                                <div key={idx}>
                                    <h4 className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">
                                        {section.title}
                                    </h4>
                                    <ul className="space-y-4">
                                        {section.links.map((link, linkIdx) => (
                                            <li key={linkIdx}>
                                                <Link
                                                    href={link.href}
                                                    className="text-sm text-white/70 hover:text-[#b5a16d] transition-colors duration-300 block"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Large Brand Watermark */}
            <div className="relative overflow-hidden border-t border-white/5">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 pt-16 pb-8">
                    {/* Background Large Text */}
                    <div className="relative">
                        <h2 className="text-[18vw] md:text-[15vw] lg:text-[12vw] font-serif font-light tracking-[-0.02em] leading-[0.85] text-transparent bg-clip-text select-none"
                            style={{
                                WebkitTextStroke: '1px rgba(255,255,255,0.08)',
                            }}
                        >
                            MAIHAN GROUP
                        </h2>
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/50 to-transparent pointer-events-none" />
                    </div>

                    {/* Bottom Credit */}
                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">
                            Crafted with precision
                        </p>
                        <p className="text-xs text-white/40">
                            Designed by{' '}
                            <a
                                href="https://www.fkodelabs.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#b5a16d] hover:text-white transition-colors border-b border-[#b5a16d]/30 hover:border-white pb-0.5"
                            >
                                fkodelabs
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
