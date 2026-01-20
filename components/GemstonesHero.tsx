"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const GemstonesHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Initial reveal
        tl.fromTo(imageRef.current,
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 0.4, duration: 2.5, ease: "power2.out" }
        )
            .fromTo(titleRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
                "-=2"
            );

        // Parallax effect on scroll
        gsap.to(imageRef.current, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-[#0A0A0B] text-[#FBFBF9]">
            {/* Background Image - Abstract Macro Gem */}
            <div ref={imageRef} className="absolute inset-0 w-full h-full">
                <Image
                    src="https://images.unsplash.com/photo-1617042375876-a13e36732a04?auto=format&fit=crop&q=80&w=2000"
                    alt="Prismatic Diffraction"
                    fill
                    className="object-cover opacity-60 mix-blend-screen"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-[#0A0A0B]/30" />
            </div>

            <div className="relative z-10 text-center px-6">
                <span className="block text-[8px] md:text-[10px] tracking-[0.8em] uppercase opacity-60 mb-8 font-sans font-light">
                    Volume 02 — Rare Earth
                </span>

                <h1 ref={titleRef} className="text-6xl md:text-9xl font-light serif italic leading-none mb-10 mix-blend-difference">
                    The Archive
                </h1>

                <p className="max-w-md mx-auto text-xs md:text-sm tracking-[0.2em] leading-relaxed opacity-60 font-sans font-light">
                    A curated selection of geological anomalies. <br className="hidden md:block" />
                    Each piece chosen for its unique interaction with light.
                </p>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
                <span className="text-[10px] tracking-widest uppercase font-sans">Explore</span>
            </div>
        </section>
    );
};

export default GemstonesHero;
