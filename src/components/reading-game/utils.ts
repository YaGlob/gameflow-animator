
import { Question } from "./types";
import { toast } from "@/hooks/use-toast";

// Find a question by its ID in the questions array
export const findQuestionById = (questions: Question[], questionId: string): Question | undefined => {
  // Use the find method to locate the question with the matching ID
  return questions.find(q => q.id === questionId);
};

// Check if an answer is correct for a given question
export const checkIfAnswerIsCorrect = (questions: Question[], questionId: string, answerId: string): boolean => {
  // First find the question with the given ID
  const question = findQuestionById(questions, questionId);
  
  // Check if the selected answer ID matches the correct answer ID
  // If question isn't found, this will return false
  return question?.correctAnswerId === answerId;
};

// Show a feedback toast notification based on whether the answer was correct
export const showAnswerFeedback = (isCorrect: boolean) => {
  if (isCorrect) {
    // Show positive feedback for correct answers
    toast({
      title: "Great job!",
      description: "That's the correct answer!",
      variant: "default",  // Default style (usually green/success)
    });
  } else {
    // Show constructive feedback for incorrect answers
    toast({
      title: "Try again!",
      description: "That's not the right answer.",
      variant: "destructive",  // Red/error style
    });
  }
};
