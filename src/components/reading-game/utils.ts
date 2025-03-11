
import { Question } from "./types";
import { toast } from "@/hooks/use-toast";

/**
 * Functions for handling reading game questions and answers
 */

/**
 * Finds a specific question from the questions array using its ID
 * 
 * @param questions - Array of all available questions
 * @param questionId - The ID of the question we want to find
 * @returns The matching question object or undefined if not found
 */
export const findQuestionById = (questions: Question[], questionId: string): Question | undefined => {
  // Search through the questions array for one with a matching ID
  return questions.find(q => q.id === questionId);
};

/**
 * Checks if the selected answer is correct for a specific question
 * 
 * @param questions - Array of all available questions
 * @param questionId - The ID of the question we're checking
 * @param answerId - The ID of the answer the user selected
 * @returns true if the answer is correct, false otherwise
 */
export const checkIfAnswerIsCorrect = (questions: Question[], questionId: string, answerId: string): boolean => {
  // First find the question with the given ID
  const question = findQuestionById(questions, questionId);
  
  // Compare the selected answer ID with the correct answer ID
  // If the question isn't found, this will return false
  return question?.correctAnswerId === answerId;
};

/**
 * Shows a feedback toast notification based on whether the answer was correct
 * 
 * @param isCorrect - Whether the user's answer was correct
 */
export const showAnswerFeedback = (isCorrect: boolean) => {
  if (isCorrect) {
    // Show positive feedback for correct answers (green notification)
    toast({
      title: "Great job!",
      description: "That's the correct answer!",
      variant: "default",  // Default style (usually green/success)
    });
  } else {
    // Show constructive feedback for incorrect answers (red notification)
    toast({
      title: "Try again!",
      description: "That's not the right answer.",
      variant: "destructive",  // Red/error style
    });
  }
};
