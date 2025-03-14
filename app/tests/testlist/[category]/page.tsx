"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutGrid, 
  List, 
  BookOpen, 
  Brain, 
  PenTool,
  Timer,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

interface ExamType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  totalTests: number;
  lastUpdated: string;
}

const examTypes: Record<string, ExamType[]> = {
  banking: [
    {
      id: "ibps-po",
      name: "IBPS PO",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Probationary Officer examination by IBPS",
      totalTests: 50,
      lastUpdated: "2024-03-20"
    },
    {
      id: "sbi-po",
      name: "SBI PO",
      icon: <BookOpen className="w-6 h-6" />,
      description: "State Bank of India PO examination",
      totalTests: 45,
      lastUpdated: "2024-03-19"
    },
    {
      id: "ibps-clerk",
      name: "IBPS Clerk",
      icon: <PenTool className="w-6 h-6" />,
      description: "Clerical cadre examination by IBPS",
      totalTests: 40,
      lastUpdated: "2024-03-18"
    },
    {
      id: "sbi-clerk",
      name: "SBI Clerk",
      icon: <PenTool className="w-6 h-6" />,
      description: "State Bank of India clerical examination",
      totalTests: 35,
      lastUpdated: "2024-03-17"
    }
  ],
  // Add more categories as needed
};

export function generateStaticParams() {
  return [
    { category: "banking" },
    { category: "ssc" },
    { category: "insurance" },
    { category: "railway" }
  ];
}

export default function TestListPage({ params }: { params: { category: string } }) {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const exams = examTypes[params.category] || [];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              {params.category.replace('-', ' & ')} Mock Tests
            </h1>
            <p className="text-muted-foreground">
              Select an exam to view available mock tests
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewType === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewType('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewType === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewType('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Tests</TabsTrigger>
            <TabsTrigger value="prelims">Prelims</TabsTrigger>
            <TabsTrigger value="mains">Mains</TabsTrigger>
            <TabsTrigger value="sectional">Sectional</TabsTrigger>
            <TabsTrigger value="previous">Previous Year</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {viewType === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams.map((exam) => (
                  <Link key={exam.id} href={`/tests/testlist/${params.category}/${exam.id}`}>
                    <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {exam.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1 flex items-center justify-between">
                            {exam.name}
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {exam.description}
                          </p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{exam.totalTests} tests</span>
                            <span>Updated: {exam.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card>
                <div className="divide-y">
                  {exams.map((exam) => (
                    <Link 
                      key={exam.id} 
                      href={`/tests/testlist/${params.category}/${exam.id}`}
                      className="flex items-center justify-between p-4 hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {exam.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{exam.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {exam.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm font-medium">{exam.totalTests} tests</div>
                          <div className="text-sm text-muted-foreground">
                            Updated: {exam.lastUpdated}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Add similar content for other tabs */}
        </Tabs>
      </div>
    </div>
  );
}