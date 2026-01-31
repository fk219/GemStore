"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const ElasticLine = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const hitRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (!pathRef.current || !svgRef.current || !hitRef.current) return;

        const svg = svgRef.current;
        const mainPath = pathRef.current;
        const hitPath = hitRef.current;

        let connected = false;
        // Center vertically in the container (h-48 = 192px/2 approx 100)
        const startY = 100;

        // Physics Points
        const p0 = { x: 0, y: startY };
        const p1 = { x: 400, y: startY };
        const p2 = { x: 800, y: startY };

        // Keep points scalable width-wise
        const updateWidth = () => {
            const width = svg.getBoundingClientRect().width;
            p1.x = width / 2;
            p2.x = width;
            p0.x = 0;

            // Set static hit path once (or on resize)
            const d = `M${p0.x},${p0.y} Q${p1.x},${startY} ${p2.x},${p2.y}`;
            hitPath.setAttribute("d", d);
            // Main path reset
            mainPath.setAttribute("d", d);
        };

        const observer = new ResizeObserver(updateWidth);
        observer.observe(svg);
        updateWidth();

        // Animation Loop
        const render = () => {
            // Update observable path
            const d = `M${p0.x},${p0.y} Q${p1.x},${p1.y} ${p2.x},${p2.y}`;
            mainPath.setAttribute("d", d);
        };

        gsap.ticker.add(render);

        // Interaction
        const onMove = (e: PointerEvent) => {
            const rect = svg.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const x = e.clientX - rect.left;

            // "Hit" zone: Only grab if mouse is over the invisible thick path
            if (e.target === hitPath) {
                if (!connected) {
                    connected = true;
                    gsap.killTweensOf(p1);
                }
            }

            if (connected) {
                // Follow mouse elastically
                // y * 2 - ... creates the pull
                p1.y = y * 2 - (p0.y + p2.y) / 2;
                p1.x = x; // Follow horizontal too
            }
        };

        const onLeave = () => {
            // Snap back
            connected = false;
            gsap.to(p1, {
                duration: 2.0,
                y: startY,
                x: svg.getBoundingClientRect().width / 2,
                ease: "elastic.out(1, 0.2)"
            });
        };

        const onPointerUp = () => {
            if (connected) onLeave();
        };

        svg.addEventListener("pointermove", onMove);
        svg.addEventListener("pointerleave", onLeave);
        window.addEventListener("pointerup", onPointerUp);

        return () => {
            gsap.ticker.remove(render);
            observer.disconnect();
            svg.removeEventListener("pointermove", onMove);
            svg.removeEventListener("pointerleave", onLeave);
            window.removeEventListener("pointerup", onPointerUp);
        };
    }, []);

    return (
        <div className="w-full h-48 relative flex items-center justify-center -mb-24 z-50 pointer-events-none">
            {/* -mb-24 allows it to sit on top of the footer content slightly or just be a nice header */}
            <svg
                ref={svgRef}
                className="w-full h-full pointer-events-auto cursor-crosshair overflow-visible"
            >
                <defs>
                    <linearGradient id="gold-string" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0" />
                        <stop offset="20%" stopColor="#D4AF37" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#F4E285" stopOpacity="1" />
                        <stop offset="80%" stopColor="#D4AF37" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Visible Path */}
                <path
                    ref={pathRef}
                    d=""
                    stroke="url(#gold-string)"
                    strokeWidth="2"
                    fill="none"
                    className="drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                />

                {/* Invisible Hit Path (Static Horizontal) */}
                <path
                    ref={hitRef}
                    d=""
                    stroke="transparent"
                    strokeWidth="100" // Wide hit area
                    fill="none"
                    style={{ pointerEvents: 'stroke' }}
                />
            </svg>
        </div>
    );
};

export default ElasticLine;
