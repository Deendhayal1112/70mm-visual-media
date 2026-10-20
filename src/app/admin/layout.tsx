"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#1A0B0B] text-[#F7EFE7]">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F7EFE7] text-[#1A0B0B]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
