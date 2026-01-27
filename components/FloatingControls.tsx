"use client";

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FloatingControls = () => {
    const [showScroll, setShowScroll] = useState(false);
    const scrollBtnRef = useRef<HTMLButtonElement>(null);
    const whatsappRef = useRef<HTMLAnchorElement>(null);
    const progressCircleRef = useRef<SVGCircleElement>(null);
    const showScrollRef = useRef(false);

    const radius = 48;
    const circumference = 2 * Math.PI * radius;

    // Initial Intro Animation - Faster entry
    useGSAP(() => {
        gsap.from(whatsappRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.5, // Reduced delay
            ease: "power3.out"
        });
    }, []);

    useEffect(() => {
        let rafId = 0;

        const computeAndSync = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
            const scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = scrollable > 0 ? Math.min(1, Math.max(0, scrollTop / scrollable)) : 0;

            if (progressCircleRef.current) {
                progressCircleRef.current.style.strokeDashoffset = String(circumference * (1 - progress));
            }

            const nextShowScroll = scrollTop > 500;
            if (nextShowScroll !== showScrollRef.current) {
                showScrollRef.current = nextShowScroll;
                setShowScroll(nextShowScroll);
            }
        };

        const scheduleSync = () => {
            if (rafId) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = 0;
                computeAndSync();
            });
        };

        computeAndSync();
        window.addEventListener("scroll", scheduleSync, { passive: true });
        window.addEventListener("resize", scheduleSync);

        return () => {
            window.removeEventListener("scroll", scheduleSync);
            window.removeEventListener("resize", scheduleSync);
            if (rafId) window.cancelAnimationFrame(rafId);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            className="fixed z-[900] flex flex-nowrap items-center gap-3 pointer-events-none"
            style={{
                right: "calc(env(safe-area-inset-right) + clamp(12px, 2vw, 24px))",
                bottom: "calc(env(safe-area-inset-bottom) + clamp(12px, 2vw, 24px))",
            }}
        >

            {/* 1. Scroll To Top - Magnetic & Progress Ring */}
            <button
                ref={scrollBtnRef}
                onClick={scrollToTop}
                className={`pointer-events-auto group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white dark:bg-[#1A1A1A] text-black dark:text-white shadow-[var(--shadow-soft)] transition-all duration-500 ease-[var(--easing-standard)] ${showScroll ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} hover:shadow-[var(--shadow-depth)] hover:-translate-y-[6px]`}
                aria-label="Scroll to Top"
            >
                {/* Progress SVG Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-10" />
                    <circle
                        cx="50" cy="50" r="48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        ref={progressCircleRef}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        className="text-amber-500"
                    />
                </svg>

                {/* Arrow Icon */}
                <span className="relative z-10 text-xl group-hover:-translate-y-[2px] transition-transform duration-300">
                    ↑
                </span>
            </button>

            {/* 2. WhatsApp Button - Pulsing */}
            <a
                ref={whatsappRef}
                href="https://wa.me/1234567890" // User should update this
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-[6px]"
                aria-label="Chat on WhatsApp"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7 relative z-10">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
        </div>
    );
};

export default FloatingControls;
