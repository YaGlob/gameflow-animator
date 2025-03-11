
import { useState } from "react";
import { READING_CONTENT } from "@/data/reading-content";
import { RobotVariant, Question } from "@/components/reading-game/types";
import { findQuestionById, checkIfAnswerIsCorrect, showAnswerFeedback } from "@/components/reading-game/utils";
import { toast } from "@/hooks/use-toast";

// Custom hook that contains all the logic for the reading game
export const useReadingGame = () => {
  // State variables to track the game's state
  const [storyIndex, setStoryIndex] = useState<number>(0);                   // Which story we're showing (from the list)
  const [currentPage, setCurrentPage] = useState<number>(0);                 // Which page of the story we're on
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});  // User's answers (questionId -> answerId)
  const [robotVariant, setRobotVariant] = useState<RobotVariant>("normal");  // Robot's expression (normal, happy, thinking)

  // Get the current story data based on the storyIndex
  const currentStory = READING_CONTENT[storyIndex];
  
  // Handle when the user selects an answer to a question
  const handleAnswerSelect = (questionId: string, answerId: string) => {
    // Update the selectedAnswers state with the new selection
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));

    // Find the question in the current page's questions array
    const question = findQuestionById(currentStory.pages[currentPage].questions, questionId);
    
    // Check if the selected answer is correct
    const isCorrect = question?.correctAnswerId === answerId;
    
    if (isCorrect) {
      // If correct, show happy robot and positive feedback
      setRobotVariant("happy");
      showAnswerFeedback(true);
      
      // Return to normal expression after 2 seconds
      setTimeout(() => {
        setRobotVariant("normal");
      }, 2000);
    } else {
      // If incorrect, show thinking robot and negative feedback
      setRobotVariant("thinking");
      showAnswerFeedback(false);
      
      // Return to normal expression after 2 seconds
      setTimeout(() => {
        setRobotVariant("normal");
      }, 2000);
    }
  };

  // Handle navigation to the next page
  const handleNextPage = () => {
    if (currentPage < currentStory.pages.length - 1) {
      // Move to the next page if there is one
      setCurrentPage(prev => prev + 1);
      
      // Reset the selected answers for the new page
      setSelectedAnswers({});
      
      // Show a notification that we've moved to a new page
      toast({
        title: "Next page",
        description: "Let's read a new story!",
      });
    }
  };

  // Handle navigation to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      // Move to the previous page if there is one
      setCurrentPage(prev => prev - 1);
      
      // Reset the selected answers for the new page
      setSelectedAnswers({});
    }
  };

  // Function to check if an answer is correct
  const checkAnswer = (questionId: string, answerId: string) => {
    return checkIfAnswerIsCorrect(currentStory.pages[currentPage].questions, questionId, answerId);
  };

  // Check if there is a next page available
  const hasNextPage = currentPage < currentStory.pages.length - 1;
  
  // Check if there is a previous page available
  const hasPreviousPage = currentPage > 0;

  // Return all the values and functions needed by the reading game component
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
