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
        gsap.set([rareRef.current, natureRef.current, craftedRef.current], { opacity: 0, y: 100, rotateX: 10 });
        gsap.set(visualRef.current, { scale: 0.8, opacity: 0, filter: "blur(20px)" });
        gsap.set([volumeRef.current, descRef.current], { opacity: 0 });
        gsap.set(lineRef.current, { scaleY: 0 });

        // Animation Sequence
        tl.to(visualRef.current, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2.5, ease: "slow(0.7, 0.7, false)" })
            .to(rareRef.current, { opacity: 1, y: 0, rotateX: 0, duration: 1.8, ease: "power4.out" }, "-=2")
            .to(natureRef.current, { opacity: 1, y: 0, rotateX: 0, duration: 1.8, ease: "power4.out" }, "-=1.6")
            .to(craftedRef.current, { opacity: 1, y: 0, rotateX: 0, duration: 1.8, ease: "power4.out" }, "-=1.6")
            .to(lineRef.current, { scaleY: 1, duration: 1.5, ease: "expo.inOut" }, "-=1.2")
            .to([volumeRef.current, descRef.current], { opacity: 0.6, duration: 1.5 }, "-=1");

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] text-[#FBFBF9] perspective-[1000px]"
        >
            {/* Background Gradient/Noise layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-30 transition-opacity duration-1000"
                    style={{
                        background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, #2A2A2C 0%, #000000 70%)`
                    }}
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-100 mix-blend-overlay"></div>
            </div>

            {/* Grid / Layout Container */}
            <div className="relative z-10 w-full h-full max-w-[1800px] px-6 md:px-12 flex flex-col justify-center min-h-screen py-24">

                {/* Top Row: RARE (Left) + Volume (Right) */}
                <div className="flex justify-between items-start mb-12 md:mb-0 relative">
                    <h1 ref={rareRef} className="text-[17vw] md:text-[14vw] font-serif leading-[0.75] tracking-tight mix-blend-exclusion z-20 origin-bottom transform-gpu">
                        <span className="text-[#FBFBF9]">RA</span>
                        <span className="text-[#c5b38d] italic font-light">RE</span>
                    </h1>

                    <div ref={volumeRef} className="hidden md:block absolute top-8 right-0 text-[9px] tracking-[0.8em] uppercase font-sans font-extralight opacity-0 text-white/70">
                        Volume 01 — Archive
                    </div>
                </div>

                {/* Middle Layer: Visual + NATURE (Centered) */}
                <div className="relative w-full flex items-center justify-center -mt-[6vw] md:-mt-[9vw] mb-[2vw]">
                    {/* Circle Image Wrapper */}
                    <div ref={visualRef} className="relative w-[50vw] h-[50vw] md:w-[28vw] md:h-[28vw] rounded-full overflow-hidden border border-white/5 z-10 opacity-0 group shadow-2xl shadow-indigo-500/10">
                        <div className="absolute inset-0 bg-black/10 z-10" />
                        <Image
                            src="https://images.unsplash.com/photo-1601156226066-88a24564c7ee?auto=format&fit=crop&q=80&w=1200" // Abstract Gem Maco
                            alt="Abstraction"
                            fill
                            className="object-cover contrast-110 saturate-0 hover:saturate-50 transition-all duration-[5s] ease-out group-hover:scale-110"
                            priority
                        />
                        {/* Spinning Text Ring (SVG) */}
                        <div className="absolute inset-2 animate-[spin_80s_linear_infinite] z-20 opacity-40 mix-blend-overlay">
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                                <path id="circlePath" d="M 50, 50 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" fill="transparent" />
                                <text className="text-[2px] tracking-[2.5px] uppercase font-light font-sans">
                                    <textPath href="#circlePath">
                                        • Refined by Nature • Crafted by Time • Timeless Elegance •
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* NATURE Text Overlapping */}
                    <h1 ref={natureRef} className="absolute text-[15vw] md:text-[12vw] font-serif uppercase tracking-normal z-20 text-white/90 pointer-events-none select-none mix-blend-difference italic font-thin origin-center transform-gpu">
                        Nature
                    </h1>
                </div>

                {/* Bottom Row: Description (Left) + CRAFTED (Right/Center) */}
                <div className="flex flex-col md:flex-row items-end justify-between relative -mt-[3vw]">

                    {/* Bottom Left Details */}
                    <div ref={descRef} className="hidden md:flex flex-col gap-8 mb-8 max-w-xs opacity-0">
                        <div ref={lineRef} className="w-full h-px bg-white/20 origin-left" />
                        <p className="text-[9px] tracking-[0.3em] uppercase leading-loose font-sans font-light text-white/50">
                            Crafted for those <br />
                            who understand <br />
                            rarity beyond <br />
                            brilliance.
                        </p>
                    </div>

                    {/* CRAFTED Text */}
                    <h1 ref={craftedRef} className="w-full text-center md:text-right text-[17vw] md:text-[14vw] font-serif leading-[0.75] tracking-tight text-[#FBFBF9] opacity-0 whitespace-nowrap z-20 origin-top transform-gpu">
                        CRAFTED
                    </h1>

                    {/* Narrative Hint (Bottom Centered Absolute) */}
                    <div className="absolute bottom-[-5rem] left-1/2 -translate-x-1/2 hidden md:block opacity-30 animate-bounce delay-1000">
                        <span className="text-[8px] tracking-[1em] uppercase font-sans">Scroll</span>
                    </div>
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
