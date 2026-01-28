"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const BlogHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".blog-title", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            delay: 0.2,
            ease: "power3.out"
        });

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
        <section ref={containerRef} className="relative w-full h-[60vh] flex flex-col justify-center items-center overflow-hidden bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9]">
            {/* Background Elements (CTA Clone) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="bg-parallax absolute top-[-50%] left-[20%] w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[120px] mix-blend-soft-light" />
                <div className="bg-parallax absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-[#997B28] rounded-full blur-[100px] mix-blend-soft-light" />
            </div>

            {/* Editorial Flat Lay Background */}
            <div className="absolute inset-0 opacity-20 dark:opacity-40">
                <Image
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=2000" // Placeholder for sketches/loose stones
                    alt="Gemologist Journal Background"
                    fill
                    className="object-cover grayscale"
                />
            </div>

            <div className="relative z-10 text-center max-w-4xl px-6">
                <span className="blog-title block text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8">Editorial</span>
                <h1 className="blog-title text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-tight">
                    The Gemologist&apos;s <span className="italic">Journal</span>
                </h1>
                <div className="blog-title w-px h-16 bg-current mx-auto mt-12 opacity-30" />
            </div>
        </section>
    );
};

export default BlogHero;
