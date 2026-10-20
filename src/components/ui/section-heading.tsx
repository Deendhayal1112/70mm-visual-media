import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  level?: "h1" | "h2" | "h3";
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  level: HeadingTag = "h2",
  className,
  light = false,
}: SectionHeadingProps) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col space-y-3 max-w-3xl",
        alignStyles[align],
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2">
          <span className="w-6 h-px bg-[#C49A5A]" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C49A5A] font-semibold">
            {eyebrow}
          </span>
        </div>
      )}

      <HeadingTag
        className={cn(
          "font-serif font-normal tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.15]",
          light ? "text-[#1A0B0B]" : "text-[#F7EFE7]"
        )}
      >
        {title}
      </HeadingTag>

      {description && (
        <p
          className={cn(
            "text-sm sm:text-base leading-relaxed font-sans max-w-2xl",
            light ? "text-[#4A2C2C]" : "text-[#A89587]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
