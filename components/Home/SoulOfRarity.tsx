"use client";

import React from 'react';
import Image from 'next/image';

const SoulOfRarity: React.FC = () => {
    return (
        <section className="relative min-h-screen py-32 md:py-48 px-6 md:px-24 flex flex-col justify-center overflow-hidden bg-[#FBFBF9] dark:bg-[#050505] text-[#1A1A1A] dark:text-[#FBFBF9]">
            {/* Decorative Background Elements - Parallax */}
            <div data-speed="0.2" className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-zinc-200/50 to-transparent rounded-full blur-[100px] opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-overlay" />
            <div data-speed="0.4" className="absolute bottom-0 left-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32">
                    {/* Image Composition */}
                    <div className="w-full md:w-1/2 relative reveal-image">
                        <div data-speed="1.1" className="relative aspect-[4/5] md:aspect-[3/4] rounded-lg overflow-hidden group">
                            <Image
                                src="https://images.unsplash.com/photo-1620218151276-8575084934e6?auto=format&fit=crop&q=80&w=1200"
                                alt="Raw Emerald Formation"
                                fill
                                className="object-cover grayscale transition-transform duration-[3s] group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#0A0A0A]/10 mix-blend-multiply" />
                        </div>
                        {/* Floating Detail Overlay - Foreground Parallax */}
                        <div data-speed="1.3" className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-[#141414] text-[#FBFBF9] p-8 hidden md:flex flex-col justify-between z-20 shadow-2xl rounded-lg">
                            <span className="text-[10px] tracking-[0.4em] uppercase opacity-50">Origin</span>
                            <p className="font-serif italic text-2xl">Muzo, Colombia</p>
                            <div className="w-full h-px bg-white/20" />
                            <p className="text-xs font-sans tracking-widest opacity-80">LAT 5.55° N</p>
                        </div>
                    </div>

                    {/* Editorial Text */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <div className="flex items-center gap-6 mb-12 opacity-40">
                            <span className="text-[10px] tracking-[0.4em] uppercase font-sans font-light">Part I — The Raw</span>
                            <div className="w-20 h-px bg-current" />
                        </div>

                        <h2 className="text-5xl md:text-8xl font-light serif mb-12 leading-[0.9] reveal-text">
                            Silence <br />
                            <span className="italic ml-12 opacity-50">in the</span> <br />
                            Stone.
                        </h2>

                        <p className="text-lg md:text-xl font-light opacity-70 leading-relaxed max-w-md ml-auto reveal-text serif border-l border-current pl-8">
                            True rarity is not found; it is recognized. It speaks in a language of inclusions, fractures, and light—a dialogue between the earth's violent history and the quiet eye of the connoisseur.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SoulOfRarity;
