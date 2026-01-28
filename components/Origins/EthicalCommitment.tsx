"use client";

import React from "react";

const EthicalCommitment: React.FC = () => {
    return (
        <section className="py-24 px-6 md:px-24 bg-white dark:bg-[#050505] text-[#1A1A1A] dark:text-[#FBFBF9] border-t border-black/5 dark:border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                <span className="block w-12 h-px bg-[#b5a16d] mx-auto mb-12" />
                <h2 className="text-2xl md:text-3xl font-serif font-light mb-8 italic">
                    &quot;Beauty without conscience is merely decoration.&quot;
                </h2>
                <p className="text-sm md:text-base font-light leading-relaxed opacity-70 max-w-2xl mx-auto">
                    We adhere strictly to the Kimberley Process and maintain direct relationships with artisanal miners to ensure every stone is conflict-free and ethically unearthed. Our commitment extends beyond the stone to the communities that bring them to light.
                </p>
            </div>
        </section>
    );
};

export default EthicalCommitment;
