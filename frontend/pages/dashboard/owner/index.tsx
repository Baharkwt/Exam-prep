"use client";

import { DashboardLayout } from "@/frontend/layouts/DashboardLayout";
import { DashboardStats } from "@/frontend/components/common/DashboardStats";
import { PerformanceChart } from "@/frontend/components/common/PerformanceChart";
import { DollarSign, Users, TrendingUp, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

const mockStats = [
  {
    title: "Revenue",
    value: "$12,345",
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    title: "Total Users",
    value: "1,234",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Growth",
    value: "+15%",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    title: "Active Now",
    value: "456",
    icon: <Activity className="w-6 h-6" />,
  },
];

const mockRevenueData = [
  { date: "Jan", value: 5000 },
  { date: "Feb", value: 7500 },
  { date: "Mar", value: 8900 },
  { date: "Apr", value: 12000 },
  { date: "May", value: 15000 },
];

export default function OwnerDashboard() {
  return (
    <DashboardLayout role="owner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Owner Dashboard</h1>
          <p className="text-muted-foreground">Monitor platform performance and growth</p>
        </div>

        <DashboardStats stats={mockStats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart
            data={mockRevenueData}
            title="Revenue Growth"
          />

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="font-medium">New Premium Subscription</p>
                    <p className="text-sm text-muted-foreground">
                      2 hours ago
                    </p>
                  </div>
                  <span className="text-green-600">+$99.00</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}