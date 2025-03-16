"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  FileUp,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from "lucide-react";

interface Test {
  id: string;
  title: string;
  category: string;
  type: "full" | "sectional" | "speed" | "previous";
  section?: string;
  status: "pending" | "approved" | "active";
  uploadDate: string;
}

const mockTests: Test[] = [
  {
    id: "1",
    title: "IBPS PO Prelims Full Test 1",
    category: "Banking",
    type: "full",
    status: "active",
    uploadDate: "2023-04-15",
  },
  {
    id: "2",
    title: "SSC CGL Reasoning Sectional Test",
    category: "SSC",
    type: "sectional",
    section: "Reasoning",
    status: "active",
    uploadDate: "2023-04-12",
  },
  {
    id: "3",
    title: "RRB NTPC Quantitative Aptitude Speed Test",
    category: "RRB",
    type: "speed",
    section: "Quantitative Aptitude",
    status: "pending",
    uploadDate: "2023-04-10",
  },
  {
    id: "4",
    title: "SBI PO 2022 Previous Year Question Paper",
    category: "Banking",
    type: "previous",
    status: "approved",
    uploadDate: "2023-04-08",
  },
];

export function TestManagement() {
  const [tests, setTests] = useState<Test[]>(mockTests);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Test Management</h2>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FileUp className="mr-2 h-4 w-4" /> Upload Test
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Test</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Test Title</Label>
                <Input id="title" placeholder="Enter test title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select category</option>
                    <option value="Banking">Banking</option>
                    <option value="SSC">SSC</option>
                    <option value="RRB">RRB</option>
                    <option value="RBI">RBI</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Test Type</Label>
                  <select
                    id="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select type</option>
                    <option value="full">Full Test</option>
                    <option value="sectional">Sectional Test</option>
                    <option value="speed">Speed Test</option>
                    <option value="previous">Previous Year</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="section">Section (if applicable)</Label>
                <select
                  id="section"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select section</option>
                  <option value="Quantitative Aptitude">
                    Quantitative Aptitude
                  </option>
                  <option value="Reasoning">Reasoning</option>
                  <option value="English">English</option>
                  <option value="General Awareness">General Awareness</option>
                  <option value="Computer Awareness">Computer Awareness</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="file">Upload File</Label>
                <Input id="file" type="file" />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setIsUploadDialogOpen(false)}
                  className="mr-2"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsUploadDialogOpen(false)}>
                  Upload Test
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Tests</TabsTrigger>
          <TabsTrigger value="full">Full Tests</TabsTrigger>
          <TabsTrigger value="sectional">Sectional Tests</TabsTrigger>
          <TabsTrigger value="speed">Speed Tests</TabsTrigger>
          <TabsTrigger value="previous">Previous Year</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
              <div className="col-span-4">Test Title</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Actions</div>
            </div>
            {tests.map((test) => (
              <div
                key={test.id}
                className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
              >
                <div className="col-span-4 font-medium">
                  {test.title}
                  {test.section && (
                    <span className="block text-xs text-muted-foreground">
                      Section: {test.section}
                    </span>
                  )}
                </div>
                <div className="col-span-2">{test.category}</div>
                <div className="col-span-2">
                  {test.type === "full" && "Full Test"}
                  {test.type === "sectional" && "Sectional Test"}
                  {test.type === "speed" && "Speed Test"}
                  {test.type === "previous" && "Previous Year"}
                </div>
                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${test.status === "active" ? "bg-green-100 text-green-800" : test.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}
                  >
                    {test.status === "active"
                      ? "Active"
                      : test.status === "pending"
                        ? "Pending"
                        : "Approved"}
                  </span>
                </div>
                <div className="col-span-2 flex space-x-2">
                  {test.status === "pending" ? (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-green-600"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="ghost">
                        <Clock className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Other tabs would have similar content filtered by test type or status */}
        <TabsContent value="pending" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
              <div className="col-span-4">Test Title</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Upload Date</div>
              <div className="col-span-2">Actions</div>
            </div>
            {tests
              .filter((test) => test.status === "pending")
              .map((test) => (
                <div
                  key={test.id}
                  className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
                >
                  <div className="col-span-4 font-medium">
                    {test.title}
                    {test.section && (
                      <span className="block text-xs text-muted-foreground">
                        Section: {test.section}
                      </span>
                    )}
                  </div>
                  <div className="col-span-2">{test.category}</div>
                  <div className="col-span-2">
                    {test.type === "full" && "Full Test"}
                    {test.type === "sectional" && "Sectional Test"}
                    {test.type === "speed" && "Speed Test"}
                    {test.type === "previous" && "Previous Year"}
                  </div>
                  <div className="col-span-2">{test.uploadDate}</div>
                  <div className="col-span-2 flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-green-600"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        {/* Similar TabsContent for other test types */}
      </Tabs>
    </Card>
  );
}
