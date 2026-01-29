"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    // GSAP QuickTo for maximum performance (bypassing React state for mouse moves)
    const xTo = useRef<gsap.QuickToFunc>();
    const yTo = useRef<gsap.QuickToFunc>();

    useEffect(() => {
        // Feature detection
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const checkActive = () => !isTouchDevice && window.matchMedia("(min-width: 1024px)").matches;

        setIsActive(checkActive());

        const handleResize = () => setIsActive(checkActive());
        window.addEventListener('resize', handleResize);

        if (checkActive()) {
            document.body.classList.add('custom-cursor-active');
        }

        return () => {
            document.body.classList.remove('custom-cursor-active');
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useGSAP(() => {
        if (!isActive || !cursorRef.current) return;

        // Setup QuickTo
        xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3.out" });
        yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3.out" });

        // Initial Center
        xTo.current(window.innerWidth / 2);
        yTo.current(window.innerHeight / 2);

        const handleMouseMove = (e: MouseEvent) => {
            xTo.current!(e.clientX);
            yTo.current!(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('button, a, input, select, [role="button"], .clickable');

            if (isClickable) {
                // Hover Enter State
                gsap.to(cursorRef.current, {
                    scale: 3,
                    borderWidth: '0.5px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle fill
                    duration: 0.4,
                    ease: "elastic.out(1, 0.5)"
                });
                gsap.to(dotRef.current, {
                    scale: 0, // Dot disappears/shrinks
                    opacity: 0,
                    duration: 0.2
                });
            } else {
                // Hover Leave (Default) State
                gsap.to(cursorRef.current, {
                    scale: 1,
                    borderWidth: '1px',
                    backgroundColor: 'transparent',
                    duration: 0.4,
                    ease: "power3.out"
                });
                gsap.to(dotRef.current, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.2
                });
            }
        };

        // Add click feedback
        const handleMouseDown = () => {
            gsap.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
        };

        const handleMouseUp = () => {
            // Reset scale is handled by mouseover logic usually, but we can force it
            // Let the mouseover logic handle standard state, just quick bounce here
            gsap.to(cursorRef.current, { scale: 3, duration: 0.3, ease: "back.out(1.7)" }); // Assume hovering usually
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };

    }, { dependencies: [isActive] });

    if (!isActive) return null;

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 rounded-full border border-[#D4AF37] pointer-events-none z-[99999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 bg-transparent mix-blend-difference"
        >
            <div
                ref={dotRef}
                className="w-1 h-1 rounded-full bg-[#D4AF37]"
            />
        </div>
    );
};

export default CustomCursor;
