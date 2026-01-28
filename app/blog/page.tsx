"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogHero from '@/components/Blog/BlogHero';
import BlogGrid from '@/components/Blog/BlogGrid';
import CTA from '@/components/CTA';

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9]">
            <Navbar />
            <BlogHero />
            <BlogGrid />
            <CTA />
            <Footer />
        </main>
    );
}
