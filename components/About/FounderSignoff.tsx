"use client";

import React from 'react';

const FounderSignoff: React.FC = () => {
    return (
        <section className="py-48 px-6 md:px-24 flex justify-end">
            <div className="max-w-xl text-right reveal">
                <p className="text-2xl md:text-4xl serif italic leading-relaxed mb-8 font-light">
                    &quot;We are merely temporary custodians of these eternal objects.&quot;
                </p>
                <div className="font-serif italic text-6xl opacity-30 my-8">Alexander.</div>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] opacity-40">Alexander V. — Founder</p>
            </div>
        </section>
    );
};

export default FounderSignoff;
