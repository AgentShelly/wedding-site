import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full px-3 py-2.5 rounded-xl border text-ink-900 placeholder:text-ink-300 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 ${
        error ? "border-red-400 bg-red-50" : "border-line"
      } ${className ?? ""}`}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
