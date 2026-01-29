"use client";

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const IntroSequence = () => {
    // Default to false to avoid flash on server/hydration mismatch, 
    // but check in useEffect for actual logic.
    const [showIntro, setShowIntro] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const diamondRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const hasSeen = sessionStorage.getItem('hasSeenIntro');
        if (!hasSeen) {
            setShowIntro(true);
            document.body.style.overflow = 'hidden'; // Lock scroll
        }
    }, []);

    useGSAP(() => {
        if (!showIntro || !containerRef.current) return;

        const tl = gsap.timeline({
            onComplete: () => {
                sessionStorage.setItem('hasSeenIntro', 'true');
                setShowIntro(false);
                document.body.style.overflow = ''; // Unlock scroll
            }
        });

        // 1. Initial State
        const paths = diamondRef.current?.querySelectorAll('path');
        if (paths) {
            gsap.set(paths, { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 });
        }

        // 2. Wireframe Assembly (Drawing lines)
        tl.to(paths, {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 2.5,
            stagger: 0.1,
            ease: "power2.inOut"
        });

        // 3. Scale Up and Fill
        tl.to(diamondRef.current, {
            scale: 1.2,
            filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.5))",
            duration: 1.5,
            ease: "power2.out"
        }, "-=1");

        // 4. Light Flash Reveal (Spectral Pulse)
        tl.to(".intro-flash", {
            opacity: 1,
            backgroundPosition: "100% 100%", // Shift the gradient for dynamic shimmer
            duration: 0.15,
            ease: "power4.in"
        })
            .to(containerRef.current, { opacity: 0, duration: 1.2, ease: "power2.out", pointerEvents: "none" }, "+=0.1"); // Fade out container

    }, { scope: containerRef, dependencies: [showIntro] });

    if (!showIntro) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#020202] text-[#EAEAEA]"
        >
            {/* Velvet Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

            {/* Diamond Wireframe SVG */}
            <div className="relative z-10 w-48 h-48 md:w-64 md:h-64">
                <svg
                    ref={diamondRef}
                    viewBox="0 0 100 100"
                    className="w-full h-full stroke-white/80 stroke-[0.5] fill-none overflow-visible"
                >
                    {/* Abstract Diamond Geometry */}
                    <path d="M50 10 L90 40 L50 90 L10 40 Z" /> {/* Outer Kite */}
                    <path d="M10 40 L90 40" /> {/* Horizon */}
                    <path d="M50 10 L50 90" /> {/* Vertical Spine */}
                    <path d="M50 10 L30 40 L50 65 L70 40 Z" /> {/* Inner Facet Upper */}
                    <path d="M10 40 L50 65 L90 40" /> {/* Lower Facet Connection */}
                </svg>

                {/* Brand Text Fading In */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap overflow-hidden">
                    <h1 className="animate-[fadeIn_3s_ease-out_1s_forwards] opacity-0 text-xl font-serif tracking-[0.4em] uppercase">
                        Maihan Group
                    </h1>
                </div>
            </div>

            {/* The Flash Overlay */}
            {/* The Flash Overlay - Spectral Refraction */}
            <div
                className="intro-flash absolute inset-0 opacity-0 pointer-events-none z-50 mix-blend-screen"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(212,175,55,0.4) 30%, rgba(15,82,186,0.3) 50%, rgba(224,17,95,0.3) 70%, rgba(255,255,255,0.8) 100%)',
                    backgroundSize: '200% 200%'
                }}
            />
        </div>
    );
};

export default IntroSequence;
