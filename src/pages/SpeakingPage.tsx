
import { useState } from "react";
import { useSpeakingGame } from "@/hooks/use-speaking-game";
import GameLayout from "@/components/GameLayout";
import SpeechBubble from "@/components/SpeechBubble";
import TextDisplay from "@/components/speaking-game/TextDisplay";
import GameControls from "@/components/speaking-game/GameControls";
import InstructionsModal from "@/components/speaking-game/InstructionsModal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Main component for the Speaking Activity page
const SpeakingPage = () => {
  // State variables to control UI elements
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  
  // Get all the game functionality from our custom hook
  const {
    currentExercise,         // Current speaking exercise data
    isPlaying,               // Whether recording is active
    timeElapsed,             // How long the recording has been going
    formatTime,              // Function to format seconds as MM:SS
    togglePlayPause,         // Function to start/stop recording
    playAudio,               // Function to play the example audio
    isAudioPlaying,          // Whether example audio is currently playing
    isRecording,             // Whether the microphone is recording
    recordingResult,         // Result of speech recognition (success/error/null)
    transcript,              // Text transcribed from the user's speech
    goToNextExercise,        // Function to move to next exercise
    goToPreviousExercise,    // Function to move to previous exercise
  } = useSpeakingGame();

  // Robot's speech bubble text
  const pixelSpeech = "Try reading the text aloud with expression! If you need assistance, tap the speaker button to hear proper pronunciation. Regular practice leads to improvement!";

  return (
    <GameLayout backTo="/game">
      <div className="w-full h-[calc(100vh-60px)] flex flex-col p-4 sm:p-6">
        {/* Main game container */}
        <div className="relative flex-1 bg-[#395d6e] rounded-lg p-4 sm:p-6 shadow-lg border-2 border-blue-300/30 flex flex-col justify-between h-full">
          {/* Main content area */}
          <div className="w-full h-full flex flex-col items-center justify-center">
            {/* Text display area - shows the text to speak */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}      // Start invisible and below final position
              animate={{ opacity: 1, y: 0 }}       // Fade in and move to final position
              transition={{ duration: 0.5 }}       // Animation takes 0.5 seconds
              className="w-full mb-6 sm:mb-8"
            >
              <TextDisplay text={currentExercise.text} />
            </motion.div>
            
            {/* Game controls - Play/Record button, timer, and speaker button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}  // Start after 0.2 second delay
              className="w-full flex-grow flex items-center justify-center"
            >
              <GameControls 
                isPlaying={isPlaying}                          // Whether recording is active
                timeElapsed={formatTime(timeElapsed)}          // Formatted time (MM:SS)
                onTogglePlayPause={togglePlayPause}            // Start/stop recording
                onPlayAudio={playAudio}                        // Play example audio
                isAudioPlaying={isAudioPlaying}                // Whether audio is playing
                isRecording={isRecording}                      // Whether mic is recording
                recordingResult={recordingResult}              // Success/error/null
                transcript={transcript}                        // Recognized speech text
                onNext={goToNextExercise}                      // Go to next exercise
                onHelp={() => setShowInstructions(true)}       // Show instructions
              />
            </motion.div>
            
            {/* Next button and Help button at bottom left */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full flex justify-start items-center mt-4 sm:mt-6 gap-2"
            >
              <Button 
                onClick={goToNextExercise}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-xl font-bold"
                disabled={!recordingResult}  // Can't proceed until recording is done
              >
                NEXT
              </Button>
              
              {/* Help button (question mark) */}
              <motion.button
                className="bg-white text-black font-bold text-2xl w-12 h-12 rounded-md flex items-center justify-center shadow-md border-2 border-gray-300"
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
      
      {/* Instructions modal - only shown when showInstructions is true */}
      <InstructionsModal 
        isOpen={showInstructions} 
        onClose={() => setShowInstructions(false)} 
      />
      
      {/* Robot with speech bubble - fixed position at bottom right */}
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
