"use client";

import React, { useContext, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { LanguageContext } from '@/app/providers';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import gsap from 'gsap';

export default function BookingPage() {
    const langCtx = useContext(LanguageContext);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        interest: 'Acquisition',
        message: ''
    });

    // Refs for animation
    const infoRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(infoRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 });
            gsap.fromTo(formRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.4 });
        });
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate "Concierge" processing
        setTimeout(() => setStep(2), 800);
    };

    if (!langCtx) return null;

    return (
        <main className="min-h-screen bg-[#FBFBF9] dark:bg-[#050505] text-[#1A1A1A] dark:text-[#FBFBF9] transition-colors duration-1000 overflow-hidden">
            <Navbar />

            <section className="pt-32 pb-12 px-6 md:px-24 flex flex-col md:flex-row min-h-screen items-center">

                {/* Left: Contact Info - Minimal */}
                <div ref={infoRef} className="w-full md:w-1/2 flex flex-col justify-center mb-16 md:mb-0 md:pr-24 relative z-10">
                    <span className="text-[10px] tracking-[0.6em] uppercase opacity-40 mb-8 border-l border-current pl-4">Concierge</span>
                    <h1 className="text-5xl md:text-8xl font-light serif leading-[0.9] mb-12">
                        Private <br /> <span className="italic opacity-50">Viewing</span>
                    </h1>
                    <p className="text-lg md:text-xl opacity-60 font-light font-serif italic max-w-md mb-12">
                        &quot;For those who understand that acquiring a rare stone is not a transaction, but an initiation.&quot;
                    </p>

                    <div className="space-y-8 opacity-70 font-sans font-light tracking-wide text-sm hidden md:block">
                        <div>
                            <p className="uppercase text-[10px] tracking-[0.4em] opacity-50 mb-2">Genèva</p>
                            <p>Quai des Bergues 33</p>
                            <p>+41 22 731 29 00</p>
                        </div>
                        <div>
                            <p className="uppercase text-[10px] tracking-[0.4em] opacity-50 mb-2">Email</p>
                            <p className="border-b border-current inline-block pb-1">concierge@t-craft.com</p>
                        </div>
                    </div>
                </div>

                {/* Right: The Form - Handwritten Style */}
                <div ref={formRef} className="w-full md:w-1/2 relative">
                    {/* Abstract Glow */}
                    <div className="absolute -inset-20 bg-gradient-to-tr from-zinc-200/40 to-transparent dark:from-zinc-900/40 rounded-[40px] blur-3xl -z-10 animate-pulse pointer-events-none" />

                    {step === 1 ? (
                        <form onSubmit={handleSubmit} className="space-y-12 p-8 md:p-16 border border-zinc-200 dark:border-zinc-800 rounded-[2px] bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-lg">
                            <div className="space-y-2 group">
                                <label className="text-[10px] uppercase tracking-[0.3em] opacity-40 block group-focus-within:text-amber-600 transition-colors">Name / Identity</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Your full name"
                                    className="w-full bg-transparent outline-none text-xl md:text-3xl font-light font-serif italic placeholder:opacity-20 border-b border-current/20 pb-4 focus:border-current transition-colors"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-[10px] uppercase tracking-[0.3em] opacity-40 block group-focus-within:text-amber-600 transition-colors">Electronic Contact</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="Email address"
                                    className="w-full bg-transparent outline-none text-xl md:text-3xl font-light font-serif italic placeholder:opacity-20 border-b border-current/20 pb-4 focus:border-current transition-colors"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-[10px] uppercase tracking-[0.3em] opacity-40 block group-focus-within:text-amber-600 transition-colors">Nature of Inquiry</label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-transparent outline-none text-xl md:text-3xl font-light font-serif italic border-b border-current/20 pb-4 appearance-none cursor-pointer focus:border-current transition-colors"
                                        value={formData.interest}
                                        onChange={e => setFormData({ ...formData, interest: e.target.value })}
                                    >
                                        <option className="bg-zinc-100 dark:bg-zinc-900 text-base not-italic">Acquisition</option>
                                        <option className="bg-zinc-100 dark:bg-zinc-900 text-base not-italic">Private Commission</option>
                                        <option className="bg-zinc-100 dark:bg-zinc-900 text-base not-italic">Appraisal</option>
                                        <option className="bg-zinc-100 dark:bg-zinc-900 text-base not-italic">Press Inquiry</option>
                                    </select>
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs opacity-40 pointer-events-none">▼</span>
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-[10px] uppercase tracking-[0.3em] opacity-40 block group-focus-within:text-amber-600 transition-colors">Vision</label>
                                <textarea
                                    placeholder="Tell us about what you are looking for..."
                                    rows={1}
                                    className="w-full bg-transparent outline-none text-xl md:text-3xl font-light font-serif italic placeholder:opacity-20 border-b border-current/20 pb-4 resize-none focus:border-current transition-colors"
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <div className="pt-12 text-right">
                                <button
                                    type="submit"
                                    className="text-[10px] tracking-[0.4em] uppercase border border-current px-12 py-4 hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-[#FBFBF9] dark:hover:text-black transition-all duration-500"
                                >
                                    Request Access
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-16 border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm animate-pulse-slow">
                            <span className="text-6xl mb-8">✦</span>
                            <h2 className="text-3xl md:text-5xl font-light serif mb-8 italic">Request Received.</h2>
                            <p className="text-lg opacity-60 leading-relaxed max-w-xs mb-12 font-serif">
                                &quot;We will review your inquiry with discretion.&quot;
                            </p>
                            <button
                                onClick={() => setStep(1)}
                                className="text-[9px] tracking-[0.4em] uppercase border-b border-zinc-500 pb-1 hover:text-amber-600 transition-colors"
                            >
                                Return
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
