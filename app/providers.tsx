"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Theme, ThemeContextType, Locale, LanguageContextType } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/constants';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function Providers({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [locale, setLocale] = useState<Locale>('EN');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        if (mounted) {
            document.body.className = theme === 'dark'
                ? 'bg-[#0F0F0F] text-[#FBFBF9] dark'
                : 'bg-[#FBFBF9] text-[#1A1A1A]';
        }
    }, [theme, mounted]);

    const valueLanguage = {
        locale,
        setLocale,
        t: TRANSLATIONS[locale]
    };

    const valueTheme = {
        theme,
        toggleTheme
    };

    // Prevent hydration mismatch by returning null or consistent initial state
    if (!mounted) {
        return (
            <body className="bg-[#FBFBF9] text-[#1A1A1A]">
                {children}
            </body>
        );
    }

    return (
        <ThemeContext.Provider value={valueTheme}>
            <LanguageContext.Provider value={valueLanguage}>
                {children}
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    );
}
