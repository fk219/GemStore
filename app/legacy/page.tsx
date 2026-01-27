"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LegacyPage() {
    return (
        <main className="w-full bg-[#FBFBF9] dark:bg-[#0A0A0B] min-h-screen">
            <Navbar />
            <section className="pt-48 pb-24 px-6 md:px-24">
                <h1 className="text-display-2 md:text-display-1 font-light serif mb-12">Legacy</h1>
                <p className="text-body opacity-60 leading-relaxed max-w-2xl serif italic">
                    Our archives are a testament to patience.
                </p>
                <div className="mt-24 h-[50vh] w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center">
                    <span className="opacity-20 uppercase tracking-[0.5em]">Coming Soon</span>
                </div>
            </section>
            <Footer />
        </main>
    )
}
