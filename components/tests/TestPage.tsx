"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Timer, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

const mockTests: Record<string, Question[]> = {
  banking: [
    {
      id: 1,
      question: "What is the current Cash Reserve Ratio (CRR) maintained by banks with RBI?",
      options: ["3%", "4%", "4.5%", "5%"],
      correct: 1,
      explanation: "The current CRR is 4% of Net Demand and Time Liabilities (NDTL)."
    },
    {
      id: 2,
      question: "Which organization controls the Repo Rate in India?",
      options: ["RBI", "SEBI", "SBI", "NABARD"],
      correct: 0,
      explanation: "The Reserve Bank of India (RBI) controls the Repo Rate as part of its monetary policy."
    }
  ],
  ssc: [
    {
      id: 1,
      question: "What is the capital of India?",
      options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
      correct: 0,
      explanation: "New Delhi is the capital city of India and seat of all three branches of Government."
    },
    {
      id: 2,
      question: "Who is known as the Father of the Indian Constitution?",
      options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Dr. B.R. Ambedkar", "Sardar Patel"],
      correct: 2,
      explanation: "Dr. B.R. Ambedkar was the Chairman of the Constitution Drafting Committee."
    }
  ],
  railway: [
    {
      id: 1,
      question: "Which is India's first semi-high speed train?",
      options: ["Rajdhani Express", "Gatimaan Express", "Vande Bharat Express", "Tejas Express"],
      correct: 1,
      explanation: "Gatimaan Express, launched in 2016, is India's first semi-high speed train."
    },
    {
      id: 2,
      question: "What is the headquarters of Indian Railways?",
      options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
      correct: 2,
      explanation: "The headquarters of Indian Railways is located in New Delhi."
    }
  ]
};

interface TestPageProps {
  examType: string;
}

export function TestPage({ examType }: TestPageProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes

  useEffect(() => {
    if (examType && mockTests[examType]) {
      setQuestions(mockTests[examType]);
      setAnswers(new Array(mockTests[examType].length).fill(null));
    }
  }, [examType]);

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
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(answers[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(answers[currentIndex - 1]);
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (answers[index] === question.correct ? 1 : 0);
    }, 0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <p className="text-lg font-medium text-center">Test not found</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <Card className="mb-6">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold capitalize">{examType} Mock Test</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-primary" />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
            <Progress value={(currentIndex + 1) / questions.length * 100} className="w-32" />
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {!showResult ? (
          <Card className="p-6">
            <div className="space-y-6">
              {/* Question */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Question {currentIndex + 1} of {questions.length}
                </p>
                <h2 className="text-xl font-semibold mb-4">
                  {questions[currentIndex].question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentIndex].options.map((option, index) => (
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

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                {currentIndex === questions.length - 1 ? (
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
                Your Score: {calculateScore()} / {questions.length}
              </p>
            </div>

            <div className="space-y-6">
              {questions.map((question, index) => (
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
  );
}