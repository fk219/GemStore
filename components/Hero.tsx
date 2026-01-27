"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';

// REDUCED PARTICLE COUNT for Minimalism
const PARTICLE_POSITIONS = [
    { top: 20, left: 15, size: 2, delay: 0 },
    { top: 50, left: 75, size: 2, delay: 1 },
    { top: 80, left: 25, size: 3, delay: 2 },
    { top: 30, left: 85, size: 2, delay: 3 },
    { top: 15, left: 55, size: 2, delay: 4 },
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

            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
            if (cursorDotRef.current) {
                cursorDotRef.current.style.left = `${e.clientX}px`;
                cursorDotRef.current.style.top = `${e.clientY}px`;
            }

            trailPositions.push({ x: e.clientX, y: e.clientY, timestamp: Date.now() });
            if (trailPositions.length > 5) trailPositions.shift();

            setCursorTrail(trailPositions.map((pos, i) => ({
                x: pos.x,
                y: pos.y,
                opacity: (i + 1) / trailPositions.length * 0.2
            })));
        };

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const opacity = Math.max(0, 1 - scrollY / 600);
            setScrollOpacity(opacity);
        };

        const updateSmoothPos = () => {
            currentPos.x += (targetPos.x - currentPos.x) * 0.03;
            currentPos.y += (targetPos.y - currentPos.y) * 0.03;
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

    const handleMagneticMove = useCallback((e: React.MouseEvent<HTMLElement>, strength: number = 0.3) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        setMagneticPos({ x: deltaX, y: deltaY });
    }, []);

    const SplitText = ({ text, delay = 0, className = "", hoverable = false }: { text: string, delay?: number, className?: string, hoverable?: boolean }) => (
        <span className={`inline-block ${className}`}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className={`inline-block transition-all duration-[2.5s] cubic-bezier(0.16, 1, 0.3, 1) 
                        ${mounted ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-12 opacity-0 blur-sm'}
                        ${hoverable ? 'hover:text-[#D4AF37] hover:scale-110 hover:-translate-y-2 cursor-default' : ''}
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

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#F9F8F4] text-[#1A1A1A] perspective-[1200px] cursor-none"
            style={{ opacity: scrollOpacity }}
        >
            {/* Custom Cursor System */}
            <div
                ref={cursorRef}
                className={`fixed pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out mix-blend-darken ${cursorVariant === 'text' ? 'w-20 h-20 opacity-50' : 'w-6 h-6 opacity-100'
                    }`}
            >
                <div className={`w-full h-full rounded-full border-[0.5px] transition-all duration-500 ${cursorVariant === 'text'
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5 scale-100'
                    : 'border-[#1A1A1A]/40 bg-transparent scale-100'
                    }`} />
            </div>
            <div
                ref={cursorDotRef}
                className="fixed w-[2px] h-[2px] bg-[#1A1A1A] rounded-full pointer-events-none z-[101] -translate-x-1/2 -translate-y-1/2"
            />

            {/* ATMOSPHERIC BACKGROUND - Cream & Gold */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#F9F8F4]" />
                <div
                    className="absolute inset-0 transition-transform duration-[2s] ease-out"
                    style={{
                        transform: `translate3d(${(smoothMousePos.x - 0.5) * -10}px, ${(smoothMousePos.y - 0.5) * -10}px, 0)`
                    }}
                >
                    {/* Subtle Radial Gradient - Warm Center */}
                    <div
                        className="absolute inset-0 opacity-60 transition-opacity duration-1000"
                        style={{
                            background: `radial-gradient(circle at ${smoothMousePos.x * 100}% ${smoothMousePos.y * 100}%, rgba(255, 255, 255, 1) 0%, rgba(249, 248, 244, 0) 50%)`
                        }}
                    />
                    {/* Minimal Particles - Gold */}
                    <div className="absolute inset-0 pointer-events-none">
                        {PARTICLE_POSITIONS.map((particle, i) => (
                            <div
                                key={i}
                                className={`absolute rounded-full transition-all duration-[2s]
                                    ${activeParticle === i ? 'bg-[#D4AF37] scale-125' : 'bg-[#D4AF37]/30'}
                                    animate-[particleFloat_${12 + i * 4}s_infinite_ease-in-out]`}
                                style={{
                                    top: `${particle.top}%`,
                                    left: `${particle.left}%`,
                                    width: particle.size,
                                    height: particle.size,
                                    opacity: mounted ? 0.6 : 0,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* GEOMETRIC ARCHITECTURE */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <div
                    className={`absolute top-[15%] left-[20%] w-[40vw] h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent rotate-[-35deg] transition-all duration-[5s] ${mounted ? 'opacity-30' : 'opacity-0'}`}
                />
            </div>

            {/* CINEMATIC TYPOGRAPHY */}
            <div className="relative z-20 w-full max-w-[1900px] px-8 md:px-24 pointer-events-none">
                <div className="flex flex-col gap-0 select-none">

                    {/* TOP ROW */}
                    <div className="flex items-end justify-between mb-[-4vh] relative">
                        <h1
                            className="text-[10vw] md:text-[9vw] font-light serif leading-[0.8] tracking-[-0.03em] uppercase pointer-events-auto group text-[#1A1A1A]"
                            onMouseEnter={() => setCursorVariant('text')}
                            onMouseLeave={() => setCursorVariant('default')}
                            onMouseMove={(e) => handleMagneticMove(e, 0.1)}
                        >
                            <span style={{ transform: `translate(${magneticPos.x}px, ${magneticPos.y}px)`, display: 'inline-block', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                                <SplitText text="RARE" delay={0.5} className="drop-shadow-sm" hoverable />
                            </span>
                        </h1>

                        <div className="flex flex-col items-end gap-6 mb-4">
                            <span
                                className="text-[3vw] md:text-[2.5vw] italic text-[#D4AF37] lowercase tracking-wide font-light pointer-events-auto"
                            >
                                <SplitText text="by nature" delay={1.0} className="opacity-90" />
                            </span>
                            <div className={`hidden lg:block text-[9px] tracking-[0.4em] uppercase text-[#1A1A1A]/40 font-sans transition-all duration-[2s] delay-[1.5s] ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                                Edition 001 / Archive
                            </div>
                        </div>
                    </div>

                    {/* CENTER ROW: THE CRYSTAL LENS - LIGHT THEME */}
                    <div className="relative flex items-center justify-center py-24 md:py-32">
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ transform: `translate3d(${(smoothMousePos.x - 0.5) * 30}px, ${(smoothMousePos.y - 0.5) * 30}px, 0)` }}
                        >
                            <div
                                className={`w-[32vw] aspect-square rounded-full border border-[#D4AF37]/20 flex items-center justify-center transition-all duration-[3s] cubic-bezier(0.19, 1, 0.22, 1) pointer-events-auto group/lens hover:border-[#D4AF37]/40 ${mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
                                onMouseEnter={() => setCursorVariant('text')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                <div className="absolute inset-[-30px] rounded-full border border-[#D4AF37]/10 animate-[spin_160s_linear_infinite]" />

                                <div className="w-[92%] h-[92%] rounded-full overflow-hidden relative grayscale group shadow-xl transition-all duration-[1.5s]">
                                    {/* Overlay for light mode: darkens image slightly */}
                                    <div className="absolute inset-0 bg-[#F9F8F4]/10 z-10 group-hover/lens:bg-transparent transition-colors duration-700" />
                                    <img
                                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
                                        className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover/lens:scale-110"
                                        alt="Refraction Focus"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/30 to-transparent opacity-0 group-hover/lens:opacity-100 transition-opacity duration-1000 mix-blend-overlay" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute z-[-1] pointer-events-none mix-blend-multiply opacity-5">
                            <h2
                                className={`text-[12vw] font-serif uppercase tracking-[-0.05em] text-[#1A1A1A] ${mounted ? 'opacity-100 blur-0' : 'opacity-0 blur-xl'} transition-all duration-[2s]`}
                            >
                                Refined
                            </h2>
                        </div>
                    </div>

                    {/* BOTTOM ROW: CRAFTED SIGNATURE */}
                    <div className="flex items-start justify-between mt-[-4vh] relative">
                        <div className={`hidden lg:flex flex-col gap-8 mt-24 transition-all duration-[2s] delay-[1.5s] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                            <div className="w-12 h-[1px] bg-[#1A1A1A]/20" />
                            <p className="text-[10px] tracking-[0.4em] uppercase opacity-50 max-w-[200px] leading-relaxed font-sans text-[#1A1A1A]">
                                Silence in the stone
                            </p>
                        </div>

                        <h1
                            className="text-[10vw] md:text-[9vw] font-light serif leading-[0.8] tracking-[-0.03em] uppercase text-right pointer-events-auto text-[#1A1A1A]"
                            onMouseEnter={() => setCursorVariant('text')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <span className="italic mr-4 text-[#D4AF37] opacity-90 transition-opacity duration-500">
                                <SplitText text="Craf" delay={1.5} hoverable />
                            </span>
                            <SplitText text="ted" delay={1.8} className="text-[#1A1A1A]" hoverable />
                        </h1>
                    </div>
                </div>
            </div>

            {/* MINIMAL NAVIGATION LINES */}
            <div className={`absolute bottom-0 left-0 w-full h-px bg-[#1A1A1A]/5 ${mounted ? 'scale-x-100' : 'scale-x-0'} transition-transform duration-[2s] origin-left`} />

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes particleFloat {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-10px) translateX(5px); }
                }
                @keyframes letterFloat {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                    100% { transform: translateY(0); }
                }
            `}</style>
        </section>
    );
};

export default Hero;