"use client";

import React from 'react';

const ArtOfRefraction: React.FC = () => {
    const [activeStep, setActiveStep] = React.useState<number | null>(null);

    const steps = [
        {
            label: "01 / Sourcing",
            head: "The Unseen",
            text: "We bypass the commercial market, working directly with families who have held mines for generations.",
            image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=2000&auto=format&fit=crop" // Abstract Stone/Dark
        },
        {
            label: "02 / Cutting",
            head: "The Release",
            text: "A gem is not cut to maximize weight, but to release its trapped light. We sacrifice carats for brilliance.",
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2000&auto=format&fit=crop" // Refraction/Light
        },
        {
            label: "03 / Setting",
            head: "The Vessel",
            text: "Architecture that holds light. Minimal metal, maximum exposure. The stone must appear to float.",
            image: "https://images.unsplash.com/photo-1601121141461-9a66106f3681?q=80&w=2000&auto=format&fit=crop" // Abstract Metal/Gold
        }
    ];

    return (
        <section className="min-h-screen py-32 rounded-[40px] md:rounded-[100px] mx-2 md:mx-8 my-12 overflow-hidden relative bg-secondary dark:bg-[#141414] transition-colors duration-1000 group/section">

            {/* Dynamic Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* Default Ambient Background */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ${activeStep === null ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0,50 C20,40 40,60 60,50 S80,40 100,50" fill="none" className="stroke-current text-[#9F8236]" strokeWidth="0.05" />
                        </svg>
                    </div>
                </div>

                {/* Hover Images */}
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeStep === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {/* We use Next.js Image for optimization if imported, but pure img tag here for simplicity in this edit block or assuming Image component availability. I should use Image if imported. I see Image was NOT imported in previous file view. I need to add import or use img. The previous view showed `import React from 'react';`. I will add Image import safely or use <img>. Best to use <img> for guaranteed working in this snippet without full file rewrite, OR better: add the import in a separate edit if I use it. 
                        Actually, replace_file_content replaces a block. I can't easily add top-level import if I target line 6. 
                        Note: BentoGrid had next/image. 
                        I will use standard <img> with object-cover for now to avoid breaking if import is missing, OR simple div bg.
                        User expects quality. `next/image` is better.
                        I'll use `img` tag for safety in this specific tool call unless I replace the whole file. 
                        Let's use `img` with `loading="lazy"`.
                        */}
                        <img
                            src={step.image}
                            alt={step.head}
                            className="w-full h-full object-cover scale-105 transition-transform duration-[10s] ease-linear"
                            style={{ transform: activeStep === index ? 'scale(1.1)' : 'scale(1.0)' }}
                        />
                        <div className="absolute inset-0 bg-[#0A0A0A]/70 backdrop-blur-[2px]" />
                    </div>
                ))}
            </div>

            <div className={`container mx-auto px-6 relative z-10 py-12 md:py-24 transition-colors duration-700 ${activeStep !== null ? 'text-[#FBFBF9]' : 'text-[#1A1A1A] dark:text-[#FBFBF9]'}`}>
                <div className="flex flex-col items-center text-center">
                    <span className="text-[10px] tracking-[0.8em] uppercase mb-12 text-[#9F8236] reveal-text font-sans font-medium">Volume 06 / The Journey</span>

                    <div className="relative mb-24 reveal-image">
                        {/* Abstract Glow - Adaptive */}
                        <div className={`absolute -inset-20 bg-[#9F8236] blur-[100px] rounded-full animate-pulse transition-opacity duration-1000 ${activeStep !== null ? 'opacity-10' : 'opacity-5'}`} />
                        <h2 className="text-6xl md:text-[11rem] font-light serif leading-[0.85] reveal-text transition-colors duration-700">
                            Refined
                        </h2>
                        <h2 className="text-6xl md:text-[11rem] font-light serif leading-[0.85] italic reveal-text text-[#9F8236]">
                            Patience
                        </h2>
                    </div>

                    <p className={`text-2xl md:text-4xl font-light opacity-80 max-w-4xl leading-relaxed serif italic reveal-text transition-colors duration-700 ${activeStep !== null ? 'text-white' : ''}`}>
                        &quot;Every stone passes through a journey of patience, mastery, and quiet perfection.&quot;
                    </p>

                    <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 w-full max-w-6xl text-left border-t border-current/10 pt-16">
                        {steps.map((item, i) => (
                            <div
                                key={i}
                                className="reveal-text group cursor-pointer relative py-8"
                                onMouseEnter={() => setActiveStep(i)}
                                onMouseLeave={() => setActiveStep(null)}
                            >
                                {/* Hover Indicator Line */}
                                <div className={`absolute top-0 left-0 h-px bg-[#9F8236] transition-all duration-500 ${activeStep === i ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />

                                <h3 className={`text-[10px] tracking-[0.4em] uppercase mb-6 font-sans font-medium transition-colors duration-300 ${activeStep === i ? 'text-[#9F8236]' : 'opacity-40'}`}>
                                    {item.label}
                                </h3>
                                <p className={`text-3xl serif mb-4 italic transition-colors duration-300 ${activeStep === i ? 'text-white' : ''}`}>
                                    {item.head}
                                </p>
                                <p className={`text-sm leading-relaxed font-sans max-w-xs transition-opacity duration-300 ${activeStep === i ? 'opacity-90' : 'opacity-60'}`}>
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArtOfRefraction;
