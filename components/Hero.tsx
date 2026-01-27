import React, { useEffect, useState, useRef, useCallback } from 'react';

// Fixed particle positions to avoid hydration mismatch
const PARTICLE_POSITIONS = [
    { top: 20, left: 15, size: 2, delay: 0 },
    { top: 35, left: 45, size: 3, delay: 0.5 },
    { top: 50, left: 75, size: 2, delay: 1 },
    { top: 65, left: 25, size: 4, delay: 1.5 },
    { top: 80, left: 60, size: 2, delay: 2 },
    { top: 25, left: 85, size: 3, delay: 2.5 },
    { top: 70, left: 40, size: 2, delay: 3 },
    { top: 45, left: 10, size: 3, delay: 3.5 },
    { top: 15, left: 55, size: 2, delay: 4 },
    { top: 85, left: 30, size: 3, delay: 4.5 },
    { top: 55, left: 90, size: 2, delay: 5 },
    { top: 30, left: 70, size: 4, delay: 5.5 }
];

// Floating abstract lines
const ABSTRACT_LINES = [
    { x1: 10, y1: 20, x2: 25, y2: 35, delay: 0.8 },
    { x1: 75, y1: 15, x2: 90, y2: 28, delay: 1.2 },
    { x1: 5, y1: 70, x2: 18, y2: 85, delay: 1.6 },
    { x1: 82, y1: 65, x2: 95, y2: 80, delay: 2 },
];

const Hero: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [smoothMousePos, setSmoothMousePos] = useState({ x: 0.5, y: 0.5 });
    const [scrollOpacity, setScrollOpacity] = useState(1);
    const [cursorVariant, setCursorVariant] = useState('default');
    const [isHoveringText, setIsHoveringText] = useState(false);
    const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
    const [activeParticle, setActiveParticle] = useState<number | null>(null);

    // Cursor trail positions
    const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number; opacity: number }>>([]);

    useEffect(() => {
        setMounted(true);
        let rafId: number;
        const targetPos = { x: 0.5, y: 0.5 };
        const currentPos = { x: 0.5, y: 0.5 };
        let trailPositions: Array<{ x: number; y: number; timestamp: number }> = [];

        const handleMouseMove = (e: MouseEvent) => {
            targetPos.x = e.clientX / window.innerWidth;
            targetPos.y = e.clientY / window.innerHeight;
            setMousePos({ x: targetPos.x, y: targetPos.y });

            // Update cursor position
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
            if (cursorDotRef.current) {
                cursorDotRef.current.style.left = `${e.clientX}px`;
                cursorDotRef.current.style.top = `${e.clientY}px`;
            }

            // Add to trail
            trailPositions.push({ x: e.clientX, y: e.clientY, timestamp: Date.now() });
            if (trailPositions.length > 8) trailPositions.shift();

            setCursorTrail(trailPositions.map((pos, i) => ({
                x: pos.x,
                y: pos.y,
                opacity: (i + 1) / trailPositions.length * 0.3
            })));
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

    // Magnetic effect handler
    const handleMagneticMove = useCallback((e: React.MouseEvent<HTMLElement>, strength: number = 0.3) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        setMagneticPos({ x: deltaX, y: deltaY });
    }, []);

    const resetMagnetic = useCallback(() => {
        setMagneticPos({ x: 0, y: 0 });
    }, []);

    // Split text helper for architectural reveal with hover
    const SplitText = ({ text, delay = 0, className = "", hoverable = false }: { text: string, delay?: number, className?: string, hoverable?: boolean }) => (
        <span className={`inline-block ${className}`}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className={`inline-block transition-all duration-[2.5s] cubic-bezier(0.16, 1, 0.3, 1) 
                        ${mounted ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-20 opacity-0 blur-md'}
                        ${hoverable ? 'hover:text-[#b5a16d] hover:scale-110 hover:-translate-y-2 cursor-default' : ''}
                        group-hover:animate-[letterFloat_0.6s_ease-out]`}
                    style={{
                        transitionDelay: `${delay + (i * 0.05)}s`,
                        animationDelay: hoverable ? `${i * 0.02}s` : '0s'
                    }}
                    onMouseEnter={() => hoverable && setIsHoveringText(true)}
                    onMouseLeave={() => hoverable && setIsHoveringText(false)}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );

    // Interactive floating element component
    const FloatingElement = ({ children, delay, className, hoverScale = 1.1 }: {
        children: React.ReactNode,
        delay: number,
        className: string,
        hoverScale?: number
    }) => (
        <div
            className={`transition-all duration-700 ease-out cursor-default ${className}`}
            style={{
                transitionDelay: `${delay}s`,
                transform: `scale(${mounted ? 1 : 0.8})`,
                opacity: mounted ? 1 : 0
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = `scale(${hoverScale}) translateY(-4px)`;
                setCursorVariant('text');
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                setCursorVariant('default');
            }}
        >
            {children}
        </div>
    );

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0B] text-[#FBFBF9] perspective-[1200px] cursor-none"
            style={{ opacity: scrollOpacity }}
        >
            {/* Custom Cursor System */}
            <div
                ref={cursorRef}
                className={`fixed pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out mix-blend-difference ${cursorVariant === 'text' ? 'w-24 h-24' : 'w-8 h-8'
                    }`}
                style={{ willChange: 'transform' }}
            >
                <div className={`w-full h-full rounded-full border transition-all duration-500 ${cursorVariant === 'text'
                        ? 'border-[#b5a16d]/60 bg-[#b5a16d]/10 scale-100'
                        : 'border-white/40 bg-transparent scale-100'
                    } ${isHoveringText ? 'animate-pulse' : ''}`} />
            </div>
            <div
                ref={cursorDotRef}
                className="fixed w-1 h-1 bg-white rounded-full pointer-events-none z-[101] -translate-x-1/2 -translate-y-1/2"
            />

            {/* Cursor Trail */}
            {cursorTrail.map((pos, i) => (
                <div
                    key={i}
                    className="fixed w-1 h-1 rounded-full bg-[#b5a16d] pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
                    style={{
                        left: pos.x,
                        top: pos.y,
                        opacity: pos.opacity,
                        transform: `translate(-50%, -50%) scale(${1 - i * 0.1})`
                    }}
                />
            ))}

            {/* 1. ATMOSPHERIC DEPTH SYSTEM */}
            <div
                className="absolute inset-0 z-0 transition-transform duration-[1.5s] ease-out"
                style={{
                    transform: `scale(1.05) translate3d(${(smoothMousePos.x - 0.5) * -15}px, ${(smoothMousePos.y - 0.5) * -15}px, 0)`
                }}
            >
                {/* Dynamic Gradient Core */}
                <div
                    className="absolute inset-0 opacity-100 transition-opacity duration-1000"
                    style={{
                        background: `radial-gradient(circle at ${smoothMousePos.x * 100}% ${smoothMousePos.y * 100}%, rgba(30, 30, 35, 0.9) 0%, rgba(10, 10, 11, 1) 75%)`
                    }}
                />

                {/* Aurora Effect */}
                <div className="absolute inset-0 opacity-20 overflow-hidden">
                    <div
                        className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2 animate-[auroraMove_20s_infinite_ease-in-out]"
                        style={{
                            background: `
                                radial-gradient(ellipse at ${30 + smoothMousePos.x * 20}% ${20 + smoothMousePos.y * 20}%, rgba(181,161,109,0.15) 0%, transparent 50%),
                                radial-gradient(ellipse at ${70 - smoothMousePos.x * 20}% ${80 - smoothMousePos.y * 20}%, rgba(255,255,255,0.05) 0%, transparent 50%)
                            `
                        }}
                    />
                </div>

                {/* Refractive Light Caustics */}
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

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {PARTICLE_POSITIONS.map((particle, i) => (
                        <div
                            key={i}
                            className={`absolute rounded-full transition-all duration-1000 cursor-pointer pointer-events-auto
                                ${activeParticle === i ? 'bg-[#b5a16d] scale-150' : 'bg-white/20'}
                                animate-[particleFloat_${8 + i * 2}s_infinite_ease-in-out]`}
                            style={{
                                top: `${particle.top}%`,
                                left: `${particle.left}%`,
                                width: particle.size,
                                height: particle.size,
                                animationDelay: `${particle.delay}s`,
                                opacity: mounted ? 0.4 : 0,
                                transitionDelay: `${particle.delay * 0.5}s`,
                                boxShadow: activeParticle === i ? '0 0 20px rgba(181,161,109,0.5)' : 'none'
                            }}
                            onMouseEnter={() => setActiveParticle(i)}
                            onMouseLeave={() => setActiveParticle(null)}
                        />
                    ))}
                </div>

                {/* Abstract Floating Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {ABSTRACT_LINES.map((line, i) => (
                        <line
                            key={i}
                            x1={`${line.x1}%`}
                            y1={`${line.y1}%`}
                            x2={`${line.x2}%`}
                            y2={`${line.y2}%`}
                            stroke="url(#lineGradient)"
                            strokeWidth="0.5"
                            className={`transition-all duration-[3s] ${mounted ? 'opacity-30' : 'opacity-0'}`}
                            style={{
                                transitionDelay: `${line.delay}s`,
                                strokeDasharray: 100,
                                strokeDashoffset: mounted ? 0 : 100,
                                transition: `stroke-dashoffset 3s ease-out ${line.delay}s, opacity 2s ease-out ${line.delay}s`
                            }}
                        />
                    ))}
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="rgba(181,161,109,0.6)" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* ABSTRACT FLOATING TYPOGRAPHY */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <FloatingElement delay={1.5} className={`absolute top-[15%] left-[8%] ${mounted ? 'opacity-25' : 'opacity-0'}`}>
                        <span className="text-[9px] tracking-[1.5em] uppercase text-white/40 font-extralight writing-mode-vertical rotate-180 hover:text-[#b5a16d]/60 transition-colors duration-500" style={{ writingMode: 'vertical-rl' }}>
                            Curated Excellence
                        </span>
                    </FloatingElement>

                    <FloatingElement delay={2} className={`absolute top-[12%] right-[12%] ${mounted ? 'opacity-20' : 'opacity-0'}`}>
                        <span className="text-[72px] font-serif font-extralight italic text-white/10 hover:text-[#b5a16d]/20 transition-colors duration-700 animate-[gentlePulse_4s_infinite]">
                            III
                        </span>
                    </FloatingElement>

                    <FloatingElement delay={2.5} className={`absolute top-[45%] left-[5%] ${mounted ? 'opacity-15' : 'opacity-0'}`}>
                        <span className="text-[11px] tracking-[2em] uppercase text-[#b5a16d]/30 font-light hover:tracking-[2.5em] transition-all duration-500">
                            Legacy
                        </span>
                    </FloatingElement>

                    <FloatingElement delay={3} className={`absolute bottom-[25%] right-[8%] ${mounted ? 'opacity-20' : 'opacity-0'}`}>
                        <span className="text-[10px] tracking-[1.2em] uppercase text-white/30 font-extralight -rotate-90 block hover:text-[#b5a16d]/40 transition-colors duration-500">
                            Est. 1892
                        </span>
                    </FloatingElement>

                    <FloatingElement delay={1} className={`absolute top-[8%] left-1/2 -translate-x-1/2 ${mounted ? 'opacity-15' : 'opacity-0'}`}>
                        <span className="text-[8px] tracking-[3em] uppercase text-white/25 font-light whitespace-nowrap hover:tracking-[3.5em] transition-all duration-500">
                            The Eternal Pursuit
                        </span>
                    </FloatingElement>

                    <FloatingElement delay={3.5} className={`absolute bottom-[15%] left-[15%] ${mounted ? 'opacity-10' : 'opacity-0'}`} hoverScale={1.05}>
                        <span className="text-[180px] font-serif font-thin italic text-white/5 leading-none select-none hover:text-[#b5a16d]/10 transition-colors duration-1000">
                            G
                        </span>
                    </FloatingElement>

                    <FloatingElement delay={2.8} className={`absolute top-[60%] right-[6%] ${mounted ? 'opacity-20' : 'opacity-0'}`}>
                        <div className="flex flex-col items-end gap-1 group">
                            <span className="text-[8px] tracking-[0.5em] font-mono text-white/25 group-hover:text-[#b5a16d]/40 transition-all duration-300">51.5074 N</span>
                            <span className="text-[8px] tracking-[0.5em] font-mono text-white/25 group-hover:text-[#b5a16d]/40 transition-all duration-300 delay-75">0.1278 W</span>
                        </div>
                    </FloatingElement>

                    {/* New Abstract Elements */}
                    <FloatingElement delay={4} className={`absolute top-[35%] right-[20%] ${mounted ? 'opacity-10' : 'opacity-0'}`}>
                        <div className="w-16 h-16 border border-white/10 rotate-45 hover:rotate-[55deg] hover:border-[#b5a16d]/30 transition-all duration-700" />
                    </FloatingElement>

                    <FloatingElement delay={4.2} className={`absolute bottom-[40%] left-[18%] ${mounted ? 'opacity-15' : 'opacity-0'}`}>
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#b5a16d]/30 to-transparent hover:via-[#b5a16d]/60 transition-all duration-500" />
                    </FloatingElement>
                </div>
            </div>

            {/* 2. GEOMETRIC PRISM ARCHITECTURE */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {/* Major Morphing Prism */}
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] border border-white/[0.04] rounded-[48%_52%_68%_32%/42%_48%_52%_58%] animate-[morph_30s_infinite_linear] transition-all duration-[4s] ${mounted ? 'opacity-20 scale-100 blur-none' : 'opacity-0 scale-110 blur-2xl'}`}
                    style={{
                        transform: `translate(-50%, -50%) translate3d(${(smoothMousePos.x - 0.5) * -90}px, ${(smoothMousePos.y - 0.5) * -90}px, 0) rotate(${(smoothMousePos.x - 0.5) * 25}deg)`
                    }}
                >
                    <div className="absolute inset-24 border border-white/[0.02] rounded-inherit backdrop-blur-[6px] shadow-[inset_0_0_120px_rgba(255,255,255,0.01)]" />
                </div>

                {/* Secondary Floating Shape */}
                <div
                    className={`absolute top-1/4 right-1/4 w-[25vw] h-[25vw] border border-[#b5a16d]/[0.06] rounded-full animate-[float_15s_infinite_ease-in-out] transition-all duration-[5s] delay-500 ${mounted ? 'opacity-30' : 'opacity-0'}`}
                    style={{
                        transform: `translate3d(${(smoothMousePos.x - 0.5) * 60}px, ${(smoothMousePos.y - 0.5) * 60}px, 0)`
                    }}
                />

                {/* Refractive Light Beams */}
                <div
                    className={`absolute top-[15%] left-[20%] w-[40vw] h-px bg-gradient-to-r from-transparent via-[#b5a16d]/20 to-transparent rotate-[-35deg] transition-all duration-[5s] ${mounted ? 'opacity-30 translate-y-0' : 'opacity-0 translate-y-20'}`}
                    style={{ transform: `rotate(-35deg) translate3d(${(smoothMousePos.x - 0.5) * 50}px, 0, 0)` }}
                />

                {/* Additional light beam */}
                <div
                    className={`absolute bottom-[25%] right-[15%] w-[30vw] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent rotate-[25deg] transition-all duration-[5s] delay-300 ${mounted ? 'opacity-20 translate-y-0' : 'opacity-0 translate-y-20'}`}
                    style={{ transform: `rotate(25deg) translate3d(${(smoothMousePos.x - 0.5) * -40}px, 0, 0)` }}
                />

                {/* Glowing Orbs */}
                <div
                    className={`absolute top-[20%] left-[10%] w-32 h-32 rounded-full transition-all duration-[4s] ${mounted ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        background: 'radial-gradient(circle, rgba(181,161,109,0.1) 0%, transparent 70%)',
                        transform: `translate3d(${(smoothMousePos.x - 0.5) * 80}px, ${(smoothMousePos.y - 0.5) * 80}px, 0)`,
                        filter: 'blur(20px)'
                    }}
                />
                <div
                    className={`absolute bottom-[30%] right-[15%] w-48 h-48 rounded-full transition-all duration-[4s] delay-200 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                        transform: `translate3d(${(smoothMousePos.x - 0.5) * -60}px, ${(smoothMousePos.y - 0.5) * -60}px, 0)`,
                        filter: 'blur(30px)'
                    }}
                />
            </div>

            {/* 3. CINEMATIC TYPOGRAPHY & CORE ARTIFACT */}
            <div className="relative z-20 w-full max-w-[1900px] px-12 md:px-32 pointer-events-none">
                <div className="flex flex-col gap-0 select-none">

                    {/* TOP ROW */}
                    <div className="flex items-end justify-between mb-[-6vh] relative">
                        <h1
                            className="text-[12vw] md:text-[10vw] font-light serif leading-[0.6] tracking-[-0.04em] uppercase pointer-events-auto group"
                            onMouseEnter={() => setCursorVariant('text')}
                            onMouseLeave={() => setCursorVariant('default')}
                            onMouseMove={(e) => handleMagneticMove(e, 0.15)}
                        >
                            <span style={{ transform: `translate(${magneticPos.x}px, ${magneticPos.y}px)`, display: 'inline-block', transition: 'transform 0.3s ease-out' }}>
                                <SplitText text="RARE" delay={0.8} className="text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.08)]" hoverable />
                            </span>
                        </h1>

                        <div className="flex flex-col items-end gap-6">
                            <span
                                className="text-[5vw] md:text-[4vw] italic text-[#b5a16d]/60 lowercase tracking-normal font-light pointer-events-auto group"
                                onMouseEnter={() => setCursorVariant('text')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                <SplitText text="by nature" delay={1.4} hoverable />
                            </span>
                            <div className="hidden lg:flex flex-col items-end gap-6">
                                <div className={`w-[1px] h-32 bg-gradient-to-t from-[#b5a16d]/50 to-transparent origin-bottom transition-all duration-[3.5s] delay-1000 ${mounted ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`} />
                                <div
                                    className={`text-[8px] tracking-[1.8em] uppercase opacity-30 font-medium transition-all duration-[2.5s] delay-[2s] pointer-events-auto hover:opacity-60 hover:tracking-[2em] ${mounted ? 'opacity-30 translate-x-0' : 'opacity-0 translate-x-16'}`}
                                    onMouseEnter={() => setCursorVariant('text')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                >
                                    Private Archive / Edition 001
                                </div>
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
                                className={`w-[36vw] aspect-square rounded-full border border-white/[0.1] flex items-center justify-center transition-all duration-[3.5s] cubic-bezier(0.19, 1, 0.22, 1) pointer-events-auto group/lens hover:border-[#b5a16d]/30 ${mounted ? 'scale-100 opacity-100' : 'scale-60 opacity-0'}`}
                                onMouseEnter={() => setCursorVariant('text')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                {/* Rotating Orbital Frames */}
                                <div className="absolute inset-[-40px] rounded-full border border-white/[0.08] animate-[spin_120s_linear_infinite] group-hover/lens:border-[#b5a16d]/20 transition-colors duration-700" />
                                <div className="absolute inset-[-80px] rounded-full border border-[#b5a16d]/[0.15] animate-[spin_180s_linear_infinite_reverse] group-hover/lens:border-[#b5a16d]/30 transition-colors duration-700" />

                                {/* Pulsing Ring on Hover */}
                                <div className="absolute inset-[-2px] rounded-full border-2 border-transparent group-hover/lens:border-[#b5a16d]/20 group-hover/lens:animate-[pulseRing_2s_infinite] transition-all duration-500" />

                                {/* Main Gemstone Visual */}
                                <div className="w-[88%] h-[88%] rounded-full overflow-hidden relative grayscale group shadow-[0_0_180px_rgba(0,0,0,0.98)] group-hover/lens:grayscale-0 transition-all duration-1000">
                                    <img
                                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
                                        className="w-full h-full object-cover transition-transform duration-[30s] ease-linear group-hover/lens:scale-110"
                                        alt="Refraction Focus"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0B]/98 via-transparent to-[#b5a16d]/40 mix-blend-overlay group-hover/lens:opacity-50 transition-opacity duration-700" />

                                    {/* Light Sweep Animation */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-[highSweep_10s_infinite_ease-in-out]" />

                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 bg-[#b5a16d]/0 group-hover/lens:bg-[#b5a16d]/10 transition-colors duration-700" />
                                </div>

                                {/* Circular Typographic Mantle */}
                                <div className="absolute inset-[-10vw] animate-[spin_160s_linear_infinite] group-hover/lens:animate-[spin_80s_linear_infinite]">
                                    <svg viewBox="0 0 100 100" className="w-full h-full fill-white/[0.35] group-hover/lens:fill-[#b5a16d]/50 transition-colors duration-700">
                                        <path id="mantlePathHero" d="M 50, 50 m -48, 0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" fill="transparent" />
                                        <text className="text-[2.4px] tracking-[6px] uppercase font-light">
                                            <textPath href="#mantlePathHero">
                                                ◆ Exclusive Gemstone House ◆ Three Centuries of Discretion ◆ Rarity Beyond Brilliance ◆
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>

                                {/* Second Rotating Text Ring */}
                                <div className="absolute inset-[-14vw] animate-[spin_200s_linear_infinite_reverse] group-hover/lens:animate-[spin_100s_linear_infinite_reverse]">
                                    <svg viewBox="0 0 100 100" className="w-full h-full fill-[#b5a16d]/[0.25] group-hover/lens:fill-[#b5a16d]/40 transition-colors duration-700">
                                        <path id="mantlePathHero2" d="M 50, 50 m -48, 0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" fill="transparent" />
                                        <text className="text-[1.8px] tracking-[10px] uppercase font-extralight italic">
                                            <textPath href="#mantlePathHero2">
                                                • London • Geneva • Dubai • Hong Kong • New York • Mumbai • Tokyo • Paris •
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <h2
                            className={`text-[9vw] md:text-[7vw] font-light serif uppercase tracking-[-0.07em] mix-blend-difference text-white transition-all duration-[3s] delay-[1.2s] pointer-events-auto hover:tracking-[-0.03em] ${mounted ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-20 blur-2xl'}`}
                            onMouseEnter={() => setCursorVariant('text')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            Refined
                        </h2>
                    </div>

                    {/* BOTTOM ROW: CRAFTED SIGNATURE */}
                    <div className="flex items-start justify-between mt-[-6vh] relative">
                        <div className={`hidden lg:flex flex-col gap-14 mt-36 transition-all duration-[2.5s] delay-[2.5s] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}>
                            <div className="flex items-center gap-10 group pointer-events-auto">
                                <div className="w-20 h-[1px] bg-[#b5a16d]/50 group-hover:w-32 transition-all duration-500" />
                                <span
                                    className="text-[9px] tracking-[1.2em] uppercase opacity-40 font-medium group-hover:opacity-70 group-hover:tracking-[1.5em] transition-all duration-500"
                                    onMouseEnter={() => setCursorVariant('text')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                >
                                    Maison de Rareté
                                </span>
                            </div>
                            <p
                                className="text-[13px] tracking-[0.7em] uppercase opacity-25 max-w-[260px] leading-[2.8] font-light italic text-white/80 pointer-events-auto hover:opacity-40 transition-opacity duration-500"
                                onMouseEnter={() => setCursorVariant('text')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                A silent dialogue between nature's hand and human vision.
                            </p>
                        </div>

                        <h1
                            className="text-[11vw] md:text-[10vw] font-light serif leading-[0.6] tracking-[-0.04em] uppercase text-right pointer-events-auto group"
                            onMouseEnter={() => setCursorVariant('text')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <span className="italic mr-6 text-[#b5a16d] opacity-90 drop-shadow-[0_0_50px_rgba(181,161,109,0.15)] group-hover:opacity-100 transition-opacity duration-500">
                                <SplitText text="Craf" delay={2.0} hoverable />
                            </span>
                            <SplitText text="ted" delay={2.6} className="text-white" hoverable />
                        </h1>
                    </div>
                </div>
            </div>

            {/* 4. REFINED UTILITY ACCENTS */}
            <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-12 transition-all duration-[2.5s] delay-[3.5s] pointer-events-auto ${mounted ? 'opacity-40' : 'opacity-0'}`}>
                <div
                    className="relative group/scroll flex flex-col items-center cursor-pointer"
                    onMouseEnter={() => setCursorVariant('text')}
                    onMouseLeave={() => setCursorVariant('default')}
                >
                    <div className="w-[1px] h-36 bg-gradient-to-b from-white/40 via-white/10 to-transparent relative overflow-hidden group-hover/scroll:h-44 transition-all duration-500">
                        <div className="absolute inset-0 bg-white animate-[scrollLineAnim_6s_infinite_cubic-bezier(0.76, 0, 0.24, 1)]" />
                    </div>
                    <span className="mt-12 text-[7px] tracking-[2.8em] uppercase font-light text-center translate-x-4 whitespace-nowrap text-white/50 group-hover/scroll:text-[#b5a16d]/70 group-hover/scroll:tracking-[3.2em] transition-all duration-500">The Archive</span>

                    {/* Hover indicator */}
                    <div className="absolute -bottom-6 w-1 h-1 rounded-full bg-[#b5a16d]/0 group-hover/scroll:bg-[#b5a16d]/60 transition-all duration-300 animate-bounce" />
                </div>
            </div>

            {/* 5. Corner Decorative Elements */}
            <div className={`absolute top-12 left-12 transition-all duration-[3s] delay-[4s] ${mounted ? 'opacity-30' : 'opacity-0'}`}>
                <div className="w-12 h-12 border-l border-t border-white/20 hover:border-[#b5a16d]/40 hover:w-16 hover:h-16 transition-all duration-500 cursor-pointer pointer-events-auto"
                    onMouseEnter={() => setCursorVariant('text')}
                    onMouseLeave={() => setCursorVariant('default')}
                />
            </div>
            <div className={`absolute top-12 right-12 transition-all duration-[3s] delay-[4.2s] ${mounted ? 'opacity-30' : 'opacity-0'}`}>
                <div className="w-12 h-12 border-r border-t border-white/20 hover:border-[#b5a16d]/40 hover:w-16 hover:h-16 transition-all duration-500 cursor-pointer pointer-events-auto"
                    onMouseEnter={() => setCursorVariant('text')}
                    onMouseLeave={() => setCursorVariant('default')}
                />
            </div>
            <div className={`absolute bottom-12 left-12 transition-all duration-[3s] delay-[4.4s] ${mounted ? 'opacity-30' : 'opacity-0'}`}>
                <div className="w-12 h-12 border-l border-b border-white/20 hover:border-[#b5a16d]/40 hover:w-16 hover:h-16 transition-all duration-500 cursor-pointer pointer-events-auto"
                    onMouseEnter={() => setCursorVariant('text')}
                    onMouseLeave={() => setCursorVariant('default')}
                />
            </div>
            <div className={`absolute bottom-12 right-12 transition-all duration-[3s] delay-[4.6s] ${mounted ? 'opacity-30' : 'opacity-0'}`}>
                <div className="w-12 h-12 border-r border-b border-white/20 hover:border-[#b5a16d]/40 hover:w-16 hover:h-16 transition-all duration-500 cursor-pointer pointer-events-auto"
                    onMouseEnter={() => setCursorVariant('text')}
                    onMouseLeave={() => setCursorVariant('default')}
                />
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
                @keyframes particleFloat {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    25% { transform: translateY(-15px) translateX(5px); }
                    50% { transform: translateY(-5px) translateX(-5px); }
                    75% { transform: translateY(-20px) translateX(3px); }
                }
                @keyframes letterFloat {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                    100% { transform: translateY(0); }
                }
                @keyframes gentlePulse {
                    0%, 100% { opacity: 0.1; transform: scale(1); }
                    50% { opacity: 0.15; transform: scale(1.02); }
                }
                @keyframes auroraMove {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    25% { transform: translate(5%, 3%) rotate(2deg); }
                    50% { transform: translate(-3%, 5%) rotate(-1deg); }
                    75% { transform: translate(3%, -3%) rotate(1deg); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes pulseRing {
                    0% { transform: scale(1); opacity: 0.2; }
                    50% { transform: scale(1.05); opacity: 0.4; }
                    100% { transform: scale(1); opacity: 0.2; }
                }
            `}</style>
        </section>
    );
};

export default Hero;