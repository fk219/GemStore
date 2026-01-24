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
    const gemRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Mouse parallax
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1, // Smooth scrubbing
                pin: true, // Pin the section
            }
        });

        // Initial State Setups
        gsap.set(textRef.current, { scale: 0.5, opacity: 0, z: -1000 });
        gsap.set(gemRef.current, { scale: 0.8, filter: "blur(0px)" });

        // Scrollytelling Sequence
        // 1. Gemstone expands and blurs (Lens effect)
        tl.to(gemRef.current, {
            scale: 25, // Massive expansion to "enter" the stone
            filter: "blur(20px)",
            opacity: 0,
            duration: 5,
            ease: "power2.inOut"
        });

        // 2. Text emerges FROM the background as gem clears
        tl.to(textRef.current, {
            scale: 1,
            opacity: 1,
            z: 0,
            duration: 3,
            ease: "power2.out"
        }, "-=3.5"); // Overlap with gem expansion

        // 3. Overlay fades out to reveal clear text
        tl.to(overlayRef.current, {
            opacity: 0,
            duration: 2
        }, "-=2");

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505] perspective-[1000px]"
        >
            {/* Background Stars/Particles with Parallax */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
                    transition: 'transform 0.2s ease-out'
                }}
            >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-40 shadow-[0_0_10px_white]" />
                <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-amber-100 rounded-full opacity-30 shadow-[0_0_15px_amber-500]" />
            </div>

            {/* The Gemstone (Lens) */}
            <div ref={gemRef} className="relative z-20 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full overflow-hidden shadow-2xl origin-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1601156226066-88a24564c7ee?auto=format&fit=crop&q=80&w=1600" // Macro Gem
                    alt="The Lens"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* The Reveal Text */}
            <div ref={textRef} className="absolute z-10 text-center mix-blend-difference pointer-events-none">
                <span className="block text-[10px] tracking-[0.8em] uppercase text-white/60 mb-8">Est. 1982</span>
                <h1 className="text-[15vw] leading-[0.8] font-serif text-white opacity-90 italic">
                    L&apos;Éclat
                </h1>
                <span className="block text-sm tracking-[0.4em] uppercase text-white/60 mt-8 font-sans font-light">
                    Legacy of Light
                </span>
            </div>

            <div ref={overlayRef} className="absolute inset-0 bg-black/40 pointer-events-none z-30" />

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 text-[9px] tracking-[0.4em] uppercase animate-pulse z-40">
                explore
            </div>
        </section>
    );
};

export default Hero;
