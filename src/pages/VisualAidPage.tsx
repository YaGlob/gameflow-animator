
import { motion } from "framer-motion";
import GameLayout from "@/components/GameLayout";
import SpeechBubble from "@/components/SpeechBubble";
import HelpModal from "@/components/visual-aid/HelpModal";
import GameBoard from "@/components/visual-aid/GameBoard";
import GameControls from "@/components/visual-aid/GameControls";
import { useVisualAidGame } from "@/hooks/use-visual-aid-game";

const VisualAidPage = () => {
  const {
    currentLevel,
    activeConnection,
    completedConnections,
    robotSpeech,
    showHelp,
    lineRef,
    handleWordDotClick,
    handleImageDotClick,
    handleNextLevel,
    toggleHelp,
    getCoordinates,
    levels
  } = useVisualAidGame();

  return (
    <GameLayout backTo="/game">
      <div className="w-full mx-auto relative">
        {/* Help modal */}
        <HelpModal isOpen={showHelp} onClose={toggleHelp} />

        {/* Game area */}
        <div className="relative bg-[#395d6e] rounded-lg p-6 shadow-lg border-2 border-blue-300/30">
          <GameBoard 
            items={levels[currentLevel].items}
            activeConnection={activeConnection}
            completedConnections={completedConnections}
            lineRef={lineRef}
            onWordDotClick={handleWordDotClick}
            onImageDotClick={handleImageDotClick}
            getCoordinates={getCoordinates}
          />
          
          {/* Bottom controls */}
          <GameControls 
            onNextLevel={handleNextLevel} 
            onToggleHelp={toggleHelp} 
          />
        </div>
      </div>

      {/* Robot with speech bubble */}
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
            text={robotSpeech} 
            delay={0.2} 
            position="bottom-right"
          />
        </div>
      </div>
    </GameLayout>
  );
};

export default VisualAidPage;
