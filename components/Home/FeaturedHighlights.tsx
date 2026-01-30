"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const FeaturedHighlights: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const highlights = [
        {
            title: "Diamonds",
            subtitle: "Eternal Brilliance",
            description: "Hand-selected for perfect clarity and cut.",
            image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800",
            link: "/gemstones/diamond"
        },
        {
            title: "Sapphires",
            subtitle: "Midnight Blue",
            description: "Velvety Kashmir and Royal Blue hues.",
            image: "https://images.unsplash.com/photo-1615486511484-92e57bb6eb64?auto=format&fit=crop&q=80&w=800",
            link: "/gemstones/sapphire"
        },
        {
            title: "Rubies",
            subtitle: "Pigeon's Blood",
            description: "Passion and vitality from Burma and Mozambique.",
            image: "https://images.unsplash.com/photo-1551122087-f99a0442bcf8?auto=format&fit=crop&q=80&w=800",
            link: "/gemstones/ruby"
        },
        {
            title: "Emeralds",
            subtitle: "Verdant Green",
            description: "The lush gardens of Colombia and Zambia.",
            image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800", // Reusing for variety
            link: "/gemstones/emerald"
        },
        {
            title: "Rare Finds",
            subtitle: "The Unseen",
            description: "Paraiba, Alexandrite, and Padparadscha.",
            image: "https://images.unsplash.com/photo-1549887552-93f8efb0815e?auto=format&fit=crop&q=80&w=800",
            link: "/gemstones/rare"
        },
        {
            title: "High Jewelry",
            subtitle: "Masterpieces",
            description: "One-of-a-kind creations for the discerning.",
            image: "https://images.unsplash.com/photo-1609159981885-f5f242049d56?auto=format&fit=crop&q=80&w=800",
            link: "/gemstones/maison"
        },
        {
            title: "Heritage",
            subtitle: "Timeless",
            description: "Celebrating decades of excellence.",
            image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800",
            link: "/about"
        },
        {
            title: "Bridal",
            subtitle: "Forever",
            description: "Symbols of eternal commitment.",
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
            link: "/gemstones/diamond"
        }
    ];

    useGSAP(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        // Calculate total scrolling width
        const totalWidth = slider.scrollWidth;
        const viewportWidth = window.innerWidth;
        const items = gsap.utils.toArray('.highlight-card');

        // Horizontal Scroll Setup (Unpinned, natural scroll)
        // Horizontal Scroll Setup (Unpinned, slow premium drift)
        gsap.to(slider, {
            id: "horizontal-scroll",
            x: () => -((totalWidth - viewportWidth) * 0.45), // Moves slower, drifting through the collection
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 2.5,          // Heavy, luxurious momentum
                invalidateOnRefresh: true,
            }
        });

        // Parallax effect for images inside cards
        items.forEach((item: any) => {
            const img = item.querySelector('img');
            gsap.fromTo(img,
                { scale: 1.2 },
                {
                    scale: 1,
                    scrollTrigger: {
                        trigger: item,
                        containerAnimation: gsap.getById('horizontal-scroll'),
                        horizontal: true,
                        start: "left right",
                        end: "right left",
                        scrub: true
                    }
                }
            );
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative h-screen bg-[#FDFBF7] dark:bg-[#050505] overflow-hidden flex flex-col justify-center">

            {/* Header / Context - Fixed on specific mobile, or moving? Let's keep it clean. */}
            <div className="absolute top-12 left-6 md:left-12 z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-[#9F8236] opacity-50" />
                    <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#9F8236]">Volume 03 / Collections</span>
                </div>
            </div>

            {/* Slider Container */}
            <div ref={sliderRef} className="flex gap-4 md:gap-8 px-6 md:px-12 items-center w-max h-[70vh] md:h-[80vh] pt-12">
                {highlights.map((item, index) => (
                    <Link
                        key={index}
                        href={item.link}
                        className={`highlight-card relative block w-[80vw] md:w-[28vw] h-full flex-shrink-0 group overflow-hidden rounded-[2rem]`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Image Layer */}
                        <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                            />
                            {/* Gradient Overlay - Cinematic */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                        </div>

                        {/* Content Layer */}
                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
                            {/* Top Icon */}
                            <div className="self-end opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            {/* Bottom Text */}
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                                <div className="overflow-hidden mb-2">
                                    <span className="inline-block text-[#b5a16d] text-[10px] tracking-[0.3em] uppercase transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                        {item.subtitle}
                                    </span>
                                </div>

                                <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-light tracking-wide mb-4">
                                    {item.title}
                                </h3>

                                <p className="text-white/70 text-sm md:text-base font-light max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 line-clamp-2 md:line-clamp-none">
                                    {item.description}
                                </p>

                                {/* Button/Line */}
                                <div className="mt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                                    <span className="text-xs text-white uppercase tracking-widest">Discover</span>
                                    <div className="h-px w-12 bg-white/50 group-hover:w-20 transition-all duration-500" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {/* CTA Card at the end?? Optional. Let's stick to the list. */}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 right-12 z-10 flex items-center gap-4 opacity-50 dark:opacity-30 mix-blend-difference pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-white">Scroll</span>
                <div className="w-16 h-px bg-white" />
            </div>

        </section>
    );
};

export default FeaturedHighlights;
