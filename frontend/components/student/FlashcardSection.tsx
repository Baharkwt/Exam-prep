"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  subject: string;
}

const mockFlashcards: Flashcard[] = [
  {
    id: 1,
    question: "What is Newton's First Law?",
    answer: "An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.",
    subject: "Physics"
  },
  {
    id: 2,
    question: "What is the capital of France?",
    answer: "Paris",
    subject: "Geography"
  },
  {
    id: 3,
    question: "What is photosynthesis?",
    answer: "The process by which plants convert light energy into chemical energy.",
    subject: "Biology"
  }
];

export function FlashcardSection() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % mockFlashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + mockFlashcards.length) % mockFlashcards.length);
    setIsFlipped(false);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Flashcards</h3>
        <Button size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Card
        </Button>
      </div>
      <div className="relative h-[200px] bg-accent rounded-lg cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{mockFlashcards[currentCard].subject}</p>
            <p className="font-medium">
              {isFlipped ? mockFlashcards[currentCard].answer : mockFlashcards[currentCard].question}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button variant="outline" size="icon" onClick={prevCard}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm text-muted-foreground">
          {currentCard + 1} / {mockFlashcards.length}
        </span>
        <Button variant="outline" size="icon" onClick={nextCard}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}