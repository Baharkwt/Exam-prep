"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  Filter,
  Eye,
  FileText,
  Upload,
  CheckCircle,
  XCircle,
  BarChart3,
  User,
  Clock,
  FileQuestion,
} from "lucide-react";

interface Test {
  id: string;
  title: string;
  description: string;
  category: "prelims" | "mains" | "speed-drill";
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  questions: number;
  duration: number; // in minutes
  createdBy: string;
  createdAt: Date;
  status: "draft" | "pending-approval" | "published" | "unpublished";
  attempts?: number;
  avgScore?: number;
}

const mockEmployees = [
  { id: "emp1", name: "John Smith", role: "Content Creator" },
  { id: "emp2", name: "Sarah Johnson", role: "Test Designer" },
  { id: "emp3", name: "Michael Brown", role: "Subject Matter Expert" },
  { id: "emp4", name: "Emily Davis", role: "Content Reviewer" },
  { id: "emp5", name: "David Wilson", role: "Quiz Creator" },
];

const mockTests: Test[] = [
  {
    id: "test1",
    title: "Banking Awareness Quiz - April 2024",
    description:
      "Comprehensive quiz covering recent banking policies and financial news",
    category: "prelims",
    subject: "Banking Awareness",
    difficulty: "medium",
    questions: 50,
    duration: 60,
    createdBy: "emp1",
    createdAt: new Date(2024, 3, 15),
    status: "published",
    attempts: 245,
    avgScore: 72,
  },
  {
    id: "test2",
    title: "Quantitative Aptitude - Advanced",
    description:
      "Advanced level quantitative aptitude test focusing on data interpretation and arithmetic",
    category: "mains",
    subject: "Quantitative Aptitude",
    difficulty: "hard",
    questions: 35,
    duration: 45,
    createdBy: "emp2",
    createdAt: new Date(2024, 3, 20),
    status: "pending-approval",
  },
  {
    id: "test3",
    title: "English Grammar Speed Drill",
    description:
      "Quick practice drill focusing on common grammar errors and vocabulary",
    category: "speed-drill",
    subject: "English",
    difficulty: "easy",
    questions: 25,
    duration: 15,
    createdBy: "emp4",
    createdAt: new Date(2024, 3, 25),
    status: "draft",
  },
  {
    id: "test4",
    title: "Reasoning Ability - Logical Puzzles",
    description:
      "Test focusing on logical puzzles, seating arrangements, and blood relations",
    category: "mains",
    subject: "Reasoning",
    difficulty: "medium",
    questions: 30,
    duration: 40,
    createdBy: "emp3",
    createdAt: new Date(2024, 3, 18),
    status: "published",
    attempts: 189,
    avgScore: 68,
  },
  {
    id: "test5",
    title: "Current Affairs - March 2024",
    description:
      "Comprehensive test covering national and international current affairs for March 2024",
    category: "prelims",
    subject: "Current Affairs",
    difficulty: "medium",
    questions: 50,
    duration: 30,
    createdBy: "emp5",
    createdAt: new Date(2024, 3, 10),
    status: "unpublished",
  },
];

export default function AdminTestsPage() {
  const [tests, setTests] = useState<Test[]>(mockTests);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const [isAddTestOpen, setIsAddTestOpen] = useState(false);
  const [isViewTestOpen, setIsViewTestOpen] = useState(false);
  const [currentTest, setCurrentTest] = useState<Test | null>(null);

  const [newTest, setNewTest] = useState({
    title: "",
    description: "",
    category: "prelims" as "prelims" | "mains" | "speed-drill",
    subject: "",
    difficulty: "medium" as "easy" | "medium" | "hard",
    questions: 50,
    duration: 60,
    createdBy: "emp1",
  });

  const filteredTests = tests.filter((test) => {
    // Search filter
    const matchesSearch =
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.subject.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "all" || test.status === statusFilter;

    // Category filter
    const matchesCategory =
      categoryFilter === "all" || test.category === categoryFilter;

    // Difficulty filter
    const matchesDifficulty =
      difficultyFilter === "all" || test.difficulty === difficultyFilter;

    return (
      matchesSearch && matchesStatus && matchesCategory && matchesDifficulty
    );
  });

  const handleAddTest = () => {
    const test: Test = {
      id: `test${tests.length + 1}`,
      ...newTest,
      status: "draft",
      createdAt: new Date(),
    };

    setTests([...tests, test]);
    setIsAddTestOpen(false);
    setNewTest({
      title: "",
      description: "",
      category: "prelims",
      subject: "",
      difficulty: "medium",
      questions: 50,
      duration: 60,
      createdBy: "emp1",
    });
  };

  const handleViewTest = (test: Test) => {
    setCurrentTest(test);
    setIsViewTestOpen(true);
  };

  const handleUpdateTestStatus = (
    testId: string,
    newStatus: "draft" | "pending-approval" | "published" | "unpublished",
  ) => {
    setTests(
      tests.map((test) =>
        test.id === testId ? { ...test, status: newStatus } : test,
      ),
    );

    if (currentTest && currentTest.id === testId) {
      setCurrentTest({ ...currentTest, status: newStatus });
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <Badge className="bg-green-500">Easy</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "hard":
        return <Badge className="bg-red-500">Hard</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>;
      case "unpublished":
        return <Badge variant="outline">Unpublished</Badge>;
      case "pending-approval":
        return <Badge className="bg-yellow-500">Pending Approval</Badge>;
      case "draft":
        return <Badge className="bg-gray-500">Draft</Badge>;
      default:
        return null;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "prelims":
        return <Badge className="bg-blue-500">Prelims</Badge>;
      case "mains":
        return <Badge className="bg-purple-500">Mains</Badge>;
      case "speed-drill":
        return <Badge className="bg-orange-500">Speed Drill</Badge>;
      default:
        return null;
    }
  };

  const getEmployeeName = (employeeId: string) => {
    const employee = mockEmployees.find((emp) => emp.id === employeeId);
    return employee ? employee.name : "Unknown";
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Test Management</h1>
            <p className="text-muted-foreground">
              Create, review, and publish tests for students
            </p>
          </div>
          <Button onClick={() => setIsAddTestOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Test
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tests..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="unpublished">Unpublished</SelectItem>
                <SelectItem value="pending-approval">
                  Pending Approval
                </SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="prelims">Prelims</SelectItem>
                <SelectItem value="mains">Mains</SelectItem>
                <SelectItem value="speed-drill">Speed Drill</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={difficultyFilter}
              onValueChange={setDifficultyFilter}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Tests</TabsTrigger>
            <TabsTrigger value="pending-approval">Pending Approval</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredTests.length > 0 ? (
              <div className="grid gap-4">
                {filteredTests.map((test) => (
                  <Card key={test.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-lg">
                              {test.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {test.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>
                                  Created by: {getEmployeeName(test.createdBy)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{format(test.createdAt, "PPP")}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FileQuestion className="h-4 w-4" />
                                <span>{test.questions} questions</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{test.duration} minutes</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {getStatusBadge(test.status)}
                            {getCategoryBadge(test.category)}
                            {getDifficultyBadge(test.difficulty)}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewTest(test)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 border rounded-lg">
                <p className="text-muted-foreground">
                  No tests found matching your filters.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending-approval" className="space-y-4">
            {filteredTests.filter((test) => test.status === "pending-approval")
              .length > 0 ? (
              <div className="grid gap-4">
                {filteredTests
                  .filter((test) => test.status === "pending-approval")
                  .map((test) => (
                    <Card key={test.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <h3 className="font-semibold text-lg">
                                {test.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {test.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  <span>
                                    Created by:{" "}
                                    {getEmployeeName(test.createdBy)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{format(test.createdAt, "PPP")}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 border-green-600 hover:bg-green-50"
                                onClick={() =>
                                  handleUpdateTestStatus(test.id, "published")
                                }
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                onClick={() =>
                                  handleUpdateTestStatus(test.id, "draft")
                                }
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewTest(test)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-10 border rounded-lg">
                <p className="text-muted-foreground">
                  No tests pending approval.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="published" className="space-y-4">
            {filteredTests.filter((test) => test.status === "published")
              .length > 0 ? (
              <div className="grid gap-4">
                {filteredTests
                  .filter((test) => test.status === "published")
                  .map((test) => (
                    <Card key={test.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <h3 className="font-semibold text-lg">
                                {test.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {test.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  <span>
                                    Created by:{" "}
                                    {getEmployeeName(test.createdBy)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>
                                    Published: {format(test.createdAt, "PPP")}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleUpdateTestStatus(test.id, "unpublished")
                                }
                              >
                                Unpublish
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewTest(test)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>
                              {test.attempts && test.avgScore && (
                                <Button variant="outline" size="sm">
                                  <BarChart3 className="mr-2 h-4 w-4" />
                                  Analytics
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-10 border rounded-lg">
                <p className="text-muted-foreground">
                  No published tests found.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredTests.filter(
                    (test) =>
                      test.status === "published" &&
                      test.attempts &&
                      test.avgScore,
                  ).length > 0 ? (
                    <div className="grid gap-4">
                      {filteredTests
                        .filter(
                          (test) =>
                            test.status === "published" &&
                            test.attempts &&
                            test.avgScore,
                        )
                        .map((test) => (
                          <div key={test.id} className="p-4 border rounded-lg">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <h3 className="font-semibold">{test.title}</h3>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-1">
                                  <div className="flex items-center gap-1">
                                    <span>Attempts: {test.attempts}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span>Avg. Score: {test.avgScore}%</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span>Subject: {test.subject}</span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <BarChart3 className="mr-2 h-4 w-4" />
                                Detailed Analytics
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 border rounded-lg">
                      <p className="text-muted-foreground">
                        No analytics data available.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Test Dialog */}
      <Dialog open={isAddTestOpen} onOpenChange={setIsAddTestOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Test</DialogTitle>
            <DialogDescription>
              Create a new test or quiz for students.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Test Title</Label>
              <Input
                id="title"
                placeholder="Enter test title"
                value={newTest.title}
                onChange={(e) =>
                  setNewTest({ ...newTest, title: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter test description"
                value={newTest.description}
                onChange={(e) =>
                  setNewTest({ ...newTest, description: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newTest.category}
                  onValueChange={(value: "prelims" | "mains" | "speed-drill") =>
                    setNewTest({ ...newTest, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prelims">Prelims</SelectItem>
                    <SelectItem value="mains">Mains</SelectItem>
                    <SelectItem value="speed-drill">Speed Drill</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter subject"
                  value={newTest.subject}
                  onChange={(e) =>
                    setNewTest({ ...newTest, subject: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={newTest.difficulty}
                  onValueChange={(value: "easy" | "medium" | "hard") =>
                    setNewTest({ ...newTest, difficulty: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="questions">Number of Questions</Label>
                <Input
                  id="questions"
                  type="number"
                  placeholder="50"
                  value={newTest.questions.toString()}
                  onChange={(e) =>
                    setNewTest({
                      ...newTest,
                      questions: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="60"
                  value={newTest.duration.toString()}
                  onChange={(e) =>
                    setNewTest({
                      ...newTest,
                      duration: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="createdBy">Created By</Label>
              <Select
                value={newTest.createdBy}
                onValueChange={(value) =>
                  setNewTest({ ...newTest, createdBy: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select creator" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmployees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name} - {employee.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Upload Questions (Optional)</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Excel or Word document
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTestOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTest}>Create Test</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Test Dialog */}
      <Dialog open={isViewTestOpen} onOpenChange={setIsViewTestOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {currentTest && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>{currentTest.title}</DialogTitle>
                  {getStatusBadge(currentTest.status)}
                </div>
                <DialogDescription>
                  Test details and management
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <div className="p-3 border rounded-md bg-muted/50">
                    {currentTest.description}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Subject</Label>
                    <div className="p-2 border rounded-md mt-1">
                      {currentTest.subject}
                    </div>
                  </div>

                  <div>
                    <Label>Category</Label>
                    <div className="mt-1">
                      {getCategoryBadge(currentTest.category)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Difficulty</Label>
                    <div className="mt-1">
                      {getDifficultyBadge(currentTest.difficulty)}
                    </div>
                  </div>

                  <div>
                    <Label>Questions</Label>
                    <div className="p-2 border rounded-md mt-1">
                      {currentTest.questions}
                    </div>
                  </div>

                  <div>
                    <Label>Duration</Label>
                    <div className="p-2 border rounded-md mt-1">
                      {currentTest.duration} minutes
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Created By</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <span>{getEmployeeName(currentTest.createdBy)}</span>
                    </div>
                  </div>

                  <div>
                    <Label>Created On</Label>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{format(currentTest.createdAt, "PPP")}</span>
                    </div>
                  </div>
                </div>

                {currentTest.attempts && currentTest.avgScore && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Total Attempts</Label>
                      <div className="p-2 border rounded-md mt-1">
                        {currentTest.attempts}
                      </div>
                    </div>

                    <div>
                      <Label>Average Score</Label>
                      <div className="p-2 border rounded-md mt-1">
                        {currentTest.avgScore}%
                      </div>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4 mt-2">
                  <Label>Test Status</Label>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Switch
                        id="published"
                        checked={currentTest.status === "published"}
                        onCheckedChange={(checked) => {
                          handleUpdateTestStatus(
                            currentTest.id,
                            checked ? "published" : "unpublished",
                          );
                        }}
                      />
                      <Label htmlFor="published" className="cursor-pointer">
                        {currentTest.status === "published"
                          ? "Published"
                          : "Unpublished"}
                      </Label>
                    </div>

                    <div className="flex gap-2">
                      {currentTest.status === "pending-approval" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() =>
                              handleUpdateTestStatus(
                                currentTest.id,
                                "published",
                              )
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() =>
                              handleUpdateTestStatus(currentTest.id, "draft")
                            }
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                        </>
                      )}

                      {currentTest.status === "published" &&
                        currentTest.attempts &&
                        currentTest.avgScore && (
                          <Button variant="outline" size="sm">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            View Analytics
                          </Button>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsViewTestOpen(false)}
                >
                  Close
                </Button>
                <Button>Edit Test</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
