"use client";

import { DashboardLayout } from "@/frontend/layouts/DashboardLayout";
import { DashboardStats } from "@/frontend/components/common/DashboardStats";
import { PerformanceChart } from "@/frontend/components/common/PerformanceChart";
import { BookOpen, Upload, Users, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockStats = [
  {
    title: "Total Courses",
    value: "12",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    title: "Uploads",
    value: "45",
    icon: <Upload className="w-6 h-6" />,
  },
  {
    title: "Students",
    value: "234",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Avg. Rating",
    value: "4.8",
    icon: <Star className="w-6 h-6" />,
  },
];

const mockEngagementData = [
  { date: "Mon", value: 150 },
  { date: "Tue", value: 230 },
  { date: "Wed", value: 180 },
  { date: "Thu", value: 275 },
  { date: "Fri", value: 250 },
];

export default function EmployeeDashboard() {
  return (
    <DashboardLayout role="employee">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Employee Dashboard</h1>
          <p className="text-muted-foreground">Manage your content and track engagement</p>
        </div>

        <DashboardStats stats={mockStats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart
            data={mockEngagementData}
            title="Student Engagement"
          />

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Recent Uploads</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="font-medium">Advanced Calculus - Module {item}</p>
                    <p className="text-sm text-muted-foreground">
                      Uploaded 2 days ago
                    </p>
                  </div>
                  <span className="text-yellow-600">Pending Review</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">
              <Upload className="w-4 h-4 mr-2" />
              Upload New Content
            </Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}