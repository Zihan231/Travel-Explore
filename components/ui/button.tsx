"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Variant = "primary" | "green" | "red" | "dark" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary: "bg-leaf-600 text-white hover:bg-leaf-700 shadow-card",
  green: "bg-leaf-600 text-white hover:bg-leaf-700 shadow-card",
  red: "bg-ruchi-600 text-white hover:bg-ruchi-700 shadow-card",
  dark: "bg-ink text-white hover:bg-ink-700",
  outline: "border border-paper-300 bg-white text-ink hover:border-ink hover:bg-paper",
  ghost: "text-ink hover:bg-paper-100",
  danger: "border border-ruchi-200 bg-ruchi-50 text-ruchi-700 hover:bg-ruchi-100",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm rounded-lg gap-1.5",
  md: "h-11 px-5 text-sm rounded-xl gap-2",
  lg: "h-13 px-6 text-base rounded-xl gap-2.5 min-h-[52px]",
  icon: "h-10 w-10 rounded-lg",
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex select-none items-center justify-center font-semibold transition-all duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
