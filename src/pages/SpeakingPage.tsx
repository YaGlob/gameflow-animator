
import { useState } from "react";
import { useSpeakingGame } from "@/hooks/use-speaking-game";
import GameLayout from "@/components/GameLayout";
import SpeechBubble from "@/components/SpeechBubble";
import TextDisplay from "@/components/speaking-game/TextDisplay";
import GameControls from "@/components/speaking-game/GameControls";
import InstructionsModal from "@/components/speaking-game/InstructionsModal";
import { motion } from "framer-motion";
import RobotScene from "@/components/RobotScene";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

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
      <div className="w-full max-w-6xl mx-auto">
        {/* Instructions modal */}
        <InstructionsModal 
          isOpen={showInstructions} 
          onClose={() => setShowInstructions(false)} 
        />
        
        {/* Main game container with consistent styling */}
        <div className="relative bg-[#395d6e] rounded-lg p-6 min-h-[400px] shadow-lg border-2 border-blue-300/30">
          {/* Main content */}
          <div className="w-full flex flex-col items-center justify-center gap-8 p-4">
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
                onHelp={() => setShowInstructions(true)}
              />
            </motion.div>
            
            {/* Next button and Help button positioned at bottom left */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-6 left-6 flex items-center gap-3"
            >
              <Button 
                onClick={goToNextExercise}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-xl uppercase"
              >
                NEXT
              </Button>
              
              <Button
                onClick={() => setShowInstructions(true)}
                variant="outline"
                size="icon"
                className="bg-blue-500/30 hover:bg-blue-500/50 border-none rounded-full text-white h-12 w-12"
              >
                <HelpCircle className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Robot with speech bubble */}
        <div className="fixed bottom-4 right-8 z-40 flex flex-row-reverse items-end">
          <RobotScene variant="normal" />
          <div className="ml-3 mb-8">
            <SpeechBubble text={pixelSpeech} delay={0.2} />
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default SpeakingPage;
