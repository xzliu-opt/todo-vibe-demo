"use client";

import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";

interface TodoInputProps {
    onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
    const [value, setValue] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;
        onAdd(value);
        setValue("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full items-stretch gap-0 rounded-2xl backdrop-blur-xl overflow-hidden transition-all duration-500"
            style={{
                backgroundColor: "var(--color-input-bg)",
                border: "1px solid var(--color-border-light)",
                boxShadow: "var(--shadow-input)",
            }}
        >
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="What needs to be done?"
                aria-label="New todo"
                autoComplete="off"
                className="flex-1 min-w-0 border-none bg-transparent px-5 py-4 text-center text-[19px] font-normal focus:outline-none focus:ring-0"
                style={{ color: "var(--color-text)" }}
            />
            <button
                type="submit"
                disabled={!value.trim()}
                className="flex-none flex items-center justify-center w-11 h-11 mr-1.5 rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                style={{
                    backgroundColor: "var(--color-btn-bg)",
                    color: "var(--color-btn-text)",
                }}
            >
                <Plus size={20} strokeWidth={2} />
            </button>
        </form>
    );
}
