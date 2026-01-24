"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rareRef = useRef<HTMLHeadingElement>(null);
    const refinedRef = useRef<HTMLDivElement>(null);
    const craftedRef = useRef<HTMLHeadingElement>(null);
    const lensRef = useRef<HTMLDivElement>(null);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5),
                y: (e.clientY / window.innerHeight - 0.5)
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Initial Setup
        gsap.set([rareRef.current, craftedRef.current], { y: 100, opacity: 0 });
        gsap.set(refinedRef.current, { scale: 0.8, opacity: 0 });
        gsap.set(lensRef.current, { scale: 0, opacity: 0 });

        // Intro Animation
        tl.to(lensRef.current, { scale: 1, opacity: 1, duration: 2, ease: "expo.out" })
            .to(refinedRef.current, { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }, "-=1.5")
            .to(rareRef.current, { y: 0, opacity: 1, duration: 2, ease: "power3.out" }, "-=1.2")
            .to(craftedRef.current, { y: 0, opacity: 1, duration: 2, ease: "power3.out" }, "-=1.8");

        // Scroll Parallax
        gsap.to(lensRef.current, {
            y: 100,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#020202] text-[#EAEAEA] flex items-center justify-center">

            {/* Background Texture - Dark "Old Money" Grain */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-overlay">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            {/* Mouse Parallax Background Elements */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}>
                <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1920px] px-6 md:px-24 h-full flex flex-col justify-center">

                {/* 1. RARE - Top Left */}
                <div className="absolute top-[15%] left-[5%] md:left-[8%] z-20">
                    <h1 ref={rareRef} className="text-[18vw] md:text-[16vw] leading-[0.8] font-serif tracking-tighter mix-blend-exclusion text-white">
                        RARE
                    </h1>
                </div>

                {/* 2. REFINED / LENS - Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                    {/* The Lens / Ring */}
                    <div ref={lensRef} className="relative w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-full" />
                        {/* Decorative Rings */}
                        <div className="absolute w-[110%] h-[110%] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
                        <div className="absolute w-[90%] h-[90%] border border-white/5 rounded-full" />

                        {/* Centered Image inside Lens - The "Necklace/Gem" */}
                        <div className="w-[70%] h-[70%] relative rounded-full overflow-hidden mix-blend-overlay opacity-80">
                            <Image
                                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200"
                                alt="Refined Gem"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-125"
                            />
                        </div>
                    </div>

                    {/* REFINED Text Overlaying the Lens */}
                    <div ref={refinedRef} className="absolute z-30 mix-blend-difference pointer-events-none">
                        <h2 className="text-[12vw] md:text-[10vw] font-serif italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/20">
                            REFINED
                        </h2>
                    </div>
                </div>

                {/* 3. CRAFTED - Bottom Right */}
                <div className="absolute bottom-[10%] right-[5%] md:right-[8%] z-20">
                    <h1 ref={craftedRef} className="text-[18vw] md:text-[16vw] leading-[0.8] font-serif tracking-tighter mix-blend-exclusion text-white">
                        CRAFTED
                    </h1>
                </div>

                {/* Meta Details */}
                <div className="absolute bottom-12 left-12 text-[9px] tracking-[0.4em] uppercase opacity-30 hidden md:block">
                    Maison de Haute Joaillerie
                </div>
                <div className="absolute top-12 right-12 text-[9px] tracking-[0.4em] uppercase opacity-30 hidden md:block">
                    Archive No. 001
                </div>

            </div>
        </section>
    );
};

export default Hero;
