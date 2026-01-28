"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const NarrativeSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom center",
                scrub: 1,
            }
        });

        tl.fromTo(textRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 2, ease: "power2.out" }
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 md:py-48 px-6 md:px-24 bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9] flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto">
                <span className="block text-[10px] tracking-[0.4em] uppercase opacity-40 mb-12 font-sans">The Philosophy</span>
                <p
                    ref={textRef}
                    className="text-2xl md:text-4xl lg:text-5xl font-serif font-light leading-relaxed opacity-0"
                >
                    &quot;At Maihan Group, we don't just sell stones. We curate legacies. From the mines of the East to your personal collection, every gem tells a story of <span className="italic text-[#b5a16d]">eternity</span>.&quot;
                </p>
                <div className="mt-16 w-px h-24 bg-current opacity-20 mx-auto" />
            </div>
        </section>
    );
};

export default NarrativeSection;
