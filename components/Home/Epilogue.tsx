"use client";

import React from 'react';
import Link from 'next/link';

const Epilogue: React.FC = () => {
    return (
        <section className="py-48 flex flex-col items-center justify-center text-center px-6 bg-[#FBFBF9] dark:bg-[#050505] text-[#1A1A1A] dark:text-[#FBFBF9]">
            <div className="reveal-text">
                <div className="w-px h-24 bg-current opacity-20 mb-12 mx-auto" />
                <p className="text-xs tracking-[0.8em] uppercase opacity-40 mb-16 font-sans font-light">The Invitation</p>
                <h2 className="text-5xl md:text-8xl font-light serif max-w-5xl mx-auto leading-[1.1] mb-12">
                    Rare things are not <br /> <span className="italic opacity-50">found</span> often.
                </h2>
                <Link href="/book" className="inline-block border-b border-current pb-2 text-sm tracking-[0.4em] uppercase hover:opacity-50 transition-opacity">
                    Request Private Viewing
                </Link>
            </div>
        </section>
    );
};

export default Epilogue;
