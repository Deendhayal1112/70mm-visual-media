import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-medium tracking-wider uppercase transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A5A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0B0B] disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 rounded-sm gap-1.5",
      md: "text-xs sm:text-sm px-5 py-2.5 rounded-sm gap-2",
      lg: "text-sm sm:text-base px-7 py-3.5 rounded-sm gap-2.5 tracking-widest",
    };

    const variantStyles = {
      primary:
        "bg-[#C49A5A] text-[#1A0B0B] font-semibold hover:bg-[#B58B4B] active:bg-[#9E763B] shadow-[0_2px_12px_rgba(196,154,90,0.25)] hover:shadow-[0_4px_20px_rgba(196,154,90,0.4)]",
      outline:
        "bg-transparent text-[#C49A5A] border border-[#C49A5A] hover:bg-[#C49A5A]/10 active:bg-[#C49A5A]/20",
      ghost:
        "bg-transparent text-[#F7EFE7] hover:text-[#C49A5A] hover:bg-[#F7EFE7]/5 active:bg-[#F7EFE7]/10",
      dark:
        "bg-[#3A1414] text-[#F7EFE7] border border-[#4A2C2C] hover:border-[#C49A5A]/60 hover:text-[#C49A5A] active:bg-[#1A0B0B]",
    };

    const classes = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            className={classes}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} disabled={disabled} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
