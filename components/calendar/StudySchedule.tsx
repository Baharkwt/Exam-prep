"use client";

import { useState } from "react";
import { format, isToday, isTomorrow, addDays } from "date-fns";
import { Task } from "@/types/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { cn, getSubjectColor } from "@/lib/utils";
import { generateWeeklySchedule } from "@/lib/calendar-data";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudyScheduleProps {
  tasks: Task[];
  onViewTask: (task: Task) => void;
}

export function StudySchedule({ tasks, onViewTask }: StudyScheduleProps) {
  const [expanded, setExpanded] = useState(true);
  const weeklySchedule = generateWeeklySchedule();
  
  const formatDayLabel = (date: Date) => {
    if (isToday(date)) {
      return "Today";
    } else if (isTomorrow(date)) {
      return "Tomorrow";
    } else {
      return format(date, "EEE");
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Study Schedule</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <CardDescription>
          Your optimized study plan for the week
        </CardDescription>
      </CardHeader>
      
      {expanded && (
        <CardContent className="p-0">
          <Tabs defaultValue="today">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              {weeklySchedule.slice(0, 5).map((day, index) => (
                <TabsTrigger
                  key={index}
                  value={index === 0 ? "today" : format(day.date, "EEE").toLowerCase()}
                  className={cn(
                    "rounded-none border-b-2 border-transparent pb-3 pt-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                    isToday(day.date) ? "font-medium" : ""
                  )}
                >
                  <div className="text-center">
                    <div className="text-xs">{formatDayLabel(day.date)}</div>
                    <div className="text-sm font-medium">{format(day.date, "d")}</div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {weeklySchedule.slice(0, 5).map((day, index) => (
              <TabsContent 
                key={index} 
                value={index === 0 ? "today" : format(day.date, "EEE").toLowerCase()}
                className="pt-4"
              >
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3 px-4 pr-6">
                    {day.tasks.length > 0 ? (
                      day.tasks.map((task) => (
                        <div 
                          key={task.id} 
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 cursor-pointer"
                          onClick={() => onViewTask(task)}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={getSubjectColor(task.subject)}>
                                {task.subject}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(task.dueDate), "h:mm a")}
                              </span>
                            </div>
                            <p className="font-medium mt-1">{task.title}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <Clock className="h-3 w-3" />
                              <span>{task.duration} min</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No tasks scheduled for this day.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
}