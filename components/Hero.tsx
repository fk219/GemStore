
import React, { useEffect, useState, useRef } from 'react';

// Fixed particle positions to avoid hydration mismatch
const PARTICLE_POSITIONS = [
    { top: 20, left: 15 },
    { top: 35, left: 45 },
    { top: 50, left: 75 },
    { top: 65, left: 25 },
    { top: 80, left: 60 },
    { top: 25, left: 85 },
    { top: 70, left: 40 },
    { top: 45, left: 10 }
];

const Hero: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [smoothMousePos, setSmoothMousePos] = useState({ x: 0.5, y: 0.5 });
    const [scrollOpacity, setScrollOpacity] = useState(1);

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

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const opacity = Math.max(0, 1 - scrollY / 600);
            setScrollOpacity(opacity);
        };

        const updateSmoothPos = () => {
            currentPos.x += (targetPos.x - currentPos.x) * 0.04;
            currentPos.y += (targetPos.y - currentPos.y) * 0.04;
            setSmoothMousePos({ x: currentPos.x, y: currentPos.y });
            rafId = requestAnimationFrame(updateSmoothPos);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });
        updateSmoothPos();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    // Split text helper for architectural reveal
    const SplitText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => (
        <span className={`inline-block ${className}`}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className={`inline-block transition-all duration-[2.5s] cubic-bezier(0.16, 1, 0.3, 1) ${mounted ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-20 opacity-0 blur-md'}`}
                    style={{ transitionDelay: `${delay + (i * 0.05)}s` }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0B] text-[#FBFBF9] perspective-[1200px]"
            style={{ opacity: scrollOpacity }}
        >
            {/* 1. ATMOSPHERIC DEPTH SYSTEM */}
            <div
                className="absolute inset-0 z-0 transition-transform duration-[1.5s] ease-out"
                style={{
                    transform: `scale(1.05) translate3d(${(smoothMousePos.x - 0.5) * -15}px, ${(smoothMousePos.y - 0.5) * -15}px, 0)`
                }}
            >
                {/* Dynamic Gradient Core - Higher contrast and deeper blacks */}
                <div
                    className="absolute inset-0 opacity-100 transition-opacity duration-1000"
                    style={{
                        background: `radial-gradient(circle at ${smoothMousePos.x * 100}% ${smoothMousePos.y * 100}%, rgba(30, 30, 35, 0.9) 0%, rgba(10, 10, 11, 1) 75%)`
                    }}
                />

                {/* Refractive Light Caustics - Subtle light leak effect */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-screen pointer-events-none">
                    <svg width="100%" height="100%">
                        <filter id="caustics">
                            <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="4" stitchTiles="stitch" />
                            <feDisplacementMap in="SourceGraphic" scale="40" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#caustics)" className="animate-[causticDrift_45s_infinite_linear]" />
                    </svg>
                </div>

                {/* Crystalline Grain Layer */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            {/* 2. GEOMETRIC PRISM ARCHITECTURE - Organic and Soft */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {/* Major Morphing Prism - Soft Organic Geometry */}
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] border border-white/[0.04] rounded-[48%_52%_68%_32%/42%_48%_52%_58%] animate-[morph_30s_infinite_linear] transition-all duration-[4s] ${mounted ? 'opacity-20 scale-100 blur-none' : 'opacity-0 scale-110 blur-2xl'}`}
                    style={{
                        transform: `translate3d(${(smoothMousePos.x - 0.5) * -90}px, ${(smoothMousePos.y - 0.5) * -90}px, 0) rotate(${(smoothMousePos.x - 0.5) * 25}deg)`
                    }}
                >
                    <div className="absolute inset-24 border border-white/[0.02] rounded-inherit backdrop-blur-[6px] shadow-[inset_0_0_120px_rgba(255,255,255,0.01)]" />
                </div>

                {/* Refractive Light Beams */}
                <div
                    className={`absolute top-[15%] left-[20%] w-[40vw] h-px bg-gradient-to-r from-transparent via-[#b5a16d]/20 to-transparent rotate-[-35deg] transition-all duration-[5s] ${mounted ? 'opacity-30 translate-y-0' : 'opacity-0 translate-y-20'}`}
                    style={{ transform: `rotate(-35deg) translate3d(${(smoothMousePos.x - 0.5) * 50}px, 0, 0)` }}
                />
            </div>

            {/* 3. CINEMATIC TYPOGRAPHY & CORE ARTIFACT */}
            <div className="relative z-20 w-full max-w-[1900px] px-12 md:px-32 pointer-events-none">
                <div className="flex flex-col gap-0 select-none">

                    {/* TOP ROW */}
                    <div className="flex items-end justify-between mb-[-6vh] relative">
                        <h1 className="text-[17vw] md:text-[15vw] font-light serif leading-[0.6] tracking-[-0.04em] uppercase flex items-baseline">
                            <SplitText text="RARE" delay={0.8} className="text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.08)]" />
                            <span className="text-[8vw] md:text-[6vw] italic text-[#b5a16d]/60 ml-10 lowercase tracking-normal font-light">
                                <SplitText text="by nature" delay={1.4} />
                            </span>
                        </h1>

                        <div className="hidden lg:flex flex-col items-end gap-12 mb-32">
                            <div className={`w-[1px] h-48 bg-gradient-to-t from-[#b5a16d]/50 to-transparent origin-bottom transition-all duration-[3.5s] delay-1000 ${mounted ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`} />
                            <div className={`text-[8px] tracking-[1.8em] uppercase opacity-30 font-medium transition-all duration-[2.5s] delay-[2s] ${mounted ? 'opacity-30 translate-x-0' : 'opacity-0 translate-x-16'}`}>
                                Private Archive / Edition 001
                            </div>
                        </div>
                    </div>

                    {/* CENTER ROW: THE CRYSTAL LENS */}
                    <div className="relative flex items-center justify-center py-16">
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ transform: `translate3d(${(smoothMousePos.x - 0.5) * 45}px, ${(smoothMousePos.y - 0.5) * 45}px, 0)` }}
                        >
                            <div
                                className={`w-[36vw] aspect-square rounded-full border border-white/[0.1] flex items-center justify-center transition-all duration-[3.5s] cubic-bezier(0.19, 1, 0.22, 1) ${mounted ? 'scale-100 opacity-100' : 'scale-60 opacity-0'}`}
                            >
                                {/* Rotating Orbital Frames */}
                                <div className="absolute inset-[-40px] rounded-full border border-white/[0.04] animate-[spin_120s_linear_infinite]" />
                                <div className="absolute inset-[-80px] rounded-full border border-[#b5a16d]/[0.08] animate-[spin_180s_linear_infinite_reverse]" />

                                {/* Main Gemstone Visual */}
                                <div className="w-[88%] h-[88%] rounded-full overflow-hidden relative grayscale group shadow-[0_0_180px_rgba(0,0,0,0.98)]">
                                    <img
                                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
                                        className="w-full h-full object-cover transition-transform duration-[30s] ease-linear group-hover:scale-110"
                                        alt="Refraction Focus"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0B]/98 via-transparent to-[#b5a16d]/40 mix-blend-overlay" />

                                    {/* Light Sweep Animation */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-[highSweep_10s_infinite_ease-in-out]" />
                                </div>

                                {/* Circular Typographic Mantle - Significantly slower speed */}
                                <div className="absolute inset-[-10vw] animate-[spin_160s_linear_infinite]">
                                    <svg viewBox="0 0 100 100" className="w-full h-full fill-white/[0.08]">
                                        <path id="mantlePathHero" d="M 50, 50 m -48, 0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" fill="transparent" />
                                        <text className="text-[2.1px] tracking-[8px] uppercase font-light italic">
                                            <textPath href="#mantlePathHero">
                                                • Exclusive Gemstone House • Three Centuries of Discretion • Rarity Beyond Brilliance •
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <h2 className={`text-[14vw] md:text-[11vw] font-light serif uppercase tracking-[-0.07em] mix-blend-difference text-white transition-all duration-[3s] delay-[1.2s] ${mounted ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-20 blur-2xl'}`}>
                            Refined
                        </h2>
                    </div>

                    {/* BOTTOM ROW: CRAFTED SIGNATURE */}
                    <div className="flex items-start justify-between mt-[-6vh] relative">
                        <div className={`hidden lg:flex flex-col gap-14 mt-36 transition-all duration-[2.5s] delay-[2.5s] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}>
                            <div className="flex items-center gap-10">
                                <div className="w-20 h-[1px] bg-[#b5a16d]/50" />
                                <span className="text-[9px] tracking-[1.2em] uppercase opacity-40 font-medium">Maison de Rareté</span>
                            </div>
                            <p className="text-[13px] tracking-[0.7em] uppercase opacity-25 max-w-[260px] leading-[2.8] font-light italic text-white/80">
                                A silent dialogue between nature’s hand and human vision.
                            </p>
                        </div>

                        <h1 className="text-[17vw] md:text-[16vw] font-light serif leading-[0.6] tracking-[-0.04em] uppercase text-right">
                            <span className="italic mr-6 text-[#b5a16d] opacity-90 drop-shadow-[0_0_50px_rgba(181,161,109,0.15)]">
                                <SplitText text="Craf" delay={2.0} />
                            </span>
                            <SplitText text="ted" delay={2.6} className="text-white" />
                        </h1>
                    </div>
                </div>
            </div>

            {/* 4. REFINED UTILITY ACCENTS */}
            <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-12 transition-all duration-[2.5s] delay-[3.5s] ${mounted ? 'opacity-40' : 'opacity-0'}`}>
                <div className="relative group/scroll flex flex-col items-center">
                    <div className="w-[1px] h-36 bg-gradient-to-b from-white/40 via-white/10 to-transparent relative overflow-hidden">
                        <div className="absolute inset-0 bg-white animate-[scrollLineAnim_6s_infinite_cubic-bezier(0.76, 0, 0.24, 1)]" />
                    </div>
                    <span className="mt-12 text-[7px] tracking-[2.8em] uppercase font-light text-center translate-x-4 whitespace-nowrap text-white/50">The Archive</span>
                </div>
            </div>

            <style>{`
        @keyframes causticDrift {
          0% { transform: scale(1) translate(0, 0) rotate(0deg); }
          50% { transform: scale(1.4) translate(6%, 4%) rotate(4deg); }
          100% { transform: scale(1) translate(0, 0) rotate(0deg); }
        }
        @keyframes morph {
          0%, 100% { border-radius: 48% 52% 68% 32% / 42% 48% 52% 58%; }
          25% { border-radius: 65% 35% 55% 45% / 45% 65% 45% 55%; }
          50% { border-radius: 52% 48% 38% 62% / 58% 52% 48% 42%; }
          75% { border-radius: 42% 58% 48% 52% / 52% 42% 62% 38%; }
        }
        @keyframes highSweep {
          0% { transform: translateX(-160%) skewX(-35deg); opacity: 0; }
          25% { opacity: 0.25; }
          50% { transform: translateX(160%) skewX(-35deg); opacity: 0.25; }
          100% { transform: translateX(160%) skewX(-35deg); opacity: 0; }
        }
        @keyframes scrollLineAnim {
          0% { transform: translateY(-100%); opacity: 0; }
          40% { transform: translateY(0); opacity: 1; }
          60% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}</style>
        </section>
    );
};

export default Hero;
