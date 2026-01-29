"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const chapters = [
    {
        id: "origin",
        title: "The Origin",
        text: "Deep within the earth, where pressure meets time, nature begins its most silent work. A billion years of darkness, waiting for a single moment of light.",
        image: "https://images.unsplash.com/photo-1618151313441-bc79b11e5090?auto=format&fit=crop&q=80&w=2000", // Dark/Raw Abstract
        theme: "dark"
    },
    {
        id: "journey",
        title: "The Journey",
        text: "Across oceans and through the hands of masters, the stone sheds its skin. It is not just cut; it is revealed. Precision breathes life into the dormant fire.",
        image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=2000", // Light/Workbench vibe
        theme: "light"
    },
    {
        id: "legacy",
        title: "The Legacy",
        text: "More than an object, it becomes a witness. To eras, to promises, to you. A timeless artifact that outlives the moment, carrying your story into eternity.",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000", // Gold/Jewelry vibe
        theme: "gold"
    }
];

const ScrollyStory: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeChapter, setActiveChapter] = useState(0);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%", // 3 screens worth of scroll
                pin: true,
                scrub: 1, // Smooth interaction
                snap: {
                    snapTo: 1 / (chapters.length - 1),
                    duration: { min: 0.5, max: 1 },
                    ease: "power2.inOut"
                },
                onUpdate: (self) => {
                    const idx = Math.round(self.progress * (chapters.length - 1));
                    setActiveChapter(idx);
                }
            }
        });

        chapters.forEach((chapter, i) => {
            if (i === 0) return; // Skip first chapter setup

            // Animate to next chapter
            tl.to(`.story-bg-${i}`, { opacity: 1, duration: 1 }, i - 1) // Fade in BG
                .to(`.story-bg-${i - 1}`, { opacity: 0, duration: 1 }, i - 1) // Fade out prev BG
                .fromTo(`.story-content-${i}`,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    i - 1 // Start at overlap
                )
                .to(`.story-content-${i - 1}`,
                    { y: -50, opacity: 0, duration: 1 },
                    i - 1
                );
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">

            {/* BACKGROUNDS LAYER */}
            <div className="absolute inset-0 w-full h-full">
                {chapters.map((chapter, i) => (
                    <div
                        key={chapter.id}
                        className={`story-bg-${i} absolute inset-0 w-full h-full transition-opacity duration-1000 ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={chapter.image}
                            alt={chapter.title}
                            fill
                            className="object-cover"
                            priority={i === 0}
                        />
                        {/* Overlay based on theme */}
                        <div className={`absolute inset-0 ${chapter.theme === 'dark' ? 'bg-black/60' :
                                chapter.theme === 'light' ? 'bg-white/20' :
                                    'bg-[#D4AF37]/20 mix-blend-multiply' // Gold
                            }`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                    </div>
                ))}
            </div>

            {/* CONTENT LAYER */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6 text-center">
                {chapters.map((chapter, i) => (
                    <div
                        key={chapter.id}
                        className={`story-content-${i} absolute max-w-4xl mx-auto flex flex-col items-center gap-8 ${i !== 0 ? 'opacity-0 translate-y-[50px]' : ''}`}
                    >
                        <span className="block text-xs md:text-sm tracking-[0.4em] uppercase text-[#b5a16d] font-sans">
                            Chapter 0{i + 1}
                        </span>

                        <h2 className={`font-serif text-5xl md:text-7xl lg:text-8xl leading-none text-transparent bg-clip-text ${chapter.theme === 'light' ? 'bg-gradient-to-b from-[#1A1A1A] to-[#4a4a4a] text-shadow-sm' :
                                'bg-gradient-to-b from-[#F9F8F4] to-[#F9F8F4]/60'
                            }`}>
                            {chapter.title}
                        </h2>

                        <p className={`text-lg md:text-2xl font-light leading-relaxed max-w-2xl ${chapter.theme === 'light' ? 'text-black/80 font-medium' : 'text-white/80'
                            }`}>
                            {chapter.text}
                        </p>

                        <div className="w-px h-16 bg-[#b5a16d]/50 mt-8" />
                    </div>
                ))}
            </div>

            {/* PROGRESS INDICATOR */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
                {chapters.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${activeChapter === i ? 'w-12 bg-[#b5a16d]' : 'w-2 bg-white/20'
                            }`}
                    />
                ))}
            </div>

            {/* SCROLL HINT */}
            <div className={`absolute bottom-8 right-8 flex flex-col items-center gap-2 transition-opacity duration-500 ${activeChapter === 2 ? 'opacity-0' : 'opacity-60'}`}>
                <span className="text-[9px] uppercase tracking-widest text-white">Scroll</span>
                <div className="w-px h-8 bg-white/50 animate-pulse" />
            </div>

        </section>
    );
};

export default ScrollyStory;
