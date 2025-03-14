"use client";

import { DashboardLayout } from "@/frontend/layouts/DashboardLayout";
import { DashboardStats } from "@/frontend/components/common/DashboardStats";
import { PerformanceChart } from "@/frontend/components/common/PerformanceChart";
import { FlashcardSection } from "@/frontend/components/student/FlashcardSection";
import { ExamTracker } from "@/frontend/components/student/ExamTracker";
import { TaskManager } from "@/frontend/components/student/TaskManager";
import { BookOpen, Clock, Target, Trophy } from "lucide-react";

const mockStats = [
  {
    title: "Active Courses",
    value: "4",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    title: "Study Hours",
    value: "32",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    title: "Target Exams",
    value: "2",
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: "Test Score",
    value: "85%",
    icon: <Trophy className="w-6 h-6" />,
  },
];

const mockPerformanceData = [
  { date: "Week 1", value: 75 },
  { date: "Week 2", value: 82 },
  { date: "Week 3", value: 78 },
  { date: "Week 4", value: 85 },
  { date: "Week 5", value: 88 },
];

export default function StudentDashboard() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and upcoming tasks</p>
        </div>

        <DashboardStats stats={mockStats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FlashcardSection />
          <ExamTracker />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart
            data={mockPerformanceData}
            title="Performance Trend"
          />
          <TaskManager />
        </div>
      </div>
    </DashboardLayout>
  );
}