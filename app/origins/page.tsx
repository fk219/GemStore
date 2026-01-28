"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OriginsHero from '@/components/Origins/OriginsHero';
import OriginsGrid from '@/components/Origins/OriginsGrid';
import InteractiveMap from '@/components/Origins/InteractiveMap';
import EthicalCommitment from '@/components/Origins/EthicalCommitment';

export default function GemstoneOriginsPage() {
    return (
        <main className="min-h-screen bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9]">
            <Navbar />
            <OriginsHero />
            <InteractiveMap />
            <OriginsGrid />
            <EthicalCommitment />
            <Footer />
        </main>
    );
}
