"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sun } from "lucide-react";
import { TodoItem } from "./TodoItem";
import type { Todo } from "@/types/todo";

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
    if (todos.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
            >
                <div
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--color-empty-icon-bg)" }}
                >
                    <Sun className="h-7 w-7" style={{ color: "var(--color-text-tertiary)" }} />
                </div>
                <p className="text-[15px] font-medium" style={{ color: "var(--color-text-secondary)" }}>
                    All caught up!
                </p>
                <p className="mt-1 text-[13px]" style={{ color: "var(--color-text-tertiary)" }}>
                    Enjoy your day.
                </p>
            </motion.div>
        );
    }

    return (
        <div style={{ borderColor: "var(--color-divider)" }}>
            <AnimatePresence mode="popLayout" initial={false}>
                {todos.map((todo, i) => (
                    <div
                        key={todo.id}
                        style={i > 0 ? { borderTop: "1px solid var(--color-divider)" } : undefined}
                    >
                        <TodoItem
                            todo={todo}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
}
