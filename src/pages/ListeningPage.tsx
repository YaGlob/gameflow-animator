
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { Volume2, Trash2, HelpCircle, ArrowLeft, Check } from "lucide-react";
import GameLayout from "@/components/GameLayout";
import RobotScene from "@/components/RobotScene";
import SpeechBubble from "@/components/SpeechBubble";
import KeyboardLayout from "@/components/KeyboardLayout";

// Sample word list - can be expanded
const WORDS = [
  "cat", "dog", "hat", "sun", "moon", 
  "book", "tree", "fish", "bird", "apple",
  "star", "car", "ball", "house", "cake"
];

const ListeningPage = () => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [typedWord, setTypedWord] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [showSpeechBubble, setShowSpeechBubble] = useState<boolean>(true);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [isSpeakerDisabled, setIsSpeakerDisabled] = useState<boolean>(false);
  const [isSubmitShaking, setIsSubmitShaking] = useState<boolean>(false);
  const [robotVariant, setRobotVariant] = useState<"normal" | "thinking" | "happy">("normal");
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  
  // Get a random word from the list
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
  };

  // Initialize the game
  useEffect(() => {
    const newWord = getRandomWord();
    setCurrentWord(newWord);
    setTypedWord("");
    setAttempts(0);
    setGameCompleted(false);
  }, []);

  // Play the audio for the current word
  const playWordAudio = () => {
    if (isSpeakerDisabled) return;
    
    setIsSpeakerDisabled(true);
    setRobotVariant("thinking");
    
    // In a real implementation, this would use a proper text-to-speech API
    // For now, we'll use the browser's built-in speech synthesis
    const utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.rate = 0.8; // Slightly slower for better clarity
    
    utterance.onend = () => {
      setIsSpeakerDisabled(false);
      setRobotVariant("normal");
    };
    
    window.speechSynthesis.speak(utterance);
  };

  // Handle keyboard input
  const handleKeyPress = (key: string) => {
    if (gameCompleted) return;
    
    if (key === "delete") {
      setTypedWord(prev => prev.slice(0, -1));
    } else {
      setTypedWord(prev => prev + key);
    }
  };

  // Handle word submission
  const handleSubmit = () => {
    if (typedWord.trim() === "") return;
    
    if (typedWord.toLowerCase() === currentWord.toLowerCase()) {
      // Correct answer
      setGameCompleted(true);
      setRobotVariant("happy");
      toast({
        title: "Great job!",
        description: `You spelled "${currentWord}" correctly!`,
        variant: "default",
      });
      
      // Show success animation
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    } else {
      // Incorrect answer
      setAttempts(prev => prev + 1);
      setIsSubmitShaking(true);
      
      setTimeout(() => {
        setIsSubmitShaking(false);
      }, 500);
      
      // After 5 attempts, show the correct answer
      if (attempts >= 4) {
        toast({
          title: "Keep practicing!",
          description: `The correct spelling was "${currentWord}".`,
          variant: "destructive",
        });
        setGameCompleted(true);
      } else {
        toast({
          title: "Try again!",
          description: "That's not quite right. Listen carefully and try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Move to the next word
  const handleNext = () => {
    const newWord = getRandomWord();
    setCurrentWord(newWord);
    setTypedWord("");
    setAttempts(0);
    setGameCompleted(false);
    setRobotVariant("normal");
  };

  // Toggle instructions
  const toggleInstructions = () => {
    setShowInstructions(prev => !prev);
  };

  return (
    <GameLayout>
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-between min-h-[80vh]">
        {/* Robot with speech bubble */}
        <div className="absolute top-4 right-4 z-50 flex flex-col items-end">
          <AnimatePresence>
            {showSpeechBubble && (
              <div className="mb-2">
                <SpeechBubble 
                  text="WELCOME TO THE LISTENING GAME! I'LL SAY A WORD AND YOU NEED TO SPELL IT CORRECTLY. PRESS THE SPEAKER BUTTON TO HEAR THE WORD AGAIN."
                  delay={0.2} 
                />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Main game container */}
        <div className="w-full bg-game-panel backdrop-blur-md rounded-xl p-6 mt-8 flex flex-col items-center">
          {/* Keyboard */}
          <KeyboardLayout onKeyPress={handleKeyPress} />
          
          {/* Word display area */}
          <div className="relative w-full mt-6 mb-6">
            <div className="flex items-center justify-center">
              <motion.div 
                className="w-full max-w-md h-12 bg-transparent border-b-4 border-cyan-400 flex items-center justify-center text-white text-3xl"
                animate={{ 
                  borderColor: gameCompleted && typedWord.toLowerCase() === currentWord.toLowerCase() 
                    ? ["#4fd1ff", "#50ff8d", "#4fd1ff"] 
                    : "#4fd1ff" 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: gameCompleted && typedWord.toLowerCase() === currentWord.toLowerCase() ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {typedWord}
              </motion.div>
              
              {/* Checkmark for correct answer */}
              {gameCompleted && typedWord.toLowerCase() === currentWord.toLowerCase() && (
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
          
          {/* Control buttons */}
          <div className="w-full flex items-center justify-between mt-4">
            <div className="flex space-x-4">
              {/* Back button */}
              <motion.button
                className="flex items-center justify-center bg-blue-500/30 hover:bg-blue-500/50 text-white px-6 py-3 rounded-md backdrop-blur-sm transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                BACK
              </motion.button>

              {/* Help button */}
              <motion.button
                className="flex items-center justify-center bg-blue-500/30 hover:bg-blue-500/50 text-white p-3 rounded-md backdrop-blur-sm transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleInstructions}
              >
                <HelpCircle className="h-5 w-5" />
              </motion.button>

              {/* Delete button */}
              <motion.button
                className="flex items-center justify-center bg-blue-500/30 hover:bg-blue-500/50 text-white p-3 rounded-md backdrop-blur-sm transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleKeyPress("delete")}
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
                onClick={playWordAudio}
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
                  onClick={handleSubmit}
                  disabled={typedWord.trim() === ""}
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
                  onClick={handleNext}
                >
                  NEXT
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* 3D Robot character positioned in bottom right */}
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
          <RobotScene variant={robotVariant} />
        </div>

        {/* Instructions modal */}
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleInstructions}
            >
              <motion.div
                className="bg-game-panel border-2 border-cyan-400 rounded-xl p-6 max-w-md m-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
                <ol className="list-decimal list-inside text-white space-y-2">
                  <li>Press the speaker button to hear a word.</li>
                  <li>Use the keyboard to type the word you hear.</li>
                  <li>Press the delete button if you make a mistake.</li>
                  <li>Press submit when you're ready to check your spelling.</li>
                  <li>You have 5 attempts to spell the word correctly.</li>
                  <li>Press next to move to a new word after completing.</li>
                </ol>
                <div className="mt-6 flex justify-end">
                  <motion.button
                    className="bg-cyan-500/70 hover:bg-cyan-500/90 text-white px-4 py-2 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toggleInstructions}
                  >
                    Got it!
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti styles */}
        <style>
          {`
          .confetti {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 100;
            background-image: 
              radial-gradient(circle at 20% 35%, #4fd1ff 0.2%, transparent 0.5%),
              radial-gradient(circle at 75% 44%, #50ff8d 0.2%, transparent 0.4%),
              radial-gradient(circle at 46% 22%, #4fd1ff 0.3%, transparent 0.6%),
              radial-gradient(circle at 83% 66%, #50ff8d 0.2%, transparent 0.4%),
              radial-gradient(circle at 33% 76%, #4fd1ff 0.3%, transparent 0.6%),
              radial-gradient(circle at 80% 20%, #50ff8d 0.4%, transparent 0.8%),
              radial-gradient(circle at 65% 85%, #4fd1ff 0.2%, transparent 0.4%),
              radial-gradient(circle at 13% 55%, #50ff8d 0.3%, transparent 0.6%);
            animation: confetti-fade 3s ease-in forwards;
            background-size: 150% 150%;
          }
          
          @keyframes confetti-fade {
            0% {
              opacity: 0;
              background-position: 0% 0%;
            }
            5% {
              opacity: 1;
            }
            70% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              background-position: 130% 130%;
            }
          }
          `}
        </style>
      </div>
    </GameLayout>
  );
};

export default ListeningPage;
