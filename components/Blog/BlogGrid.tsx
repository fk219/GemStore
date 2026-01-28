"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const BlogGrid: React.FC = () => {
    const articles = [
        {
            title: "Why Investment Grade Rubies are Outperforming Gold",
            category: "Market Analysis",
            image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800",
            date: "October 12, 2025"
        },
        {
            title: "The 4 Cs: A Buyer’s Guide to Perfection",
            category: "Education",
            image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800",
            date: "September 28, 2025"
        },
        {
            title: "Caring for your Emeralds: A Gentle Touch",
            category: "Care Guide",
            image: "https://images.unsplash.com/photo-1615111784767-4d7c02783103?auto=format&fit=crop&q=80&w=800",
            date: "September 15, 2025"
        },
        {
            title: "Tracing the Lineage of Royal Sapphires",
            category: "History",
            image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800",
            date: "August 30, 2025"
        }
    ];

    return (
        <section className="py-24 px-6 md:px-12 bg-[#F9F8F4] dark:bg-[#0A0A0B] text-[#1A1A1A] dark:text-[#FBFBF9]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {articles.map((article, index) => (
                        <Link href="/blog/article" key={index} className="group cursor-pointer">
                            <div className="relative aspect-[16/10] overflow-hidden mb-8">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-white">
                                    {article.category}
                                </div>
                            </div>

                            <div className="flex justify-between items-start border-t border-current/10 pt-6">
                                <div className="max-w-xl">
                                    <span className="block text-[10px] tracking-[0.2em] uppercase opacity-40 mb-3">{article.date}</span>
                                    <h2 className="text-2xl md:text-3xl font-serif font-light leading-tight group-hover:text-[#b5a16d] transition-colors duration-300">
                                        {article.title}
                                    </h2>
                                </div>
                                <div className="w-8 h-8 rounded-full border border-current/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogGrid;
