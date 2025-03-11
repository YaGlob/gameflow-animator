
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface GameControlsProps {
  onNextLevel: () => void;
  onToggleHelp: () => void;
}

const GameControls = ({ onNextLevel, onToggleHelp }: GameControlsProps) => {
  return (
    <div className="mt-8 flex items-center gap-3">
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="bg-blue-600 hover:bg-blue-500 text-white text-xl font-bold py-2 px-8 rounded-lg transition-colors shadow-lg"
        onClick={onNextLevel}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        NEXT
      </motion.button>
      
      {/* Updated question mark button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-cyan-300 hover:bg-cyan-400 text-black w-12 h-12 rounded-full border-2 border-white"
          onClick={onToggleHelp}
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};

export default GameControls;
