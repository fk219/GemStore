"use client";

import React from "react";
import { ShieldCheck, Gem, Leaf } from "lucide-react";

const TrustSection: React.FC = () => {
    return (
        <section className="py-24 border-t border-black/5 dark:border-white/5 bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

                    {/* Item 1 */}
                    <div className="flex flex-col items-center gap-6 group">
                        <div className="w-16 h-16 rounded-full bg-[#b5a16d]/10 flex items-center justify-center group-hover:bg-[#b5a16d]/20 transition-colors duration-500">
                            <ShieldCheck className="w-8 h-8 text-[#b5a16d]" strokeWidth={1} />
                        </div>
                        <div>
                            <h3 className="text-lg font-serif mb-2 tracking-wide">GIA Certified</h3>
                            <p className="text-xs tracking-[0.1em] uppercase opacity-50 max-w-[200px] mx-auto">
                                Every stone verified by the world&apos;s leading authority.
                            </p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex flex-col items-center gap-6 group">
                        <div className="w-16 h-16 rounded-full bg-[#b5a16d]/10 flex items-center justify-center group-hover:bg-[#b5a16d]/20 transition-colors duration-500">
                            <Leaf className="w-8 h-8 text-[#b5a16d]" strokeWidth={1} />
                        </div>
                        <div>
                            <h3 className="text-lg font-serif mb-2 tracking-wide">Ethically Sourced</h3>
                            <p className="text-xs tracking-[0.1em] uppercase opacity-50 max-w-[200px] mx-auto">
                                Conflict-free, sustainable mining partnerships.
                            </p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex flex-col items-center gap-6 group">
                        <div className="w-16 h-16 rounded-full bg-[#b5a16d]/10 flex items-center justify-center group-hover:bg-[#b5a16d]/20 transition-colors duration-500">
                            <Gem className="w-8 h-8 text-[#b5a16d]" strokeWidth={1} />
                        </div>
                        <div>
                            <h3 className="text-lg font-serif mb-2 tracking-wide">Master Cutters</h3>
                            <p className="text-xs tracking-[0.1em] uppercase opacity-50 max-w-[200px] mx-auto">
                                Precision artistry to maximize brilliance.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TrustSection;
