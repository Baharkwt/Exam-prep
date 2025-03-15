"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Calendar, CheckCircle, Clock, AlertCircle, User } from "lucide-react";

type TaskStatus = "pending" | "in-progress" | "completed" | "overdue";
type TaskPriority = "low" | "medium" | "high";

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string | null;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Upload Banking Exam PDFs",
    description: "Upload the latest Banking exam preparation PDFs to the platform",
    assignedTo: "Rahul Sharma",
    dueDate: "2023-04-20",
    status: "pending",
    priority: "high",
    createdAt: "2023-04-15",
  },
  {
    id: "2",
    title: "Create Current Affairs Quiz for April 15",
    description: "Prepare and upload the daily current affairs quiz for April 15",
    assignedTo: "Priya Patel",
    dueDate: "2023-04-15",
    status: "completed",
    priority: "high",
    createdAt: "2023-04-14",
  },
  {
    id: "3",
    title: "Review SSC Test Submissions",
    description: "Review and approve the pending SSC test submissions",
    assignedTo: null,
    dueDate: "2023-04-18",
    status: "pending",
    priority: "medium",
    createdAt: "2023-04-12",
  },
  {
    id: "4",
    title: "Update RRB Study Material",
    description: "Update the RRB study material with the latest syllabus changes",
    assignedTo: "Amit Kumar",
    dueDate: "2023-04-25",
    status: "in-progress",
    priority: "medium",
    createdAt: "2023-04-10",
  },
  {
    id: "5",
    title: "Fix Speed Drill Timer Issue",
    description: "Resolve the timer issue in the Quantitative Aptitude speed drill",
    assignedTo: "Sneha Gupta",
    dueDate: "2023-04-12",
    status: "overdue",
    priority: "high",
    createdAt: "2023-04-08",
  },
];

const mockEmployees = [
  { id: "1", name: "Rahul Sharma" },
  { id: "2", name: "Priya Patel" },
  { id: "3", name: "Amit Kumar" },
  { id: "4", name: "Sneha Gupta" },
  { id: "5", name: "Vikram Singh" },
];

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusText = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "overdue":
        return "Overdue";
      default:
        return "Pending";
    }
  };

  const getStatusClass = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getPriorityClass = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Task Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="