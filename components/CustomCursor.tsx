"use client";

import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Feature detection for touch capability
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // Only activate if strictly non-touch and large screen
        const shouldActivate = !isTouchDevice && window.matchMedia("(min-width: 1024px)").matches;

        setIsActive(shouldActivate);

        if (shouldActivate) {
            document.body.classList.add('custom-cursor-active');
        } else {
            document.body.classList.remove('custom-cursor-active');
            return;
        }

        const handleResize = () => {
            const stillShouldActivate = !isTouchDevice && window.matchMedia("(min-width: 1024px)").matches;
            setIsActive(stillShouldActivate);
            if (stillShouldActivate) {
                document.body.classList.add('custom-cursor-active');
            } else {
                document.body.classList.remove('custom-cursor-active');
            }
        };

        window.addEventListener('resize', handleResize);

        const handleMouseMove = (e: MouseEvent) => {
            // Use requestAnimationFrame for smoother performance if needed, 
            // but React state updates are often batched enough.
            // For ultra-performance, use a ref and direct DOM manipulation or GSAP.
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('button, a, input, select, [role="button"]');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            document.body.classList.remove('custom-cursor-active');
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!isActive) return null;

    return (
        <div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gray-400 pointer-events-none z-[99999] transition-transform duration-300 ease-out flex items-center justify-center mix-blend-difference"
            style={{
                transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0) scale(${isHovering ? 2.5 : 1})`,
            }}
        >
            <div className={`w-1 h-1 rounded-full bg-white transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
        </div>
    );
};

export default CustomCursor;
