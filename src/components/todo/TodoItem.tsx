"use client";

import { motion } from "framer-motion";
import { GripVertical, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@/components/ui/Checkbox";
import { formatTime, formatDuration } from "@/lib/time";
import type { Todo } from "@/types/todo";

export interface TodoLabels {
    created: string;
    done: string;
    took: string;
}

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    labels?: TodoLabels;
}

export function TodoItem({ todo, onToggle, onDelete, labels }: TodoItemProps) {
    const l = labels ?? { created: "Created", done: "Done", took: "Took" };
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: todo.id, disabled: todo.completed });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : undefined,
    };

    const duration =
        todo.completed && todo.completedAt
            ? formatDuration(todo.completedAt - todo.createdAt)
            : null;

    return (
        <motion.div
            ref={setNodeRef}
            layout={!isDragging}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="group flex items-start gap-3 rounded-2xl px-4 py-3.5 transition-colors"
            style={style}
            onMouseEnter={(e) => {
                if (!isDragging) e.currentTarget.style.backgroundColor = "var(--color-item-hover)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
            }}
        >
            {/* Drag handle — only for active items */}
            {!todo.completed ? (
                <button
                    {...attributes}
                    {...listeners}
                    aria-label="Drag to reorder"
                    className="opacity-0 group-hover:opacity-60 flex items-center justify-center h-6 w-6 mt-0.5 cursor-grab active:cursor-grabbing transition-opacity duration-150 touch-none"
                    style={{ color: "var(--color-text-tertiary)" }}
                >
                    <GripVertical size={16} />
                </button>
            ) : (
                <div className="w-6" />
            )}

            <Checkbox
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                id={`todo-checkbox-${todo.id}`}
            />

            <div className="flex-1 min-w-0">
                <span
                    className="text-[19px] font-normal leading-relaxed transition-all duration-300 block"
                    style={{
                        color: todo.completed ? "var(--color-text-tertiary)" : "var(--color-text)",
                        textDecoration: todo.completed ? "line-through" : "none",
                        textDecorationColor: todo.completed ? "var(--color-border)" : undefined,
                    }}
                >
                    {todo.text}
                </span>

                {/* Time metadata */}
                <motion.div
                    initial={todo.completed ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mt-0.5 text-[10px] font-light tracking-wider"
                    style={{ color: "var(--color-text-tertiary)" }}
                >
                    {todo.completed && todo.completedAt ? (
                        <>
                            {l.created} {formatTime(todo.createdAt)} · {l.done}{" "}
                            {formatTime(todo.completedAt)} · {l.took} {duration}
                        </>
                    ) : (
                        <>{l.created} {formatTime(todo.createdAt)}</>
                    )}
                </motion.div>
            </div>

            <button
                onClick={() => onDelete(todo.id)}
                aria-label={`Delete "${todo.text}"`}
                className="opacity-0 group-hover:opacity-100 flex items-center justify-center h-8 w-8 mt-0.5 rounded-full transition-all duration-200 cursor-pointer"
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
