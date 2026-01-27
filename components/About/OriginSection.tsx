"use client";

import React from 'react';
import Image from 'next/image';

const OriginSection: React.FC = () => {
    return (
        <section className="chapter-1 py-24 px-6 md:px-24">
            <div className="grid md:grid-cols-2 gap-12 md:gap-32 items-center text-[#FBFBF9]">
                {/* Image */}
                <div data-speed="0.8" className="relative aspect-[3/4] md:aspect-[4/5] reveal overflow-hidden rounded-md group cursor-pointer">
                    <Image
                        src="https://images.unsplash.com/photo-1620218151276-8575084934e6?auto=format&fit=crop&q=80&w=1200"
                        fill
                        alt="Mine Shaft Light"
                        className="object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 group-hover:grayscale-[0.5]"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />

                    {/* Hidden Details Reveal */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="w-[90%] h-[90%] border border-white/20 flex flex-col justify-between p-6">
                            <span className="text-[9px] uppercase tracking-[0.3em] self-start">Grid Ref: 44.2A</span>
                            <span className="text-[9px] uppercase tracking-[0.3em] self-end">Depth: 800m</span>
                        </div>
                    </div>

                    <div className="absolute bottom-8 right-8 text-right mix-blend-difference transform transition-transform duration-700 group-hover:-translate-y-4">
                        <p className="text-[9px] uppercase tracking-[0.4em] mb-2">Elevation</p>
                        <p className="serif text-3xl font-light">2,400m</p>
                    </div>
                </div>

                {/* Text content */}
                <div className="parallax-text flex flex-col justify-center text-[#1A1A1A] dark:text-[#FBFBF9]">
                    <span className="text-[0.625rem] leading-[1.6] letter-spacing-[0.32em] uppercase opacity-40 mb-8">01. The Source</span>
                    <h2 className="text-[clamp(2rem,4vw,3.25rem)] md:text-[clamp(2.75rem,6vw,4.5rem)] serif font-light mb-8 leading-[1.05]">Chaos & <br /><span className="italic">Time</span></h2>
                    <p className="text-[1rem] opacity-70 leading-relaxed font-light mb-8 font-serif">
                        Deep beneath the crust, where pressure turns carbon into eternity. Our geologists map veins that have remained untouched for millennia. We trace the lineage of every crystal, ensuring that its journey from the earth to your hand is as pure as the light it holds.
                    </p>
                    <ul className="space-y-4 border-t border-current/10 pt-8 opacity-60 font-sans text-sm tracking-wide">
                        <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-current"></span>Ethical Extraction Protocols</li>
                        <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-current"></span>Direct-to-Miner Relationships</li>
                        <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-current"></span>Environmental Restoration</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default OriginSection;
