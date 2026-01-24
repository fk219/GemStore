import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import IntroSequence from "@/components/IntroSequence";
import Marquee from "@/components/Marquee";

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
    variable: "--font-jakarta",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Timeless Craft | Rare by Nature",
    description: "A curated collection of nature's rarest gems, refined by vision.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
            <body
                className="antialiased font-sans transition-colors duration-700"
            >
                <Providers>
                    <SmoothScroll />
                    <CustomCursor />
                    <IntroSequence />
                    <Marquee />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
