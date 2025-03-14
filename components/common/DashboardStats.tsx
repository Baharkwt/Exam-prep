"use client";

import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
        <div>
          <h3 className="font-semibold text-muted-foreground">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  );
}

interface DashboardStatsProps {
  stats: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
  }[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}