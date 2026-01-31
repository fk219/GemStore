"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const ElasticLine = () => {
    const pathRef = useRef<SVGPathElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!pathRef.current || !containerRef.current) return;

        const path = pathRef.current;
        const container = containerRef.current;

        // Configuration
        const startY = 50; // Vertical center of the SVG (h-100px -> 50)
        let progress = 0;
        let diff = 0;
        let x = 0.5; // Normalized x (0 to 1)
        let reqId: number | null = null;

        // Reset state
        const resetAnimation = () => {
            progress = 0;
            diff = 0;
            x = 0.5;
        };

        const manageMouseMove = (e: MouseEvent) => {
            const { clientY, clientX } = e;
            const { top, height, left, width } = container.getBoundingClientRect();

            // Enter/Leave detection is handled by the container's mouseenter/leave, 
            // but we track movement here.

            // Calculate distance from center line
            // Only react if we are relatively close or "holding" the string
            // The user's snippet uses a "hit" path. We can just use the container height.

            x = (clientX - left) / width;
            progress = (clientY - top) / height; // 0 to 1

            // Map progress to displacement
            // Center is 0.5. 
            // We want the line to follow the mouse Y relative to the center.
            // Target Y = clientY - top. 
            // Snippet logic: p1.y = y * 2...

            diff = (progress - 0.5) * height * 2; // Stretch factor
        };

        const manageMouseLeave = () => {
            gsap.to(state, {
                diff: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.3)"
            });
        };

        // We need an object to tween for GSAP if we want to use its elastic ease comfortably,
        // or we use the snippet's logic: 
        // Snippet: 
        /*
          if (connected) p1.y = ...
          pointerleave: gsap.to(p1, { y: startY, ease: "elastic..." })
        */

        const state = { diff: 0 }; // Difference from center (0)

        const setPath = (currentDiff: number) => {
            const width = container.getBoundingClientRect().width;
            // Quadratic Bezier: M0,50 Q{width*x},{50 + diff} {width},50
            // We interpolate the control point x based on mouse x for better feel
            // or keep it simple in center? User snippet moves p1.x?
            // User snippet: "p1 = { x: 400 ... }". It stays in center X?
            // "p1.y = y*2...". 
            // Actually, usually string follows Mouse X too.
            // Let's keep X dynamic.

            const px = width * x;
            const py = startY + currentDiff;

            path.setAttribute("d", `M0,${startY} Q${px},${py} ${width},${startY}`);
        };

        // Loop
        const loop = () => {
            setPath(state.diff);
            reqId = requestAnimationFrame(loop);
        };
        loop();

        // Event Listeners
        const onMove = (e: MouseEvent) => {
            // Update state.diff directly when active
            const { top, height, left, width } = container.getBoundingClientRect();
            const yRel = e.clientY - top;

            x = (e.clientX - left) / width;
            state.diff = yRel - startY;
        };

        const onLeave = () => {
            // Snap back
            gsap.to(state, {
                diff: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.3)"
            });
            // Reset x to center slowly? Or just keep it.
            // Keeping last X is fine for the plucked effect.
        };

        container.addEventListener("mousemove", onMove);
        container.addEventListener("mouseleave", onLeave);

        return () => {
            container.removeEventListener("mousemove", onMove);
            container.removeEventListener("mouseleave", onLeave);
            if (reqId) cancelAnimationFrame(reqId);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-24 relative flex items-center justify-center my-12 group cursor-crosshair">
            {/* The SVG Container */}
            <svg className="w-full h-full absolute inset-0 overflow-visible">
                {/* Gradient Definition */}
                <defs>
                    <linearGradient id="gold-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.2" />
                        <stop offset="25%" stopColor="#D4AF37" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#F4E285" stopOpacity="1" />
                        <stop offset="75%" stopColor="#D4AF37" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0.2" />
                    </linearGradient>
                </defs>

                {/* The String */}
                <path
                    ref={pathRef}
                    d="M0,50 Q500,50 1000,50"
                    stroke="url(#gold-shimmer)"
                    strokeWidth="1.5"
                    fill="none"
                    className="drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                />
            </svg>

            {/* Optional Hint Text */}
            <span className="relative z-10 text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/40 pointer-events-none group-hover:opacity-0 transition-opacity duration-500 font-sans">
                Interaction
            </span>
        </div>
    );
};

export default ElasticLine;
