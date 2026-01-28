"use client";

import React from "react";
import Image from "next/image";

const TeamSection: React.FC = () => {
    return (
        <section className="py-32 md:py-48 px-6 md:px-24 bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9]">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-24">
                    <span className="text-[10px] tracking-[0.4em] uppercase opacity-40 block mb-4">The Leadership</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-light">Custodians of the House</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    {/* Basir */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-1000">
                            <Image
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
                                alt="Basir"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-2xl font-serif italic mb-2">Basir M.</h3>
                        <p className="text-[10px] tracking-[0.2em] uppercase opacity-50 mb-6">Co-Founder & Head of Sourcing</p>
                        <div className="font-serif text-4xl text-[#b5a16d] opacity-80 signing-font">Basir.</div>
                    </div>

                    {/* Naser */}
                    <div className="flex flex-col items-center text-center group translate-y-0 md:translate-y-24">
                        <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-1000">
                            <Image
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800"
                                alt="Naser"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-2xl font-serif italic mb-2">Naser M.</h3>
                        <p className="text-[10px] tracking-[0.2em] uppercase opacity-50 mb-6">Co-Founder & Head of Design</p>
                        <div className="font-serif text-4xl text-[#b5a16d] opacity-80 signing-font">Naser.</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
