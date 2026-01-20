"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GemstonesHero from '@/components/GemstonesHero';
import CollectionSection from '@/components/CollectionSection';

export default function GemstonesPage() {
    return (
        <main className="w-full bg-[#FBFBF9] dark:bg-[#0A0A0B] min-h-screen text-[#1A1A1A] dark:text-[#FBFBF9] transition-colors duration-1000">
            <Navbar />

            <GemstonesHero />

            {/* Reusing Collection Section as the main content for now */}
            <div className="py-24">
                <CollectionSection />
            </div>

            <Footer />
        </main>
    );
}
