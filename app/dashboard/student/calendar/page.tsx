"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, List, LayoutGrid, Settings2 } from "lucide-react";
import { TaskList } from "@/components/calendar/TaskList";
import { CalendarView } from "@/components/calendar/CalendarView";
import { TaskForm } from "@/components/calendar/TaskForm";
import { AIRecommendations } from "@/components/calendar/AIRecommendations";
import { StudySchedule } from "@/components/calendar/StudySchedule";
import { AnalyticsCard } from "@/components/calendar/AnalyticsCard";
import { Task, AIRecommendation } from "@/types/calendar";
import { mockTasks, mockEvents, mockAIRecommendations, mockTaskAnalytics, mockStudyAnalytics } from "@/lib/calendar-data";

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(mockAIRecommendations);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedTask } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId: string, completed: boolean) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed } : task
    ));
  };

  const handleAddTaskFromCalendar = (date: Date) => {
    setSelectedDate(date);
    setIsAddDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsEditDialogOpen(true);
  };

  const handleViewTask = (task: Task) => {
    setCurrentTask(task);
    setIsEditDialogOpen(true);
  };

  const handleApplyRecommendation = (recommendation: AIRecommendation) => {
    // Mark recommendation as applied
    setRecommendations(recommendations.map(rec => 
      rec.id === recommendation.id ? { ...rec, applied: true } : rec
    ));

    // If it's a task recommendation, create a new task
    if (recommendation.recommendationType === 'task') {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: recommendation.recommendation,
        subject: 'Mathematics', // Default subject, would be more specific in a real app
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        priority: 'medium',
        duration: 60,
        notes: recommendation.reason,
        completed: false,
        recurring: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'user1',
        aiGenerated: true,
      };
      
      setTasks([...tasks, newTask]);
    }
  };

  const handleDismissRecommendation = (recommendationId: string) => {
    setRecommendations(recommendations.filter(rec => rec.id !== recommendationId));
  };

  const handleAddTaskSubmit = (data: any) => {
    handleAddTask({
      ...data,
      id: `task-${Date.now()}`,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'user1',
    });
    setIsAddDialogOpen(false);
  };

  const handleUpdateTaskSubmit = (data: any) => {
    if (currentTask) {
      handleUpdateTask(currentTask.id, {
        ...data,
        updatedAt: new Date(),
      });
    }
    setIsEditDialogOpen(false);
    setCurrentTask(undefined);
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Study Calendar</h1>
          <p className="text-muted-foreground">Manage your study schedule and tasks</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="calendar">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="calendar" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Calendar
                  </TabsTrigger>
                  <TabsTrigger value="tasks" className="flex items-center gap-2">
                    <List className="h-4 w-4" />
                    Tasks
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                </TabsList>
                
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings2 className="h-4 w-4" />
                  Preferences
                </Button>
              </div>
              
              <TabsContent value="calendar" className="mt-0">
                <CalendarView 
                  events={mockEvents}
                  tasks={tasks}
                  onAddTask={handleAddTaskFromCalendar}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}
                />
              </TabsContent>
              
              <TabsContent value="tasks" className="mt-0">
                <TaskList 
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}
                />
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <AnalyticsCard 
                  taskAnalytics={mockTaskAnalytics}
                  studyAnalytics={mockStudyAnalytics}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <AIRecommendations 
              recommendations={recommendations}
              onApplyRecommendation={handleApplyRecommendation}
              onDismissRecommendation={handleDismissRecommendation}
            />
            
            <StudySchedule 
              tasks={tasks}
              onViewTask={handleViewTask}
            />
          </div>
        </div>
      </div>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task with details and scheduling options.
            </DialogDescription>
          </DialogHeader>
          <TaskForm
            onSubmit={handleAddTaskSubmit}
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
              onSubmit={handleUpdateTaskSubmit}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setCurrentTask(undefined);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}