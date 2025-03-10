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
            className="w-full h-full grid grid-cols-3 gap-6 sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col justify-evenly space-y-6">
              <RocketButton text="READING" to="/reading" delay={0.2} direction="left" />
              <RocketButton text="WRITING" to="/writing" delay={0.4} direction="left" />
            </div>
            
            <div className="flex items-center justify-center">
              <motion.div
                className="relative w-full h-[500px] perspective-1000"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 50
                }}
              >
                <Link 
                  to="/alphabets" 
                  onClick={handleAlphabetsClick}
                  className="block h-full"
                >
                  <div className={`relative w-full h-full flex flex-col items-center justify-center cursor-pointer transform-style-3d ${launchingAlphabets ? 'animate-pulse' : ''}`}>
                    <DotLottieReact
                      ref={lottieRef}
                      src="https://lottie.host/d212e7a5-a203-419e-9f5b-cda06f326903/4jZK91W18f.lottie"
                      loop={!launchingAlphabets}
                      autoplay
                      className={`w-32 h-32 sm:w-40 sm:h-40 transition-all duration-300 rotate-y-[-20deg] 
                        ${launchingAlphabets ? 'scale-110 translate-y-[-30px]' : 'hover:scale-105'}`}
                    />
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="mt-4"
                    >
                      <span className="verdana-font text-lg sm:text-2xl font-bold text-black bg-white/90 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md rotate-y-[-20deg] inline-block">
                        ALPHABETS
                      </span>
                    </motion.div>
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
            
            <div className="flex flex-col justify-evenly">
              <RocketButton text="SPEAKING" to="/speaking" delay={0.6} direction="right" />
              <RocketButton text="LISTENING" to="/listening" delay={0.5} direction="right" />
              <RocketButton text="VISUAL AID" to="/visual-aid" delay={0.3} direction="right" />
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
