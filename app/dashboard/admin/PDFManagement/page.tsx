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
import { Plus, FileUp, Download, Trash2, Eye, FileText } from "lucide-react";

interface PDFDocument {
  id: string;
  title: string;
  category: string;
  subject: string;
  uploadDate: string;
  size: string;
  downloads: number;
}

const mockPDFs: PDFDocument[] = [
  {
    id: "1",
    title: "Quantitative Aptitude Formulas",
    category: "Banking",
    subject: "Quantitative Aptitude",
    uploadDate: "2023-04-10",
    size: "2.4 MB",
    downloads: 156,
  },
  {
    id: "2",
    title: "Reasoning Shortcuts and Tricks",
    category: "SSC",
    subject: "Reasoning",
    uploadDate: "2023-04-05",
    size: "1.8 MB",
    downloads: 203,
  },
  {
    id: "3",
    title: "English Grammar Rules",
    category: "Banking",
    subject: "English",
    uploadDate: "2023-03-28",
    size: "3.2 MB",
    downloads: 178,
  },
  {
    id: "4",
    title: "General Awareness Compilation",
    category: "RRB",
    subject: "General Awareness",
    uploadDate: "2023-03-20",
    size: "4.5 MB",
    downloads: 132,
  },
  {
    id: "5",
    title: "Computer Awareness Notes",
    category: "Banking",
    subject: "Computer Awareness",
    uploadDate: "2023-03-15",
    size: "2.1 MB",
    downloads: 145,
  },
];

export default function PDFManagementPage() {
  const [pdfs, setPDFs] = useState<PDFDocument[]>(mockPDFs);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">PDF Course Management</h1>
        <p className="text-muted-foreground">
          Upload and manage PDF study materials
        </p>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">PDF Course Management</h2>
          <Dialog
            open={isUploadDialogOpen}
            onOpenChange={setIsUploadDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <FileUp className="mr-2 h-4 w-4" /> Upload PDF
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New PDF</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">PDF Title</Label>
                  <Input id="title" placeholder="Enter PDF title" />
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
                      <option value="General Awareness">
                        General Awareness
                      </option>
                      <option value="Computer Awareness">
                        Computer Awareness
                      </option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <textarea
                    id="description"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter a brief description of the PDF content"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="file">Upload PDF File</Label>
                  <Input id="file" type="file" accept=".pdf" />
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
                    Upload PDF
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All PDFs</TabsTrigger>
            <TabsTrigger value="quant">Quantitative Aptitude</TabsTrigger>
            <TabsTrigger value="reasoning">Reasoning</TabsTrigger>
            <TabsTrigger value="english">English</TabsTrigger>
            <TabsTrigger value="ga">General Awareness</TabsTrigger>
            <TabsTrigger value="ca">Computer Awareness</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
                <div className="col-span-4">PDF Title</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Subject</div>
                <div className="col-span-1">Size</div>
                <div className="col-span-1">Downloads</div>
                <div className="col-span-2">Actions</div>
              </div>
              {pdfs.map((pdf) => (
                <div
                  key={pdf.id}
                  className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
                >
                  <div className="col-span-4">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{pdf.title}</div>
                        <div className="text-xs text-muted-foreground">
                          Uploaded on {pdf.uploadDate}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">{pdf.category}</div>
                  <div className="col-span-2">{pdf.subject}</div>
                  <div className="col-span-1">{pdf.size}</div>
                  <div className="col-span-1">{pdf.downloads}</div>
                  <div className="col-span-2 flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
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
                <div className="col-span-4">PDF Title</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Subject</div>
                <div className="col-span-1">Size</div>
                <div className="col-span-1">Downloads</div>
                <div className="col-span-2">Actions</div>
              </div>
              {pdfs
                .filter((pdf) => pdf.subject === "Quantitative Aptitude")
                .map((pdf) => (
                  <div
                    key={pdf.id}
                    className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
                  >
                    <div className="col-span-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{pdf.title}</div>
                          <div className="text-xs text-muted-foreground">
                            Uploaded on {pdf.uploadDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">{pdf.category}</div>
                    <div className="col-span-2">{pdf.subject}</div>
                    <div className="col-span-1">{pdf.size}</div>
                    <div className="col-span-1">{pdf.downloads}</div>
                    <div className="col-span-2 flex space-x-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
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
          <h3 className="text-lg font-semibold mb-4">PDF Assignment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-medium mb-2">Assign to Courses</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="course1"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="course1" className="ml-2 text-sm">
                    Banking Exam Preparation
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="course2"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="course2" className="ml-2 text-sm">
                    SSC Complete Course
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="course3"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="course3" className="ml-2 text-sm">
                    RRB NTPC Preparation
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="course4"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="course4" className="ml-2 text-sm">
                    RBI Grade B Complete Course
                  </label>
                </div>
              </div>
              <Button className="mt-4" size="sm">
                Assign to Selected
              </Button>
            </Card>

            <Card className="p-4">
              <h4 className="font-medium mb-2">PDF Analytics</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Total PDFs</span>
                  <span className="font-medium">{pdfs.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Most Downloaded</span>
                  <span className="font-medium">
                    {pdfs
                      .reduce((prev, current) =>
                        prev.downloads > current.downloads ? prev : current,
                      )
                      .title.substring(0, 20)}
                    ...
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Total Downloads</span>
                  <span className="font-medium">
                    {pdfs.reduce((sum, pdf) => sum + pdf.downloads, 0)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
