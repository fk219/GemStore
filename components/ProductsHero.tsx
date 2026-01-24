"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ProductsHero: React.FC = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const gridRef = useRef(null);
    const circleRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Initial States
        gsap.set(titleRef.current, { y: 100, opacity: 0, rotateX: 20 });
        gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
        gsap.set(gridRef.current, { opacity: 0, scale: 1.1 });
        gsap.set(circleRef.current, { scale: 0, opacity: 0 });

        // Sequence
        tl.to(gridRef.current, { opacity: 0.4, scale: 1, duration: 2.5, ease: "power2.out" })
            .to(circleRef.current, { scale: 1, opacity: 1, duration: 2, ease: "expo.out" }, "-=2")
            .to(titleRef.current, { y: 0, opacity: 1, rotateX: 0, duration: 1.5 }, "-=1.5")
            .to(subtitleRef.current, { y: 0, opacity: 1, duration: 1 }, "-=1.2");

        // Continuous rotation for circle
        gsap.to(circleRef.current, { rotation: 360, duration: 120, repeat: -1, ease: "none" });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[80vh] w-full overflow-hidden bg-[#0A0A0A] text-[#FBFBF9] flex items-center justify-center perspective-[1000px]">

            {/* Background Grid - Abstract Vault Feel */}
            <div ref={gridRef} className="absolute inset-0 opacity-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

            {/* Abstract Orb/Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Rotating Technical Ring */}
            <div ref={circleRef} className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] border border-white/5 rounded-full flex items-center justify-center opacity-0">
                <div className="absolute w-full h-full border border-white/5 rounded-full scale-110 border-dashed" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/20 rounded-full" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/20 rounded-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rounded-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rounded-full" />
            </div>

            {/* Content Content */}
            <div className="relative z-10 text-center px-6">
                <div ref={subtitleRef} className="flex items-center justify-center gap-4 mb-8 opacity-0">
                    <span className="w-12 h-px bg-white/30" />
                    <span className="text-[10px] tracking-[0.6em] uppercase font-sans font-light">Inventory Level 1</span>
                    <span className="w-12 h-px bg-white/30" />
                </div>

                <h1 ref={titleRef} className="text-7xl md:text-[10vw] font-light serif leading-[0.8] mix-blend-difference transform-gpu">
                    The Vault
                </h1>
            </div>
        </section>
    );
};

export default ProductsHero;
