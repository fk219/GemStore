"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { LanguageContext } from '@/app/providers';

const Footer: React.FC = () => {
    const langCtx = useContext(LanguageContext);

    if (!langCtx) return null;
    const { t } = langCtx;

    return (
        <footer className="pt-32 pb-12 px-6 md:px-24 bg-white dark:bg-[#0A0A0A] border-t border-zinc-100 dark:border-zinc-900 rounded-t-[80px]">
            <div className="flex flex-col md:flex-row justify-between gap-16 mb-32">
                <div className="max-w-md">
                    <h2 className="text-4xl md:text-6xl font-light serif mb-12">{t.ctaTitle}</h2>
                    <Link
                        href="/book"
                        className="group relative inline-flex items-center gap-6 px-10 py-5 rounded-full border border-black dark:border-white overflow-hidden transition-all duration-500 hover:gap-10"
                    >
                        <span className="relative z-10 text-sm tracking-[0.2em] uppercase text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-500">{t.ctaButton}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10 text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <div className="absolute inset-0 bg-black dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">Maison</span>
                        <Link href="/" className="text-sm hover:opacity-50">Heritage</Link>
                        <Link href="/" className="text-sm hover:opacity-50">Craftsmanship</Link>
                        <Link href="/" className="text-sm hover:opacity-50">Archive</Link>
                    </div>
                    <div className="flex flex-col gap-6">
                        <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">Contact</span>
                        <a href="mailto:concierge@timelesscraft.com" className="text-sm hover:opacity-50">Inquiries</a>
                        <a href="tel:+" className="text-sm hover:opacity-50">Privé Line</a>
                        <Link href="/book" className="text-sm hover:opacity-50">Booking</Link>
                    </div>
                    <div className="hidden md:flex flex-col gap-6">
                        <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">Global Locations</span>
                        <p className="text-sm">London</p>
                        <p className="text-sm">Geneva</p>
                        <p className="text-sm">Hong Kong</p>
                    </div>
                </div>
            </div>

            <div className="pt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-[10px] tracking-[0.3em] uppercase opacity-40">{t.footerTagline}</p>
                <div className="flex gap-12 text-[10px] tracking-[0.3em] uppercase opacity-40">
                    {/* Warning: invalid anchor hrefs replaced with simple styling for demo if needed */}
                    <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
                    <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
                </div>
                <p className="text-[10px] tracking-[0.3em] uppercase opacity-40">&copy; 2024 Timeless Craft. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
