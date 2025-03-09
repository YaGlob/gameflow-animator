
import { useState } from "react";
import GameLayout from "@/components/GameLayout";
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

  // Custom image replacement for the selected image
  const getCustomImage = (imageSrc: string) => {
    // Replace the specific image with our uploaded girl and cat image
    if (imageSrc.includes("placeholder") || imageSrc.includes("cat")) {
      return "/lovable-uploads/a43472ee-74e2-4469-8f36-a510e9ebd66c.png";
    }
    return imageSrc;
  };

  // Toggle help instructions
  const toggleInstructions = () => {
    setShowInstructions(prev => !prev);
  };

  return (
    <GameLayout>
      <div className="relative w-full mx-auto flex flex-col items-center justify-between">
        {/* Main content container */}
        <motion.div 
          className="relative bg-[#395d6e] rounded-lg p-6 sm:p-8 w-full shadow-lg border-2 border-blue-300/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Reading content */}
          {currentStory && (
            <ReadingContent 
              paragraphs={currentStory.pages[currentPage].paragraphs}
              images={currentStory.pages[currentPage].images.map(img => ({
                ...img,
                src: getCustomImage(img.src)
              }))}
            />
          )}

          {/* Question container */}
          {currentStory && (
            <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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

          {/* Navigation controls */}
          <div className="w-full flex justify-between mt-8">
            <div className="flex items-center gap-3">
              <motion.button
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-md font-bold text-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextPage}
                disabled={!hasNextPage}
                style={{ opacity: hasNextPage ? 1 : 0.5 }}
              >
                NEXT
              </motion.button>
              
              <motion.button
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full font-bold text-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleInstructions}
              >
                ?
              </motion.button>
            </div>
            
            <div></div>
          </div>
        </motion.div>

        {/* Robot with speech bubble */}
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
            />
          </div>
        </div>

        {/* Instructions modal */}
        <InstructionsModal isOpen={showInstructions} onClose={toggleInstructions} />
      </div>
    </GameLayout>
  );
};

export default ReadingPage;
