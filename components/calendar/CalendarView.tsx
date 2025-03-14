"use client";

import { useState } from "react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addDays, subDays } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { CalendarEvent, Task } from "@/types/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, getSubjectColor } from "@/lib/utils";
import { TaskCard } from "@/components/calendar/TaskCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CalendarViewProps {
  events: CalendarEvent[];
  tasks: Task[];
  onAddTask: (date: Date) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleComplete: (taskId: string, completed: boolean) => void;
}

export function CalendarView({ 
  events, 
  tasks, 
  onAddTask, 
  onEditTask, 
  onDeleteTask, 
  onToggleComplete 
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"week" | "day">("week");
  
  // Calculate week start and end dates
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start from Monday
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  
  // Generate array of days for the week
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  // Hours for day view
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const navigatePrevious = () => {
    if (view === "week") {
      setCurrentDate(subDays(currentDate, 7));
    } else {
      setCurrentDate(subDays(currentDate, 1));
    }
  };
  
  const navigateNext = () => {
    if (view === "week") {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };
  
  const navigateToday = () => {
    setCurrentDate(new Date());
  };
  
  // Filter events for the current view
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.start);
    if (view === "week") {
      return eventDate >= weekStart && eventDate <= weekEnd;
    } else {
      return isSameDay(eventDate, currentDate);
    }
  });
  
  // Filter tasks for the current view
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    if (view === "week") {
      return taskDate >= weekStart && taskDate <= weekEnd;
    } else {
      return isSameDay(taskDate, currentDate);
    }
  });
  
  // Group tasks by day for week view
  const tasksByDay = weekDays.map(day => ({
    date: day,
    tasks: filteredTasks.filter(task => isSameDay(new Date(task.dueDate), day))
  }));
  
  // Group tasks by hour for day view
  const tasksByHour = hours.map(hour => {
    const startHour = new Date(currentDate);
    startHour.setHours(hour, 0, 0, 0);
    
    const endHour = new Date(currentDate);
    endHour.setHours(hour, 59, 59, 999);
    
    return {
      hour,
      tasks: filteredTasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate >= startHour && taskDate <= endHour;
      })
    };
  });
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={navigatePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" onClick={navigateToday}>
            Today
          </Button>
          
          <Button variant="outline" size="icon" onClick={navigateNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <h2 className="text-xl font-semibold ml-2">
            {view === "week" 
              ? `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`
              : format(currentDate, "EEEE, MMMM d, yyyy")
            }
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={view === "week" ? "default" : "outline"} 
            onClick={() => setView("week")}
            size="sm"
          >
            Week
          </Button>
          <Button 
            variant={view === "day" ? "default" : "outline"} 
            onClick={() => setView("day")}
            size="sm"
          >
            Day
          </Button>
        </div>
      </div>
      
      {view === "week" ? (
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day, index) => (
            <div key={index} className="space-y-2">
              <div className={cn(
                "text-center p-2 rounded-md",
                isSameDay(day, new Date()) ? "bg-primary/10 font-bold" : ""
              )}>
                <div className="text-sm font-medium">{format(day, "EEE")}</div>
                <div className="text-2xl">{format(day, "d")}</div>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full text-muted-foreground" 
                size="sm"
                onClick={() => onAddTask(day)}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
              
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-2 pr-2">
                  {tasksByDay[index].tasks.length > 0 ? (
                    tasksByDay[index].tasks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                        onToggleComplete={onToggleComplete}
                        compact
                      />
                    ))
                  ) : (
                    <div className="text-center py-4 text-xs text-muted-foreground">
                      No tasks
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          ))}
        </div>
      ) : (
        <Card className="p-4">
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onAddTask(currentDate)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
          
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="space-y-4 pr-4">
              {hours.map((hour, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-16 text-right text-sm text-muted-foreground pt-2">
                    {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                  </div>
                  
                  <div className="flex-1 border-t pt-2 min-h-[60px]">
                    {tasksByHour[index].tasks.length > 0 ? (
                      <div className="space-y-2">
                        {tasksByHour[index].tasks.map(task => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={onEditTask}
                            onDelete={onDeleteTask}
                            onToggleComplete={onToggleComplete}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      )}
    </div>
  );
}