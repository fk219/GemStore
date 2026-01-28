"use client";

import React from 'react';

const ArtOfRefraction: React.FC = () => {
    return (
        <section className="min-h-screen py-32 rounded-[40px] md:rounded-[100px] mx-2 md:mx-8 my-12 overflow-hidden relative bg-secondary text-[#1A1A1A] dark:bg-[#141414] dark:text-[#FBFBF9] shadow-2xl transition-colors duration-1000">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,50 C20,40 40,60 60,50 S80,40 100,50" fill="none" className="stroke-current" strokeWidth="0.05" />
                    <path d="M0,60 C30,70 50,40 70,60 S90,50 100,60" fill="none" className="stroke-current" strokeWidth="0.05" opacity="0.5" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10 py-12 md:py-24">
                <div className="flex flex-col items-center text-center">
                    <span className="text-[10px] tracking-[0.8em] uppercase mb-12 opacity-30 reveal-text font-sans font-light border px-4 py-2 rounded-full border-current">The Journey of Light</span>

                    <div className="relative mb-24 reveal-image">
                        {/* Abstract Glow - Adaptive */}
                        <div className="absolute -inset-20 bg-current blur-[100px] rounded-full animate-pulse opacity-5" />
                        <h2 className="text-6xl md:text-[11rem] font-light serif leading-[0.85] reveal-text">
                            Refined
                        </h2>
                        <h2 className="text-6xl md:text-[11rem] font-light serif leading-[0.85] italic reveal-text opacity-50">
                            Patience
                        </h2>
                    </div>

                    <p className="text-2xl md:text-4xl font-light opacity-80 max-w-4xl leading-relaxed serif italic reveal-text">
                        &quot;Every stone passes through a journey of patience, mastery, and quiet perfection.&quot;
                    </p>

                    <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 w-full max-w-6xl text-left border-t border-current/10 pt-16">
                        {[
                            {
                                label: "01 / Sourcing",
                                head: "The Unseen",
                                text: "We bypass the commercial market, working directly with families who have held mines for generations."
                            },
                            {
                                label: "02 / Cutting",
                                head: "The Release",
                                text: "A gem is not cut to maximize weight, but to release its trapped light. We sacrifice carats for brilliance."
                            },
                            {
                                label: "03 / Setting",
                                head: "The Vessel",
                                text: "Architecture that holds light. Minimal metal, maximum exposure. The stone must appear to float."
                            }
                        ].map((item, i) => (
                            <div key={i} className="reveal-text group">
                                <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6 font-sans font-light group-hover:text-amber-500 transition-colors">{item.label}</h3>
                                <p className="text-3xl serif mb-4 italic">{item.head}</p>
                                <p className="text-sm opacity-60 leading-relaxed font-sans max-w-xs">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArtOfRefraction;
