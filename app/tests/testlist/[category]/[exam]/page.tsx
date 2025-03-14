"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Timer, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  BookOpen,
  Brain,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TestSection {
  id: string;
  name: string;
  subsections?: { id: string; name: string; }[];
}

const testTypes = [
  {
    id: 'full',
    name: 'Full Test',
    sections: [
      { id: 'prelims', name: 'Prelims' },
      { id: 'mains', name: 'Mains' }
    ]
  },
  {
    id: 'sectional',
    name: 'Sectional Test',
    sections: [
      { id: 'english', name: 'English' },
      { id: 'quants', name: 'Quantitative Aptitude' },
      { id: 'reasoning', name: 'Reasoning' }
    ]
  },
  {
    id: 'chapter',
    name: 'Chapter Test',
    sections: [
      { id: 'english', name: 'English' },
      { id: 'quants', name: 'Quantitative Aptitude' },
      { id: 'reasoning', name: 'Reasoning' }
    ]
  },
  {
    id: 'speed',
    name: 'Speed Test',
    sections: [
      {
        id: 'english',
        name: 'English',
        subsections: [
          { id: 'rc', name: 'Reading Comprehension' },
          { id: 'error', name: 'Error Detection' },
          { id: 'cloze', name: 'Cloze Test' },
          { id: 'parajumble', name: 'Parajumble' },
          { id: 'vocabulary', name: 'Vocabulary' },
          { id: 'fillers', name: 'Fillers' }
        ]
      },
      {
        id: 'quants',
        name: 'Quantitative Aptitude',
        subsections: [
          { id: 'simplification', name: 'Simplification' },
          { id: 'quadratic', name: 'Quadratic Equations' },
          { id: 'numbers', name: 'Missing & Wrong Numbers' },
          { id: 'di', name: 'Data Interpretation' },
          { id: 'applications', name: 'Applications' }
        ]
      },
      {
        id: 'reasoning',
        name: 'Reasoning',
        subsections: [
          { id: 'puzzle', name: 'Puzzle' },
          { id: 'seating', name: 'Seating Arrangement' },
          { id: 'blood-relations', name: 'Blood Relations' },
          { id: 'syllogism', name: 'Syllogism' }
        ]
      }
    ]
  }
];

function generateTests(examName: string, type: string, section: string, subsection?: string) {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `${type}-${section}-${i + 1}`,
    name: `${examName} ${type} ${section}${subsection ? ` ${subsection}` : ''} Test ${i + 1}`,
    status: Math.random() > 0.7 ? 'attempted' : Math.random() > 0.5 ? 'free' : 'available',
    rank: Math.floor(Math.random() * 1000) + 1,
    score: Math.floor(Math.random() * 100)
  }));
}

export function generateStaticParams() {
  const categories = ["banking", "ssc", "insurance", "railway"];
  const exams = ["ibps-po", "sbi-po", "ibps-clerk", "ssc-cgl"];
  
  return categories.flatMap(category => 
    exams.map(exam => ({
      category,
      exam
    }))
  );
}

export default function ExamTestsPage({ 
  params 
}: { 
  params: { category: string; exam: string } 
}) {
  const [selectedType, setSelectedType] = useState(testTypes[0].id);
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedSubsection, setSelectedSubsection] = useState<string>('');

  const examName = params.exam.toUpperCase().replace('-', ' ');
  const currentType = testTypes.find(t => t.id === selectedType);
  const currentSection = currentType?.sections.find(s => s.id === selectedSection);
  const tests = generateTests(examName, selectedType, selectedSection, selectedSubsection);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{examName} Mock Tests</h1>
          <p className="text-muted-foreground">
            Select a test type and section to begin your practice
          </p>
        </div>

        <Tabs value={selectedType} onValueChange={setSelectedType} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            {testTypes.map(type => (
              <TabsTrigger key={type.id} value={type.id} className="gap-2">
                {type.id === 'full' && <BookOpen className="w-4 h-4" />}
                {type.id === 'sectional' && <Brain className="w-4 h-4" />}
                {type.id === 'chapter' && <BookOpen className="w-4 h-4" />}
                {type.id === 'speed' && <Zap className="w-4 h-4" />}
                {type.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {testTypes.map(type => (
            <TabsContent key={type.id} value={type.id} className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {type.sections.map(section => (
                  <Button
                    key={section.id}
                    variant={selectedSection === section.id ? 'default' : 'outline'}
                    onClick={() => {
                      setSelectedSection(section.id);
                      setSelectedSubsection('');
                    }}
                  >
                    {section.name}
                  </Button>
                ))}
              </div>

              {selectedSection && type.id === 'speed' && (
                <div className="flex flex-wrap gap-2">
                  {currentSection?.subsections?.map(subsection => (
                    <Button
                      key={subsection.id}
                      variant={selectedSubsection === subsection.id ? 'default' : 'outline'}
                      onClick={() => setSelectedSubsection(subsection.id)}
                      size="sm"
                    >
                      {subsection.name}
                    </Button>
                  ))}
                </div>
              )}

              {selectedSection && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tests.map((test) => (
                    <Card key={test.id} className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{test.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Timer className="w-4 h-4" />
                                180 mins
                              </span>
                              <span className="flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                100 marks
                              </span>
                            </div>
                          </div>
                          <div className={cn(
                            "px-2 py-1 rounded text-sm font-medium",
                            test.status === 'free' && "bg-green-100 text-green-700",
                            test.status === 'attempted' && "bg-blue-100 text-blue-700",
                            test.status === 'available' && "bg-yellow-100 text-yellow-700"
                          )}>
                            {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                          </div>
                        </div>

                        {test.status === 'attempted' && (
                          <div className="flex items-center justify-between text-sm border-t pt-4">
                            <div>
                              <p className="text-muted-foreground">Your Score</p>
                              <p className="font-medium">{test.score}/100</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Rank</p>
                              <p className="font-medium">#{test.rank}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button className="flex-1" asChild>
                            <Link href={`/tests/${test.id}`}>
                              {test.status === 'attempted' ? 'Retake Test' : 'Take Test'}
                            </Link>
                          </Button>
                          {test.status === 'attempted' && (
                            <>
                              <Button variant="outline" size="icon">
                                <CheckCircle2 className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="icon">
                                <Brain className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}