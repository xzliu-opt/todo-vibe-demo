"use client";

import { useState, useEffect, useCallback } from "react";
import type { Todo } from "@/types/todo";

const STORAGE_KEY = "todo-vibe-app-todos";

function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount (client-only)
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed: Todo[] = JSON.parse(stored).map((t: Todo) => ({
                    ...t,
                    isFavorite: t.isFavorite ?? false,
                    reminderAt: t.reminderAt ?? null,
                    subtasks: t.subtasks ?? [],
                }));
                setTodos(parsed);
            }
        } catch {
            // Corrupted data — start fresh
            localStorage.removeItem(STORAGE_KEY);
        }
        setIsLoaded(true);
    }, []);

    // Persist to localStorage on change (only after initial load)
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        }
    }, [todos, isLoaded]);

    const addTodo = useCallback((text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;

        const newTodo: Todo = {
            id: generateId(),
            text: trimmed,
            completed: false,
            isFavorite: false,
            reminderAt: null,
            subtasks: [],
            createdAt: Date.now(),
            completedAt: null,
        };
        setTodos((prev) => [newTodo, ...prev]);
    }, []);

    const toggleTodo = useCallback((id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        completed: !todo.completed,
                        completedAt: !todo.completed ? Date.now() : null,
                    }
                    : todo
            )
        );
    }, []);

    const toggleFavorite = useCallback((id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, isFavorite: !todo.isFavorite } : todo
            )
        );
    }, []);

    const updateTodo = useCallback((id: string, text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setTodos((prev) =>
            prev.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo))
        );
    }, []);

    const setReminder = useCallback((id: string, timestamp: number) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, reminderAt: timestamp } : todo
            )
        );
    }, []);

    const clearReminder = useCallback((id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, reminderAt: null } : todo
            )
        );
    }, []);

    const addSubtask = useCallback((parentId: string, text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === parentId
                    ? { ...todo, subtasks: [...todo.subtasks, { id: generateId(), text: trimmed, completed: false }] }
                    : todo
            )
        );
    }, []);

    const updateSubtask = useCallback((parentId: string, subtaskId: string, text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === parentId
                    ? {
                        ...todo,
                        subtasks: todo.subtasks.map((s) =>
                            s.id === subtaskId ? { ...s, text: trimmed } : s
                        ),
                    }
                    : todo
            )
        );
    }, []);

    const toggleSubtask = useCallback((parentId: string, subtaskId: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === parentId
                    ? {
                        ...todo,
                        subtasks: todo.subtasks.map((s) =>
                            s.id === subtaskId ? { ...s, completed: !s.completed } : s
                        ),
                    }
                    : todo
            )
        );
    }, []);

    const deleteSubtask = useCallback((parentId: string, subtaskId: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === parentId
                    ? { ...todo, subtasks: todo.subtasks.filter((s) => s.id !== subtaskId) }
                    : todo
            )
        );
    }, []);

    const deleteTodo = useCallback((id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }, []);

    const clearCompleted = useCallback(() => {
        setTodos((prev) => prev.filter((todo) => !todo.completed));
    }, []);

    const reorderTodos = useCallback((activeId: string, overId: string) => {
        setTodos((prev) => {
            const oldIndex = prev.findIndex((t) => t.id === activeId);
            const newIndex = prev.findIndex((t) => t.id === overId);
            if (oldIndex === -1 || newIndex === -1) return prev;
            const updated = [...prev];
            const [moved] = updated.splice(oldIndex, 1);
            updated.splice(newIndex, 0, moved);
            return updated;
        });
    }, []);

    return { todos, isLoaded, addTodo, toggleTodo, updateTodo, toggleFavorite, setReminder, clearReminder, addSubtask, updateSubtask, toggleSubtask, deleteSubtask, deleteTodo, clearCompleted, reorderTodos };
}
