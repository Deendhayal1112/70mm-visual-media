import React from "react";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#1A0B0B] text-[#F7EFE7]">
      <PublicHeader />
      <main id="main-content" className="flex-1 focus:outline-none">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
