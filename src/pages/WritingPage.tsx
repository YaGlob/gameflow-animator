
import { useState } from "react";
import GameLayout from "@/components/GameLayout";
import RobotScene from "@/components/RobotScene";
import SpeechBubble from "@/components/SpeechBubble";
import KeyboardLayout from "@/components/KeyboardLayout";
import TextDisplay from "@/components/writing-game/TextDisplay";
import InstructionsModal from "@/components/writing-game/InstructionsModal";
import { useWritingGame } from "@/hooks/use-writing-game";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const WritingPage = () => {
  const [showSpeechBubble, setShowSpeechBubble] = useState<boolean>(true);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  const {
    currentExercise,
    cursorPosition,
    score,
    robotVariant,
    incorrectChars,
    handleKeyPress,
    handleNextExercise,
    handlePreviousExercise,
    exerciseCompleted,
    hasNextExercise,
    hasPreviousExercise
  } = useWritingGame();

  // Toggle help instructions
  const toggleInstructions = () => {
    setShowInstructions(prev => !prev);
  };

  return (
    <GameLayout>
      <div className="relative w-full mx-auto flex flex-col items-center justify-between min-h-[80vh] p-4">
        {/* Top navigation and score */}
        <motion.div 
          className="w-full flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Empty div to maintain flex spacing */}
          <div></div>
          
          <div className="bg-cyan-300 px-6 py-2 text-black font-bold text-xl rounded">
            SCORE : {score.toString().padStart(2, '0')}
          </div>
        </motion.div>

        {/* Main content container */}
        <motion.div 
          className="w-full max-w-5xl bg-[#395d6e] backdrop-blur-md rounded-xl p-6 flex flex-col items-center shadow-lg border border-cyan-300/30 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Text display */}
          <div className="w-full mb-8">
            <TextDisplay 
              targetText={currentExercise.text}
              cursorPosition={cursorPosition}
              incorrectChars={incorrectChars}
            />
          </div>

          {/* Keyboard */}
          <KeyboardLayout onKeyPress={handleKeyPress} />
          
          {/* Controls at the bottom of the content area */}
          <div className="w-full flex justify-start items-center mt-6 gap-2">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-xl font-bold"
              onClick={handleNextExercise}
              disabled={!exerciseCompleted}
            >
              NEXT
            </Button>
            
            <motion.button
              className="bg-blue-400 text-white font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleInstructions}
            >
              ?
            </motion.button>
          </div>
        </motion.div>

        {/* Robot with speech bubble */}
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
          {showSpeechBubble && (
            <div className="mb-2">
              <SpeechBubble 
                text="TYPE THE TEXT EXACTLY AS YOU SEE IT! IF YOU MAKE A MISTAKE, THE LETTER WILL TURN RED."
                delay={0.2} 
              />
            </div>
          )}
          <RobotScene variant={robotVariant} />
        </div>

        {/* Instructions modal */}
        <InstructionsModal isOpen={showInstructions} onClose={toggleInstructions} />
      </div>
    </GameLayout>
  );
};

export default WritingPage;
