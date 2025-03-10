
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameLayout from "@/components/GameLayout";
import SpeechBubble from "@/components/SpeechBubble";
import KeyboardLayout from "@/components/KeyboardLayout";
import WordDisplay from "@/components/listening-game/WordDisplay";
import GameControls from "@/components/listening-game/GameControls";
import InstructionsModal from "@/components/listening-game/InstructionsModal";
import ConfettiEffect from "@/components/listening-game/ConfettiEffect";
import { useListeningGame } from "@/hooks/use-listening-game";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

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
          {/* Keyboard */}
          <KeyboardLayout onKeyPress={handleKeyPress} />
          
          {/* Word display area */}
          <WordDisplay 
            typedWord={typedWord} 
            gameCompleted={gameCompleted} 
            isCorrect={isCorrect} 
          />
          
          {/* Control buttons */}
          <GameControls 
            onHelpClick={toggleInstructions}
            onDeleteClick={() => handleKeyPress("delete")}
            onSpeakerClick={playWordAudio}
            onSubmitClick={handleSubmit}
            onNextClick={handleNext}
            isSubmitShaking={isSubmitShaking}
            isSpeakerDisabled={isSpeakerDisabled}
            gameCompleted={gameCompleted}
            isTypedWordEmpty={typedWord.trim() === ""}
          />
          
          {/* NEXT button in bottom left */}
          <div className="absolute bottom-6 left-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-xl uppercase flex items-center gap-2"
                onClick={() => console.log('Next button clicked')}
              >
                NEXT
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom robot image positioned in bottom right with speech bubble on left */}
      <div className="fixed bottom-4 right-8 z-40 flex flex-row-reverse items-end">
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
        <div className="ml-3 mb-8">
          <SpeechBubble 
            text="WELCOME TO THE LISTENING GAME! I'LL SAY A WORD AND YOU NEED TO SPELL IT CORRECTLY. PRESS THE SPEAKER BUTTON TO HEAR THE WORD AGAIN."
            delay={0.2} 
          />
        </div>
      </div>

      {/* Instructions modal */}
      <InstructionsModal isOpen={showInstructions} onClose={toggleInstructions} />

      {/* Confetti styles */}
      <ConfettiEffect />
    </GameLayout>
  );
};

export default ListeningPage;
