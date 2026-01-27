"use client";

import React, { useContext, useState, useRef } from 'react';
import Link from 'next/link';
import { LanguageContext } from '@/app/providers';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'motion/react';

const Footer: React.FC = () => {
    const langCtx = useContext(LanguageContext);
    const [email, setEmail] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    // Mouse tracking for subtle spotlight effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

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
                { label: 'Journal', href: '/blog' },
                { label: 'Atelier', href: '/docs' },
            ]
        },
        company: {
            title: 'MAISON',
            links: [
                { label: 'Heritage', href: '/about' },
                { label: 'Careers', href: '/careers' },
                { label: 'Boutiques', href: '/partners' },
            ]
        },
        legal: {
            title: 'LEGAL',
            links: [
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Cookies', href: '/cookies' },
            ]
        },
    };

    return (
        <footer
            className="relative bg-[#050505] text-white overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Golden Glow - Top Right */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b5a16d] opacity-[0.03] blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                {/* Deep Blue/Purple Glow - Bottom Left */}
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1a1a2e] opacity-[0.4] blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />

                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
                />
            </div>

            {/* Newsletter Section */}
            <div className="relative border-b border-white/5 backdrop-blur-sm z-10">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-24">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-12">
                        <div className="flex-1 max-w-2xl">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-2xl md:text-3xl font-serif font-light mb-8 text-[#b5a16d]"
                            >
                                Join the Inner Circle
                            </motion.h3>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full bg-transparent text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white placeholder:text-white/20 focus:outline-none py-6 border-b border-white/10 group-hover:border-white/30 focus:border-[#b5a16d] transition-all duration-700"
                                />
                                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b5a16d] transition-all duration-700 group-hover:w-full" />
                            </div>
                            <p className="text-xs text-white/30 mt-6 tracking-widest uppercase">
                                By subscribing, you agree to our{' '}
                                <Link href="/terms" className="text-white/50 hover:text-[#b5a16d] transition-colors">
                                    terms
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-white/50 hover:text-[#b5a16d] transition-colors">
                                    privacy policy
                                </Link>.
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="group relative px-10 py-5 overflow-hidden"
                        >
                            <div className="absolute inset-0 border border-white/20 group-hover:border-[#b5a16d]/50 transition-colors duration-500" />
                            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 will-change-transform" />

                            <div className="relative flex items-center gap-4">
                                <span className="text-sm tracking-[0.3em] uppercase font-light group-hover:text-[#b5a16d] transition-colors duration-500">Subscribe</span>
                                <span className={`transition-transform duration-500 ${isHovered ? 'translate-x-2 text-[#b5a16d]' : 'text-white/50'}`}>
                                    →
                                </span>
                            </div>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-28 z-10">
                <div className="grid grid-cols-12 gap-12 md:gap-16">
                    {/* Brand Section */}
                    <div className="col-span-12 md:col-span-4 flex flex-col justify-between">
                        <div>
                            {/* Logo */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="flex items-center gap-4 mb-10"
                            >
                                <div className="w-12 h-12 border border-[#b5a16d]/30 flex items-center justify-center rotate-45">
                                    <div className="w-8 h-8 border border-[#b5a16d]/60 -rotate-45 flex items-center justify-center">
                                        <div className="w-1 h-1 bg-[#b5a16d] rounded-full" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-serif tracking-widest text-white">MAIHAN</span>
                                    <span className="text-[10px] tracking-[0.4em] text-[#b5a16d] uppercase">Group</span>
                                </div>
                            </motion.div>

                            <div className="space-y-6">
                                <p className="text-sm font-light text-white/50 leading-relaxed max-w-xs">
                                    Curating the world's most exceptional gemstones for the discerning collector.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 md:mt-24 space-y-4">
                            <div className="flex items-center gap-6">
                                {['LinkedIn', 'Instagram', 'Twitter'].map((social) => (
                                    <a key={social} href="#" className="text-xs uppercase tracking-widest text-white/40 hover:text-[#b5a16d] transition-colors relative group">
                                        {social}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#b5a16d] transition-all duration-300 group-hover:w-full" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="col-span-12 md:col-span-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4">
                            {Object.values(footerLinks).map((section, idx) => (
                                <div key={idx} className="space-y-8">
                                    <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#b5a16d]">
                                        {section.title}
                                    </h4>
                                    <ul className="space-y-4">
                                        {section.links.map((link, linkIdx) => (
                                            <li key={linkIdx}>
                                                <Link
                                                    href={link.href}
                                                    className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-300"
                                                >
                                                    <span className="w-0 h-[1px] bg-[#b5a16d] transition-all duration-300 group-hover:w-3" />
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        {link.label}
                                                    </span>
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
            <div className="relative border-t border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#b5a16d]/5 to-transparent opacity-50" />

                <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-12">
                    <div className="relative flex justify-center py-10 md:py-20 overflow-hidden">
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-[15vw] md:text-[13vw] font-serif font-light tracking-[-0.04em] leading-none text-transparent select-none whitespace-nowrap"
                            style={{
                                WebkitTextStroke: '1px rgba(181, 161, 109, 0.15)', // Increased visibility + Gold tint
                                backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)',
                                WebkitBackgroundClip: 'text',
                            }}
                        >
                            MAIHAN GROUP
                        </motion.h2>

                        {/* Creative Overlay for "Shimmer" effect on the text */}
                        <motion.div
                            animate={{
                                x: ['-100%', '100%'],
                                opacity: [0, 0.1, 0]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                        />
                    </div>

                    {/* Bottom Utility Bar */}
                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6 border-t border-white/5 relative z-10">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-white/20">
                            © 2025 Maihan Group. All rights reserved.
                        </p>

                        <div className="flex items-center gap-6">
                            <p className="text-[10px] text-white/20 tracking-widest uppercase">
                                Crafted by{' '}
                                <a
                                    href="https://www.fkodelabs.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#b5a16d]/60 hover:text-[#b5a16d] transition-colors ml-1"
                                >
                                    fkodelabs
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
