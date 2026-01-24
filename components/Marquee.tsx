"use client";

import React from 'react';

const Marquee = () => {
    const messages = [
        "Complimentary Global Shipping & Secure Armored Delivery",
        "Private Viewing Available in Geneva, London, & New York",
        "Maison L'Éclat — Est. 1982",
        "The Archive Collection [2024–2025] is now open",
    ];

    return (
        <div className="absolute top-0 left-0 w-full h-8 z-[800] bg-[#0A0A0A] text-[#b5a16d] flex items-center overflow-hidden border-b border-[#b5a16d]/20">
            <div className="flex animate-[marquee_50s_linear_infinite] whitespace-nowrap">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-16 px-8">
                        {messages.map((msg, idx) => (
                            <span key={idx} className="flex items-center gap-16 text-[10px] uppercase tracking-[0.3em] font-sans font-medium">
                                {msg}
                                <span className="w-1 h-1 bg-current rounded-full opacity-50" />
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
            `}</style>
        </div>
    );
};

export default Marquee;
