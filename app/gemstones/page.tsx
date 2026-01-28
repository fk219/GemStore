"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GemstonesHero from '@/components/Gemstones/GemstonesHero';
import GemstonesGrid from '@/components/Gemstones/GemstonesGrid';
import CTA from '@/components/CTA';

export default function GemstonesPage() {
    return (
        <main className="min-h-screen bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9]">
            <Navbar />
            <GemstonesHero />
            <GemstonesGrid />
            <CTA />
            <Footer />
        </main>
    );
}
