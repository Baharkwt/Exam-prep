import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard/student",
      icon: <span className="h-4 w-4">📊</span>,
    },
    {
      title: "Courses",
      href: "/dashboard/student/courses",
      icon: <span className="h-4 w-4">📚</span>,
    },
    {
      title: "Tests",
      href: "/dashboard/student/tests",
      icon: <span className="h-4 w-4">📝</span>,
    },
    {
      title: "Calendar",
      href: "/dashboard/student/calendar",
      icon: <span className="h-4 w-4">📅</span>,
    },
    {
      title: "Performance",
      href: "/dashboard/student/performance",
      icon: <span className="h-4 w-4">📈</span>,
    },
    {
      title: "PDF Courses",
      href: "/dashboard/student/pdf-courses",
      icon: <span className="h-4 w-4">📄</span>,
    },
    {
      title: "Current Affairs",
      href: "/dashboard/student/current-affairs",
      icon: <span className="h-4 w-4">🌍</span>,
    },
    {
      title: "Speed Drill",
      href: "/dashboard/student/speed-drill",
      icon: <span className="h-4 w-4">⚡</span>,
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 z-40 flex h-16 items-center gap-2 border-b bg-background px-4 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Moct Platform</h1>
      </div>

      {/* Search (mobile) */}
      <div className="fixed top-16 left-0 right-0 z-30 border-b bg-background px-4 py-2 md:hidden">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            className="w-full rounded-md border bg-background pl-8 py-2"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b px-4">
            <h1 className="text-xl font-bold">Moct Platform</h1>
          </div>

          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium">JS</span>
              </div>
              <div>
                <p className="text-sm font-medium">John Student</p>
                <p className="text-xs text-muted-foreground">Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
