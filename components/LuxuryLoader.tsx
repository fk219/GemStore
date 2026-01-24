"use client";

import React from 'react';

const LuxuryLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]/95 backdrop-blur-md transition-opacity duration-700">
            <div className="flex flex-col items-center">
                {/* Geometric Gem Container */}
                <div className="relative w-24 h-24 mb-12">

                    {/* Ring 1 - Outer Spinner */}
                    <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_8s_linear_infinite]" />

                    {/* Ring 2 - Inner Counter-Spinner */}
                    <div className="absolute inset-4 border border-[#b5a16d]/20 rounded-full animate-[spin_12s_linear_infinite_reverse]" />

                    {/* The Gemstone - CSS Geometric Shape */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-12 h-12 bg-gradient-to-tr from-[#1a1a1a] to-[#0a0a0a] rotate-45 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-hidden">
                            {/* Facet Lines */}
                            <div className="absolute inset-0 border border-white/5" />
                            <div className="absolute w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2 rotate-90" />
                            <div className="absolute w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2" />

                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] animate-[shimmer_2s_infinite_cubic-bezier(0.4,0,0.2,1)]" />
                        </div>
                    </div>
                </div>

                {/* Typography */}
                <div className="text-center space-y-4">
                    <span className="block text-[10px] tracking-[0.5em] uppercase text-[#b5a16d] animate-pulse">Loading</span>
                    <h2 className="text-2xl font-serif italic text-white/80 tracking-widest">
                        L&apos;Éclat
                    </h2>
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </div>
    );
};

export default LuxuryLoader;
