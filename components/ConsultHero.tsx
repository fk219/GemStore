"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ConsultHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lightBeamV = useRef<HTMLDivElement>(null);
    const lightBeamH = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.to(lightBeamV.current, { scaleY: 1, opacity: 1, duration: 2, ease: "power2.out" })
            .to(lightBeamH.current, { scaleX: 1, opacity: 1, duration: 2, ease: "power2.out" }, "-=1.5")
            .fromTo(textRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
                "-=1.5");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-[#FBFBF9] dark:bg-[#0A0A0B] transition-colors duration-1000">
            <div className="absolute inset-0 pointer-events-none">
                {/* Abstract Light Beams */}
                <div ref={lightBeamV} className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-zinc-200 dark:via-zinc-800 to-transparent scale-y-0 opacity-0" />
                <div ref={lightBeamH} className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent scale-x-0 opacity-0" />

                {/* Floating Ethereal Spheres - Simple CSS animation fine here for background */}
                <div className="absolute top-1/3 right-1/4 w-64 h-64 border border-zinc-100 dark:border-zinc-900 rounded-full blur-2xl opacity-40 animate-pulse" />
            </div>

            <div ref={textRef} className="relative z-10 text-center px-6 max-w-5xl opacity-0">
                <div className="overflow-hidden mb-6">
                    <p className="text-[9px] tracking-[1em] uppercase opacity-30">
                        Secure & Discrete
                    </p>
                </div>

                <h1 className="text-6xl md:text-[8rem] font-light serif leading-[0.9] tracking-tight mb-12">
                    <div className="overflow-hidden">
                        <span className="inline-block">
                            A Private
                        </span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="inline-block italic">
                            Conversation
                        </span>
                    </div>
                </h1>

                <div className="flex justify-center">
                    <div className="w-24 h-px bg-zinc-200 dark:bg-zinc-800 w-32 opacity-100" />
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                <div className="w-[1px] h-12 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-current animate-[scrollLine_3s_infinite]" />
                </div>
            </div>

            <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
        </section>
    );
};

export default ConsultHero;
