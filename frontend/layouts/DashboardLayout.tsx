"use client";

import { Navbar } from "@/frontend/components/common/Navbar";
import { Sidebar } from "@/frontend/components/common/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "student" | "admin" | "employee" | "owner";
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col md:pl-64">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}