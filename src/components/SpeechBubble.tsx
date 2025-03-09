
import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SpeechBubbleProps {
  text: string;
  delay?: number;
}

const SpeechBubble: FC<SpeechBubbleProps> = ({
  text,
  delay = 0
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  // Reset and restart animation when text changes
  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
  }, [text]);

  return (
    <motion.div 
      className="relative max-w-sm"
      initial={{
        opacity: 0,
        scale: 0.8
      }} 
      animate={{
        opacity: 1,
        scale: 1
      }} 
      transition={{
        duration: 0.5,
        delay
      }}
    >
      <div className="bg-white p-4 rounded-xl shadow-lg relative border-2 border-red-500">
        <p className="text-black text-base font-verdana text-center">
          {displayText}
        </p>
        
        {/* Red outline effect matching the image */}
        <motion.div 
          className="absolute inset-0 -z-10 rounded-xl" 
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }} 
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }} 
        />
        
        {/* Speech bubble tail - positioned to point at the robot */}
        <div className="absolute w-4 h-4 bg-white transform rotate-45 bottom-0 right-8 translate-y-2 border-r-2 border-b-2 border-red-500"></div>
      </div>
    </motion.div>
  );
};

export default SpeechBubble;
