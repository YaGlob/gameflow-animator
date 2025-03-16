
import { useState } from "react";
import GameLayout from "@/components/GameLayout";
import SpeechBubble from "@/components/SpeechBubble";
import ReadingContent from "@/components/reading-game/ReadingContent";
import QuestionContainer from "@/components/reading-game/QuestionContainer";
import InstructionsModal from "@/components/reading-game/InstructionsModal";
import { useReadingGame } from "@/hooks/use-reading-game";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

// Main component for the Reading Activity page
const ReadingPage = () => {
  // State variables to control UI elements
  const [showSpeechBubble, setShowSpeechBubble] = useState<boolean>(true);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  // Get all the game functionality from our custom hook
  const {
    currentStory,             // The current story being displayed
    currentPage,              // Current page of the story
    handleAnswerSelect,       // Function to handle when an answer is selected
    handleNextPage,           // Function to move to the next page
    handlePreviousPage,       // Function to move to the previous page
    hasNextPage,              // Whether there is another page after this one
    hasPreviousPage,          // Whether there is a page before this one
    selectedAnswers,          // Object tracking which answers the user has selected
    checkIfAnswerIsCorrect,   // Function to check if an answer is correct
    robotVariant              // Which robot face to show (normal, thinking, happy)
  } = useReadingGame();

  // Function to show or hide the instruction modal
  const toggleInstructions = () => {
    setShowInstructions(prev => !prev);
  };

  return (
    <GameLayout>
      <div className="w-full h-[calc(100vh-60px)] flex flex-col p-[30px]">
        {/* Main content area with scrolling */}
        <div className="relative flex-1 bg-[#395d6e] rounded-lg p-4 sm:p-6 shadow-lg border-2 border-blue-300/30 overflow-y-auto max-h-[calc(100vh-220px)]">
          {/* Show the reading content (paragraphs and images) if we have a story */}
          {currentStory && (
            <ReadingContent 
              paragraphs={currentStory.pages[currentPage].paragraphs}  // Text paragraphs
              images={currentStory.pages[currentPage].images}          // Associated images
              pageId={currentStory.pages[currentPage].id}              // Unique page ID
            />
          )}

          {/* Show the questions for this page */}
          {currentStory && (
            <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {currentStory.pages[currentPage].questions.map((question, index) => (
                <QuestionContainer
                  key={index}
                  question={question}                                       // Question data
                  selectedAnswer={selectedAnswers[question.id]}             // User's selection (if any)
                  onAnswerSelect={(answerId) => handleAnswerSelect(question.id, answerId)}  // Handle selection
                  isCorrect={selectedAnswers[question.id] ? checkIfAnswerIsCorrect(question.id, selectedAnswers[question.id]) : undefined}  // Whether answer is correct
                />
              ))}
            </div>
          )}

          {/* Navigation controls (Next button and Help button) */}
          <div className="w-full flex justify-between mt-6">
            <div className="flex items-center gap-3">
              {/* Next button - only active if there's a next page */}
              <motion.button
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md font-bold text-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextPage}
                disabled={!hasNextPage}
                style={{ opacity: hasNextPage ? 1 : 0.5 }}  // Fade if disabled
              >
                NEXT
              </motion.button>
              
              {/* Help button (question mark) */}
              <motion.button
                className="bg-white text-black font-bold text-2xl w-12 h-12 rounded-md flex items-center justify-center shadow-md border-2 border-gray-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleInstructions}
              >
                ?
              </motion.button>
            </div>
            
            <div></div>  {/* Empty div for spacing */}
          </div>
        </div>
      </div>

      {/* Robot with speech bubble - fixed position at bottom right */}
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
            text="Take your time reading each passage carefully. When you're ready, answer the questions. Correct answers will light up in green!"
            delay={0.2}
            position="bottom-right"
          />
        </div>
      </div>

      {/* Instructions modal - only shown when showInstructions is true */}
      <InstructionsModal isOpen={showInstructions} onClose={toggleInstructions} />
    </GameLayout>
  );
};

export default ReadingPage;
