"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OriginsHero from '@/components/Origins/OriginsHero';
import OriginsGrid from '@/components/Origins/OriginsGrid';

export default function GemstoneOriginsPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0B] text-[#FBFBF9]">
            <Navbar themeOverride="dark" />
            <OriginsHero />
            <OriginsGrid />
            <Footer />
        </main>
    );
}
