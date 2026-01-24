"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const AboutHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLImageElement>(null);
    const textSectionsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=200%", // Long scroll
                scrub: 1,
                pin: true,
            }
        });

        // 1. Unblur background as we scroll
        tl.to(bgRef.current, { filter: "blur(0px)", scale: 1.1, duration: 4, ease: "none" }, 0);

        // 2. Draw the Gold Line
        tl.fromTo(lineRef.current,
            { height: "0%" },
            { height: "100%", duration: 4, ease: "none" },
            0
        );

        // 3. Reveal Text Sections elements as line passes
        textSectionsRef.current.forEach((section, i) => {
            if (section) {
                gsap.fromTo(section,
                    { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: `top+=${i * 30}% top`, // staggered start based on scroll pos
                            end: "+=20%",
                            scrub: 1,
                        }
                    }
                );
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#0A0A0A] text-[#FBFBF9]">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    ref={bgRef}
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=2000"
                    alt="Workshop"
                    fill
                    className="object-cover opacity-30 grayscale blur-[20px]"
                    priority
                />
            </div>

            {/* Central Gold Line */}
            <div ref={lineRef} className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#D4AF37] z-20 shadow-[0_0_15px_#D4AF37]" />

            <div className="relative z-10 w-full max-w-6xl px-8 h-full flex flex-col justify-between py-32 pointer-events-none">

                {/* Section 1: Top Left */}
                <div ref={el => textSectionsRef.current[0] = el} className="w-1/2 pr-12 text-right self-start border-r border-[#D4AF37]/0">
                    <span className="text-[10px] tracking-[0.4em] uppercase opacity-60">1982</span>
                    <h2 className="text-4xl text-[#FBFBF9] font-serif italic">Origins</h2>
                </div>

                {/* Section 2: Middle Right */}
                <div ref={el => textSectionsRef.current[1] = el} className="w-1/2 pl-12 text-left self-end">
                    <span className="text-[10px] tracking-[0.4em] uppercase opacity-60">2005</span>
                    <h2 className="text-4xl text-[#FBFBF9] font-serif italic">Discovery</h2>
                </div>

                {/* Section 3: Bottom Left */}
                <div ref={el => textSectionsRef.current[2] = el} className="w-1/2 pr-12 text-right self-start">
                    <span className="text-[10px] tracking-[0.4em] uppercase opacity-60">2024</span>
                    <h2 className="text-4xl text-[#FBFBF9] font-serif italic">Legacy</h2>
                </div>

            </div>
        </section>
    );
};

export default AboutHero;
