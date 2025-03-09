
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
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center px-2 sm:px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-center text-white mb-4 sm:mb-8 mobile-header"
        >
          Choose Your Adventure
        </motion.h1>
        
        <div className="relative bg-[#395d6e] rounded-lg p-4 sm:p-6 min-h-[400px] shadow-lg border-2 border-blue-300/30 flex flex-col items-center z-10 mobile-content-container w-full">
          <motion.div 
            className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col justify-evenly space-y-4 sm:space-y-12 h-full">
              <RocketButton text="READING" to="/reading" delay={0.2} direction="left" />
              <RocketButton text="WRITING" to="/writing" delay={0.4} direction="left" />
              <RocketButton text="SPEAKING" to="/speaking" delay={0.6} direction="left" />
            </div>
            
            <div className="flex items-center justify-center mt-4 sm:mt-0 flex-col">
              <motion.div
                className="relative w-full h-64 sm:h-72 md:h-96"
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
                    <DotLottieReact
                      ref={lottieRef}
                      src="https://lottie.host/d212e7a5-a203-419e-9f5b-cda06f326903/4jZK91W18f.lottie"
                      loop={!launchingAlphabets}
                      autoplay
                      className={`w-44 h-44 sm:w-60 sm:h-60 transition-all duration-300 
                                ${launchingAlphabets ? 'scale-110 translate-y-[-30px] sm:translate-y-[-50px]' : 'hover:scale-105'}`}
                    />
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
                      <div className="text-center bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 text-white font-bold px-4 py-2 rounded-full animate-pulse text-sm sm:text-base">
                        Launching...
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-2 sm:mt-4 -translate-y-5"
              >
                <span className="text-sm sm:text-lg font-bold text-black bg-white/90 px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-md">
                  ALPHABETS
                </span>
              </motion.div>
            </div>
            
            <div className="flex flex-col justify-evenly h-full">
              <div className="mb-4">
                <RocketButton text="VISUAL AID" to="/visual-aid" delay={0.3} direction="right" />
              </div>
              
              <div className="mt-4 sm:mt-20"> 
                <RocketButton text="LISTENING" to="/listening" delay={0.5} direction="right" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="fixed bottom-4 right-4 z-50 flex flex-row-reverse items-end">
        {showSpeechBubble && (
          <div className="mb-2 mr-4">
            <SpeechBubble text={pixelSpeech} delay={0.2} position="bottom-left" />
          </div>
        )}
        <motion.div 
          className="w-24 h-24 sm:w-32 sm:h-32"
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
