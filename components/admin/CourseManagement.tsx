"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, FileText, Video, CheckCircle } from "lucide-react";

interface Course {
  id: string;
  title: string;
  category: string;
  status: "active" | "inactive";
  students: number;
  lastUpdated: string;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Banking Exam Preparation",
    category: "Banking",
    status: "active",
    students: 245,
    lastUpdated: "2023-04-15",
  },
  {
    id: "2",
    title: "SSC Complete Course",
    category: "SSC",
    status: "active",
    students: 189,
    lastUpdated: "2023-04-10",
  },
  {
    id: "3",
    title: "RRB NTPC Preparation",
    category: "RRB",
    status: "active",
    students: 156,
    lastUpdated: "2023-04-05",
  },
  {
    id: "4",
    title: "RBI Grade B Complete Course",
    category: "RBI",
    status: "inactive",
    students: 78,
    lastUpdated: "2023-03-28",
  },
];

export function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Course Title</Label>
                <Input id="title" placeholder="Enter course title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select category</option>
                  <option value="Banking">Banking</option>
                  <option value="SSC">SSC</option>
                  <option value="RRB">RRB</option>
                  <option value="RBI">RBI</option>
                </select>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setIsAddDialogOpen(false)}
                  className="mr-2"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add Course
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="banking">Banking</TabsTrigger>
          <TabsTrigger value="ssc">SSC</TabsTrigger>
          <TabsTrigger value="rrb">RRB</TabsTrigger>
          <TabsTrigger value="rbi">RBI</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
              <div className="col-span-4">Course Title</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Students</div>
              <div className="col-span-2">Actions</div>
            </div>
            {courses.map((course) => (
              <div
                key={course.id}
                className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
              >
                <div className="col-span-4 font-medium">{course.title}</div>
                <div className="col-span-2">{course.category}</div>
                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    {course.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="col-span-2">{course.students}</div>
                <div className="col-span-2 flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Other tabs would have similar content filtered by category */}
        <TabsContent value="banking" className="space-y-4">
          <div className="rounded-md border">
            {/* Similar structure but filtered for banking courses */}
            {courses
              .filter((course) => course.category === "Banking")
              .map((course) => (
                <div
                  key={course.id}
                  className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
                >
                  <div className="col-span-4 font-medium">{course.title}</div>
                  <div className="col-span-2">{course.category}</div>
                  <div className="col-span-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {course.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="col-span-2">{course.students}</div>
                  <div className="col-span-2 flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        {/* Similar TabsContent for other categories */}
      </Tabs>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Course Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Tests</h4>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> Assign
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Full Tests</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Sectional Tests</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Speed Tests</span>
                <span className="font-medium">18</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Video Lectures</h4>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> Upload
              </Button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Total Videos</span>
              <span className="font-medium">36</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">PDF Materials</h4>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> Upload
              </Button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Total PDFs</span>
              <span className="font-medium">28</span>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
}
