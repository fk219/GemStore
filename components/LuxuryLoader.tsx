"use client";

import React from 'react';

const LuxuryLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]/80 backdrop-blur-[10px] transition-opacity duration-700">
            <div className="flex flex-col items-center justify-center relative">

                {/* The Rotating Gem Container */}
                <div className="relative w-16 h-16">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-amber-200/20 blur-[30px] rounded-full animate-pulse" />

                    {/* The Gem Shape */}
                    <div className="relative w-full h-full bg-gradient-to-br from-[#E2E2E2] to-[#999] rotate-45 rounded-[4px] overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-[spin_4s_linear_infinite]">

                        {/* Internal Facets (Lines) */}
                        <div className="absolute inset-0 border-[0.5px] border-black/10" />
                        <div className="absolute inset-2 border-[0.5px] border-black/10" />

                        {/* The Refraction Gradient Mask */}
                        {/* This simulates light passing through the stone */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent w-[200%] h-[200%] -translate-x-[50%] -translate-y-[50%] animate-[refract_3s_ease-in-out_infinite]" />
                    </div>
                </div>

                {/* Loading Text */}
                <div className="mt-12 text-center">
                    <span className="text-[10px] tracking-[0.4em] uppercase text-[#FBFBF9]/60 font-serif">Loading</span>
                </div>
            </div>

            <style jsx>{`
                @keyframes refract {
                    0% { transform: translate(-100%, -100%) rotate(0deg); opacity: 0.5; }
                    50% { opacity: 1; }
                    100% { transform: translate(50%, 50%) rotate(0deg); opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

export default LuxuryLoader;
