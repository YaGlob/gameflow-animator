
import { motion } from "framer-motion";
import { useState } from "react";
import { Answer, Question } from "./types";

// Props that the QuestionContainer component expects
interface QuestionContainerProps {
  question: Question;                              // The question data
  selectedAnswer?: string;                         // ID of the user's selected answer (if any)
  onAnswerSelect: (answerId: string) => void;      // Function to call when an answer is selected
  isCorrect?: boolean;                             // Whether the selected answer is correct
}

// Component that displays a question and its possible answers
const QuestionContainer = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  isCorrect,
}: QuestionContainerProps) => {
  // State to track which answer is currently shaking (for wrong answers)
  const [isShaking, setIsShaking] = useState<string | null>(null);

  // Handle click on an answer option
  const handleAnswerClick = (answerId: string) => {
    // Prevent changing answer after selection
    if (selectedAnswer) return;
    
    // Call the parent component's handler
    onAnswerSelect(answerId);
    
    // If answer is incorrect, trigger shake animation
    if (answerId !== question.correctAnswerId) {
      setIsShaking(answerId);
      setTimeout(() => setIsShaking(null), 500); // Reset after animation completes
    }
  };

  return (
    <div className="bg-[#395d6e] shadow-inner rounded-lg p-4 sm:p-5 border-l-4 border-cyan-300/50">
      {/* Question text */}
      <h3 className="text-white font-bold mb-3 text-base sm:text-lg">{question.text}</h3>
      
      {/* Answer options */}
      <div className="space-y-2 sm:space-y-3">
        {question.answers.map((answer) => (
          <motion.div
            key={answer.id}
            className={`p-2 sm:p-3 rounded cursor-pointer transition-colors text-sm sm:text-base ${
              selectedAnswer === answer.id
                ? isCorrect
                  ? "bg-green-500 text-white"     // Correct answer - green
                  : "bg-red-400 text-white"       // Incorrect answer - red
                : "bg-white/10 text-white hover:bg-white/20"  // Unselected - translucent
            }`}
            animate={{
              x: isShaking === answer.id ? [-5, 5, -5, 5, 0] : 0,  // Shake animation for wrong answers
            }}
            onClick={() => handleAnswerClick(answer.id)}
          >
            {answer.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuestionContainer;
