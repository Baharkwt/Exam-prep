"use client";

import { DashboardLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Activity, Target, Clock, BookOpen } from "lucide-react";

// Mock data for performance analytics
const subjectPerformanceData = [
  { subject: "Quantitative", score: 85 },
  { subject: "Reasoning", score: 78 },
  { subject: "English", score: 92 },
  { subject: "General Awareness", score: 65 },
  { subject: "Computer", score: 88 },
];

const weeklyProgressData = [
  { week: "Week 1", score: 72 },
  { week: "Week 2", score: 75 },
  { week: "Week 3", score: 78 },
  { week: "Week 4", score: 82 },
  { week: "Week 5", score: 85 },
  { week: "Week 6", score: 88 },
];

const timeSpentData = [
  { name: "Quantitative", value: 35, color: "#3b82f6" },
  { name: "Reasoning", value: 25, color: "#8b5cf6" },
  { name: "English", value: 15, color: "#10b981" },
  { name: "General Awareness", value: 15, color: "#ef4444" },
  { name: "Computer", value: 10, color: "#f59e0b" },
];

const testScoresData = [
  { name: "Test 1", score: 75 },
  { name: "Test 2", score: 82 },
  { name: "Test 3", score: 78 },
  { name: "Test 4", score: 85 },
  { name: "Test 5", score: 90 },
  { name: "Test 6", score: 88 },
  { name: "Test 7", score: 92 },
];

const strengthsWeaknessesData = [
  { topic: "Number Series", category: "Quantitative", accuracy: 95 },
  { topic: "Data Interpretation", category: "Quantitative", accuracy: 88 },
  { topic: "Vocabulary", category: "English", accuracy: 92 },
  { topic: "Reading Comprehension", category: "English", accuracy: 85 },
  { topic: "Syllogism", category: "Reasoning", accuracy: 75 },
  { topic: "Coding-Decoding", category: "Reasoning", accuracy: 68 },
  { topic: "Banking Awareness", category: "General Awareness", accuracy: 62 },
  { topic: "Computer Fundamentals", category: "Computer", accuracy: 90 },
];

export default function PerformanceAnalysisPage() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Performance & Analysis</h1>
          <p className="text-muted-foreground">
            Track your progress and identify areas for improvement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">
                  Average Score
                </CardTitle>
              </div>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">
                  Tests Taken
                </CardTitle>
              </div>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +8 from previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">
                  Study Time
                </CardTitle>
              </div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42 hrs</div>
              <p className="text-xs text-muted-foreground">
                +12% from previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">
                  Topics Covered
                </CardTitle>
              </div>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground">
                +15 from previous period
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
            <TabsTrigger value="tests">Test Performance</TabsTrigger>
            <TabsTrigger value="topics">Topic Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyProgressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="Score (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Spent by Subject</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={timeSpentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {timeSpentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Time Spent"]}
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={subjectPerformanceData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="subject" type="category" width={120} />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Score"]}
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                        />
                        <Bar dataKey="score" fill="#3b82f6" name="Score (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Scores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={testScoresData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#10b981"
                          strokeWidth={2}
                          name="Score (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="topics" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Strengths & Weaknesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={strengthsWeaknessesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="topic" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip
                          formatter={(value, name, props) => [
                            `${value}%`,
                            `Accuracy (${props.payload.category})`,
                          ]}
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                        />
                        <Bar dataKey="accuracy" name="Accuracy (%)">
                          {strengthsWeaknessesData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.accuracy >= 80
                                  ? "#10b981"
                                  : entry.accuracy >= 70
                                    ? "#f59e0b"
                                    : "#ef4444"
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
