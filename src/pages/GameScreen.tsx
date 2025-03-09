
import { useState, useEffect } from "react";
import GameLayout from "@/components/GameLayout";
import RobotScene from "@/components/RobotScene";
import RocketButton from "@/components/RocketButton";
import SpeechBubble from "@/components/SpeechBubble";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const GameScreen = () => {
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [launchingAlphabets, setLaunchingAlphabets] = useState(false);
  
  useEffect(() => {
    // Delay showing the speech bubble for a more natural feel
    const timeout = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const pixelSpeech = "HI! I AM PIXEL! I WILL BE YOUR GUIDE THROUGHOUT THE GAME, MY FRIEND. LET'S PICK AN ACTIVITY AND BEGIN OUR JOURNEY!";
  
  const handleAlphabetsClick = () => {
    setLaunchingAlphabets(true);
  };
  
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
          <div className="flex flex-col justify-evenly space-y-6 md:space-y-12 h-full">
            <RocketButton text="READING" to="/reading" delay={0.2} direction="left" />
            <RocketButton text="WRITING" to="/writing" delay={0.4} direction="left" />
            <RocketButton text="SPEAKING" to="/speaking" delay={0.6} direction="left" />
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
              <Link to="/alphabets" onClick={handleAlphabetsClick}>
                <motion.div 
                  className="relative group flex flex-col items-center justify-center"
                  animate={ launchingAlphabets ? {
                    y: -500,
                    transition: {
                      duration: 1.5,
                      ease: [0.45, 0.05, 0.55, 0.95]
                    }
                  } : { 
                    y: [0, -10, 0],
                    transition: { 
                      repeat: Infinity, 
                      duration: 3,
                      ease: "easeInOut" 
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Rocket SVG */}
                  <svg width="120" height="300" viewBox="0 0 120 300" className="fill-white stroke-[3] stroke-red-500">
                    {/* Rocket body */}
                    <rect x="30" y="50" width="60" height="200" rx="10" />
                    {/* Rocket nose */}
                    <polygon points="60,20 30,50 90,50" fill="red" stroke="none" />
                    {/* Windows */}
                    <circle cx="60" cy="100" r="8" fill="cyan" stroke="gray" />
                    <circle cx="60" cy="130" r="8" fill="cyan" stroke="gray" />
                    {/* Fins */}
                    <polygon points="30,250 10,270 30,270" fill="red" stroke="none" />
                    <polygon points="90,250 110,270 90,270" fill="red" stroke="none" />
                  </svg>
                  
                  {/* Letters stacked vertically - positioned over the rocket */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pt-12">
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
                  
                  {/* Rocket engine flames - visible when launching */}
                  <AnimatePresence>
                    {launchingAlphabets ? (
                      <motion.div 
                        className="absolute -bottom-12 w-20 h-24 z-10"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 24 }}
                        exit={{ opacity: 0 }}
                      >
                        <svg width="80" height="100" viewBox="0 0 80 100">
                          <defs>
                            <radialGradient id="flameGradient" cx="0.5" cy="0.3" r="0.7">
                              <stop offset="0%" stopColor="yellow" />
                              <stop offset="40%" stopColor="orange" />
                              <stop offset="90%" stopColor="red" />
                            </radialGradient>
                          </defs>
                          <motion.path
                            d="M30,0 Q20,30 40,60 Q60,30 50,0 Q40,5 30,0 Z"
                            fill="url(#flameGradient)"
                            animate={{
                              d: [
                                "M30,0 Q20,30 40,60 Q60,30 50,0 Q40,5 30,0 Z",
                                "M30,0 Q20,40 40,70 Q60,40 50,0 Q40,5 30,0 Z",
                                "M30,0 Q25,35 40,65 Q55,35 50,0 Q40,5 30,0 Z",
                                "M30,0 Q20,30 40,60 Q60,30 50,0 Q40,5 30,0 Z"
                              ]
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.5,
                              ease: "easeInOut"
                            }}
                          />
                        </svg>
                      </motion.div>
                    ) : (
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
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            </motion.div>
          </div>
          
          {/* Right column - 2 activities */}
          <div className="flex flex-col justify-evenly space-y-6 md:space-y-12 h-full">
            <RocketButton text="LISTENING" to="/listening" delay={0.3} direction="right" />
            <RocketButton text="VISUAL AID" to="/visual-aid" delay={0.5} direction="right" />
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
