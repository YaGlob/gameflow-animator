
import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, Trash2, Volume2 } from "lucide-react";

interface GameControlsProps {
  onBackClick: () => void;
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

const GameControls = ({
  onBackClick,
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
    <div className="w-full flex items-center justify-between mt-4">
      <div className="flex space-x-4">
        {/* Back button */}
        <motion.button
          className="flex items-center justify-center bg-blue-500/30 hover:bg-blue-500/50 text-white px-6 py-3 rounded-md backdrop-blur-sm transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBackClick}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          BACK
        </motion.button>

        {/* Help button */}
        <motion.button
          className="flex items-center justify-center bg-blue-500/30 hover:bg-blue-500/50 text-white p-3 rounded-md backdrop-blur-sm transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onHelpClick}
        >
          <HelpCircle className="h-5 w-5" />
        </motion.button>

        {/* Delete button */}
        <motion.button
          className="flex items-center justify-center bg-blue-500/30 hover:bg-blue-500/50 text-white p-3 rounded-md backdrop-blur-sm transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDeleteClick}
          disabled={gameCompleted}
        >
          <Trash2 className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="flex space-x-4">
        {/* Speaker button */}
        <motion.button
          className={`flex items-center justify-center ${isSpeakerDisabled ? 'bg-gray-500/50' : 'bg-blue-500/30 hover:bg-blue-500/50'} text-white p-4 rounded-full backdrop-blur-sm transition-colors`}
          whileHover={isSpeakerDisabled ? {} : { scale: 1.05 }}
          whileTap={isSpeakerDisabled ? {} : { scale: 0.98 }}
          onClick={onSpeakerClick}
          disabled={isSpeakerDisabled}
        >
          <Volume2 className="h-8 w-8" />
        </motion.button>

        {/* Submit/Next button */}
        {!gameCompleted ? (
          <motion.button
            className="flex items-center justify-center bg-cyan-500/70 hover:bg-cyan-500/90 text-white px-6 py-3 rounded-md backdrop-blur-sm transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            animate={{ x: isSubmitShaking ? [-5, 5, -5, 5, 0] : 0 }}
            transition={{ duration: 0.4 }}
            onClick={onSubmitClick}
            disabled={isTypedWordEmpty}
          >
            SUBMIT
          </motion.button>
        ) : (
          <motion.button
            className="flex items-center justify-center bg-green-500/70 hover:bg-green-500/90 text-white px-6 py-3 rounded-md backdrop-blur-sm transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10 }}
            onClick={onNextClick}
          >
            NEXT
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default GameControls;
