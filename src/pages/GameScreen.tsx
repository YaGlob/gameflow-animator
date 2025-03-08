
import { useState, useEffect } from "react";
import GameLayout from "@/components/GameLayout";
import RobotScene from "@/components/RobotScene";
import RocketButton from "@/components/RocketButton";
import SpeechBubble from "@/components/SpeechBubble";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const GameScreen = () => {
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  
  useEffect(() => {
    // Delay showing the speech bubble for a more natural feel
    const timeout = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const pixelSpeech = "HI! I AM PIXEL! I WILL BE YOUR GUIDE THROUGHOUT THE GAME, MY FRIEND. LET'S PICK AN ACTIVITY AND BEGIN OUR JOURNEY!";
  
  return (
    <GameLayout backTo="/landing">
      <div className="flex flex-col items-center justify-center w-full h-full max-w-6xl mx-auto">
        <motion.div 
          className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-6 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left column - 3 activities */}
          <div className="flex flex-col justify-evenly space-y-6 md:space-y-12">
            <RocketButton text="READING" to="/reading" delay={0.2} />
            <RocketButton text="WRITING" to="/writing" delay={0.4} />
            <RocketButton text="SPEAKING" to="/speaking" delay={0.6} />
          </div>
          
          {/* Center column - ALPHABETS rocket */}
          <div className="flex items-center justify-center">
            <motion.div
              className="relative w-36 h-96"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.3,
                type: "spring",
                stiffness: 50
              }}
            >
              {/* Main rocket body - make this a Link to the alphabets page */}
              <Link to="/alphabets">
                <motion.div 
                  className="absolute inset-0 bg-white rounded-t-full rounded-b-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut" 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Rocket nose */}
                  <div className="absolute -top-8 w-0 h-0 border-l-[18px] border-r-[18px] border-b-[24px] border-l-transparent border-r-transparent border-b-red-600"></div>
                  
                  {/* Letters stacked vertically */}
                  <div className="flex flex-col items-center justify-center h-full">
                    {['A', 'L', 'P', 'H', 'A', 'B', 'E', 'T', 'S'].map((letter, index) => (
                      <motion.div 
                        key={index}
                        className="text-2xl font-bold text-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + (index * 0.1) }}
                      >
                        {letter}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Rocket engine flame */}
                  <motion.div 
                    className="absolute -bottom-8 w-10 h-12 bg-gradient-to-t from-orange-500 via-yellow-400 to-red-500 rounded-b-full"
                    animate={{ 
                      height: [12, 16, 12],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.5,
                      ease: "easeInOut" 
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          </div>
          
          {/* Right column - 2 activities + Robot */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6 md:space-y-12 mb-auto">
              <RocketButton text="LISTENING" to="/listening" delay={0.3} />
              <RocketButton text="VISUAL AID" to="/visual-aid" delay={0.5} />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Robot with speech bubble - positioned absolutely to avoid interfering with the grid layout */}
      <div className="fixed bottom-4 right-4 z-50">
        {showSpeechBubble && (
          <div className="mb-2 mr-4">
            <SpeechBubble text={pixelSpeech} delay={0.2} />
          </div>
        )}
        <RobotScene variant="normal" />
      </div>
    </GameLayout>
  );
};

export default GameScreen;
