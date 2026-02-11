"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CheckboxProps {
    checked: boolean;
    onChange: () => void;
    id?: string;
}

export function Checkbox({ checked, onChange, id }: CheckboxProps) {
    return (
        <button
            id={id}
            role="checkbox"
            aria-checked={checked}
            onClick={onChange}
            className="relative flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer"
            style={{
                borderColor: checked ? "var(--color-checkbox-checked-border)" : "var(--color-checkbox-border)",
                backgroundColor: checked ? "var(--color-checkbox-checked-bg)" : "transparent",
                ["--tw-ring-color" as string]: "var(--color-accent)",
            }}
        >
            <motion.div
                initial={false}
                animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                <Check className="h-3 w-3" style={{ color: "var(--color-check-icon)" }} strokeWidth={3} />
            </motion.div>
        </button>
    );
}
