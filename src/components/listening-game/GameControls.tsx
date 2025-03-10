
import { motion } from "framer-motion";
import { HelpCircle, Trash2, Volume2, Check } from "lucide-react";

interface GameControlsProps {
  onHelpClick: () => void;
  onDeleteClick: () => void;
  onSpeakerClick: () => void;
  onSubmitClick: () => void;
  onNextClick: () => void;
  isSubmitShaking: boolean;
  isSpeakerDisabled: boolean;
  gameCompleted: boolean;
  isTypedWordEmpty: boolean;
}

// Note: This component is no longer used directly in ListeningPage.tsx
// The controls have been moved to the ListeningPage component
const GameControls = ({
  onHelpClick,
  onDeleteClick,
  onSpeakerClick,
  onSubmitClick,
  onNextClick,
  isSubmitShaking,
  isSpeakerDisabled,
  gameCompleted,
  isTypedWordEmpty,
}: GameControlsProps) => {
  return (
    <div className="w-full flex items-center justify-between mt-6">
      <div className="flex space-x-4">
        {/* Help button */}
        <motion.button
          className="flex items-center justify-center bg-blue-500/30 hover:bg-blue-500/50 text-white p-3 rounded-md backdrop-blur-sm transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onHelpClick}
        >
          <HelpCircle className="h-6 w-6" />
        </motion.button>

        {/* Delete button */}
        <motion.button
          className="flex items-center justify-center bg-blue-500/30 hover:bg-blue-500/50 text-white p-3 rounded-md backdrop-blur-sm transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDeleteClick}
          disabled={gameCompleted}
        >
          <Trash2 className="h-6 w-6" />
        </motion.button>
      </div>

      <div className="flex space-x-4">
        {/* Speaker button */}
        <motion.button
          className={`flex items-center justify-center ${isSpeakerDisabled ? 'bg-gray-500/50' : 'bg-white'} text-black p-4 rounded-full shadow-lg transition-colors`}
          whileHover={isSpeakerDisabled ? {} : { scale: 1.05 }}
          whileTap={isSpeakerDisabled ? {} : { scale: 0.98 }}
          onClick={onSpeakerClick}
          disabled={isSpeakerDisabled}
        >
          <Volume2 className="h-8 w-8" />
        </motion.button>

        {/* Submit button - now uses Check icon */}
        {!gameCompleted ? (
          <motion.button
            className="flex items-center justify-center bg-cyan-400 hover:bg-cyan-500 text-white p-4 rounded-full shadow-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            animate={{ x: isSubmitShaking ? [-5, 5, -5, 5, 0] : 0 }}
            transition={{ duration: 0.4 }}
            onClick={onSubmitClick}
            disabled={isTypedWordEmpty}
          >
            <Check className="h-8 w-8 stroke-[3]" />
          </motion.button>
        ) : (
          <motion.button
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10 }}
            onClick={onNextClick}
          >
            <Check className="h-8 w-8 stroke-[3]" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default GameControls;
