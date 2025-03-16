"use client";

import { DashboardLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDigit, Download, Eye, BookOpen, Clock } from "lucide-react";

interface PDFCourse {
  id: string;
  title: string;
  category: string;
  pages: number;
  lastUpdated: string;
  size: string;
  viewed?: boolean;
  progress?: number;
}

const mockPDFCourses: PDFCourse[] = [
  {
    id: "1",
    title: "Complete Banking Awareness Guide",
    category: "Banking",
    pages: 120,
    lastUpdated: "March 15, 2024",
    size: "8.5 MB",
    viewed: true,
    progress: 45,
  },
  {
    id: "2",
    title: "Quantitative Aptitude Formulas",
    category: "Quantitative",
    pages: 85,
    lastUpdated: "March 10, 2024",
    size: "5.2 MB",
    viewed: true,
    progress: 80,
  },
  {
    id: "3",
    title: "English Grammar & Vocabulary",
    category: "English",
    pages: 150,
    lastUpdated: "March 5, 2024",
    size: "10.1 MB",
    viewed: false,
  },
  {
    id: "4",
    title: "Reasoning Shortcuts & Tricks",
    category: "Reasoning",
    pages: 95,
    lastUpdated: "February 28, 2024",
    size: "6.8 MB",
    viewed: false,
  },
  {
    id: "5",
    title: "Current Affairs Compilation (Jan-Mar 2024)",
    category: "Current Affairs",
    pages: 200,
    lastUpdated: "March 31, 2024",
    size: "12.5 MB",
    viewed: false,
  },
  {
    id: "6",
    title: "Computer Knowledge for Banking Exams",
    category: "Computer",
    pages: 75,
    lastUpdated: "March 20, 2024",
    size: "4.8 MB",
    viewed: true,
    progress: 30,
  },
];

export default function PDFCoursesPage() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">PDF Courses</h1>
          <p className="text-muted-foreground">
            Access comprehensive study materials and guides
          </p>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All PDFs</TabsTrigger>
            <TabsTrigger value="banking">Banking</TabsTrigger>
            <TabsTrigger value="quantitative">Quantitative</TabsTrigger>
            <TabsTrigger value="reasoning">Reasoning</TabsTrigger>
            <TabsTrigger value="english">English</TabsTrigger>
            <TabsTrigger value="current">Current Affairs</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPDFCourses.map((course) => (
                <Card
                  key={course.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge variant={course.viewed ? "secondary" : "default"}>
                        {course.viewed ? "In Progress" : "New"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>{course.pages} pages</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Updated: {course.lastUpdated}</span>
                        </div>
                      </div>

                      {course.viewed && course.progress && (
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                          <p className="text-xs text-right mt-1">
                            {course.progress}% complete
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button className="flex-1" variant="default">
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View PDF</span>
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Similar content for other tabs, filtering by category */}
          {["banking", "quantitative", "reasoning", "english", "current"].map(
            (category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockPDFCourses
                    .filter(
                      (course) =>
                        course.category.toLowerCase() === category ||
                        (category === "current" &&
                          course.category === "Current Affairs"),
                    )
                    .map((course) => (
                      <Card
                        key={course.id}
                        className="overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">
                              {course.title}
                            </CardTitle>
                            <Badge
                              variant={course.viewed ? "secondary" : "default"}
                            >
                              {course.viewed ? "In Progress" : "New"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <span>{course.pages} pages</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>Updated: {course.lastUpdated}</span>
                              </div>
                            </div>

                            {course.viewed && course.progress && (
                              <div className="w-full bg-muted rounded-full h-2.5">
                                <div
                                  className="bg-primary h-2.5 rounded-full"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                                <p className="text-xs text-right mt-1">
                                  {course.progress}% complete
                                </p>
                              </div>
                            )}

                            <div className="flex gap-2">
                              <Button className="flex-1" variant="default">
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View PDF</span>
                              </Button>
                              <Button variant="outline">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ),
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
