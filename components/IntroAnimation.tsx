"use client";

import React, { useRef, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/Flip';

// Register plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(Flip, useGSAP);
}

const IntroAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setIsComplete(true);
            }
        });

        const logo = logoRef.current;
        const navLogoTarget = document.getElementById("nav-logo-target");

        if (!logo || !navLogoTarget) return;

        // 1. Initial State: Center Screen, Scaled Up
        // We assume the logo starts centered via CSS (fixed inset-0 flex center)

        // 2. Shimmer / Light Sweep
        // Animate a mask or just a brightness sweep
        tl.fromTo(logo,
            { scale: 0.8, opacity: 0, filter: "brightness(1)" },
            { scale: 1.2, opacity: 1, duration: 1.5, ease: "power2.out" }
        )
            .to(logo, {
                filter: "brightness(2) drop-shadow(0 0 20px rgba(212, 175, 55, 0.6))",
                duration: 0.8,
                yoyo: true,
                repeat: 1,
                ease: "sine.inOut"
            }, "-=0.5");

        // 3. The Move to Navbar (FLIP)
        tl.add(() => {
            // Capture state of the "flying" logo
            const state = Flip.getState(logo);

            // Move logo physically to the navbar target? 
            // Better: Fit the flying logo to the navbar target's visual bounds
            // We use Flip.fit() to visually match the target without moving DOM

            Flip.fit(logo, navLogoTarget, {
                duration: 1.5,
                ease: "power4.inOut",
                scale: true,
                absolute: true, // Keep it absolute during flight
                onComplete: () => {
                    // 4. Handoff
                    // Hide flying logo, show navbar logo
                    gsap.set(navLogoTarget, { opacity: 1 });
                    gsap.to(containerRef.current, { opacity: 0, duration: 0.5, pointerEvents: "none" });
                }
            });
        }, "+=0.2");

        // 5. Reveal Hero Content (Simultaneous with flight)
        tl.to(".hero-content-reveal", {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1.5,
            ease: "power3.out"
        }, "-=1.2");

        // Navbar Links Reveal
        tl.to(".nav-link-reveal", {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 1,
            ease: "power2.out"
        }, "<");

    }, { scope: containerRef });

    if (isComplete) return null; // Unmount after done

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center bg-[#F9F8F4] dark:bg-[#0A0A0B] pointer-events-none">
            {/* The Flying Logo */}
            <div ref={logoRef} className="relative w-40 h-40 md:w-64 md:h-64" id="flying-logo">
                <Image
                    src="/images/logo.webp"
                    alt="Maihan Logo"
                    fill
                    className="object-contain"
                    priority
                />
                {/* Shimmer Overlay (Optional) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent w-[200%] h-full -translate-x-full animate-shimmer hidden" />
            </div>
        </div>
    );
};

export default IntroAnimation;
