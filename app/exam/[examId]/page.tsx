"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Info, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  text: string;
  options: string[];
  type: string;
}

interface Section {
  id: string;
  name: string;
  questions: Question[];
}

// Mock data for the exam
const mockExams: Record<
  string,
  {
    title: string;
    duration: number; // in minutes
    sections: Section[];
  }
> = {
  "ibps-po": {
    title: "New IBPS Test",
    duration: 180,
    sections: [
      {
        id: "general-awareness",
        name: "General Awareness",
        questions: Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          text:
            i === 8
              ? "Which of the following is the target fixed for raising through disinvestments of various PSUs ?"
              : `General Awareness Question ${i + 1}`,
          options:
            i === 8
              ? [
                  "Rs. 10,000/- crores",
                  "Rs. 15,000/- crores",
                  "Rs. 12,000/- crores",
                  "Rs. 20,000/- crores",
                  "None of these",
                ]
              : [
                  `Option A for question ${i + 1}`,
                  `Option B for question ${i + 1}`,
                  `Option C for question ${i + 1}`,
                  `Option D for question ${i + 1}`,
                  `Option E for question ${i + 1}`,
                ],
          type: "Multiple Choice Question",
        })),
      },
      {
        id: "reasoning",
        name: "Reasoning",
        questions: Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          text: `Reasoning Question ${i + 1}`,
          options: [
            `Option A for question ${i + 1}`,
            `Option B for question ${i + 1}`,
            `Option C for question ${i + 1}`,
            `Option D for question ${i + 1}`,
            `Option E for question ${i + 1}`,
          ],
          type: "Multiple Choice Question",
        })),
      },
      {
        id: "quantitative-aptitude",
        name: "Quantitative Aptitude",
        questions: Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          text: `Quantitative Aptitude Question ${i + 1}`,
          options: [
            `Option A for question ${i + 1}`,
            `Option B for question ${i + 1}`,
            `Option C for question ${i + 1}`,
            `Option D for question ${i + 1}`,
            `Option E for question ${i + 1}`,
          ],
          type: "Multiple Choice Question",
        })),
      },
      {
        id: "english",
        name: "English Language",
        questions: Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          text: `English Language Question ${i + 1}`,
          options: [
            `Option A for question ${i + 1}`,
            `Option B for question ${i + 1}`,
            `Option C for question ${i + 1}`,
            `Option D for question ${i + 1}`,
            `Option E for question ${i + 1}`,
          ],
          type: "Multiple Choice Question",
        })),
      },
    ],
  },
  "sbi-po": {
    title: "SBI PO Prelims Test",
    duration: 60,
    sections: [
      {
        id: "english",
        name: "English Language",
        questions: Array.from({ length: 30 }, (_, i) => ({
          id: i + 1,
          text: `English Language Question ${i + 1}`,
          options: [
            `Option A for question ${i + 1}`,
            `Option B for question ${i + 1}`,
            `Option C for question ${i + 1}`,
            `Option D for question ${i + 1}`,
            `Option E for question ${i + 1}`,
          ],
          type: "Multiple Choice Question",
        })),
      },
      {
        id: "quantitative-aptitude",
        name: "Quantitative Aptitude",
        questions: Array.from({ length: 35 }, (_, i) => ({
          id: i + 1,
          text: `Quantitative Aptitude Question ${i + 1}`,
          options: [
            `Option A for question ${i + 1}`,
            `Option B for question ${i + 1}`,
            `Option C for question ${i + 1}`,
            `Option D for question ${i + 1}`,
            `Option E for question ${i + 1}`,
          ],
          type: "Multiple Choice Question",
        })),
      },
      {
        id: "reasoning",
        name: "Reasoning Ability",
        questions: Array.from({ length: 35 }, (_, i) => ({
          id: i + 1,
          text: `Reasoning Ability Question ${i + 1}`,
          options: [
            `Option A for question ${i + 1}`,
            `Option B for question ${i + 1}`,
            `Option C for question ${i + 1}`,
            `Option D for question ${i + 1}`,
            `Option E for question ${i + 1}`,
          ],
          type: "Multiple Choice Question",
        })),
      },
    ],
  },
};

// Status types for questions
type QuestionStatus =
  | "not-visited"
  | "not-answered"
  | "answered"
  | "marked-review"
  | "answered-marked-review";

export default function ExamPage() {
  const params = useParams();
  const examId = params.examId as string;
  const exam = mockExams[examId] || mockExams["ibps-po"];

  const [activeSection, setActiveSection] = useState<string>(
    exam.sections[0].id,
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<
    Record<string, Record<number, number | null>>
  >({});
  const [questionStatus, setQuestionStatus] = useState<
    Record<string, Record<number, QuestionStatus>>
  >({});
  const [timeLeft, setTimeLeft] = useState<number>(exam.duration * 60); // in seconds
  const [language, setLanguage] = useState<string>("English");
  const [paletteCollapsed, setPaletteCollapsed] = useState<boolean>(false);

  // Initialize answers and question status
  useEffect(() => {
    const initialAnswers: Record<string, Record<number, number | null>> = {};
    const initialStatus: Record<string, Record<number, QuestionStatus>> = {};

    exam.sections.forEach((section) => {
      initialAnswers[section.id] = {};
      initialStatus[section.id] = {};

      section.questions.forEach((question) => {
        initialAnswers[section.id][question.id] = null;
        initialStatus[section.id][question.id] = "not-visited";
      });
    });

    // Mark the first question as not-answered (since it will be visited)
    if (exam.sections[0] && initialStatus[exam.sections[0].id]) {
      initialStatus[exam.sections[0].id][1] = "not-answered";
    }

    setAnswers(initialAnswers);
    setQuestionStatus(initialStatus);
  }, [exam]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      // Auto-submit when time is up
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Get current section and question
  const currentSection = exam.sections.find(
    (section) => section.id === activeSection,
  );
  const currentQuestion = currentSection?.questions[currentQuestionIndex];

  // Format time left
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle section change
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setCurrentQuestionIndex(0);
  };

  // Handle question change
  const handleQuestionChange = (sectionId: string, questionId: number) => {
    const section = exam.sections.find((s) => s.id === sectionId);
    if (section) {
      setActiveSection(sectionId);
      const index = section.questions.findIndex((q) => q.id === questionId);
      if (index !== -1) {
        setCurrentQuestionIndex(index);

        // Update status if not visited - with null check
        if (
          questionStatus[sectionId] &&
          questionStatus[sectionId][questionId] === "not-visited"
        ) {
          setQuestionStatus((prev) => ({
            ...prev,
            [sectionId]: {
              ...prev[sectionId],
              [questionId]: "not-answered",
            },
          }));
        }
      }
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (optionIndex: number) => {
    if (!currentQuestion) return;

    setAnswers((prev) => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        [currentQuestion.id]: optionIndex,
      },
    }));

    // Update status to answered with null check
    setQuestionStatus((prev) => {
      // Ensure prev[activeSection] exists
      const sectionStatus = prev[activeSection] || {};
      // Check if the current question status includes 'marked-review'
      const isMarkedForReview =
        sectionStatus[currentQuestion.id] &&
        sectionStatus[currentQuestion.id].includes("marked-review");

      return {
        ...prev,
        [activeSection]: {
          ...sectionStatus,
          [currentQuestion.id]: isMarkedForReview
            ? "answered-marked-review"
            : "answered",
        },
      };
    });
  };

  // Handle save and next
  const handleSaveNext = () => {
    if (
      !currentSection ||
      currentQuestionIndex >= currentSection.questions.length - 1
    ) {
      // If last question in section, move to next section
      const currentSectionIndex = exam.sections.findIndex(
        (s) => s.id === activeSection,
      );
      if (currentSectionIndex < exam.sections.length - 1) {
        setActiveSection(exam.sections[currentSectionIndex + 1].id);
        setCurrentQuestionIndex(0);

        // Mark the first question of next section as not-answered - with null check
        const nextSectionId = exam.sections[currentSectionIndex + 1].id;
        setQuestionStatus((prev) => ({
          ...prev,
          [nextSectionId]: {
            ...(prev[nextSectionId] || {}),
            [1]: "not-answered",
          },
        }));
      }
    } else {
      // Move to next question in current section
      setCurrentQuestionIndex((prev) => prev + 1);

      // Mark the next question as not-answered if it's not visited - with null check
      const nextQuestionId =
        currentSection.questions[currentQuestionIndex + 1].id;
      const sectionStatus = questionStatus[activeSection] || {};

      if (
        !sectionStatus[nextQuestionId] ||
        sectionStatus[nextQuestionId] === "not-visited"
      ) {
        setQuestionStatus((prev) => ({
          ...prev,
          [activeSection]: {
            ...(prev[activeSection] || {}),
            [nextQuestionId]: "not-answered",
          },
        }));
      }
    }
  };

  // Handle mark for review
  const handleMarkReview = () => {
    if (!currentQuestion) return;

    // Safely access the current status with null checks
    const sectionStatus = questionStatus[activeSection] || {};
    const currentStatus = sectionStatus[currentQuestion.id] || "not-visited";

    const newStatus: QuestionStatus =
      currentStatus === "answered"
        ? "answered-marked-review"
        : currentStatus === "answered-marked-review"
          ? "answered"
          : currentStatus === "marked-review"
            ? "not-answered"
            : "marked-review";

    setQuestionStatus((prev) => ({
      ...prev,
      [activeSection]: {
        ...(prev[activeSection] || {}),
        [currentQuestion.id]: newStatus,
      },
    }));

    handleSaveNext();
  };

  // Handle clear response
  const handleClearResponse = () => {
    if (!currentQuestion) return;

    setAnswers((prev) => ({
      ...prev,
      [activeSection]: {
        ...(prev[activeSection] || {}),
        [currentQuestion.id]: null,
      },
    }));

    // Update status to not-answered if it was answered - with null check
    const sectionStatus = questionStatus[activeSection] || {};
    const currentStatus = sectionStatus[currentQuestion.id] || "not-visited";

    if (
      currentStatus === "answered" ||
      currentStatus === "answered-marked-review"
    ) {
      setQuestionStatus((prev) => ({
        ...prev,
        [activeSection]: {
          ...(prev[activeSection] || {}),
          [currentQuestion.id]:
            currentStatus === "answered-marked-review"
              ? "marked-review"
              : "not-answered",
        },
      }));
    }
  };

  // Handle submit
  const handleSubmit = () => {
    // In a real app, you would send the answers to the server
    alert("Exam submitted successfully!");
    // Redirect to results page or dashboard
    window.location.href = "/dashboard/student";
  };

  // Get status color class
  const getStatusColorClass = (status: QuestionStatus) => {
    switch (status) {
      case "not-visited":
        return "bg-gray-200 text-gray-700";
      case "not-answered":
        return "bg-red-500 text-white";
      case "answered":
        return "bg-green-500 text-white";
      case "marked-review":
        return "bg-purple-500 text-white";
      case "answered-marked-review":
        return "bg-purple-500 text-white border-2 border-green-500";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  if (!currentSection || !currentQuestion) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading exam...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b p-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/logos/ibps.png" alt="IBPS Logo" className="h-8 w-8" />
            <h1 className="text-lg font-bold text-center flex-1">
              {exam.title}
            </h1>
          </div>
          <div className="flex items-center">
            <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
              <Info className="h-4 w-4 mr-1" />
              <span>View Instructions</span>
            </button>
          </div>
        </div>
      </header>

      {/* Exam name and timer */}
      <div className="bg-gray-800 text-white p-2 flex justify-between items-center">
        <div className="text-sm font-medium">{exam.title}</div>
        <div className="text-sm font-medium">
          Time Left : {formatTime(timeLeft)}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Left side - Question area */}
        <div className="flex-1 flex flex-col border-r">
          {/* Sections label */}
          <div className="bg-gray-200 p-2 text-sm font-medium">Sections</div>

          {/* Sections navigation */}
          <div className="bg-blue-500 text-white p-0">
            <div className="flex overflow-x-auto">
              {exam.sections.map((section) => (
                <button
                  key={section.id}
                  className={cn(
                    "px-4 py-2 text-sm font-medium whitespace-nowrap flex items-center",
                    activeSection === section.id
                      ? "bg-white text-blue-600"
                      : "hover:bg-blue-600",
                  )}
                  onClick={() => handleSectionChange(section.id)}
                >
                  {section.name}
                  {activeSection === section.id && (
                    <Info className="h-4 w-4 ml-2 text-blue-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section header */}
          <div className="bg-gray-100 p-3 flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="font-medium">{currentSection.name}</h2>
              <Info className="h-4 w-4 ml-2 text-blue-500" />
            </div>
            <ChevronRight className="h-5 w-5" />
          </div>

          {/* Question type */}
          <div className="p-3 border-b">
            <p className="font-medium text-sm">
              Question Type: {currentQuestion.type}
            </p>
          </div>

          {/* Question content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="mb-6">
              <h3 className="font-bold mb-4">
                Question No. {currentQuestion.id}
              </h3>
              <p className="text-base mb-6">{currentQuestion.text}</p>

              <RadioGroup
                value={
                  answers[activeSection]?.[currentQuestion.id]?.toString() || ""
                }
                onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                className="space-y-4"
              >
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 border-b pb-2"
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      className="mt-1"
                    />
                    <Label htmlFor={`option-${index}`} className="text-base">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Action buttons */}
          <div className="border-t p-3 flex justify-between bg-gray-50">
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={handleMarkReview}
                className="text-sm h-9"
              >
                Mark for Review & Next
              </Button>
              <Button
                variant="outline"
                onClick={handleClearResponse}
                className="text-sm h-9"
              >
                Clear Response
              </Button>
            </div>
            <div className="space-x-2">
              <Button variant="outline" className="text-sm h-9">
                Previous
              </Button>
              <Button
                variant="default"
                onClick={handleSaveNext}
                className="text-sm h-9 bg-blue-500 hover:bg-blue-600"
              >
                Save & Next
              </Button>
              <Button
                variant="default"
                className="text-sm h-9 bg-blue-500 hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>

        {/* Collapsible toggle button */}
        <div className="relative">
          <button
            onClick={() => setPaletteCollapsed((prev) => !prev)}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-[48px] w-[17px] bg-blue-500 hover:bg-blue-600 text-white rounded-l-md flex items-center justify-center transition-all z-10"
            aria-label={
              paletteCollapsed
                ? "Expand question palette"
                : "Collapse question palette"
            }
          >
            {paletteCollapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </button>
        </div>

        {/* Right side - Question palette */}
        <div
          className={cn(
            "bg-gray-50 flex flex-col transition-all duration-300 ease-in-out",
            paletteCollapsed
              ? "w-0 opacity-0 overflow-hidden"
              : "w-80 opacity-100",
          )}
        >
          {/* User info */}
          <div className="p-3 border-b flex items-center">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              alt="Profile"
              className="h-14 w-14 rounded-full bg-gray-200 mr-3"
            />
            <div>
              <h3 className="font-bold">John Smith</h3>
            </div>
          </div>

          {/* Question status */}
          <div className="p-3 border-b">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center mr-2 text-xs">
                  3
                </div>
                <span>Answered</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center mr-2 text-xs">
                  2
                </div>
                <span>Not Answered</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center mr-2 text-xs">
                  41
                </div>
                <span>Not Visited</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center mr-2 text-xs">
                  2
                </div>
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center col-span-2">
                <div className="w-5 h-5 rounded-full bg-purple-500 text-white border-2 border-green-500 flex items-center justify-center mr-2 text-xs">
                  2
                </div>
                <span className="text-xs">
                  Answered & Marked for Review (will be considered for
                  evaluation)
                </span>
              </div>
            </div>
          </div>

          {/* Current section */}
          <div className="bg-blue-600 text-white p-2 font-medium">
            {currentSection.name}
          </div>

          {/* Question palette */}
          <div className="p-3 flex-1 overflow-y-auto">
            <h4 className="font-medium mb-2 text-sm">Choose a Question</h4>
            <div className="grid grid-cols-5 gap-2">
              {currentSection.questions.map((question) => (
                <button
                  key={question.id}
                  className={cn(
                    "w-9 h-9 rounded-md flex items-center justify-center text-sm font-medium",
                    getStatusColorClass(
                      questionStatus[activeSection] &&
                        questionStatus[activeSection][question.id]
                        ? questionStatus[activeSection][question.id]
                        : "not-visited",
                    ),
                    currentQuestion.id === question.id
                      ? "ring-2 ring-offset-1 ring-blue-500"
                      : "",
                  )}
                  onClick={() =>
                    handleQuestionChange(activeSection, question.id)
                  }
                >
                  {question.id}
                </button>
              ))}
            </div>
          </div>

          {/* Language selector */}
          <div className="p-3 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm">View in</span>
              <select
                className="border rounded p-1 text-sm"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
