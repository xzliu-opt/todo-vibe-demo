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
                className="flex flex-col items-center justify-center py-16 text-center"
            >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50">
                    <Sun className="h-7 w-7 text-amber-400" />
                </div>
                <p className="text-sm font-medium text-gray-500">All caught up!</p>
                <p className="mt-1 text-xs text-gray-400">Enjoy your day.</p>
            </motion.div>
        );
    }

    return (
        <div className="divide-y divide-gray-100">
            <AnimatePresence mode="popLayout" initial={false}>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
