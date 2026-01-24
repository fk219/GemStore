"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ContactHero = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        gsap.set(titleRef.current, { y: 100, opacity: 0 });
        gsap.set(subRef.current, { opacity: 0 });

        tl.to(titleRef.current, { y: 0, opacity: 1, duration: 2.5 })
            .to(subRef.current, { opacity: 0.5, duration: 2 }, "-=2");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[70vh] w-full overflow-hidden bg-[#0A0A0A] text-[#FBFBF9] flex items-center justify-center">

            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-purple-900/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 text-center px-6 mix-blend-normal">
                <span ref={subRef} className="block text-[10px] tracking-[0.8em] uppercase opacity-0 mb-4 text-[#D4AF37]">
                    Concierge Services
                </span>
                <h1 ref={titleRef} className="text-[12vw] leading-[0.8] font-serif font-light tracking-tight italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                    ATELIER
                </h1>

                {/* Floating Letters or Shapes */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <span className="absolute top-[20%] left-[10%] text-[8rem] serif italic opacity-5 text-white animate-[float_10s_ease-in-out_infinite]">A</span>
                    <span className="absolute bottom-[20%] right-[10%] text-[6rem] serif italic opacity-5 text-white animate-[float_12s_ease-in-out_infinite_reverse]">V</span>
                </div>
            </div>
        </section>
    );
};

export default ContactHero;
