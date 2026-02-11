"use client";

import { useState, useEffect, useCallback } from "react";
import type { Language } from "@/lib/locales";

const STORAGE_KEY = "lang";

export function useLanguage() {
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "zh" || stored === "en") {
            setLanguage(stored);
        }
    }, []);

    const toggle = useCallback(() => {
        setLanguage((prev) => {
            const next = prev === "en" ? "zh" : "en";
            localStorage.setItem(STORAGE_KEY, next);
            return next;
        });
    }, []);

    return { language, toggle };
}
