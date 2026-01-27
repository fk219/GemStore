'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-[50] group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
            aria-label="Scroll to top"
        >
            {/* Main Button */}
            <div className="relative">
                {/* Background Ring */}
                <div className="absolute inset-0 rounded-full border border-[#b5a16d]/30 group-hover:border-[#b5a16d] transition-colors duration-500" />

                {/* Button Content */}
                <div className="relative w-12 h-12 rounded-full bg-[#1A1A1A]/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#b5a16d] transition-all duration-500">
                    <ArrowUp
                        className="w-4 h-4 text-[#b5a16d] group-hover:text-[#1A1A1A] transition-colors duration-500"
                        strokeWidth={2}
                    />
                </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1A1A1A]/95 backdrop-blur-sm rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap">
                <span className="text-[8px] tracking-[0.15em] uppercase text-white/80">Top</span>
            </div>
        </button>
    );
};

export default ScrollToTop;
