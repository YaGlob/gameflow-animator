
import { useState } from "react";
import { READING_CONTENT } from "@/data/reading-content";
import { RobotVariant, Question } from "@/components/reading-game/types";
import { findQuestionById, checkIfAnswerIsCorrect, showAnswerFeedback } from "@/components/reading-game/utils";

// Custom hook for reading game logic
export const useReadingGame = () => {
  const [storyIndex, setStoryIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [robotVariant, setRobotVariant] = useState<RobotVariant>("normal");

  const currentStory = READING_CONTENT[storyIndex];
  
  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));

    // Check if answer is correct
    const question = findQuestionById(currentStory.pages[currentPage].questions, questionId);
    const isCorrect = question?.correctAnswerId === answerId;
    
    if (isCorrect) {
      // Correct answer
      setRobotVariant("happy");
      showAnswerFeedback(true);
      
      setTimeout(() => {
        setRobotVariant("normal");
      }, 2000);
    } else {
      // Incorrect answer
      setRobotVariant("thinking");
      showAnswerFeedback(false);
      
      setTimeout(() => {
        setRobotVariant("normal");
      }, 2000);
    }
  };

  // Handle navigation to next page
  const handleNextPage = () => {
    if (currentPage < currentStory.pages.length - 1) {
      setCurrentPage(prev => prev + 1);
      // Reset selected answers when moving to next page
      setSelectedAnswers({});
      toast({
        title: "Next page",
        description: "Let's read a new story!",
      });
    }
  };

  // Handle navigation to previous page
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      // Reset selected answers when moving to previous page
      setSelectedAnswers({});
    }
  };

  // Check if answer is correct
  const checkAnswer = (questionId: string, answerId: string) => {
    return checkIfAnswerIsCorrect(currentStory.pages[currentPage].questions, questionId, answerId);
  };

  // Check if there is a next page
  const hasNextPage = currentPage < currentStory.pages.length - 1;
  
  // Check if there is a previous page
  const hasPreviousPage = currentPage > 0;

  return {
    currentStory,
    currentPage,
    selectedAnswers,
    robotVariant,
    handleAnswerSelect,
    handleNextPage,
    handlePreviousPage,
    checkIfAnswerIsCorrect: checkAnswer,
    hasNextPage,
    hasPreviousPage
  };
};
