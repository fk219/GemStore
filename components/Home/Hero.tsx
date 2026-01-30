import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const Hero: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [smoothMousePos, setSmoothMousePos] = useState({ x: 0.5, y: 0.5 });

    useGSAP(() => {
        // Background parallax effect (From CTA)
        // Background parallax
        gsap.to(".bg-parallax", {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Prisms Parallax - REMOVED

    }, { scope: containerRef });


    useEffect(() => {
        setMounted(true);
        let rafId: number;
        const targetPos = { x: 0.5, y: 0.5 };
        const currentPos = { x: 0.5, y: 0.5 };

        const handleMouseMove = (e: MouseEvent) => {
            targetPos.x = e.clientX / window.innerWidth;
            targetPos.y = e.clientY / window.innerHeight;
            setMousePos({ x: targetPos.x, y: targetPos.y });
        };

        const updateSmoothPos = () => {
            // Create a lagging, silky smooth movement effect
            currentPos.x += (targetPos.x - currentPos.x) * 0.05;
            currentPos.y += (targetPos.y - currentPos.y) * 0.05;
            setSmoothMousePos({ x: currentPos.x, y: currentPos.y });
            rafId = requestAnimationFrame(updateSmoothPos);
        };

        window.addEventListener('mousemove', handleMouseMove);
        updateSmoothPos();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9]"
        >
            {/* The Refractive Void - Multi-layered Dynamic Background */}
            <div className="absolute inset-0 z-0">
                {/* Layer 1: Deep Base Orbit */}
                <div
                    className="absolute inset-0 opacity-60 transition-opacity duration-1000"
                    style={{
                        background: `radial-gradient(circle at ${smoothMousePos.x * 100}% ${smoothMousePos.y * 100}%, var(--hero-gradient-1-start) 0%, var(--hero-gradient-1-end) 80%)`
                    }}
                />

                {/* Golden Blob Parallax (Enhanced Coverage - Refined Size) */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    {/* Primary Top-Left Swath */}
                    <div className="bg-parallax absolute top-[-40%] left-[-10%] w-[700px] h-[700px] bg-[#D4AF37] rounded-full blur-[140px] mix-blend-soft-light" />

                    {/* Deep Right Anchor */}
                    <div className="bg-parallax absolute bottom-[-30%] right-[-10%] w-[500px] h-[500px] bg-[#997B28] rounded-full blur-[120px] mix-blend-soft-light" />

                    {/* Top Right Highlight */}
                    <div className="bg-parallax absolute top-[-20%] right-[10%] w-[400px] h-[400px] bg-[#F4E285] rounded-full blur-[100px] mix-blend-soft-light opacity-60" />

                    {/* Bottom Left Fill */}
                    <div className="bg-parallax absolute bottom-[10%] left-[-20%] w-[500px] h-[500px] bg-[#D4AF37] rounded-full blur-[130px] mix-blend-soft-light opacity-50" />
                </div>

                {/* Layer 2: Subtle Golden Shift (Refraction) */}
                <div
                    className="absolute inset-0 opacity-[0.03] mix-blend-screen"
                    style={{
                        background: `radial-gradient(circle at ${(1 - smoothMousePos.x) * 100}% ${(1 - smoothMousePos.y) * 100}%, #b5a16d 0%, transparent 50%)`
                    }}
                />

                {/* Minimalist Professional Stars */}
                <div className="absolute inset-0 pointer-events-none">
                    {[
                        { top: '18%', left: '12%', size: 16, delay: 0, opacity: 0.6 },
                        { top: '25%', left: '88%', size: 24, delay: 1.2, opacity: 0.4 },
                        { top: '45%', left: '8%', size: 12, delay: 2.5, opacity: 0.5 },
                        { top: '55%', left: '92%', size: 20, delay: 0.5, opacity: 0.3 },
                        { top: '72%', left: '18%', size: 18, delay: 3.1, opacity: 0.5 },
                        { top: '12%', left: '48%', size: 14, delay: 1.8, opacity: 0.4 },
                        { top: '82%', left: '75%', size: 22, delay: 2.2, opacity: 0.6 },
                        { top: '35%', left: '75%', size: 10, delay: 4.0, opacity: 0.3 },
                        { top: '65%', left: '25%', size: 12, delay: 1.5, opacity: 0.4 },
                    ].map((star, i) => (
                        <div
                            key={i}
                            className="absolute text-[#b5a16d]"
                            style={{
                                top: star.top,
                                left: star.left,
                                width: star.size,
                                height: star.size,
                                opacity: star.opacity,
                                animation: `twinkle 4s ease-in-out infinite ${star.delay}s`
                            }}
                        >
                            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full drop-shadow-[0_0_2px_rgba(181,161,109,0.8)]">
                                {/* Thin, elegant 4-point star path */}
                                <path d="M50 0 C55 35 65 45 100 50 C 65 55 55 65 50 100 C 45 65 35 55 0 50 C 35 45 45 35 50 0 Z" />
                            </svg>
                        </div>
                    ))}
                </div>

                {/* Shimmering Grain Overlay */}
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

            {/* Floating Refraction Prisms - REMOVED */}

            {/* Architectural Typography - The Core Narrative */}
            <div className="relative z-20 w-full max-w-[1600px] px-10 md:px-24">
                <div className="flex flex-col gap-0 select-none">

                    {/* Row 1: Rarity Concept */}
                    <div className="flex items-end justify-between mb-[-2vh] relative">
                        <h1 className="text-[14vw] md:text-[12vw] font-light serif leading-[0.75] tracking-tight uppercase flex items-baseline">
                            <span className={`transition-all duration-[2s] cubic-bezier(0.19,1,0.22,1) ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                                Ra
                            </span>
                            <span className={`italic text-[#9F8236] transition-all duration-[2.2s] cubic-bezier(0.19,1,0.22,1) delay-100 ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                re
                            </span>
                        </h1>

                        {/* Centered Vertical Line (Absolute) */}
                        <div className={`hidden lg:block absolute left-1/2 -translate-x-1/2 bottom-8 w-px h-32 bg-current opacity-10 origin-bottom transition-all duration-[2s] delay-500 ${mounted ? 'scale-y-100' : 'scale-y-0'}`} />

                        <div className={`hidden lg:block text-[9px] tracking-[1.2em] uppercase text-[#9F8236] mb-8 transition-opacity duration-[2s] delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                            Volume 01 / Archive
                        </div>
                    </div>

                    {/* Row 2: The Vision */}
                    <div className="relative flex items-center justify-center py-6">
                        {/* Central Bespoke Visual - Abstract Gemstone Focus */}
                        <div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{ transform: `translate3d(${(smoothMousePos.x - 0.5) * 20}px, ${(smoothMousePos.y - 0.5) * 20}px, 0)` }}
                        >
                            <div
                                className={`w-[26vw] aspect-square rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center transition-all duration-[2.5s] pointer-events-auto cursor-pointer group ${mounted ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                            >
                                <div className="w-[85%] h-[85%] rounded-full overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700 shadow-[0_0_80px_rgba(0,0,0,0.5)] flex items-center justify-center bg-black/5">
                                    <img
                                        src="/images/home/hero/3dLogo.webp"
                                        className="w-full h-full object-contain transition-transform duration-[12s] group-hover:scale-110"
                                        alt="Maihan 3D Emblem"
                                    />
                                    {/* Golden Spark Overlay */}
                                    <div className="absolute inset-0 bg-[#b5a16d] mix-blend-overlay opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0A0B]/80 via-transparent to-[#b5a16d]/20 mix-blend-overlay" />
                                    {/* Dynamic Light sweep */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[sweep_8s_infinite_ease-in-out]"
                                    />
                                </div>
                                {/* Rotating Micro-Text */}
                                <div className="absolute inset-[-4.5vw] animate-[spin_40s_linear_infinite]">
                                    <svg viewBox="0 0 100 100" className="w-full h-full fill-black/10 dark:fill-white/10">
                                        <path id="heroCirclePath" d="M 50, 50 m -48, 0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" fill="transparent" />
                                        <text className="text-[3px] tracking-[4px] uppercase font-medium">
                                            <textPath href="#heroCirclePath">
                                                • TIMELESS CRAFT • THE PATIENCE OF NATURE • REFINED BY VISION • EST. MCMXC •
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <h2 className={`text-[12vw] md:text-[15vw] font-light serif uppercase tracking-tighter mix-blend-exclusion text-[#F9F8F4] dark:mix-blend-difference dark:text-inherit transition-all duration-[2s] delay-300 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                            Nature
                        </h2>
                    </div>

                    {/* Row 3: The Statement */}
                    <div className="flex items-start justify-between mt-[-2vh] relative">
                        <div className={`hidden lg:flex flex-col gap-6 mt-12 transition-all duration-[2s] delay-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <p className="text-[10px] tracking-[0.5em] uppercase opacity-30 max-w-[190px] leading-loose">
                                Crafted for those who understand rarity beyond brilliance.
                            </p>
                            <div className="w-10 h-px bg-[#b5a16d]/30" />
                        </div>

                        <h1 className="text-[14vw] md:text-[13vw] font-light serif leading-[0.75] tracking-tight uppercase text-right">
                            <span className={`transition-all duration-[2.2s] cubic-bezier(0.19,1,0.22,1) delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                                Craf
                            </span>
                            <span className={`italic transition-all duration-[2.2s] cubic-bezier(0.19,1,0.22,1) delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                                ted
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* Dynamic Interaction Hint */}
            <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 transition-all duration-1000 delay-[2s] ${mounted ? 'opacity-40' : 'opacity-0'}`}>
                <div className="w-px h-16 bg-gradient-to-b from-current to-transparent" />
                <span className="text-[12px] tracking-[1.5em] uppercase font-light">The Narrative Unfolds</span>
            </div>

            {/* Decorative Floating Glyph - Enhanced responsive depth */}
            <div
                className={`absolute top-1/2 right-12 md:right-24 -translate-y-1/2 hidden md:block transition-all duration-[2.5s] delay-1000 ${mounted ? 'opacity-20 scale-100' : 'opacity-0 scale-50'}`}
                style={{ transform: `translate3d(${(smoothMousePos.x - 0.5) * -70}px, ${(smoothMousePos.y - 0.5) * -70}px, 0)` }}
            >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-[pulse_4s_infinite_ease-in-out]">
                    <path d="M20 0L22.5 17.5L40 20L22.5 22.5L20 40L17.5 22.5L0 20L17.5 17.5L20 0Z" fill="currentColor" />
                </svg>
            </div>

            <style>{`
        /* morph keyframes removed */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(-25deg); }
          50% { transform: translateX(150%) skewX(-25deg); }
          100% { transform: translateX(150%) skewX(-25deg); }
        }
        @keyframes twinkle {
            0%, 100% { opacity: 0.4; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
        }
        
        /* Theme Variables */
        :root {
            --hero-gradient-1-start: #E5E5E5;
            --hero-gradient-1-end: #F9F8F4;
        }
        .dark {
            --hero-gradient-1-start: #1a1a1c;
            --hero-gradient-1-end: #0A0A0B;
        }
      `}</style>
        </section>
    );
};

export default Hero;
