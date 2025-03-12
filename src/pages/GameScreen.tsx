
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
        {/* Main content area with blue background */}
        <div className="relative flex-1 bg-[#395d6e] rounded-lg p-6 sm:p-8 md:p-10 shadow-lg border-2 border-blue-300/30 flex flex-col items-center z-10 mt-2">
          <motion.div 
            className="w-full h-full flex flex-row justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Left column - Reading, Writing, Speaking */}
            <div className="flex flex-col justify-evenly h-full flex-1">
              <RocketButton text="READING" to="/reading" delay={0.2} direction="left" />
              <RocketButton text="WRITING" to="/writing" delay={0.4} direction="left" />
              <RocketButton text="SPEAKING" to="/speaking" delay={0.6} direction="left" />
            </div>
            
            {/* Center column - Alphabets */}
            <div className="flex flex-col items-center justify-center h-full mx-4 sm:mx-8">
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
                    <div className="flex flex-col items-center justify-center transform translate-y-[-30px]">
                      <DotLottieReact
                        ref={lottieRef}
                        src="https://lottie.host/d212e7a5-a203-419e-9f5b-cda06f326903/4jZK91W18f.lottie"
                        loop={!launchingAlphabets}
                        autoplay
                        className={`w-56 h-56 sm:w-64 sm:h-64 transition-all duration-300 
                                  ${launchingAlphabets ? 'scale-110 translate-y-[-30px] sm:translate-y-[-50px]' : 'hover:scale-105'}`}
                      />

                      {/* Vertical Alphabets pill */}
                      <motion.div
                        className="mt-4 px-6 py-4 bg-white/90 rounded-full shadow-lg flex flex-col items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        style={{ borderRadius: "40px" }}
                      >
                        <div className="font-extrabold text-black text-base sm:text-lg tracking-wider flex flex-col items-center space-y-1">
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
                      </motion.div>
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
            
            {/* Right column - Visual Aid and Listening */}
            <div className="flex flex-col justify-evenly h-full flex-1">
              <RocketButton text="VISUAL AID" to="/visual-aid" delay={0.3} direction="left" />
              <RocketButton text="LISTENING" to="/listening" delay={0.5} direction="left" />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Robot with speech bubble - Updated to match standard size */}
      <div className="fixed bottom-4 right-4 z-50 flex items-end">
        {showSpeechBubble && (
          <div className="mr-2">
            <SpeechBubble text={pixelSpeech} delay={0.2} position="bottom-right" />
          </div>
        )}
        <motion.div 
          className="w-32 h-32 sm:w-40 sm:h-40"
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
