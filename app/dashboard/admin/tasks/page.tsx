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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  Clock,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  AlertCircle,
  Calendar as CalendarIcon2,
  User,
  X,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  deadline: Date;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed" | "overdue";
  createdAt: Date;
}

const mockEmployees = [
  { id: "emp1", name: "John Smith", role: "Content Creator" },
  { id: "emp2", name: "Sarah Johnson", role: "Test Designer" },
  { id: "emp3", name: "Michael Brown", role: "Subject Matter Expert" },
  { id: "emp4", name: "Emily Davis", role: "Content Reviewer" },
  { id: "emp5", name: "David Wilson", role: "Quiz Creator" },
];

const mockTasks: Task[] = [
  {
    id: "task1",
    title: "Create Banking Awareness Quiz",
    description:
      "Develop a comprehensive quiz covering recent banking policies and financial news",
    assignedTo: "emp1",
    deadline: new Date(2024, 4, 25),
    priority: "high",
    status: "in-progress",
    createdAt: new Date(2024, 4, 10),
  },
  {
    id: "task2",
    title: "Review Quantitative Aptitude Test",
    description:
      "Review and provide feedback on the quantitative aptitude test created by Sarah",
    assignedTo: "emp4",
    deadline: new Date(2024, 4, 20),
    priority: "medium",
    status: "pending",
    createdAt: new Date(2024, 4, 12),
  },
  {
    id: "task3",
    title: "Update English Grammar Section",
    description:
      "Update the English grammar section with new questions and examples",
    assignedTo: "emp2",
    deadline: new Date(2024, 4, 18),
    priority: "medium",
    status: "completed",
    createdAt: new Date(2024, 4, 5),
  },
  {
    id: "task4",
    title: "Create Monthly Performance Report",
    description: "Generate monthly performance report for all active students",
    assignedTo: "emp3",
    deadline: new Date(2024, 4, 30),
    priority: "high",
    status: "pending",
    createdAt: new Date(2024, 4, 15),
  },
  {
    id: "task5",
    title: "Develop New Reasoning Module",
    description:
      "Create a new module focusing on advanced reasoning techniques",
    assignedTo: "emp5",
    deadline: new Date(2024, 5, 10),
    priority: "low",
    status: "in-progress",
    createdAt: new Date(2024, 4, 8),
  },
];

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [employeeFilter, setEmployeeFilter] = useState<string>("all");

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isViewTaskOpen, setIsViewTaskOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: new Date(),
    priority: "medium" as "low" | "medium" | "high",
  });

  const filteredTasks = tasks.filter((task) => {
    // Search filter
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    // Priority filter
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    // Employee filter
    const matchesEmployee =
      employeeFilter === "all" || task.assignedTo === employeeFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesEmployee;
  });

  const handleAddTask = () => {
    const task: Task = {
      id: `task${tasks.length + 1}`,
      ...newTask,
      status: "pending",
      createdAt: new Date(),
    };

    setTasks([...tasks, task]);
    setIsAddTaskOpen(false);
    setNewTask({
      title: "",
      description: "",
      assignedTo: "",
      deadline: new Date(),
      priority: "medium",
    });
  };

  const handleViewTask = (task: Task) => {
    setCurrentTask(task);
    setIsViewTaskOpen(true);
  };

  const handleUpdateTaskStatus = (
    taskId: string,
    newStatus: "pending" | "in-progress" | "completed" | "overdue",
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );

    if (currentTask && currentTask.id === taskId) {
      setCurrentTask({ ...currentTask, status: newStatus });
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="default">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-500">Overdue</Badge>;
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
            <h1 className="text-3xl font-bold">Task Management</h1>
            <p className="text-muted-foreground">
              Assign and track tasks for employees
            </p>
          </div>
          <Button onClick={() => setIsAddTaskOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Assign New Task
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {mockEmployees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {filteredTasks.length > 0 ? (
              <div className="grid gap-4">
                {filteredTasks.map((task) => (
                  <Card key={task.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-lg">
                              {task.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{getEmployeeName(task.assignedTo)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4" />
                                <span>Due: {format(task.deadline, "PPP")}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>
                                  Created: {format(task.createdAt, "PPP")}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {getPriorityBadge(task.priority)}
                            {getStatusBadge(task.status)}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewTask(task)}
                            >
                              View Details
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
                  No tasks found matching your filters.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <div className="flex justify-center">
              <Card className="w-full max-w-4xl">
                <CardHeader>
                  <CardTitle>Task Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={new Date()}
                      className="rounded-md border shadow"
                    />
                  </div>

                  <div className="mt-6 space-y-2">
                    <h3 className="font-medium">Tasks Due Today</h3>
                    {filteredTasks
                      .filter((task) => {
                        const today = new Date();
                        return (
                          task.deadline.getDate() === today.getDate() &&
                          task.deadline.getMonth() === today.getMonth() &&
                          task.deadline.getFullYear() === today.getFullYear()
                        );
                      })
                      .map((task) => (
                        <div
                          key={task.id}
                          className="p-3 border rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Assigned to: {getEmployeeName(task.assignedTo)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(task.status)}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewTask(task)}
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      ))}

                    {filteredTasks.filter((task) => {
                      const today = new Date();
                      return (
                        task.deadline.getDate() === today.getDate() &&
                        task.deadline.getMonth() === today.getMonth() &&
                        task.deadline.getFullYear() === today.getFullYear()
                      );
                    }).length === 0 && (
                      <p className="text-center text-muted-foreground py-4">
                        No tasks due today.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Assign New Task</DialogTitle>
            <DialogDescription>
              Create a new task and assign it to an employee.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter task description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="assignee">Assign To</Label>
              <Select
                value={newTask.assignedTo}
                onValueChange={(value) =>
                  setNewTask({ ...newTask, assignedTo: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an employee" />
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
              <Label htmlFor="deadline">Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newTask.deadline && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newTask.deadline ? (
                      format(newTask.deadline, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newTask.deadline}
                    onSelect={(date) =>
                      date && setNewTask({ ...newTask, deadline: date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={newTask.priority}
                onValueChange={(value: "low" | "medium" | "high") =>
                  setNewTask({ ...newTask, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>Assign Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Task Dialog */}
      <Dialog open={isViewTaskOpen} onOpenChange={setIsViewTaskOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {currentTask && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>{currentTask.title}</DialogTitle>
                  {getPriorityBadge(currentTask.priority)}
                </div>
                <DialogDescription>
                  Task details and management
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <div className="p-3 border rounded-md bg-muted/50">
                    {currentTask.description}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Assigned To</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <span>{getEmployeeName(currentTask.assignedTo)}</span>
                    </div>
                  </div>

                  <div>
                    <Label>Status</Label>
                    <div className="mt-1">
                      {getStatusBadge(currentTask.status)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Deadline</Label>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{format(currentTask.deadline, "PPP")}</span>
                    </div>
                  </div>

                  <div>
                    <Label>Created</Label>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{format(currentTask.createdAt, "PPP")}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-2">
                  <Label>Update Status</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button
                      variant={
                        currentTask.status === "pending" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleUpdateTaskStatus(currentTask.id, "pending")
                      }
                    >
                      Pending
                    </Button>
                    <Button
                      variant={
                        currentTask.status === "in-progress"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleUpdateTaskStatus(currentTask.id, "in-progress")
                      }
                    >
                      In Progress
                    </Button>
                    <Button
                      variant={
                        currentTask.status === "completed"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleUpdateTaskStatus(currentTask.id, "completed")
                      }
                      className={
                        currentTask.status === "completed"
                          ? "bg-green-500 hover:bg-green-600"
                          : ""
                      }
                    >
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      Completed
                    </Button>
                    <Button
                      variant={
                        currentTask.status === "overdue" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleUpdateTaskStatus(currentTask.id, "overdue")
                      }
                      className={
                        currentTask.status === "overdue"
                          ? "bg-red-500 hover:bg-red-600"
                          : ""
                      }
                    >
                      <AlertCircle className="mr-1 h-4 w-4" />
                      Overdue
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsViewTaskOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
