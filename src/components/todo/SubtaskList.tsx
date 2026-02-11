"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import type { Subtask } from "@/types/todo";

interface SubtaskListProps {
    parentId: string;
    subtasks: Subtask[];
    onAdd: (parentId: string, text: string) => void;
    onToggle: (parentId: string, subtaskId: string) => void;
    onDelete: (parentId: string, subtaskId: string) => void;
    placeholder: string;
}

export function SubtaskList({ parentId, subtasks, onAdd, onToggle, onDelete, placeholder }: SubtaskListProps) {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = useCallback(() => {
        if (inputValue.trim()) {
            onAdd(parentId, inputValue.trim());
            setInputValue("");
        }
    }, [inputValue, parentId, onAdd]);

    return (
        <>
            <style>{`
                .subtask-indent-custom {
                    margin-left: 3.5rem;
                }
                @media (min-width: 768px) {
                    .subtask-indent-custom {
                        margin-left: 9rem;
                    }
                }
            `}</style>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="overflow-hidden subtask-indent-custom"
            >
                <div
                    className="pl-4 mt-1 mb-2 border-l-2 border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-colors duration-300"
                >
                    {/* Subtask items */}
                    <AnimatePresence initial={false}>
                        {subtasks.map((subtask) => (
                            <motion.div
                                key={subtask.id}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -12, transition: { duration: 0.15 } }}
                                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                className="group/sub flex items-center gap-3 py-1.5"
                            >
                                <Checkbox
                                    checked={subtask.completed}
                                    onChange={() => onToggle(parentId, subtask.id)}
                                    id={`subtask-${subtask.id}`}
                                    size="sm"
                                />
                                <span
                                    className="flex-1 text-[13px] font-normal leading-snug transition-all duration-200"
                                    style={{
                                        color: subtask.completed ? "var(--color-text-tertiary)" : "var(--color-text-secondary)",
                                        textDecoration: subtask.completed ? "line-through" : "none",
                                        textDecorationColor: subtask.completed ? "var(--color-border)" : undefined,
                                    }}
                                >
                                    {subtask.text}
                                </span>
                                <button
                                    onClick={() => onDelete(parentId, subtask.id)}
                                    aria-label={`Delete subtask "${subtask.text}"`}
                                    className="opacity-0 group-hover/sub:opacity-100 flex items-center justify-center h-5 w-5 rounded-full transition-all duration-150 cursor-pointer"
                                    style={{ color: "var(--color-text-tertiary)" }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "var(--color-danger)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "var(--color-text-tertiary)";
                                    }}
                                >
                                    <X size={13} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Inline add input */}
                    <div className="flex items-center gap-3 py-1.5 opacity-60 focus-within:opacity-100 transition-opacity duration-200">
                        <div
                            className="flex items-center justify-center h-4 w-4"
                            style={{ color: "var(--color-text-quaternary)" }}
                        >
                            <Plus size={14} />
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSubmit();
                            }}
                            placeholder={placeholder}
                            className="flex-1 bg-transparent text-[13px] font-normal outline-none placeholder:text-[var(--color-text-quaternary)]"
                            style={{ color: "var(--color-text-secondary)" }}
                        />
                    </div>
                </div>
            </motion.div>
        </>
    );
}
