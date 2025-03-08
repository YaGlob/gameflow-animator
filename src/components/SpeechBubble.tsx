
import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SpeechBubbleProps {
  text: string;
  delay?: number;
}

const SpeechBubble: FC<SpeechBubbleProps> = ({ text, delay = 0 }) => {
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
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="bg-white p-4 rounded-xl shadow-lg max-w-xs relative">
        <p className="text-black text-center text-sm">{displayText}</p>
        
        {/* Speech bubble tail */}
        <div className="absolute w-4 h-4 bg-white transform rotate-45 -bottom-2 right-8"></div>
      </div>
    </motion.div>
  );
};

export default SpeechBubble;
