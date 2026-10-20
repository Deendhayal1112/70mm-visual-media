"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PUBLIC_NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      suppressHydrationWarning
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "bg-[#1A0B0B]/95 backdrop-blur-md border-b border-[#C49A5A]/20 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          : "bg-[#1A0B0B]/70 backdrop-blur-sm border-b border-white/5"
      )}
    >
      <Container size="wide">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Brand Mark */}
          <div className="flex-shrink-0">
            <BrandMark size="md" variant="light" href="/" />
          </div>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center space-x-5 xl:space-x-7"
          >
            {PUBLIC_NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-xs uppercase tracking-[0.16em] text-[#F7EFE7]/80 hover:text-[#C49A5A] transition-colors duration-200 py-2 relative group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C49A5A]"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C49A5A] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Action & Admin Portal Link */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/admin"
              className="text-xs uppercase tracking-widest text-[#A89587] hover:text-[#C49A5A] transition-colors px-2 py-1"
              title="Admin Portal Placeholder"
            >
              Admin
            </Link>
            <Button
              href="#contact"
              variant="primary"
              size="sm"
              className="group"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#F7EFE7] hover:text-[#C49A5A] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A5A]"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-[#1A0B0B]/98 backdrop-blur-xl z-50 lg:hidden flex flex-col justify-between p-6 overflow-y-auto border-t border-[#C49A5A]/20">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-6 pt-4">
            {PUBLIC_NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-2xl text-[#F7EFE7] hover:text-[#C49A5A] transition-colors py-2 border-b border-[#3A1414] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#C49A5A] tracking-widest">
                  →
                </span>
              </a>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans text-xs uppercase tracking-widest text-[#A89587] hover:text-[#C49A5A] py-2"
            >
              Admin Dashboard (Placeholder)
            </Link>
          </nav>

          <div className="pt-8 pb-6 border-t border-[#3A1414] space-y-4">
            <Button
              href="#contact"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start a Project
            </Button>
            <p className="text-center font-mono text-[11px] text-[#A89587] tracking-wider">
              Chennai, Tamil Nadu • Pan-India Production
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
