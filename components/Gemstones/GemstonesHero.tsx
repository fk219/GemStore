"use client";

import React, { useState, useRef } from 'react';
import { Diamond } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const GemstonesHero: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        setMounted(true);

        // Background parallax effect
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
        <section ref={containerRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
            {/* Background Elements (CTA Clone) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
                <div className="bg-parallax absolute top-[-50%] left-[20%] w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[120px] mix-blend-soft-light" />
                <div className="bg-parallax absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-[#997B28] rounded-full blur-[100px] mix-blend-soft-light" />
            </div>

            {/* Background Image - Macro Texture */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=2000"
                    alt="Sapphire Texture"
                    className="w-full h-full object-cover opacity-50 dark:opacity-40 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#F9F8F4]/80 via-[#F9F8F4]/50 to-[#F9F8F4] dark:from-[#0A0A0B]/80 dark:via-[#0A0A0B]/50 dark:to-[#0A0A0B]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
                <div className={`transition-all duration-[2.5s] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <Diamond className="w-12 h-12 mx-auto mb-8 text-[#b5a16d]/60" strokeWidth={0.5} />
                    <h1 className="font-serif text-[12vw] md:text-[8vw] lg:text-[7vw] font-light leading-[0.9] tracking-tight mb-6 text-[#1A1A1A] dark:text-[#FBFBF9]">
                        <span className="block">The Collection</span>
                    </h1>
                    <p className="text-[11px] md:text-[13px] tracking-[0.6em] uppercase opacity-40 font-light text-[#1A1A1A] dark:text-[#FBFBF9]">
                        Nature&apos;s Masterpieces
                    </p>
                </div>
            </div>
        </section>
    );
};

export default GemstonesHero;
