"use client";

import { Button } from "@/components/ui/button";

interface ExamButtonProps {
  examId: string;
  children: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
}

export function ExamButton({
  examId,
  children,
  variant = "default",
  className,
}: ExamButtonProps) {
  const handleStartExam = () => {
    // Open in a new window with fullscreen
    const examWindow = window.open(
      `/exam/${examId}`,
      "_blank",
      "fullscreen=yes,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes",
    );

    // If popup is blocked, open in a new tab and try to request fullscreen
    if (!examWindow) {
      const newTab = window.open(`/exam/${examId}`, "_blank");
      if (newTab) {
        newTab.addEventListener("DOMContentLoaded", () => {
          try {
            newTab.document.documentElement.requestFullscreen();
          } catch (error) {
            console.error("Could not enter fullscreen mode:", error);
          }
        });
      }
    }
  };

  return (
    <Button variant={variant} className={className} onClick={handleStartExam}>
      {children}
    </Button>
  );
}
