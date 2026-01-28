"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FeaturedHighlights: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const highlights = [
        {
            title: "Diamonds",
            subtitle: "Eternal Brilliance",
            image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800",
            color: "bg-blue-50 dark:bg-blue-900/10",
            link: "/gemstones/diamond"
        },
        {
            title: "Colored Stones",
            subtitle: "Vibrance of Earth",
            image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800",
            color: "bg-red-50 dark:bg-red-900/10",
            link: "/gemstones/ruby"
        },
        {
            title: "Rare Finds",
            subtitle: "The Unseen",
            image: "https://images.unsplash.com/photo-1551122087-f99a0442bcf8?auto=format&fit=crop&q=80&w=800",
            color: "bg-emerald-50 dark:bg-emerald-900/10",
            link: "/gemstones/emerald"
        }
    ];

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 bg-secondary dark:bg-[#111]">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[150vh] md:h-[80vh]">
                    {highlights.map((item, index) => (
                        <Link
                            href={item.link}
                            key={index}
                            className={`relative h-full rounded-2xl overflow-hidden group transition-all duration-700 ${hoveredIndex === index ? 'md:flex-[1.5]' : 'md:flex-1'}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Background Image */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />

                            {/* Color Reveal on Hover */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 ${item.color} transition-opacity duration-700 mix-blend-overlay`} />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                    <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase block mb-2">{item.subtitle}</span>
                                    <h3 className="text-3xl md:text-5xl font-serif text-white font-light mb-6">{item.title}</h3>

                                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                        <span className="text-xs text-white tracking-[0.2em] uppercase">Explore</span>
                                        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                                            <ArrowRight className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedHighlights;
