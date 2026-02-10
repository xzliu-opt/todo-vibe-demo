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
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f7]">
                    <Sun className="h-7 w-7 text-[#aeaeb2]" />
                </div>
                <p className="text-[15px] font-medium text-[#86868b]">All caught up!</p>
                <p className="mt-1 text-[13px] text-[#aeaeb2]">Enjoy your day.</p>
            </motion.div>
        );
    }

    return (
        <div className="divide-y divide-[#e8e8ed]/60">
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
