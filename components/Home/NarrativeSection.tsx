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
                trigger: "#narrative-transition-wrapper",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // 1. Expand Content
        tl.to(".narrative-content", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power2.inOut",
            duration: 1
        });

        // 2. Text Reveal (Scrubbed sync or slightly delayed)
        tl.fromTo(".volume-label",
            { opacity: 0, y: 30, letterSpacing: "1em", filter: "blur(10px)" },
            { opacity: 1, y: 0, letterSpacing: "0.4em", filter: "blur(0px)", duration: 0.5 },
            "-=0.5"
        );

        tl.fromTo(".word-reveal",
            { opacity: 0, y: 40, filter: "blur(15px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.05, duration: 1 },
            "-=0.3"
        );

        tl.fromTo(".divider-line",
            { scaleY: 0, opacity: 0 },
            { scaleY: 1, opacity: 0.2, duration: 0.5 },
            "-=0.2"
        );

    }, { scope: containerRef });

    const phrase = "At Maihan Group, we don't just sell stones. We curate legacies. From the mines of the East to your personal collection, every gem tells a story of ";

    return (
        <section ref={containerRef} className="h-full w-full pointer-events-none">
            <div
                className="narrative-content absolute inset-0 flex flex-col items-center justify-center bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9] px-6 md:px-24 text-center pointer-events-auto"
                style={{ clipPath: "polygon(48% 48%, 52% 48%, 52% 52%, 48% 52%)" }} // Starts as a tiny central window
            >
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
            </div>
        </section>
    );
};

export default NarrativeSection;
