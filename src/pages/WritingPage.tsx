
import { useState } from "react";
import GameLayout from "@/components/GameLayout";
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
      <div className="w-full h-[calc(100vh-60px)] flex flex-col p-4 sm:p-6">
        <div className="relative flex-1 bg-[#395d6e] rounded-lg p-4 sm:p-6 shadow-lg border-2 border-blue-300/30 flex flex-col justify-between h-full">
          {/* Score display */}
          <div className="absolute top-0 left-0 right-0 flex justify-center" style={{ transform: 'translateY(-50%)' }}>
            <div className="bg-cyan-300 px-6 py-2 text-black font-bold text-xl rounded shadow-lg">
              SCORE : {score.toString().padStart(2, '0')}
            </div>
          </div>
          
          {/* Text display */}
          <div className="w-full mb-4 sm:mb-6 mt-6 sm:mt-8">
            <TextDisplay 
              targetText={currentExercise.text}
              cursorPosition={cursorPosition}
              incorrectChars={incorrectChars}
            />
          </div>

          {/* Keyboard - now with expanded size */}
          <div className="flex-grow flex items-center justify-center">
            <KeyboardLayout onKeyPress={handleKeyPress} />
          </div>
          
          {/* Controls */}
          <div className="w-full flex justify-start items-center mt-4 sm:mt-6 gap-2">
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
        </div>
      </div>

      {/* Robot with speech bubble - Updated to match standard size */}
      <div className="fixed bottom-4 right-8 z-40 flex flex-row-reverse items-end">
        <motion.div 
          className="w-32 h-32 sm:w-40 sm:h-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
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

      {/* Instructions modal */}
      <InstructionsModal isOpen={showInstructions} onClose={toggleInstructions} />
    </GameLayout>
  );
};

export default WritingPage;
