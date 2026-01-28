"use client";

import React from 'react';
import Image from 'next/image';

const AtelierSection: React.FC = () => {
    return (
        <section className="atelier-section py-32 relative overflow-hidden bg-white dark:bg-[#101010] text-[#1A1A1A] dark:text-[#FBFBF9]">
            <div className="absolute inset-0 opacity-20">
                <Image
                    src="https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=2000"
                    fill
                    className="parallax-bg object-cover grayscale"
                    alt="Background Texture"
                />
            </div>

            <div className="container mx-auto px-6 md:px-24 relative z-10 flex flex-col items-center text-center">
                <div className="w-px h-24 bg-white/20 mb-12" />
                <h2 className="text-[clamp(2rem,4vw,3.25rem)] md:text-[clamp(2.75rem,6vw,4.5rem)] serif font-light mb-12 reveal">The Atelier</h2>
                <p className="text-[1rem] md:text-[1.5rem] font-light italic opacity-70 max-w-4xl leading-relaxed reveal font-serif">
                    Where science meets sculpture. Our cutters do not follow trends; they follow the stone's internal logic.
                </p>
                <div className="mt-24 w-full grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10">
                    {[
                        { year: "1982", text: "Foundation of the Maison in Geneva." },
                        { year: "2005", text: "Acquisition of the legendary 'Sun's Eye' Diamond." },
                        { year: "2024", text: "Launch of the Private Archive." }
                    ].map((item, i) => (
                        <div key={i} className="p-12 bg-white dark:bg-[#101010] hover:bg-[#F9F8F4] dark:hover:bg-[#151515] transition-colors duration-500 ease-[var(--easing-standard)] group reveal">
                            <span className="block text-[clamp(2rem,4vw,3.25rem)] serif italic mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500 ease-[var(--easing-standard)]">{item.year}</span>
                            <p className="text-[1rem] tracking-widest uppercase opacity-60">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AtelierSection;
