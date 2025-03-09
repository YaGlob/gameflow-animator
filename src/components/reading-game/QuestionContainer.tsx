
import { motion } from "framer-motion";
import { useState } from "react";
import { Answer, Question } from "./types";

interface QuestionContainerProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerSelect: (answerId: string) => void;
  isCorrect?: boolean;
}

const QuestionContainer = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  isCorrect,
}: QuestionContainerProps) => {
  const [isShaking, setIsShaking] = useState<string | null>(null);

  const handleAnswerClick = (answerId: string) => {
    if (selectedAnswer) return; // Prevent changing answer after selection
    
    onAnswerSelect(answerId);
    
    // If answer is incorrect, trigger shake animation
    if (answerId !== question.correctAnswerId) {
      setIsShaking(answerId);
      setTimeout(() => setIsShaking(null), 500); // Reset after animation completes
    }
  };

  return (
    <div className="bg-[#395d6e] shadow-inner rounded-lg p-3 border-l-2 border-cyan-300/50">
      <h3 className="text-white font-bold mb-2 text-sm">{question.text}</h3>
      <div className="space-y-1.5">
        {question.answers.map((answer) => (
          <motion.div
            key={answer.id}
            className={`p-1.5 rounded cursor-pointer transition-colors text-xs ${
              selectedAnswer === answer.id
                ? isCorrect
                  ? "bg-green-500 text-white"
                  : "bg-red-400 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            animate={{
              x: isShaking === answer.id ? [-5, 5, -5, 5, 0] : 0,
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
