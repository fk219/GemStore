"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type StoneCategory = "All" | "Diamond" | "Ruby" | "Emerald" | "Sapphire";

const CollectionGallery: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<StoneCategory>("All");
    const [selectedStone, setSelectedStone] = useState<any | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const categories: StoneCategory[] = ["All", "Diamond", "Ruby", "Emerald", "Sapphire"];

    const stones = [
        {
            id: 1,
            name: "The Star of Adam",
            weight: "12.04 ct",
            category: "Sapphire",
            image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800",
            desc: "A rare blue sapphire mined from the depths of Ratnapura, exhibiting a perfect six-rayed star.",
            clarity: "Flawless",
            cut: "Oval Cabochon"
        },
        {
            id: 2,
            name: "Crimson Tear",
            weight: "5.50 ct",
            category: "Ruby",
            image: "https://images.unsplash.com/photo-1615111784767-4d7c02783103?auto=format&fit=crop&q=80&w=800",
            desc: "Pigeon blood ruby from Myanmar. Unheated, untreated, and purely natural.",
            clarity: "VVS1",
            cut: "Cushion"
        },
        {
            id: 3,
            name: "Emerald Heart",
            weight: "8.10 ct",
            category: "Emerald",
            image: "https://images.unsplash.com/photo-1599643485000-q123?auto=format&fit=crop&q=80&w=800",
            desc: "A deeply saturated Colombian emerald with vibrant jardin and exceptional transparency.",
            clarity: "VS2",
            cut: "Heart"
        },
        {
            id: 4,
            name: "Arctic Fire",
            weight: "3.22 ct",
            category: "Diamond",
            image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800",
            desc: "Type IIa diamond of exceptional purity. D Color, Flawless clarity.",
            clarity: "FL",
            cut: "Emerald"
        },
        {
            id: 5,
            name: "Royal Velvet",
            weight: "15.80 ct",
            category: "Sapphire",
            image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800",
            desc: "Kashmir sapphire with the legendary velvet blue hue.",
            clarity: "VVS2",
            cut: "Cushion"
        },
        // Add more items to create masonry effect
    ];

    const filteredStones = activeCategory === "All"
        ? stones
        : stones.filter(stone => stone.category === activeCategory);

    useGSAP(() => {
        gsap.fromTo(".gallery-item",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        );
    }, { scope: containerRef, dependencies: [activeCategory] });

    return (
        <section ref={containerRef} className="py-24 px-6 md:px-12 bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9] min-h-screen">

            {/* Filter System */}
            <div className="flex justify-center mb-24">
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-b border-black/10 dark:border-white/10 pb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-xs md:text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:text-[#b5a16d] ${activeCategory === cat ? "text-[#b5a16d]" : "text-current opacity-50"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {filteredStones.map((stone) => (
                    <div
                        key={stone.id}
                        className="gallery-item break-inside-avoid relative group cursor-pointer"
                        onClick={() => setSelectedStone(stone)}
                    >
                        <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-4">
                            <Image
                                src={stone.image}
                                alt={stone.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                            {/* View Details Arrow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 backdrop-blur-sm">
                                <ArrowUpRight className="text-white w-6 h-6" />
                            </div>
                        </div>

                        <div className="flex justify-between items-end border-b border-current/10 pb-4">
                            <div>
                                <h3 className="font-serif text-xl md:text-2xl italic">{stone.name}</h3>
                                <p className="text-[10px] tracking-[0.2em] uppercase opacity-50 mt-2">{stone.category}</p>
                            </div>
                            <span className="font-serif text-lg opacity-70">{stone.weight}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stone Detail Modal (Split Screen) */}
            {selectedStone && (
                <div className="fixed inset-0 z-[70] flex bg-[#F9F8F4] dark:bg-[#0A0A0B]">
                    {/* Left: Image (Sticky) */}
                    <div className="w-1/2 h-full relative hidden md:block">
                        <Image
                            src={selectedStone.image}
                            alt={selectedStone.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Right: Story */}
                    <div className="w-full md:w-1/2 h-full overflow-y-auto p-12 md:p-24 flex flex-col justify-center relative">
                        <button
                            onClick={() => setSelectedStone(null)}
                            className="absolute top-8 right-8 p-4 rounded-full border border-current/10 hover:border-[#b5a16d] transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <span className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-4">{selectedStone.category} — {selectedStone.weight}</span>
                        <h2 className="text-5xl md:text-7xl font-serif font-light mb-12">{selectedStone.name}</h2>

                        <p className="text-lg font-light leading-relaxed opacity-70 mb-12 max-w-md">
                            {selectedStone.desc}
                        </p>

                        <div className="grid grid-cols-2 gap-12 mb-16 border-t border-current/10 pt-12">
                            <div>
                                <span className="block text-[10px] tracking-[0.2em] uppercase opacity-40 mb-2">Clarity</span>
                                <span className="font-serif text-2xl">{selectedStone.clarity}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] tracking-[0.2em] uppercase opacity-40 mb-2">Cut</span>
                                <span className="font-serif text-2xl">{selectedStone.cut}</span>
                            </div>
                        </div>

                        <button className="self-start px-12 py-4 border border-current hover:bg-[#b5a16d] hover:border-[#b5a16d] hover:text-white transition-all duration-500 uppercase tracking-[0.2em] text-xs">
                            Inquire About This Stone
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CollectionGallery;
