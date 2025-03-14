"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutGrid, 
  List, 
  Search,
  Timer,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Test {
  id: string;
  title: string;
  duration: string;
  questions: number;
  status: "free" | "attempted" | "available";
  score?: number;
  rank?: number;
}

function generateTests(examName: string, type: string): Test[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `${type}-${i + 1}`,
    title: `${examName} ${type.charAt(0).toUpperCase() + type.slice(1)} Test ${i + 1}`,
    duration: "180 mins",
    questions: 100,
    status: Math.random() > 0.7 ? "attempted" : Math.random() > 0.5 ? "free" : "available",
    score: Math.floor(Math.random() * 100),
    rank: Math.floor(Math.random() * 1000) + 1
  }));
}

const examNames: Record<string, string> = {
  "ibps-po": "IBPS PO",
  "sbi-po": "SBI PO",
  "ibps-clerk": "IBPS Clerk",
  "ssc-cgl": "SSC CGL"
};

const testTypes: Record<string, string> = {
  "full": "Full Length",
  "sectional": "Sectional",
  "speed": "Speed",
  "previous": "Previous Year"
};

export function generateStaticParams() {
  const exams = ["ibps-po", "sbi-po", "ibps-clerk", "ssc-cgl"];
  const types = ["full", "sectional", "speed", "previous"];
  
  return exams.flatMap(exam => 
    types.map(testType => ({
      exam,
      testType
    }))
  );
}

export default function TestListPage({ params }: { params: { exam: string; testType: string } }) {
  const examId = params.exam;
  const testType = params.testType;
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  
  const examName = examNames[examId] || examId.toUpperCase();
  const typeLabel = testTypes[testType] || testType;
  const tests = generateTests(examName, testType);

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{examName} {typeLabel} Tests</h1>
          <p className="text-muted-foreground">
            Practice tests to improve your performance
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search tests..." />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewType === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewType("grid")}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewType === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewType("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Tests</TabsTrigger>
            <TabsTrigger value="free">Free Tests</TabsTrigger>
            <TabsTrigger value="attempted">Attempted</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
          </TabsList>
        </Tabs>

        {viewType === "grid" ? (
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
                    <div className={cn(
                      "px-2 py-1 rounded text-sm font-medium",
                      test.status === "free" && "bg-green-100 text-green-700",
                      test.status === "attempted" && "bg-blue-100 text-blue-700",
                      test.status === "available" && "bg-yellow-100 text-yellow-700"
                    )}>
                      {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                    </div>
                  </div>

                  {test.status === "attempted" && (
                    <div className="flex items-center justify-between text-sm border-t pt-4">
                      <div>
                        <p className="text-muted-foreground">Your Score</p>
                        <p className="font-medium">{test.score}/100</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rank</p>
                        <p className="font-medium">#{test.rank}</p>
                      </div>
                    </div>
                  )}

                  <Button className="w-full" asChild>
                    <Link href={`/tests/${examId}/${testType}/${test.id}`}>
                      {test.status === "attempted" ? "Retake Test" : "Take Test"}
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="divide-y">
              {tests.map((test) => (
                <div 
                  key={test.id}
                  className="flex items-center justify-between p-4 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold">{test.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "px-2 py-1 rounded text-sm font-medium",
                      test.status === "free" && "bg-green-100 text-green-700",
                      test.status === "attempted" && "bg-blue-100 text-blue-700",
                      test.status === "available" && "bg-yellow-100 text-yellow-700"
                    )}>
                      {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                    </div>
                    <Button asChild>
                      <Link href={`/tests/${examId}/${testType}/${test.id}`}>
                        {test.status === "attempted" ? "Retake" : "Take Test"}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}