
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
                onSubmit={handleSubmit}
              />
            </div>
          </div>
          
          {/* Help, Delete and Next buttons positioned at bottom left */}
          <div className="absolute bottom-6 left-6 flex space-x-4 z-10">
            {/* Updated question mark button */}
            <motion.button
              className="flex items-center justify-center bg-cyan-300 text-black p-3 rounded-full shadow-lg border-2 border-white"
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
            
            {/* NEXT button at bottom left */}
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
        {/* SWAPPED: Speaker button positioned above the robot */}
        <div className="flex flex-col items-end mr-4">
          {/* Speaker button now on top */}
          <motion.button
            className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
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
          
          {/* Speech bubble now at the bottom */}
          <SpeechBubble 
            text="WELCOME TO THE LISTENING GAME! I'LL SAY A WORD AND YOU NEED TO SPELL IT CORRECTLY. PRESS THE SPEAKER BUTTON TO HEAR THE WORD AGAIN."
            delay={0.2} 
            position="bottom-left"
          />
        </div>
        
        {/* Robot - Updated to match standard size */}
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

      {/* Instructions modal */}
      <InstructionsModal isOpen={showInstructions} onClose={toggleInstructions} />

      {/* Confetti effect */}
      <ConfettiEffect />
    </GameLayout>
  );
};

export default ListeningPage;
