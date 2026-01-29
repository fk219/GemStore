"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const GlobalPrisms = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Subtle Parallax for prisms
        // They move slightly UP when user scrolls DOWN (reverse direction)
        const prisms = gsap.utils.toArray('.prism-shape');

        prisms.forEach((prism: any, i) => {
            const speed = (i + 1) * 20; // Varied speeds

            gsap.to(prism, {
                y: -speed,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5 // Smooth catch-up
                }
            });
        });

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        >
            {/* PRISM 1: Large Top Right - Sharp Triangle */}
            <div
                className="prism-shape absolute -top-[10%] right-[5%] w-[40vw] h-[40vw] opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    background: 'linear-gradient(135deg, #D4AF37, transparent)',
                    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                    filter: 'blur(80px)'
                }}
            />

            {/* PRISM 2: Mid Left - Diamond Shape */}
            <div
                className="prism-shape absolute top-[40%] -left-[10%] w-[30vw] h-[30vw] opacity-[0.04] dark:opacity-[0.06]"
                style={{
                    background: 'radial-gradient(circle, #F9F8F4 0%, transparent 70%)', // White glow
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                    filter: 'blur(60px)',
                    mixBlendMode: 'overlay'
                }}
            />

            {/* PRISM 3: Bottom Right - Angular Shard */}
            <div
                className="prism-shape absolute bottom-[10%] right-[15%] w-[25vw] h-[50vw] opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    background: 'linear-gradient(to bottom, #D4AF37, transparent)',
                    clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
                    transform: 'rotate(-15deg)',
                    filter: 'blur(50px)'
                }}
            />

            {/* PRISM 4: Deep Background Glow (Static Anchoring) */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#D4AF37] rounded-full opacity-[0.02] blur-[150px]"
            />
        </div>
    );
};

export default GlobalPrisms;
