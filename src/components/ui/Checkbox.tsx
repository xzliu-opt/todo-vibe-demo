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
            className={`
        relative flex h-5 w-5 shrink-0 items-center justify-center
        rounded-md border-2 transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2
        cursor-pointer
        ${checked
                    ? "border-indigo-500 bg-indigo-500"
                    : "border-gray-300 bg-white hover:border-indigo-400"
                }
      `}
        >
            <motion.div
                initial={false}
                animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </motion.div>
        </button>
    );
}
