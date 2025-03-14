"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Complete Physics Assignment",
    completed: false,
    dueDate: "2024-03-25",
    priority: "high"
  },
  {
    id: 2,
    title: "Review Math Chapter 5",
    completed: false,
    dueDate: "2024-03-26",
    priority: "medium"
  },
  {
    id: 3,
    title: "Practice Mock Test",
    completed: true,
    dueDate: "2024-03-24",
    priority: "high"
  }
];

export function TaskManager() {
  const [tasks, setTasks] = useState(mockTasks);

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Task Manager</h3>
        <Button size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              task.completed ? "bg-muted/50" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <div>
                <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                  {task.title}
                </p>
                <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
              </div>
            </div>
            <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}