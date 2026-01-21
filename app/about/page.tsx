"use client";

import React, { useContext, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeContext } from '@/app/providers';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
    const themeCtx = useContext(ThemeContext);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(el => {
                gsap.fromTo(el,
                    { y: 50, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 1, ease: "power2.out",
                        scrollTrigger: { trigger: el, start: "top 80%" }
                    }
                );
            });
        });
        return () => ctx.revert();
    }, []);

    const textColorClass = "text-[#1A1A1A] dark:text-[#FBFBF9]";
    const bgClass = "bg-[#FBFBF9] dark:bg-[#050505]";

    return (
        <main className={`min-h-screen ${bgClass} ${textColorClass} selection:bg-[#b5a16d] selection:text-white`}>
            <Navbar />

            {/* Hero - Editorial Header */}
            <section className="pt-48 pb-24 px-6 md:px-24 container mx-auto relative">
                <div className="flex flex-col items-start max-w-5xl">
                    <span className="text-[10px] tracking-[0.6em] uppercase opacity-40 mb-8 border-l border-current pl-4">Est. 1982 — Geneva / Colombo</span>
                    <h1 className="text-6xl md:text-9xl font-light serif leading-[0.9] reveal mb-12">
                        The <span className="italic opacity-50">Eye</span> <br />
                        of the Curator.
                    </h1>
                    <p className="text-xl md:text-2xl font-light opacity-60 leading-relaxed max-w-2xl reveal font-serif italic pl-12 border-l border-zinc-200 dark:border-zinc-800">
                        &quot;We do not hunt for stones. We wait for them. To acquire a gem of true significance is to inherit a responsibility.&quot;
                    </p>
                </div>
            </section>

            {/* Chapter 1: The Origin - Split Layout */}
            <section className="py-24 px-6 md:px-24">
                <div className="grid md:grid-cols-2 gap-12 md:gap-32 items-center text-[#FBFBF9]">
                    {/* Image */}
                    {/* Image - Interactive Hover */}
                    <div className="relative aspect-[3/4] md:aspect-[4/5] reveal overflow-hidden rounded-sm group cursor-pointer">
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

                    {/* Text content - Reversing text color since this might need its own background if we want contrast, but keeping minimal for now */}
                    <div className={`flex flex-col justify-center ${textColorClass}`}>
                        <span className="text-xs uppercase tracking-[0.3em] opacity-40 mb-8">01. The Source</span>
                        <h2 className="text-4xl md:text-6xl serif font-light mb-8">Chaos & <br /><span className="italic">Time</span></h2>
                        <p className="text-lg opacity-70 leading-relaxed font-light mb-8 font-serif">
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

            {/* Chapter 2: The Atelier - Full Width */}
            <section className="py-32 relative overflow-hidden bg-[#101010] text-[#FBFBF9]">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=2000"
                        fill
                        className="object-cover grayscale"
                        alt="Background Texture"
                    />
                </div>

                <div className="container mx-auto px-6 md:px-24 relative z-10 flex flex-col items-center text-center">
                    <div className="w-px h-24 bg-white/20 mb-12" />
                    <h2 className="text-5xl md:text-8xl serif font-light mb-12 reveal">The Atelier</h2>
                    <p className="text-xl md:text-3xl font-light italic opacity-70 max-w-4xl leading-relaxed reveal font-serif">
                        Where science meets sculpture. Our cutters do not follow trends; they follow the stone's internal logic.
                    </p>
                    <div className="mt-24 w-full grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                        {[
                            { year: "1982", text: "Foundation of the Maison in Geneva." },
                            { year: "2005", text: "Acquisition of the legendary 'Sun's Eye' Diamond." },
                            { year: "2024", text: "Launch of the Private Archive." }
                        ].map((item, i) => (
                            <div key={i} className="p-12 bg-[#101010] hover:bg-[#151515] transition-colors group reveal">
                                <span className="block text-4xl serif italic mb-4 opacity-50 group-hover:opacity-100 transition-opacity">{item.year}</span>
                                <p className="text-sm tracking-widest uppercase opacity-60">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Signoff */}
            <section className="py-48 px-6 md:px-24 flex justify-end">
                <div className="max-w-xl text-right reveal">
                    <p className="text-2xl md:text-4xl serif italic leading-relaxed mb-8 font-light">
                        &quot;We are merely temporary custodians of these eternal objects.&quot;
                    </p>
                    {/* Signature would be an image here, using text for now */}
                    <div className="font-serif italic text-6xl opacity-30 my-8">Alexander.</div>
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] opacity-40">Alexander V. — Founder</p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
