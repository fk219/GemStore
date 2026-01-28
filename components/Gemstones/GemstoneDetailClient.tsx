"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Diamond } from 'lucide-react';
import { gemstones } from '@/lib/data';
import CTA from '@/components/CTA';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function GemstoneDetailClient({ stone }: { stone: typeof gemstones[0] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Hero Entrance
        tl.from(".hero-text", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out"
        });

    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9] min-h-screen">

            {/* HERO */}
            <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={stone.images[0]}
                        alt={stone.title}
                        fill
                        className="object-cover opacity-80 dark:opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8F4] via-transparent to-transparent dark:from-[#0A0A0B]" />
                </div>
                {/* Golden Blobs (Global Consistency) */}
                <div className="absolute inset-0 opacity-20 pointer-events-none z-[1]">
                    <div className="absolute top-[-20%] right-[10%] w-[500px] h-[500px] bg-[#D4AF37] rounded-full blur-[100px] mix-blend-soft-light animate-pulse" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
                    <Link href="/gemstones" className="hero-text inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase mb-8 opacity-60 hover:opacity-100 transition-opacity">
                        <ArrowLeft className="w-3 h-3" /> Back to Collection
                    </Link>
                    <h1 className="hero-text text-[12vw] md:text-[8vw] font-serif leading-[0.8] mb-6 mix-blend-multiply dark:mix-blend-lighten text-[#1A1A1A] dark:text-white">
                        {stone.title}
                    </h1>
                    <p className="hero-text text-xl md:text-2xl font-light italic text-[#b5a16d]">
                        {stone.subtitle}
                    </p>
                </div>
            </section>

            {/* DETAILS GRID */}
            <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-12 gap-16">
                    {/* Story */}
                    <div className="md:col-span-7">
                        <span className="block text-xs font-sans tracking-[0.3em] uppercase text-[#b5a16d] mb-8">The Legend</span>
                        <p className="text-lg md:text-xl font-light leading-relaxed opacity-80">
                            {stone.description}
                        </p>
                    </div>

                    {/* Specifications */}
                    <div className="md:col-span-5 bg-white dark:bg-[#111] p-8 md:p-12 border border-[#b5a16d]/10">
                        <h3 className="font-serif text-2xl mb-8 flex items-center gap-3">
                            <Diamond className="w-5 h-5 text-[#b5a16d]" strokeWidth={1} />
                            Specifications
                        </h3>
                        <div className="space-y-6">
                            {Object.entries(stone.details).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center border-b border-[#b5a16d]/10 pb-4 last:border-0 last:pb-0">
                                    <span className="text-xs uppercase tracking-widest opacity-50">{key}</span>
                                    <span className="font-serif text-lg">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* GALLERY */}
            <section className="py-24 px-6 bg-[#EAE8E3] dark:bg-[#111]">
                <div className="max-w-[1800px] mx-auto text-center mb-16">
                    <h2 className="text-3xl font-serif">Visual Symphony</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1800px] mx-auto auto-rows-[600px]">
                    {stone.images.map((img, i) => (
                        <div key={i} className={`relative overflow-hidden group ${i === 0 ? 'md:col-span-2' : ''}`}>
                            <Image
                                src={img}
                                alt={`${stone.title} ${i}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                    ))}
                </div>
            </section>

            <CTA
                title="Acquire a Masterpiece"
                subtitle="Concierge Service"
                href="/contact"
                buttonText="Inquire Now"
            />
        </main>
    );
}
