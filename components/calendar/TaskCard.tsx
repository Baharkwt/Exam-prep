"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Clock, Edit, Trash2, CheckCircle, Circle, AlertCircle } from "lucide-react";
import { Task } from "@/types/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatTimeRemaining, getPriorityColor, getSubjectColor } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string, completed: boolean) => void;
  compact?: boolean;
}

export function TaskCard({ task, onEdit, onDelete, onToggleComplete, compact = false }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <Card 
      className={cn(
        "transition-all duration-200 relative",
        task.completed ? "opacity-70" : "",
        isOverdue ? "border-red-300" : "",
        compact ? "p-2" : "p-4"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className={cn("p-0", compact ? "space-y-1" : "space-y-3")}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("rounded-full p-0 h-6 w-6", compact ? "-ml-1" : "")}
              onClick={() => onToggleComplete(task.id, !task.completed)}
            >
              {task.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
            
            <div>
              <h3 className={cn(
                "font-medium",
                task.completed ? "line-through text-muted-foreground" : "",
                compact ? "text-sm" : "text-base"
              )}>
                {task.title}
              </h3>
              
              {!compact && task.notes && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {task.notes}
                </p>
              )}
            </div>
          </div>
          
          {(isHovered || compact) && (
            <div className={cn("flex items-center gap-1", compact ? "absolute right-2 top-2" : "")}>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(task)}>
                <Edit className="h-4 w-4" />
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Task</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this task? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(task.id)} className="bg-destructive text-destructive-foreground">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
        
        {!compact && (
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={getSubjectColor(task.subject)}>
              {task.subject}
            </Badge>
            
            <Badge variant="outline" className={getPriorityColor(task.priority)}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
            
            {task.recurring && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {task.recurring.charAt(0).toUpperCase() + task.recurring.slice(1)}
              </Badge>
            )}
            
            {task.aiGenerated && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                AI Generated
              </Badge>
            )}
          </div>
        )}
        
        <div className={cn("flex items-center justify-between text-sm", compact ? "mt-1" : "mt-2")}>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className={cn("text-muted-foreground", compact ? "h-3 w-3" : "h-4 w-4")} />
            <span className={compact ? "text-xs" : "text-sm"}>
              {format(new Date(task.dueDate), compact ? "MMM d, h:mm a" : "PPP 'at' h:mm a")}
            </span>
          </div>
          
          {!task.completed && !compact && (
            <div className={cn(
              "text-sm font-medium",
              isOverdue ? "text-red-500" : "text-muted-foreground"
            )}>
              {isOverdue ? (
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Overdue
                </div>
              ) : (
                formatTimeRemaining(new Date(task.dueDate))
              )}
            </div>
          )}
          
          {compact && (
            <Badge variant="outline" className={cn(
              "text-xs",
              getPriorityColor(task.priority)
            )}>
              {task.priority.charAt(0).toUpperCase()}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}