"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, ShieldAlert } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Security notice: In Phase 1, real authentication is not yet integrated.
    // We navigate to the development dashboard placeholder without storing credentials.
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#1A0B0B] text-[#F7EFE7] flex flex-col justify-center items-center p-6 relative">
      {/* Background Ambience */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3A1414] rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A89587] hover:text-[#C49A5A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C49A5A]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-[#3A1414]/50 border border-[#4A2C2C] p-8 rounded-sm space-y-6 backdrop-blur-sm shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <BrandMark size="md" variant="light" href="/" />
            </div>
            <h1 className="font-serif text-2xl text-[#F7EFE7] font-normal">
              Admin Portal Sign-In
            </h1>
            <p className="text-xs text-[#A89587] font-sans">
              Restricted management console for authorized studio administrators.
            </p>
          </div>

          {/* Development Security Notice */}
          <div className="p-3.5 rounded bg-[#1A0B0B]/80 border border-[#C49A5A]/30 flex items-start gap-2.5 text-left">
            <ShieldAlert className="w-4 h-4 text-[#C49A5A] flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-[11px] font-mono text-[#C49A5A] uppercase tracking-wider font-semibold">
                Development Prototype Notice
              </p>
              <p className="text-xs text-[#A89587] leading-relaxed">
                Supabase Auth will be integrated in a future phase. No credentials
                are stored in localStorage, and no real authentication is running.
              </p>
            </div>
          </div>

          {/* Accessible Form */}
          <form onSubmit={handleSubmit} className="space-y-4" aria-label="Admin Sign In">
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="block font-mono text-xs uppercase tracking-wider text-[#A89587]"
              >
                Administrator Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@70mmvisualmedia.com"
                className="w-full px-4 py-2.5 bg-[#1A0B0B] border border-[#4A2C2C] rounded-sm text-[#F7EFE7] placeholder-[#A89587]/40 text-sm focus-visible:outline-none focus-visible:border-[#C49A5A] focus-visible:ring-1 focus-visible:ring-[#C49A5A]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block font-mono text-xs uppercase tracking-wider text-[#A89587]"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 bg-[#1A0B0B] border border-[#4A2C2C] rounded-sm text-[#F7EFE7] placeholder-[#A89587]/40 text-sm focus-visible:outline-none focus-visible:border-[#C49A5A] focus-visible:ring-1 focus-visible:ring-[#C49A5A]"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center mt-2"
            >
              <Lock className="w-4 h-4 mr-1.5" />
              <span>Enter Admin Dashboard (Preview)</span>
            </Button>
          </form>

          <div className="pt-2 text-center border-t border-[#4A2C2C]">
            <p className="font-mono text-[11px] text-[#A89587]">
              70MM VISUAL MEDIA • CHENNAI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
