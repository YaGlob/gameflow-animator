
import { useState } from "react";
import GameLayout from "@/components/GameLayout";
import RobotScene from "@/components/RobotScene";
import SpeechBubble from "@/components/SpeechBubble";
import ReadingContent from "@/components/reading-game/ReadingContent";
import QuestionContainer from "@/components/reading-game/QuestionContainer";
import InstructionsModal from "@/components/reading-game/InstructionsModal";
import { useReadingGame } from "@/hooks/use-reading-game";
import { motion } from "framer-motion";

const ReadingPage = () => {
  const [showSpeechBubble, setShowSpeechBubble] = useState<boolean>(true);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  const {
    currentStory,
    currentPage,
    handleAnswerSelect,
    handleNextPage,
    handlePreviousPage,
    hasNextPage,
    hasPreviousPage,
    selectedAnswers,
    checkIfAnswerIsCorrect,
    robotVariant
  } = useReadingGame();

  // Toggle help instructions
  const toggleInstructions = () => {
    setShowInstructions(prev => !prev);
  };

  return (
    <GameLayout>
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-between min-h-[80vh]">
        {/* Robot with speech bubble */}
        <div className="absolute top-4 right-4 z-50 flex flex-col items-end">
          {showSpeechBubble && (
            <div className="mb-2">
              <SpeechBubble 
                text="READ THE TEXT CAREFULLY AND ANSWER THE QUESTIONS. IF YOUR ANSWER IS RIGHT, IT WILL TURN GREEN!"
                delay={0.2} 
              />
            </div>
          )}
        </div>

        {/* Main content container - Updated with new styling */}
        <motion.div 
          className="relative bg-[#395d6e] rounded-lg p-6 min-h-[400px] shadow-lg border-2 border-blue-300/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Reading content with reduced font size */}
          {currentStory && (
            <ReadingContent 
              paragraphs={currentStory.pages[currentPage].paragraphs}
              images={currentStory.pages[currentPage].images}
            />
          )}

          {/* Question container with reduced size */}
          {currentStory && (
            <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentStory.pages[currentPage].questions.map((question, index) => (
                <QuestionContainer
                  key={index}
                  question={question}
                  selectedAnswer={selectedAnswers[question.id]}
                  onAnswerSelect={(answerId) => handleAnswerSelect(question.id, answerId)}
                  isCorrect={selectedAnswers[question.id] ? checkIfAnswerIsCorrect(question.id, selectedAnswers[question.id]) : undefined}
                />
              ))}
            </div>
          )}

          {/* Navigation controls with smaller spacing */}
          <div className="w-full flex justify-between mt-6">
            <motion.button
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md font-bold text-base shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePreviousPage}
              disabled={!hasPreviousPage}
              style={{ opacity: hasPreviousPage ? 1 : 0.5 }}
            >
              BACK
            </motion.button>

            <motion.button
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full font-bold text-base shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleInstructions}
            >
              ?
            </motion.button>

            <motion.button
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md font-bold text-base shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNextPage}
              disabled={!hasNextPage}
              style={{ opacity: hasNextPage ? 1 : 0.5 }}
            >
              NEXT
            </motion.button>
          </div>
        </motion.div>

        {/* 3D Robot character positioned in bottom right */}
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
          <RobotScene variant={robotVariant} />
        </div>

        {/* Instructions modal */}
        <InstructionsModal isOpen={showInstructions} onClose={toggleInstructions} />
      </div>
    </GameLayout>
  );
};

export default ReadingPage;
