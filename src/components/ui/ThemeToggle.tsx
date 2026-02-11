"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
    isDark: boolean;
    toggle: () => void;
}

export function ThemeToggle({ isDark, toggle }: ThemeToggleProps) {
    return (
        <button
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-colors duration-300 cursor-pointer"
            style={{
                backgroundColor: "var(--color-toggle-bg)",
                border: "1px solid var(--color-toggle-border)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-toggle-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-toggle-bg)")}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDark ? "sun" : "moon"}
                    initial={{ scale: 0.6, rotate: 90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.6, rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {isDark ? (
                        <Sun size={18} style={{ color: "var(--color-toggle-icon)" }} />
                    ) : (
                        <Moon size={18} style={{ color: "var(--color-toggle-icon)" }} />
                    )}
                </motion.div>
            </AnimatePresence>
        </button>
    );
}
