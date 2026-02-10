"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
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
            className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-gray-50/80"
        >
            <Checkbox
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                id={`todo-checkbox-${todo.id}`}
            />

            <span
                className={`
          flex-1 text-sm leading-relaxed transition-all duration-300
          ${todo.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-800"
                    }
        `}
            >
                {todo.text}
            </span>

            <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(todo.id)}
                aria-label={`Delete "${todo.text}"`}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
                <Trash2 className="h-3.5 w-3.5" />
            </Button>
        </motion.div>
    );
}
