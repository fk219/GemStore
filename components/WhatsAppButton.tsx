'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        window.open('https://wa.me/1234567890', '_blank');
    };

    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`fixed bottom-6 left-6 z-[50] flex items-center gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            aria-label="Contact on WhatsApp"
        >
            {/* Tooltip */}
            <div className={`absolute left-16 px-4 py-2 bg-[#1A1A1A]/95 backdrop-blur-sm rounded-full border border-white/10 transition-all duration-500 whitespace-nowrap ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
                }`}>
                <span className="text-[10px] tracking-[0.15em] uppercase text-white/80">Chat with us</span>
            </div>

            {/* Button */}
            <div className="relative group">
                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

                {/* Main Button */}
                <div className="relative w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-5 h-5 text-white" strokeWidth={2} fill="white" />
                </div>
            </div>
        </button>
    );
};

export default WhatsAppButton;
