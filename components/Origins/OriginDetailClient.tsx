"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, MapPin } from 'lucide-react';
import { origins } from '@/lib/data';
import CTA from '@/components/CTA';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function OriginDetailClient({ origin }: { origin: typeof origins[0] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Hero Entrance
        tl.from(".hero-text", {
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Parallax Sections
        gsap.utils.toArray<HTMLElement>('.parallax-section').forEach((section) => {
            gsap.fromTo(section.querySelector('.parallax-bg'),
                { yPercent: -20 },
                {
                    yPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9] min-h-screen">
            <Navbar />

            {/* HER - The Hook */}
            <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={origin.heroImage}
                        alt={origin.title}
                        fill
                        className="object-cover opacity-60 dark:opacity-40 grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F9F8F4]/20 to-[#F9F8F4] dark:via-[#0A0A0B]/20 dark:to-[#0A0A0B]" />
                </div>

                {/* Golden Blobs (Global Consistency) */}
                <div className="absolute inset-0 opacity-20 pointer-events-none z-[1]">
                    <div className="absolute top-[-50%] left-[20%] w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[120px] mix-blend-soft-light animate-pulse" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <Link href="/origins" className="hero-text inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase mb-8 opacity-60 hover:opacity-100 transition-opacity">
                        <ArrowLeft className="w-3 h-3" /> Back to Map
                    </Link>
                    <h1 className="hero-text text-[15vw] md:text-[10vw] font-serif leading-[0.8] mb-6 mix-blend-overlay dark:mix-blend-normal">
                        {origin.title}
                    </h1>
                    <p className="hero-text text-lg md:text-xl font-light italic text-[#b5a16d]">
                        {origin.subtitle}
                    </p>
                </div>
            </section>

            {/* INTRO - The Context */}
            <section className="relative py-24 px-6 md:px-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="block text-xs font-sans tracking-[0.3em] uppercase text-[#b5a16d] mb-6">The Origin</span>
                    <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">{origin.intro.heading}</h2>
                    <p className="text-lg opacity-70 font-light leading-relaxed whitespace-pre-line">
                        {origin.intro.text}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-8 border-l border-[#b5a16d]/20 pl-8">
                    {origin.stats.map((stat, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-[0.2em] opacity-40">{stat.label}</span>
                            <span className="text-2xl font-serif">{stat.value}</span>
                        </div>
                    ))}
                    <div className="col-span-2 pt-8 flex items-center gap-2 opacity-50">
                        <MapPin className="w-4 h-4 text-[#b5a16d]" />
                        <span className="text-xs tracking-widest font-mono">{origin.coordinates}</span>
                    </div>
                </div>
            </section>

            {/* SECTIONS - The Narrative */}
            <div className="flex flex-col gap-32 pb-32">
                {origin.sections.map((section, idx) => (
                    <section key={idx} className="relative w-full px-6 md:px-12 max-w-[1800px] mx-auto">

                        {/* Layout: Full Width */}
                        {section.layout === 'full-width' && (
                            <div className="text-center max-w-4xl mx-auto">
                                <span className="block w-px h-24 bg-[#b5a16d]/30 mx-auto mb-8" />
                                <h3 className="text-3xl md:text-4xl font-serif mb-6">{section.title}</h3>
                                <p className="text-lg opacity-70 font-light leading-relaxed">{section.content}</p>
                            </div>
                        )}

                        {/* Layout: Text Left (Image Right) */}
                        {section.layout === 'text-left' && (
                            <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                                <div>
                                    <h3 className="text-3xl md:text-5xl font-serif mb-8">{section.title}</h3>
                                    <p className="text-lg opacity-70 font-light leading-relaxed mb-8">{section.content}</p>
                                </div>
                                {section.image && (
                                    <div className="parallax-section relative h-[60vh] overflow-hidden rounded-sm">
                                        <Image
                                            src={section.image}
                                            alt={section.title}
                                            fill
                                            className="parallax-bg object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Layout: Text Right (Image Left) */}
                        {section.layout === 'text-right' && (
                            <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                                {section.image && (
                                    <div className="parallax-section relative h-[60vh] overflow-hidden rounded-sm order-2 md:order-1">
                                        <Image
                                            src={section.image}
                                            alt={section.title}
                                            fill
                                            className="parallax-bg object-cover"
                                        />
                                    </div>
                                )}
                                <div className="order-1 md:order-2">
                                    <h3 className="text-3xl md:text-5xl font-serif mb-8">{section.title}</h3>
                                    <p className="text-lg opacity-70 font-light leading-relaxed mb-8">{section.content}</p>
                                </div>
                            </div>
                        )}
                    </section>
                ))}
            </div>

            {/* NAV - More Origins */}
            <section className="py-24 border-t border-[#b5a16d]/10">
                <div className="max-w-7xl mx-auto px-6">
                    <h4 className="text-xs font-sans tracking-[0.3em] uppercase opacity-50 mb-12 text-center">Explore Other Origins</h4>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {origins.filter(o => o.slug !== origin.slug).map((o) => (
                            <Link key={o.slug} href={`/origins/${o.slug}`} className="group flex flex-col items-center gap-4">
                                <div className="w-48 h-64 relative overflow-hidden bg-black/5">
                                    <Image
                                        src={o.heroImage}
                                        alt={o.title}
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                    />
                                </div>
                                <span className="font-serif text-xl border-b border-transparent group-hover:border-[#b5a16d] transition-all pb-1">
                                    {o.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <CTA
                title={origin.cta.text}
                subtitle="The Collection"
                href={origin.cta.href}
                buttonText="View Collection"
            />

            <Footer />
        </main>
    );
}
