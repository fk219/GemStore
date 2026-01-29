"use client";

import React, { useContext, useEffect } from 'react';
import { LanguageContext, ThemeContext } from '@/app/providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Home Components
import Hero from '@/components/Home/Hero';
import CinematicStory from '@/components/Home/CinematicStory';
import CTA from '@/components/CTA';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
    const langCtx = useContext(LanguageContext);
    const themeCtx = useContext(ThemeContext);

    useEffect(() => {
        // Luxury Reveal Animations - Slow, Intentional, Weighted
        const ctx = gsap.context(() => {
            // Standard Reveals with Luxury Timing
            const reveals = document.querySelectorAll('.reveal-text, .reveal-image');
            reveals.forEach(el => {
                gsap.fromTo(el,
                    { y: 12, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 2.5,
                        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Refined Parallax - Reduced Intensity
            const parallaxEls = document.querySelectorAll("[data-speed]");
            parallaxEls.forEach(el => {
                const speed = parseFloat(el.getAttribute("data-speed") || "1");
                gsap.to(el, {
                    y: (i, target) => {
                        return (1 - speed) * ScrollTrigger.maxScroll(window) * 0.05;
                    },
                    ease: "none",
                    scrollTrigger: {
                        trigger: el,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5
                    }
                });
            });
        });

        return () => ctx.revert();
    }, []);

    if (!langCtx || !themeCtx) return null;

    // Background constants for sections that need them wrapping
    const bgAlt = "bg-secondary dark:bg-[#0C0C0C]";

    return (
        <main className="w-full selection:bg-[#b5a16d] selection:text-white">
            <Navbar themeOverride="dark" />

            {/* 1. Hero (PRESERVED) */}
            <Hero />

            {/* 2. The Cinematic Story (Scrollytelling) */}
            <CinematicStory />

            {/* 3. CTA (Existing) */}
            <CTA />

            <Footer />
            <FloatingActions />
        </main>
    );
}
