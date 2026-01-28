"use client";

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { LanguageContext } from '@/app/providers';
import { motion, useMotionValue } from 'motion/react';

const Footer: React.FC = () => {
    const langCtx = useContext(LanguageContext);

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
        maison: {
            title: 'MAISON',
            links: [
                { label: 'Heritage', href: '/about' },
                { label: 'Craftsmanship', href: '/craftsmanship' },
                { label: 'Archive', href: '/archive' },
            ]
        },
        contact: {
            title: 'CONTACT',
            links: [
                { label: 'Inquiries', href: '/contact' },
                { label: 'Privé Line', href: '/prive' },
                { label: 'Booking', href: '/booking' },
            ]
        },
        locations: {
            title: 'GLOBAL LOCATIONS',
            links: [
                { label: 'London', href: '/locations/london' },
                { label: 'Geneva', href: '/locations/geneva' },
                { label: 'Hong Kong', href: '/locations/hong-kong' },
            ]
        }
    };

    return (
        <footer
            // Theme: Adaptive Background
            className="relative bg-main text-foreground overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Ambient Background Effects - REFACTORED COLORS */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gold Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary opacity-[0.05] blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                {/* Deep Warmth - Darker Gold */}
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary opacity-[0.1] blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />

                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
                />
            </div>

            {/* Main Content Section */}
            <div className="relative max-w-[1700px] mx-auto px-8 md:px-16 lg:px-24 py-24 md:py-32 z-10">
                <div className="flex flex-col lg:flex-row justify-between gap-20 lg:gap-32">

                    {/* Left Column: Private Conversation CTA */}
                    <div className="flex-1 max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.1] mb-16 tracking-tight text-foreground"
                        >
                            A private <br />
                            conversation <br />
                            begins with <br />
                            <span className="italic text-primary">intention.</span>
                        </motion.h2>

                        <div className="flex items-center gap-8">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative px-12 py-6 rounded-full border border-foreground/20 hover:border-primary transition-colors duration-500 overflow-hidden"
                            >
                                <div className="relative flex items-center gap-4 z-10">
                                    <span className="text-xs tracking-[0.2em] uppercase text-foreground group-hover:text-primary transition-colors duration-500">
                                        Request a Private Meeting
                                    </span>
                                    <span className="text-foreground/50 group-hover:translate-x-1 group-hover:text-primary transition-all duration-500">→</span>
                                </div>
                                <div className="absolute inset-0 bg-foreground/[0.03] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                            </motion.button>

                            {/* Decorative Dot Button */}
                            <motion.div
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.8, ease: "anticipate" }}
                                className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center cursor-pointer hover:border-primary transition-colors duration-500"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-foreground group-hover:bg-primary transition-colors" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column: Links */}
                    <div className="flex-1 lg:max-w-xl pt-4 lg:pt-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-8">
                            {Object.values(footerLinks).map((section, idx) => (
                                <div key={idx} className="space-y-10">
                                    <h4 className="text-[10px] tracking-[0.3em] uppercase text-foreground/40">
                                        {section.title.replace('GLOBAL LOCATIONS', 'GLOBAL\nLOCATIONS')}
                                    </h4>
                                    <ul className="space-y-6">
                                        {section.links.map((link, linkIdx) => (
                                            <li key={linkIdx}>
                                                <Link
                                                    href={link.href}
                                                    className="group block text-sm font-light text-foreground/80 hover:text-primary transition-colors duration-300"
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
            <div className="relative border-t border-foreground/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-30" />

                <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-12">
                    <div className="relative flex justify-center py-12 md:py-24 overflow-hidden">
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-[16vw] font-serif font-light tracking-[-0.04em] leading-none text-transparent select-none whitespace-nowrap"
                            style={{
                                WebkitTextStroke: '1px var(--primary)',
                                backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent)',
                                WebkitBackgroundClip: 'text',
                            }}
                        >
                            MAIHAN GROUP
                        </motion.h2>

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
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent skew-x-12 pointer-events-none"
                        />
                    </div>

                    {/* Centered Credits */}
                    <div className="flex flex-col items-center justify-center pt-8 gap-4 border-t border-foreground/5 relative z-10 text-center">
                        <p className="text-[10px] text-foreground/30 tracking-widest uppercase">
                            Designed and Developed by{' '}
                            <a
                                href="https://www.fkodelabs.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary/80 hover:text-primary transition-colors border-b border-primary/20 hover:border-primary pb-0.5"
                            >
                                fkodelabs
                            </a>
                        </p>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/20">
                            © 2025 Maihan Group. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
