"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const prismRef = useRef<HTMLDivElement>(null);
    const prismBetaRef = useRef<HTMLDivElement>(null);
    const titlePart1Ref = useRef<HTMLSpanElement>(null);
    const titlePart2Ref = useRef<HTMLSpanElement>(null);
    const volumeRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const centralVisualRef = useRef<HTMLDivElement>(null);
    const natureTextRef = useRef<HTMLHeadingElement>(null);
    const craftedTextRef = useRef<HTMLHeadingElement>(null);
    const narrativeHintRef = useRef<HTMLDivElement>(null);
    const glyphRef = useRef<HTMLDivElement>(null);

    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

    // Use GSAP for the "smooth" mouse follower state instead of React state for performance
    const xSet = useRef<((value: number) => void) | null>(null);
    const ySet = useRef<((value: number) => void) | null>(null);

    useGSAP(() => {
        // Initial Reveal Animation
        const tl = gsap.timeline();

        tl.to([titlePart1Ref.current], { x: 0, opacity: 1, duration: 2, ease: "power2.out" })
            .to([titlePart2Ref.current], { x: 0, opacity: 1, duration: 2.2, ease: "power2.out" }, "-=1.8")
            .to(lineRef.current, { scaleY: 1, duration: 2, ease: "power2.out" }, "-=1.5")
            .to(volumeRef.current, { opacity: 0.2, duration: 2, ease: "power2.out" }, "-=1.5")
            .to(centralVisualRef.current, { scale: 1, opacity: 1, duration: 2.5, ease: "power2.out" }, "-=2")
            .to(natureTextRef.current, { opacity: 1, duration: 2, ease: "power2.out" }, "-=2")
            .to(craftedTextRef.current, { y: 0, opacity: 1, duration: 2.2, ease: "power2.out" }, "-=1.5")
            .to(narrativeHintRef.current, { opacity: 0.4, duration: 1, ease: "power2.out" }, "-=0.5")
            .to([prismRef.current], { opacity: 0.2, scale: 1, duration: 2 }, "-=2")
            .to([prismBetaRef.current], { opacity: 0.1, scale: 1, duration: 2.5 }, "-=2")
            .to(glyphRef.current, { opacity: 0.2, scale: 1, duration: 2.5 }, "-=2");

        // Mouse Movement Parallax Setup
        xSet.current = gsap.quickTo(prismRef.current, "x", { duration: 1, ease: "power3" });
        ySet.current = gsap.quickTo(prismRef.current, "y", { duration: 1, ease: "power3" });

    }, { scope: containerRef });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5);
            const y = (e.clientY / window.innerHeight - 0.5);
            setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });

            // Clean GSAP optimized movement
            if (prismRef.current) {
                gsap.to(prismRef.current, { x: x * -60, y: y * -60, duration: 1 });
            }
            if (prismBetaRef.current) {
                gsap.to(prismBetaRef.current, { x: x * 100, y: y * 100, duration: 1.2 });
            }
            if (centralVisualRef.current) {
                gsap.to(centralVisualRef.current, { x: x * 40, y: y * 40, duration: 1.5 });
            }
            if (glyphRef.current) {
                gsap.to(glyphRef.current, { x: x * -140, y: y * -140, duration: 2 });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0B] text-[#FBFBF9]"
        >
            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 opacity-60 transition-opacity duration-1000"
                    style={{
                        background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, #1a1a1c 0%, #0A0A0B 80%)`
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.03] mix-blend-screen"
                    style={{
                        background: `radial-gradient(circle at ${(1 - mousePos.x) * 100}% ${(1 - mousePos.y) * 100}%, #b5a16d 0%, transparent 50%)`
                    }}
                />
                <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
                    <svg width="100%" height="100%">
                        <filter id="heroNoise">
                            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
                            <feColorMatrix type="saturate" values="0" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#heroNoise)" />
                    </svg>
                </div>
            </div>

            {/* Floating Prisms */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <div
                    ref={prismRef}
                    className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] border border-white/5 rounded-[40%_60%_70%_30%/40%_40%_60%_60%] animate-[morph_20s_infinite_linear] opacity-0 scale-95"
                >
                    <div className="absolute inset-4 border border-white/2 rounded-inherit blur-sm" />
                </div>

                <div
                    ref={prismBetaRef}
                    className="absolute bottom-1/4 right-1/4 w-[38vw] h-[38vw] border border-[#b5a16d]/10 rounded-[60%_40%_30%_70%/70%_70%_30%_30%] animate-[morph_15s_infinite_linear_reverse] opacity-0 scale-90"
                >
                    <div className="absolute inset-0 border-l border-t border-[#b5a16d]/5 rounded-inherit animate-pulse" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-20 w-full max-w-[1600px] px-10 md:px-24">
                <div className="flex flex-col gap-0 select-none">

                    <div className="flex items-end justify-between mb-[-2vh] relative">
                        <h1 className="text-[14vw] md:text-[12vw] font-light serif leading-[0.75] tracking-tight uppercase flex items-baseline">
                            <span ref={titlePart1Ref} className="opacity-0 -translate-x-20">
                                Ra
                            </span>
                            <span ref={titlePart2Ref} className="italic text-[#b5a16d] opacity-0 -translate-x-10">
                                re
                            </span>
                        </h1>
                        <div ref={lineRef} className="hidden lg:block w-px h-32 bg-white/10 mb-8 origin-bottom scale-y-0" />
                        <div ref={volumeRef} className="hidden lg:block text-[9px] tracking-[1.2em] uppercase opacity-0 mb-8 font-sans font-light">
                            Volume 01 / Archive
                        </div>
                    </div>

                    <div className="relative flex items-center justify-center py-6">
                        <div
                            ref={centralVisualRef}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 scale-75"
                        >
                            <div
                                className="w-[26vw] aspect-square rounded-full border border-white/10 flex items-center justify-center"
                            >
                                <div className="w-[82%] h-[82%] rounded-full overflow-hidden relative grayscale group shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                                    <Image
                                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
                                        alt="Refraction Focus"
                                        fill
                                        className="object-cover transition-transform duration-[12s] group-hover:scale-110"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0A0B]/80 via-transparent to-[#b5a16d]/20 mix-blend-overlay" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[sweep_8s_infinite_ease-in-out]" />
                                </div>
                                <div className="absolute inset-[-4.5vw] animate-[spin_40s_linear_infinite]">
                                    <svg viewBox="0 0 100 100" className="w-full h-full fill-white/10">
                                        <path id="heroCirclePath" d="M 50, 50 m -48, 0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" fill="transparent" />
                                        <text className="text-[3px] tracking-[4px] uppercase font-medium font-sans">
                                            <textPath href="#heroCirclePath">
                                                • TIMELESS CRAFT • THE PATIENCE OF NATURE • REFINED BY VISION • EST. MCMXC •
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <h2 ref={natureTextRef} className="text-[12vw] md:text-[10vw] font-light serif uppercase tracking-tighter mix-blend-difference opacity-0">
                            Nature
                        </h2>
                    </div>

                    <div className="flex items-start justify-between mt-[-2vh] relative">
                        <div className="hidden lg:flex flex-col gap-6 mt-12 opacity-0 translate-y-10" style={{ animation: 'none' /* Handled by GSAP if we targeted it, but leaving simple as text */ }}>
                            {/* Leaving this static or simple fade for now, or add ref if needed */}
                            <p className="text-[10px] tracking-[0.5em] uppercase opacity-30 max-w-[190px] leading-loose font-sans">
                                Crafted for those who understand rarity beyond brilliance.
                            </p>
                            <div className="w-10 h-px bg-[#b5a16d]/30" />
                        </div>

                        <h1 ref={craftedTextRef} className="text-[14vw] md:text-[13vw] font-light serif leading-[0.75] tracking-tight uppercase text-right opacity-0 translate-y-20">
                            <span className="block">
                                Craf
                            </span>
                            <span className="italic block">
                                ted
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            <div ref={narrativeHintRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0">
                <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
                <span className="text-[8px] tracking-[1.5em] uppercase font-light font-sans">The Narrative Unfolds</span>
            </div>

            <div
                ref={glyphRef}
                className="absolute top-1/2 right-12 md:right-24 -translate-y-1/2 hidden md:block opacity-0 scale-50"
            >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-[pulse_4s_infinite_ease-in-out]">
                    <path d="M20 0L22.5 17.5L40 20L22.5 22.5L20 40L17.5 22.5L0 20L17.5 17.5L20 0Z" fill="currentColor" />
                </svg>
            </div>

            {/* Keep the morph animations as efficiently CSS for continuous loops */}
            <style jsx global>{`
        @keyframes morph {
          0%, 100% { border-radius: 35% 65% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 50% 50% 30% 70% / 70% 30% 70% 30%; }
          50% { border-radius: 65% 35% 30% 70% / 70% 70% 30% 30%; }
          75% { border-radius: 30% 70% 70% 30% / 50% 30% 70% 50%; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(-25deg); }
          50% { transform: translateX(150%) skewX(-25deg); }
          100% { transform: translateX(150%) skewX(-25deg); }
        }
      `}</style>
        </section>
    );
};

export default Hero;
