"use client";

import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const origins = [
    {
        name: 'Brazil',
        region: 'South America',
        gems: ['Emerald', 'Paraiba Tourmaline', 'Aquamarine', 'Amethyst'],
        description: 'Legendary source of vibrant emeralds and rare Paraiba tourmalines',
        coordinates: { lat: -14.2350, lng: -51.9253 }
    },
    {
        name: 'Burma',
        region: 'Southeast Asia',
        gems: ['Ruby', 'Sapphire', 'Spinel', 'Peridot'],
        description: 'The historic home of the world\'s finest "pigeon\'s blood" rubies',
        coordinates: { lat: 21.9162, lng: 95.9560 }
    },
    {
        name: 'Colombia',
        region: 'South America',
        gems: ['Emerald', 'Aquamarine'],
        description: 'Unrivaled emeralds with exceptional clarity and vivid green hues',
        coordinates: { lat: 4.5709, lng: -74.2973 }
    },
    {
        name: 'Kashmir',
        region: 'South Asia',
        gems: ['Sapphire', 'Ruby'],
        description: 'Legendary velvety blue sapphires of unmatched quality',
        coordinates: { lat: 34.0837, lng: 74.7973 }
    },
    {
        name: 'Madagascar',
        region: 'East Africa',
        gems: ['Sapphire', 'Ruby', 'Tourmaline', 'Aquamarine'],
        description: 'Rich deposits of diverse gemstones in every color spectrum',
        coordinates: { lat: -18.7669, lng: 46.8691 }
    },
    {
        name: 'Sri Lanka',
        region: 'South Asia',
        gems: ['Sapphire', 'Padparadscha', 'Ruby', 'Spinel'],
        description: 'The island of gems, renowned for padparadscha sapphires',
        coordinates: { lat: 7.8731, lng: 80.7718 }
    }
];

const OriginsGrid: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [hoveredOrigin, setHoveredOrigin] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative py-20 px-8 md:px-16 lg:px-32">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {origins.map((origin, index) => (
                        <div
                            key={origin.name}
                            className="group relative"
                            onMouseEnter={() => setHoveredOrigin(origin.name)}
                            onMouseLeave={() => setHoveredOrigin(null)}
                        >
                            <div
                                className={`relative p-12 md:p-16 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm transition-all duration-1000 hover:border-[#b5a16d]/20 hover:shadow-2xl ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{
                                    transitionDelay: `${index * 0.1}s`,
                                    boxShadow: hoveredOrigin === origin.name ? '0 0 80px rgba(181, 161, 109, 0.1)' : 'none'
                                }}
                            >
                                {/* Region Tag */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-[#b5a16d]/40" />
                                    <span className="text-[9px] tracking-[0.4em] uppercase opacity-40 font-light">
                                        {origin.region}
                                    </span>
                                </div>

                                {/* Origin Name */}
                                <h2 className="font-serif text-5xl md:text-6xl font-light mb-6 transition-all duration-700 group-hover:text-[#b5a16d]">
                                    {origin.name}
                                </h2>

                                {/* Description */}
                                <p className="text-sm leading-relaxed opacity-60 mb-8 font-light italic">
                                    {origin.description}
                                </p>

                                {/* Gemstones Found */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-4">
                                        Notable Gemstones
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {origin.gems.map((gem) => (
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
                                            {origin.coordinates.lat.toFixed(4)}°, {origin.coordinates.lng.toFixed(4)}°
                                        </span>
                                    </div>
                                </div>

                                {/* Hover Accent */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#b5a16d]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OriginsGrid;
