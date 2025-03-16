
import { motion } from "framer-motion";
import GameLayout from "@/components/GameLayout";
import SpeechBubble from "@/components/SpeechBubble";
import HelpModal from "@/components/visual-aid/HelpModal";
import GameBoard from "@/components/visual-aid/GameBoard";
import GameControls from "@/components/visual-aid/GameControls";
import { useVisualAidGame } from "@/hooks/use-visual-aid-game";

// Main component for the Visual Aid Activity page
const VisualAidPage = () => {
  // Get all the game functionality from our custom hook
  const {
    currentLevel,                // Current level number
    activeConnection,            // Currently active connection (if any)
    completedConnections,        // List of successfully completed connections
    robotSpeech,                 // Text for the robot's speech bubble
    showHelp,                    // Whether to show the help modal
    lineRef,                     // Reference for the SVG line element
    handleWordDotClick,          // Function to handle word dot clicks
    handleImageDotClick,         // Function to handle image dot clicks
    handleNextLevel,             // Function to move to next level
    toggleHelp,                  // Function to show/hide help modal
    getCoordinates,              // Function to calculate line coordinates
    levels                       // Array of all game levels
  } = useVisualAidGame();

  return (
    <GameLayout backTo="/game">
      <div className="w-full max-w-5xl mx-auto relative flex flex-col items-center justify-center">
        {/* Help modal - only shown when showHelp is true */}
        <HelpModal isOpen={showHelp} onClose={toggleHelp} />

        {/* Main game area */}
        <div className="relative bg-[#395d6e] rounded-lg p-6 shadow-lg border-2 border-blue-300/30 w-full">
          {/* Game board containing words and images to match */}
          <GameBoard 
            items={levels[currentLevel].items}                 // Items for current level
            activeConnection={activeConnection}                // Currently active connection
            completedConnections={completedConnections}        // Completed connections
            lineRef={lineRef}                                  // SVG reference
            onWordDotClick={handleWordDotClick}                // Handle word dot clicks
            onImageDotClick={handleImageDotClick}              // Handle image dot clicks
            getCoordinates={getCoordinates}                    // Calculate line coordinates
          />
          
          {/* Bottom controls - Next button and Help button */}
          <GameControls 
            onNextLevel={handleNextLevel} 
            onToggleHelp={toggleHelp} 
          />
        </div>
      </div>

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
            src="/images/robot-visual-aid.png" 
            alt="Robot Assistant" 
            className="w-full h-full object-contain"
          />
        </motion.div>
        <div className="ml-3 mb-8">
          <SpeechBubble 
            text="Can you match each word with its picture? First click a dot beside a word, then click the dot beside its matching image!"
            delay={0.2} 
            position="bottom-right"
          />
        </div>
      </div>
    </GameLayout>
  );
};

export default VisualAidPage;
