export type Locale = 'EN' | 'FR' | 'IT';

export interface TranslationStrings {
    heroTitle: string;
    heroSub: string;
    aboutBrand: string;
    aboutSub: string;
    craftsmanshipTitle: string;
    craftsmanshipSub: string;
    collectionsTitle: string;
    collectionsSub: string;
    ctaTitle: string;
    ctaButton: string;
    contactTitle: string;
    footerTagline: string;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: TranslationStrings;
}
