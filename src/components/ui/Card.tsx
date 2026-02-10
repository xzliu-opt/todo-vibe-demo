import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={`
        rounded-2xl bg-white
        shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        border border-gray-100/80
        ${className}
      `}
        >
            {children}
        </div>
    );
}
