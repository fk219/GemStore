"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Diamond } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface CTAProps {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    href?: string;
}

const CTA: React.FC<CTAProps> = ({
    title = "Acquire the Exceptional",
    subtitle = "Begin Your Journey",
    buttonText = "Inquire Now",
    href = "/contact"
}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const underlineRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(textRef.current,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
        )
            .fromTo(buttonRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=1"
            );

        // Animate Underline
        if (underlineRef.current) {
            const length = underlineRef.current.getTotalLength();
            gsap.set(underlineRef.current, { strokeDasharray: length, strokeDashoffset: length });
            tl.to(underlineRef.current, { strokeDashoffset: 0, duration: 2, ease: "power2.out" }, "-=1.2");
        }

        // Parallax for Background Image
        gsap.to(".cta-bg-image", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative h-[80vh] md:h-[90vh] overflow-hidden flex flex-col items-center justify-center text-center px-6 mx-2 md:mx-8 my-12 rounded-[40px] md:rounded-[80px] shadow-2xl shadow-black/50"
        >
            {/* 1. Cinematic Background Layer */}
            <div className="absolute inset-0 z-0">
                <div className="cta-bg-image absolute inset-0 -top-[20%] h-[140%] w-full">
                    <img
                        src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=2000"
                        alt="Luxury Gemstone Background"
                        className="w-full h-full object-cover brightness-50 contrast-125"
                    />
                </div>
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
                <div className="absolute inset-0 bg-[#0A0A0B]/30" />

                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
            </div>

            {/* 2. Content Layer */}
            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-12 md:gap-16">

                {/* Text Block */}
                <div ref={textRef} className="flex flex-col items-center gap-8">
                    {/* Decorative Top */}
                    <div className="flex flex-col items-center gap-4">
                        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#9F8236] font-medium">
                            Volume 09 / Inquiries
                        </span>
                    </div>

                    {/* Main Title */}
                    <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tight">
                        Acquire the <br />
                        <span className="italic text-[#9F8236] relative inline-block">
                            Exceptional
                            {/* Hand-drawn underline effect could go here */}
                            <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-3 md:h-6 text-[#b5a16d]" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    ref={underlineRef}
                                    d="M2.00025 6.99997C25.7499 7.0003 40.5441 3.51813 65.518 2.50285C95.2754 1.29304 125.109 4.39768 154.675 3.50456C169.519 3.05607 190.536 2.00003 198.001 2.00003"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </h2>

                    <p className="max-w-md text-white/60 text-sm md:text-base font-light tracking-wide leading-relaxed mt-4">
                        Discover a curated collection of nature's rarest treasures, sourced from the most exclusive mines on Earth.
                    </p>
                </div>

                {/* Primary Button */}
                <Link
                    ref={buttonRef}
                    href={href}
                    className="group relative inline-flex items-center gap-6 px-12 py-5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-[#b5a16d] hover:border-[#b5a16d] transition-all duration-500 overflow-hidden"
                >
                    <span className="relative z-10 font-sans text-xs tracking-[0.3em] uppercase text-white font-semibold group-hover:text-white transition-colors duration-500">
                        {buttonText}
                    </span>
                    <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500">
                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
                    </div>

                    {/* Glass/Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </Link>

            </div>

            {/* Decorative Frame */}
            <div className="absolute top-8 left-8 w-32 h-32 border-l border-t border-white/10" />
            <div className="absolute bottom-8 right-8 w-32 h-32 border-r border-b border-white/10" />
        </section>
    );
};

export default CTA;
