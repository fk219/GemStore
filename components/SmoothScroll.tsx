"use client";

import { useEffect } from "react";
import { setupSmoothScrollWithGSAP, setMotionDefaults } from "@/lib/motion";

export default function SmoothScroll() {
    useEffect(() => {
        setMotionDefaults();
        const lenis = setupSmoothScrollWithGSAP();

        // 1. Intercept Anchor Clicks for Smooth Jump
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (link && link.hash && link.hash.startsWith('#') && link.origin + link.pathname === window.location.href) {
                e.preventDefault();
                lenis?.scrollTo(link.hash, {
                    offset: 0,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Consistent luxury ease
                });
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            lenis && lenis.destroy();
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return null;
}
