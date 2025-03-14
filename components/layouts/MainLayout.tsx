"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  BookOpen,
  Calendar,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Users,
  Activity,
  BarChart3,
  Upload,
  Database,
} from "lucide-react";
import Link from "next/link";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

const roleBasedNavItems = {
  student: [
    { href: "/dashboard/student", title: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/student/calendar", title: "Calendar", icon: <Calendar className="w-5 h-5" /> },
    { href: "/dashboard/student/courses", title: "Courses", icon: <BookOpen className="w-5 h-5" /> },
    { href: "/dashboard/student/tests", title: "Tests", icon: <FileText className="w-5 h-5" /> },
    { href: "/dashboard/student/performance", title: "Performance", icon: <Activity className="w-5 h-5" /> },
  ],
  admin: [
    { href: "/dashboard/admin", title: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/admin/users", title: "User Management", icon: <Users className="w-5 h-5" /> },
    { href: "/dashboard/admin/content", title: "Content Review", icon: <FileText className="w-5 h-5" /> },
    { href: "/dashboard/admin/analytics", title: "Analytics", icon: <BarChart3 className="w-5 h-5" /> },
  ],
  employee: [
    { href: "/dashboard/employee", title: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/employee/upload", title: "Upload Content", icon: <Upload className="w-5 h-5" /> },
    { href: "/dashboard/employee/courses", title: "Manage Courses", icon: <BookOpen className="w-5 h-5" /> },
    { href: "/dashboard/employee/analytics", title: "Analytics", icon: <BarChart3 className="w-5 h-5" /> },
  ],
  owner: [
    { href: "/dashboard/owner", title: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/owner/revenue", title: "Revenue", icon: <Database className="w-5 h-5" /> },
    { href: "/dashboard/owner/users", title: "Users", icon: <Users className="w-5 h-5" /> },
    { href: "/dashboard/owner/analytics", title: "Analytics", icon: <BarChart3 className="w-5 h-5" /> },
  ],
};

function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-all",
            pathname === item.href ? "bg-accent" : "transparent"
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export function DashboardLayout({
  children,
  role = "student",
}: {
  children: React.ReactNode;
  role?: "student" | "admin" | "employee" | "owner";
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-card border-r">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-accent">
            <h1 className="text-lg font-bold">Moct Platform</h1>
          </div>
          <ScrollArea className="flex-1 px-3 py-4">
            <SidebarNav items={roleBasedNavItems[role]} className="space-y-1" />
          </ScrollArea>
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/settings">
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-destructive" asChild>
              <Link href="/logout">
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </div>

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