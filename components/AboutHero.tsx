"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

const AboutHero: React.FC = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const quoteRef = useRef(null);
    const imageRef = useRef(null);
    const overlayRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        // Parallax scroll effect
        gsap.to(imageRef.current, {
            y: "20%",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Intro Animation
        tl.fromTo(imageRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 0.4, duration: 2.5 })
            .fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, "-=2")
            .fromTo(overlayRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "expo.out" }, "-=1.5")
            .fromTo(quoteRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 0.7, duration: 1.5 }, "-=1");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#FBFBF9] dark:bg-[#050505] text-[#1A1A1A] dark:text-[#FBFBF9]">

            {/* Background Image - The "Eye" or Texture */}
            <div className="absolute inset-0 z-0 h-[120%] -top-[10%]">
                <Image
                    ref={imageRef}
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=2000" // Raw Emerald/Stone texture
                    alt="Curator Texture"
                    fill
                    className="object-cover grayscale contrast-125 opacity-0"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FBFBF9] via-[#FBFBF9]/80 to-transparent dark:from-[#050505] dark:via-[#050505]/80 dark:to-transparent" />
            </div>

            <div className="container mx-auto px-6 md:px-24 relative z-10 pt-24">
                <div className="max-w-4xl">
                    <div ref={overlayRef} className="w-24 h-px bg-current mb-8 origin-left" />

                    <span className="block text-[10px] tracking-[0.6em] uppercase opacity-40 mb-8 pl-1">Est. 1982 — Geneva</span>

                    <h1 ref={titleRef} className="text-7xl md:text-[9vw] font-light serif leading-[0.9] mb-12 opacity-0">
                        The <span className="italic opacity-40">Eye</span> <br />
                        of the Curator.
                    </h1>

                    <p ref={quoteRef} className="text-xl md:text-2xl font-light opacity-0 font-serif italic pl-12 border-l border-current/20 max-w-2xl leading-relaxed">
                        &quot;We do not hunt for stones. We wait for them. To acquire a gem of true significance is to inherit a responsibility.&quot;
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
