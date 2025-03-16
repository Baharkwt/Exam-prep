"use client";

import { DashboardLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Clock, Target, Trophy, ChevronRight } from "lucide-react";

interface DrillItem {
  id: string;
  title: string;
  category: string;
  questions: number;
  timePerQuestion: string;
  difficulty: "Easy" | "Medium" | "Hard";
  bestTime?: string;
  bestScore?: number;
  attempted?: boolean;
}

const mockDrills: DrillItem[] = [
  {
    id: "1",
    title: "Quantitative Aptitude: Speed Calculation",
    category: "Quant",
    questions: 20,
    timePerQuestion: "15 sec",
    difficulty: "Medium",
    attempted: true,
    bestTime: "4:32",
    bestScore: 85,
  },
  {
    id: "2",
    title: "Reasoning: Coding-Decoding",
    category: "Reasoning",
    questions: 15,
    timePerQuestion: "20 sec",
    difficulty: "Medium",
    attempted: true,
    bestTime: "3:45",
    bestScore: 90,
  },
  {
    id: "3",
    title: "English: Spotting Errors",
    category: "English",
    questions: 25,
    timePerQuestion: "10 sec",
    difficulty: "Easy",
    attempted: false,
  },
  {
    id: "4",
    title: "Quantitative Aptitude: Number Series",
    category: "Quant",
    questions: 15,
    timePerQuestion: "20 sec",
    difficulty: "Hard",
    attempted: false,
  },
  {
    id: "5",
    title: "Reasoning: Blood Relations",
    category: "Reasoning",
    questions: 10,
    timePerQuestion: "25 sec",
    difficulty: "Medium",
    attempted: false,
  },
  {
    id: "6",
    title: "English: Fill in the Blanks",
    category: "English",
    questions: 20,
    timePerQuestion: "15 sec",
    difficulty: "Medium",
    attempted: false,
  },
];

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800 border-green-200";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Hard":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "";
  }
}

export default function SpeedDrillPage() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Speed Drill</h1>
          <p className="text-muted-foreground">
            Improve your speed and accuracy with timed practice
          </p>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Drills</TabsTrigger>
            <TabsTrigger value="quant">Quantitative</TabsTrigger>
            <TabsTrigger value="reasoning">Reasoning</TabsTrigger>
            <TabsTrigger value="english">English</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDrills.map((drill) => (
                <Card
                  key={drill.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{drill.title}</CardTitle>
                      <Badge className={getDifficultyColor(drill.difficulty)}>
                        {drill.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span>{drill.questions} questions</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{drill.timePerQuestion}/question</span>
                        </div>
                      </div>

                      {drill.attempted && (
                        <div className="py-2 px-3 bg-muted rounded-md">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">
                                Best time: {drill.bestTime}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Trophy className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-bold">
                                {drill.bestScore}%
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button className="w-full" variant="default">
                        <Zap className="mr-2 h-4 w-4" />
                        <span>Start Drill</span>
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quant" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDrills
                .filter((drill) => drill.category === "Quant")
                .map((drill) => (
                  <Card
                    key={drill.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Same card content as above */}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{drill.title}</CardTitle>
                        <Badge className={getDifficultyColor(drill.difficulty)}>
                          {drill.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <span>{drill.questions} questions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{drill.timePerQuestion}/question</span>
                          </div>
                        </div>

                        {drill.attempted && (
                          <div className="py-2 px-3 bg-muted rounded-md">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm">
                                  Best time: {drill.bestTime}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Trophy className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm font-bold">
                                  {drill.bestScore}%
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <Button className="w-full" variant="default">
                          <Zap className="mr-2 h-4 w-4" />
                          <span>Start Drill</span>
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="reasoning" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDrills
                .filter((drill) => drill.category === "Reasoning")
                .map((drill) => (
                  <Card
                    key={drill.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Same card content as above */}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{drill.title}</CardTitle>
                        <Badge className={getDifficultyColor(drill.difficulty)}>
                          {drill.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <span>{drill.questions} questions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{drill.timePerQuestion}/question</span>
                          </div>
                        </div>

                        {drill.attempted && (
                          <div className="py-2 px-3 bg-muted rounded-md">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm">
                                  Best time: {drill.bestTime}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Trophy className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm font-bold">
                                  {drill.bestScore}%
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <Button className="w-full" variant="default">
                          <Zap className="mr-2 h-4 w-4" />
                          <span>Start Drill</span>
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="english" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDrills
                .filter((drill) => drill.category === "English")
                .map((drill) => (
                  <Card
                    key={drill.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Same card content as above */}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{drill.title}</CardTitle>
                        <Badge className={getDifficultyColor(drill.difficulty)}>
                          {drill.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <span>{drill.questions} questions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{drill.timePerQuestion}/question</span>
                          </div>
                        </div>

                        {drill.attempted && (
                          <div className="py-2 px-3 bg-muted rounded-md">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm">
                                  Best time: {drill.bestTime}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Trophy className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm font-bold">
                                  {drill.bestScore}%
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <Button className="w-full" variant="default">
                          <Zap className="mr-2 h-4 w-4" />
                          <span>Start Drill</span>
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
