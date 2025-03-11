
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

/**
 * Props for the GameControls component
 */
interface GameControlsProps {
  onNextLevel: () => void;      // Function to call when user clicks "Next" button
  onToggleHelp: () => void;     // Function to call when user clicks help button
}

/**
 * GameControls Component
 * 
 * Displays the navigation buttons for the Visual Aid game:
 * - Next button: Advances to the next level
 * - Help button: Shows instructions for the game
 * 
 * Both buttons have animation effects for better user experience.
 * 
 * @param onNextLevel - Function to call when Next button is clicked
 * @param onToggleHelp - Function to call when Help button is clicked
 */
const GameControls = ({ onNextLevel, onToggleHelp }: GameControlsProps) => {
  return (
    <div className="mt-8 flex items-center gap-3">
      {/* Next button with animation effects */}
      <motion.button
        // Animation properties for when the button first appears
        initial={{ opacity: 0, y: 20 }}               // Start invisible and below final position
        animate={{ opacity: 1, y: 0 }}                // Fade in and move to final position
        transition={{ duration: 0.3, delay: 0.8 }}    // Take 0.3 seconds to animate, starting after 0.8 seconds
        
        // Button styling
        className="bg-blue-600 hover:bg-blue-500 text-white text-xl font-bold py-2 px-8 rounded-lg transition-colors shadow-lg"
        
        // What happens when the button is clicked
        onClick={onNextLevel}
        
        // Interactive animation effects
        whileHover={{ scale: 1.05 }}                  // Grow slightly when hovered
        whileTap={{ scale: 0.95 }}                    // Shrink slightly when pressed
      >
        NEXT
      </motion.button>
      
      {/* Help button (question mark) */}
      <motion.div
        whileHover={{ scale: 1.05 }}                  // Grow slightly when hovered
        whileTap={{ scale: 0.95 }}                    // Shrink slightly when pressed
      >
        <Button 
          variant="outline" 
          size="icon" 
          // Button styling - white square with gray border
          className="bg-white hover:bg-gray-100 text-black w-12 h-12 rounded-md border-2 border-gray-300 flex items-center justify-center shadow-md"
          onClick={onToggleHelp}
        >
          <span className="text-2xl font-bold">?</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default GameControls;
