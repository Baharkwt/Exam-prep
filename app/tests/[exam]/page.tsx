"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  Zap,
  History,
  ChevronRight,
  Search,
  Timer,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { ExamButton } from "@/components/ExamButton";
import { cn } from "@/lib/utils";

interface TestCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  route: string;
}

interface Test {
  id: string;
  title: string;
  duration: string;
  questions: number;
  status: "free" | "attempted" | "available";
  score?: number;
  rank?: number;
}

const testCategories: Record<string, TestCategory[]> = {
  "ibps-po": [
    {
      id: "full",
      title: "Full Length Tests",
      description: "Complete mock tests with all sections",
      icon: <BookOpen className="w-6 h-6" />,
      count: 15,
      route: "full",
    },
    {
      id: "sectional",
      title: "Sectional Tests",
      description: "Practice specific sections",
      icon: <Clock className="w-6 h-6" />,
      count: 30,
      route: "sectional",
    },
    {
      id: "speed",
      title: "Speed Tests",
      description: "Quick practice for rapid improvement",
      icon: <Zap className="w-6 h-6" />,
      count: 25,
      route: "speed",
    },
    {
      id: "previous",
      title: "Previous Year Papers",
      description: "Solve past year questions",
      icon: <History className="w-6 h-6" />,
      count: 10,
      route: "previous",
    },
  ],
  "sbi-po": [
    {
      id: "full",
      title: "Full Length Tests",
      description: "Complete mock tests with all sections",
      icon: <BookOpen className="w-6 h-6" />,
      count: 12,
      route: "full",
    },
    {
      id: "sectional",
      title: "Sectional Tests",
      description: "Practice specific sections",
      icon: <Clock className="w-6 h-6" />,
      count: 25,
      route: "sectional",
    },
    {
      id: "speed",
      title: "Speed Tests",
      description: "Quick practice for rapid improvement",
      icon: <Zap className="w-6 h-6" />,
      count: 20,
      route: "speed",
    },
    {
      id: "previous",
      title: "Previous Year Papers",
      description: "Solve past year questions",
      icon: <History className="w-6 h-6" />,
      count: 8,
      route: "previous",
    },
  ],
  "ibps-clerk": [
    {
      id: "full",
      title: "Full Length Tests",
      description: "Complete mock tests with all sections",
      icon: <BookOpen className="w-6 h-6" />,
      count: 10,
      route: "full",
    },
    {
      id: "sectional",
      title: "Sectional Tests",
      description: "Practice specific sections",
      icon: <Clock className="w-6 h-6" />,
      count: 22,
      route: "sectional",
    },
    {
      id: "speed",
      title: "Speed Tests",
      description: "Quick practice for rapid improvement",
      icon: <Zap className="w-6 h-6" />,
      count: 18,
      route: "speed",
    },
    {
      id: "previous",
      title: "Previous Year Papers",
      description: "Solve past year questions",
      icon: <History className="w-6 h-6" />,
      count: 7,
      route: "previous",
    },
  ],
  "ssc-cgl": [
    {
      id: "full",
      title: "Full Length Tests",
      description: "Complete mock tests with all sections",
      icon: <BookOpen className="w-6 h-6" />,
      count: 14,
      route: "full",
    },
    {
      id: "sectional",
      title: "Sectional Tests",
      description: "Practice specific sections",
      icon: <Clock className="w-6 h-6" />,
      count: 28,
      route: "sectional",
    },
    {
      id: "speed",
      title: "Speed Tests",
      description: "Quick practice for rapid improvement",
      icon: <Zap className="w-6 h-6" />,
      count: 22,
      route: "speed",
    },
    {
      id: "previous",
      title: "Previous Year Papers",
      description: "Solve past year questions",
      icon: <History className="w-6 h-6" />,
      count: 9,
      route: "previous",
    },
  ],
};

const examNames: Record<string, string> = {
  "ibps-po": "IBPS PO",
  "sbi-po": "SBI PO",
  "ibps-clerk": "IBPS Clerk",
  "ssc-cgl": "SSC CGL",
};

function generateTests(examName: string, type: string): Test[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `${type}-${i + 1}`,
    title: `${examName} ${type.charAt(0).toUpperCase() + type.slice(1)} Test ${i + 1}`,
    duration: "180 mins",
    questions: 100,
    status:
      Math.random() > 0.7
        ? "attempted"
        : Math.random() > 0.5
          ? "free"
          : "available",
    score: Math.floor(Math.random() * 100),
    rank: Math.floor(Math.random() * 1000) + 1,
  }));
}

export default function ExamPage({ params }: { params: { exam: string } }) {
  const examId = params.exam;
  const categories = testCategories[examId] || testCategories["ibps-po"];
  const examName = examNames[examId] || examId.toUpperCase();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("full");

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{examName} Test Series</h1>
          <p className="text-muted-foreground">
            Choose a test category to start practicing
          </p>
        </div>

        <Tabs
          defaultValue="full"
          value={selectedTab}
          onValueChange={setSelectedTab}
        >
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2"
                >
                  {category.icon}
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {categories.map((category) => {
            const tests = generateTests(examName, category.id).filter((test) =>
              test.title.toLowerCase().includes(searchQuery.toLowerCase()),
            );

            return (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tests.map((test) => (
                    <Card key={test.id} className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{test.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Timer className="w-4 h-4" />
                                {test.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {test.questions} marks
                              </span>
                            </div>
                          </div>
                          <div
                            className={cn(
                              "px-2 py-1 rounded text-sm font-medium",
                              test.status === "free" &&
                                "bg-green-100 text-green-700",
                              test.status === "attempted" &&
                                "bg-blue-100 text-blue-700",
                              test.status === "available" &&
                                "bg-yellow-100 text-yellow-700",
                            )}
                          >
                            {test.status.charAt(0).toUpperCase() +
                              test.status.slice(1)}
                          </div>
                        </div>

                        {test.status === "attempted" && (
                          <div className="flex items-center justify-between text-sm border-t pt-4">
                            <div>
                              <p className="text-muted-foreground">
                                Your Score
                              </p>
                              <p className="font-medium">{test.score}/100</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Rank</p>
                              <p className="font-medium">#{test.rank}</p>
                            </div>
                          </div>
                        )}

                        <ExamButton examId={examId} className="w-full">
                          {test.status === "attempted"
                            ? "Retake Test"
                            : "Take Test"}
                        </ExamButton>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
