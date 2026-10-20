import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark" | "gold";
  href?: string;
  showSubtitle?: boolean;
}

export function BrandMark({
  className,
  size = "md",
  variant = "light",
  href = "/",
  showSubtitle = true,
}: BrandMarkProps) {
  const sizeStyles = {
    sm: {
      mark: "text-lg tracking-wider",
      sub: "text-[9px] tracking-[0.25em]",
      badge: "text-[10px] px-1.5 py-0.5",
    },
    md: {
      mark: "text-2xl tracking-widest",
      sub: "text-[10px] tracking-[0.3em]",
      badge: "text-xs px-2 py-0.5",
    },
    lg: {
      mark: "text-3xl sm:text-4xl tracking-widest",
      sub: "text-xs sm:text-sm tracking-[0.35em]",
      badge: "text-sm px-2.5 py-1",
    },
  };

  const variantStyles = {
    light: {
      primary: "text-[#F7EFE7]",
      accent: "text-[#C49A5A]",
      sub: "text-[#A89587]",
      border: "border-[#C49A5A]/30",
    },
    dark: {
      primary: "text-[#1A0B0B]",
      accent: "text-[#C49A5A]",
      sub: "text-[#4A2C2C]",
      border: "border-[#1A0B0B]/20",
    },
    gold: {
      primary: "text-[#C49A5A]",
      accent: "text-[#F7EFE7]",
      sub: "text-[#C49A5A]/80",
      border: "border-[#C49A5A]/50",
    },
  };

  const content = (
    <div className={cn("inline-flex flex-col group select-none", className)}>
      <div className="inline-flex items-center gap-2">
        <span
          className={cn(
            "font-serif font-bold transition-colors duration-200",
            sizeStyles[size].mark,
            variantStyles[variant].primary
          )}
        >
          70MM
        </span>
        <span
          className={cn(
            "font-mono font-medium uppercase rounded border transition-colors",
            sizeStyles[size].badge,
            variantStyles[variant].accent,
            variantStyles[variant].border
          )}
        >
          STUDIO
        </span>
      </div>
      {showSubtitle && (
        <span
          className={cn(
            "font-sans font-semibold uppercase mt-0.5 transition-colors",
            sizeStyles[size].sub,
            variantStyles[variant].sub
          )}
        >
          VISUAL MEDIA
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A5A] rounded-sm transition-opacity hover:opacity-90"
        aria-label="70MM Visual Media Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
