"use client";

import { DashboardLayout } from "@/components/layouts/MainLayout";
import { DashboardStats } from "@/components/common/DashboardStats";
import { PerformanceChart } from "@/components/common/PerformanceChart";
import { Users, BookOpen, FileCheck, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockStats = [
  {
    title: "Total Users",
    value: "1,234",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Active Courses",
    value: "45",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    title: "Pending Reviews",
    value: "23",
    icon: <FileCheck className="w-6 h-6" />,
  },
  {
    title: "Daily Active",
    value: "456",
    icon: <Activity className="w-6 h-6" />,
  },
];

const mockUserData = [
  { date: "Jan", value: 400 },
  { date: "Feb", value: 600 },
  { date: "Mar", value: 800 },
  { date: "Apr", value: 1000 },
  { date: "May", value: 1200 },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users and content</p>
        </div>

        <DashboardStats stats={mockStats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart data={mockUserData} title="User Growth" />

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Pending Approvals</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="font-medium">
                      New Course: Advanced Mathematics
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Submitted by John Doe
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="default">
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
