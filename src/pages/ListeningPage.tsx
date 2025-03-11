
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameLayout from "@/components/GameLayout";
import SpeechBubble from "@/components/SpeechBubble";
import KeyboardLayout from "@/components/KeyboardLayout";
import WordDisplay from "@/components/listening-game/WordDisplay";
import InstructionsModal from "@/components/listening-game/InstructionsModal";
import ConfettiEffect from "@/components/listening-game/ConfettiEffect";
import { useListeningGame } from "@/hooks/use-listening-game";
import { Button } from "@/components/ui/button";
import { ChevronRight, HelpCircle, Trash2 } from "lucide-react";

const ListeningPage = () => {
  const [showSpeechBubble, setShowSpeechBubble] = useState<boolean>(true);
  
  const {
    typedWord,
    gameCompleted,
    isSpeakerDisabled,
    isSubmitShaking,
    robotVariant,
    showInstructions,
    setShowInstructions,
    handleKeyPress,
    handleSubmit,
    handleNext,
    playWordAudio,
    isCorrect
  } = useListeningGame();

  // Toggle instructions
  const toggleInstructions = () => {
    setShowInstructions(prev => !prev);
  };

  return (
    <GameLayout>
      <div className="w-full h-[calc(100vh-60px)] flex flex-col p-[30px]">
        <div className="relative flex-1 bg-[#395d6e] rounded-lg p-6 shadow-lg border-2 border-blue-300/30">
          {/* Center the contents */}
          <div className="flex flex-col items-center justify-center h-full">
            {/* Keyboard */}
            <div className="w-full max-w-5xl mx-auto mb-8">
              <KeyboardLayout onKeyPress={handleKeyPress} />
            </div>
            
            {/* Word display area */}
            <div className="w-full max-w-3xl mx-auto mb-10">
              <WordDisplay 
                typedWord={typedWord} 
                gameCompleted={gameCompleted} 
                isCorrect={isCorrect} 
              />
            </div>
          </div>
          
          {/* Help and Delete buttons positioned at bottom left */}
          <div className="absolute bottom-6 left-6 flex space-x-4 z-10">
            <motion.button
              className="flex items-center justify-center bg-blue-500/30 hover:bg-blue-500/50 text-white p-3 rounded-md backdrop-blur-sm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleInstructions}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <HelpCircle className="h-6 w-6" />
            </motion.button>
            <motion.button
              className="flex items-center justify-center bg-blue-500/30 hover:bg-blue-500/50 text-white p-3 rounded-md backdrop-blur-sm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleKeyPress("delete")}
              disabled={gameCompleted}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Trash2 className="h-6 w-6" />
            </motion.button>
            
            {/* NEXT button moved to bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-lg uppercase flex items-center gap-2"
                onClick={handleNext}
              >
                NEXT
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Fixed positioning for robot and controls */}
      <div className="fixed bottom-4 right-8 z-40 flex items-end">
        {/* Robot with speaker button above it */}
        <div className="relative">
          {/* Speaker button positioned above robot's head */}
          <motion.button
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playWordAudio}
            disabled={isSpeakerDisabled}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              animate={isSpeakerDisabled ? {} : { scale: [1, 1.1, 1] }}
              transition={{ repeat: isSpeakerDisabled ? 0 : Infinity, duration: 1.5 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            </motion.div>
          </motion.button>
          
          {/* Robot */}
          <motion.div 
            className="w-32 h-32 sm:w-40 sm:h-40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <img 
              src="/images/robot-listening.png" 
              alt="Robot Assistant" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>
        
        {/* Submit button with check mark */}
        <motion.button
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg ml-4 ${
            gameCompleted ? 'bg-green-500' : 'bg-cyan-400'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={gameCompleted || typedWord.trim() === ""}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, x: isSubmitShaking ? [-5, 5, -5, 5, 0] : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </motion.button>
        
        {/* Speech bubble with improved positioning */}
        <div className="ml-3">
          <SpeechBubble 
            text="WELCOME TO THE LISTENING GAME! I'LL SAY A WORD AND YOU NEED TO SPELL IT CORRECTLY. PRESS THE SPEAKER BUTTON TO HEAR THE WORD AGAIN."
            delay={0.2} 
            position="bottom-right"
          />
        </div>
      </div>

      {/* Instructions modal */}
      <InstructionsModal isOpen={showInstructions} onClose={toggleInstructions} />

      {/* Confetti effect */}
      <ConfettiEffect />
    </GameLayout>
  );
};

export default ListeningPage;
