import { useState } from "react";
import { useSpeakingGame } from "@/hooks/use-speaking-game";
import GameLayout from "@/components/GameLayout";
import SpeechBubble from "@/components/SpeechBubble";
import TextDisplay from "@/components/speaking-game/TextDisplay";
import GameControls from "@/components/speaking-game/GameControls";
import InstructionsModal from "@/components/speaking-game/InstructionsModal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    isRecording,
    recordingResult,
    transcript,
    goToNextExercise,
    goToPreviousExercise,
  } = useSpeakingGame();

  // Robot speech content
  const pixelSpeech = "READ THE TEXT OUT LOUD! IF YOU NEED HELP, PRESS THE SPEAKER BUTTON TO HEAR THE WORDS. PRACTICE MAKES PERFECT!";

  return (
    <GameLayout backTo="/game">
      <div className="w-full h-[calc(100vh-60px)] flex flex-col p-4 sm:p-6">
        <div className="relative flex-1 bg-[#395d6e] rounded-lg p-4 sm:p-6 shadow-lg border-2 border-blue-300/30 flex flex-col justify-between h-full">
          {/* Main content */}
          <div className="w-full h-full flex flex-col items-center justify-center">
            {/* Text display area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full mb-6 sm:mb-8"
            >
              <TextDisplay text={currentExercise.text} />
            </motion.div>
            
            {/* Game controls - expanded size */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full flex-grow flex items-center justify-center"
            >
              <GameControls 
                isPlaying={isPlaying}
                timeElapsed={formatTime(timeElapsed)}
                onTogglePlayPause={togglePlayPause}
                onPlayAudio={playAudio}
                isAudioPlaying={isAudioPlaying}
                isRecording={isRecording}
                recordingResult={recordingResult}
                transcript={transcript}
                onNext={goToNextExercise}
                onHelp={() => setShowInstructions(true)}
              />
            </motion.div>
            
            {/* Next button and Help button - moved to bottom left */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full flex justify-start items-center mt-4 sm:mt-6 gap-2"
            >
              <Button 
                onClick={goToNextExercise}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-xl font-bold"
                disabled={!recordingResult}
              >
                NEXT
              </Button>
              
              {/* Updated question mark button */}
              <motion.button
                className="bg-cyan-300 text-black font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInstructions(true)}
              >
                ?
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Instructions modal */}
      <InstructionsModal 
        isOpen={showInstructions} 
        onClose={() => setShowInstructions(false)} 
      />
      
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
            src="/images/robot-speaking.png" 
            alt="Robot Assistant" 
            className="w-full h-full object-contain"
          />
        </motion.div>
        <div className="ml-3 mb-8">
          <SpeechBubble 
            text={pixelSpeech} 
            delay={0.2} 
            position="bottom-right"
          />
        </div>
      </div>
    </GameLayout>
  );
};

export default SpeakingPage;
