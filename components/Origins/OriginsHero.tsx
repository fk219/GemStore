"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Globe } from 'lucide-react';

const OriginsHero: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9]">
            {/* Background Image - Drone Shot */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
                    alt="Mining Landscape"
                    className="w-full h-full object-cover opacity-60 dark:opacity-40 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#F9F8F4]/80 via-[#F9F8F4]/50 to-[#F9F8F4] dark:from-[#0A0A0B]/80 dark:via-[#0A0A0B]/50 dark:to-[#0A0A0B]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
                <div className={`transition-all duration-[2.5s] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <MapPin className="w-12 h-12 mx-auto mb-8 text-[#b5a16d]/60" strokeWidth={0.5} />
                    <h1 className="font-serif text-[12vw] md:text-[8vw] lg:text-[7vw] font-light leading-[0.9] tracking-tight mb-6 text-[#1A1A1A] dark:text-[#FBFBF9]">
                        <span className="block">From the Source</span>
                    </h1>
                    <p className="text-[11px] md:text-[13px] tracking-[0.6em] uppercase opacity-40 font-light text-[#1A1A1A] dark:text-[#FBFBF9]">
                        Provenance & Heritage
                    </p>
                </div>
            </div>
        </section>
    );
};

export default OriginsHero;
