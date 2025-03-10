
import { useState, useEffect, useRef } from "react";
import GameLayout from "@/components/GameLayout";
import RocketButton from "@/components/RocketButton";
import SpeechBubble from "@/components/SpeechBubble";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const GameScreen = () => {
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [launchingAlphabets, setLaunchingAlphabets] = useState(false);
  const lottieRef = useRef<any>(null);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const pixelSpeech = "HI! I AM PIXEL! I WILL BE YOUR GUIDE THROUGHOUT THE GAME, MY FRIEND. LET'S PICK AN ACTIVITY AND BEGIN OUR JOURNEY!";
  
  const handleAlphabetsClick = () => {
    setLaunchingAlphabets(true);
    
    if (lottieRef.current) {
      lottieRef.current.play();
      lottieRef.current.setSpeed(2);
    }
    
    setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }, 1500);
  };
  
  return (
    <GameLayout backTo="/landing">
      <div className="w-full h-[calc(100vh-60px)] flex flex-col p-[30px]">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-6"
        >
          Choose Your Adventure
        </motion.h1>
        
        <div className="relative flex-1 bg-[#395d6e] rounded-lg p-6 sm:p-8 md:p-10 shadow-lg border-2 border-blue-300/30 flex flex-col items-center z-10">
          <motion.div 
            className="w-full h-full grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col justify-evenly space-y-6 sm:space-y-12">
              <RocketButton text="READING" to="/reading" delay={0.2} direction="left" />
              <RocketButton text="WRITING" to="/writing" delay={0.4} direction="left" />
              <RocketButton text="SPEAKING" to="/speaking" delay={0.6} direction="left" />
            </div>
            
            <div className="flex items-center justify-center flex-col">
              <motion.div
                className="relative w-full h-72 sm:h-80 md:h-96"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 50
                }}
              >
                <Link to="/alphabets" onClick={handleAlphabetsClick}>
                  <div 
                    className={`relative w-full h-full flex items-center justify-center cursor-pointer 
                                ${launchingAlphabets ? 'animate-pulse' : ''}`}
                  >
                    <div className="relative">
                      {/* Rocket body */}
                      <div className="bg-white rounded-full w-24 h-[280px] flex flex-col items-center justify-center shadow-lg">
                        {/* Rocket top - triangle */}
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[40px] border-l-transparent border-r-transparent border-b-red-500"></div>
                        </div>
                        
                        {/* Vertical text inside rocket */}
                        <div className="flex flex-col items-center justify-center h-full pt-5">
                          <div className="font-extrabold text-black text-3xl leading-tight tracking-wider">
                            <div>A</div>
                            <div>L</div>
                            <div>P</div>
                            <div>H</div>
                            <div>A</div>
                            <div>B</div>
                            <div>E</div>
                            <div>T</div>
                            <div>S</div>
                          </div>
                        </div>
                        
                        {/* Rocket window */}
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full border-4 border-gray-300 bg-blue-200 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        </div>
                        
                        {/* Rocket fins */}
                        <div className="absolute left-[-15px] top-1/2 transform -translate-y-1/2 w-5 h-20 bg-red-500 rounded-l-lg"></div>
                        <div className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 w-5 h-20 bg-red-500 rounded-r-lg"></div>
                      </div>
                      
                      {/* Fire animation at the bottom */}
                      {launchingAlphabets && (
                        <motion.div 
                          className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2"
                          initial={{ height: 0 }}
                          animate={{ height: 60 }}
                          transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
                        >
                          <div className="w-20 h-40 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-yellow-500 via-orange-500 to-red-500 rounded-b-full"></div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </Link>
                
                <AnimatePresence>
                  {launchingAlphabets && (
                    <motion.div 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 text-white font-bold px-6 py-3 rounded-full animate-pulse text-lg sm:text-xl">
                        Launching...
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
            
            <div className="flex flex-col justify-evenly h-full">
              <RocketButton text="VISUAL AID" to="/visual-aid" delay={0.3} direction="right" />
              <RocketButton text="LISTENING" to="/listening" delay={0.5} direction="right" />
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="fixed bottom-4 right-4 z-50 flex items-end">
        {showSpeechBubble && (
          <div className="mr-2">
            <SpeechBubble text={pixelSpeech} delay={0.2} position="bottom-right" />
          </div>
        )}
        <motion.div 
          className="w-28 h-28 sm:w-32 sm:h-32"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <img 
            src="/lovable-uploads/4058707c-86ea-4886-9ecf-68732f5990b6.png" 
            alt="Pixel Robot" 
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </GameLayout>
  );
};

export default GameScreen;
