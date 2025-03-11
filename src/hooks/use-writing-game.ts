
import { useState, useEffect } from "react";
import { WRITING_CONTENT } from "@/data/writing-content";
import { toast } from "@/hooks/use-toast";

// Custom hook that contains all the logic for the writing game
export const useWritingGame = () => {
  // State variables to track the game's state
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);              // Which writing exercise we're on
  const [userInput, setUserInput] = useState<string>("");                     // What the user has typed so far
  const [cursorPosition, setCursorPosition] = useState<number>(0);            // Position of the cursor in the text
  const [score, setScore] = useState<number>(0);                              // Player's score
  const [robotVariant, setRobotVariant] = useState<"normal" | "happy" | "thinking">("normal");  // Robot's expression
  const [incorrectChars, setIncorrectChars] = useState<number[]>([]);         // Positions of incorrectly typed characters

  // Get the current exercise data based on the exerciseIndex
  const currentExercise = WRITING_CONTENT[exerciseIndex];

  // Reset user input when moving to a new exercise
  useEffect(() => {
    setUserInput("");              // Clear what the user has typed
    setCursorPosition(0);          // Move cursor to beginning
    setIncorrectChars([]);         // Clear list of incorrect characters
  }, [exerciseIndex]);            // Run this effect whenever exerciseIndex changes

  // Handle when a key is pressed on the keyboard
  const handleKeyPress = (key: string) => {
    // Get the character the user should type at the current position
    const targetChar = currentExercise.text[cursorPosition];
    
    // Check if the pressed key matches the target character
    const isCorrect = key === targetChar;
    
    // Add the pressed key to the user's input
    let newInput = userInput + key;
    
    // Move the cursor position forward
    const newPosition = cursorPosition + 1;
    setCursorPosition(newPosition);
    
    // Update the user's input
    setUserInput(newInput);
    
    // Check if the key press was correct
    if (isCorrect) {
      // For correct inputs, show happy robot briefly
      setRobotVariant("happy");
      setTimeout(() => {
        setRobotVariant("normal");
      }, 500);
      
      // Update score if this position hasn't already been marked incorrect
      if (!incorrectChars.includes(cursorPosition)) {
        setScore(prevScore => prevScore + 1);
      }
    } else {
      // For incorrect inputs, show thinking robot briefly
      setRobotVariant("thinking");
      
      // Add this position to the list of incorrect characters
      if (!incorrectChars.includes(cursorPosition)) {
        setIncorrectChars(prev => [...prev, cursorPosition]);
      }
      
      setTimeout(() => {
        setRobotVariant("normal");
      }, 500);
    }
    
    // Check if the exercise is completed (reached the end of the text)
    if (newPosition >= currentExercise.text.length) {
      // Show completion message with score
      toast({
        title: "Exercise completed!",
        description: `You scored ${score} out of ${currentExercise.text.length} characters.`,
      });
    }
  };

  // Handle navigation to next exercise
  const handleNextExercise = () => {
    if (exerciseIndex < WRITING_CONTENT.length - 1) {
      // Move to the next exercise if there is one
      setExerciseIndex(prevIndex => prevIndex + 1);
      setScore(0);  // Reset score for new exercise
      
      // Show notification about new exercise
      toast({
        title: "New exercise",
        description: "Let's practice writing something new!",
      });
    } else {
      // If we've reached the last exercise, show completion message
      toast({
        title: "All exercises completed!",
        description: "Great job! You've completed all writing exercises.",
      });
    }
  };

  // Handle navigation to previous exercise
  const handlePreviousExercise = () => {
    if (exerciseIndex > 0) {
      // Move to the previous exercise if there is one
      setExerciseIndex(prevIndex => prevIndex - 1);
      setScore(0);  // Reset score for new exercise
    }
  };

  // Return all the values and functions needed by the writing game component
  return {
    currentExercise,
    userInput,
    cursorPosition,
    score,
    robotVariant,
    incorrectChars,
    handleKeyPress,
    handleNextExercise,
    handlePreviousExercise,
    exerciseCompleted: cursorPosition >= currentExercise.text.length,  // True when the exercise is done
    hasNextExercise: exerciseIndex < WRITING_CONTENT.length - 1,       // True if there's another exercise
    hasPreviousExercise: exerciseIndex > 0                             // True if there's a previous exercise
  };
};
