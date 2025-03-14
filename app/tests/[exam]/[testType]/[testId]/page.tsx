"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Timer, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    question: "If a train travels 360 kilometers in 4 hours, what is its average speed in kilometers per hour?",
    options: ["80 km/h", "90 km/h", "85 km/h", "95 km/h"],
    correct: 0,
    explanation: "Average speed = Total distance / Total time = 360 km / 4 h = 90 km/h"
  },
  {
    id: 2,
    question: "What is the compound interest on Rs. 1000 at 10% per annum for 2 years?",
    options: ["Rs. 210", "Rs. 220", "Rs. 221", "Rs. 231"],
    correct: 2,
    explanation: "CI = P(1 + r/100)ⁿ - P = 1000(1 + 10/100)² - 1000 = 1210 - 1000 = 210"
  },
  {
    id: 3,
    question: "If 6 workers can complete a job in 12 days, how many days will it take for 9 workers to complete the same job?",
    options: ["8 days", "10 days", "15 days", "18 days"],
    correct: 0,
    explanation: "Using the formula: (W₁ × D₁) = (W₂ × D₂), where W is workers and D is days\n(6 × 12) = (9 × D₂)\n72 = 9D₂\nD₂ = 8 days"
  }
];

export function generateStaticParams() {
  const exams = ["ibps-po", "sbi-po", "ibps-clerk", "ssc-cgl"];
  const types = ["full", "sectional", "speed", "previous"];
  const testIds = Array.from({ length: 20 }, (_, i) => `test-${i + 1}`);
  
  return exams.flatMap(exam => 
    types.flatMap(testType =>
      testIds.map(testId => ({
        exam,
        testType,
        testId
      }))
    )
  );
}

export default function TestPage({ params }: { params: { exam: string; testType: string; testId: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes

  useEffect(() => {
    setAnswers(new Array(mockQuestions.length).fill(null));
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, showResult]);

  const handleOptionSelect = (optionIndex: number) => {
    if (showResult) return;
    setSelectedOption(optionIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const calculateScore = () => {
    return mockQuestions.reduce((score, question, index) => {
      return score + (answers[index] === question.correct ? 1 : 0);
    }, 0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Test #{params.testId}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-primary" />
                <span className="font-medium">{formatTime(timeLeft)}</span>
              </div>
              <Progress 
                value={(currentQuestion + 1) / mockQuestions.length * 100} 
                className="w-32" 
              />
            </div>
          </div>
        </Card>

        <div className="max-w-4xl mx-auto">
          {!showResult ? (
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Question {currentQuestion + 1} of {mockQuestions.length}
                  </p>
                  <h2 className="text-xl font-semibold mb-4">
                    {mockQuestions[currentQuestion].question}
                  </h2>
                </div>

                <div className="space-y-3">
                  {mockQuestions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-4 rounded-lg border cursor-pointer transition-colors",
                        selectedOption === index
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-accent"
                      )}
                      onClick={() => handleOptionSelect(index)}
                    >
                      <p className="font-medium">{option}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  {currentQuestion === mockQuestions.length - 1 ? (
                    <Button onClick={handleSubmit}>Submit Test</Button>
                  ) : (
                    <Button onClick={handleNext}>
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Test Completed!</h2>
                <p className="text-xl">
                  Your Score: {calculateScore()} / {mockQuestions.length}
                </p>
              </div>

              <div className="space-y-6">
                {mockQuestions.map((question, index) => (
                  <div key={index} className="border-b pb-6">
                    <h3 className="font-semibold mb-2">
                      {index + 1}. {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={cn(
                            "p-3 rounded-lg",
                            optIndex === question.correct
                              ? "bg-green-100 dark:bg-green-900/20"
                              : answers[index] === optIndex
                              ? "bg-red-100 dark:bg-red-900/20"
                              : "bg-accent"
                          )}
                        >
                          <p>{option}</p>
                        </div>
                      ))}
                    </div>
                    {question.explanation && (
                      <p className="mt-2 text-muted-foreground">
                        <span className="font-medium">Explanation:</span> {question.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}