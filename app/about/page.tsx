"use client";

import React, { useContext } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageContext } from '@/app/providers';

export default function AboutPage() {
    // Placeholder - porting minimal content from Legacy AboutPage if exists or keeping simple
    // The original AboutPage was very simple (742 chars)

    return (
        <main className="w-full bg-[#FBFBF9] dark:bg-[#0A0A0B] min-h-screen">
            <Navbar />
            <section className="pt-48 pb-24 px-6 md:px-24">
                <h1 className="text-5xl md:text-8xl font-light serif mb-12">The House</h1>
                <p className="text-xl opacity-60 leading-relaxed max-w-2xl serif italic">
                    Founded on the principles of discretion and rarity. We do not seek the spotlight; we seek the stone.
                </p>
            </section>
            <Footer />
        </main>
    )
}
