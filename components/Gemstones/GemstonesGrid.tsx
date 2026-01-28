"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gemstones } from '@/lib/data';

const GemstonesGrid: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        setMounted(true);
    }, []);

    const filters = ['All', 'Precious', 'Rare', 'Sapphire', 'Ruby', 'Emerald'];

    const filteredGems = filter === 'All'
        ? gemstones
        : gemstones.filter(g => g.details.color?.includes(filter) || g.title.includes(filter) || (filter === 'Precious' && ['Ruby', 'Sapphire', 'Emerald'].includes(g.title)));

    return (
        <section className="py-20 px-4 md:px-8 bg-[#F9F8F4] dark:bg-[#0A0A0B]">

            {/* Filter Bar */}
            <div className={`flex flex-wrap justify-center gap-6 mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`text-xs uppercase tracking-[0.2em] transition-all duration-500 ${filter === f
                                ? 'text-[#b5a16d] scale-110'
                                : 'opacity-40 hover:opacity-100 hover:text-[#b5a16d]'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Masonry-style Grid */}
            <div className="max-w-[1800px] mx-auto columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {filteredGems.map((gem, index) => (
                    <Link
                        href={`/gemstones/${gem.slug}`}
                        key={gem.slug}
                        className={`group block break-inside-avoid relative overflow-hidden rounded-sm transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                        style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                        <div className="relative aspect-[3/4] w-full overflow-hidden">
                            <Image
                                src={gem.images[0]}
                                alt={gem.title}
                                fill
                                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                            {/* Overlay Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white opacity-0 md:opacity-100 md:group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                                <span className="text-[9px] tracking-[0.3em] uppercase opacity-70 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-[#b5a16d]">
                                    {gem.details.origin.split(',')[0]}
                                </span>
                                <h3 className="font-serif text-3xl mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {gem.title}
                                </h3>
                                <p className="text-xs font-light tracking-wide opacity-80 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                    {gem.subtitle}
                                </p>
                            </div>
                        </div>

                        {/* Mobile Visible Title (Outside Image) */}
                        <div className="md:hidden mt-4 text-center">
                            <h3 className="font-serif text-2xl text-[#1A1A1A] dark:text-[#FBFBF9]">{gem.title}</h3>
                            <p className="text-xs uppercase tracking-widest text-[#b5a16d]">{gem.subtitle}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default GemstonesGrid;
