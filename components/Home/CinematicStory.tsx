"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const CinematicStory = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scenes = [
        {
            id: 'legacy',
            image: 'https://images.unsplash.com/photo-1549887552-93f8efb0815e?auto=format&fit=crop&q=80&w=2500',
            title: "A Legacy in Stone",
            subtitle: "1990 — Present",
            text: "It began with a single journey into the heart of the earth. \nFor thirty years, we have sought the silent language of nature, translation rarity into heritage.",
            align: 'center'
        },
        {
            id: 'craft',
            image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=2500',
            title: "The Art of Patience",
            subtitle: "Unrushed Perfection",
            text: "True luxury cannot be expedited. We wait for the stone to reveal itself. \nEvery cut is a conversation, every setting a sanctuary.",
            align: 'right'
        },
        {
            id: 'collection',
            image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=2500',
            title: "Curated for the Few",
            subtitle: "The Private Reserve",
            text: "Beyond the market lies the masterpiece. \nOur private collection is reserved for those who understand that possession is merely stewardship.",
            align: 'left'
        },
        {
            id: 'trust',
            image: 'https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?auto=format&fit=crop&q=80&w=2500',
            title: "Bound by Honor",
            subtitle: "The Promise",
            text: "In a world of transience, our word is as durable as the gems we hold. \nVerified origin. Ethical sourcing. Uncompromising truth.",
            align: 'center'
        }
    ];

    useGSAP(() => {
        const panels = gsap.utils.toArray('.story-panel');

        // Pin the container for the duration of the story
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=" + (panels.length * 100) + "%", // Scroll distance based on panel count
                scrub: 1, // Smooth scrubbing
                pin: true,
                anticipatePin: 1
            }
        });

        // Loop through panels to create the cross-fade sequence
        panels.forEach((panel: any, i) => {
            if (i === 0) return; // First panel is already visible

            // Animate previous panel OUT
            // Animate current panel IN

            // Overlap slightly for smooth transition
            tl.fromTo(panel,
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, duration: 1, ease: "power1.inOut" },
                "-=0.5" // Overlap
            );

            // Text Animations for current panel
            const textContent = panel.querySelector('.panel-content');
            if (textContent) {
                tl.from(textContent, { y: 50, opacity: 0, duration: 0.8 }, "<");
            }
        });

        // Ensure the last panel stays for a bit before unpinning
        tl.to({}, { duration: 1 });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-[#0A0A0B] text-[#F9F8F4] overflow-hidden">

            {/* PROGRESS INDICATOR */}
            <div className="absolute top-0 left-0 w-1 h-full bg-white/5 z-50">
                <div className="w-full bg-[#b5a16d] origin-top progress-bar" style={{ height: '0%' }} /> {/* Controlled by scroll if needed, simpler to let user feel depth */}
            </div>

            {scenes.map((scene, i) => (
                <div
                    key={scene.id}
                    className={`story-panel absolute inset-0 w-full h-full flex items-center justify-center p-8 md:p-24 ${i === 0 ? 'z-10' : 'z-' + (10 + i)}`}
                    style={{ opacity: i === 0 ? 1 : 0 }} // Start hidden except first
                >
                    {/* BACKGROUND IMAGE - Cinematic Cover */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={scene.image}
                            alt={scene.title}
                            fill
                            className="object-cover opacity-60"
                            priority={i === 0}
                        />
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                    </div>

                    {/* CONTENT - Narrative Layouts */}
                    <div
                        className={`panel-content relative z-10 max-w-4xl flex flex-col gap-6
                            ${scene.align === 'center' ? 'text-center items-center' : ''}
                            ${scene.align === 'left' ? 'text-left items-start mr-auto' : ''}
                            ${scene.align === 'right' ? 'text-right items-end ml-auto' : ''}
                        `}
                    >
                        {/* Subtitle / Chapter Marker */}
                        <div className="flex items-center gap-4 text-[#b5a16d] opacity-80">
                            <span className="text-[10px] tracking-[0.3em] uppercase">Chapter 0{i + 1}</span>
                            <span className="w-12 h-px bg-[#b5a16d]/50" />
                            <span className="font-serif italic text-lg">{scene.subtitle}</span>
                        </div>

                        {/* Title - Huge Cinematic Type */}
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.9] tracking-tight text-white mix-blend-overlay">
                            {scene.title}
                        </h2>

                        {/* Body Text - Editorial */}
                        <p className="text-lg md:text-2xl font-light opacity-80 max-w-2xl leading-relaxed whitespace-pre-line">
                            {scene.text}
                        </p>
                    </div>

                    {/* HINT - Down Arrow (only on first slide) */}
                    {i === 0 && (
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
                            <ArrowDown size={24} />
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};

export default CinematicStory;
