'use client';

import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            setScrollProgress(Math.min(progress, 100));
            setIsVisible(scrollTop > 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Calculate circle stroke properties
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <button
            onClick={scrollToTop}
            className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
            aria-label="Scroll to top"
        >
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1A1A1A]/95 backdrop-blur-sm rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap">
                <span className="text-[8px] tracking-[0.15em] uppercase text-white/80">{Math.round(scrollProgress)}%</span>
            </div>

            {/* Main Button with Progress Ring */}
            <div className="relative w-11 h-11">
                {/* Progress Ring SVG */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
                    {/* Background Circle */}
                    <circle
                        cx="22"
                        cy="22"
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="22"
                        cy="22"
                        r={radius}
                        fill="none"
                        stroke="#b5a16d"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-300"
                    />
                </svg>

                {/* Center Button */}
                <div className="absolute inset-1 rounded-full bg-[#1A1A1A]/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#b5a16d] transition-all duration-500">
                    <svg
                        className="w-4 h-4 text-[#b5a16d] group-hover:text-[#1A1A1A] transition-colors duration-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                </div>
            </div>
        </button>
    );
};

export default ScrollToTop;
