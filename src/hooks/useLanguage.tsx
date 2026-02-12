"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Language } from "@/lib/locales";

interface LanguageContextType {
    language: Language;
    toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "zh" || stored === "en") {
            setLanguage(stored);
        }
        setIsLoaded(true);
    }, []);

    const toggle = useCallback(() => {
        setLanguage((prev) => {
            const next = prev === "en" ? "zh" : "en";
            localStorage.setItem(STORAGE_KEY, next);
            return next;
        });
    }, []);

    return (
        <LanguageContext.Provider value={{ language, toggle }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
