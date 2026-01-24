"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const AboutHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        gsap.set(titleRef.current, { scale: 1.2, opacity: 0, filter: "blur(20px)" });

        // Gentle Entry
        tl.to(titleRef.current, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2.5, ease: "power2.out" });

        // Scroll Parallax for image
        gsap.to(imageRef.current, {
            y: "20%",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#FBFBF9] dark:bg-[#0A0A0A] text-[#1A1A1A] dark:text-[#FBFBF9]">

            {/* Background Image - Subtle & Dark */}
            <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40">
                <Image
                    ref={imageRef}
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=2000"
                    alt="Origin Texture"
                    fill
                    className="object-cover grayscale"
                    priority
                />
            </div>

            <div className="relative z-10 text-center px-6">
                <span className="block text-[10px] tracking-[0.6em] uppercase opacity-40 mb-8">Est. 1982 — Geneva</span>
                <h1 ref={titleRef} className="text-[15vw] leading-[0.8] font-serif tracking-tighter mix-blend-exclusion dark:text-white">
                    ORIGIN
                </h1>
                <div className="mt-12 w-px h-24 bg-current mx-auto opacity-20" />
            </div>
        </section>
    );
};

export default AboutHero;
