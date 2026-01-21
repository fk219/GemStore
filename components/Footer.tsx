"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { LanguageContext } from '@/app/providers';

const Footer: React.FC = () => {
    const langCtx = useContext(LanguageContext);

    if (!langCtx) return null;
    const { t } = langCtx;

    return (
        <footer className="relative pt-32 pb-12 px-6 md:px-24 bg-[#050905] text-[#E0D8C8] overflow-hidden">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B120B] to-[#020302] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

            <div className="relative z-10 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-32">

                    {/* Brand / Contact - Left */}
                    <div className="md:col-span-4 flex flex-col gap-12">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-serif text-[#D4AF37] tracking-widest uppercase">L&apos;Éclat</span>
                        </div>

                        <div className="text-sm font-sans font-light opacity-60 leading-relaxed tracking-wide space-y-1">
                            <p>Maison L&apos;Éclat Studio, 42 Bond Street,</p>
                            <p>Mayfair, London W1S 2SB, UK</p>
                        </div>

                        <div className="space-y-4 pt-8">
                            <p className="text-[10px] tracking-[0.2em] uppercase opacity-40">Mon-Fri, 10:00 - 18:00 (GMT)</p>
                            <p className="font-serif italic text-xl text-[#FBFBF9] opacity-80 hover:opacity-100 transition-opacity cursor-pointer">+44 20 7946 0123</p>
                            <a href="mailto:hello@leclat.digital" className="font-serif italic text-xl text-[#FBFBF9] px-0 underline decoration-[#D4AF37]/30 hover:decoration-[#D4AF37] underline-offset-8 transition-all">
                                hello@leclat.digital
                            </a>
                        </div>
                    </div>

                    {/* Navigation - Center */}
                    <div className="md:col-span-2 md:col-start-6 flex flex-col gap-12">
                        <div className="flex flex-col gap-6">
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] opacity-60">Social</span>
                            <a href="#" className="font-serif italic text-lg hover:translate-x-2 transition-transform duration-300">X / Twitter</a>
                            <a href="#" className="font-serif italic text-lg hover:translate-x-2 transition-transform duration-300">Instagram</a>
                            <a href="#" className="font-serif italic text-lg hover:translate-x-2 transition-transform duration-300">Journal</a>
                        </div>
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-12">
                        <div className="flex flex-col gap-6">
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] opacity-60">Navigation</span>
                            <Link href="/" className="text-xs uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">Home</Link>
                            <Link href="/gemstones" className="text-xs uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">Collections</Link>
                            <Link href="/about" className="text-xs uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">About</Link>
                            <Link href="/book" className="text-xs uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">Contact</Link>
                        </div>
                    </div>

                    {/* Inquiries / Subscribe - Right */}
                    <div className="md:col-span-4 flex flex-col gap-8">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] opacity-60">Inquiries</span>
                        <p className="text-sm opacity-60 font-light max-w-xs leading-relaxed">
                            Drop your email to get private updates on new archival releases.
                        </p>

                        <div className="mt-4">
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="example@mail.com"
                                    className="w-full bg-transparent border-b border-[#FBFBF9]/20 py-4 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:opacity-30"
                                />
                                <button className="mt-8 w-full py-4 border border-[#FBFBF9]/20 rounded-full text-[10px] tracking-[0.3em] uppercase hover:bg-[#D4AF37] hover:text-[#050905] hover:border-[#D4AF37] transition-all duration-500 group-hover:border-[#FBFBF9]/40">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar / Credit */}
                <div className="flex flex-col md:flex-row justify-between items-end pt-24 border-t border-[#FBFBF9]/5">

                    {/* Abstract Large Watermark */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
                        <h1 className="text-[15vw] leading-[0.8] font-serif text-center uppercase whitespace-nowrap">L&apos;Éclat</h1>
                    </div>

                    <div className="flex flex-col gap-4 relative z-10 w-full md:w-auto">
                        <div className="flex gap-8 text-[9px] tracking-[0.2em] uppercase opacity-40">
                            <a href="#" className="hover:text-[#D4AF37]">Terms & Conditions</a>
                            <a href="#" className="hover:text-[#D4AF37]">Privacy & Cookie Policy</a>
                            <a href="#" className="hover:text-[#D4AF37]">Shipping & Returns</a>
                        </div>
                    </div>

                    {/* Developer Credit - High Visibility as requested */}
                    <div className="mt-12 md:mt-0 relative z-10 text-right">
                        <p className="text-[10px] md:text-xs font-light tracking-[0.1em] text-[#FBFBF9]/60">
                            Crafted with restraint. Presented with purpose by <a href="https://www.fkodelabs.com" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:text-white transition-colors border-b border-[#D4AF37]/30 pb-0.5 hover:border-white">fkodelabs</a>.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
