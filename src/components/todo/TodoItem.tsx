"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import type { Todo } from "@/types/todo";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="group flex items-center gap-4 rounded-2xl px-4 py-4 transition-colors"
            style={{ ["--hover-bg" as string]: "var(--color-item-hover)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-item-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
            <Checkbox
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                id={`todo-checkbox-${todo.id}`}
            />

            <span
                className="flex-1 text-[19px] font-normal leading-relaxed transition-all duration-300"
                style={{
                    color: todo.completed ? "var(--color-text-tertiary)" : "var(--color-text)",
                    textDecoration: todo.completed ? "line-through" : "none",
                    textDecorationColor: todo.completed ? "var(--color-border)" : undefined,
                }}
            >
                {todo.text}
            </span>

            <button
                onClick={() => onDelete(todo.id)}
                aria-label={`Delete "${todo.text}"`}
                className="opacity-0 group-hover:opacity-100 flex items-center justify-center h-8 w-8 rounded-full transition-all duration-200 cursor-pointer"
                style={{ color: "var(--color-text-tertiary)" }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-danger)";
                    e.currentTarget.style.backgroundColor = "var(--color-danger-bg)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-tertiary)";
                    e.currentTarget.style.backgroundColor = "transparent";
                }}
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </motion.div>
    );
}
