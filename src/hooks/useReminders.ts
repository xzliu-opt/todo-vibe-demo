"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import type { Todo } from "@/types/todo";

interface ReminderNotification {
    id: string;
    text: string;
}

export function useReminders(
    todos: Todo[],
    clearReminder: (id: string) => void
) {
    const [activeToast, setActiveToast] = useState<ReminderNotification | null>(null);
    const permissionGranted = useRef(false);

    // Request notification permission on mount
    useEffect(() => {
        if (typeof Notification !== "undefined" && Notification.permission === "default") {
            Notification.requestPermission().then((perm) => {
                permissionGranted.current = perm === "granted";
            });
        } else if (typeof Notification !== "undefined") {
            permissionGranted.current = Notification.permission === "granted";
        }
    }, []);

    // Poll every 30 seconds for due reminders
    useEffect(() => {
        const check = () => {
            const now = Date.now();
            for (const todo of todos) {
                if (
                    todo.reminderAt &&
                    todo.reminderAt <= now &&
                    !todo.completed
                ) {
                    // Browser notification
                    if (
                        typeof Notification !== "undefined" &&
                        Notification.permission === "granted"
                    ) {
                        new Notification("flow.", {
                            body: todo.text,
                            icon: "/favicon.ico",
                        });
                    }

                    // In-app toast
                    setActiveToast({ id: todo.id, text: todo.text });

                    // Clear the reminder so it doesn't fire again
                    clearReminder(todo.id);
                    break; // one at a time to avoid notification spam
                }
            }
        };

        check(); // run immediately
        const interval = setInterval(check, 30_000);
        return () => clearInterval(interval);
    }, [todos, clearReminder]);

    const dismissToast = useCallback(() => {
        setActiveToast(null);
    }, []);

    return { activeToast, dismissToast };
}
