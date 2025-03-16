"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  FileQuestion,
  Calendar,
  Clock,
  ChevronRight,
  Download,
  Users,
  Plus,
  List,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";

interface QuizItem {
  id: string;
  title: string;
  date: string;
  questions: number;
  duration: string;
  category: string;
  attempted?: boolean;
  score?: number;
  participants?: number;
}

const mockDailyQuizzes: QuizItem[] = [
  {
    id: "d1",
    title: "Current Affairs: April 15, 2024",
    date: "April 15, 2024",
    questions: 10,
    duration: "10 mins",
    category: "Daily",
    participants: 1245,
  },
  {
    id: "d2",
    title: "Current Affairs: April 14, 2024",
    date: "April 14, 2024",
    questions: 10,
    duration: "10 mins",
    category: "Daily",
    attempted: true,
    score: 80,
    participants: 1876,
  },
  {
    id: "d3",
    title: "Current Affairs: April 13, 2024",
    date: "April 13, 2024",
    questions: 10,
    duration: "10 mins",
    category: "Daily",
    attempted: true,
    score: 90,
    participants: 2134,
  },
];

const mockWeeklyQuizzes: QuizItem[] = [
  {
    id: "w1",
    title: "Current Affairs: April Week 2, 2024",
    date: "April 8-14, 2024",
    questions: 20,
    duration: "15 mins",
    category: "Weekly",
    participants: 3245,
  },
  {
    id: "w2",
    title: "Current Affairs: April Week 1, 2024",
    date: "April 1-7, 2024",
    questions: 20,
    duration: "15 mins",
    category: "Weekly",
    attempted: true,
    score: 85,
    participants: 4532,
  },
  {
    id: "w3",
    title: "Current Affairs: March Week 4, 2024",
    date: "March 25-31, 2024",
    questions: 20,
    duration: "15 mins",
    category: "Weekly",
    attempted: true,
    score: 75,
    participants: 5123,
  },
];

const mockMonthlyQuizzes: QuizItem[] = [
  {
    id: "m1",
    title: "Current Affairs: March 2024",
    date: "March 1-31, 2024",
    questions: 50,
    duration: "45 mins",
    category: "Monthly",
    attempted: true,
    score: 82,
    participants: 8765,
  },
  {
    id: "m2",
    title: "Current Affairs: February 2024",
    date: "February 1-29, 2024",
    questions: 50,
    duration: "45 mins",
    category: "Monthly",
    attempted: true,
    score: 78,
    participants: 9234,
  },
  {
    id: "m3",
    title: "Banking & Finance: Q1 2024",
    date: "January-March 2024",
    questions: 60,
    duration: "60 mins",
    category: "Quarterly",
    participants: 6543,
  },
];

export default function CurrentAffairsPage() {
  const [activeTab, setActiveTab] = useState("daily");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput]);
      setTaskInput("");
      setShowTaskInput(false);
    }
  };

  const getFilteredQuizzes = () => {
    let quizzes: QuizItem[] = [];

    switch (activeTab) {
      case "daily":
        quizzes = mockDailyQuizzes;
        break;
      case "weekly":
        quizzes = mockWeeklyQuizzes;
        break;
      case "monthly":
        quizzes = mockMonthlyQuizzes;
        break;
      default:
        quizzes = [
          ...mockDailyQuizzes,
          ...mockWeeklyQuizzes,
          ...mockMonthlyQuizzes,
        ];
    }

    if (searchQuery) {
      return quizzes.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quiz.date.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return quizzes;
  };

  const filteredQuizzes = getFilteredQuizzes();

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Current Affairs Quiz</h1>
            <p className="text-muted-foreground">
              Stay updated with the latest current affairs
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <div className="grid grid-cols-2 gap-1 h-4 w-4">
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                </div>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Tabs
              defaultValue="daily"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="mb-6">
                <TabsTrigger value="daily" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Daily
                </TabsTrigger>
                <TabsTrigger value="weekly" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Monthly
                </TabsTrigger>
              </TabsList>

              {["daily", "weekly", "monthly"].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-0">
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredQuizzes.map((quiz) => (
                        <motion.div
                          key={quiz.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">
                                  {quiz.title}
                                </CardTitle>
                                <Badge
                                  variant={
                                    quiz.attempted ? "secondary" : "default"
                                  }
                                >
                                  {quiz.attempted ? "Attempted" : "New"}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="flex items-center gap-4 text-sm">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>{quiz.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{quiz.duration}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FileQuestion className="h-4 w-4 text-muted-foreground" />
                                    <span>{quiz.questions} questions</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  <span>
                                    {quiz.participants?.toLocaleString()} people
                                    attempted
                                  </span>
                                </div>

                                {quiz.attempted && (
                                  <div className="py-2 px-3 bg-muted rounded-md">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm font-medium">
                                        Your Score
                                      </span>
                                      <span className="text-sm font-bold">
                                        {quiz.score}%
                                      </span>
                                    </div>
                                  </div>
                                )}

                                <div className="flex gap-2">
                                  <Button className="flex-1" variant="default">
                                    <span>
                                      {quiz.attempted
                                        ? "Retake Quiz"
                                        : "Take Quiz"}
                                    </span>
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="icon">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <div className="divide-y">
                        {filteredQuizzes.map((quiz) => (
                          <motion.div
                            key={quiz.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="p-4 hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">
                                    {quiz.title}
                                  </h3>
                                  <Badge
                                    variant={
                                      quiz.attempted ? "secondary" : "default"
                                    }
                                    className="ml-2"
                                  >
                                    {quiz.attempted ? "Attempted" : "New"}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{quiz.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{quiz.duration}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FileQuestion className="h-4 w-4" />
                                    <span>{quiz.questions} questions</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    <span>
                                      {quiz.participants?.toLocaleString()}{" "}
                                      attempted
                                    </span>
                                  </div>
                                </div>
                                {quiz.attempted && (
                                  <div className="mt-2">
                                    <span className="text-sm">
                                      Your Score:{" "}
                                      <span className="font-bold">
                                        {quiz.score}%
                                      </span>
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-2 self-end sm:self-center">
                                <Button size="sm">
                                  <span>
                                    {quiz.attempted ? "Retake" : "Take Quiz"}
                                  </span>
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Study Tasks</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTaskInput(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showTaskInput ? (
                  <div className="space-y-2">
                    <Input
                      placeholder="Enter task..."
                      value={taskInput}
                      onChange={(e) => setTaskInput(e.target.value)}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleAddTask}>
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowTaskInput(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : tasks.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No tasks yet</p>
                    <p className="text-sm">Click + to add study tasks</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {tasks.map((task, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 p-2 border rounded-md"
                      >
                        <div className="h-4 w-4 rounded-full border-2 border-primary flex-shrink-0" />
                        <span>{task}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">PDF Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-md hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">April 2024 Compilation</p>
                      <p className="text-sm text-muted-foreground">
                        Updated 2 days ago
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-3 border rounded-md hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">March 2024 Compilation</p>
                      <p className="text-sm text-muted-foreground">
                        Updated 30 days ago
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-3 border rounded-md hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Banking Updates Q1 2024</p>
                      <p className="text-sm text-muted-foreground">
                        Updated 15 days ago
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  View All Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
