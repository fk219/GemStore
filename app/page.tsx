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
    const bgAlt = "bg-[#F2F2F0] dark:bg-[#121212]";   // Light: Warm Grey | Dark: Off-black

    return (
        <main className="w-full">
            <Navbar />
            <Hero />

            {/* Chapter 1: The Soul of Rarity - BG MAIN */}
            <section className={`relative min-h-screen py-48 px-6 md:px-24 flex flex-col items-center justify-center overflow-hidden ${bgMain}`}>
                <div className="container mx-auto grid md:grid-cols-2 gap-24 items-center relative z-10">
                    <div className="reveal-image">
                        <div className="relative aspect-[3/4] rounded-[60px] md:rounded-[120px] overflow-hidden group">
                            <Image
                                src="https://images.unsplash.com/photo-1573408302185-9127b542333e?auto=format&fit=crop&q=80&w=1200"
                                alt="Gemstone Core"
                                fill
                                className="object-cover grayscale transition-transform duration-[3s] group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/5" />
                        </div>
                        <div className={`mt-12 flex items-center gap-6 opacity-30 ${textColorClass}`}>
                            <div className="w-20 h-[1px] bg-current" />
                            <span className="text-[10px] tracking-[0.4em] uppercase font-sans font-light">I. The Core</span>
                        </div>
                    </div>

                    <div className={`max-w-xl ${textColorClass}`}>
                        <h2 className="text-4xl md:text-7xl font-light serif mb-12 leading-[1.1] reveal-text">
                            {t.aboutBrand}
                        </h2>
                        <div className={`w-24 h-[1px] bg-zinc-300 dark:bg-zinc-700 mb-12 story-line scale-x-100 origin-left`} />
                        <p className="text-xl md:text-2xl font-light opacity-60 leading-relaxed italic reveal-text serif">
                            {t.aboutSub}
                        </p>
                    </div>
                </div>
            </section>

            {/* Horizontal Scrolling Section: The Private Collection - BG ALT */}
            <section className={bgAlt}>
                <CollectionSection />
            </section>

            {/* Chapter 2: The Art of Refraction (The Lens) - BG MAIN (Card Style) */}
            <section className={`min-h-screen py-32 rounded-[80px] md:rounded-[160px] mx-4 my-24 overflow-hidden relative ${bgMain} ${textColorClass}`}>
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,50 Q25,0 50,50 T100,50" fill="none" className="stroke-current" strokeWidth="0.05" opacity="0.5" />
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10 py-24">
                    <div className="flex flex-col items-center text-center">
                        <span className="text-[10px] tracking-[0.8em] uppercase mb-16 opacity-30 reveal-text font-sans font-light">The Journey of Light</span>

                        <div className="relative mb-24 reveal-image">
                            {/* Abstract Glow - Adaptive */}
                            <div className="absolute -inset-10 bg-current blur-[80px] rounded-full animate-pulse opacity-10" />
                            <h2 className="text-6xl md:text-[10rem] font-light serif leading-none reveal-text">
                                Refined
                            </h2>
                            <h2 className="text-6xl md:text-[10rem] font-light serif leading-none italic mt-4 reveal-text">
                                Patience
                            </h2>
                        </div>

                        <p className="text-2xl md:text-4xl font-light opacity-80 max-w-4xl leading-relaxed serif italic reveal-text">
                            &quot;{t.craftsmanshipSub}&quot;
                        </p>

                        <div className="mt-24 grid md:grid-cols-3 gap-12 w-full max-w-5xl">
                            {[
                                { title: "Selection", desc: "One in a million." },
                                { title: "Mastery", desc: "Centuries of lineage." },
                                { title: "Vision", desc: "Designed for the eternal." }
                            ].map((item, i) => (
                                <div key={i} className="reveal-text">
                                    <h3 className="text-xs tracking-[0.4em] uppercase opacity-40 mb-4 font-sans font-light">{item.title}</h3>
                                    <p className="text-xl serif italic">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapter 3: The Curated Gallery - Abstract Bento Grid - BG ALT */}
            <section className={`py-48 px-6 md:px-24 ${bgAlt}`}>
                <div className={`flex flex-col md:flex-row justify-between items-baseline mb-32 border-b ${borderColorClass} pb-16 ${textColorClass}`}>
                    <div className="reveal-text">
                        <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 block mb-6 font-sans font-light">Contemporary Archive</span>
                        <h2 className="text-5xl md:text-8xl font-light serif">{t.collectionsTitle}</h2>
                    </div>
                    <div className="max-w-xs mt-12 md:mt-0 reveal-text">
                        <p className="text-sm tracking-[0.1em] leading-relaxed opacity-60 italic font-sans">{t.collectionsSub}</p>
                    </div>
                </div>

                {/* Abstract Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[250px] md:auto-rows-[350px] gap-6 md:gap-8">

                    {/* Main Large Piece - High Contrast Overlay */}
                    <div className="md:col-span-8 md:row-span-2 reveal-image group">
                        <div className={`relative h-full w-full rounded-[40px] md:rounded-[80px] overflow-hidden ${secondaryBgClass}`}>
                            <Image
                                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1600"
                                fill
                                className="object-cover transition-all duration-[3s] group-hover:scale-105"
                                alt="Sapphire Deep"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-1000" />
                            <div className="absolute bottom-12 left-12 text-white">
                                <p className="text-[10px] tracking-[0.5em] uppercase mb-4 opacity-90 font-medium font-sans">Archive 01</p>
                                <h3 className="text-4xl md:text-5xl serif drop-shadow-sm">The Azure <span className="italic">Monolith</span></h3>
                            </div>
                        </div>
                    </div>

                    {/* Tall Craftsmanship Piece */}
                    <div className="md:col-span-4 md:row-span-3 reveal-image group">
                        <div className={`relative h-full w-full rounded-[40px] md:rounded-[80px] overflow-hidden ${secondaryBgClass}`}>
                            <Image
                                src="https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?auto=format&fit=crop&q=80&w=800"
                                fill
                                className="object-cover grayscale transition-all duration-[3s] group-hover:scale-110"
                                alt="Prism Study"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-1000" />
                            <div className="absolute bottom-12 left-12 text-white">
                                <p className="text-[10px] tracking-[0.5em] uppercase mb-4 opacity-90 font-medium font-sans">Process</p>
                                <h3 className="text-3xl md:text-4xl serif drop-shadow-sm">Linear <span className="italic">Mastery</span></h3>
                            </div>
                        </div>
                    </div>

                    {/* Philosophical Statement (Bento Text Block) */}
                    <div className="md:col-span-4 md:row-span-1 reveal-text">
                        <div className={`h-full w-full rounded-[40px] md:rounded-[60px] p-10 md:p-14 border ${borderColorClass} bg-white dark:bg-zinc-950 flex flex-col justify-center ${textColorClass} shadow-sm`}>
                            <p className="text-xl md:text-2xl font-light italic leading-relaxed serif">
                                &quot;Not designed to impress — designed to endure for the generations yet to come.&quot;
                            </p>
                            <div className="mt-8 w-12 h-px bg-current opacity-30" />
                        </div>
                    </div>

                    {/* Medium Landscape Piece */}
                    <div className="md:col-span-4 md:row-span-2 reveal-image group">
                        <div className={`relative h-full w-full rounded-[40px] md:rounded-[80px] overflow-hidden ${secondaryBgClass}`}>
                            <Image
                                src="https://images.unsplash.com/photo-11551028150-64b9f398f678?auto=format&fit=crop&q=80&w=800"
                                fill
                                className="object-cover transition-all duration-[3s] group-hover:rotate-1 group-hover:scale-105"
                                alt="Facet Focus"
                            // Fallback or check existing URL if broken, assuming Unsplash ID is correct but was slightly weird in original
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-1000" />
                            <div className="absolute top-10 left-10 text-white">
                                <p className="text-[10px] tracking-[0.5em] uppercase opacity-90 font-medium font-sans">Focus</p>
                            </div>
                            <div className="absolute bottom-10 left-10 text-white">
                                <h3 className="text-3xl md:text-4xl serif drop-shadow-sm">Inner <span className="italic">Fire</span></h3>
                            </div>
                        </div>
                    </div>

                    {/* Small Abstract Detail */}
                    <div className="md:col-span-4 md:row-span-1 reveal-image group">
                        <div className={`relative h-full w-full rounded-[40px] md:rounded-[60px] overflow-hidden bg-zinc-800 dark:bg-zinc-950`}>
                            <Image
                                src="https://images.unsplash.com/photo-1588444839799-eb00f79cd96a?auto=format&fit=crop&q=80&w=800"
                                fill
                                className="object-cover opacity-50 transition-all duration-[4s] group-hover:scale-125 group-hover:rotate-6"
                                alt="Abstract Texture"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 border border-white/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapter 4: The Epilogue - BG MAIN */}
            <section className={`py-48 flex flex-col items-center justify-center text-center px-6 ${bgMain}`}>
                <div className={`reveal-text ${textColorClass}`}>
                    <div className="w-px h-32 bg-zinc-200 dark:bg-zinc-800 mb-16 mx-auto" />
                    <p className="text-sm tracking-[0.6em] uppercase opacity-40 mb-12 font-sans font-light">A Legacy Unfolding</p>
                    <h2 className="text-4xl md:text-7xl font-light serif max-w-4xl mx-auto leading-tight italic">
                        &quot;True beauty is a quiet dialogue between nature and the eye.&quot;
                    </h2>
                </div>
            </section>

            <Footer />
        </main>
    );
}
