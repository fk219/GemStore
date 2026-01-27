'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Diamond } from 'lucide-react';

const HeroCalm: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0B] text-[#FBFBF9]"
        >
            {/* ABSTRACT BACKGROUND LAYERS */}
            <div className="absolute inset-0">
                {/* Dynamic Gradient Core */}
                <div
                    className="absolute inset-0 opacity-60 transition-all duration-1000"
                    style={{
                        background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, #1A1A1A 0%, #0A0A0B 60%)`
                    }}
                />

                {/* Subtle Noise Texture */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                />

                {/* Floating Abstract Shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Large Organic Shape 1 */}
                    <div
                        className={`absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] border border-white/[0.02] transition-all duration-[8s] ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                        style={{
                            transform: `translate(${(mousePos.x - 0.5) * -40}px, ${(mousePos.y - 0.5) * -40}px) rotate(${mousePos.x * 10}deg)`,
                            background: 'radial-gradient(circle at 30% 30%, rgba(181, 161, 109, 0.03) 0%, transparent 70%)'
                        }}
                    />

                    {/* Large Organic Shape 2 */}
                    <div
                        className={`absolute bottom-[15%] right-[5%] w-[35vw] h-[35vw] rounded-[40%_60%_70%_30%/40%_40%_60%_60%] border border-[#b5a16d]/[0.04] transition-all duration-[10s] ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                        style={{
                            transform: `translate(${(mousePos.x - 0.5) * 30}px, ${(mousePos.y - 0.5) * 30}px) rotate(${-mousePos.x * 15}deg)`,
                            background: 'radial-gradient(circle at 70% 70%, rgba(181, 161, 109, 0.02) 0%, transparent 60%)'
                        }}
                    />

                    {/* Minimal Particles */}
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-[2px] h-[2px] rounded-full bg-[#b5a16d]/20"
                            style={{
                                top: `${20 + i * 15}%`,
                                left: `${15 + i * 18}%`,
                                transform: `translate(${(mousePos.x - 0.5) * (10 + i * 5)}px, ${(mousePos.y - 0.5) * (10 + i * 5)}px)`,
                                opacity: 0.3 - i * 0.05,
                                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* CENTRAL CONTENT - MINIMAL & ARCHITECTURAL */}
            <div className="relative z-20 w-full max-w-[1600px] px-8 md:px-16 lg:px-32">
                <div className="flex flex-col items-center justify-center gap-16">

                    {/* Iconic Diamond Symbol */}
                    <div
                        className={`relative transition-all duration-[3s] ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                        style={{
                            transform: `translateY(${(mousePos.y - 0.5) * -20}px)`
                        }}
                    >
                        <div className="relative">
                            {/* Outer Glow Ring */}
                            <div className="absolute inset-0 -m-12">
                                <div className="w-full h-full rounded-full border border-[#b5a16d]/10 animate-pulse" />
                            </div>

                            {/* Diamond Icon */}
                            <Diamond
                                className="w-16 h-16 md:w-20 md:h-20 text-[#b5a16d]/80"
                                strokeWidth={0.5}
                            />
                        </div>
                    </div>

                    {/* Minimal Typography - Single Statement */}
                    <div className="flex flex-col items-center gap-8">
                        <h1
                            className={`text-center font-serif text-[11vw] md:text-[8vw] lg:text-[6.5vw] font-light leading-[0.9] tracking-tight transition-all duration-[3.5s] delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                        >
                            <span className="block">Timeless</span>
                            <span className="block italic text-[#b5a16d] mt-2">Craft</span>
                        </h1>

                        {/* Subtle Tagline */}
                        <p
                            className={`text-center text-[10px] md:text-[11px] tracking-[0.8em] uppercase opacity-30 font-light transition-all duration-[3s] delay-700 ${mounted ? 'opacity-30 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        >
                            Rare by Nature
                        </p>
                    </div>

                    {/* Architectural Divider */}
                    <div
                        className={`w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent transition-all duration-[3s] delay-1000 ${mounted ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}
                    />

                    {/* Minimal CTA */}
                    <div
                        className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all duration-[3s] delay-[1.2s] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        <a
                            href="/gemstones"
                            className="group relative text-[10px] tracking-[0.4em] uppercase text-white/60 hover:text-white transition-all duration-700"
                        >
                            <span className="relative z-10">Explore Collection</span>
                            <div className="absolute bottom-0 left-0 w-0 h-px bg-[#b5a16d] group-hover:w-full transition-all duration-700" />
                        </a>

                        <div className="w-px h-4 bg-white/10 hidden md:block" />

                        <a
                            href="/book"
                            className="group relative text-[10px] tracking-[0.4em] uppercase text-white/60 hover:text-white transition-all duration-700"
                        >
                            <span className="relative z-10">Private Viewing</span>
                            <div className="absolute bottom-0 left-0 w-0 h-px bg-[#b5a16d] group-hover:w-full transition-all duration-700" />
                        </a>
                    </div>
                </div>
            </div>

            {/* BOTTOM METADATA - ULTRA MINIMAL */}
            <div className="absolute bottom-12 left-0 right-0 z-10">
                <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-32">
                    <div className="flex items-center justify-between">
                        {/* Left: Scroll Indicator */}
                        <div
                            className={`flex flex-col items-center gap-3 opacity-20 transition-all duration-[3s] delay-[1.5s] ${mounted ? 'opacity-20 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        >
                            <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
                            <span className="text-[8px] tracking-[0.3em] uppercase rotate-90 origin-center whitespace-nowrap">
                                Scroll
                            </span>
                        </div>

                        {/* Right: Establishment Year */}
                        <div
                            className={`text-[9px] tracking-[0.6em] uppercase opacity-15 transition-all duration-[3s] delay-[1.5s] ${mounted ? 'opacity-15 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        >
                            Est. 2001
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS Keyframes for Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </section>
    );
};

export default HeroCalm;
