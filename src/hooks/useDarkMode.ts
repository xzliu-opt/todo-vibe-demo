"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "flow-dark-mode";

export function useDarkMode() {
    const [isDark, setIsDark] = useState(false);

    // Initialize from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === "true") {
                document.documentElement.classList.add("dark");
                setIsDark(true);
            }
        } catch {
            // localStorage unavailable
        }
    }, []);

    const toggle = useCallback(() => {
        const html = document.documentElement;
        const dark = html.classList.toggle("dark");
        setIsDark(dark);
        try {
            localStorage.setItem(STORAGE_KEY, String(dark));
        } catch {
            // localStorage unavailable
        }
    }, []);

    return { isDark, toggle };
}
