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
                const parsed: Todo[] = JSON.parse(stored);
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
            createdAt: Date.now(),
        };
        setTodos((prev) => [newTodo, ...prev]);
    }, []);

    const toggleTodo = useCallback((id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }, []);

    const deleteTodo = useCallback((id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }, []);

    const clearCompleted = useCallback(() => {
        setTodos((prev) => prev.filter((todo) => !todo.completed));
    }, []);

    return { todos, isLoaded, addTodo, toggleTodo, deleteTodo, clearCompleted };
}
