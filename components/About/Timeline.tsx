"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Timeline: React.FC = () => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);
    const periodsRef = useRef<(HTMLDivElement | null)[]>([]);

    const historyData = [
        { year: "1982", title: "The Genesis", desc: "Founded in Geneva by Alexander V. with a singular vision: to curate the unfindable." },
        { year: "1995", title: "Eastern Expansion", desc: "Establishing the Colombo atelier, securing direct access to the sapphire mines." },
        { year: "2010", title: "The Royal Commission", desc: "Selected to source the centerpiece for the Crown's private anniversary collection." },
        { year: "2024", title: "Digital Renaissance", desc: "Launching the global private archive. The vault opens to the world." }
    ];

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1
            }
        });

        // Line grows
        tl.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: historyData.length });

        // Period points
        periodsRef.current.forEach((el, index) => {
            gsap.fromTo(el,
                { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 relative overflow-hidden bg-[#FBFBF9] dark:bg-[#050505] text-[#1A1A1A] dark:text-[#FBFBF9]">

            {/* Center Line */}
            <div ref={lineRef} className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-current opacity-20 origin-top" />

            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col gap-24 md:gap-48 relative">
                    {historyData.map((item, i) => (
                        <div
                            key={i}
                            ref={el => periodsRef.current[i] = el}
                            className={`flex flex-col md:flex-row items-center gap-8 md:gap-24 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Visual Abstract Shape */}
                            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                                <div className={`relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center group ${i % 2 !== 0 ? 'md:justify-start' : ''}`}>
                                    {/* Rotating Outer Ring */}
                                    <div className="absolute inset-0 border border-current/10 rounded-full animate-[spin_20s_linear_infinite]" />

                                    {/* Counter-Rotating Inner Square */}
                                    <div className="absolute inset-8 border border-current/20 rotate-45 group-hover:rotate-0 transition-transform duration-[1.5s] ease-expo" />

                                    {/* Center Marker */}
                                    <div className="w-2 h-2 bg-[#D4AF37] rotate-45 group-hover:scale-150 transition-transform duration-500" />

                                    <span className="absolute -top-8 text-[10px] tracking-[0.4em] opacity-40">{item.year}</span>
                                </div>
                            </div>

                            {/* Text Visual */}
                            <div className={`w-full md:w-1/2 ${i % 2 !== 0 ? 'text-right' : 'text-left'}`}>
                                <h3 className="text-3xl md:text-5xl font-serif italic mb-4">{item.title}</h3>
                                <p className="text-sm md:text-base opacity-70 font-sans font-light leading-relaxed max-w-sm">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
