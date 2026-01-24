"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ContactHero = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const lineRef = useRef(null);
    const bgRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        gsap.set(bgRef.current, { scale: 1.1, opacity: 0 });
        gsap.set(titleRef.current, { y: 100, opacity: 0 });
        gsap.set(subtitleRef.current, { opacity: 0, letterSpacing: "1.2em" });
        gsap.set(lineRef.current, { scaleX: 0 });

        tl.to(bgRef.current, { scale: 1, opacity: 1, duration: 2.5, ease: "expo.out" })
            .to(lineRef.current, { scaleX: 1, duration: 1.5, ease: "expo.inOut" }, "-=2")
            .to(titleRef.current, { y: 0, opacity: 1, duration: 2, ease: "power4.out" }, "-=1.8")
            .to(subtitleRef.current, { opacity: 0.6, letterSpacing: "0.8em", duration: 2 }, "-=1.5");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[80vh] w-full overflow-hidden bg-[#0F0F0F] text-[#FBFBF9] flex items-center justify-center">

            {/* Background Texture - Subtle Noise/Gradient */}
            <div ref={bgRef} className="absolute inset-0 bg-[#0F0F0F]">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 brightness-150 pointer-events-none" />
                {/* Abstract beam of light */}
                <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent blur-[1px]" />
            </div>

            <div className="relative z-10 text-center px-6">

                <h1 ref={titleRef} className="text-8xl md:text-[12vw] font-light serif italic opacity-0 mix-blend-difference z-20">
                    Concierge
                </h1>

                <div ref={lineRef} className="w-24 h-px bg-white/30 mx-auto my-12" />

                <span ref={subtitleRef} className="block text-xs md:text-sm tracking-[0.8em] uppercase opacity-0 font-sans font-light text-[#c5b38d]">
                    By Appointment
                </span>
            </div>
        </section>
    );
};

export default ContactHero;
