
import React, { useEffect, useState, useRef } from 'react';
import NextImage from 'next/image';

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

    // Split text helper for architectural reveal
    const SplitText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => (
        <span className={`inline-block ${className}`}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className={`inline-block transition-all duration-[2.2s] cubic-bezier(0.16, 1, 0.3, 1) ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                    style={{ transitionDelay: `${delay + (i * 0.04)}s` }}
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
                className="absolute inset-0 z-0 transition-transform duration-[1.5s] ease-out will-change-transform"
                style={{
                    transform: `perspective(1000px) rotateX(${(smoothMousePos.y - 0.5) * -2}deg) rotateY(${(smoothMousePos.x - 0.5) * 2}deg) scale(1.02)`
                }}
            >
                {/* The Obsidian Core Gradient - Smoother Interaction */}
                <div
                    className="absolute inset-0 opacity-80"
                    style={{
                        background: `radial-gradient(120% 120% at ${50 + (smoothMousePos.x - 0.5) * 20}% ${50 + (smoothMousePos.y - 0.5) * 20}%, #1E1E20 0%, #050505 60%, #000000 100%)`
                    }}
                />

                {/* Dynamic Light Caustics (Refracted Light Patterns) - Slowed Down */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-screen pointer-events-none">
                    <svg width="100%" height="100%">
                        <filter id="caustics">
                            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" stitchTiles="stitch" />
                            <feDisplacementMap in="SourceGraphic" scale="30" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#caustics)" className="animate-[causticMove_90s_infinite_linear]" />
                    </svg>
                </div>

                {/* Shimmering Micro-Particles (Diamond Dust) */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(16)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-[2px] h-[2px] bg-white/40 rounded-full animate-pulse opacity-0"
                            style={{
                                top: `${Math.random() * 80 + 10}%`,
                                left: `${Math.random() * 80 + 10}%`,
                                animation: `glintParticle ${5 + Math.random() * 5}s infinite ${Math.random() * 5}s`,
                                transform: `translate3d(${(smoothMousePos.x - 0.5) * (20 + i)}px, ${(smoothMousePos.y - 0.5) * (20 + i)}px, 0)`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* 2. ARCHITECTURAL PRISMS - Refined Geometry */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {/* Floating Facet Alpha */}
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] border border-white/[0.04] rounded-[45%_55%_65%_35%/45%_45%_55%_55%] animate-[morph_40s_infinite_linear] transition-all duration-[3s] ease-out ${mounted ? 'opacity-30 scale-100 blur-[1px]' : 'opacity-0 scale-110 blur-[10px]'}`}
                    style={{
                        transform: `translate3d(${(smoothMousePos.x - 0.5) * -40}px, ${(smoothMousePos.y - 0.5) * -40}px, 0) rotate(${(smoothMousePos.x - 0.5) * 10}deg)`
                    }}
                >
                    <div className="absolute inset-16 border border-white/[0.02] rounded-inherit backdrop-blur-[0px]" />
                </div>

                {/* Golden Refraction Arc */}
                <div
                    className={`absolute top-[40%] left-[40%] w-[30vw] h-[30vw] border-l border-t border-[#b5a16d]/15 rounded-[60%_40%_40%_60%/60%_60%_40%_40%] animate-[morph_30s_infinite_linear_reverse] transition-all duration-[3s] delay-300 ${mounted ? 'opacity-20 scale-100' : 'opacity-0 scale-90'}`}
                    style={{
                        transform: `translate3d(${(smoothMousePos.x - 0.5) * 30}px, ${(smoothMousePos.y - 0.5) * 30}px, 0)`
                    }}
                />
            </div>

            {/* 3. CORE TYPOGRAPHY & MUSEUM VISUAL - High Contrast */}
            <div className="relative z-20 w-full max-w-[1800px] px-12 md:px-32 pointer-events-none text-[#F2F2F2]">
                <div className="flex flex-col gap-0 select-none">

                    {/* TOP ROW: PRESTIGE LABELING */}
                    <div className="flex items-end justify-between mb-[-3vh] relative">
                        <h1 className="text-[14vw] md:text-[13vw] font-light serif leading-[0.7] tracking-tight uppercase flex items-baseline mix-blend-normal">
                            <SplitText text="RARE" delay={0.8} />
                            <span className="text-[8vw] md:text-[6vw] italic text-[#b5a16d]/90 ml-6 lowercase tracking-normal">
                                <SplitText text="by nature" delay={1.4} />
                            </span>
                        </h1>

                        <div className={`hidden lg:flex flex-col items-end gap-6 mb-16 transition-all duration-[2s] delay-1000 ${mounted ? 'opacity-60 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <div className="w-[1px] h-24 bg-gradient-to-t from-white/40 to-transparent" />
                            <div className="text-[10px] tracking-[0.8em] uppercase font-medium">Archive 001</div>
                        </div>
                    </div>

                    {/* CENTER ROW: THE LENS */}
                    <div className="relative flex items-center justify-center py-6">
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ transform: `translate3d(${(smoothMousePos.x - 0.5) * 15}px, ${(smoothMousePos.y - 0.5) * 15}px, 0)` }}
                        >
                            <div
                                className={`w-[28vw] aspect-square rounded-full border border-white/[0.1] flex items-center justify-center transition-all duration-[2.5s] ease-out ${mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
                            >
                                {/* Outer Orbiting Facets */}
                                <div className="absolute inset-[-15px] rounded-full border border-white/[0.05] animate-[spin_90s_linear_infinite]" />

                                {/* Main Artifact Frame */}
                                <div className="w-[88%] h-[88%] rounded-full overflow-hidden relative grayscale group shadow-[0_20px_100px_rgba(0,0,0,0.8)] border border-white/5">
                                    <NextImage
                                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
                                        className="w-full h-full object-cover transition-transform duration-[15s] ease-linear group-hover:scale-110"
                                        alt="Refraction Focus"
                                        fill
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-[#b5a16d]/20 mix-blend-overlay" />

                                    {/* Refraction Caustic Sweep */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[sweep_8s_infinite_ease-in-out_2s]" />
                                </div>
                            </div>
                        </div>

                        <h2 className={`text-[11vw] md:text-[9vw] font-light serif uppercase tracking-[-0.04em] mix-blend-exclusion text-white/90 transition-all duration-[2.5s] delay-700 ${mounted ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-md'}`}>
                            Refined
                        </h2>
                    </div>

                    {/* BOTTOM ROW: CRAFTED IDENTITY */}
                    <div className="flex items-start justify-between mt-[-3vh] relative">
                        <div className={`hidden lg:flex flex-col gap-8 mt-20 transition-all duration-[2s] delay-[1.8s] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[1px] bg-[#b5a16d]/60" />
                                <span className="text-[9px] tracking-[0.6em] uppercase opacity-50">Maison de Rareté</span>
                            </div>
                        </div>

                        <h1 className="text-[14vw] md:text-[13vw] font-light serif leading-[0.7] tracking-tight uppercase text-right mix-blend-normal">
                            <span className="italic mr-4 text-white/80">
                                <SplitText text="Craf" delay={1.8} />
                            </span>
                            <SplitText text="ted" delay={2.2} />
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
