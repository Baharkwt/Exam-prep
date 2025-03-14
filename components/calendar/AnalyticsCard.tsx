"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChevronDown, ChevronUp, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskAnalytics, StudyAnalytics } from "@/types/calendar";

interface AnalyticsCardProps {
  taskAnalytics: TaskAnalytics;
  studyAnalytics: StudyAnalytics;
}

export function AnalyticsCard({ taskAnalytics, studyAnalytics }: AnalyticsCardProps) {
  const [expanded, setExpanded] = useState(true);
  
  // Prepare data for charts
  const priorityData = [
    { name: "High", value: taskAnalytics.tasksByPriority.high, color: "#ef4444" },
    { name: "Medium", value: taskAnalytics.tasksByPriority.medium, color: "#f59e0b" },
    { name: "Low", value: taskAnalytics.tasksByPriority.low, color: "#10b981" },
  ];
  
  const subjectData = Object.entries(taskAnalytics.tasksBySubject).map(([subject, count]) => ({
    name: subject,
    tasks: count,
  }));
  
  const studyTimeData = Object.entries(studyAnalytics.studyTimeBySubject).map(([subject, minutes]) => ({
    name: subject,
    minutes: minutes,
    hours: Math.round(minutes / 60 * 10) / 10,
  }));
  
  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#ef4444", "#f59e0b", "#f97316", "#14b8a6", "#6366f1", "#ec4899", "#6b7280"];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Study Analytics</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <CardDescription>
          Track your progress and study patterns
        </CardDescription>
      </CardHeader>
      
      {expanded && (
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Completion Rate</h3>
                <p className="text-2xl font-bold">{taskAnalytics.completionRate.toFixed(0)}%</p>
                <Progress value={taskAnalytics.completionRate} className="mt-2" />
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Weekly Progress</h3>
                <p className="text-2xl font-bold">{studyAnalytics.weeklyProgress}%</p>
                <Progress value={studyAnalytics.weeklyProgress} className="mt-2" />
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Productivity Score</h3>
                <p className="text-2xl font-bold">{studyAnalytics.productivityScore}/100</p>
                <Progress value={studyAnalytics.productivityScore} className="mt-2" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Tasks by Priority</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={priorityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value} tasks`, "Count"]}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Study Time by Subject (hours)</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studyTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} hours`, "Study Time"]}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px',
                        }}
                      />
                      <Bar dataKey="hours">
                        {studyTimeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Tasks by Subject</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip 
                      formatter={(value) => [`${value} tasks`, "Count"]}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                      }}
                    />
                    <Bar dataKey="tasks" fill="hsl(var(--primary))">
                      {subjectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}