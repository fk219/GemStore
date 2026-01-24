"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const ProductsHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftCurtainRef = useRef<HTMLDivElement>(null);
    const rightCurtainRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=150%", // Pin for longer to allow curtain to open
                pin: true,
                scrub: 1,
            }
        });

        // 1. Title fades out slightly
        tl.to(titleRef.current, { opacity: 0, scale: 0.8, duration: 1 });

        // 2. Curtains Open
        tl.to(leftCurtainRef.current, { xPercent: -100, duration: 3, ease: "power2.inOut" }, "-=0.5")
            .to(rightCurtainRef.current, { xPercent: 100, duration: 3, ease: "power2.inOut" }, "<");

        // 3. Content Flies in from Z-Axis
        tl.fromTo(contentRef.current,
            { scale: 0.5, opacity: 0, z: -500 },
            { scale: 1, opacity: 1, z: 0, duration: 2.5, ease: "expo.out" },
            "-=2.5"
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#0A0A0A] text-[#FBFBF9] perspective-[1000px]">

            {/* The Content Revealed Behind Curtains */}
            <div ref={contentRef} className="absolute inset-0 flex items-center justify-center pt-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl px-8 opacity-0">
                    {/* Pseudo Gem Cards for Effect */}
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="aspect-[3/4] bg-white/5 border border-white/10 rounded-sm relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <div className="h-2 w-16 bg-white/20 mb-2 shimmer"></div>
                                <div className="h-4 w-32 bg-white/40 shimmer"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Curtains */}
            <div className="absolute inset-0 flex pointer-events-none z-20">
                <div ref={leftCurtainRef} className="w-1/2 h-full bg-[#050505] flex items-center justify-end border-r border-white/10 relative">
                    <div className="absolute right-0 top-0 h-full w-[100px] bg-gradient-to-r from-transparent to-black/50" />
                </div>
                <div ref={rightCurtainRef} className="w-1/2 h-full bg-[#050505] flex items-center justify-start border-l border-white/10 relative">
                    <div className="absolute left-0 top-0 h-full w-[100px] bg-gradient-to-l from-transparent to-black/50" />
                </div>
            </div>

            {/* Initial Title Layer on top of curtains */}
            <div ref={titleRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center mix-blend-difference pointer-events-none">
                <span className="text-[10px] tracking-[0.8em] uppercase text-white/50 mb-8">Restricted Access</span>
                <h1 className="text-6xl md:text-9xl font-light serif text-white">The Vault</h1>
                <div className="mt-12 animate-bounce opacity-30">↓</div>
            </div>

            <style jsx>{`
                .shimmer {
                    position: relative;
                    overflow: hidden;
                }
                .shimmer::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    transform: translateX(-100%);
                    background-image: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0,
                        rgba(255, 255, 255, 0.2) 20%,
                        rgba(255, 255, 255, 0.5) 60%,
                        rgba(255, 255, 255, 0)
                    );
                    animation: shimmer 2s infinite;
                }
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </section>
    );
};

export default ProductsHero;
