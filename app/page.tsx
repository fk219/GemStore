"use client";

import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LanguageContext, ThemeContext } from '@/app/providers';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import CollectionSection from '@/components/CollectionSection';
import BentoGrid from '@/components/BentoGrid';
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
        // Luxury Reveal Animations - Slow, Intentional, Weighted
        const ctx = gsap.context(() => {
            // Standard Reveals with Luxury Timing
            const reveals = document.querySelectorAll('.reveal-text, .reveal-image');
            reveals.forEach(el => {
                gsap.fromTo(el,
                    { y: 12, opacity: 0 }, // Reduced from 50 to 12 for subtlety
                    {
                        y: 0,
                        opacity: 1,
                        duration: 2.5, // Increased from 1.5s for luxury pacing
                        ease: 'cubic-bezier(0.16, 1, 0.3, 1)', // Custom elegant easing
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Refined Parallax - Reduced Intensity
            const parallaxEls = document.querySelectorAll("[data-speed]");
            parallaxEls.forEach(el => {
                const speed = parseFloat(el.getAttribute("data-speed") || "1");
                gsap.to(el, {
                    y: (i, target) => {
                        // Reduced intensity by 50% for more subtle effect
                        return (1 - speed) * ScrollTrigger.maxScroll(window) * 0.05;
                    },
                    ease: "none",
                    scrollTrigger: {
                        trigger: el,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5 // Slight scrub for smoother feel
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
                            <div data-speed="1.1" className="relative aspect-[4/5] md:aspect-[3/4] rounded-lg overflow-hidden group">
                                <Image
                                    src="https://images.unsplash.com/photo-1620218151276-8575084934e6?auto=format&fit=crop&q=80&w=1200"
                                    alt="Raw Emerald Formation"
                                    fill
                                    className="object-cover grayscale transition-transform duration-[3s] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-[#0A0A0A]/10 mix-blend-multiply" />
                            </div>
                            {/* Floating Detail Overlay - Foreground Parallax */}
                            <div data-speed="1.3" className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-[#141414] text-[#FBFBF9] p-8 hidden md:flex flex-col justify-between z-20 shadow-2xl rounded-lg">
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

            <section className={bgAlt}>
                <BentoGrid />
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
