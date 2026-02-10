import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "default" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
}

const variantClasses: Record<Variant, string> = {
    default:
        "bg-indigo-500 text-white hover:bg-indigo-600 active:bg-indigo-700 shadow-sm",
    ghost:
        "bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200",
    destructive:
        "bg-transparent text-red-400 hover:bg-red-50 hover:text-red-500 active:bg-red-100",
};

const sizeClasses: Record<Size, string> = {
    sm: "px-2.5 py-1.5 text-xs rounded-lg",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-2.5 text-base rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "default", size = "md", className = "", children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={`
          inline-flex items-center justify-center gap-2
          font-medium transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50
          cursor-pointer
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
