import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={`
          w-full rounded-xl border border-gray-200 bg-white
          px-4 py-2.5 text-sm text-gray-900
          placeholder:text-gray-400
          transition-all duration-200
          focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20
          disabled:cursor-not-allowed disabled:opacity-50
          ${className}
        `}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
