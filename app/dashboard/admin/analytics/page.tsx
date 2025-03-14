"use client";

import { DashboardLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, Calendar, Users, BookOpen, Clock } from "lucide-react";
import { mockTaskAnalytics, mockStudyAnalytics } from "@/lib/calendar-data";

// Mock data for admin analytics
const userActivityData = [
  { date: "Jan", active: 1200, new: 450 },
  { date: "Feb", active: 1350, new: 380 },
  { date: "Mar", active: 1400, new: 420 },
  { date: "Apr", active: 1500, new: 390 },
  { date: "May", active: 1600, new: 450 },
  { date: "Jun", active: 1750, new: 480 },
];

const taskCreationData = [
  { date: "Mon", count: 120 },
  { date: "Tue", count: 145 },
  { date: "Wed", count: 132 },
  { date: "Thu", count: 167 },
  { date: "Fri", count: 189 },
  { date: "Sat", count: 95 },
  { date: "Sun", count: 87 },
];

const featureUsageData = [
  { name: "Task Creation", value: 35, color: "#3b82f6" },
  { name: "Calendar View", value: 25, color: "#8b5cf6" },
  { name: "AI Recommendations", value: 15, color: "#10b981" },
  { name: "Analytics", value: 10, color: "#ef4444" },
  { name: "Study Schedule", value: 15, color: "#f59e0b" },
];

const subjectPopularityData = [
  { name: "Mathematics", students: 850 },
  { name: "Physics", students: 720 },
  { name: "Chemistry", students: 680 },
  { name: "Biology", students: 590 },
  { name: "English", students: 820 },
  { name: "Computer Science", students: 750 },
];

const peakUsageData = [
  { hour: "6 AM", users: 120 },
  { hour: "8 AM", users: 350 },
  { hour: "10 AM", users: 580 },
  { hour: "12 PM", users: 620 },
  { hour: "2 PM", users: 750 },
  { hour: "4 PM", users: 890 },
  { hour: "6 PM", users: 980 },
  { hour: "8 PM", users: 1100 },
  { hour: "10 PM", users: 850 },
  { hour: "12 AM", users: 450 },
];

const completionRateData = [
  { name: "Completed", value: 68, color: "#10b981" },
  { name: "Pending", value: 22, color: "#f59e0b" },
  { name: "Overdue", value: 10, color: "#ef4444" },
];

export default function AdminAnalyticsPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Calendar Analytics</h1>
            <p className="text-muted-foreground">Comprehensive analytics for the student calendar system</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Select defaultValue="last30days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="last90days">Last 90 days</SelectItem>
                <SelectItem value="lastYear">Last year</SelectItem>
                <SelectItem value="allTime">All time</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <CardDescription>Active students</CardDescription>
              </div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,345</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">Tasks Created</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </div>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,678</div>
              <p className="text-xs text-muted-foreground">
                +8% from previous period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
                <CardDescription>Task completion</CardDescription>
              </div>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">
                +5% from previous period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col space-y-1">
                <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                <CardDescription>Avg. per student</CardDescription>
              </div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.5 hrs</div>
              <p className="text-xs text-muted-foreground">
                +12% from previous period
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="usage">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="usage">Usage Metrics</TabsTrigger>
            <TabsTrigger value="tasks">Task Analytics</TabsTrigger>
            <TabsTrigger value="subjects">Subject Insights</TabsTrigger>
            <TabsTrigger value="time">Time Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Active and new users over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userActivityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px',
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="active" stroke="#3b82f6" name="Active Users" />
                        <Line type="monotone" dataKey="new" stroke="#10b981" name="New Users" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Feature Usage</CardTitle>
                  <CardDescription>Most used features in the calendar system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={featureUsageData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {featureUsageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, "Usage"]}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tasks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Task Creation Trends</CardTitle>
                  <CardDescription>Number of tasks created by day of week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={taskCreationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px',
                          }}
                        />
                        <Bar dataKey="count" fill="#3b82f6" name="Tasks Created" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Task Completion Rates</CardTitle>
                  <CardDescription>Overall task status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={completionRateData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {completionRateData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, "Tasks"]}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Popularity</CardTitle>
                  <CardDescription>Number of students per subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={subjectPopularityData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px',
                          }}
                        />
                        <Bar dataKey="students" fill="#8b5cf6" name="Students" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Study Time by Subject</CardTitle>
                  <CardDescription>Average hours spent per subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={Object.entries(mockStudyAnalytics.studyTimeBySubject).map(([subject, minutes]) => ({
                        name: subject,
                        hours: Math.round(minutes / 60 * 10) / 10,
                      }))}>
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
                        <Bar dataKey="hours" fill="#10b981" name="Hours" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="time" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Peak Usage Times</CardTitle>
                  <CardDescription>Number of active users by hour of day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={peakUsageData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px',
                          }}
                        />
                        <Bar dataKey="users" fill="#f59e0b" name="Active Users" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity Pattern</CardTitle>
                  <CardDescription>User engagement throughout the week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { day: "Mon", engagement: 78 },
                        { day: "Tue", engagement: 82 },
                        { day: "Wed", engagement: 85 },
                        { day: "Thu", engagement: 80 },
                        { day: "Fri", engagement: 75 },
                        { day: "Sat", engagement: 62 },
                        { day: "Sun", engagement: 58 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value}%`, "Engagement"]}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px',
                          }}
                        />
                        <Line type="monotone" dataKey="engagement" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Actionable Insights</CardTitle>
              <CardDescription>Key findings and recommendations for platform optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Peak Usage Optimization</h3>
                  <p className="text-muted-foreground">
                    System usage peaks between 6 PM and 10 PM. Consider scheduling maintenance and updates outside these hours to minimize disruption.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Subject Focus Areas</h3>
                  <p className="text-muted-foreground">
                    Mathematics and English have the highest student engagement. Consider expanding content and resources for these subjects to meet demand.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Task Completion Improvement</h3>
                  <p className="text-muted-foreground">
                    10% of tasks are overdue. Implementing additional reminders and notifications could help reduce this percentage and improve overall completion rates.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Feature Adoption</h3>
                  <p className="text-muted-foreground">
                    AI Recommendations feature has lower usage (15%) compared to other features. Consider improving visibility or providing tutorials to increase adoption.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}