
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface WordDisplayProps {
  typedWord: string;
  gameCompleted: boolean;
  isCorrect: boolean;
  onSubmit: () => void;
}

const WordDisplay = ({ typedWord, gameCompleted, isCorrect, onSubmit }: WordDisplayProps) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center justify-center">
        <motion.div 
          className="w-full max-w-lg h-16 bg-transparent border-b-4 border-cyan-400 flex items-center justify-center text-white text-3xl"
          animate={{ 
            borderColor: gameCompleted && isCorrect
              ? ["#4fd1ff", "#50ff8d", "#4fd1ff"] 
              : "#4fd1ff" 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: gameCompleted && isCorrect ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {typedWord}
        </motion.div>
        
        {/* Submit button with check mark - moved next to the input line */}
        <motion.button
          className={`ml-4 w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
            gameCompleted ? 'bg-green-500' : 'bg-cyan-400'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSubmit}
          disabled={gameCompleted || typedWord.trim() === ""}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Check className="w-8 h-8 text-white" />
        </motion.button>
      </div>
    </div>
  );
};

export default WordDisplay;
