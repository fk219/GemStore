"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const ContactHero = () => {
    const containerRef = useRef(null);
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
    const formContainerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const titleText = "Direct Line";

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=100%",
                pin: true,
                scrub: 1,
            }
        });

        // 1. Initial Scatter Set - done via Set or CSS, here GSAP set
        lettersRef.current.forEach((letter) => {
            if (letter) {
                gsap.set(letter, {
                    x: (Math.random() - 0.5) * window.innerWidth,
                    y: (Math.random() - 0.5) * window.innerHeight,
                    opacity: 0,
                    rotation: (Math.random() - 0.5) * 90
                });
            }
        });

        // 2. Coalesce Letters to center
        tl.to(lettersRef.current, {
            x: 0,
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 3,
            ease: "power2.inOut",
            stagger: 0.05
        });

        // 3. Form slides up with Spring (simulated via scrub)
        // Since scrub removes 'spring' physics in real-time, we simulate easing
        tl.fromTo(formContainerRef.current,
            { y: "150%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 2, ease: "back.out(1.2)" },
            "-=1.5"
        );

        // 4. Glow intensifies
        tl.to(glowRef.current, { scale: 1.5, opacity: 0.8 }, "<");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#0F0F0F] text-[#FBFBF9] flex flex-col items-center justify-center">

            {/* Aura Glow */}
            <div ref={glowRef} className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-purple-500/10 rounded-full blur-[150px] opacity-20 transform scale-50" />

            {/* Scattered Title */}
            <div className="relative z-10 flex text-6xl md:text-9xl font-light serif italic mix-blend-difference mb-24 cursor-default select-none">
                {titleText.split("").map((char, i) => (
                    <span
                        key={i}
                        ref={el => lettersRef.current[i] = el}
                        className="inline-block"
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </div>

            {/* The Form (Visual Representation for Hero) */}
            <div ref={formContainerRef} className="absolute bottom-0 w-full max-w-2xl bg-[#1A1A1A] p-12 rounded-t-[40px] shadow-2xl border-t border-white/10 z-20">
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-8" />
                <h3 className="text-center text-xl font-light font-serif italic mb-8">Begin the conversation.</h3>
                <div className="space-y-4 opacity-50 pointer-events-none">
                    <div className="h-12 w-full border-b border-white/10" />
                    <div className="h-12 w-full border-b border-white/10" />
                </div>
                {/* Note: This is just the HERO part of Contact. The actual form is below in the page content. 
                     The user asked for the "Hero section" animation. */}
                <div className="text-center mt-8 text-[10px] tracking-[0.4em] uppercase opacity-40">Scroll to Complete</div>
            </div>
        </section>
    );
};

export default ContactHero;
