
import { useState } from "react";
import GameLayout from "@/components/GameLayout";
import SpeechBubble from "@/components/SpeechBubble";
import KeyboardLayout from "@/components/KeyboardLayout";
import TextDisplay from "@/components/writing-game/TextDisplay";
import InstructionsModal from "@/components/writing-game/InstructionsModal";
import { useWritingGame } from "@/hooks/use-writing-game";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Main component for the Writing Activity page
const WritingPage = () => {
  // State variables for showing/hiding UI elements
  const [showSpeechBubble, setShowSpeechBubble] = useState<boolean>(true);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  // Get all the game functionality from our custom hook
  const {
    currentExercise,          // The current writing exercise (text to type)
    cursorPosition,           // Current position of the cursor in the text
    score,                    // Player's current score
    robotVariant,             // Which robot face to show (normal, happy, thinking)
    incorrectChars,           // List of character positions that were typed incorrectly
    handleKeyPress,           // Function to handle when a key is pressed
    handleNextExercise,       // Function to move to the next exercise
    handlePreviousExercise,   // Function to move to the previous exercise
    exerciseCompleted,        // Whether the current exercise is completed
    hasNextExercise,          // Whether there is another exercise after this one
    hasPreviousExercise       // Whether there is a previous exercise
  } = useWritingGame();

  // Function to show or hide the instruction modal
  const toggleInstructions = () => {
    setShowInstructions(prev => !prev);
  };

  return (
    <GameLayout>
      <div className="w-full h-[calc(100vh-60px)] flex flex-col p-4 sm:p-6">
        {/* Main game container with blue-green background */}
        <div className="relative flex-1 bg-[#395d6e] rounded-lg p-4 sm:p-6 shadow-lg border-2 border-blue-300/30 flex flex-col justify-between h-full">
          {/* Score display - positioned at the top center of the screen */}
          <div className="absolute top-0 left-0 right-0 flex justify-center" style={{ transform: 'translateY(-50%)' }}>
            <div className="bg-cyan-300 px-6 py-2 text-black font-bold text-xl rounded shadow-lg">
              SCORE : {score.toString().padStart(2, '0')}  {/* Show score with leading zero if needed */}
            </div>
          </div>
          
          {/* Text display area - shows the text to type with cursor */}
          <div className="w-full mb-4 sm:mb-6 mt-6 sm:mt-8">
            <TextDisplay 
              targetText={currentExercise.text}     // The text the user needs to type
              cursorPosition={cursorPosition}       // Current position in the text
              incorrectChars={incorrectChars}       // Which characters were typed wrong
            />
          </div>

          {/* Keyboard component - takes up most of the screen space */}
          <div className="flex-grow flex items-center justify-center">
            <KeyboardLayout onKeyPress={handleKeyPress} />
          </div>
          
          {/* Game controls - Next button and Help button */}
          <div className="w-full flex justify-start items-center mt-4 sm:mt-6 gap-2">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-xl font-bold"
              onClick={handleNextExercise}
              disabled={!exerciseCompleted}  // Can't proceed until current exercise is completed
            >
              NEXT
            </Button>
            
            {/* Help button (question mark) with animation effects */}
            <motion.button
              className="bg-white text-black font-bold text-2xl w-12 h-12 rounded-md flex items-center justify-center shadow-md border-2 border-gray-300"
              whileHover={{ scale: 1.1 }}   // Grow when hovered
              whileTap={{ scale: 0.95 }}    // Shrink when clicked
              onClick={toggleInstructions}
            >
              ?
            </motion.button>
          </div>
        </div>
      </div>

      {/* Robot with speech bubble - fixed position at bottom right */}
      <div className="fixed bottom-4 right-8 z-40 flex flex-row-reverse items-end">
        <motion.div 
          className="w-32 h-32 sm:w-40 sm:h-40"
          initial={{ opacity: 0, scale: 0.8 }}     // Start invisible and smaller
          animate={{ opacity: 1, scale: 1 }}       // Fade in and grow to full size
          transition={{ duration: 0.5 }}           // Animation takes 0.5 seconds
          whileHover={{ y: -5 }}                   // Move up slightly when hovered
        >
          <img 
            src="/images/robot-writing.png" 
            alt="Robot Assistant" 
            className="w-full h-full object-contain"
          />
        </motion.div>
        <div className="ml-3 mb-8">
          <SpeechBubble 
            text="TYPE THE TEXT EXACTLY AS YOU SEE IT! IF YOU MAKE A MISTAKE, THE LETTER WILL TURN RED."
            delay={0.2}
            position="bottom-right"
          />
        </div>
      </div>

      {/* Instructions modal - only shown when showInstructions is true */}
      <InstructionsModal isOpen={showInstructions} onClose={toggleInstructions} />
    </GameLayout>
  );
};

export default WritingPage;
