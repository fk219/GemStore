import React, { useEffect, useState } from 'react';

const HeroCalm: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0B] text-[#FBFBF9]">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40" />
            </div>
            <div className="relative z-10 w-full max-w-[1600px] px-12 md:px-32">
                <div className="flex flex-col gap-[var(--space-12)]">
                    <div className="flex items-end justify-between">
                        <h1 className={`text-[9vw] md:text-[7vw] font-light serif leading-[0.95] tracking-[-0.02em] transition-all duration-[var(--duration-slow)] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                            Exquisite Luxury Gems,
                            <br className="hidden md:block" />
                            <span className="italic text-[#b5a16d]">Curated for Connoisseurs</span>
                        </h1>
                        <div className={`hidden lg:flex flex-col items-end gap-6 mb-12 transition-all duration-[var(--duration-slow)] ${mounted ? 'opacity-40 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                            <div className="w-[1px] h-24 bg-white/20" />
                            <div className="text-[9px] tracking-[1.2em] uppercase">Maison — Established 2001</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <h2 className={`text-[12vw] md:text-[9vw] font-light serif uppercase tracking-[-0.04em] transition-all duration-[var(--duration-slow)] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                            Provenance
                        </h2>
                    </div>
                    <div className="flex items-start justify-between">
                        <p className={`hidden lg:block text-[11px] tracking-[0.6em] uppercase opacity-40 max-w-[320px] leading-[2] transition-all duration-[var(--duration-slow)] ${mounted ? 'opacity-40 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                            Hand‑selected rare diamonds and coloured stones. Discreet sourcing, transparent provenance.
                        </p>
                        <h1 className={`text-[15vw] md:text-[12vw] font-light serif leading-[0.8] tracking-tight uppercase text-right transition-all duration-[var(--duration-slow)] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                            <span className="italic mr-2">Per</span>fection
                        </h1>
                    </div>
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
                        <div className="w-[1px] h-24 bg-white/30" />
                        <div className="mt-8 flex items-center gap-6">
                            <a href="/gemstones" className="text-[10px] tracking-[0.6em] uppercase border-b pb-1 border-white/40 hover:opacity-70">Shop Masterpieces</a>
                            <a href="/book" className="text-[10px] tracking-[0.6em] uppercase border-b pb-1 border-white/40 hover:opacity-70">Request Private Viewing</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroCalm;
