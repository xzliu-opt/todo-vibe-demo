"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface NoteOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (notes: string) => void;
    initialNotes: string;
}

export function NoteOverlay({ isOpen, onClose, onSave, initialNotes }: NoteOverlayProps) {
    const [notes, setNotes] = useState(initialNotes);
    const { language } = useLanguage();

    // Using a ref to track if changes were made to avoid unnecessary saves
    const hasChanged = useRef(false);
    const prevIsOpen = useRef(isOpen);

    useEffect(() => {
        if (isOpen && !prevIsOpen.current) {
            setNotes(initialNotes);
            hasChanged.current = false;
        }
        prevIsOpen.current = isOpen;
    }, [isOpen, initialNotes]);

    // Auto-save on unmount or when closing
    useEffect(() => {
        return () => {
            if (hasChanged.current) {
                onSave(notes);
            }
        };
    }, [notes, onSave]);

    // Debounced auto-save while typing
    useEffect(() => {
        const timer = setTimeout(() => {
            if (hasChanged.current) {
                onSave(notes);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [notes, onSave]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
        hasChanged.current = true;
    };

    const handleClose = () => {
        if (hasChanged.current) {
            onSave(notes);
            hasChanged.current = false;
        }
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm dark:bg-black/40"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                            className="w-full max-w-md pointer-events-auto"
                        >
                            <div
                                className="relative flex flex-col overflow-hidden rounded-[24px]"
                                style={{
                                    backgroundColor: "var(--color-surface)",
                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
                                    border: "1px solid var(--color-border-light)",
                                    backdropFilter: "blur(40px)",
                                    WebkitBackdropFilter: "blur(40px)",
                                }}
                            >
                                {/* Header */}
                                <div className="relative grid grid-cols-[1fr_auto_1fr] items-center px-6 pt-5 pb-2">
                                    <div className="pointer-events-none" /> {/* Spacer */}

                                    <span
                                        className="text-[11px] font-medium uppercase tracking-[0.15em] text-center"
                                        style={{ color: "var(--color-text-secondary)" }}
                                    >
                                        {language === 'zh' ? '详情' : 'Details'}
                                    </span>

                                    <div className="flex justify-end">
                                        <button
                                            onClick={handleClose}
                                            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                                            style={{ color: "var(--color-text-secondary)" }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Editor */}
                                <div className="flex-1 p-6 pt-2">
                                    <textarea
                                        value={notes}
                                        onChange={handleChange}
                                        placeholder={language === 'zh' ? "记录你的碎片灵感..." : "Capture your thoughts..."}
                                        className="h-[300px] w-full resize-none bg-transparent text-[15px] leading-relaxed outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                        style={{ color: "var(--color-text)" }}
                                        autoFocus
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
