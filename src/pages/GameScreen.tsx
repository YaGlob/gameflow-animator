
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
            <div className="flex flex-col justify-between space-y-6">
              {/* Move Alphabets rocket to left column */}
              <Link to="/alphabets" onClick={handleAlphabetsClick} className="mb-6">
                <div 
                  className={`relative flex items-center justify-center cursor-pointer 
                              ${launchingAlphabets ? 'animate-pulse' : ''}`}
                >
                  <div className="flex flex-col items-center justify-center transform translate-y-[-10px]">
                    <DotLottieReact
                      ref={lottieRef}
                      src="https://lottie.host/d212e7a5-a203-419e-9f5b-cda06f326903/4jZK91W18f.lottie"
                      loop={!launchingAlphabets}
                      autoplay
                      className={`w-40 h-40 sm:w-48 sm:h-48 transition-all duration-300 
                                ${launchingAlphabets ? 'scale-110 translate-y-[-30px]' : 'hover:scale-105'}`}
                    />

                    {/* Oval-shaped Alphabets container */}
                    <motion.div
                      className="mt-4 px-6 py-3 bg-white/90 rounded-full shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <div className="font-extrabold text-black text-sm tracking-wider text-center">
                        ALPHABETS
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Link>

              {/* Game activity buttons */}
              <RocketButton text="READING" to="/reading" delay={0.2} direction="left" />
              <RocketButton text="WRITING" to="/writing" delay={0.4} direction="left" />
              <RocketButton text="SPEAKING" to="/speaking" delay={0.6} direction="left" />
              <RocketButton text="VISUAL AID" to="/visual-aid" delay={0.8} direction="left" />
              <RocketButton text="LISTENING" to="/listening" delay={1.0} direction="left" />

              {/* Launching animation for Alphabets */}
              <AnimatePresence>
                {launchingAlphabets && (
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full"
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
            </div>
            
            {/* Middle and right columns are empty to maintain grid layout */}
            <div className="hidden sm:block"></div>
            <div className="hidden sm:block"></div>
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
