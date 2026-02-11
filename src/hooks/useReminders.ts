"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import type { Todo } from "@/types/todo";

interface ReminderNotification {
    id: string;
    text: string;
}

const ORIGINAL_TITLE = "flow.";

export function useReminders(
    todos: Todo[],
    clearReminder: (id: string) => void,
    reminderLabel: string
) {
    const [activeToast, setActiveToast] = useState<ReminderNotification | null>(null);
    const permissionGranted = useRef(false);
    const flashIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Stop the title flash
    const stopFlash = useCallback(() => {
        if (flashIntervalRef.current) {
            clearInterval(flashIntervalRef.current);
            flashIntervalRef.current = null;
        }
        if (typeof document !== "undefined") {
            document.title = ORIGINAL_TITLE;
        }
    }, []);

    // Start the title flash
    const startFlash = useCallback((label: string) => {
        stopFlash();
        let on = true;
        flashIntervalRef.current = setInterval(() => {
            if (typeof document !== "undefined") {
                document.title = on ? `🔔 ${label}` : ORIGINAL_TITLE;
            }
            on = !on;
        }, 1000);
    }, [stopFlash]);

    // Restore title when the window gains focus
    useEffect(() => {
        const handleFocus = () => stopFlash();
        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, [stopFlash]);

    // Cleanup flash interval on unmount
    useEffect(() => {
        return () => stopFlash();
    }, [stopFlash]);

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

                    // Flash the tab title
                    startFlash(reminderLabel);

                    // Clear the reminder so it doesn't fire again
                    clearReminder(todo.id);
                    break; // one at a time to avoid notification spam
                }
            }
        };

        check(); // run immediately
        const interval = setInterval(check, 30_000);
        return () => clearInterval(interval);
    }, [todos, clearReminder, reminderLabel, startFlash]);

    const dismissToast = useCallback(() => {
        setActiveToast(null);
        stopFlash();
    }, [stopFlash]);

    return { activeToast, dismissToast };
}
