"use client";

import React, { useContext, useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeContext, LanguageContext } from '@/app/providers';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Mock Data - The Vault
const ARCHIVE_ITEMS = [
    {
        id: "001",
        name: "The Royal Kashmir",
        carat: "8.42 CT",
        origin: "Kashmir, India",
        price: "Price upon Request",
        image: "https://images.unsplash.com/photo-1615486511484-92e57bb6eb64?auto=format&fit=crop&q=80&w=1200", // Sapphire
        type: "Sapphire",
        status: "Available"
    },
    {
        id: "002",
        name: "Crimson Star",
        carat: "5.12 CT",
        origin: "Mogok, Burma",
        price: "Sold",
        image: "https://images.unsplash.com/photo-1617058866388-7509f9a74797?auto=format&fit=crop&q=80&w=1200", // Ruby
        type: "Ruby",
        status: "Archived"
    },
    {
        id: "003",
        name: "Verdant Prism",
        carat: "12.05 CT",
        origin: "Muzo, Colombia",
        price: "Reserved",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200", // Emerald
        type: "Emerald",
        status: "Reserved"
    },
    {
        id: "004",
        name: "Light of Sierra",
        carat: "15.00 CT",
        origin: "Sierra Leone",
        price: "Price upon Request",
        image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=1200",
        type: "Diamond",
        status: "Available"
    },
    {
        id: "005",
        name: "The Midnight Eye",
        carat: "4.20 CT",
        origin: "Lightning Ridge, Australia",
        price: "Available",
        image: "https://images.unsplash.com/photo-1587588354456-ae376af71a25?auto=format&fit=crop&q=80&w=1200", // Opal substitute
        type: "Opal",
        status: "Available"
    }
];

export default function Gemstones() {
    const themeCtx = useContext(ThemeContext);
    const langCtx = useContext(LanguageContext);

    // State for filtering
    const [filter, setFilter] = useState("All");

    // Refs for animation
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
            );

            // Wait a tick for DOM to settle if needed, but here simple stagger works
            gsap.fromTo(".archive-row",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 90%"
                    }
                }
            );
        });
        return () => ctx.revert();
    }, [filter]); // Re-run anim when filter changes if we wanted, though React might unmount rows.

    const filteredItems = filter === "All" ? ARCHIVE_ITEMS : ARCHIVE_ITEMS.filter(item => item.type === filter);
    const textColorClass = "text-[#1A1A1A] dark:text-[#FBFBF9]";
    const bgClass = "bg-[#FBFBF9] dark:bg-[#050505]";

    return (
        <main className={`min-h-screen ${bgClass} ${textColorClass} selection:bg-[#b5a16d] selection:text-white`}>
            <Navbar />

            {/* Header */}
            <section ref={headerRef} className="pt-48 pb-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] tracking-[0.6em] uppercase opacity-40 mb-8 border px-4 py-2 rounded-full border-current">Inventory</span>
                <h1 className="text-6xl md:text-[10vw] font-light serif leading-[0.8] mb-12">
                    The Vault
                </h1>
                <p className="text-xl font-light opacity-60 font-serif italic max-w-2xl">
                    &quot;A curated selection of the world&apos;s most significant geological artifacts.&quot;
                </p>

                {/* Minimal Filter */}
                <div className="flex gap-8 mt-24 text-xs tracking-[0.2em] uppercase opacity-70 overflow-x-auto max-w-full pb-4 scrollbar-hide justify-center">
                    {["All", "Sapphire", "Ruby", "Emerald", "Diamond"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`pb-2 border-b transition-all ${filter === f ? 'border-current opacity-100' : 'border-transparent opacity-40 hover:opacity-100'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </section>

            {/* Archive List View */}
            <section ref={gridRef} className="pb-48 px-4 md:px-12 max-w-[1800px] mx-auto min-h-[50vh]">
                <div className="w-full">
                    {/* Header Row */}
                    <div className="hidden md:grid grid-cols-12 pb-6 border-b border-zinc-200 dark:border-zinc-800 opacity-40 text-[10px] uppercase tracking-[0.3em]">
                        <div className="col-span-1">Ref</div>
                        <div className="col-span-4">Designation</div>
                        <div className="col-span-2">Origin</div>
                        <div className="col-span-2">Weight</div>
                        <div className="col-span-2 text-right">Status</div>
                        <div className="col-span-1 text-right">Action</div>
                    </div>

                    {/* Rows */}
                    {filteredItems.map((item, index) => (
                        <div key={item.id} className="archive-row group relative border-b border-zinc-100 dark:border-zinc-900 overflow-hidden">
                            {/* Hover Reveal Image Background */}
                            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none mix-blend-multiply dark:mix-blend-overlay">
                                <Image
                                    src={item.image}
                                    fill
                                    alt={item.name}
                                    className="object-cover grayscale opacity-20"
                                />
                            </div>

                            <a href={`/book?gem=${item.name}`} className="relative z-10 grid md:grid-cols-12 items-center py-8 md:py-12 cursor-pointer transition-all hover:bg-zinc-50/0 dark:hover:bg-zinc-900/0">
                                <div className="col-span-1 text-xs opacity-30 font-sans tracking-widest">#{item.id}</div>
                                <div className="col-span-11 md:col-span-4 flex items-center gap-6">
                                    <div className="w-16 h-16 relative overflow-hidden rounded-sm md:hidden shrink-0">
                                        <Image src={item.image} fill className="object-cover" alt={item.name} />
                                    </div>
                                    <h3 className="text-2xl md:text-4xl serif font-light italic group-hover:translate-x-4 transition-transform duration-500">{item.name}</h3>
                                </div>
                                <div className="hidden md:block col-span-2 text-sm opacity-60 font-sans tracking-wide">{item.origin}</div>
                                <div className="hidden md:block col-span-2 serif text-xl">{item.carat}</div>
                                <div className="hidden md:block col-span-2 text-right">
                                    <span className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${item.status === 'Available' ? 'border-green-900/20 text-green-700 dark:text-green-400' : 'border-zinc-500/20 opacity-50'}`}>
                                        {item.status}
                                    </span>
                                </div>
                                <div className="hidden md:col-span-1 text-right md:flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-2xl font-serif italic flex items-center gap-2">Inquire <span className="not-italic text-sm">→</span></span>
                                </div>
                            </a>
                        </div>
                    ))}

                    {filteredItems.length === 0 && (
                        <div className="py-32 text-center opacity-40 uppercase tracking-widest text-xs">
                            No artifacts found in this category.
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
