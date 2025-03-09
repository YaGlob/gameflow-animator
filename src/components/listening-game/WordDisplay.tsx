
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface WordDisplayProps {
  typedWord: string;
  gameCompleted: boolean;
  isCorrect: boolean;
}

const WordDisplay = ({ typedWord, gameCompleted, isCorrect }: WordDisplayProps) => {
  return (
    <div className="relative w-full mt-6 mb-6">
      <div className="flex items-center justify-center">
        <motion.div 
          className="w-full max-w-md h-12 bg-transparent border-b-4 border-cyan-400 flex items-center justify-center text-white text-2xl"
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
        
        {/* Checkmark for correct answer */}
        {gameCompleted && isCorrect && (
          <motion.div 
            className="ml-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 10 }}
          >
            <Check className="w-8 h-8 text-green-400" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WordDisplay;
