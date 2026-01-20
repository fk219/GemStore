"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const AboutHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".reveal-text", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: "power3.out"
        })
            .from(".reveal-line", {
                scaleX: 0,
                duration: 1.5,
                ease: "expo.out"
            }, "-=1");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-[#FBFBF9] dark:bg-[#0A0A0B] transition-colors duration-1000">
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
            </div>

            <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 dark:opacity-5">
                <Image
                    src="https://images.unsplash.com/photo-1560130958-5d27d73922f3?auto=format&fit=crop&q=80&w=1000"
                    alt="Architecture"
                    fill
                    className="object-cover grayscale"
                />
            </div>

            <div className="relative z-10 w-full max-w-6xl px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                <div className="text-left">
                    <span className="reveal-text block text-[9px] tracking-[0.5em] uppercase opacity-40 mb-6 font-sans font-light">
                        Est. 2024
                    </span>
                    <h1 className="reveal-text text-5xl md:text-8xl font-light serif mb-6 leading-[0.9]">
                        The <span className="italic">House</span>
                    </h1>
                    <div className="reveal-line w-24 h-[1px] bg-current opacity-20 mb-8 origin-left"></div>
                    <p className="reveal-text text-lg md:text-xl font-light opacity-60 leading-relaxed max-w-md serif italic">
                        We are curators of the unseen. <br />
                        Purveyors of light captured in stone.
                    </p>
                </div>

                <div className="hidden md:block text-right">
                    <p className="reveal-text text-[10px] tracking-[0.3em] uppercase opacity-40 leading-loose max-w-xs ml-auto font-sans font-light">
                        Based in Geneva<br />
                        Operating Globally<br />
                        By Appointment Only
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
