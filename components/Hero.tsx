
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
            currentPos.x += (targetPos.x - currentPos.x) * 0.035;
            currentPos.y += (targetPos.y - currentPos.y) * 0.035;
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

    // Split text helper for architectural reveal - LUXURY TIMING
    const SplitText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => (
        <span className={`inline-block ${className}`}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className={`inline-block transition-all duration-[3s] cubic-bezier(0.16, 1, 0.3, 1) ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                    style={{ transitionDelay: `${delay + (i * 0.08)}s` }} // Doubled from 0.04s for slower reveal
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0B] text-[#FBFBF9] perspective-[1000px]"
        >
            {/* 1. DYNAMIC ATMOSPHERIC LAYERS */}
            <div
                className="absolute inset-0 z-0 transition-transform duration-700 ease-out"
                style={{
                    transform: `rotateX(${(smoothMousePos.y - 0.5) * -5}deg) rotateY(${(smoothMousePos.x - 0.5) * 5}deg) scale(1.05)`
                }}
            >
                {/* The Obsidian Core Gradient */}
                <div
                    className="absolute inset-0 opacity-90"
                    style={{
                        background: `radial-gradient(circle at ${smoothMousePos.x * 100}% ${smoothMousePos.y * 100}%, #1E1E20 0%, #0A0A0B 80%)`
                    }}
                />

                {/* Dynamic Light Caustics (Refracted Light Patterns) */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none">
                    <svg width="100%" height="100%">
                        <filter id="caustics">
                            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" stitchTiles="stitch" />
                            <feDisplacementMap in="SourceGraphic" scale="20" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#caustics)" className="animate-[causticMove_60s_infinite_linear]" />
                    </svg>
                </div>

                {/* Refined Micro-Particles - Reduced Count for Restraint */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => ( // Reduced from 24 to 8 particles
                        <div
                            key={i}
                            className="absolute w-[1px] h-[1px] bg-white rounded-full animate-pulse opacity-0"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `glintParticle ${4 + Math.random() * 6}s infinite ${Math.random() * 5}s`, // Slower animation
                                transform: `translate3d(${(smoothMousePos.x - 0.5) * (5 + i * 0.5)}px, ${(smoothMousePos.y - 0.5) * (5 + i * 0.5)}px, 0)` // Reduced intensity
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* 2. ARCHITECTURAL PRISMS - Reduced Intensity */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {/* Floating Facet Alpha */}
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-white/[0.03] rounded-[40%_60%_70%_30%/40%_40%_60%_60%] animate-[morph_45s_infinite_linear] transition-all duration-[4s] ${mounted ? 'opacity-20 scale-100' : 'opacity-0 scale-110'}`}
                    style={{
                        transform: `translate3d(${(smoothMousePos.x - 0.5) * -30}px, ${(smoothMousePos.y - 0.5) * -30}px, 0) rotate(${(smoothMousePos.x - 0.5) * 10}deg)` // Reduced by 50%
                    }}
                >
                    <div className="absolute inset-12 border border-white/[0.02] rounded-inherit backdrop-blur-[2px]" />
                </div>

                {/* Golden Refraction Arc */}
                <div
                    className={`absolute top-1/3 left-1/3 w-[35vw] h-[35vw] border-l border-t border-[#b5a16d]/10 rounded-[70%_30%_30%_70%/70%_70%_30%_30%] animate-[morph_30s_infinite_linear_reverse] transition-all duration-[4s] delay-500 ${mounted ? 'opacity-10 scale-100' : 'opacity-0 scale-90'}`}
                    style={{
                        transform: `translate3d(${(smoothMousePos.x - 0.5) * 20}px, ${(smoothMousePos.y - 0.5) * 20}px, 0) scale(1.1)` // Reduced by 50%
                    }}
                />
            </div>

            {/* 3. CORE TYPOGRAPHY & MUSEUM VISUAL */}
            <div className="relative z-20 w-full max-w-[1800px] px-12 md:px-32 pointer-events-none">
                <div className="flex flex-col gap-0 select-none">

                    {/* TOP ROW: PRESTIGE LABELING */}
                    <div className="flex items-end justify-between mb-[-4vh] relative">
                        <h1 className="text-[16vw] md:text-[14vw] font-light serif leading-[0.65] tracking-tight uppercase flex items-baseline">
                            <SplitText text="RARE" delay={0.6} className="text-white" />
                            <span className="text-[9vw] md:text-[7vw] italic text-[#b5a16d]/70 ml-6 lowercase">
                                <SplitText text="by nature" delay={1.1} />
                            </span>
                        </h1>

                        <div className="hidden lg:flex flex-col items-end gap-8 mb-20">
                            <div className={`w-[1px] h-32 bg-gradient-to-t from-white/20 to-transparent origin-bottom transition-all duration-[2.5s] delay-700 ${mounted ? 'scale-y-100 opacity-40' : 'scale-y-0 opacity-0'}`} />
                            <div className={`text-[9px] tracking-[1.2em] uppercase opacity-20 font-medium transition-all duration-[2s] delay-[1.5s] ${mounted ? 'opacity-20 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                                Archive No. 001
                            </div>
                        </div>
                    </div>

                    {/* CENTER ROW: THE LENS */}
                    <div className="relative flex items-center justify-center py-8">
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ transform: `translate3d(${(smoothMousePos.x - 0.5) * 25}px, ${(smoothMousePos.y - 0.5) * 25}px, 0)` }}
                        >
                            <div
                                className={`w-[32vw] aspect-square rounded-full border border-white/[0.08] flex items-center justify-center transition-all duration-[3s] ${mounted ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                            >
                                {/* Outer Orbiting Facets */}
                                <div className="absolute inset-[-20px] rounded-full border border-white/[0.03] animate-[spin_80s_linear_infinite]" />
                                <div className="absolute inset-[-40px] rounded-full border border-white/[0.01] animate-[spin_100s_linear_infinite_reverse]" />

                                {/* Main Artifact Frame */}
                                <div className="w-[86%] h-[86%] rounded-full overflow-hidden relative grayscale group shadow-[0_0_120px_rgba(0,0,0,0.9)]">
                                    <img
                                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
                                        className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-105"
                                        alt="Refraction Focus"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0B]/90 via-transparent to-[#b5a16d]/30 mix-blend-overlay" />

                                    {/* Refraction Caustic Sweep */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[sweep_12s_infinite_ease-in-out]" />

                                    {/* Static Grain Texture inside the gem */}
                                    <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                                </div>

                                {/* Circular Narrative */}
                                <div className="absolute inset-[-6vw] animate-[spin_70s_linear_infinite]">
                                    <svg viewBox="0 0 100 100" className="w-full h-full fill-white/[0.07]">
                                        <path id="heroOrbitPath" d="M 50, 50 m -48, 0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" fill="transparent" />
                                        <text className="text-[2.5px] tracking-[6px] uppercase font-light italic">
                                            <textPath href="#heroOrbitPath">
                                                • Rarity Beyond Brilliance • The Architecture of Time • Refined by Silence •
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <h2 className={`text-[12vw] md:text-[10vw] font-light serif uppercase tracking-[-0.05em] mix-blend-difference transition-all duration-[2.5s] delay-700 ${mounted ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-md'}`}>
                            Refined
                        </h2>
                    </div>

                    {/* BOTTOM ROW: CRAFTED IDENTITY */}
                    <div className="flex items-start justify-between mt-[-4vh] relative">
                        <div className={`hidden lg:flex flex-col gap-10 mt-24 transition-all duration-[2s] delay-[1.8s] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-[1px] bg-[#b5a16d]/40" />
                                <span className="text-[8px] tracking-[0.8em] uppercase opacity-30">Maison de Rareté</span>
                            </div>
                            <p className="text-[11px] tracking-[0.5em] uppercase opacity-20 max-w-[220px] leading-[2.4] font-light">
                                A silent conversation between nature’s hand and human vision.
                            </p>
                        </div>

                        <h1 className="text-[16vw] md:text-[15vw] font-light serif leading-[0.65] tracking-tight uppercase text-right">
                            <span className="italic mr-2">
                                <SplitText text="Craf" delay={1.4} />
                            </span>
                            <SplitText text="ted" delay={1.8} />
                        </h1>
                    </div>
                </div>
            </div>

            {/* 4. REFINED ACCENTS */}
            {/* Scroll Architecture */}
            <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8 transition-all duration-[2s] delay-[2.8s] ${mounted ? 'opacity-30' : 'opacity-0'}`}>
                <div className="relative group/scroll flex flex-col items-center">
                    <div className="w-[1px] h-24 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
                        <div className="absolute inset-0 bg-white animate-[scrollLineAnim_4s_infinite_cubic-bezier(0.76, 0, 0.24, 1)]" />
                    </div>
                    <span className="mt-8 text-[8px] tracking-[1.8em] uppercase font-light text-center translate-x-2">Archives</span>
                </div>
            </div>

            <style>{`
        @keyframes causticMove {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.2) translate(5%, 5%); }
          100% { transform: scale(1) translate(0, 0); }
        }
        @keyframes morph {
          0%, 100% { border-radius: 40% 60% 70% 30% / 40% 40% 60% 60%; }
          33% { border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; }
          66% { border-radius: 30% 70% 40% 60% / 60% 40% 60% 40%; }
        }
        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
          20% { opacity: 0.15; }
          50% { transform: translateX(150%) skewX(-20deg); opacity: 0.15; }
          100% { transform: translateX(150%) skewX(-20deg); opacity: 0; }
        }
        @keyframes glintParticle {
          0%, 100% { opacity: 0; transform: scale(0.5) translate(0,0); }
          50% { opacity: 0.4; transform: scale(1.5) translate(10px, -10px); }
        }
        @keyframes scrollLineAnim {
          0% { transform: translateY(-100%); }
          40% { transform: translateY(0); }
          60% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
        </section>
    );
};

export default Hero;
