"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  UserPlus,
  Mail,
  Phone,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  courses: number;
  testsCompleted: number;
  lastActive: string;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.s@example.com",
    phone: "+91 9876543210",
    joinDate: "2023-01-15",
    courses: 3,
    testsCompleted: 28,
    lastActive: "2023-04-15",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.p@example.com",
    phone: "+91 9876543211",
    joinDate: "2023-02-10",
    courses: 2,
    testsCompleted: 15,
    lastActive: "2023-04-14",
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit.k@example.com",
    phone: "+91 9876543212",
    joinDate: "2023-03-05",
    courses: 1,
    testsCompleted: 8,
    lastActive: "2023-04-10",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    email: "sneha.g@example.com",
    phone: "+91 9876543213",
    joinDate: "2023-03-20",
    courses: 2,
    testsCompleted: 12,
    lastActive: "2023-04-13",
  },
];

export function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.phone.includes(searchQuery),
  );

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Student Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="courses">Assign Courses</Label>
                <select
                  id="courses"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  multiple
                >
                  <option value="1">Banking Exam Preparation</option>
                  <option value="2">SSC Complete Course</option>
                  <option value="3">RRB NTPC Preparation</option>
                  <option value="4">RBI Grade B Complete Course</option>
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
                  Add Student
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email or phone..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
          <div className="col-span-3">Student</div>
          <div className="col-span-2">Contact</div>
          <div className="col-span-2">Join Date</div>
          <div className="col-span-1">Courses</div>
          <div className="col-span-2">Tests Completed</div>
          <div className="col-span-2">Actions</div>
        </div>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
            >
              <div className="col-span-3">
                <div className="font-medium">{student.name}</div>
                <div className="text-sm text-muted-foreground">
                  Last active: {student.lastActive}
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-3 w-3 mr-1" />
                  <span className="truncate">{student.email}</span>
                </div>
                <div className="flex items-center text-sm mt-1">
                  <Phone className="h-3 w-3 mr-1" />
                  <span>{student.phone}</span>
                </div>
              </div>
              <div className="col-span-2">{student.joinDate}</div>
              <div className="col-span-1">{student.courses}</div>
              <div className="col-span-2">{student.testsCompleted}</div>
              <div className="col-span-2 flex space-x-2">
                <Button size="sm" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No students found matching your search criteria.
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing {filteredStudents.length} of {students.length} students
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
