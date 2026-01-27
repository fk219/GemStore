'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Diamond } from 'lucide-react';

const gemstones = [
    { name: 'Ruby', color: '#E0115F', description: 'The king of precious stones, symbolizing passion and vitality' },
    { name: 'Sapphire', color: '#0F52BA', description: 'Celestial blue gemstone of wisdom and royalty' },
    { name: 'Emerald', color: '#50C878', description: 'Verdant treasure representing renewal and prosperity' },
    { name: 'Diamond', color: '#B9F2FF', description: 'Eternal brilliance, the ultimate symbol of luxury' },
    { name: 'Amethyst', color: '#9966CC', description: 'Purple majesty, stone of clarity and calm' },
    { name: 'Aquamarine', color: '#7FFFD4', description: 'Ocean-inspired serenity in crystalline form' },
    { name: 'Mandarin Garnet', color: '#FF8C00', description: 'Rare sunset hues of exceptional fire' },
    { name: 'Morganite', color: '#FFB6C1', description: 'Blush-toned elegance and gentle sophistication' },
    { name: 'Padparadscha', color: '#FF6E4A', description: 'Lotus blossom sapphire of unparalleled rarity' },
    { name: 'Paraiba Tourmaline', color: '#00CED1', description: 'Electric neon brilliance from Brazilian depths' },
    { name: 'Peridot', color: '#E5E4A6', description: 'Olive-green luminescence born of volcanic fire' },
    { name: 'Rubellite', color: '#D10056', description: 'Pink to red tourmaline of exceptional depth' },
    { name: 'Spinel', color: '#FF073A', description: 'Underrated gem of royal heritage' },
    { name: 'Tanzanite', color: '#5D3FD3', description: 'Violet-blue rarity found only in Tanzania' },
    { name: 'Tourmaline', color: '#00A86B', description: 'Rainbow spectrum in a single stone' }
];

export default function GemstonesPage() {
    const [mounted, setMounted] = useState(false);
    const [hoveredGem, setHoveredGem] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <main className="min-h-screen bg-[#0A0A0B] text-[#FBFBF9]">
            <Navbar themeOverride="dark" />

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#0A0A0B] to-[#0A0A0B] opacity-90" />

                <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
                    <div className={`transition-all duration-[2.5s] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <Diamond className="w-12 h-12 mx-auto mb-8 text-[#b5a16d]/60" strokeWidth={0.5} />
                        <h1 className="font-serif text-[12vw] md:text-[8vw] lg:text-[6vw] font-light leading-[0.9] tracking-tight mb-6">
                            <span className="block">Gemstones</span>
                        </h1>
                        <p className="text-[11px] md:text-[13px] tracking-[0.6em] uppercase opacity-40 font-light">
                            Nature's Masterpieces
                        </p>
                    </div>
                </div>
            </section>

            {/* Gemstones Grid */}
            <section className="relative py-20 px-8 md:px-16 lg:px-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gemstones.map((gem, index) => (
                            <Link
                                key={gem.name}
                                href={`/gemstones/${gem.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className="group relative"
                                onMouseEnter={() => setHoveredGem(gem.name)}
                                onMouseLeave={() => setHoveredGem(null)}
                            >
                                <div
                                    className={`relative p-12 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm transition-all duration-1000 hover:border-white/10 hover:shadow-2xl ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    style={{
                                        transitionDelay: `${index * 0.08}s`,
                                        boxShadow: hoveredGem === gem.name ? `0 0 60px ${gem.color}15` : 'none'
                                    }}
                                >
                                    {/* Gem Icon */}
                                    <div className="flex items-center justify-center mb-8">
                                        <div
                                            className="w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-45"
                                            style={{
                                                borderColor: `${gem.color}40`,
                                                backgroundColor: `${gem.color}08`
                                            }}
                                        >
                                            <Diamond
                                                className="w-6 h-6 transition-all duration-700"
                                                style={{ color: gem.color }}
                                                strokeWidth={1}
                                            />
                                        </div>
                                    </div>

                                    {/* Gem Name */}
                                    <h3
                                        className="font-serif text-3xl md:text-4xl font-light text-center mb-4 transition-all duration-700 group-hover:tracking-wider"
                                        style={{
                                            color: hoveredGem === gem.name ? gem.color : '#FBFBF9'
                                        }}
                                    >
                                        {gem.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[11px] tracking-[0.3em] uppercase text-center opacity-40 leading-relaxed font-light transition-opacity duration-700 group-hover:opacity-60">
                                        {gem.description}
                                    </p>

                                    {/* Hover Accent Line */}
                                    <div
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 transition-all duration-700"
                                        style={{ backgroundColor: gem.color }}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
