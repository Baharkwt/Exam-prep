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
import {
  Plus,
  Calendar,
  FileUp,
  Edit,
  Trash2,
  Eye,
  FileText,
} from "lucide-react";

interface CurrentAffairsItem {
  id: string;
  title: string;
  type: "daily" | "weekly" | "monthly";
  date: string;
  questions: number;
  hasPDF: boolean;
  views: number;
}

const mockCurrentAffairs: CurrentAffairsItem[] = [
  {
    id: "1",
    title: "Daily Current Affairs - April 15, 2023",
    type: "daily",
    date: "2023-04-15",
    questions: 15,
    hasPDF: true,
    views: 245,
  },
  {
    id: "2",
    title: "Weekly Current Affairs - April 8-14, 2023",
    type: "weekly",
    date: "2023-04-14",
    questions: 50,
    hasPDF: true,
    views: 320,
  },
  {
    id: "3",
    title: "Daily Current Affairs - April 14, 2023",
    type: "daily",
    date: "2023-04-14",
    questions: 15,
    hasPDF: true,
    views: 198,
  },
  {
    id: "4",
    title: "Monthly Current Affairs - March 2023",
    type: "monthly",
    date: "2023-03-31",
    questions: 100,
    hasPDF: true,
    views: 456,
  },
  {
    id: "5",
    title: "Daily Current Affairs - April 13, 2023",
    type: "daily",
    date: "2023-04-13",
    questions: 15,
    hasPDF: false,
    views: 176,
  },
];

export function CurrentAffairsManagement() {
  const [currentAffairs, setCurrentAffairs] =
    useState<CurrentAffairsItem[]>(mockCurrentAffairs);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Current Affairs Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Current Affairs
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Current Affairs</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select type</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
              </div>
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
                <Label>Questions Format</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="formatManual"
                      name="format"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="formatManual" className="ml-2 text-sm">
                      Enter Manually
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="formatUpload"
                      name="format"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="formatUpload" className="ml-2 text-sm">
                      Upload File
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pdfFile">PDF Explanation (Optional)</Label>
                <Input id="pdfFile" type="file" accept=".pdf" />
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
                  Add Current Affairs
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
              <div className="col-span-4">Title</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1">Questions</div>
              <div className="col-span-1">PDF</div>
              <div className="col-span-2">Actions</div>
            </div>
            {currentAffairs.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
              >
                <div className="col-span-4 font-medium">{item.title}</div>
                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.type === "daily" ? "bg-blue-100 text-blue-800" : item.type === "weekly" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}`}
                  >
                    {item.type === "daily"
                      ? "Daily"
                      : item.type === "weekly"
                        ? "Weekly"
                        : "Monthly"}
                  </span>
                </div>
                <div className="col-span-2">{item.date}</div>
                <div className="col-span-1">{item.questions}</div>
                <div className="col-span-1">
                  {item.hasPDF ? (
                    <FileText className="h-4 w-4 text-green-600" />
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
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

        {/* Other tabs would have similar content filtered by type */}
        <TabsContent value="daily" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
              <div className="col-span-4">Title</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1">Questions</div>
              <div className="col-span-1">PDF</div>
              <div className="col-span-2">Actions</div>
            </div>
            {currentAffairs
              .filter((item) => item.type === "daily")
              .map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
                >
                  <div className="col-span-4 font-medium">{item.title}</div>
                  <div className="col-span-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Daily
                    </span>
                  </div>
                  <div className="col-span-2">{item.date}</div>
                  <div className="col-span-1">{item.questions}</div>
                  <div className="col-span-1">
                    {item.hasPDF ? (
                      <FileText className="h-4 w-4 text-green-600" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
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

        {/* Similar TabsContent for other types */}
      </Tabs>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex flex-col items-center justify-center text-center">
              <Calendar className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-medium">Schedule Current Affairs</h4>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Set up automatic publishing schedule
              </p>
              <Button size="sm">Set Schedule</Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col items-center justify-center text-center">
              <FileUp className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-medium">Bulk Upload</h4>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Upload multiple current affairs at once
              </p>
              <Button size="sm">Bulk Upload</Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col items-center justify-center text-center">
              <Eye className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-medium">Analytics</h4>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                View engagement and performance metrics
              </p>
              <Button size="sm">View Analytics</Button>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
}
