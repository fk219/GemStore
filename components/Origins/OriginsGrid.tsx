"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link
import { MapPin } from 'lucide-react';
import { origins } from '@/lib/data'; // Import centralized data

const OriginsGrid: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [hoveredOrigin, setHoveredOrigin] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Helper to extract gems string to array
    const getGemsList = (statValue: string) => {
        return statValue.split(',').map(s => s.trim());
    };

    return (
        <section className="relative py-20 px-8 md:px-16 lg:px-32">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {origins.map((origin, index) => {
                        const materialStat = origin.stats.find(s => s.label === "Focus" || s.label === "Material");
                        const gems = materialStat ? getGemsList(materialStat.value) : [];

                        return (
                            <Link
                                key={origin.slug}
                                href={`/origins/${origin.slug}`}
                                className="group relative block" // Made block and relative
                                onMouseEnter={() => setHoveredOrigin(origin.slug)}
                                onMouseLeave={() => setHoveredOrigin(null)}
                            >
                                <div
                                    className={`relative h-full p-12 md:p-16 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm transition-all duration-1000 hover:border-[#b5a16d]/20 hover:shadow-2xl ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    style={{
                                        transitionDelay: `${index * 0.1}s`,
                                        boxShadow: hoveredOrigin === origin.slug ? '0 0 80px rgba(181, 161, 109, 0.1)' : 'none'
                                    }}
                                >
                                    {/* Subtitle/Region Tag */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-2 h-2 rounded-full bg-[#b5a16d]/40" />
                                        <span className="text-[9px] tracking-[0.4em] uppercase opacity-40 font-light">
                                            {origin.subtitle}
                                        </span>
                                    </div>

                                    {/* Origin Name */}
                                    <h2 className="font-serif text-5xl md:text-6xl font-light mb-6 transition-all duration-700 group-hover:text-[#b5a16d]">
                                        {origin.title}
                                    </h2>

                                    {/* Description (Intro Text Truncated) */}
                                    <p className="text-sm leading-relaxed opacity-60 mb-8 font-light italic line-clamp-3">
                                        {origin.intro.text}
                                    </p>

                                    {/* Gemstones Found */}
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-4">
                                            Notable Gemstones
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {gems.map((gem) => (
                                                <span
                                                    key={gem}
                                                    className="px-4 py-2 text-[10px] tracking-[0.3em] uppercase border border-white/10 rounded-full bg-white/[0.02] transition-all duration-700 hover:border-[#b5a16d]/40 hover:bg-[#b5a16d]/5"
                                                >
                                                    {gem}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Coordinates */}
                                    <div className="mt-8 pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-2 opacity-30">
                                            <MapPin className="w-3 h-3" strokeWidth={1.5} />
                                            <span className="text-[9px] tracking-[0.2em] font-mono">
                                                {origin.coordinates}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Hover Accent */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#b5a16d]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OriginsGrid;
