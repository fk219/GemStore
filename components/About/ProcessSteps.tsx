"use client";

import React from "react";

const ProcessSteps: React.FC = () => {
    const steps = [
        { id: "01", title: "Sourcing", desc: "Ethical extraction from the world's most remote mines." },
        { id: "02", title: "Cutting", desc: "Precision artistry revealing the soul of the stone." },
        { id: "03", title: "Certification", desc: "Verified by GIA and guaranteed conflict-free." },
        { id: "04", title: "Delivery", desc: "Secure, white-glove service to your private vault." }
    ];

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#EAE8E3] dark:bg-[#111] text-[#1A1A1A] dark:text-[#FBFBF9]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 md:mb-24">
                    <span className="text-[10px] tracking-[0.4em] uppercase opacity-40 block mb-4">The Process</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-light">From Earth to Eternity</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-0 right-0 h-px bg-current opacity-20 w-full" />

                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            <div className="w-20 h-20 rounded-full border border-current/10 bg-[#EAE8E3] dark:bg-[#111] flex items-center justify-center mb-8 relative z-10 group-hover:border-[#b5a16d] transition-colors duration-500">
                                <span className="font-serif italic text-xl text-[#b5a16d]">{step.id}</span>
                            </div>
                            <h3 className="text-xl font-serif mb-4 group-hover:text-[#b5a16d] transition-colors duration-300">{step.title}</h3>
                            <p className="text-sm opacity-60 font-light leading-relaxed max-w-[200px]">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSteps;
