"use client";

import { Sidebar } from "@/components/layouts/Sidebar";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardLayout({
  children,
  role = "student",
}: {
  children: React.ReactNode;
  role?: "student" | "admin" | "employee" | "owner";
}) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Top Navigation */}
        <header className="bg-card border-b">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex-1 flex justify-end space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="py-6 pt-20 md:pt-6">
            {" "}
            {/* Added padding-top for mobile to account for search bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
