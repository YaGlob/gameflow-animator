
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameLayout from "@/components/GameLayout";
import RobotScene from "@/components/RobotScene";
import SpeechBubble from "@/components/SpeechBubble";
import KeyboardLayout from "@/components/KeyboardLayout";
import WordDisplay from "@/components/listening-game/WordDisplay";
import GameControls from "@/components/listening-game/GameControls";
import InstructionsModal from "@/components/listening-game/InstructionsModal";
import ConfettiEffect from "@/components/listening-game/ConfettiEffect";
import { useListeningGame } from "@/hooks/use-listening-game";
import { ArrowLeft } from "lucide-react";

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
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-between min-h-[80vh]">
        {/* Back button on top left */}
        <motion.button
          className="absolute top-4 left-4 flex items-center justify-center bg-blue-500/30 hover:bg-blue-500/50 text-white px-6 py-3 rounded-md backdrop-blur-sm transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          BACK
        </motion.button>
        
        {/* Robot with speech bubble */}
        <div className="absolute top-4 right-4 z-50 flex flex-col items-end">
          <AnimatePresence>
            {showSpeechBubble && (
              <div className="mb-2">
                <SpeechBubble 
                  text="WELCOME TO THE LISTENING GAME! I'LL SAY A WORD AND YOU NEED TO SPELL IT CORRECTLY. PRESS THE SPEAKER BUTTON TO HEAR THE WORD AGAIN."
                  delay={0.2} 
                />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Main game container - updated styling */}
        <div className="relative bg-[#395d6e] rounded-lg p-6 min-h-[400px] shadow-lg border-2 border-blue-300/30 flex flex-col items-center">
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
        </div>

        {/* 3D Robot character positioned in bottom right */}
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
          <RobotScene variant={robotVariant} />
        </div>

        {/* Instructions modal */}
        <InstructionsModal isOpen={showInstructions} onClose={toggleInstructions} />

        {/* Confetti styles */}
        <ConfettiEffect />
      </div>
    </GameLayout>
  );
};

export default ListeningPage;
