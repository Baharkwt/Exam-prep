"use client";

import { Bell, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
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
  );
}