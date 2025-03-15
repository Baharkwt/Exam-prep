"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Clock, Edit, Trash2, Eye, Zap } from "lucide-react";

interface SpeedDrill {
  id: string;
  title: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  questions: number;
  timeLimit: number; // in seconds
  attempts: number;
  avgScore: number;
}

const mockSpeedDrills: SpeedDrill[] = [
  {
    id: "1",
    title: "Quick Calculations",
    subject: "Quantitative Aptitude",
    difficulty: "easy",
    questions: 20,
    timeLimit: 300, // 5 minutes
    attempts: 245,
    avgScore: 76,
  },
  {
    id: "2",
    title: "Logical Reasoning Speed Test",
    subject: "Reasoning",
    difficulty: "medium",
    questions: 15,
    timeLimit: 240, // 4 minutes
    attempts: 189,
    avgScore: 68,
  },
  {
    id: "3",
    title: "Grammar Blitz",
    subject: "English",
    difficulty: "easy",
    questions: 25,
    timeLimit: 300, // 5 minutes
    attempts: 210,
    avgScore: 82,
  },
  {
    id: "4",
    title: "Advanced Data Interpretation",
    subject: "Quantitative Aptitude",
    difficulty: "hard",
    questions: 10,
    timeLimit: 240, // 4 minutes
    attempts: 156,
    avgScore: 59,
  },
  {
    id: "5",
    title: "Computer Awareness Quick Quiz",
    subject: "Computer Awareness",
    difficulty: "medium",
    questions: 15,
    timeLimit: 180, // 3 minutes
    attempts: 178,
    avgScore: 71,
  },
];

export function SpeedDrillManagement() {
  const [speedDrills, setSpeedDrills] = useState<SpeedDrill[]>(mockSpeedDrills);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Speed Drill Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Speed Drill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Speed Drill</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <select
                    id="subject"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select subject</option>
                    <option value="Quantitative Aptitude">
                      Quantitative Aptitude
                    </option>
                    <option value="Reasoning">Reasoning</option>
                    <option value="English">English</option>
                    <option value="General Awareness">General Awareness</option>
                    <option value="Computer Awareness">
                      Computer Awareness
                    </option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <select
                    id="difficulty"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="questions">Number of Questions</Label>
                  <Input
                    id="questions"
                    type="number"
                    min="1"
                    placeholder="Enter number of questions"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    min="1"
                    placeholder="Enter time limit in minutes"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="questions">Upload Questions</Label>
                <Input id="questions" type="file" />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setIsAddDialogOpen(false)}
                  className="mr-2"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add Speed Drill
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Drills</TabsTrigger>
          <TabsTrigger value="quant">Quantitative Aptitude</TabsTrigger>
          <TabsTrigger value="reasoning">Reasoning</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
          <TabsTrigger value="ga">General Awareness</TabsTrigger>
          <TabsTrigger value="ca">Computer Awareness</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
              <div className="col-span-3">Title</div>
              <div className="col-span-2">Subject</div>
              <div className="col-span-1">Difficulty</div>
              <div className="col-span-1">Questions</div>
              <div className="col-span-1">Time Limit</div>
              <div className="col-span-2">Performance</div>
              <div className="col-span-2">Actions</div>
            </div>
            {speedDrills.map((drill) => (
              <div
                key={drill.id}
                className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
              >
                <div className="col-span-3 font-medium">{drill.title}</div>
                <div className="col-span-2">{drill.subject}</div>
                <div className="col-span-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${drill.difficulty === "easy" ? "bg-green-100 text-green-800" : drill.difficulty === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                  >
                    {drill.difficulty.charAt(0).toUpperCase() +
                      drill.difficulty.slice(1)}
                  </span>
                </div>
                <div className="col-span-1">{drill.questions}</div>
                <div className="col-span-1">{formatTime(drill.timeLimit)}</div>
                <div className="col-span-2">
                  <div className="text-xs">
                    <div className="flex justify-between mb-1">
                      <span>Avg. Score:</span>
                      <span className="font-medium">{drill.avgScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${drill.avgScore}%` }}
                      ></div>
                    </div>
                    <div className="text-muted-foreground mt-1">
                      {drill.attempts} attempts
                    </div>
                  </div>
                </div>
                <div className="col-span-2 flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Other tabs would have similar content filtered by subject */}
        <TabsContent value="quant" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
              <div className="col-span-3">Title</div>
              <div className="col-span-2">Subject</div>
              <div className="col-span-1">Difficulty</div>
              <div className="col-span-1">Questions</div>
              <div className="col-span-1">Time Limit</div>
              <div className="col-span-2">Performance</div>
              <div className="col-span-2">Actions</div>
            </div>
            {speedDrills
              .filter((drill) => drill.subject === "Quantitative Aptitude")
              .map((drill) => (
                <div
                  key={drill.id}
                  className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
                >
                  <div className="col-span-3 font-medium">{drill.title}</div>
                  <div className="col-span-2">{drill.subject}</div>
                  <div className="col-span-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${drill.difficulty === "easy" ? "bg-green-100 text-green-800" : drill.difficulty === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                    >
                      {drill.difficulty.charAt(0).toUpperCase() +
                        drill.difficulty.slice(1)}
                    </span>
                  </div>
                  <div className="col-span-1">{drill.questions}</div>
                  <div className="col-span-1">
                    {formatTime(drill.timeLimit)}
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs">
                      <div className="flex justify-between mb-1">
                        <span>Avg. Score:</span>
                        <span className="font-medium">{drill.avgScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: `${drill.avgScore}%` }}
                        ></div>
                      </div>
                      <div className="text-muted-foreground mt-1">
                        {drill.attempts} attempts
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        {/* Similar TabsContent for other subjects */}
      </Tabs>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Speed Drill Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-medium mb-3">Time Limits by Difficulty</h4>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="easyTime" className="text-sm">
                    Easy
                  </Label>
                  <span className="text-sm font-medium">5:00</span>
                </div>
                <Input
                  id="easyTime"
                  type="range"
                  min="60"
                  max="600"
                  step="30"
                  defaultValue="300"
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="mediumTime" className="text-sm">
                    Medium
                  </Label>
                  <span className="text-sm font-medium">4:00</span>
                </div>
                <Input
                  id="mediumTime"
                  type="range"
                  min="60"
                  max="600"
                  step="30"
                  defaultValue="240"
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="hardTime" className="text-sm">
                    Hard
                  </Label>
                  <span className="text-sm font-medium">3:00</span>
                </div>
                <Input
                  id="hardTime"
                  type="range"
                  min="60"
                  max="600"
                  step="30"
                  defaultValue="180"
                  className="w-full"
                />
              </div>
              <Button size="sm" className="mt-2">
                Save Settings
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-medium mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="flex items-center justify-center"
              >
                <Zap className="h-4 w-4 mr-2" />
                Generate Drill
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center"
              >
                <Clock className="h-4 w-4 mr-2" />
                Schedule Drills
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
}
