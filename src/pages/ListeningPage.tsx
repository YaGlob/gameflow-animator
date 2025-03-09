
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

        {/* 3D Robot character positioned in bottom right with speech bubble - updated to match AlphabetsPage style */}
        <div className="fixed bottom-4 right-8 z-40 flex flex-row-reverse items-end">
          <RobotScene variant={robotVariant} />
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
      </div>
    </GameLayout>
  );
};

export default ListeningPage;
