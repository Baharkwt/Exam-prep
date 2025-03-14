"use client";

import { useState } from "react";
import { Task } from "@/types/calendar";
import { TaskCard } from "@/components/calendar/TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Filter, SortAsc, SortDesc, CheckCircle2, Circle } from "lucide-react";
import { mockSubjects } from "@/lib/calendar-data";
import { TaskForm } from "@/components/calendar/TaskForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TaskListProps {
  tasks: Task[];
  onAddTask: (task: any) => void;
  onUpdateTask: (taskId: string, task: any) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleComplete: (taskId: string, completed: boolean) => void;
}

export function TaskList({ tasks, onAddTask, onUpdateTask, onDeleteTask, onToggleComplete }: TaskListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("dueDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    // Search filter
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (task.notes && task.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Subject filter
    const matchesSubject = selectedSubject === "all" || task.subject === selectedSubject;
    
    // Priority filter
    const matchesPriority = selectedPriority === "all" || task.priority === selectedPriority;
    
    // Completed filter
    const matchesCompleted = showCompleted || !task.completed;
    
    return matchesSearch && matchesSubject && matchesPriority && matchesCompleted;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case "dueDate":
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case "priority":
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "subject":
        comparison = a.subject.localeCompare(b.subject);
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleAddTask = (data: any) => {
    onAddTask({
      ...data,
      id: `task-${Date.now()}`,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "user1",
    });
    setIsAddDialogOpen(false);
  };

  const handleUpdateTask = (data: any) => {
    if (currentTask) {
      onUpdateTask(currentTask.id, {
        ...data,
        updatedAt: new Date(),
      });
    }
    setIsEditDialogOpen(false);
    setCurrentTask(undefined);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsEditDialogOpen(true);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tasks..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowCompleted(!showCompleted)}
            title={showCompleted ? "Hide completed tasks" : "Show completed tasks"}
          >
            {showCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
          </Button>
          
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {mockSubjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.name}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Priority</p>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-2 border-t">
                <p className="text-sm font-medium mb-2">Sort By</p>
                <div className="flex items-center justify-between">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dueDate">Due Date</SelectItem>
                      <SelectItem value="priority">Priority</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="subject">Subject</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="ghost" size="icon" onClick={toggleSortOrder}>
                    {sortOrder === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="space-y-3 pr-4">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={onDeleteTask}
                onToggleComplete={onToggleComplete}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery || selectedSubject !== "all" || selectedPriority !== "all" ? (
                <p>No tasks match your filters.</p>
              ) : (
                <p>No tasks yet. Click "Add Task" to create one.</p>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task with details and scheduling options.
            </DialogDescription>
          </DialogHeader>
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update task details and scheduling options.
            </DialogDescription>
          </DialogHeader>
          {currentTask && (
            <TaskForm
              task={currentTask}
              onSubmit={handleUpdateTask}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setCurrentTask(undefined);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}