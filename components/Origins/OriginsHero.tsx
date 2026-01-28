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
            <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F9F8F4] to-[#F9F8F4] dark:from-[#1A1A1A] dark:via-[#0A0A0B] dark:to-[#0A0A0B] opacity-90" />

            {/* Subtle World Map Background */}
            <div className="absolute inset-0 opacity-[0.03]">
                <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw]" strokeWidth={0.2} />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
                <div className={`transition-all duration-[2.5s] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <MapPin className="w-12 h-12 mx-auto mb-8 text-[#b5a16d]/60" strokeWidth={0.5} />
                    <h1 className="font-serif text-[12vw] md:text-[8vw] lg:text-[6vw] font-light leading-[0.9] tracking-tight mb-6">
                        <span className="block">Gemstone Origins</span>
                    </h1>
                    <p className="text-[11px] md:text-[13px] tracking-[0.6em] uppercase opacity-40 font-light">
                        Provenance & Heritage
                    </p>
                </div>
            </div>
        </section>
    );
};

export default OriginsHero;
