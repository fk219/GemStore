import React, { useEffect, useState, useRef } from 'react';

const Hero: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [smoothMousePos, setSmoothMousePos] = useState({ x: 0.5, y: 0.5 });

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
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-main text-foreground"
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
                {/* Layer 2: Subtle Golden Shift (Refraction) */}
                <div
                    className="absolute inset-0 opacity-[0.03] mix-blend-screen"
                    style={{
                        background: `radial-gradient(circle at ${(1 - smoothMousePos.x) * 100}% ${(1 - smoothMousePos.y) * 100}%, var(--primary) 0%, transparent 50%)`
                    }}
                />

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

            {/* Floating Refraction Prisms - Enhanced with Parallax and Secondary Layers */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {/* Prism Alpha */}
                <div
                    className={`absolute top-1/4 left-1/4 w-[45vw] h-[45vw] border border-black/5 dark:border-white/5 rounded-[40%_60%_70%_30%/40%_40%_60%_60%] animate-[morph_20s_infinite_linear] transition-all duration-[2s] ${mounted ? 'opacity-20 scale-100' : 'opacity-0 scale-95'}`}
                    style={{ transform: `translate3d(${(smoothMousePos.x - 0.5) * -30}px, ${(smoothMousePos.y - 0.5) * -30}px, 0)` }}
                >
                    {/* Inner ghost glow */}
                    <div className="absolute inset-4 border border-black/5 dark:border-white/2 rounded-inherit blur-sm" />
                </div>

                {/* Prism Beta (Golden) */}
                <div
                    className={`absolute bottom-1/4 right-1/4 w-[38vw] h-[38vw] border border-primary/10 rounded-[60%_40%_30%_70%/70%_70%_30%_30%] animate-[morph_15s_infinite_linear_reverse] transition-all duration-[2.5s] delay-500 ${mounted ? 'opacity-10 scale-100' : 'opacity-0 scale-90'}`}
                    style={{ transform: `translate3d(${(smoothMousePos.x - 0.5) * 50}px, ${(smoothMousePos.y - 0.5) * 50}px, 0)` }}
                >
                    {/* Inner refraction line */}
                    <div className="absolute inset-0 border-l border-t border-primary/5 rounded-inherit animate-pulse" />
                </div>
            </div>

            {/* Architectural Typography - The Core Narrative */}
            <div className="relative z-20 w-full max-w-[1600px] px-10 md:px-24">
                <div className="flex flex-col gap-0 select-none">

                    {/* Row 1: Rarity Concept */}
                    <div className="flex items-end justify-between mb-[-2vh] relative">
                        <h1 className="text-[14vw] md:text-[12vw] font-light serif leading-[0.75] tracking-tight uppercase flex items-baseline">
                            <span className={`transition-all duration-[2s] cubic-bezier(0.19,1,0.22,1) ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                                Ra
                            </span>
                            <span className={`italic text-primary transition-all duration-[2.2s] cubic-bezier(0.19,1,0.22,1) delay-100 ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                re
                            </span>
                        </h1>
                        <div className={`hidden lg:block w-px h-32 bg-current opacity-10 mb-8 origin-bottom transition-all duration-[2s] delay-500 ${mounted ? 'scale-y-100' : 'scale-y-0'}`} />
                        <div className={`hidden lg:block text-[9px] tracking-[1.2em] uppercase opacity-20 mb-8 transition-opacity duration-[2s] delay-700 ${mounted ? 'opacity-20' : 'opacity-0'}`}>
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
                                className={`w-[26vw] aspect-square rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center transition-all duration-[2.5s] ${mounted ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                            >
                                <div className="w-[82%] h-[82%] rounded-full overflow-hidden relative grayscale group shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                                    <img
                                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
                                        className="w-full h-full object-cover transition-transform duration-[12s] group-hover:scale-110"
                                        alt="Refraction Focus"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-main/80 via-transparent to-primary/20 mix-blend-overlay" />
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

                        <h2 className={`text-[12vw] md:text-[10vw] font-light serif uppercase tracking-tighter mix-blend-exclusion text-white dark:mix-blend-difference dark:text-inherit transition-all duration-[2s] delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                            Nature
                        </h2>
                    </div>

                    {/* Row 3: The Statement */}
                    <div className="flex items-start justify-between mt-[-2vh] relative">
                        <div className={`hidden lg:flex flex-col gap-6 mt-12 transition-all duration-[2s] delay-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <p className="text-[10px] tracking-[0.5em] uppercase opacity-30 max-w-[190px] leading-loose">
                                Crafted for those who understand rarity beyond brilliance.
                            </p>
                            <div className="w-10 h-px bg-primary/30" />
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
                <span className="text-[8px] tracking-[1.5em] uppercase font-light">The Narrative Unfolds</span>
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
        
        /* Theme Variables using new tokens */
        :root {
            --hero-gradient-1-start: var(--background-2);
            --hero-gradient-1-end: var(--background-1);
        }
        .dark {
            --hero-gradient-1-start: var(--background-2);
            --hero-gradient-1-end: var(--background-1);
        }
      `}</style>
        </section>
    );
};

export default Hero;
