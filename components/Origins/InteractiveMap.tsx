"use client";

import React, { useState } from "react";
import { X, MapPin } from "lucide-react";

const InteractiveMap: React.FC = () => {
    const [activeRegion, setActiveRegion] = useState<any | null>(null);

    const regions = [
        { id: "colombia", name: "muzo, colombia", x: "30%", y: "55%", stone: "Emerald", desc: "The legendary Muzo mines produce emeralds of incomparable fire and intense green saturation." },
        { id: "srilanka", name: "ratnapura, sri lanka", x: "65%", y: "60%", stone: "Sapphire", desc: "For centuries, the 'City of Gems' has yielded the world's most desired Royal Blue sapphires." },
        { id: "mozambique", name: "montepuez, mozambique", x: "55%", y: "70%", stone: "Ruby", desc: "A relatively new source delivering rubies of exceptional clarity and pigeon blood hue." },
    ];

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9] relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative h-[60vh] md:h-[80vh] border border-current/10 rounded-3xl bg-secondary dark:bg-[#111] overflow-hidden">

                <span className="absolute top-8 left-8 text-[10px] tracking-[0.4em] uppercase opacity-40 z-10">Global Sources</span>

                {/* Conceptual Map Background */}
                <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d">
                        {/* Abstract Continents - Simplified */}
                        <path d="M20,30 Q40,10 50,30 T80,30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M25,50 Q45,70 55,60 T75,80" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                </div>
                {/* Fallback Image Map for realism feel */}
                <div className="absolute inset-0 opacity-20 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
                        alt="World Map"
                        className="w-full h-full object-cover grayscale invert dark:invert-0"
                    />
                </div>

                {/* Map Points */}
                {regions.map((region) => (
                    <button
                        key={region.id}
                        style={{ left: region.x, top: region.y }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
                        onClick={() => setActiveRegion(region)}
                    >
                        <div className="relative">
                            <div className="w-4 h-4 rounded-full bg-[#b5a16d] animate-ping absolute inset-0 opacity-50" />
                            <div className="w-4 h-4 rounded-full bg-[#b5a16d] border-2 border-white dark:border-black relative z-10 transition-transform duration-300 group-hover:scale-150" />
                        </div>
                        <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-black dark:bg-white text-white dark:text-black px-2 py-1">
                            {region.name}
                        </span>
                    </button>
                ))}

                {/* Region Detail Overlay */}
                {activeRegion && (
                    <div className="absolute inset-0 z-30 bg-black/20 backdrop-blur-sm flex items-center justify-center p-8">
                        <div className="bg-[#F9F8F4] dark:bg-[#1A1A1A] p-12 max-w-lg w-full relative shadow-2xl border-l-4 border-[#b5a16d]">
                            <button
                                onClick={() => setActiveRegion(null)}
                                className="absolute top-6 right-6 opacity-50 hover:opacity-100 transition-opacity"
                            >
                                <X size={20} />
                            </button>

                            <span className="text-[10px] tracking-[0.4em] uppercase text-[#b5a16d] block mb-4">{activeRegion.stone}</span>
                            <h3 className="font-serif text-3xl md:text-4xl mb-6 capitalize">{activeRegion.name}</h3>
                            <p className="font-light leading-relaxed opacity-70 mb-8">
                                {activeRegion.desc}
                            </p>
                            <button className="text-xs tracking-[0.2em] uppercase border-b border-current pb-1 hover:text-[#b5a16d] hover:border-[#b5a16d] transition-all">
                                View Collection
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default InteractiveMap;
