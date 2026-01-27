"use client";

import React, { forwardRef } from 'react';

const ContactInfo = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div ref={ref} className="w-full md:w-1/2 flex flex-col justify-center mb-16 md:mb-0 md:pr-24 relative z-10">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-sans font-medium opacity-40 mb-8 border-l border-current pl-4">Concierge</span>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light serif leading-[0.9] mb-12">
                Private <br /> <span className="italic opacity-50">Viewing</span>
            </h1>
            <p className="text-[1rem] md:text-[1.25rem] opacity-60 font-light font-serif italic max-w-md mb-12">
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
    );
});

ContactInfo.displayName = "ContactInfo";

export default ContactInfo;
