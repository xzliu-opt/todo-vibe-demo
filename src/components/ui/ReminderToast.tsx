"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";

interface ReminderToastProps {
    text: string | null;
    label: string;
    onDismiss: () => void;
}

export function ReminderToast({ text, label, onDismiss }: ReminderToastProps) {
    // Auto-dismiss after 6 seconds
    useEffect(() => {
        if (!text) return;
        const timer = setTimeout(onDismiss, 6000);
        return () => clearTimeout(timer);
    }, [text, onDismiss]);

    return (
        <AnimatePresence>
            {text && (
                <motion.div
                    initial={{ opacity: 0, y: -40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 rounded-2xl px-5 py-3.5"
                    style={{
                        backgroundColor: "var(--color-surface)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid var(--color-border-light)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                    }}
                >
                    <div
                        className="flex items-center justify-center h-8 w-8 rounded-full"
                        style={{ backgroundColor: "rgba(59,130,246,0.12)" }}
                    >
                        <Bell size={16} style={{ color: "#3b82f6" }} />
                    </div>
                    <div className="flex flex-col">
                        <span
                            className="text-[10px] font-semibold uppercase tracking-[0.15em]"
                            style={{ color: "#3b82f6" }}
                        >
                            {label}
                        </span>
                        <span
                            className="text-[15px] font-medium"
                            style={{ color: "var(--color-text)" }}
                        >
                            {text}
                        </span>
                    </div>
                    <button
                        onClick={onDismiss}
                        className="ml-3 text-[18px] leading-none cursor-pointer transition-opacity duration-150"
                        style={{ color: "var(--color-text-tertiary)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        aria-label="Dismiss"
                    >
                        ×
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
