"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Download,
  Search,
  Filter,
  FileText,
  BarChart3,
  Users,
  BookOpen,
  Brain,
} from "lucide-react";

interface StudentPerformance {
  id: string;
  name: string;
  email: string;
  testsTaken: number;
  avgScore: number;
  strengths: string[];
  weaknesses: string[];
  lastActive: string;
}

interface SubjectPerformance {
  subject: string;
  avgScore: number;
  studentCount: number;
  color: string;
}

const mockStudents: StudentPerformance[] = [
  {
    id: "s1",
    name: "Rahul Sharma",
    email: "rahul.s@example.com",
    testsTaken: 24,
    avgScore: 78,
    strengths: ["Quantitative Aptitude", "Reasoning"],
    weaknesses: ["English Grammar", "Current Affairs"],
    lastActive: "2 days ago",
  },
  {
    id: "s2",
    name: "Priya Patel",
    email: "priya.p@example.com",
    testsTaken: 32,
    avgScore: 85,
    strengths: ["English", "Banking Awareness"],
    weaknesses: ["Data Interpretation"],
    lastActive: "1 day ago",
  },
  {
    id: "s3",
    name: "Amit Kumar",
    email: "amit.k@example.com",
    testsTaken: 18,
    avgScore: 72,
    strengths: ["Current Affairs", "Computer Knowledge"],
    weaknesses: ["Quantitative Aptitude", "Reasoning"],
    lastActive: "5 days ago",
  },
  {
    id: "s4",
    name: "Sneha Gupta",
    email: "sneha.g@example.com",
    testsTaken: 29,
    avgScore: 92,
    strengths: ["Reasoning", "English", "Quantitative Aptitude"],
    weaknesses: ["Banking Awareness"],
    lastActive: "Today",
  },
  {
    id: "s5",
    name: "Vikram Singh",
    email: "vikram.s@example.com",
    testsTaken: 15,
    avgScore: 68,
    strengths: ["Banking Awareness"],
    weaknesses: ["English Grammar", "Reasoning", "Quantitative Aptitude"],
    lastActive: "3 days ago",
  },
];

const subjectPerformanceData: SubjectPerformance[] = [
  {
    subject: "Quantitative Aptitude",
    avgScore: 72,
    studentCount: 450,
    color: "#3b82f6",
  },
  { subject: "Reasoning", avgScore: 78, studentCount: 420, color: "#8b5cf6" },
  { subject: "English", avgScore: 82, studentCount: 480, color: "#10b981" },
  {
    subject: "Current Affairs",
    avgScore: 65,
    studentCount: 380,
    color: "#ef4444",
  },
  {
    subject: "Banking Awareness",
    avgScore: 70,
    studentCount: 410,
    color: "#f59e0b",
  },
  {
    subject: "Computer Knowledge",
    avgScore: 85,
    studentCount: 320,
    color: "#6366f1",
  },
];

const monthlyProgressData = [
  { month: "Jan", avgScore: 68 },
  { month: "Feb", avgScore: 72 },
  { month: "Mar", avgScore: 75 },
  { month: "Apr", avgScore: 78 },
  { month: "May", avgScore: 80 },
  { month: "Jun", avgScore: 82 },
];

const testCategoryData = [
  { name: "Prelims", value: 45, color: "#3b82f6" },
  { name: "Mains", value: 30, color: "#8b5cf6" },
  { name: "Speed Drills", value: 25, color: "#f59e0b" },
];

export default function AdminReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [performanceFilter, setPerformanceFilter] = useState<string>("all");

  const filteredStudents = mockStudents.filter((student) => {
    // Search filter
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Subject filter (strengths or weaknesses)
    const matchesSubject =
      subjectFilter === "all" ||
      student.strengths.some((s) =>
        s.toLowerCase().includes(subjectFilter.toLowerCase()),
      ) ||
      student.weaknesses.some((w) =>
        w.toLowerCase().includes(subjectFilter.toLowerCase()),
      );

    // Performance filter
    const matchesPerformance =
      performanceFilter === "all" ||
      (performanceFilter === "high" && student.avgScore >= 80) ||
      (performanceFilter === "medium" &&
        student.avgScore >= 60 &&
        student.avgScore < 80) ||
      (performanceFilter === "low" && student.avgScore < 60);

    return matchesSearch && matchesSubject && matchesPerformance;
  });

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Performance Reports</h1>
            <p className="text-muted-foreground">
              Analyze student performance and identify areas for improvement
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Reports
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">
                  Average Score
                </CardTitle>
              </div>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76%</div>
              <p className="text-xs text-muted-foreground">
                +4% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">
                  Active Students
                </CardTitle>
              </div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
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
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,432</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">
                  Top Subject
                </CardTitle>
              </div>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">English</div>
              <p className="text-xs text-muted-foreground">82% average score</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Student Performance</TabsTrigger>
            <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
            <TabsTrigger value="tests">Test Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyProgressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
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
                          dataKey="avgScore"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="Average Score (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Test Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={testCategoryData}
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
                          {testCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Percentage"]}
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

            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Average Score"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                      <Bar dataKey="avgScore" name="Average Score (%)">
                        {subjectPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="quantitative">Quantitative</SelectItem>
                    <SelectItem value="reasoning">Reasoning</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="current affairs">
                      Current Affairs
                    </SelectItem>
                    <SelectItem value="banking">Banking</SelectItem>
                    <SelectItem value="computer">Computer</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={performanceFilter}
                  onValueChange={setPerformanceFilter}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Performance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Performance</SelectItem>
                    <SelectItem value="high">High (80%+)</SelectItem>
                    <SelectItem value="medium">Medium (60-79%)</SelectItem>
                    <SelectItem value="low">Low (Below 60%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <Card key={student.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-lg">
                              {student.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {student.email}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                <span>Tests: {student.testsTaken}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BarChart3 className="h-4 w-4" />
                                <span>Avg. Score: {student.avgScore}%</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>Last Active: {student.lastActive}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <Button variant="outline" size="sm">
                              View Detailed Report
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm font-medium mb-2">
                              Strengths:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {student.strengths.map((strength, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-green-100 text-green-800 border-green-200"
                                >
                                  {strength}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-2">
                              Areas for Improvement:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {student.weaknesses.map((weakness, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-red-100 text-red-800 border-red-200"
                                >
                                  {weakness}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10 border rounded-lg">
                  <p className="text-muted-foreground">
                    No students found matching your filters.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subjectPerformanceData.map((subject, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{subject.subject}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-1">
                          Average Score
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full"
                              style={{
                                width: `${subject.avgScore}%`,
                                backgroundColor: subject.color,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {subject.avgScore}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Students: {subject.studentCount}
                        </p>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Performance by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testCategoryData.map((category, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold">{category.name}</h3>
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: category.color }}
                            ></div>
                          </div>
                          <div className="text-3xl font-bold mb-2">
                            {category.value}%
                          </div>
                          <p className="text-sm text-muted-foreground">
                            of total tests taken
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Top Performing Tests</h3>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h4 className="font-medium">
                              English Grammar Speed Drill
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              92% average score • 245 attempts
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h4 className="font-medium">
                              Computer Knowledge Quiz
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              88% average score • 189 attempts
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h4 className="font-medium">
                              Reasoning Ability - Logical Puzzles
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              85% average score • 210 attempts
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
