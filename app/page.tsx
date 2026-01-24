"use client";

import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
            // Standard Reveals
            const reveals = document.querySelectorAll('.reveal-text, .reveal-image');
            reveals.forEach(el => {
                gsap.fromTo(el,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.5, // Slower, more elegant
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Parallax Effects
            const parallaxEls = document.querySelectorAll("[data-speed]");
            parallaxEls.forEach(el => {
                const speed = parseFloat(el.getAttribute("data-speed") || "1");
                gsap.to(el, {
                    y: (i, target) => {
                        return (1 - speed) * ScrollTrigger.maxScroll(window) * 0.1; // Subtle shift based on speed
                    },
                    ease: "none",
                    scrollTrigger: {
                        trigger: el,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0
                    }
                });
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
            <Navbar themeOverride="dark" />
            <Hero />

            {/* Chapter 1: The Soul of Rarity - Editorial Overlay Layout */}
            <section className={`relative min-h-screen py-32 md:py-48 px-6 md:px-24 flex flex-col justify-center overflow-hidden ${bgMain} ${textColorClass}`}>
                {/* Decorative Background Elements - Parallax */}
                <div data-speed="0.2" className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-zinc-200/50 to-transparent rounded-full blur-[100px] opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-overlay" />
                <div data-speed="0.4" className="absolute bottom-0 left-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="container mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32">
                        {/* Image Composition */}
                        <div className="w-full md:w-1/2 relative reveal-image">
                            <div data-speed="1.1" className="relative aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden group">
                                <Image
                                    src="https://images.unsplash.com/photo-1620218151276-8575084934e6?auto=format&fit=crop&q=80&w=1200"
                                    alt="Raw Emerald Formation"
                                    fill
                                    className="object-cover grayscale transition-transform duration-[3s] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-[#0A0A0A]/10 mix-blend-multiply" />
                            </div>
                            {/* Floating Detail Overlay - Foreground Parallax */}
                            <div data-speed="1.3" className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-[#141414] text-[#FBFBF9] p-8 hidden md:flex flex-col justify-between z-20 shadow-2xl">
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

            {/* Chapter 2: The Art of Refraction (Refined Patience) - INVERTED THEME */}
            <section className="min-h-screen py-32 rounded-[40px] md:rounded-[100px] mx-2 md:mx-8 my-12 overflow-hidden relative bg-[#141414] text-[#FBFBF9] dark:bg-[#FBFBF9] dark:text-[#141414] shadow-2xl transition-colors duration-1000">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,50 C20,40 40,60 60,50 S80,40 100,50" fill="none" className="stroke-current" strokeWidth="0.05" />
                        <path d="M0,60 C30,70 50,40 70,60 S90,50 100,60" fill="none" className="stroke-current" strokeWidth="0.05" opacity="0.5" />
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10 py-12 md:py-24">
                    <div className="flex flex-col items-center text-center">
                        <span className="text-[10px] tracking-[0.8em] uppercase mb-12 opacity-30 reveal-text font-sans font-light border px-4 py-2 rounded-full border-current">The Journey of Light</span>

                        <div className="relative mb-24 reveal-image">
                            {/* Abstract Glow - Adaptive */}
                            <div className="absolute -inset-20 bg-current blur-[100px] rounded-full animate-pulse opacity-5" />
                            <h2 className="text-6xl md:text-[11rem] font-light serif leading-[0.85] reveal-text">
                                Refined
                            </h2>
                            <h2 className="text-6xl md:text-[11rem] font-light serif leading-[0.85] italic reveal-text opacity-50">
                                Patience
                            </h2>
                        </div>

                        <p className="text-2xl md:text-4xl font-light opacity-80 max-w-4xl leading-relaxed serif italic reveal-text">
                            "Every stone passes through a journey of patience, mastery, and quiet perfection."
                        </p>

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
                                    <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6 font-sans font-light group-hover:text-amber-500 transition-colors">{item.label}</h3>
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
                    <div className="reveal-text opacity-0 translate-y-20 transition-all duration-1000">
                        <span className="text-[10px] tracking-[0.6em] uppercase opacity-40 block mb-4 font-sans font-light">The Vault</span>
                        <h2 className="text-6xl md:text-9xl font-light serif">Archive</h2>
                    </div>
                    <div className="mb-4 reveal-text opacity-0 translate-y-20 transition-all duration-1000">
                        <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-sans opacity-60">Selection [ 2024 / 2025 ]</span>
                    </div>
                </div>

                <div className="max-w-[1800px] mx-auto grid grid-cols-4 md:grid-cols-12 auto-rows-[180px] md:auto-rows-[200px] gap-3 md:gap-4">

                    {/* 1. Large Feature - Azure Monolith */}
                    <div className="col-span-4 md:col-span-7 row-span-3 reveal-image opacity-0 scale-95 transition-all duration-1000 group">
                        <div className="relative w-full h-full rounded-[50px] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1615486511484-92e57bb6eb64?auto=format&fit=crop&q=80&w=1400"
                                className="w-full h-full object-cover transition-all duration-[3s] group-hover:scale-105"
                                alt="Royal Blue Sapphire"
                                fill
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                            <div className="absolute bottom-12 left-10 text-white z-10">
                                <h3 className="text-5xl md:text-7xl serif font-light italic mb-4 leading-tight">The Azure <br /> Monolith</h3>
                                <p className="text-xs tracking-[0.4em] uppercase opacity-80 font-sans border-l border-white/40 pl-4 py-1">Kashmir Origin / 8.42 CT</p>
                            </div>
                        </div>
                    </div>

                    {/* 2. Text Block */}
                    <div className={`col-span-4 md:col-span-5 row-span-2 reveal-text opacity-0 scale-95 transition-all duration-1000 flex flex-col justify-center p-10 bg-white dark:bg-[#141414] rounded-[50px] ${textColorClass} border ${borderColorClass}`}>
                        <h4 className="text-3xl md:text-4xl font-serif italic mb-6 leading-tight">Linear Mastery</h4>
                        <p className="font-sans text-sm opacity-60 leading-relaxed tracking-wide">
                            Geometry is the skeleton of light. We do not cut shapes; we reveal the hidden architecture within stone.
                        </p>
                    </div>

                    {/* 3. Ruby - Tall */}
                    <div className="col-span-2 md:col-span-4 row-span-3 reveal-image opacity-0 scale-95 transition-all duration-1000 delay-100 group">
                        <div className="relative w-full h-full rounded-[45px] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1617058866388-7509f9a74797?auto=format&fit=crop&q=80&w=800"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]"
                                alt="Ruby Detail"
                                fill
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-60" />
                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-white/10 backdrop-blur-md text-white text-[9px] px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">Sold</span>
                            </div>
                            <div className="absolute bottom-6 left-6 text-white z-10">
                                <p className="font-serif text-3xl italic leading-tight">Crimson <br /> Silence</p>
                            </div>
                        </div>
                    </div>

                    {/* 4. Abstract Texture */}
                    <div className="col-span-2 md:col-span-3 row-span-2 reveal-image opacity-0 scale-95 transition-all duration-1000 delay-200 group">
                        <div className="relative w-full h-full rounded-[40px] overflow-hidden border border-white/5 bg-[#050505]">
                            <Image
                                src="https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=800"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity mix-blend-luminosity"
                                alt="Dark Texture"
                                fill
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-[10px] tracking-[0.6em] uppercase text-white font-light bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">Refraction</span>
                            </div>
                        </div>
                    </div>

                    {/* 5. Diamond Detail */}
                    <div className="col-span-2 md:col-span-3 row-span-2 reveal-image opacity-0 scale-95 transition-all duration-1000 delay-300 group">
                        <div className="relative w-full h-full rounded-[40px] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800"
                                className="w-full h-full object-cover contrast-125 group-hover:scale-110 transition-transform duration-[3s]"
                                alt="Diamond Facet"
                                fill
                            />
                        </div>
                    </div>

                    {/* 6. CTA Link */}
                    <Link href="/gemstones" className={`col-span-4 md:col-span-6 row-span-1 reveal-text opacity-0 scale-95 transition-all duration-1000 delay-400 flex items-center justify-between px-10 bg-[#1A1A1A] text-[#FBFBF9] rounded-[35px] group hover:bg-[#b5a16d] hover:text-white transition-all duration-500 cursor-pointer`}>
                        <span className="text-xs tracking-[0.4em] uppercase font-sans">View Full Archive</span>
                        <span className="text-3xl group-hover:translate-x-4 transition-transform duration-300">→</span>
                    </Link>
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
