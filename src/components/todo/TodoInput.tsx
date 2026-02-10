"use client";

import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

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
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="What needs to be done?"
                aria-label="New todo"
                autoComplete="off"
            />
            <Button type="submit" size="md" disabled={!value.trim()}>
                <Plus className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Add</span>
            </Button>
        </form>
    );
}
