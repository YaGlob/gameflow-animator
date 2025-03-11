
import { useState } from "react";
import GameLayout from "@/components/GameLayout";
import SpeechBubble from "@/components/SpeechBubble";
import ReadingContent from "@/components/reading-game/ReadingContent";
import QuestionContainer from "@/components/reading-game/QuestionContainer";
import InstructionsModal from "@/components/reading-game/InstructionsModal";
import { useReadingGame } from "@/hooks/use-reading-game";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

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

  const toggleInstructions = () => {
    setShowInstructions(prev => !prev);
  };

  return (
    <GameLayout>
      <div className="w-full h-[calc(100vh-60px)] flex flex-col p-[30px]">
        <div className="relative flex-1 bg-[#395d6e] rounded-lg p-4 sm:p-6 shadow-lg border-2 border-blue-300/30 overflow-y-auto max-h-[calc(100vh-220px)]">
          {currentStory && (
            <ReadingContent 
              paragraphs={currentStory.pages[currentPage].paragraphs}
              images={currentStory.pages[currentPage].images}
              pageId={currentStory.pages[currentPage].id}
            />
          )}

          {currentStory && (
            <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
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

          <div className="w-full flex justify-between mt-6">
            <div className="flex items-center gap-3">
              <motion.button
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md font-bold text-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextPage}
                disabled={!hasNextPage}
                style={{ opacity: hasNextPage ? 1 : 0.5 }}
              >
                NEXT
              </motion.button>
              
              {/* Updated question mark button */}
              <motion.button
                className="bg-cyan-300 text-black font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleInstructions}
              >
                <HelpCircle className="h-6 w-6" />
              </motion.button>
            </div>
            
            <div></div>
          </div>
        </div>
      </div>

      {/* Robot with speech bubble - Updated to match standard size */}
      <div className="fixed bottom-4 right-8 z-40 flex flex-row-reverse items-end">
        <motion.div 
          className="w-32 h-32 sm:w-40 sm:h-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <img 
            src="/images/robot-custom.png" 
            alt="Robot Assistant" 
            className="w-full h-full object-contain"
          />
        </motion.div>
        <div className="ml-3 mb-8">
          <SpeechBubble 
            text="READ THE TEXT CAREFULLY AND ANSWER THE QUESTIONS. IF YOUR ANSWER IS RIGHT, IT WILL TURN GREEN!"
            delay={0.2}
            position="bottom-right"
          />
        </div>
      </div>

      <InstructionsModal isOpen={showInstructions} onClose={toggleInstructions} />
    </GameLayout>
  );
};

export default ReadingPage;
