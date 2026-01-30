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
        <section className="py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-[#F9F8F4] dark:bg-[#0A0A0B]">
            <div ref={containerRef} className="max-w-[1600px] mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16">
                    <div>
                        <span className="text-[10px] tracking-[0.5em] uppercase text-[#b5a16d] block mb-4 font-medium">
                            Volume 07 / Curated Selection
                        </span>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-light font-serif text-[#1A1A1A] dark:text-white">
                            The <span className="italic text-[#b5a16d]">Collection</span>
                        </h2>
                    </div>
                    <p className="text-sm text-[#666] dark:text-white/50 max-w-xs mt-6 md:mt-0 tracking-wide leading-relaxed">
                        Each piece is designed to inspire confidence and celebrate your unique style.
                    </p>
                </div>

                {/* Bento Grid Layout - Masonry Style */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[300px]">

                    {/* 1. TAL LEFT (Vertical Video/Image) - Row Span 2 */}
                    <div
                        data-bento-tile
                        className="col-span-1 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer"
                        onMouseEnter={() => setHoveredCard('craft')}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1617058866388-7509f9a74797?auto=format&fit=crop&q=80&w=800"
                            alt="The Art of Cutting"
                            fill
                            className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                        {/* Play Icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6">
                            <span className="text-[10px] tracking-[0.2em] uppercase text-white/80 bg-black/50 backdrop-blur-md px-2 py-1 rounded-sm">
                                Behind the Scenes
                            </span>
                            <h3 className="text-2xl font-serif text-white mt-3 leading-tight">
                                Master <br /> <span className="italic text-[#b5a16d]">Atelier</span>
                            </h3>
                        </div>
                    </div>

                    {/* 2. TOP MIDDLE (Wide) - Col Span 2 */}
                    <div
                        data-bento-tile
                        className="col-span-1 md:col-span-2 relative rounded-2xl overflow-hidden group"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
                            alt="Team Collaboration"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:bg-[#b5a16d] group-hover:text-white transition-all duration-300">
                            <svg className="w-4 h-4 text-white -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                        <div className="absolute bottom-6 left-6">
                            <h3 className="text-xl font-serif text-white">Global Expeditions</h3>
                            <p className="text-xs text-white/70 mt-1 uppercase tracking-widest">Sourcing Rare Gems</p>
                        </div>
                    </div>

                    {/* 3. TOP RIGHT (Square) */}
                    <div
                        data-bento-tile
                        className="col-span-1 relative rounded-2xl overflow-hidden group bg-[#E5E5E5] dark:bg-[#1A1A1A]"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800"
                            alt="Founder"
                            fill
                            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                        <div className="absolute bottom-4 left-4">
                            <h3 className="text-lg font-mono text-white">Visionary</h3>
                        </div>
                    </div>

                    {/* 4. BOTTOM LEFT MIDDLE (Orange/Info) */}
                    <div
                        data-bento-tile
                        className="col-span-1 relative rounded-2xl overflow-hidden bg-[#D4AF37] group flex flex-col justify-end p-6"
                    >
                        {/* Grid Pattern overlay */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                        <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                            <h2 className="text-6xl font-serif text-white leading-none">50+</h2>
                            <p className="text-2xl font-serif text-white/90 mt-2 leading-tight">
                                Rare <br /> Origins
                            </p>
                            <p className="text-[10px] tracking-widest uppercase text-white/60 mt-4 border-t border-white/20 pt-4">
                                Curated Globally
                            </p>
                        </div>
                    </div>

                    {/* 5. BOTTOM RIGHT MIDDLE (Square) */}
                    <div
                        data-bento-tile
                        className="col-span-1 relative rounded-2xl overflow-hidden group"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1620215175664-cb4a14c67bc7?auto=format&fit=crop&q=80&w=800"
                            alt="Workshop"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>

                        <div className="absolute bottom-4 left-4">
                            <p className="text-xs font-mono text-white/90">Est. 1990</p>
                        </div>
                    </div>

                    {/* 6. FAR RIGHT (Tall/Vertical) - Row Span 1 (actually user image shows Row 2 Col 4 is tall? No, lets make it 1x1 or tall if grid allows. The grid is 4x2. Col 4 Row 2 is the last spot. 
                       Wait, in a 4 col grid:
                       R1: [1][2][2][3]
                       R2: [1][4][5][?]
                       Item 6 goes to R2 C4. It should conform to row-span-1 to fit 2 rows total, OR row-span-2 if we want it to hang down (masonry). 
                       Let's make it row-span-1 (Square) so the grid is clean 4x2 rectangle, or 2 if we want overflow.
                       User ref has varying heights. Let's start with a clean 4x2 blocks with Card 1 spanning 2 rows.
                       So Card 6 is just standard. 
                    */}
                    <div
                        data-bento-tile
                        className="col-span-1 relative rounded-2xl overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-[#0A0A0B]">
                            {/* Video Placeholder */}
                            <Image
                                src="https://images.unsplash.com/photo-1600003014605-4c07d391aa57?auto=format&fit=crop&q=80&w=800"
                                alt="Founder Story"
                                fill
                                className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Play Button */}
                            <div className="absolute bottom-6 left-6 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-[#b5a16d] group-hover:border-[#b5a16d] transition-all duration-300">
                                <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* --- ROW 3: Abstract Extension --- */}

                    {/* 7. WIDE ABSTRACT (Bespoke) - Col Span 2 */}
                    <div
                        data-bento-tile
                        className="col-span-1 md:col-span-2 relative rounded-2xl overflow-hidden group bg-[#111]"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&q=80&w=1200"
                            alt="Bespoke Design"
                            fill
                            className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                        <div className="absolute top-8 left-8 max-w-sm">
                            <span className="text-[10px] tracking-[0.3em] uppercase text-[#b5a16d] block mb-3">Private Commissions</span>
                            <h3 className="text-3xl font-serif text-white italic">The Art of <br /> Personalization</h3>
                        </div>
                        <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </div>
                    </div>

                    {/* 8. SQUARE (Minimal Text) - Col Span 1 */}
                    <div
                        data-bento-tile
                        className="col-span-1 relative rounded-2xl overflow-hidden group bg-[#F5F5F0] dark:bg-[#1A1A1A] p-8 flex flex-col justify-between"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#b5a16d]/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#b5a16d]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
                        </div>
                        <div>
                            <h4 className="text-lg font-serif text-[#1A1A1A] dark:text-white">Ethical <br /> Guardianship</h4>
                            <p className="text-xs text-[#666] dark:text-gray-400 mt-2 leading-relaxed">
                                Committed to responsible sourcing and environmental stewardship.
                            </p>
                        </div>
                    </div>

                    {/* 9. SQUARE (Visual) - Col Span 1 */}
                    <div
                        data-bento-tile
                        className="col-span-1 relative rounded-2xl overflow-hidden group"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1549887552-93f8efb0815e?auto=format&fit=crop&q=80&w=800"
                            alt="Gallery"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-[10px] tracking-[0.2em] uppercase border border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-300">
                                View Gallery
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
