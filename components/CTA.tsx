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

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        )
            .fromTo(buttonRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.6"
            );

        // Background parallax effect
        gsap.to(".bg-parallax", {
            yPercent: 30,
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
            className="relative py-32 md:py-48 px-6 overflow-hidden bg-[#1A1A1A] text-[#F9F8F4] flex flex-col items-center justify-center text-center"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="bg-parallax absolute top-[-50%] left-[20%] w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[120px] mix-blend-soft-light" />
                <div className="bg-parallax absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-[#997B28] rounded-full blur-[100px] mix-blend-soft-light" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-10">

                <div ref={textRef} className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4 opacity-60">
                        <div className="w-12 h-px bg-[#D4AF37]" />
                        <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#D4AF37]">
                            {subtitle}
                        </span>
                        <div className="w-12 h-px bg-[#D4AF37]" />
                    </div>

                    <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl italic leading-none">
                        {title}
                        <Diamond className="inline-block w-8 h-8 md:w-12 md:h-12 ml-4 text-[#D4AF37] opacity-80" strokeWidth={1} />
                    </h2>
                </div>

                <Link
                    ref={buttonRef}
                    href={href}
                    className="group relative inline-flex items-center gap-4 px-10 py-4 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 hover:bg-[#D4AF37] transition-all duration-500 overflow-hidden"
                >
                    <span className="relative z-10 font-sans text-xs tracking-[0.25em] uppercase text-[#D4AF37] group-hover:text-[#1A1A1A] transition-colors duration-500 font-medium">
                        {buttonText}
                    </span>
                    <ArrowRight className="relative z-10 w-4 h-4 text-[#D4AF37] group-hover:text-[#1A1A1A] transition-colors duration-500 group-hover:translate-x-1" />

                    {/* Hover Fill Effect */}
                    <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                </Link>

            </div>

            {/* Border Lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </section>
    );
};

export default CTA;
