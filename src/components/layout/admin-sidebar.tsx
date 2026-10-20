"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Film,
  Image as ImageIcon,
  Layers,
  Briefcase,
  Camera,
  GitBranch,
  Quote,
  Mail,
  Settings,
  Menu,
  X,
  ExternalLink,
  ShieldAlert,
  LogOut,
} from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  className?: string;
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Homepage", href: "/admin#homepage", icon: Home },
  { label: "Portfolio", href: "/admin#portfolio", icon: Film },
  { label: "Media Library", href: "/admin#media", icon: ImageIcon },
  { label: "Services", href: "/admin#services", icon: Layers },
  { label: "Industries", href: "/admin#industries", icon: Briefcase },
  { label: "Equipment & Software", href: "/admin#equipment", icon: Camera },
  { label: "Process", href: "/admin#process", icon: GitBranch },
  { label: "Testimonials", href: "/admin#testimonials", icon: Quote },
  { label: "Enquiries", href: "/admin#enquiries", icon: Mail },
  { label: "Website Settings", href: "/admin#settings", icon: Settings },
];

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#1A0B0B] text-[#F7EFE7] border-r border-[#3A1414]">
      {/* Brand & Workspace Header */}
      <div className="p-6 border-b border-[#3A1414] bg-[#1A0B0B]">
        <div className="flex items-center justify-between">
          <BrandMark size="sm" variant="light" href="/admin" />
          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 text-[#A89587] hover:text-[#F7EFE7]"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2 px-2.5 py-1.5 rounded bg-[#3A1414]/70 border border-[#C49A5A]/30">
          <ShieldAlert className="w-3.5 h-3.5 text-[#C49A5A] flex-shrink-0" />
          <span className="text-[11px] font-mono text-[#C49A5A] uppercase tracking-wider font-semibold">
            Admin Preview • Phase 1
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav aria-label="Admin Navigation" className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <p className="px-3 pb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#A89587]">
          Content Management
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-medium tracking-wide transition-all duration-150 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C49A5A]",
                isActive
                  ? "bg-[#3A1414] text-[#C49A5A] border-l-2 border-[#C49A5A] shadow-sm font-semibold"
                  : "text-[#F7EFE7]/80 hover:bg-[#3A1414]/50 hover:text-[#C49A5A]"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  isActive
                    ? "text-[#C49A5A]"
                    : "text-[#A89587] group-hover:text-[#C49A5A]"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-[#3A1414] bg-[#1A0B0B]/80 space-y-2">
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 text-xs text-[#A89587] hover:text-[#C49A5A] hover:bg-[#3A1414]/40 rounded transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </span>
          <span className="font-mono text-[10px] text-[#C49A5A]">Live</span>
        </Link>
        <Link
          href="/admin/login"
          className="flex items-center gap-2 px-3 py-2 text-xs text-[#A89587] hover:text-[#C49A5A] hover:bg-[#3A1414]/40 rounded transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Login Portal</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Navigation Trigger */}
      <div className="lg:hidden bg-[#1A0B0B] text-[#F7EFE7] border-b border-[#3A1414] p-4 flex items-center justify-between sticky top-0 z-30">
        <BrandMark size="sm" variant="light" href="/admin" />
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-[#F7EFE7] hover:text-[#C49A5A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A5A]"
          aria-label="Open admin sidebar menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Backdrop & Slideout */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside
        className={cn(
          "hidden lg:block w-64 flex-shrink-0 min-h-screen sticky top-0 h-screen",
          className
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
