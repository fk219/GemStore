"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const CollectionSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const textColorClass = "text-[#1A1A1A] dark:text-[#FBFBF9]";

    const collectionItems = [
        {
            id: 1,
            name: "The Midnight Sapphire",
            origin: "Kashmir",
            weight: "4.2 ct",
            color: "bg-[#3B4D7A]",
            textColor: "text-white",
            badgeBorder: "border-white/20",
            subText: "text-white/60"
        },
        {
            id: 2,
            name: "The Solar Diamond",
            origin: "Botswana",
            weight: "2.1 ct",
            color: "bg-[#FFF2AC]",
            textColor: "text-[#1A1A1A]",
            badgeBorder: "border-black/10",
            subText: "text-black/40"
        },
        {
            id: 3,
            name: "The Royal Ruby",
            origin: "Burma",
            weight: "3.5 ct",
            color: "bg-[#8D444A]",
            textColor: "text-white",
            badgeBorder: "border-white/20",
            subText: "text-white/60"
        },
        {
            id: 4,
            name: "The Forest Emerald",
            origin: "Colombia",
            weight: "5.1 ct",
            color: "bg-[#3D6353]",
            textColor: "text-white",
            badgeBorder: "border-white/20",
            subText: "text-white/60"
        }
    ];

    useGSAP(() => {
        if (!sectionRef.current || !triggerRef.current) return;

        const totalWidth = sectionRef.current.scrollWidth;
        const windowWidth = window.innerWidth;

        // Only scroll horizontally if content exceeds viewport
        if (totalWidth > windowWidth) {
            gsap.to(sectionRef.current, {
                x: () => -(totalWidth - windowWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: () => `+=${totalWidth}`,
                    scrub: 1.5, // Increased from 1 for smoother, more weighted feel
                    pin: true,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                }
            });
        }
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="overflow-hidden">
            {/* Trigger / Pin Wrapper */}
            <div ref={triggerRef} className="relative h-screen"> {/* Height matches pinned height */}
                <div
                    ref={sectionRef}
                    className="flex h-full items-center px-6 md:px-24 gap-24 flex-nowrap"
                    style={{ width: 'max-content' }}
                >
                    {/* Section Introduction Card */}
                    <div className={`w-[85vw] md:w-[600px] flex-shrink-0 ${textColorClass}`}>
                        <span className="text-[10px] tracking-[0.5em] uppercase text-[#b5a16d] block mb-8 font-sans font-medium">Volume 05 / Selected Pieces</span>
                        <h2 className="text-5xl md:text-8xl font-light serif mb-12">The Private <span className="italic">Collection</span></h2>
                        <p className="text-lg md:text-xl font-light opacity-60 leading-relaxed italic max-w-md font-sans">
                            A rotating selection of our most exceptional acquisitions. Available exclusively for private viewing.
                        </p>
                        <div className="mt-20 w-32 h-[1px] bg-current opacity-20" />
                    </div>

                    {/* Collection Items - Luxury Hover Effects */}
                    {collectionItems.map((item) => (
                        <div
                            key={item.id}
                            className={`flex-shrink-0 w-[80vw] md:w-[500px] aspect-square rounded-xl ${item.color} ${item.textColor} p-8 md:p-14 flex flex-col justify-between shadow-xl transition-all duration-1000 hover:scale-[1.01] hover:shadow-2xl group`}
                        >
                            <div className="flex justify-between items-start">
                                <span className={`text-[10px] tracking-[0.4em] uppercase border ${item.badgeBorder} rounded-full px-5 py-2 backdrop-blur-sm transition-all duration-700 group-hover:px-6 font-sans font-light`}>
                                    {item.origin}
                                </span>
                                <span className="text-sm tracking-widest font-light opacity-80 italic transition-opacity duration-700 group-hover:opacity-100 font-sans">{item.weight}</span>
                            </div>

                            <div className="relative group/card overflow-hidden">
                                <div className="h-px w-full bg-current opacity-0 group-hover:opacity-10 mb-8 transition-opacity duration-1000" />
                                <h3 className="text-3xl md:text-5xl serif mb-4 leading-tight transition-opacity duration-700 font-light">
                                    {item.name.split(' ').slice(0, -1).join(' ')} <span className="italic">{item.name.split(' ').pop()}</span>
                                </h3>
                                <p className={`text-[10px] tracking-[0.6em] uppercase transition-all duration-1000 opacity-80 group-hover:opacity-100 ${item.subText} font-sans font-light`}>Inquire for price</p>
                            </div>
                        </div>
                    ))}

                    {/* Closing Card / Call to Action Transition */}
                    <div className={`w-[60vw] md:w-[500px] flex-shrink-0 flex flex-col items-center justify-center text-center px-12 ${textColorClass}`}>
                        <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8 font-sans font-light">End of Current Archive</p>
                        <h3 className="text-3xl md:text-4xl serif italic mb-12 opacity-80 leading-relaxed">Each piece is a single iteration of nature’s patience.</h3>
                        <div className="w-16 h-[1px] bg-current opacity-20" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CollectionSection;
