
import { useState, useEffect, useRef } from "react";
import GameLayout from "@/components/GameLayout";
import RobotScene from "@/components/RobotScene";
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
    // Delay showing the speech bubble for a more natural feel
    const timeout = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const pixelSpeech = "HI! I AM PIXEL! I WILL BE YOUR GUIDE THROUGHOUT THE GAME, MY FRIEND. LET'S PICK AN ACTIVITY AND BEGIN OUR JOURNEY!";
  
  const handleAlphabetsClick = () => {
    // Change animation state to launching
    setLaunchingAlphabets(true);
    
    // Play the animation at higher speed to show launching
    if (lottieRef.current) {
      lottieRef.current.play();
      lottieRef.current.setSpeed(2); // Increase animation speed
    }
    
    // Delay navigation to allow time for the animation to play
    setTimeout(() => {
      // Navigation will happen after the animation plays
      // The Link component will handle it automatically
    }, 1500);
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
          
          {/* Center column - ALPHABETS rocket with Lottie animation */}
          <div className="flex items-center justify-center">
            <motion.div
              className="relative w-full h-96"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.3,
                type: "spring",
                stiffness: 50
              }}
            >
              {/* Alphabets text displayed in oval white background */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 z-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-3xl font-bold text-black bg-white/90 px-8 py-4 rounded-full shadow-md">
                    ALPHABETS
                  </span>
                </motion.div>
              </div>
              
              {/* Lottie Animation - Updated with new animation source */}
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
                    className={`w-60 h-60 transition-all duration-300 
                              ${launchingAlphabets ? 'scale-110 translate-y-[-50px]' : 'hover:scale-105'}`}
                  />
                </div>
              </Link>
              
              {/* Alphabets label with animation */}
              <AnimatePresence>
                {launchingAlphabets && (
                  <motion.div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 text-white font-bold px-4 py-2 rounded-full animate-pulse">
                      Launching...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
