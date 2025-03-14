"use client";

import { DashboardLayout } from "@/components/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, ChevronRight } from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  duration: string;
  rating: number;
  instructor: string;
  lastAccessed: string;
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: "Complete Banking Exam Preparation",
    description: "Comprehensive course covering all banking exam topics",
    progress: 65,
    duration: "40 hours",
    rating: 4.8,
    instructor: "John Smith",
    lastAccessed: "2 days ago"
  },
  {
    id: 2,
    title: "Quantitative Aptitude Mastery",
    description: "Master mathematical concepts for competitive exams",
    progress: 45,
    duration: "25 hours",
    rating: 4.9,
    instructor: "Sarah Johnson",
    lastAccessed: "1 day ago"
  },
  {
    id: 3,
    title: "English Language Skills",
    description: "Improve your English for banking and government exams",
    progress: 80,
    duration: "30 hours",
    rating: 4.7,
    instructor: "Michael Brown",
    lastAccessed: "3 days ago"
  }
];

export default function CoursesPage() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">Track your learning progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <Card key={course.id} className="p-6 hover:shadow-lg transition-all">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {course.description}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">
                      By {course.instructor}
                    </div>
                    <div className="text-muted-foreground">
                      Last accessed {course.lastAccessed}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Recommended Courses</h3>
              <p className="text-sm text-muted-foreground">
                Based on your study pattern and goals
              </p>
            </div>
            <Button>
              <BookOpen className="w-4 h-4 mr-2" />
              Browse All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="p-4">
                <h4 className="font-medium">Advanced Reasoning Course</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Master logical reasoning and puzzle-solving
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    20 hours
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    4.9
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}