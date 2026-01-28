"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const ContactHero = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        gsap.set(titleRef.current, { y: 100, opacity: 0 });
        gsap.set(subRef.current, { opacity: 0 });

        tl.to(titleRef.current, { y: 0, opacity: 1, duration: 2.5 })
            .to(subRef.current, { opacity: 0.5, duration: 2 }, "-=2");

        // Background parallax effect (From CTA)
        gsap.to(".bg-parallax", {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[70vh] w-full overflow-hidden bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9] flex items-center justify-center">

            {/* Background Elements (CTA Clone) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
                <div className="bg-parallax absolute top-[-50%] left-[20%] w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[120px] mix-blend-soft-light" />
                <div className="bg-parallax absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-[#997B28] rounded-full blur-[100px] mix-blend-soft-light" />
            </div>

            <div className="relative z-10 text-center px-6 mix-blend-normal">
                <span ref={subRef} className="block text-[10px] tracking-[0.8em] uppercase opacity-0 mb-4 text-[#D4AF37]">
                    Concierge Services
                </span>
                <h1 ref={titleRef} className="text-[10vw] leading-[0.8] font-serif font-light tracking-tight italic text-[#1A1A1A] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:to-white/40">
                    Begin Your Journey
                </h1>

                {/* Floating Letters or Shapes */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-exclusion dark:mix-blend-normal">
                    <span className="absolute top-[20%] left-[10%] text-[8rem] serif italic opacity-5 text-current animate-[float_10s_ease-in-out_infinite]">A</span>
                    <span className="absolute bottom-[20%] right-[10%] text-[6rem] serif italic opacity-5 text-current animate-[float_12s_ease-in-out_infinite_reverse]">V</span>
                </div>
            </div>
        </section>
    );
};

export default ContactHero;
