"use client";

import React, { useContext, useRef, useEffect } from 'react';
import { LanguageContext } from '@/app/providers';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import gsap from 'gsap';

// Import Contact Components
import ContactHero from '@/components/Contact/ContactHero';
import ContactInfo from '@/components/Contact/ContactInfo';
import BookingForm from '@/components/Contact/BookingForm';

export default function BookingPage() {
    const langCtx = useContext(LanguageContext);

    // Refs for animation
    const infoRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(infoRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 });
            gsap.fromTo(formRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.4 });
        });
        return () => ctx.revert();
    }, []);

    if (!langCtx) return null;

    return (
        <main className="min-h-screen bg-[#FBFBF9] dark:bg-[#050505] text-[#1A1A1A] dark:text-[#FBFBF9] transition-colors duration-1000 overflow-hidden">
            <Navbar themeOverride="dark" />

            <ContactHero />

            <section className="py-24 px-6 md:px-24 flex flex-col md:flex-row min-h-[50vh] items-center">
                <ContactInfo ref={infoRef} />
                <BookingForm ref={formRef} />
            </section>

            <Footer />
        </main>
    );
}
