import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['var(--font-playfair)', 'serif'],
                sans: ['var(--font-jakarta)', 'sans-serif'],
            },
            fontSize: {
                "display-1": ["clamp(2.75rem, 6vw, 4.5rem)", { lineHeight: "1" }],
                "display-2": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.05" }],
                "title": ["1.5rem", { lineHeight: "1.2" }],
                "body": ["1rem", { lineHeight: "1.7" }],
                "eyebrow": ["0.625rem", { lineHeight: "1.6", letterSpacing: "0.32em", textTransform: "uppercase" }],
            },
            borderRadius: {
                xs: "var(--radius-xs)",
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    darkMode: 'class',
    plugins: [],
};
export default config;
