"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SessionTimeoutHandler } from "@/components/admin/SessionTimeoutHandler";

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if this is the login page
  const isLoginPage = pathname?.includes("/admin/login");

  // For login page, render only children without admin chrome
  if (isLoginPage) {
    return <>{children}</>;
  }

  // For other admin pages, render with sidebar and header
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Session Timeout Handler */}
      <SessionTimeoutHandler />

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <AdminHeader />
          <main className="p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
