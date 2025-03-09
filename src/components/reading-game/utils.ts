
import { Question } from "./types";
import { toast } from "@/hooks/use-toast";

// Find question by ID
export const findQuestionById = (questions: Question[], questionId: string): Question | undefined => {
  return questions.find(q => q.id === questionId);
};

// Check if answer is correct
export const checkIfAnswerIsCorrect = (questions: Question[], questionId: string, answerId: string): boolean => {
  const question = findQuestionById(questions, questionId);
  return question?.correctAnswerId === answerId;
};

// Show feedback toast based on answer correctness
export const showAnswerFeedback = (isCorrect: boolean) => {
  if (isCorrect) {
    toast({
      title: "Great job!",
      description: "That's the correct answer!",
      variant: "default",
    });
  } else {
    toast({
      title: "Try again!",
      description: "That's not the right answer.",
      variant: "destructive",
    });
  }
};
