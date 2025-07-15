"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Meter } from "@/components/ui/meter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Which emotion best describes the speaker's tone?",
    image: "/placeholder-1.jpg",
    options: [
      "Happy and enthusiastic",
      "Sad and melancholic",
      "Angry and frustrated",
      "Calm and neutral",
    ],
  },
  {
    id: 2,
    question: "What is the main topic of the conversation?",
    image: "/placeholder-2.jpg",
    options: [
      "Technology and innovation",
      "Personal relationships",
      "Work and career",
      "Travel and leisure",
    ],
  },
  {
    id: 3,
    question: "How would you rate the clarity of the message?",
    image: "/placeholder-3.jpg",
    options: [
      "Very clear and easy to understand",
      "Mostly clear with minor issues",
      "Somewhat unclear",
      "Very unclear and confusing",
    ],
  },
  {
    id: 4,
    question: "What action should be taken based on this content?",
    image: "/placeholder-4.jpg",
    options: [
      "Approve and publish",
      "Request minor revisions",
      "Request major revisions",
      "Reject and redo",
    ],
  },
];

export default function TaskPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showVerificationDialog, setShowVerificationDialog] = useState(true);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Task completed - for now just go back to home
      router.push("/");
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      {/* Human Verification Dialog */}
      <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <DialogContent className="sm:max-w-[425px] rounded-[2px]">
          <DialogHeader>
            <DialogTitle className="text-[30px] leading-[36px] font-bold">
              Verify you&apos;re human
            </DialogTitle>
            <DialogDescription className="text-[14px] leading-[18px] pt-2">
              Please complete this verification to access the task. This helps us maintain quality and prevent automated responses.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8 flex items-center justify-center">
            <div className="w-full h-32 bg-muted rounded-[2px] flex items-center justify-center">
              <span className="text-muted-foreground">Verification placeholder</span>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setShowVerificationDialog(false)}
              className="rounded-[2px]"
            >
              Continue to task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-[1280px] mx-auto px-7 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-mono text-[14px] leading-[18px]">BACK TO TASKS</span>
            </button>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[14px] leading-[18px] text-muted-foreground">
                QUESTION {currentQuestion + 1} OF {questions.length}
              </span>
              <div className="w-32">
                <Meter value={progress} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-7 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Image Placeholder */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md aspect-square bg-muted rounded-[2px] flex items-center justify-center">
              <span className="text-muted-foreground">Image Placeholder</span>
            </div>
          </div>

          {/* Right: Question and Options */}
          <div className="flex flex-col justify-center">
            <h2 className="text-[30px] leading-[36px] font-bold mb-8">
              {question.question}
            </h2>
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                  className={`w-full text-left p-6 border rounded-[2px] transition-all ${
                    selectedAnswer === index
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <span className="font-mono text-[14px] leading-[18px] uppercase" style={{ letterSpacing: "0.01em" }}>
                    {option}
                  </span>
                </button>
              ))}
            </div>
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="self-start px-8 py-3 rounded-[2px] font-mono text-[14px] leading-[18px] uppercase"
            >
              {currentQuestion === questions.length - 1 ? "Complete" : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}