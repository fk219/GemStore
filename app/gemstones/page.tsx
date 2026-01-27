"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GemstonesHero from '@/components/Gemstones/GemstonesHero';
import GemstonesGrid from '@/components/Gemstones/GemstonesGrid';

export default function GemstonesPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0B] text-[#FBFBF9]">
            <Navbar themeOverride="dark" />
            <GemstonesHero />
            <GemstonesGrid />
            <Footer />
        </main>
    );
}
