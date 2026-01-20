"use client";

import React, { useContext } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutHero from '@/components/AboutHero';
import { LanguageContext } from '@/app/providers';

export default function AboutPage() {
    // Placeholder - porting minimal content from Legacy AboutPage if exists or keeping simple
    // The original AboutPage was very simple (742 chars)

    return (
        <main className="w-full bg-[#FBFBF9] dark:bg-[#0A0A0B] min-h-screen">
            <Navbar />
            <AboutHero />
            <section className="py-24 px-6 md:px-24 max-w-4xl mx-auto">
                <div className="space-y-12">
                    <p className="text-xl md:text-2xl font-light opacity-80 leading-relaxed font-serif text-justify">
                        Founded on the principles of discretion and rarity. We do not seek the spotlight; we seek the stone.
                        Our process is one of patient observation, waiting for the earth to reveal its most guarded secrets.
                    </p>
                    <p className="text-sm md:text-base tracking-wide opacity-60 leading-loose font-sans font-light text-justify">
                        Established in 2024, T.CRAFT has quietly amassed one of the most significant private collections of geological artifacts in the modern era.
                        Each acquisition is vetted not just for clarity or karat, but for character. We believe a gemstone is a narrative waiting to be read.
                    </p>
                </div>
            </section>
            <Footer />
        </main>
    )
}
