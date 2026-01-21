"use client";

import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { LanguageContext, ThemeContext } from '@/app/providers';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import CollectionSection from '@/components/CollectionSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
    const langCtx = useContext(LanguageContext);
    const themeCtx = useContext(ThemeContext);

    // Ref tracking for reveal animations
    const revealRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        // Reveal Observer via GSAP Batch or Intersection Observer
        // We'll use GSAP ScrollTrigger batching for smoother "reveal-text" effect
        const ctx = gsap.context(() => {
            const reveals = document.querySelectorAll('.reveal-text, .reveal-image');

            reveals.forEach(el => {
                gsap.fromTo(el,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    if (!langCtx || !themeCtx) return null; // Or loading state
    const { t } = langCtx;

    const textColorClass = "text-[#1A1A1A] dark:text-[#FBFBF9]";
    const secondaryBgClass = "bg-zinc-100 dark:bg-zinc-900";
    const borderColorClass = "border-zinc-200 dark:border-zinc-800";

    // Alternating Backgrounds
    const bgMain = "bg-[#FBFBF9] dark:bg-[#050505]"; // Light: White-ish | Dark: Black
    const bgAlt = "bg-[#F2F2F0] dark:bg-[#0C0C0C]";   // Light: Warm Grey | Dark: Deep Charcoal

    return (
        <main className="w-full selection:bg-[#b5a16d] selection:text-white">
            <Navbar />
            <Hero />

            {/* Chapter 1: The Soul of Rarity - Editorial Overlay Layout */}
            <section className={`relative min-h-screen py-32 md:py-48 px-6 md:px-24 flex flex-col justify-center overflow-hidden ${bgMain} ${textColorClass}`}>
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-zinc-200/50 to-transparent rounded-full blur-[100px] opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-overlay" />

                <div className="container mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32">
                        {/* Image Composition */}
                        <div className="w-full md:w-1/2 relative reveal-image">
                            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden group">
                                <Image
                                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
                                    alt="Raw Emerald Formation"
                                    fill
                                    className="object-cover grayscale transition-transform duration-[3s] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-[#0A0A0A]/10 mix-blend-multiply" />
                            </div>
                            {/* Floating Detail Overlay */}
                            <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-[#141414] text-[#FBFBF9] p-8 hidden md:flex flex-col justify-between z-20 shadow-2xl">
                                <span className="text-[10px] tracking-[0.4em] uppercase opacity-50">Origin</span>
                                <p className="font-serif italic text-2xl">Muzo, Colombia</p>
                                <div className="w-full h-px bg-white/20" />
                                <p className="text-xs font-sans tracking-widest opacity-80">LAT 5.55° N</p>
                            </div>
                        </div>

                        {/* Editorial Text */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                            <div className="flex items-center gap-6 mb-12 opacity-40">
                                <span className="text-[10px] tracking-[0.4em] uppercase font-sans font-light">Part I — The Raw</span>
                                <div className="w-20 h-px bg-current" />
                            </div>

                            <h2 className="text-5xl md:text-8xl font-light serif mb-12 leading-[0.9] reveal-text">
                                Silence <br />
                                <span className="italic ml-12 opacity-50">in the</span> <br />
                                Stone.
                            </h2>

                            <p className="text-lg md:text-xl font-light opacity-70 leading-relaxed max-w-md ml-auto reveal-text serif border-l border-current pl-8">
                                True rarity is not found; it is recognized. It speaks in a language of inclusions, fractures, and light—a dialogue between the earth's violent history and the quiet eye of the connoisseur.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Horizontal Scrolling Section: The Private Collection - BG ALT */}
            <section className={bgAlt}>
                <CollectionSection />
            </section>

            {/* Chapter 2: The Art of Refraction (The Lens) - BG MAIN (Card Style) */}
            <section className={`min-h-screen py-32 rounded-[40px] md:rounded-[100px] mx-2 md:mx-8 my-12 overflow-hidden relative ${bgMain} ${textColorClass} shadow-2xl`}>
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,50 C20,40 40,60 60,50 S80,40 100,50" fill="none" className="stroke-current" strokeWidth="0.05" />
                        <path d="M0,60 C30,70 50,40 70,60 S90,50 100,60" fill="none" className="stroke-current" strokeWidth="0.05" opacity="0.5" />
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10 py-12 md:py-24">
                    <div className="flex flex-col items-center text-center">
                        <span className="text-[10px] tracking-[0.8em] uppercase mb-12 opacity-30 reveal-text font-sans font-light border px-4 py-2 rounded-full border-current">The Philosophy</span>

                        <div className="relative mb-24 reveal-image">
                            {/* Abstract Glow - Adaptive */}
                            <div className="absolute -inset-20 bg-current blur-[100px] rounded-full animate-pulse opacity-5" />
                            <h2 className="text-6xl md:text-[11rem] font-light serif leading-[0.85] reveal-text mix-blend-difference">
                                Precision
                            </h2>
                            <h2 className="text-6xl md:text-[11rem] font-light serif leading-[0.85] italic reveal-text text-zinc-400 dark:text-zinc-600">
                                &amp; Mystery
                            </h2>
                        </div>

                        <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 w-full max-w-6xl text-left border-t border-current/10 pt-16">
                            {[
                                {
                                    label: "01 / Sourcing",
                                    head: "The Unseen",
                                    text: "We bypass the commercial market, working directly with families who have held mines for generations."
                                },
                                {
                                    label: "02 / Cutting",
                                    head: "The Release",
                                    text: "A gem is not cut to maximize weight, but to release its trapped light. We sacrifice carats for brilliance."
                                },
                                {
                                    label: "03 / Setting",
                                    head: "The Vessel",
                                    text: "Architecture that holds light. Minimal metal, maximum exposure. The stone must appear to float."
                                }
                            ].map((item, i) => (
                                <div key={i} className="reveal-text group">
                                    <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6 font-sans font-light group-hover:text-amber-600 transition-colors">{item.label}</h3>
                                    <p className="text-3xl serif mb-4 italic">{item.head}</p>
                                    <p className="text-sm opacity-60 leading-relaxed font-sans max-w-xs">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapter 3: The Curated Gallery - COMPLEX BENTO GRID - BG ALT */}
            <section className={`py-40 px-4 md:px-12 ${bgAlt}`}>
                <div className={`max-w-[1800px] mx-auto mb-32 flex flex-col md:flex-row justify-between items-end border-b ${borderColorClass} pb-8 ${textColorClass}`}>
                    <div className="reveal-text">
                        <span className="text-[10px] tracking-[0.6em] uppercase opacity-40 block mb-4 font-sans font-light">The Vault</span>
                        <h2 className="text-6xl md:text-9xl font-light serif">Archive</h2>
                    </div>
                    <div className="mb-4 reveal-text">
                        <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-sans opacity-60">Selection [ 2024 / 2025 ]</span>
                    </div>
                </div>

                {/* HIGH COMPLEXITY BENTO GRID */}
                <div className="max-w-[1800px] mx-auto grid grid-cols-2 md:grid-cols-12 auto-rows-[150px] md:auto-rows-[180px] gap-3 md:gap-4">

                    {/* 1. Large Feature (Sapphire) */}
                    <div className="col-span-2 md:col-span-6 row-span-4 reveal-image group relative rounded-sm overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1597813589938-98e3768b556f?auto=format&fit=crop&q=80&w=1400"
                            fill
                            className="object-cover transition-all duration-[3s] group-hover:scale-105"
                            alt="Royal Blue Sapphire"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                        <div className="absolute bottom-10 left-10 text-white z-10">
                            <h3 className="text-5xl md:text-7xl serif font-light italic">Azure</h3>
                            <p className="text-xs tracking-[0.4em] uppercase opacity-80 mt-2 font-sans">Kashmir Origin / 8.42 CT</p>
                        </div>
                    </div>

                    {/* 2. Abstract Texture (Dark Mode) */}
                    <div className="col-span-1 md:col-span-3 row-span-2 reveal-image group relative rounded-sm overflow-hidden border border-white/5">
                        <Image
                            src="https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=800"
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            alt="Dark Texture"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] tracking-[0.6em] uppercase text-white mix-blend-difference">Refraction</span>
                        </div>
                    </div>

                    {/* 3. Text Block Quote */}
                    <div className={`col-span-1 md:col-span-3 row-span-2 reveal-text flex flex-col justify-center p-8 bg-white dark:bg-[#141414] rounded-sm ${textColorClass}`}>
                        <svg className="w-6 h-6 mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.0171 16H11.9829C10.8784 16 9.98291 16.8954 9.98291 18L9.98291 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <p className="font-serif italic text-lg leading-relaxed opacity-80">&quot;To hold a gem is to hold a frozen piece of time.&quot;</p>
                    </div>

                    {/* 4. Tall Vertical (Ruby) */}
                    <div className="col-span-1 md:col-span-3 row-span-3 reveal-image group relative rounded-sm overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1549488497-217e3350160a?auto=format&fit=crop&q=80&w=800"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]"
                            alt="Ruby Detail"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="bg-white/10 backdrop-blur-md text-white text-[9px] px-2 py-1 rounded-full uppercase tracking-widest">Sold</span>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <p className="font-serif text-2xl">Pigeon's Blood</p>
                        </div>
                    </div>

                    {/* 5. Detail Shot (Diamond) */}
                    <div className="col-span-1 md:col-span-3 row-span-2 reveal-image group relative rounded-sm overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800"
                            fill
                            className="object-cover contrast-125"
                            alt="Diamond Facet"
                        />
                    </div>

                    {/* 6. Interaction / Link Block */}
                    <div className={`col-span-2 md:col-span-3 row-span-1 reveal-text flex items-center justify-between px-8 bg-[#1A1A1A] text-[#FBFBF9] rounded-sm group hover:bg-[#b5a16d] transition-colors cursor-pointer`}>
                        <span className="text-[10px] tracking-[0.4em] uppercase font-sans">View Full Archive</span>
                        <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                    </div>

                    {/* 7. Wide Panoramic (Landscape/Mine) */}
                    <div className="col-span-2 md:col-span-6 row-span-2 reveal-image group relative rounded-sm overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1548504769-900b70ed122e?auto=format&fit=crop&q=80&w=1600"
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
                            alt="Sri Lanka landscape"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                            <p className="text-[10px] tracking-[0.6em] uppercase mb-4">Provenance</p>
                            <h3 className="text-3xl md:text-5xl font-light serif italic">&quot;From the Earth, to the Hand.&quot;</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapter 4: The Epilogue - BG MAIN */}
            <section className={`py-48 flex flex-col items-center justify-center text-center px-6 ${bgMain} ${textColorClass}`}>
                <div className="reveal-text">
                    <div className="w-px h-24 bg-current opacity-20 mb-12 mx-auto" />
                    <p className="text-xs tracking-[0.8em] uppercase opacity-40 mb-16 font-sans font-light">The Invitation</p>
                    <h2 className="text-5xl md:text-8xl font-light serif max-w-5xl mx-auto leading-[1.1] mb-12">
                        Rare things are not <br /> <span className="italic opacity-50">found</span> often.
                    </h2>
                    <a href="/book" className="inline-block border-b border-current pb-2 text-sm tracking-[0.4em] uppercase hover:opacity-50 transition-opacity">
                        Request Private Viewing
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
