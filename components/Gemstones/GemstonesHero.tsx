"use client";

import React, { useState, useEffect } from 'react';
import { Diamond } from 'lucide-react';

const GemstonesHero: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#0A0A0B] to-[#0A0A0B] opacity-90" />

            <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
                <div className={`transition-all duration-[2.5s] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <Diamond className="w-12 h-12 mx-auto mb-8 text-[#b5a16d]/60" strokeWidth={0.5} />
                    <h1 className="font-serif text-[12vw] md:text-[8vw] lg:text-[6vw] font-light leading-[0.9] tracking-tight mb-6">
                        <span className="block">Gemstones</span>
                    </h1>
                    <p className="text-[11px] md:text-[13px] tracking-[0.6em] uppercase opacity-40 font-light">
                        Nature&apos;s Masterpieces
                    </p>
                </div>
            </div>
        </section>
    );
};

export default GemstonesHero;
