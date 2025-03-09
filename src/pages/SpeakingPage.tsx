
import { useState } from "react";
import { useSpeakingGame } from "@/hooks/use-speaking-game";
import GameLayout from "@/components/GameLayout";
import Robot from "@/components/Robot";
import SpeechBubble from "@/components/SpeechBubble";
import TextDisplay from "@/components/speaking-game/TextDisplay";
import GameControls from "@/components/speaking-game/GameControls";
import InstructionsModal from "@/components/speaking-game/InstructionsModal";
import { motion } from "framer-motion";

const SpeakingPage = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  
  const {
    currentExercise,
    isPlaying,
    timeElapsed,
    formatTime,
    togglePlayPause,
    playAudio,
    isAudioPlaying,
    goToNextExercise,
    goToPreviousExercise,
  } = useSpeakingGame();

  // Robot speech content
  const pixelSpeech = "READ THE TEXT OUT LOUD! IF YOU NEED HELP, PRESS THE SPEAKER BUTTON TO HEAR THE WORDS. PRACTICE MAKES PERFECT!";

  return (
    <GameLayout backTo="/game">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-between space-y-6 h-full">
          {/* Instructions modal */}
          <InstructionsModal 
            isOpen={showInstructions} 
            onClose={() => setShowInstructions(false)} 
          />
          
          {/* Main content */}
          <div className="w-full flex-1 flex flex-col items-center justify-center gap-8 p-4">
            {/* Text display area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <TextDisplay text={currentExercise.text} />
            </motion.div>
            
            {/* Game controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full"
            >
              <GameControls 
                isPlaying={isPlaying}
                timeElapsed={formatTime(timeElapsed)}
                onTogglePlayPause={togglePlayPause}
                onPlayAudio={playAudio}
                isAudioPlaying={isAudioPlaying}
                onNext={goToNextExercise}
                onBack={goToPreviousExercise}
                onHelp={() => setShowInstructions(true)}
              />
            </motion.div>
          </div>
          
          {/* Robot with speech bubble */}
          <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            {showSpeechBubble && (
              <div className="mb-2">
                <SpeechBubble text={pixelSpeech} delay={0.2} />
              </div>
            )}
            <Robot 
              variant="normal" 
              onClick={() => setShowSpeechBubble(!showSpeechBubble)} 
            />
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default SpeakingPage;
