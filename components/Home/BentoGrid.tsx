"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BentoGrid: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        const ctx = gsap.context(() => {
            // Main container reveal
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Staggered tile reveals
            const tiles = document.querySelectorAll("[data-bento-tile]");
            tiles.forEach((tile, i) => {
                gsap.fromTo(
                    tile,
                    { opacity: 0, y: 30, scale: 0.98 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: "power2.out",
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: tile,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-secondary dark:bg-[#0A0908]">
            <div ref={containerRef} className="max-w-[1600px] mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16">
                    <div>
                        <span className="text-[10px] tracking-[0.5em] uppercase text-[#b5a16d] block mb-4 font-medium">
                            Curated Selection
                        </span>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-light font-serif text-[#1A1A1A] dark:text-white">
                            The <span className="italic">Collection</span>
                        </h2>
                    </div>
                    <p className="text-sm text-[#666] dark:text-white/50 max-w-xs mt-6 md:mt-0 tracking-wide leading-relaxed">
                        Each piece is designed to inspire confidence and celebrate your unique style.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-12 gap-4 md:gap-5">

                    {/* Typography Card - Large */}
                    <div
                        data-bento-tile
                        className="col-span-12 md:col-span-5 row-span-2 min-h-[400px] md:min-h-[500px]"
                        onMouseEnter={() => setHoveredCard('typography')}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#EDE9E3] dark:bg-[#1A1A1A] p-8 md:p-12 flex flex-col justify-between group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-[#b5a16d]/10">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-[0.03]">
                                <svg width="100%" height="100%" className="absolute inset-0">
                                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                </svg>
                            </div>

                            {/* Brand Typography */}
                            <div className="relative z-10">
                                <h3 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light text-[#1A1A1A] dark:text-white tracking-[-0.02em] leading-[0.85]">
                                    TIMELESS
                                </h3>
                                <p className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#b5a16d] mt-2 tracking-normal">
                                    Craft
                                </p>
                            </div>

                            {/* Feature Image */}
                            <div className="relative z-10 flex items-end justify-between mt-8">
                                <div className="w-32 h-40 md:w-40 md:h-52 rounded-xl overflow-hidden relative group-hover:scale-105 transition-transform duration-700">
                                    <Image
                                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600"
                                        alt="Gemstone Collection"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-[9px] tracking-[0.2em] uppercase text-white/80 font-medium">
                                            New Limited
                                        </p>
                                        <p className="text-[11px] tracking-[0.15em] uppercase text-white font-semibold">
                                            Summer Collection
                                        </p>
                                    </div>
                                    {/* Arrow */}
                                    <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#b5a16d] transition-colors duration-500">
                                        <svg className="w-3 h-3 text-white -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Second Small Card */}
                                <div className="w-28 h-36 md:w-36 md:h-44 rounded-xl overflow-hidden relative ml-4 group-hover:scale-105 transition-transform duration-700 delay-75">
                                    <Image
                                        src="https://images.unsplash.com/photo-1617058866388-7509f9a74797?auto=format&fit=crop&q=80&w=600"
                                        alt="Earrings Collection"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-[9px] tracking-[0.15em] uppercase text-white/80">
                                            Gemstones
                                        </p>
                                        <p className="text-[10px] tracking-[0.1em] uppercase text-white font-medium">
                                            New Arrivals
                                        </p>
                                    </div>
                                    <div className="absolute bottom-4 right-4 w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <svg className="w-2.5 h-2.5 text-white -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image Card - Large */}
                    <div
                        data-bento-tile
                        className="col-span-12 md:col-span-7 row-span-2 min-h-[400px] md:min-h-[500px]"
                        onMouseEnter={() => setHoveredCard('hero')}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer">
                            <Image
                                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200"
                                alt="Featured Gemstone"
                                fill
                                className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Promo Badge */}
                            <div className="absolute bottom-8 right-8 text-right">
                                <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-white font-light">
                                    GET <span className="text-[#b5a16d]">20%</span> OFF THE
                                </p>
                                <p className="text-3xl md:text-4xl lg:text-5xl font-serif text-white font-semibold tracking-wide flex items-center justify-end gap-4 mt-2">
                                    SPRING SALE!
                                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#b5a16d] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </p>
                            </div>

                            {/* Floating Label */}
                            <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <span className="text-[10px] tracking-[0.3em] uppercase text-white font-medium">Featured</span>
                            </div>

                            {/* Hover Overlay */}
                            <div className={`absolute inset-0 bg-[#b5a16d]/0 transition-colors duration-500 ${hoveredCard === 'hero' ? 'bg-[#b5a16d]/10' : ''}`} />
                        </div>
                    </div>

                    {/* Collection Cards Row */}
                    <div
                        data-bento-tile
                        className="col-span-6 md:col-span-4 min-h-[280px] md:min-h-[320px]"
                        onMouseEnter={() => setHoveredCard('ruby')}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <Link href="/gemstones" className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer block">
                            <Image
                                src="https://images.unsplash.com/photo-1615486511484-92e57bb6eb64?auto=format&fit=crop&q=80&w=800"
                                alt="Ruby Collection"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="text-[9px] tracking-[0.3em] uppercase text-[#b5a16d] font-medium block mb-2">
                                    Premium
                                </span>
                                <h4 className="text-xl md:text-2xl font-serif text-white italic">
                                    The Midnight <br />
                                    <span className="not-italic font-medium">Sapphire</span>
                                </h4>
                                <p className="text-[10px] tracking-[0.2em] uppercase text-white/60 mt-3">
                                    Inquire for Price
                                </p>
                            </div>
                            <div className={`absolute inset-0 border-2 border-[#b5a16d]/0 rounded-2xl transition-all duration-500 ${hoveredCard === 'ruby' ? 'border-[#b5a16d]/40' : ''}`} />
                        </Link>
                    </div>

                    <div
                        data-bento-tile
                        className="col-span-6 md:col-span-4 min-h-[280px] md:min-h-[320px]"
                        onMouseEnter={() => setHoveredCard('diamond')}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <Link href="/gemstones" className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer block bg-[#F5E6B8] dark:bg-[#2A2520]">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                    src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800"
                                    alt="Diamond"
                                    fill
                                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#F5E6B8]/90 dark:from-[#2A2520]/90 via-transparent to-[#F5E6B8]/40 dark:to-[#2A2520]/40" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <h4 className="text-xl md:text-2xl font-serif text-[#1A1A1A] dark:text-white">
                                    The Solar <br />
                                    <span className="italic text-[#8B7355] dark:text-[#b5a16d]">Diamond</span>
                                </h4>
                                <p className="text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/50 dark:text-white/50 mt-3">
                                    Inquire for Price
                                </p>
                            </div>
                            <div className={`absolute inset-0 border-2 border-[#b5a16d]/0 rounded-2xl transition-all duration-500 ${hoveredCard === 'diamond' ? 'border-[#b5a16d]/40' : ''}`} />
                        </Link>
                    </div>

                    <div
                        data-bento-tile
                        className="col-span-12 md:col-span-4 min-h-[280px] md:min-h-[320px]"
                        onMouseEnter={() => setHoveredCard('emerald')}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <Link href="/gemstones" className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer block bg-[#8B4D5C] dark:bg-[#5C1A2A]">
                            <Image
                                src="https://images.unsplash.com/photo-1551122087-f99a0442bcf8?auto=format&fit=crop&q=80&w=800"
                                alt="Ruby"
                                fill
                                className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#8B4D5C]/90 dark:from-[#5C1A2A]/90 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                <div>
                                    <h4 className="text-xl md:text-2xl font-serif text-white">
                                        The Crimson <br />
                                        <span className="italic">Ruby</span>
                                    </h4>
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 mt-3">
                                        Inquire for Price
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#b5a16d] transition-all duration-500 group-hover:scale-110">
                                    <svg className="w-4 h-4 text-white -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className={`absolute inset-0 border-2 border-[#b5a16d]/0 rounded-2xl transition-all duration-500 ${hoveredCard === 'emerald' ? 'border-[#b5a16d]/40' : ''}`} />
                        </Link>
                    </div>

                    {/* CTA Row */}
                    <div
                        data-bento-tile
                        className="col-span-12 min-h-[100px]"
                    >
                        <Link
                            href="/gemstones"
                            className="w-full h-full rounded-2xl bg-[#1A1A1A] dark:bg-[#b5a16d] flex items-center justify-between px-8 md:px-12 group hover:bg-[#2A2A2A] dark:hover:bg-[#a08b5a] transition-all duration-500"
                        >
                            <div className="flex items-center gap-4">
                                <span className="w-2 h-2 rounded-full bg-[#b5a16d] dark:bg-[#1A1A1A] animate-pulse" />
                                <span className="text-sm md:text-base tracking-[0.3em] uppercase text-white dark:text-[#1A1A1A] font-medium">
                                    Explore the Full Collection
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs tracking-[0.2em] uppercase text-white/50 dark:text-[#1A1A1A]/50 hidden md:block">
                                    15+ Rare Pieces
                                </span>
                                <div className="w-12 h-12 rounded-full border border-white/20 dark:border-[#1A1A1A]/20 flex items-center justify-center group-hover:bg-white/10 dark:group-hover:bg-[#1A1A1A]/10 transition-all duration-500">
                                    <svg className="w-5 h-5 text-white dark:text-[#1A1A1A] group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
