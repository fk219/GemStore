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
        // Background parallax effect - Subtle 10% drift
        gsap.to(".bg-parallax", {
            yPercent: 10, // Reduced from 30
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
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
            // Ultra-smooth (0.03 easing) cinematic lag
            currentPos.x += (targetPos.x - currentPos.x) * 0.03;
            currentPos.y += (targetPos.y - currentPos.y) * 0.03;
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
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#F9F8F4] dark:bg-[#050505] text-[#1A1A1A] dark:text-[#FBFBF9]"
        >
            {/* The Refractive Void - Multi-layered Dynamic Background */}
            <div className="absolute inset-0 z-0">
                {/* Layer 1: Deep Base Orbit - Dynamic Gradient */}
                <div
                    className="absolute inset-0 opacity-80 dark:opacity-60 transition-opacity duration-1000"
                    style={{
                        background: `radial-gradient(circle at ${smoothMousePos.x * 100}% ${smoothMousePos.y * 100}%, var(--hero-gradient-1-start) 0%, var(--hero-gradient-1-end) 100%)`
                    }}
                />

                {/* Golden Blob Parallax (Subtle anchors) */}
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <div className="bg-parallax absolute top-[-40%] left-[15%] w-[700px] h-[700px] bg-[#D4AF37] rounded-full blur-[140px] mix-blend-soft-light dark:mix-blend-overlay" />
                    <div className="bg-parallax absolute bottom-[-30%] right-[5%] w-[500px] h-[500px] bg-[#997B28] rounded-full blur-[120px] mix-blend-soft-light dark:mix-blend-overlay" />
                </div>

                {/* Layer 2: Refractive Sheen */}
                <div
                    className="absolute inset-0 opacity-[0.04] mix-blend-screen pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${(1 - smoothMousePos.x) * 100}% ${(1 - smoothMousePos.y) * 100}%, #b5a16d 0%, transparent 60%)`
                    }}
                />

                {/* Fine Noise Texture */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay">
                    <svg width="100%" height="100%">
                        <filter id="heroNoise">
                            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                            <feColorMatrix type="saturate" values="0" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#heroNoise)" />
                    </svg>
                </div>
            </div>

            {/* Floating Organic Prisms - Gemstone Abstractions */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {/* Prism Alpha: The Diamond Form */}
                <div
                    className={`absolute top-[20%] left-[20%] w-[40vw] h-[40vw] border-[0.5px] border-black/5 dark:border-white/5 rounded-[40%_60%_70%_30%/40%_40%_60%_60%] animate-[morph_25s_infinite_linear] backdrop-blur-3xl transition-all duration-[2.5s] ease-out ${mounted ? 'opacity-30 scale-100' : 'opacity-0 scale-90'}`}
                    style={{ transform: `translate3d(${(smoothMousePos.x - 0.5) * -40}px, ${(smoothMousePos.y - 0.5) * -40}px, 0)` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent dark:from-white/5 rounded-inherit" />
                </div>

                {/* Prism Beta: The Amber Heart */}
                <div
                    className={`absolute bottom-[15%] right-[20%] w-[35vw] h-[35vw] border-[0.5px] border-[#b5a16d]/20 rounded-[60%_40%_30%_70%/70%_70%_30%_30%] animate-[morph_20s_infinite_linear_reverse] backdrop-blur-2xl transition-all duration-[3s] delay-300 ease-out ${mounted ? 'opacity-20 scale-100' : 'opacity-0 scale-95'}`}
                    style={{ transform: `translate3d(${(smoothMousePos.x - 0.5) * 60}px, ${(smoothMousePos.y - 0.5) * 60}px, 0)` }}
                >
                    <div className="absolute inset-0 bg-[#b5a16d]/5 rounded-inherit" />
                </div>

                {/* Prism Gamma: The Void (New Layer) */}
                <div
                    className={`absolute top-[40%] left-[50%] -translate-x-1/2 w-[50vw] h-[30vw] border-[0.5px] border-white/5 rounded-[50%_50%_50%_50%/30%_30%_70%_70%] animate-[morph_30s_infinite_linear] backdrop-blur-[100px] transition-all duration-[3s] delay-500 ease-out ${mounted ? 'opacity-10 scale-100' : 'opacity-0 scale-95'}`}
                    style={{ transform: `translate3d(${(smoothMousePos.x - 0.5) * 20}px, ${(smoothMousePos.y - 0.5) * 20}px, 0)` }}
                />
            </div>

            {/* Architectural Typography - The Core Narrative */}
            <div className="relative z-20 w-full max-w-[1700px] px-8 md:px-24">
                <div className="flex flex-col gap-0 select-none">

                    {/* Row 1: Rarity Concept */}
                    <div className="flex items-end justify-between mb-[-3vh] relative px-4 md:px-0">
                        <h1 className="text-[15vw] md:text-[13vw] font-light serif leading-[0.7] tracking-[-0.04em] uppercase flex items-baseline relative z-20">
                            <span className={`transition-all duration-[2.2s] cubic-bezier(0.16,1,0.3,1) ${mounted ? 'translate-x-0 opacity-100 blur-0' : '-translate-x-24 opacity-0 blur-sm'}`}>
                                Ra
                            </span>
                            <span className={`italic text-[#b5a16d] transition-all duration-[2.4s] cubic-bezier(0.16,1,0.3,1) delay-100 ${mounted ? 'translate-x-0 opacity-100 blur-0' : '-translate-x-12 opacity-0 blur-sm'}`}>
                                re
                            </span>
                        </h1>
                        <div className={`hidden lg:block w-px h-40 bg-current opacity-10 mb-10 origin-bottom transition-transform duration-[2s] delay-700 cubic-bezier(0.22,1,0.36,1) ${mounted ? 'scale-y-100' : 'scale-y-0'}`} />
                        <div className={`hidden lg:block text-[9px] tracking-[0.4em] uppercase opacity-40 mb-10 font-medium transition-opacity duration-[2s] delay-1000 ${mounted ? 'opacity-40' : 'opacity-0'}`}>
                            Volume 01 — Archive
                        </div>
                    </div>

                    {/* Row 2: The Vision */}
                    <div className="relative flex items-center justify-center py-4 md:py-8">
                        {/* Central Bespoke Visual - Abstract Gemstone Focus */}
                        <div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{ transform: `translate3d(${(smoothMousePos.x - 0.5) * 25}px, ${(smoothMousePos.y - 0.5) * 25}px, 0)` }}
                        >
                            <div
                                className={`w-[30vw] md:w-[22vw] aspect-square rounded-full border border-black/5 dark:border-white/5 flex items-center justify-center transition-all duration-[2.8s] cubic-bezier(0.16,1,0.3,1) delay-200 ${mounted ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-12'}`}
                            >
                                <div className="w-[85%] h-[85%] rounded-full overflow-hidden relative grayscale group shadow-2xl shadow-black/20 dark:shadow-black/50">
                                    <img
                                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
                                        className="w-full h-full object-cover transition-transform duration-[15s] ease-in-out group-hover:scale-110"
                                        alt="Refraction Focus"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#000]/60 via-transparent to-[#b5a16d]/30 mix-blend-overlay" />
                                </div>

                                {/* Rotating Micro-Text Ring */}
                                <div className="absolute inset-[-4vw] animate-[spin_60s_linear_infinite] opacity-30 dark:opacity-20 hover:opacity-100 transition-opacity duration-700">
                                    <svg viewBox="0 0 100 100" className="w-full h-full fill-black dark:fill-white">
                                        <path id="heroCirclePath" d="M 50, 50 m -48, 0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" fill="transparent" />
                                        <text className="text-[2.8px] tracking-[4.5px] uppercase font-light">
                                            <textPath href="#heroCirclePath">
                                                • TIMELESS CRAFT • THE PATIENCE OF NATURE • REFINED BY VISION • EST. MCMXC •
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <h2 className={`text-[12vw] md:text-[15vw] font-light serif uppercase tracking-[-0.05em] mix-blend-exclusion text-[#F9F8F4] dark:mix-blend-difference dark:text-[#a1a1a1] transition-all duration-[2.2s] cubic-bezier(0.16,1,0.3,1) delay-300 ${mounted ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`}>
                            Nature
                        </h2>
                    </div>

                    {/* Row 3: The Statement */}
                    <div className="flex items-start justify-between mt-[-3vh] relative px-4 md:px-0">
                        <div className={`hidden lg:flex flex-col gap-8 mt-16 transition-all duration-[2s] delay-[1.2s] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            <p className="text-[11px] tracking-[0.3em] uppercase opacity-40 max-w-[220px] leading-relaxed font-medium">
                                Crafted for those who understand rarity beyond brilliance.
                            </p>
                            <div className="w-12 h-[1.5px] bg-[#b5a16d]/40" />
                        </div>

                        <h1 className="text-[15vw] md:text-[13vw] font-light serif leading-[0.7] tracking-[-0.04em] uppercase text-right relative z-20">
                            <span className={`block transition-all duration-[2.4s] cubic-bezier(0.16,1,0.3,1) delay-500 ${mounted ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-24 opacity-0 blur-sm'}`}>
                                Craf
                            </span>
                            <span className={`block italic transition-all duration-[2.4s] cubic-bezier(0.16,1,0.3,1) delay-700 ${mounted ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-24 opacity-0 blur-sm'}`}>
                                ted
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* Dynamic Interaction Hint */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 transition-all duration-[2s] delay-[2.5s] ${mounted ? 'opacity-30' : 'opacity-0'}`}>
                <div className="w-px h-12 bg-gradient-to-b from-current to-transparent animate-pulse" />
                <span className="text-[10px] tracking-[0.4em] uppercase font-medium">Scroll to Discover</span>
            </div>

            {/* Decorative Floating Glyph */}
            <div
                className={`absolute top-1/2 right-12 md:right-24 -translate-y-1/2 hidden md:block text-[#b5a16d] transition-all duration-[3s] delay-[1.5s] ${mounted ? 'opacity-30 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'}`}
                style={{ transform: `translate3d(${(smoothMousePos.x - 0.5) * -80}px, ${(smoothMousePos.y - 0.5) * -80}px, 0)` }}
            >
                <svg width="60" height="60" viewBox="0 0 40 40" fill="none" className="animate-[pulse_5s_infinite_ease-in-out]">
                    <path d="M20 0L20.5 19.5L40 20L20.5 20.5L20 40L19.5 20.5L0 20L19.5 19.5L20 0Z" fill="currentColor" />
                </svg>
            </div>

            <style>{`
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
