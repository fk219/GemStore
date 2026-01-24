"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const ProductsHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        gsap.set(titleRef.current, { y: 150, skewY: 10, opacity: 0 });
        gsap.set(overlayRef.current, { scaleY: 1 });

        // Intro
        tl.to(overlayRef.current, { scaleY: 0, duration: 1.5, ease: "expo.inOut" })
            .to(titleRef.current, { y: 0, skewY: 0, opacity: 1, duration: 2 }, "-=1");

        // Scroll
        gsap.to(gridRef.current, {
            rotation: 45,
            scale: 1.5,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[80vh] w-full overflow-hidden bg-[#0A0A0A] text-[#E0D8C8] flex items-center justify-center">

            {/* Background Grid - Rotates on scroll */}
            <div ref={gridRef} className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
            </div>

            {/* Typography */}
            <div className="relative z-10 text-center mix-blend-difference overflow-hidden">
                <div className="mb-4 flex items-center justify-center gap-4 text-[10px] tracking-[0.8em] uppercase opacity-50">
                    <span>Secured</span>
                    <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                        <div className="w-1 h-1 bg-current rounded-full" />
                    </div>
                    <span>Archive</span>
                </div>
                <h1 ref={titleRef} className="text-[15vw] leading-[0.8] font-serif font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FBFBF9] to-[#999]">
                    VAULT
                </h1>

                {/* Floating Abstract Elements */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 right-20 w-32 h-32 border border-white/10 rounded-full animate-[spin_20s_linear_infinite]" />
                    <div className="absolute bottom-10 left-20 w-48 h-48 border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                </div>
            </div>

            {/* Reveal Overlay Curtain */}
            <div ref={overlayRef} className="absolute inset-0 bg-[#0A0A0A] z-50 origin-top" />
        </section>
    );
};

export default ProductsHero;
