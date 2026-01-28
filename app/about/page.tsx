"use client";

import React, { useContext, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeContext } from '@/app/providers';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import About Components
import AboutHero from '@/components/About/AboutHero';
import OriginSection from '@/components/About/OriginSection';
import AtelierSection from '@/components/About/AtelierSection';
import Timeline from '@/components/About/Timeline';
import FounderSignoff from '@/components/About/FounderSignoff';
import CTA from '@/components/CTA';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
    const themeCtx = useContext(ThemeContext);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal Elements
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(el => {
                gsap.fromTo(el,
                    { y: 50, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 1, ease: "power2.out",
                        scrollTrigger: { trigger: el, start: "top 80%" }
                    }
                );
            });

            // Sophisticated Parallax for Backgrounds
            gsap.to(".parallax-bg", {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: ".atelier-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // Foreground Text Parallax relative to Image
            gsap.to(".parallax-text", {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: ".chapter-1",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

        });
        return () => ctx.revert();
    }, []);

    const textColorClass = "text-[#1A1A1A] dark:text-[#FBFBF9]";
    const bgClass = "bg-[#FBFBF9] dark:bg-[#050505]";

    return (
        <main className={`min-h-screen ${bgClass} ${textColorClass} selection:bg-[#b5a16d] selection:text-white`}>
            <Navbar />

            <AboutHero />

            <OriginSection />

            <AtelierSection />

            <Timeline />

            <FounderSignoff />

            <CTA />

            <Footer />
        </main>
    );
}
