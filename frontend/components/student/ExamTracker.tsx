"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Timer } from "lucide-react";

interface Exam {
  id: number;
  name: string;
  date: string;
  daysLeft: number;
  progress: number;
}

const mockExams: Exam[] = [
  {
    id: 1,
    name: "Mathematics Final",
    date: "2024-05-15",
    daysLeft: 30,
    progress: 65
  },
  {
    id: 2,
    name: "Physics Midterm",
    date: "2024-04-20",
    daysLeft: 15,
    progress: 80
  }
];

export function ExamTracker() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Target Exam Tracker</h3>
      <div className="space-y-6">
        {mockExams.map((exam) => (
          <div key={exam.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{exam.name}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="w-4 h-4" />
                  <span>{exam.date}</span>
                  <Timer className="w-4 h-4 ml-2" />
                  <span>{exam.daysLeft} days left</span>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Preparation Progress</span>
                <span>{exam.progress}%</span>
              </div>
              <Progress value={exam.progress} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}