"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rareRef = useRef<HTMLHeadingElement>(null);
    const natureRef = useRef<HTMLHeadingElement>(null);
    const craftedRef = useRef<HTMLHeadingElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);
    const volumeRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    // Mouse parallax state
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Initial Set
        gsap.set([rareRef.current, natureRef.current, craftedRef.current], { opacity: 0, y: 50 });
        gsap.set(visualRef.current, { scale: 0.8, opacity: 0 });
        gsap.set([volumeRef.current, descRef.current], { opacity: 0 });
        gsap.set(lineRef.current, { scaleY: 0 });

        // Animation Sequence
        tl.to(visualRef.current, { scale: 1, opacity: 1, duration: 2 })
            .to(rareRef.current, { opacity: 1, y: 0, duration: 1.5 }, "-=1.5")
            .to(natureRef.current, { opacity: 1, y: 0, duration: 1.5 }, "-=1.3")
            .to(craftedRef.current, { opacity: 1, y: 0, duration: 1.5 }, "-=1.3")
            .to(lineRef.current, { scaleY: 1, duration: 1.5 }, "-=1")
            .to([volumeRef.current, descRef.current], { opacity: 0.6, duration: 1 }, "-=0.5");

    }, { scope: containerRef });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5);
            const y = (e.clientY / window.innerHeight - 0.5);
            setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });

            if (natureRef.current) gsap.to(natureRef.current, { x: x * 20, y: y * 20, duration: 1 });
            if (visualRef.current) gsap.to(visualRef.current, { x: x * -10, y: y * -10, duration: 1.5 });
            if (rareRef.current) gsap.to(rareRef.current, { x: x * 10, y: y * 10, duration: 2 });
            if (craftedRef.current) gsap.to(craftedRef.current, { x: x * 15, y: y * 15, duration: 2 });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F0F0F] text-[#FBFBF9]"
        >
            {/* Background Gradient/Noise layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-40 transition-opacity duration-1000"
                    style={{
                        background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, #1a1a1c 0%, #000000 70%)`
                    }}
                />
            </div>

            {/* Grid / Layout Container */}
            <div className="relative z-10 w-full h-full max-w-[1800px] px-6 md:px-12 flex flex-col justify-center min-h-screen py-24">

                {/* Top Row: RARE (Left) + Volume (Right) */}
                <div className="flex justify-between items-start mb-12 md:mb-0 relative">
                    <h1 ref={rareRef} className="text-[15vw] md:text-[13vw] font-serif leading-[0.8] tracking-tight mix-blend-difference z-20">
                        <span className="text-[#FBFBF9]">RA</span>
                        <span className="text-[#b5a16d] italic">RE</span>
                    </h1>

                    <div ref={volumeRef} className="hidden md:block absolute top-8 right-0 text-[10px] tracking-[1.2em] uppercase font-sans font-light opacity-0">
                        Volume 01 / Archive
                    </div>
                </div>

                {/* Middle Layer: Visual + NATURE (Centered) */}
                <div className="relative w-full flex items-center justify-center -mt-[5vw] md:-mt-[8vw] mb-[2vw]">
                    {/* Circle Image Wrapper */}
                    <div ref={visualRef} className="relative w-[50vw] h-[50vw] md:w-[25vw] md:h-[25vw] rounded-full overflow-hidden border border-white/10 z-10 opacity-0 group">
                        <div className="absolute inset-0 bg-black/20 z-10" />
                        <Image
                            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
                            alt="Abstraction"
                            fill
                            className="object-cover grayscale contrast-125 transition-transform duration-[10s] ease-linear group-hover:scale-110"
                            priority
                        />
                        {/* Spinning Text Ring (SVG) */}
                        <div className="absolute inset-2 animate-[spin_60s_linear_infinite] z-20 opacity-30">
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                                <path id="circlePath" d="M 50, 50 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" fill="transparent" />
                                <text className="text-[2.5px] tracking-[3px] uppercase font-light font-sans">
                                    <textPath href="#circlePath">
                                        • Refined by Nature • Crafted by Time • Timeless Elegance •
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* NATURE Text Overlapping */}
                    <h1 ref={natureRef} className="absolute text-[13vw] md:text-[11vw] font-serif uppercase tracking-tight z-20 mix-blend-difference text-white pointer-events-none select-none">
                        Nature
                    </h1>
                </div>

                {/* Bottom Row: Description (Left) + CRAFTED (Right/Center) */}
                <div className="flex flex-col md:flex-row items-end justify-between relative -mt-[2vw]">

                    {/* Bottom Left Details */}
                    <div ref={descRef} className="hidden md:flex flex-col gap-8 mb-4 max-w-xs opacity-0">
                        <div ref={lineRef} className="w-full h-px bg-white/20 origin-left" />
                        <p className="text-[10px] tracking-[0.4em] uppercase leading-loose font-sans font-light text-white/60">
                            Crafted for those <br />
                            who understand <br />
                            rarity beyond <br />
                            brilliance.
                        </p>
                    </div>

                    {/* CRAFTED Text */}
                    <h1 ref={craftedRef} className="w-full text-center md:text-right text-[15vw] md:text-[13vw] font-serif leading-[0.8] tracking-tight text-[#FBFBF9] opacity-0 whitespace-nowrap z-20">
                        CRAFTED
                    </h1>

                    {/* Narrative Hint (Bottom Centered Absolute) */}
                    <div className="absolute bottom-[-4rem] left-1/2 -translate-x-1/2 hidden md:block opacity-30">
                        <span className="text-[8px] tracking-[1em] uppercase font-sans">The Narrative Unfolds</span>
                    </div>
                </div>

                {/* Decorative Star/Glyph */}
                <div className="absolute top-1/2 right-4 md:right-12 -translate-y-1/2 opacity-20 animate-pulse hidden md:block">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
                    </svg>
                </div>

            </div>

            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default Hero;
