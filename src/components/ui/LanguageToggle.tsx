"use client";

import type { Language } from "@/lib/locales";

interface LanguageToggleProps {
    language: Language;
    toggle: () => void;
}

export function LanguageToggle({ language, toggle }: LanguageToggleProps) {
    return (
        <button
            onClick={toggle}
            aria-label={language === "en" ? "Switch to Chinese" : "Switch to English"}
            className="flex items-center gap-1 text-[11px] font-medium tracking-widest transition-colors duration-300 cursor-pointer"
        >
            <span
                style={{
                    color: language === "zh" ? "var(--color-text)" : "var(--color-text-secondary)",
                    transition: "color 300ms",
                }}
            >
                ZH
            </span>
            <span style={{ color: "var(--color-text-tertiary)" }}>/</span>
            <span
                style={{
                    color: language === "en" ? "var(--color-text)" : "var(--color-text-secondary)",
                    transition: "color 300ms",
                }}
            >
                EN
            </span>
        </button>
    );
}
