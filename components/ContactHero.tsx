"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

const ContactHero = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const subRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(imageRef.current,
            { scale: 1.2, opacity: 0 },
            { scale: 1, opacity: 1, duration: 2 }
        )
            .fromTo(textRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" },
                "-=1.5"
            )
            .fromTo(subRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=1"
            );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[70vh] w-full overflow-hidden bg-[#0F0F0F] text-[#FBFBF9] flex items-center justify-center">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div ref={imageRef} className="relative w-full h-full opacity-0">
                    <Image
                        src="https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=2000" // Abstract dark texture
                        alt="Contact Texture"
                        fill
                        className="object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <span ref={subRef} className="block text-[10px] tracking-[0.8em] uppercase opacity-0 mb-8 font-sans font-light">
                    The Concierge
                </span>
                <h1 ref={textRef} className="text-6xl md:text-9xl font-light serif italic opacity-0 mix-blend-difference">
                    Private Viewing
                </h1>
            </div>
        </section>
    );
};

export default ContactHero;
