"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sun } from "lucide-react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TodoItem, type TodoLabels } from "./TodoItem";
import type { Todo } from "@/types/todo";

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onUpdate: (id: string, text: string) => void;
    onDelete: (id: string) => void;
    onReorder: (activeId: string, overId: string) => void;
    onToggleFavorite: (id: string) => void;
    onSetReminder: (id: string, timestamp: number) => void;
    onClearReminder: (id: string) => void;
    onAddSubtask: (parentId: string, text: string) => void;
    onUpdateSubtask: (parentId: string, subtaskId: string, text: string) => void;
    onToggleSubtask: (parentId: string, subtaskId: string) => void;
    onDeleteSubtask: (parentId: string, subtaskId: string) => void;
    subtaskPlaceholder?: string;
    emptyStateTitle?: string;
    emptyStateSubtitle?: string;
    labels?: TodoLabels;
}

export function TodoList({ todos, onToggle, onUpdate, onDelete, onReorder, onToggleFavorite, onSetReminder, onClearReminder, onAddSubtask, onUpdateSubtask, onToggleSubtask, onDeleteSubtask, subtaskPlaceholder, emptyStateTitle, emptyStateSubtitle, labels }: TodoListProps) {
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: { distance: 5 },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: { delay: 150, tolerance: 5 },
    });
    const sensors = useSensors(pointerSensor, touchSensor);

    if (todos.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-[240px] py-20 text-center"
            >
                <div
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--color-empty-icon-bg)" }}
                >
                    <Sun className="h-7 w-7" style={{ color: "var(--color-text-tertiary)" }} />
                </div>
                <p className="text-[15px] font-medium" style={{ color: "var(--color-text-secondary)" }}>
                    {emptyStateTitle ?? "All caught up!"}
                </p>
                <p className="mt-1 text-[13px]" style={{ color: "var(--color-text-tertiary)" }}>
                    {emptyStateSubtitle ?? "Enjoy your day."}
                </p>
            </motion.div>
        );
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            onReorder(String(active.id), String(over.id));
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
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
                                    onUpdate={onUpdate}
                                    onDelete={onDelete}
                                    onToggleFavorite={onToggleFavorite}
                                    onSetReminder={onSetReminder}
                                    onClearReminder={onClearReminder}
                                    onAddSubtask={onAddSubtask}
                                    onUpdateSubtask={onUpdateSubtask}
                                    onToggleSubtask={onToggleSubtask}
                                    onDeleteSubtask={onDeleteSubtask}
                                    subtaskPlaceholder={subtaskPlaceholder}
                                    labels={labels}
                                />
                            </div>
                        ))}
                    </AnimatePresence>
                </div>
            </SortableContext>
        </DndContext>
    );
}
