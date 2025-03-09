
import { useState, useEffect } from "react";
import { WRITING_CONTENT } from "@/data/writing-content";
import { toast } from "@/hooks/use-toast";

export const useWritingGame = () => {
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [robotVariant, setRobotVariant] = useState<"normal" | "happy" | "thinking">("normal");
  const [incorrectChars, setIncorrectChars] = useState<number[]>([]);

  const currentExercise = WRITING_CONTENT[exerciseIndex];

  // Reset user input when moving to a new exercise
  useEffect(() => {
    setUserInput("");
    setCursorPosition(0);
    setIncorrectChars([]);
  }, [exerciseIndex]);

  // Handle keyboard input
  const handleKeyPress = (key: string) => {
    const targetChar = currentExercise.text[cursorPosition];
    const isCorrect = key === targetChar;
    
    // Create a new string with the pressed key added
    let newInput = userInput + key;
    
    // Update the cursor position
    const newPosition = cursorPosition + 1;
    setCursorPosition(newPosition);
    
    // Update user input
    setUserInput(newInput);
    
    // Check if the key press was correct
    if (isCorrect) {
      // Correct input
      setRobotVariant("happy");
      setTimeout(() => {
        setRobotVariant("normal");
      }, 500);
      
      // Update score if not already marked as incorrect
      if (!incorrectChars.includes(cursorPosition)) {
        setScore(prevScore => prevScore + 1);
      }
    } else {
      // Incorrect input
      setRobotVariant("thinking");
      
      // Add position to incorrectChars if not already there
      if (!incorrectChars.includes(cursorPosition)) {
        setIncorrectChars(prev => [...prev, cursorPosition]);
      }
      
      setTimeout(() => {
        setRobotVariant("normal");
      }, 500);
    }
    
    // Check if exercise is completed
    if (newPosition >= currentExercise.text.length) {
      toast({
        title: "Exercise completed!",
        description: `You scored ${score} out of ${currentExercise.text.length} characters.`,
      });
    }
  };

  // Handle navigation to next exercise
  const handleNextExercise = () => {
    if (exerciseIndex < WRITING_CONTENT.length - 1) {
      setExerciseIndex(prevIndex => prevIndex + 1);
      setScore(0);
      toast({
        title: "New exercise",
        description: "Let's practice writing something new!",
      });
    } else {
      toast({
        title: "All exercises completed!",
        description: "Great job! You've completed all writing exercises.",
      });
    }
  };

  // Handle navigation to previous exercise
  const handlePreviousExercise = () => {
    if (exerciseIndex > 0) {
      setExerciseIndex(prevIndex => prevIndex - 1);
      setScore(0);
    }
  };

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
    exerciseCompleted: cursorPosition >= currentExercise.text.length,
    hasNextExercise: exerciseIndex < WRITING_CONTENT.length - 1,
    hasPreviousExercise: exerciseIndex > 0
  };
};
