"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BentoGrid: React.FC = () => {
    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;
        const rows = document.querySelectorAll("[data-bento-row]");
        rows.forEach((row) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });
            tl.fromTo(
                row,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
            );
            const tiles = row.querySelectorAll("[data-bento-tile]");
            tl.fromTo(
                tiles,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.08 },
                "-=0.6"
            );
        });
        return () => ScrollTrigger.getAll().forEach((st) => st.kill());
    }, []);

    return (
        <section className="py-[var(--space-24)] px-4 md:px-12">
            <div className="max-w-[1800px] mx-auto mb-[var(--space-12)] flex flex-col md:flex-row justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-[var(--space-4)] text-[#1A1A1A] dark:text-[#FBFBF9]">
                <div data-bento-row className="transition-all duration-[var(--duration-slow)]">
                    <span className="text-[10px] tracking-[0.6em] uppercase opacity-40 block mb-4 font-sans font-light">The Vault</span>
                    <h2 className="text-6xl md:text-9xl font-light serif">Archive</h2>
                </div>
                <div data-bento-row className="transition-all duration-[var(--duration-slow)]">
                    <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-sans opacity-60">Selection [ 2024 / 2025 ]</span>
                </div>
            </div>

            <div className="max-w-[1800px] mx-auto grid grid-cols-4 md:grid-cols-12 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
                <div data-bento-row className="contents">
                    <div data-bento-tile className="col-span-4 md:col-span-7 row-span-3">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1615486511484-92e57bb6eb64?auto=format&fit=crop&q=80&w=1400"
                                alt="Royal Blue Sapphire"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-12 left-10 text-white z-10">
                                <h3 className="text-5xl md:text-7xl serif font-light italic mb-4 leading-tight">The Azure Monolith</h3>
                                <p className="text-xs tracking-[0.4em] uppercase opacity-80 font-sans border-l border-white/40 pl-4 py-1">Kashmir Origin / 8.42 CT</p>
                            </div>
                        </div>
                    </div>

                    <div data-bento-tile className="col-span-4 md:col-span-5 row-span-2">
                        <div className="flex flex-col justify-center p-10 bg-white dark:bg-[#141414] rounded-xl text-[#1A1A1A] dark:text-[#FBFBF9] border border-zinc-200 dark:border-zinc-800">
                            <h4 className="text-3xl md:text-4xl font-serif italic mb-6 leading-tight">Linear Mastery</h4>
                            <p className="font-sans text-sm opacity-70 leading-relaxed tracking-wide">
                                Geometry is the skeleton of light. We reveal the hidden architecture within stone.
                            </p>
                        </div>
                    </div>
                </div>

                <div data-bento-row className="contents">
                    <div data-bento-tile className="col-span-2 md:col-span-4 row-span-3">
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1617058866388-7509f9a74797?auto=format&fit=crop&q=80&w=800"
                                alt="Ruby Detail"
                                fill
                                className="object-cover grayscale"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-60" />
                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-white/10 backdrop-blur-md text-white text-[9px] px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">Sold</span>
                            </div>
                            <div className="absolute bottom-6 left-6 text-white z-10">
                                <p className="font-serif text-3xl italic leading-tight">Crimson Silence</p>
                            </div>
                        </div>
                    </div>
                    <div data-bento-tile className="col-span-2 md:col-span-3 row-span-2">
                        <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/5 bg-[#050505]">
                            <Image
                                src="https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=800"
                                alt="Dark Texture"
                                fill
                                className="object-cover opacity-60"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-[10px] tracking-[0.6em] uppercase text-white font-light bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">Refraction</span>
                            </div>
                        </div>
                    </div>
                    <div data-bento-tile className="col-span-2 md:col-span-3 row-span-2">
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800"
                                alt="Diamond Facet"
                                fill
                                className="object-cover contrast-125"
                            />
                        </div>
                    </div>
                    <div data-bento-tile className="col-span-4 md:col-span-6 row-span-1">
                        <a href="/gemstones" className="flex items-center justify-between px-10 bg-[#1A1A1A] text-[#FBFBF9] rounded-md hover:opacity-80 transition-opacity">
                            <span className="text-xs tracking-[0.4em] uppercase font-sans">View Full Archive</span>
                            <span className="text-3xl">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
