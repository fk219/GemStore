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
                start: "top 80%",
                end: "bottom center",
                toggleActions: "play none none reverse"
            }
        });

        // Label Reveal - Cinematic spacing expansion
        tl.fromTo(".volume-label",
            { opacity: 0, y: 20, letterSpacing: "0.8em", filter: "blur(5px)" },
            { opacity: 1, y: 0, letterSpacing: "0.4em", filter: "blur(0px)", duration: 2, ease: "power3.out" }
        );

        // Text Reveal - Luxury Word Stagger with Blur
        tl.fromTo(".word-reveal",
            { opacity: 0, y: 30, filter: "blur(12px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.04, duration: 1.2, ease: "power2.out" },
            "-=1.5"
        );

        // Divider - Elegant growth
        tl.fromTo(".divider-line",
            { scaleY: 0, opacity: 0 },
            { scaleY: 1, opacity: 0.2, duration: 1.5, ease: "power3.inOut" },
            "-=0.5"
        );

    }, { scope: containerRef });

    const phrase = "At Maihan Group, we don't just sell stones. We curate legacies. From the mines of the East to your personal collection, every gem tells a story of ";

    return (
        <section ref={containerRef} className="py-32 md:py-48 px-6 md:px-24 bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9] flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto relative">
                <span className="volume-label block text-[10px] tracking-[0.4em] uppercase text-[#9F8236] mb-12 font-sans font-medium opacity-0">
                    Volume 02 / The Philosophy
                </span>

                <p className="text-2xl md:text-4xl lg:text-5xl font-serif font-light leading-relaxed">
                    {phrase.split(" ").map((word, i) => (
                        <span key={i} className="word-reveal inline-block mr-[0.25em] opacity-0">
                            {word}
                        </span>
                    ))}
                    <span className="word-reveal inline-block opacity-0 italic text-[#b5a16d]">eternity.</span>
                </p>

                <div className="divider-line mt-16 w-px h-24 bg-current opacity-20 mx-auto origin-top" />
            </div>
        </section>
    );
};

export default NarrativeSection;
