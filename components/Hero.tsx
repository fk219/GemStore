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
    const prismRef = useRef<HTMLDivElement>(null);
    const prismsGroupRef = useRef<HTMLDivElement>(null);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Smooth lerp could be added here for performance, but simple state update for now
            // For production, use requestAnimationFrame for the visual update
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

        // Initial Setup - Hidden
        gsap.set([rareRef.current, craftedRef.current], { y: 150, opacity: 0, scale: 1.1 });
        gsap.set(refinedRef.current, { scale: 0.9, opacity: 0, filter: "blur(10px)" });
        gsap.set(prismsGroupRef.current, { scale: 0.5, opacity: 0, rotation: -45 });

        // Cinematic Entrance Sequence
        // 1. Prisms swirl in slowly
        tl.to(prismsGroupRef.current, {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 3.5,
            ease: "power2.out"
        });

        // 2. Center Refined reveals through the prisms
        tl.to(refinedRef.current, {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 2.5,
            ease: "expo.out"
        }, "-=2.5");

        // 3. Massive Typography Slides Up - Staggered
        tl.to(rareRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 2.5,
            ease: "power3.out"
        }, "-=2")
            .to(craftedRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 2.5,
                ease: "power3.out"
            }, "-=2.3");

        // Continuous Floating Prism Animation
        gsap.to(".prism-shape", {
            y: "random(-20, 20)",
            x: "random(-10, 10)",
            rotation: "random(-10, 10)",
            duration: "random(4, 7)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                amount: 2,
                from: "random"
            }
        });

        // Interactive Mouse Gradient Parallax
        const xTo = gsap.quickTo(".interactive-bg", "x", { duration: 0.8, ease: "power3" });
        const yTo = gsap.quickTo(".interactive-bg", "y", { duration: 0.8, ease: "power3" });

        // We use a separate effect for this to update GSAP quickTo
        // (Simulated here inside useGSAP context for simplicity)

    }, { scope: containerRef });

    // Update GSAP quickTo values on mouse move
    useEffect(() => {
        gsap.to(".interactive-bg", {
            x: mousePos.x * 50,
            y: mousePos.y * 50,
            duration: 1,
            ease: "power2.out"
        });

        // Tilt Prisms slightly
        gsap.to(prismsGroupRef.current, {
            rotationY: mousePos.x * 10,
            rotationX: -mousePos.y * 10,
            duration: 1.5,
            ease: "power2.out"
        });
    }, [mousePos]);


    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#020202] text-[#EAEAEA] flex items-center justify-center perspective-[1000px]">

            {/* Dynamic Interactive Gradient Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen overflow-hidden">
                <div className="interactive-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-purple-900/10 to-transparent blur-[100px] rounded-full" />
                <div className="interactive-bg absolute top-1/3 left-1/3 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[120px] mix-blend-color-dodge" />
            </div>

            {/* Noise Grain */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 brightness-100 contrast-150"></div>
            </div>

            <div className="relative z-10 w-full max-w-[1920px] px-6 md:px-24 h-full flex flex-col justify-center">

                {/* 1. RARE - Top Left */}
                <div className="absolute top-[12%] left-[5%] md:left-[8%] z-20">
                    <h1 ref={rareRef} className="text-[17vw] md:text-[16vw] leading-[0.75] font-serif tracking-tighter mix-blend-exclusion text-white select-none">
                        RARE
                    </h1>
                </div>

                {/* 2. REFINED / PRISMS - Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center perspective-[2000px]">

                    {/* Floating Abstract Prisms Group */}
                    <div ref={prismsGroupRef} className="relative w-[40vw] h-[40vw] flex items-center justify-center">

                        {/* Prism Layer 1 (Back) */}
                        <div className="prism-shape absolute w-[120%] h-[120%] border border-white/5 rounded-full blur-[2px] opacity-40 animate-[spin_40s_linear_infinite_reverse]" />

                        {/* Prism Layer 2 (Abstract Geometry) */}
                        <div className="prism-shape absolute top-0 left-10 w-32 h-64 bg-gradient-to-b from-white/10 to-transparent skew-y-12 backdrop-blur-sm border-l border-white/20" />
                        <div className="prism-shape absolute bottom-20 right-10 w-48 h-48 rounded-full border border-white/10 rotate-45 backdrop-blur-md mix-blend-soft-light" />

                        {/* Central Lens/Gem visual */}
                        <div className="relative w-[28vw] h-[28vw] rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/80 z-10" />
                            <Image
                                src="https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=1200" // Abstract Texture
                                alt="Refined Prism"
                                fill
                                className="object-cover opacity-60 hover:scale-110 transition-transform duration-[4s] ease-in-out"
                            />
                            {/* Refraction Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-1000 mix-blend-overlay" />
                        </div>
                    </div>

                    {/* REFINED Text Overlaying the Prisms */}
                    <div ref={refinedRef} className="absolute z-30 mix-blend-difference pointer-events-none">
                        <h2 className="text-[12vw] md:text-[10vw] font-serif italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/20">
                            REFINED
                        </h2>
                    </div>
                </div>

                {/* 3. CRAFTED - Bottom Right */}
                <div className="absolute bottom-[10%] right-[5%] md:right-[8%] z-20">
                    <h1 ref={craftedRef} className="text-[17vw] md:text-[16vw] leading-[0.75] font-serif tracking-tighter mix-blend-exclusion text-white select-none">
                        CRAFTED
                    </h1>
                </div>

                {/* Meta Details */}
                <div className="absolute bottom-12 left-12 hidden md:flex items-center gap-4 text-[9px] tracking-[0.4em] uppercase opacity-30">
                    <div className="w-8 h-px bg-white" />
                    Maison de Haute Joaillerie
                </div>
                <div className="absolute top-12 right-12 hidden md:flex items-center gap-4 text-[9px] tracking-[0.4em] uppercase opacity-30">
                    Archive No. 001
                    <div className="w-8 h-px bg-white" />
                </div>

            </div>
        </section>
    );
};

export default Hero;
